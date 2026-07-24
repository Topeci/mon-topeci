import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
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
    href: "https://www.linkedin.com/company/topeci/",
    
    icon: FaLinkedinIn,
  },
  {
    name: "YouTube",
    href: "https://m.youtube.com/watch?v=qKfgQsuhTrk&t=2s",
    icon: FaYoutube,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#79C8C7] text-[#1E1E1E]">
      <div className="grid gap-8 px-5 py-10 md:grid-cols-4 lg:px-10">
        <div>
          <h3 className="mb-4 font-title text-[15px] font-bold uppercase text-[#D93B7B]">
            La marque
          </h3>

          <ul className="space-y-2 text-[14px]">
            <li>
              <Link href="/notre-histoire">Notre histoire</Link>
            </li>

            <li>
              <Link href="/boutique">Boutique</Link>
            </li>

            <li>
              <Link href="/blog">Blog / Activités</Link>
            </li>

            <li>
              <Link href="/partenaires-distributeurs">
                Partenaires & Distributeurs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-title text-[15px] font-bold uppercase text-[#D93B7B]">
            Besoin d&apos;aide ?
          </h3>

          <ul className="space-y-2 text-[14px]">
            <li>
              <Link href="/faq">FAQ</Link>
            </li>

            <li>
              <Link href="/contact">Nous contacter</Link>
            </li>

            <li>
              <Link href="/politique-livraison">Politique de livraison</Link>
            </li>

            <li>
              <Link href="/politique-remboursement-retour">
                Politique remboursement & retour
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-title text-[15px] font-bold uppercase text-[#D93B7B]">
            Legal
          </h3>

          <ul className="space-y-2 text-[14px]">
            <li>
              <Link href="/cgv">CGV</Link>
            </li>

            <li>
              <Link href="/cgu">CGU</Link>
            </li>

            <li>
              <Link href="/politique-cookies">Politique cookies</Link>
            </li>

            <li>
              <Link href="/mentions-legales">Mentions légales</Link>
            </li>

            <li>
              <Link href="/politique-confidentialite">
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-title text-[15px] font-bold uppercase text-[#D93B7B]">
            Contact
          </h3>

          <p className="mb-2 text-[14px] text-white">
            SAV & autres questions ?
          </p>

          <p className="mb-2 text-[14px] text-white">
            Email : montopeci@gmail.com
          </p>

          <p className="mb-5 text-[14px] text-white">
            Du lundi au vendredi
            <br />
            de 8h à 18h
          </p>

          <div className="mt-5 flex gap-5 text-[20px] text-[#D93B7B]">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="transition hover:text-white"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-black/30 px-5 py-4 md:flex-row lg:px-10">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <div className="relative h-[45px] w-[130px] shrink-0">
            <Image
              src="/images/Nouveau_Logo_TOPECI_Nouvelle_Couleurs 2.png"
              alt="Logo TOPECI"
              fill
              className="object-contain"
            />
          </div>

          <p className="text-center text-[16px] italic md:text-left">
            Un jeu, une culture, un monde à découvrir.
          </p>
        </div>

        <p className="text-[12px]">© 2026 TOPECI. Tous droits réservés.</p>
      </div>
    </footer>
  );
}