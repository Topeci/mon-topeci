import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import LogoTopeci from "@/assets/images/logotopeci.png";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          {/* En-tête */}
          <a
            href="/"
            className="flex items-center justify-center mt-5 hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src={LogoTopeci}
              alt="Logo topeci"
              className="h-10 w-auto md:h-12"
            />
          </a>
          <CardDescription className="font-glacial-indifference">
            Bienvenue ! Connectez-vous pour continuer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card" />
              <Field>
                <FieldLabel htmlFor="email" className="font-waffle-soft">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="font-waffle-soft">
                    Mot de Passe
                  </FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline text-red-500"
                  >
                    Mot de Passe oublié ?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="button" className="bg-[#DCCC41] text-white">
                  Se connecter
                </Button>
                <FieldDescription className="text-center font-glacial-indifference">
                  Vous n'avez pas de compte ?{" "}
                  <a href="/Dashboard" className="text-[#BE356A]">
                    Inscrivez-vous
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
