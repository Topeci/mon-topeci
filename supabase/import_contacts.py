#!/usr/bin/env python3
"""
Import de fichiers clients existants (CSV ou Excel) dans la base TOPECI.

Usage :
    python3 supabase/import_contacts.py fichier1.csv fichier2.xlsx > import.sql
Puis coller import.sql dans Supabase > SQL Editor > Run.

- Les colonnes sont reconnues automatiquement d'après leur titre
  (nom, prénom, téléphone / numéro / whatsapp, indicatif, email, ville, pays).
- Les doublons sont gérés par la base : un même numéro = une seule fiche,
  même si le fichier est importé deux fois.
- Les anciens clients sont importés SANS consentement marketing coché
  (source « import »). Premier message WhatsApp conseillé : leur demander
  s'ils veulent continuer à recevoir les offres ; s'ils disent oui, cocher
  consent_whatsapp dans Supabase (ou les réinscrire via /inscription).
  Option --consentement-whatsapp pour un fichier dont TOUS les contacts
  ont déjà donné leur accord.
"""
import csv
import json
import re
import sys
import unicodedata
from pathlib import Path


def sans_accents(texte: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", texte) if unicodedata.category(c) != "Mn").lower()


COLONNES = {
    "prenom": ["prenom", "first name", "firstname"],
    "nom": ["nom", "name", "client"],
    "indicatif": ["indicatif", "code pays", "country code"],
    "telephone": ["telephone", "tel", "numero", "phone", "whatsapp", "mobile", "contact"],
    "email": ["email", "e-mail", "mail", "courriel"],
    "ville": ["ville", "commune", "city", "quartier"],
    "pays": ["pays", "country"],
}

NOMS_VIDES = re.compile(r"client\s+livr|sans nom|inconnu", re.I)


def reconnaitre(entetes):
    plan = {}
    for i, entete in enumerate(entetes):
        e = sans_accents(str(entete or "")).strip()
        for champ, mots in COLONNES.items():
            if champ in plan:
                continue
            # "indicatif pays" doit aller dans indicatif, pas dans pays
            if champ == "pays" and "indicatif" in e:
                continue
            if champ == "nom" and ("prenom" in e or "numero" in e):
                continue
            if any(e == m or e.startswith(m) or f" {m}" in f" {e}" for m in mots):
                plan[champ] = i
                break
    return plan


def lire(chemin: Path):
    if chemin.suffix.lower() in (".xlsx", ".xlsm"):
        from openpyxl import load_workbook
        for feuille in load_workbook(chemin, read_only=True, data_only=True).worksheets:
            lignes = [list(l) for l in feuille.iter_rows(values_only=True)]
            if lignes:
                yield lignes[0], lignes[1:]
    else:
        brut = chemin.read_bytes()
        texte = brut.decode("utf-8-sig", errors="replace")
        dialecte = csv.Sniffer().sniff(texte[:2000], delimiters=",;\t")
        lignes = list(csv.reader(texte.splitlines(), dialecte))
        if lignes:
            yield lignes[0], lignes[1:]


def telephone(indicatif, numero):
    n = re.sub(r"[^0-9+]", "", str(numero or ""))
    if n.endswith(".0"):
        n = n[:-2]
    if not n:
        return None
    ind = re.sub(r"[^0-9]", "", str(indicatif or ""))
    if n.startswith("+") or n.startswith("00"):
        return n
    if ind and ind != "225":
        return f"+{ind}{n.lstrip('0')}"  # 33 + 06... -> +336...
    if ind == "225":
        return f"+225{n}"               # numéros ivoiriens : le 0 fait partie du numéro
    return n                            # sans indicatif : la base applique la règle CI


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    consentement = "--consentement-whatsapp" in sys.argv
    if not args:
        print(__doc__, file=sys.stderr)
        sys.exit(1)

    total, ignores = 0, 0
    print("-- Import TOPECI genere automatiquement")
    print("begin;")
    for nom_fichier in args:
        chemin = Path(nom_fichier)
        for entetes, lignes in lire(chemin):
            plan = reconnaitre(entetes)
            if "telephone" not in plan and "email" not in plan:
                print(f"-- {chemin.name} : colonnes non reconnues {entetes}", file=sys.stderr)
                continue
            for ligne in lignes:
                val = lambda c: (str(ligne[plan[c]]).strip() if c in plan and plan[c] < len(ligne) and ligne[plan[c]] is not None else "")
                tel = telephone(val("indicatif"), val("telephone"))
                email = val("email") or None
                if not tel and not email:
                    ignores += 1
                    continue
                # "Kone Mariam" : on garde le nom complet tel quel, sans deviner l'ordre
                nom_complet = "" if NOMS_VIDES.search(val("nom")) else val("nom")
                prenom = val("prenom")
                pays = val("pays")
                # Numéro local (sans +) ou +225 : client Côte d'Ivoire ; sinon diaspora
                marche = "CI" if not tel or not tel.startswith("+") or tel.startswith("+225") else "EUR"
                contact = {
                    "prenom": prenom or None,
                    "nom": nom_complet or None,
                    "telephone": tel,
                    "email": email,
                    "ville": val("ville") or None,
                    "pays": pays or None,
                    "marche": marche,
                    "source": "import",
                    "consent_whatsapp": consentement,
                }
                donnees = json.dumps({k: v for k, v in contact.items() if v not in (None, "")}, ensure_ascii=False)
                print(f"select enregistrer_contact('{donnees.replace(chr(39), chr(39) * 2)}'::jsonb);")
                total += 1
    print("commit;")
    print(f"-- {total} contacts, {ignores} lignes sans numero ni email ignorees", file=sys.stderr)


if __name__ == "__main__":
    main()
