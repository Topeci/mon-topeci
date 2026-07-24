import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />

      <main className="bg-white pt-[88px] text-[#1E1E1E]">
        <section className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-title text-4xl font-bold text-[#D98B5F] md:text-5xl">
              Mentions légales
            </h1>

            <div className="mt-10 space-y-8 text-base leading-8 text-slate-700">
              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  1. Éditeur du site
                </h2>
                <p className="mt-4">
                  Le présent site est édité par TOPECI.
                  <br />
                  Société : SAS
                  <br />
                  Capital social : 1 000 000 FCFA
                  <br />
                  Siège social : Abidjan Faya Jules Verne
                  <br />
                  RCCM / SIRET : CI-ABJ-03-2024-B16-00166
                  <br />
                  Numéro Compte Contribuable : 2404404
                  <br />
                  Email : info@montopeci.com
                  <br />
                  Téléphone : +225 17 26 16 133
                </p>

                <p className="mt-4">
                  Représentants légaux :
                  <br />
                  Jean-Marc Bonny Koffi, Co-fondateur
                  <br />
                  Cindy Ornella Kouakou, Co-fondatrice
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  2. Hébergement
                </h2>
                <p className="mt-4">
                  Le site est hébergé par : OVH SAS, 2 rue Kellermann, 59100
                  Roubaix, France.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  3. Propriété intellectuelle
                </h2>
                <p className="mt-4">
                  L’ensemble des éléments figurant sur le site TOPECI (textes,
                  images, illustrations, logos, icônes, sons, vidéos, logiciels,
                  bases de données, etc.) sont protégés par les dispositions du
                  Code de la propriété intellectuelle et demeurent la propriété
                  exclusive de TOPECI ou de ses partenaires.
                </p>
                <p className="mt-4">
                  Toute reproduction, représentation, modification, publication,
                  transmission ou dénaturation totale ou partielle du site ou de
                  son contenu, par quelque procédé que ce soit, sans
                  l’autorisation expresse de TOPECI, est interdite et pourra
                  donner lieu à des poursuites.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  4. Données personnelles
                </h2>
                <p className="mt-4">
                  TOPECI est amené à collecter et traiter certaines données
                  personnelles (nom, prénom, email, préférences linguistiques,
                  progression éducative, etc.) dans le cadre de ses services.
                  Les traitements réalisés respectent la réglementation en
                  vigueur, notamment le RGPD.
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-6">
                  <li>Responsable du traitement : TOPECI</li>
                  <li>
                    Finalité : accès aux contenus éducatifs, personnalisation de
                    l’expérience utilisateur, communication institutionnelle.
                  </li>
                  <li>
                    Durée de conservation : limitée et proportionnée aux
                    finalités.
                  </li>
                  <li>
                    Droits des utilisateurs : droit d’accès, de rectification,
                    d’opposition, d’effacement et de portabilité.
                  </li>
                </ul>

                <p className="mt-4">
                  Pour exercer vos droits : info@montopeci.com
                  <br />
                  Pour plus de détails, consultez notre Politique de
                  confidentialité & RGPD.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  5. Responsabilité
                </h2>
                <p className="mt-4">
                  TOPECI met tout en œuvre pour assurer l’exactitude et la mise à
                  jour des informations diffusées sur le site. Toutefois, TOPECI
                  ne saurait être tenu responsable des erreurs ou omissions, ni
                  des éventuels dommages liés à l’utilisation du site ou de ses
                  contenus.
                </p>
                <p className="mt-4">
                  Le site peut contenir des liens vers d’autres sites internet.
                  TOPECI n’exerce aucun contrôle sur ces sites et décline toute
                  responsabilité quant à leurs contenus.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  6. Cookies
                </h2>
                <p className="mt-4">
                  Le site utilise des cookies et traceurs pour améliorer
                  l’expérience utilisateur. Pour plus d’informations, consultez
                  notre page Cookies & traceurs.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  7. Droit applicable et juridiction compétente
                </h2>
                <p className="mt-4">
                  Les présentes mentions légales sont régies par le droit
                  ivoirien. En cas de litige, et à défaut de résolution amiable,
                  les tribunaux compétents seront ceux du ressort d’Abidjan.
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