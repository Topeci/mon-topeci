import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/legal/mentions-legales")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto text-gray-800">
      {/* En-tête */}
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold text-[#4E6FA7] font-waffle-soft mb-4">
          Mentions Légales
        </h1>
        <div className="w-24 h-1 bg-[#D68E54] rounded mx-auto"></div>
      </div>

      <div className="space-y-6 text-justify mx-[-65px]">
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Éditeur du site</h2>
        <p>
          Le présent site est édité par <strong>TOPECI</strong>.
        </p>
        <ul className="list-disc list-inside">
          <li>Société : SAS</li>
          <li>Capital social : 1 000 000 FCFA</li>
          <li>Siège social : Abidjan Faya Jules Verne</li>
          <li>RCCM / SIRET : CI-ABJ-03-2024-B16-00166</li>
          <li>Numéro Compte Contribuable : 2404404</li>
          <li>Email : info@montopeci.com</li>
          <li>Téléphone : +225 17 26 16 133</li>
          <li>
            Représentants légaux :
            <ul className="list-disc list-inside ml-6">
              <li>Jean-Marc Bonny Koffi, Co-fondateur</li>
              <li>Cindy Ornella Kouakou, Co-fondatrice</li>
            </ul>
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Hébergement</h2>
        <p>
          Le site est hébergé par : <strong>OVH SAS</strong>, 2 rue Kellermann,
          59100 Roubaix, France.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. Propriété intellectuelle
        </h2>
        <p>
          L’ensemble des éléments figurant sur le site TOPECI (textes, images,
          illustrations, logos, icônes, sons, vidéos, logiciels, bases de
          données, etc.) sont protégés par les dispositions du Code de la
          propriété intellectuelle et demeurent la propriété exclusive de TOPECI
          ou de ses partenaires. Toute reproduction, représentation,
          modification, publication, transmission ou dénaturation totale ou
          partielle du site ou de son contenu, par quelque procédé que ce soit,
          sans l’autorisation expresse de TOPECI, est interdite et pourra donner
          lieu à des poursuites.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Données personnelles
        </h2>
        <p>
          TOPECI est amené à collecter et traiter certaines données personnelles
          (nom, prénom, email, préférences linguistiques, progression éducative,
          etc.) dans le cadre de ses services. Les traitements réalisés
          respectent la réglementation en vigueur (RGPD – Règlement Général sur
          la Protection des Données).
        </p>
        <ul className="list-disc list-inside">
          <li>Responsable du traitement : TOPECI</li>
          <li>
            Finalité : accès aux contenus éducatifs, personnalisation de
            l’expérience utilisateur, communication institutionnelle.
          </li>
          <li>
            Durée de conservation : limitée et proportionnée aux finalités.
          </li>
          <li>
            Droits des utilisateurs : vous disposez d’un droit d’accès, de
            rectification, d’opposition, d’effacement et de portabilité de vos
            données.
          </li>
          <li>
            Pour exercer vos droits : 📧{" "}
            <a
              href="mailto:info@montopeci.com"
              className="text-blue-600 underline"
            >
              info@montopeci.com
            </a>
          </li>
        </ul>
        <p>
          Pour plus de détails, consultez notre Politique de confidentialité
          &amp; RGPD.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Responsabilité</h2>
        <p>
          TOPECI met tout en œuvre pour assurer l’exactitude et la mise à jour
          des informations diffusées sur le site. Toutefois, TOPECI ne saurait
          être tenu responsable des erreurs ou omissions, ni des éventuels
          dommages liés à l’utilisation du site ou de ses contenus. Le site peut
          contenir des liens vers d’autres sites internet. TOPECI n’exerce aucun
          contrôle sur ces sites et décline toute responsabilité quant à leurs
          contenus.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Cookies</h2>
        <p>
          Le site utilise des cookies et traceurs pour améliorer l’expérience
          utilisateur. Pour plus d’informations, consultez notre page{" "}
          <a href="/_home/cookies" className="text-blue-600 underline">
            Cookies &amp; traceurs
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          7. Droit applicable et juridiction compétente
        </h2>
        <p>
          Les présentes mentions légales sont régies par le{" "}
          <strong>droit ivoirien</strong>. En cas de litige, et à défaut de
          résolution amiable, les tribunaux compétents seront ceux du ressort d’{" "}
          <strong>Abidjan</strong>.
        </p>
      </div>
    </div>
  );
}
