import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MapPin, Phone, Store } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/topeci__/",
    icon: FaInstagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@topecitopeci?lang=fr",
    icon: FaTiktok,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61554150122585",
    icon: FaFacebookF,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/bonny-jean-marc-koffi-359571210/",
    icon: FaLinkedinIn,
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen overflow-x-hidden bg-white pt-[72px] text-[#1E1E1E] sm:pt-[80px] lg:pt-[88px]">
        <section
          className="relative w-full overflow-hidden bg-[#FFF9F1]"
          aria-label="Contactez TOPECI"
        >
          <Image
            src="/images/bannière page CONTACT.png"
            alt="Entrons en contact avec TOPECI"
            width={1920}
            height={650}
            priority
            sizes="100vw"
            className="block h-auto w-full object-contain object-center"
          />
        </section>

        <section className="px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto grid min-w-0 max-w-6xl gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="space-y-5 sm:space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">
                <div className="flex items-start gap-3 sm:gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#79C8C7] text-white sm:h-12 sm:w-12">
                    <MapPin size={20} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-title text-lg font-bold text-[#5C7DB8] sm:text-xl">
                      Localisation
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                      TOPECI
                      <br />
                      Abidjan – Faya
                      <br />
                      Côte d&apos;Ivoire
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">
                <div className="flex items-start gap-3 sm:gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D93B7B] text-white sm:h-12 sm:w-12">
                    <Phone size={20} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-title text-lg font-bold text-[#5C7DB8] sm:text-xl">
                      Téléphone / WhatsApp
                    </h2>

                    <p className="mt-3 break-words text-sm leading-6 text-slate-600 sm:text-base">
                      +225 01 72 61 61 33
                      <br />
                      Numéro principal / WhatsApp
                    </p>

                    <a
                      href="https://wa.me/2250172616133"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#79C8C7] px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#66b8b7] focus:outline-none focus:ring-2 focus:ring-[#79C8C7] focus:ring-offset-2 min-[390px]:w-auto sm:px-6"
                    >
                      Écrire sur WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">
                <div className="flex items-start gap-3 sm:gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F2C94C] text-white sm:h-12 sm:w-12">
                    <Store size={20} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-title text-lg font-bold text-[#5C7DB8] sm:text-xl">
                      Nos points de vente
                    </h2>

                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                      <li>LIBRAIRIE DE FRANCE CIV</li>
                      <li>FNAC CIV</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">
                <h2 className="font-title text-lg font-bold text-[#5C7DB8] sm:text-xl">
                  Suivez-nous
                </h2>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-[#1E1E1E] sm:gap-5">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.name}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1E1E1E] shadow-sm transition hover:bg-[#79C8C7] hover:text-white sm:h-11 sm:w-11"
                      >
                        <Icon size={19} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-md sm:p-6 md:p-8">
              <h2 className="font-title text-xl font-bold text-[#5C7DB8] sm:text-2xl">
                Envoyez-nous un message
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                Remplissez le formulaire ci-dessous pour nous contacter.
              </p>

              <form
                action="mailto:montopeci@gmail.com"
                method="post"
                encType="text/plain"
                className="mt-6 space-y-5"
              >
                <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-nom"
                      className="font-title text-sm font-semibold text-[#5C7DB8]"
                    >
                      Nom
                    </label>

                    <input
                      type="text"
                      id="contact-nom"
                      name="nom"
                      placeholder="Votre nom"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-prenom"
                      className="font-title text-sm font-semibold text-[#5C7DB8]"
                    >
                      Prénom
                    </label>

                    <input
                      type="text"
                      id="contact-prenom"
                      name="prenom"
                      placeholder="Votre prénom"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                    />
                  </div>
                </div>

                <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-title text-sm font-semibold text-[#5C7DB8]"
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      placeholder="exemple@domaine.com"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-telephone"
                      className="font-title text-sm font-semibold text-[#5C7DB8]"
                    >
                      Téléphone
                    </label>

                    <input
                      type="tel"
                      id="contact-telephone"
                      name="telephone"
                      placeholder="+225 00 00 00 00 00"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-sujet"
                    className="font-title text-sm font-semibold text-[#5C7DB8]"
                  >
                    Sujet
                  </label>

                  <input
                    type="text"
                    id="contact-sujet"
                    name="sujet"
                    placeholder="Objet de votre demande"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="font-title text-sm font-semibold text-[#5C7DB8]"
                  >
                    Message
                  </label>

                  <textarea
                    name="message"
                    id="contact-message"
                    rows={6}
                    placeholder="Décrivez votre besoin"
                    className="mt-2 min-h-[150px] w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#79C8C7] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#66b8b7] sm:w-auto sm:text-base"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}