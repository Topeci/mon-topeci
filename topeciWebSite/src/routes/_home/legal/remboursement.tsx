import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/legal/remboursement")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto text-gray-800">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-[#4E6FA7] font-waffle-soft mb-4">
          Politique de remboursement & retour
        </h1>
        <div className="w-24 h-1 bg-[#D68E54] mx-auto mb-6" />
      </div>

      {/* Contenu */}
      <section className="space-y-6 leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">1. Objet</h2>
          <p>
            [Espace pour expliquer l’objectif de la politique de remboursement
            et retour]
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">
            2. Conditions d’éligibilité
          </h2>
          <p>
            [Espace pour détailler les cas où un remboursement ou retour est
            accepté]
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">
            3. Produits exclus
          </h2>
          <p>
            [Espace pour indiquer les produits non remboursables ou non
            retournables]
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">
            4. Procédure de retour
          </h2>
          <p>
            [Espace pour décrire les étapes à suivre pour effectuer un retour]
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">5. Délais</h2>
          <p>
            [Espace pour préciser le délai maximal pour demander un
            remboursement ou retour]
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">
            6. Remboursement
          </h2>
          <p>
            [Espace pour expliquer les modalités de remboursement : méthode,
            délais, etc.]
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">7. Contact</h2>
          <p>
            📧 Service client TOPECI <br />
            Email : [email de contact] <br />
            Téléphone : [numéro si applicable] <br />
            Adresse : [adresse du siège social]
          </p>
        </div>
      </section>
    </div>
  );
}

export default RouteComponent;
