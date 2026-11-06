import { cookies } from "next/headers";
import { COOKIE_ADMIN, creerJeton, trouverAdmin } from "../../../lib/admin/session";

/** Ouvre la session admin à partir du jeton Supabase reçu par le lien e-mail. */
export async function POST(request: Request) {
  const corps = await request.json().catch(() => null);
  const jeton = typeof corps?.access_token === "string" ? corps.access_token : "";
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const clePublique = process.env.SUPABASE_ANON_KEY;
  if (!jeton || !url || !clePublique) return Response.json({ erreur: "Lien invalide." }, { status: 400 });

  // Supabase confirme à qui appartient le jeton
  const reponse = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: clePublique, Authorization: `Bearer ${jeton}` },
    cache: "no-store",
  });
  if (!reponse.ok) return Response.json({ erreur: "Ce lien a expiré. Demande-en un nouveau." }, { status: 401 });
  const utilisateur = await reponse.json();
  const email = typeof utilisateur?.email === "string" ? utilisateur.email.toLowerCase() : "";

  const admin = email ? await trouverAdmin(email) : null;
  if (!admin) return Response.json({ erreur: "Cette adresse n’a pas accès à l’espace équipe." }, { status: 403 });

  const { valeur, maxAge } = await creerJeton(admin.email);
  (await cookies()).set(COOKIE_ADMIN, valeur, {
    httpOnly: true,
    secure: new URL(request.url).protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return Response.json({ ok: true });
}
