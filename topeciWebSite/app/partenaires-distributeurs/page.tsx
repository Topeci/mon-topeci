import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CalendarDays, ShieldCheck } from "lucide-react";

const benefits = [
  "Tarifs préférentiels sur les commandes groupées",
  "Produits éducatifs uniques et adaptés aux enfants",
  "Valeur culturelle forte, portée par la diaspora",
  "Support pédagogique complet pour les éducateurs",
];

const structures = [
  {
    icon: "🏫",
    title: "Établissements scolaires",
    text: "Écoles maternelles et primaires",
  },
  {
    icon: "📚",
    title: "Librairies",
    text: "Points de vente spécialisés",
  },
  {
    icon: "🤝",
    title: "Associations",
    text: "Structures culturelles et éducatives",
  },
  {
    icon: "🌍",
    title: "Particuliers engagés",
    text: "Souhaitant promouvoir nos produits",
  },
];

export default function PartenairesDistributeursPage() {
  return (
    <>
      <Header />

      <main className="bg-[#FFF9F1] pt-[88px] text-[#1E1E1E]">
        <section className="px-6 py-14 text-center">
          <h1 className="font-title text-4xl font-bold text-[#5C7DB8] md:text-5xl">
            Partenaires & Distributeurs
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Écoles, associations, librairies, boutiques et entreprises
            intéressées à distribuer ou représenter nos produits éducatifs et
            culturels.
          </p>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="rounded-2xl bg-white p-7 shadow-md">
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  Devenir partenaire TOPECI
                </h2>

                <p className="mt-6 text-base leading-8 text-slate-700">
                  Cet espace est dédié aux structures éducatives, culturelles et
                  commerciales qui souhaitent proposer les produits TOPECI. Nos
                  supports sont conçus pour transmettre les langues africaines
                  de manière ludique aux plus jeunes.
                </p>

                <h3 className="mt-8 font-title text-xl font-bold text-[#D98B5F]">
                  Pourquoi collaborer avec nous ?
                </h3>

                <ul className="mt-5 space-y-4 text-base text-slate-700">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-4">
                      <span className="text-[#79C8C7]">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
              </div>

              <div className="rounded-2xl bg-[#D98B5F] p-7 text-white shadow-md">
                <h2 className="flex items-center gap-2 font-title text-2xl font-bold">
                  <CalendarDays size={22} />
                  Catalogue disponible sur demande
                </h2>

                <p className="mt-6 text-base leading-8">
                  Remplissez le formulaire pour recevoir le catalogue
                  professionnel TOPECI et obtenir une offre personnalisée selon
                  votre structure.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-block rounded-xl bg-white px-7 py-3 text-sm font-semibold text-[#D98B5F]"
                >
                  Demander le catalogue
                </Link>

                <p className="mt-4 text-sm">
                  Commandes professionnelles disponibles sur demande.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-md">
              <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                Nous contacter
              </h2>

              <form
                action="mailto:contact@mon-topeci.com"
                method="post"
                encType="text/plain"
                className="mt-7 space-y-5"
              >
                <div>
                  <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                    Nom de la structure *
                  </label>
                  <input
                    name="structure"
                    type="text"
                    placeholder="Nom de votre établissement ou entreprise"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-[#79C8C7]"
                  />
                </div>

                <div>
                  <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                    Prénom & nom *
                  </label>
                  <input
                    name="nom"
                    type="text"
                    placeholder="Votre prénom et nom"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-[#79C8C7]"
                  />
                </div>

                <div>
                  <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                    Numéro d&apos;immatriculation
                  </label>
                  <input
                    name="immatriculation"
                    type="text"
                    placeholder="RCCM, TVA, DFE ou équivalent"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-[#79C8C7]"
                  />
                </div>

                <div>
                  <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                    Pays *
                  </label>
                  <select
                    name="pays"
                    defaultValue=""
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:border-[#79C8C7]"
                  >
                    <option value="" disabled>
                      Sélectionnez votre pays
                    </option>
                    <option value="Côte d'Ivoire">Côte d&apos;Ivoire</option>
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Canada">Canada</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-[#79C8C7]"
                    />
                  </div>

                  <div>
                    <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                      Téléphone
                    </label>
                    <input
                      name="telephone"
                      type="tel"
                      placeholder="+225 00 00 00 00"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-[#79C8C7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                    Précisez vos besoins / projets *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Décrivez votre structure, vos besoins en produits TOPECI, le nombre d'enfants concernés, etc."
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-[#79C8C7]"
                  />
                </div>

                <div className="space-y-3 text-sm leading-6 text-slate-500">
                  <p>
                    Les champs marqués d&apos;un astérisque (*) sont
                    obligatoires.
                  </p>

                  <p className="flex items-start gap-2">
                    <ShieldCheck
                      size={18}
                      className="mt-1 shrink-0 text-[#79C8C7]"
                    />
                    <span>
                      Ce formulaire est sécurisé et protégé. Vos données sont
                      traitées conformément à notre{" "}
                      <Link
                        href="/politique-confidentialite"
                        className="text-[#79C8C7] underline"
                      >
                        Politique de confidentialité
                      </Link>
                      .
                    </span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#D98B5F] px-6 py-3.5 font-semibold text-white"
                >
                  Envoyer ma demande
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl rounded-2xl bg-white px-6 py-9 text-center shadow-md">
            <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
              Types de structures éligibles
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-4">
              {structures.map((item) => (
                <div key={item.title}>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#79C8C7] text-2xl">
                    {item.icon}
                  </div>

                  <h3 className="mt-5 font-title text-base font-bold text-[#1E1E1E]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}