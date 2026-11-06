import { lire } from "../../../lib/admin/base";
import { exigerAdmin } from "../../../lib/admin/session";
import { ajouterAmbassadeur, payerCommission } from "../actions";
import { Carte, EnTete, Vide, champ, date, etiquette, n } from "../ui";

export const metadata = { title: "Ambassadeurs" };

type Amb = { code: string; nom: string; telephone: string | null; actif: boolean; commission_par_jouet: number; commandes: number; jouets: number; commission_fcfa: number; deja_paye: number; reste_du: number };
type Paiement = { id: string; code: string; montant: number; note: string | null; created_at: string };

const fcfa = (v: number) => `${n(v)} FCFA`;

export default async function Ambassadeurs() {
  await exigerAdmin();
  const [liste, paiements] = await Promise.all([
    lire<Amb[]>("v_commissions?select=*&order=reste_du.desc,nom.asc"),
    lire<Paiement[]>("paiements_commissions?select=id,code,montant,note,created_at&order=created_at.desc&limit=10"),
  ]);
  const totalDu = liste.reduce((s, a) => s + Math.max(0, Number(a.reste_du)), 0);

  return (
    <>
      <EnTete
        titre="Ambassadeurs"
        sousTitre={
          <>Chaque jouet vendu avec leur code leur rapporte une commission. Le lien à partager : <b>montopeci.com/?amb=CODE</b>{totalDu > 0 && <> · <b className="text-tp-fuchsia">{fcfa(totalDu)} à verser</b></>}</>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Carte className="!p-0">
          {liste.length === 0 ? (
            <div className="p-5"><Vide>Aucun ambassadeur pour l’instant. Ajoute le premier avec le formulaire.</Vide></div>
          ) : (
            <ul className="divide-y divide-black/5">
              {liste.map((a) => (
                <li key={a.code} className="grid gap-3 px-5 py-4 sm:grid-cols-[1.2fr_1fr_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="font-bold">{a.nom} <span className="ml-1 rounded-md bg-tp-sable px-1.5 py-0.5 font-mono text-xs">{a.code}</span></p>
                    <p className="text-xs text-slate-500">{n(a.jouets)} jouet{a.jouets > 1 ? "s" : ""} · {n(a.commandes)} commande{a.commandes > 1 ? "s" : ""} · {fcfa(a.commission_par_jouet)} / jouet</p>
                  </div>
                  <div className="text-sm">
                    <p>Gagné : <b className="tabular-nums">{fcfa(a.commission_fcfa)}</b></p>
                    <p className="text-xs text-slate-500">Déjà versé : {fcfa(a.deja_paye)}</p>
                  </div>
                  {Number(a.reste_du) > 0 ? (
                    <form action={payerCommission} className="flex items-center gap-2">
                      <input type="hidden" name="code" value={a.code} />
                      <input type="hidden" name="montant" value={a.reste_du} />
                      <button className="rounded-2xl bg-tp-fuchsia px-3.5 py-2 text-sm font-bold text-white">Marquer {fcfa(a.reste_du)} payé</button>
                    </form>
                  ) : (
                    <span className="text-sm font-bold text-[#2f7f7f]">À jour</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Carte>

        <div className="grid content-start gap-4">
          <Carte>
            <h2 className="font-title text-lg font-bold">Ajouter un ambassadeur</h2>
            <form action={ajouterAmbassadeur} className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <label className="block"><span className={etiquette}>Nom</span><input name="nom" required className={champ} /></label>
              <label className="block"><span className={etiquette}>Code (court)</span><input name="code" required maxLength={20} placeholder="AWA" className={`${champ} uppercase`} /></label>
              <label className="block"><span className={etiquette}>Téléphone</span><input name="telephone" type="tel" className={champ} /></label>
              <label className="block"><span className={etiquette}>Commission / jouet</span><input name="commission" inputMode="numeric" defaultValue={1000} className={champ} /></label>
              <button className="rounded-2xl bg-tp-bleu px-4 py-2.5 text-sm font-bold text-white sm:col-span-2 xl:col-span-1 2xl:col-span-2">Ajouter</button>
            </form>
          </Carte>
          {paiements.length > 0 && (
            <Carte>
              <h2 className="font-title text-lg font-bold">Derniers versements</h2>
              <ul className="mt-3 divide-y divide-black/5 text-sm">
                {paiements.map((p) => (
                  <li key={p.id} className="flex justify-between gap-3 py-2"><span>{p.code} · {date(p.created_at)}</span><b className="tabular-nums">{fcfa(p.montant)}</b></li>
                ))}
              </ul>
            </Carte>
          )}
        </div>
      </div>
    </>
  );
}
