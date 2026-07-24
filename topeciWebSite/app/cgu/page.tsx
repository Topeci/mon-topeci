import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CGUPage() {
  return (
    <>
      <Header />

      <main className="bg-white pt-[88px] text-[#1E1E1E]">
        <section className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-title text-4xl font-bold text-[#D98B5F] md:text-5xl">
              Conditions Générales d’Utilisation
            </h1>

            <div className="mt-8 rounded-2xl bg-[#FFF9F1] p-6 text-base leading-8 text-slate-700">
              <p>
                Les présentes Conditions Générales d’Utilisation encadrent
                l’accès et l’utilisation du site TOPECI, de ses contenus, pages
                d’information, produits présentés et formulaires de contact.
              </p>
            </div>

            <div className="mt-10 space-y-8 text-base leading-8 text-slate-700">
              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  1. Objet
                </h2>
                <p className="mt-4">
                  Le site TOPECI a pour objet de présenter la marque, ses
                  produits éducatifs et culturels, ses activités, ainsi que les
                  moyens de contact permettant aux utilisateurs de se renseigner
                  ou de commander.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  2. Acceptation des conditions
                </h2>
                <p className="mt-4">
                  L’accès au site implique l’acceptation pleine et entière des
                  présentes Conditions Générales d’Utilisation. Si l’utilisateur
                  n’accepte pas ces conditions, il est invité à ne pas utiliser
                  le site.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  3. Accès au site
                </h2>
                <p className="mt-4">
                  TOPECI s’efforce d’assurer l’accès au site de manière continue.
                  Toutefois, l’accès peut être suspendu temporairement pour des
                  raisons de maintenance, de mise à jour, de sécurité ou pour
                  toute autre raison technique.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  4. Utilisation du site
                </h2>
                <p className="mt-4">
                  L’utilisateur s’engage à utiliser le site de manière loyale,
                  conforme à sa destination et dans le respect des lois
                  applicables. Il s’interdit notamment toute utilisation
                  frauduleuse, abusive ou portant atteinte aux droits de TOPECI,
                  de ses partenaires ou de tiers.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  5. Informations publiées
                </h2>
                <p className="mt-4">
                  Les informations présentes sur le site sont fournies à titre
                  indicatif. TOPECI peut modifier, corriger ou mettre à jour les
                  contenus à tout moment, notamment les descriptions de produits,
                  prix, disponibilités, délais ou informations pratiques.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  6. Propriété intellectuelle
                </h2>
                <p className="mt-4">
                  Les textes, images, illustrations, logos, vidéos, sons,
                  éléments graphiques et contenus présents sur le site sont la
                  propriété de TOPECI ou de ses partenaires. Toute reproduction
                  ou utilisation non autorisée est interdite.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  7. Données personnelles
                </h2>
                <p className="mt-4">
                  L’utilisation du site peut impliquer la collecte de certaines
                  données personnelles, notamment via les formulaires de contact
                  ou de commande. Pour plus d’informations, consultez notre{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="font-semibold text-[#D93B7B]"
                  >
                    Politique de confidentialité
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  8. Cookies
                </h2>
                <p className="mt-4">
                  Le site peut utiliser des cookies nécessaires à son bon
                  fonctionnement et, le cas échéant, des cookies de mesure
                  d’audience sans finalité publicitaire. Consultez notre{" "}
                  <Link
                    href="/politique-cookies"
                    className="font-semibold text-[#D93B7B]"
                  >
                    Politique cookies
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  9. Liens externes
                </h2>
                <p className="mt-4">
                  Le site peut contenir des liens vers des sites tiers. TOPECI
                  n’exerce aucun contrôle sur ces sites et ne saurait être tenu
                  responsable de leurs contenus, services ou pratiques.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  10. Responsabilité
                </h2>
                <p className="mt-4">
                  TOPECI ne saurait être tenu responsable des dommages directs ou
                  indirects résultant de l’utilisation du site, d’une
                  interruption, d’un dysfonctionnement ou d’une erreur dans les
                  contenus affichés.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  11. Modification des CGU
                </h2>
                <p className="mt-4">
                  TOPECI se réserve le droit de modifier les présentes CGU à tout
                  moment. Les utilisateurs sont invités à les consulter
                  régulièrement.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  12. Droit applicable
                </h2>
                <p className="mt-4">
                  Les présentes CGU sont régies par le droit ivoirien. En cas de
                  litige, les juridictions compétentes seront celles du ressort
                  d’Abidjan, sauf disposition légale contraire.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}