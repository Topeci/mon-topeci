import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye, Star } from "lucide-react";

type ProductCardProps = {
  name: string;
  description: string;
  price: number;
  image?: string | null;
  category?: string;
  slug: string;
  badge?: string;
  rating?: string;
  oldPrice?: string;
  color?: string;
  label?: string;
};

export default function ProductCard({
  name,
  description,
  price,
  image,
  category,
  slug,
  badge,
  rating,
  oldPrice,
  color = "#79C8C7",
  label,
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-[210px] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <span className="font-title text-4xl font-bold text-white">
              {label}
            </span>
          </div>
        )}

        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#D98B5F] px-3 py-1 text-xs font-semibold text-white">
            {badge}
          </span>
        )}

        {rating && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold shadow-sm">
            <Star
              size={15}
              className="fill-[#F2C94C] text-[#F2C94C]"
            />
            {rating}
          </div>
        )}
      </div>

      <div className="p-5">
        {category && (
          <p className="mb-2 text-sm font-semibold text-[#D93B7B]">
            {category}
          </p>
        )}

        <h3 className="font-title text-xl font-bold leading-snug text-[#5C7DB8]">
          {name}
        </h3>

        <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-600">
          {description}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <p className="text-xl font-bold text-[#D98B5F]">
            {price.toLocaleString("fr-FR")} CFA
          </p>

          {oldPrice && (
            <p className="text-sm text-slate-400 line-through">
              {oldPrice}
            </p>
          )}
        </div>

        <div className="mt-5 flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#79C8C7] py-3 text-sm font-semibold text-white transition hover:opacity-90">
            <ShoppingCart size={18} />
            Ajouter
          </button>

          <Link
            href={`/boutique/${slug}`}
            className="flex w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}