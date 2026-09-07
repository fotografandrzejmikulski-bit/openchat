"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useActionState, useEffect, useState } from "react";
import { AurelisBrand } from "@/components/aurelis-brand";
import { AuthForm } from "@/components/auth-form";
import { SubmitButton } from "@/components/submit-button";
import { toast } from "@/components/toast";
import { type RegisterActionState, register } from "../actions";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [state, formAction] = useActionState<RegisterActionState, FormData>(register, { status: "idle" });
  const { update: updateSession } = useSession();

  useEffect(() => {
    if (state.status === "user_exists") toast({ type: "error", description: "Konto z tym adresem już istnieje." });
    else if (state.status === "failed") toast({ type: "error", description: "Nie udało się utworzyć konta." });
    else if (state.status === "invalid_data") toast({ type: "error", description: "Sprawdź poprawność danych formularza." });
    else if (state.status === "success") {
      toast({ type: "success", description: "Konto zostało utworzone." });
      setIsSuccessful(true);
      updateSession();
      router.refresh();
    }
  }, [state.status, router, updateSession]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  return (
    <main className="relative flex h-dvh w-screen items-start justify-center overflow-hidden bg-background px-4 pt-12 md:items-center md:pt-0">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(90,15,36,0.08),transparent_34%)]" />
      <div className="relative flex w-full max-w-md flex-col gap-9 overflow-hidden rounded-3xl border border-border/70 bg-card/70 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="flex flex-col items-center justify-center text-center">
          <AurelisBrand />
          <div className="aurelis-gold-line mt-5 w-24 opacity-70" />
          <h1 className="aurelis-display mt-6 text-3xl font-semibold">Dołącz do AURELIS</h1>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Utwórz konto, aby bezpiecznie zachować rozmowy, dokumenty i własną historię pracy.</p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>Utwórz konto</SubmitButton>
          <p className="mt-4 text-center text-muted-foreground text-sm">
            {"Masz już konto? "}
            <Link className="font-semibold text-foreground underline-offset-4 hover:text-[#D4AF37] hover:underline" href="/login">Zaloguj się</Link>.
          </p>
        </AuthForm>
      </div>
    </main>
  );
}
