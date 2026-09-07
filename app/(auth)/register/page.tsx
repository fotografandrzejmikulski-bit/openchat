"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useActionState, useEffect, useState } from "react";
import { AuthForm } from "@/components/auth-form";
import { SubmitButton } from "@/components/submit-button";
import { toast } from "@/components/toast";
import { type RegisterActionState, register } from "../actions";
import { BRAND } from "@/lib/brand";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [state, formAction] = useActionState<RegisterActionState, FormData>(register, {
    status: "idle",
  });
  const { update: updateSession } = useSession();

  // biome-ignore lint/correctness/useExhaustiveDependencies: router and updateSession are stable refs
  useEffect(() => {
    if (state.status === "user_exists") {
      toast({ type: "error", description: "Konto z tym adresem już istnieje." });
    } else if (state.status === "failed") {
      toast({ type: "error", description: "Nie udało się utworzyć konta." });
    } else if (state.status === "invalid_data") {
      toast({ type: "error", description: "Sprawdź poprawność danych formularza." });
    } else if (state.status === "success") {
      toast({ type: "success", description: "Konto zostało utworzone." });
      setIsSuccessful(true);
      updateSession();
      router.refresh();
    }
  }, [state.status]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  return (
    <div className="flex h-dvh w-screen items-start justify-center bg-background pt-12 md:items-center md:pt-0">
      <div className="flex w-full max-w-md flex-col gap-10 overflow-hidden rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-3 px-4 text-center sm:px-16">
          <div className="font-semibold text-lg tracking-tight">{BRAND.name}</div>
          <h1 className="font-semibold text-2xl dark:text-zinc-50">Utwórz konto</h1>
          <p className="max-w-sm text-gray-500 text-sm dark:text-zinc-400">
            Załóż konto, aby bezpiecznie zachować swoje rozmowy i dokumenty.
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>Utwórz konto</SubmitButton>
          <p className="mt-4 text-center text-gray-600 text-sm dark:text-zinc-400">
            {"Masz już konto? "}
            <Link
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
              href="/login"
            >
              Zaloguj się
            </Link>
            .
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
