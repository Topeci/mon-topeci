# Base clients TOPECI (Supabase)

Chaque commande du panier et chaque inscription sur `/inscription` remplit automatiquement
une base de données : une fiche par client, ses commandes, ses langues, d'où il vient,
et son accord pour recevoir des offres.

L'email de commande (FormSubmit → montopeci@gmail.com) continue de partir comme avant :
même si la base est en panne, aucune commande n'est perdue.

## Mise en route (15 minutes, une seule fois)

1. **Créer le projet** sur https://supabase.com (offre gratuite) : nom `topeci`,
   région Europe (Paris ou Francfort), noter le mot de passe.
2. **Créer les tables** : Supabase > *SQL Editor* > *New query*, coller tout `schema.sql`, *Run*.
3. **Reprendre l'existant** (facultatif) : même endroit, coller puis lancer les fichiers d'import
   (commandes Gmail, contacts). Voir « Importer un fichier clients » plus bas.
4. **Relier le site** : Supabase > *Project Settings* > *API*, copier
   - *Project URL* → variable `SUPABASE_URL`
   - clé *service_role* (secrète !) → variable `SUPABASE_SERVICE_ROLE_KEY`

   Les coller dans Netlify > site *topeci* > *Site configuration* > *Environment variables*,
   puis *Deploys* > *Trigger deploy*. Ne jamais mettre la clé `service_role` dans le code
   ni la partager.
5. **Tester** : passer une commande test sur le site, elle apparaît dans
   Supabase > *Table Editor* > `commandes` (puis la supprimer).

## Où trouver quoi

| Vue / table | À quoi elle sert |
| --- | --- |
| `v_clients` | La fiche complète de chaque contact : commandes, jouets, langues achetées |
| `v_liste_whatsapp` | Contacts qui ont accepté WhatsApp : à exporter (CSV) pour les listes de diffusion |
| `v_ventes_jour` | Ventes par jour, langue, canal et devise : suivi de campagne |
| `v_commissions` | Ce qui est dû à chaque ambassadeur (1 000 FCFA par jouet par défaut) |
| `v_objectifs` | Compteur : contacts (objectif 1 000) et jouets vendus depuis le 16 novembre (objectif 2 000) |
| `commandes` | Changer le `statut` : nouvelle → confirmee → en_livraison → livree (ou annulee) |
| `ambassadeurs` | Ajouter un ambassadeur : code (ex. `AWA`), nom, téléphone |

Export : dans le *Table Editor*, ouvrir la vue puis *Export* > *CSV*.

## Liens à utiliser dans les publications

Le site retient d'où vient chaque visiteur pendant 60 jours :

| Lien | Utilisation |
| --- | --- |
| `montopeci.com/inscription?src=dino` | Réponse automatique WhatsApp au mot « DINO » |
| `montopeci.com/inscription?src=qr` | QR code dans l'emballage et sur les flyers |
| `montopeci.com/inscription?src=jeu` | Jeu concours |
| `montopeci.com/?src=facebook` (instagram, tiktok…) | Lien en bio ou dans les publications |
| `montopeci.com/?amb=AWA` | Lien personnel d'un ambassadeur : ses ventes lui sont attribuées |

## Importer le fichier historique « Base de donnée TOPECI »

```
python3 supabase/import_historique.py Base_de_donnee_TOPECI.xlsx > import_historique.sql
```

Chaque ligne avec modèle et date devient une vente (statut « livree », prix non renseigné),
les autres lignes deviennent des contacts. Les numéros mal formés sont corrigés ou signalés
« à vérifier » dans les notes de la commande.

## Importer un fichier clients (Excel ou CSV)

```
python3 supabase/import_contacts.py mes_clients.xlsx > import.sql
```

Les colonnes (nom, téléphone, indicatif, email, ville, pays) sont reconnues
automatiquement. Un même numéro n'est jamais créé deux fois, même si on importe
le fichier plusieurs fois. Les anciens clients sont importés **sans** accord
marketing : leur premier message WhatsApp doit leur demander s'ils veulent
continuer à recevoir les offres. Ne jamais mettre de fichier de clients dans ce dépôt.

## Règles de protection des données

- Deux accords séparés (WhatsApp, email), jamais cochés d'avance.
- Désinscription : mettre `desinscrit = true` sur la fiche, le contact sort des listes.
- Les tables sont fermées au public : seul le serveur du site y accède.
- Vérifier les déclarations à faire auprès de l'ARTCI (Côte d'Ivoire) ; en France, le RGPD.
