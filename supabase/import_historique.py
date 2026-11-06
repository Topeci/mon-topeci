#!/usr/bin/env python3
"""
Import du fichier Excel historique « Base de donnée TOPECI »
(colonnes : DATE, PRENOM, NOM, MODELE, CONTACT, INDICATIF, BON CONTACT, ..., QUANTITE, COMMUNE /VILLE/PAYS).

Usage :
    python3 supabase/import_historique.py Base_de_donnee_TOPECI.xlsx > import_historique.sql
Puis coller le fichier dans Supabase > SQL Editor > Run (après schema.sql).

- Une ligne avec MODELE et DATE  -> une vente (canal « historique », statut « livree »).
- Une ligne sans modèle           -> un contact (client déjà livré, sans détail).
- Prix des anciennes ventes inconnus : enregistrés à 0, ils ne faussent pas le chiffre d'affaires.
- Aucun accord marketing n'est coché (à redemander lors du premier message).
- Un même numéro = une seule fiche, même en relançant l'import ou avec d'autres fichiers.
"""
import datetime
import json
import re
import sys

from openpyxl import load_workbook

LANGUES = {"baoule": "livre-audio-baoule", "dioula": "livre-audio-dioula", "bete": "cartes-audio-bete"}
NOMS_PRODUITS = {
    "livre-audio-baoule": "Mon Premier Livre Audio Baoulé–Français",
    "livre-audio-dioula": "Mon Premier Livre Audio Dioula–Français",
    "cartes-audio-bete": "Mes Premières Cartes Audio Bété–Français",
}
ETIQUETTES = re.compile(r"^(mod[eè]le|quantit[eé]|commune|client livr[eé]|topeci \d+)\s*:?$", re.I)


def sans_accents(t):
    import unicodedata
    return "".join(c for c in unicodedata.normalize("NFD", t) if unicodedata.category(c) != "Mn").lower()


def propre(v):
    if v is None:
        return None
    t = str(v).strip()
    if not t or ETIQUETTES.match(t):
        return None
    return t


def telephone(brut):
    """Renvoie (numero, note) ; note signale un numéro à vérifier."""
    if brut is None:
        return None, None
    t = str(brut).strip()
    if t.endswith(".0"):
        t = t[:-2]
    autre = None
    if "/" in t:
        t, autre = [x.strip() for x in t.split("/", 1)]
    chiffres = re.sub(r"[^0-9]", "", t)
    if not chiffres:
        return None, None
    note = f"autre numéro : {autre}" if autre else None
    if not t.startswith("+"):
        if len(chiffres) == 10 and chiffres.startswith("0"):
            return "+225" + chiffres, note                     # numéro ivoirien local
        if len(chiffres) == 11 and chiffres.startswith("1"):
            return "+" + chiffres, note                         # Canada / USA
        t = "+" + chiffres
    else:
        t = "+" + chiffres
    if t.startswith("+330"):                                     # +33 0X XX... -> +33 X XX...
        t = "+33" + t[4:]
    if t.startswith("+225") and len(t) != 14:                    # ancien format à 8 chiffres
        note = "numéro à vérifier (ancien format à 8 chiffres)" + (f" ; {note}" if note else "")
    return t, note


def date_iso(v):
    if isinstance(v, datetime.datetime):
        return v.date().isoformat()
    m = re.match(r"^\s*(\d{1,2})/(\d{1,2})/(\d{4})\s*$", str(v or ""))
    if m:  # format américain mois/jour/année, comme dans le fichier
        mois, jour, an = map(int, m.groups())
        try:
            return datetime.date(an, mois, jour).isoformat()
        except ValueError:
            return None
    return None


def sql(fonction, donnees):
    j = json.dumps(donnees, ensure_ascii=False).replace("'", "''")
    return f"select {fonction}('{j}'::jsonb);"


def main():
    if len(sys.argv) < 2:
        print(__doc__, file=sys.stderr)
        sys.exit(1)
    feuille = load_workbook(sys.argv[1], read_only=True, data_only=True).worksheets[0]
    lignes = list(feuille.iter_rows(values_only=True))[1:]

    ventes = contacts = ignores = a_verifier = 0
    print("-- Import historique TOPECI genere automatiquement")
    print("begin;")
    for brut in lignes:
        r = list(brut) + [None] * (10 - len(brut))
        if not any(r):
            continue
        tel, note = telephone(r[6] or r[4])
        if not tel:
            ignores += 1
            continue
        if note and "vérifier" in note:
            a_verifier += 1
        prenom, nom = propre(r[1]), propre(r[2])
        ville = propre(r[9])
        client = {
            "prenom": prenom,
            "nom": nom,
            "telephone": tel,
            "ville": ville.title() if ville and ville.isupper() else ville,
            "pays": "Côte d’Ivoire" if tel.startswith("+225") else None,
            "marche": "CI" if tel.startswith("+225") else "EUR",
            "source": "import",
        }
        client = {k: v for k, v in client.items() if v}

        langue = sans_accents(str(r[3] or "")).strip()
        produit = LANGUES.get(langue)
        date = date_iso(r[0])
        if produit and date:
            try:
                quantite = max(int(float(r[8])), 1)
            except (TypeError, ValueError):
                quantite = 1
            notes = "Import Excel historique - prix non renseigné" + (f" - {note}" if note else "")
            print(sql("enregistrer_commande", {
                "date": f"{date}T12:00:00Z",
                "statut": "livree",
                "canal": "historique",
                "marche": client["marche"],
                "devise": "FCFA" if client["marche"] == "CI" else None,
                "ville": client.get("ville"),
                "pays": client.get("pays"),
                "notes": notes,
                "client": client,
                "lignes": [{"produit_id": produit, "produit_nom": NOMS_PRODUITS[produit],
                            "quantite": quantite, "prix_unitaire": 0}],
            }))
            ventes += 1
        else:
            print(sql("enregistrer_contact", client))
            contacts += 1
    print("commit;")
    print(f"-- {ventes} ventes, {contacts} contacts sans detail, {ignores} lignes sans numero ignorees, "
          f"{a_verifier} numeros a verifier", file=sys.stderr)


if __name__ == "__main__":
    main()
