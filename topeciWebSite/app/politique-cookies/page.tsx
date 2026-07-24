import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PolitiqueCookiesPage() {
  return (
    <>
      <Header />

      <main className="bg-white pt-[88px] text-[#1E1E1E]">
        <section className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-title text-4xl font-bold text-[#D98B5F] md:text-5xl">
              Cookies & Traceurs
            </h1>

            <div className="mt-8 rounded-2xl bg-[#FFF9F1] p-6 text-base leading-8 text-slate-700">
              <p>
                Cette page explique comment TOPECI utilise des cookies et
                technologies similaires sur son site public afin d’assurer le bon
                fonctionnement du site, améliorer l’expérience de navigation et
                faciliter l’accès aux informations liées à ses produits éducatifs
                et culturels.
              </p>

              <p className="mt-4">
                TOPECI ne diffuse pas de publicité ciblée et n’utilise pas les
                cookies pour établir des profils publicitaires. Le site a pour
                objectif principal de présenter ses articles, ses livres audio,
                ses activités et de faciliter la prise de contact ou la commande.
              </p>

              <p className="mt-4">
                Pour en savoir plus sur le traitement de vos données
                personnelles, consultez notre{" "}
                <Link
                  href="/politique-confidentialite"
                  className="font-semibold text-[#D93B7B]"
                >
                  Politique de confidentialité
                </Link>
                .
              </p>
            </div>

            <div className="mt-10 space-y-8 text-base leading-8 text-slate-700">
              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  1. Qu’est-ce qu’un cookie ?
                </h2>

                <p className="mt-4">
                  Un cookie est un petit fichier texte déposé sur votre appareil
                  lors de la consultation d’un site. Il permet de stocker des
                  informations techniques afin de reconnaître votre navigateur,
                  mémoriser certaines préférences ou assurer le bon
                  fonctionnement du site.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  2. Types de cookies que nous utilisons
                </h2>

                <ul className="mt-4 list-disc space-y-3 pl-6">
                  <li>
                    <strong>Cookies strictement nécessaires :</strong>{" "}
                    indispensables au fonctionnement du site, à la sécurité, à
                    la navigation entre les pages et à l’affichage correct des
                    contenus.
                  </li>

                  <li>
                    <strong>Cookies de préférence :</strong> permettent de
                    mémoriser certains choix simples de l’utilisateur, par
                    exemple la langue d’affichage ou certaines préférences de
                    navigation.
                  </li>

                  <li>
                    <strong>Cookies de mesure d’audience :</strong> peuvent être
                    utilisés pour comprendre l’usage général du site, par exemple
                    les pages les plus consultées ou les contenus les plus
                    visités, sans finalité publicitaire.
                  </li>

                  <li>
                    <strong>Cookies de sécurité :</strong> contribuent à
                    protéger le site contre les comportements anormaux, les accès
                    abusifs ou les tentatives de fraude.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  3. Finalités spécifiques à TOPECI
                </h2>

                <ul className="mt-4 list-disc space-y-3 pl-6">
                  <li>Assurer le bon fonctionnement du site vitrine.</li>
                  <li>Faciliter la consultation des produits et contenus TOPECI.</li>
                  <li>Améliorer l’expérience de navigation.</li>
                  <li>Mesurer l’intérêt général pour les pages et articles.</li>
                  <li>Sécuriser l’accès au site et aux formulaires.</li>
                </ul>

                <p className="mt-4">
                  Les cookies utilisés par TOPECI ne stockent pas d’informations
                  sensibles et ne sont pas utilisés à des fins de publicité
                  ciblée.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  4. Fondements juridiques
                </h2>

                <p className="mt-4">
                  Les cookies strictement nécessaires reposent sur l’intérêt
                  légitime de TOPECI à assurer le bon fonctionnement et la
                  sécurité de son site.
                </p>

                <p className="mt-4">
                  Les cookies non essentiels, notamment ceux liés à la mesure
                  d’audience, peuvent être soumis à votre consentement lorsque la
                  réglementation l’exige.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  5. Durée de conservation
                </h2>

                <ul className="mt-4 list-disc space-y-3 pl-6">
                  <li>
                    <strong>Cookies de session :</strong> supprimés à la
                    fermeture du navigateur.
                  </li>
                  <li>
                    <strong>Cookies persistants :</strong> conservés pour une
                    durée limitée selon leur objectif.
                  </li>
                  <li>
                    <strong>Cookies nécessaires :</strong> conservés uniquement
                    pour la durée utile au fonctionnement du service.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  6. Gestion de votre consentement
                </h2>

                <p className="mt-4">
                  Lorsque des cookies non essentiels sont utilisés, un bandeau ou
                  un module de gestion peut permettre d’accepter, refuser ou
                  modifier vos choix.
                </p>

                <p className="mt-4">
                  Vous pouvez également modifier vos préférences directement dans
                  les paramètres de votre navigateur.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  7. Paramètres de navigateur
                </h2>

                <p className="mt-4">
                  Vous pouvez configurer votre navigateur pour accepter, refuser
                  ou supprimer des cookies. Le refus des cookies strictement
                  nécessaires peut altérer l’accès ou le bon fonctionnement du
                  site.
                </p>

                <ul className="mt-4 list-disc space-y-3 pl-6">
                  <li>Chrome : Paramètres &gt; Confidentialité et sécurité.</li>
                  <li>Firefox : Options &gt; Vie privée et sécurité.</li>
                  <li>Safari : Préférences &gt; Confidentialité.</li>
                  <li>Edge : Paramètres &gt; Cookies et autorisations de site.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  8. Cookies tiers
                </h2>

                <p className="mt-4">
                  TOPECI peut recourir à certains services tiers nécessaires au
                  fonctionnement du site, comme l’hébergement, l’intégration de
                  cartes, l’affichage de vidéos ou la sécurité technique. Ces
                  services peuvent déposer leurs propres cookies conformément à
                  leurs politiques respectives.
                </p>

                <p className="mt-4">
                  Aucun cookie tiers n’est utilisé par TOPECI à des fins de
                  publicité ciblée.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  9. Sécurité et confidentialité
                </h2>

                <p className="mt-4">
                  TOPECI applique des mesures techniques et organisationnelles
                  destinées à protéger l’intégrité et la confidentialité des
                  informations liées à la navigation : sécurité du site,
                  limitation des accès et minimisation des données collectées.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  10. Modifications
                </h2>

                <p className="mt-4">
                  TOPECI peut mettre à jour cette page afin de refléter des
                  évolutions légales, techniques ou organisationnelles. Les
                  changements significatifs seront communiqués par les moyens
                  appropriés.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  11. Contact
                </h2>

                <p className="mt-4">
                  Pour toute question relative aux cookies, vous pouvez nous
                  contacter via la page{" "}
                  <Link href="/contact" className="font-semibold text-[#D93B7B]">
                    Contact
                  </Link>
                  .
                </p>

                <p className="mt-4">
                  Vous pouvez également consulter nos{" "}
                  <Link href="/cgu" className="font-semibold text-[#D93B7B]">
                    Conditions Générales d'Utilisation
                  </Link>
                  , nos{" "}
                  <Link href="/cgv" className="font-semibold text-[#D93B7B]">
                    Conditions Génarales de Ventes
                  </Link>{" "}
                  et notre{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="font-semibold text-[#D93B7B]"
                  >
                    Politique de confidentialité
                  </Link>
                  .
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