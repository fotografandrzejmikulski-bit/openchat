import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/app/(auth)/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"] as const;

const FileSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size > 0, {
      message: "Plik nie może być pusty.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Rozmiar pliku nie może przekraczać 5 MB.",
    })
    .refine((file) => ALLOWED_FILE_TYPES.includes(file.type as (typeof ALLOWED_FILE_TYPES)[number]), {
      message: "Dozwolone są wyłącznie obrazy JPEG i PNG.",
    }),
});

function sanitizeFilename(filename: string) {
  const normalized = filename.normalize("NFKC").replace(/[^a-zA-Z0-9._-]/g, "-");
  return normalized.replace(/-+/g, "-").replace(/^[-.]+|[-.]+$/g, "").slice(0, 120) || "plik";
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
  }

  if (request.body === null) {
    return NextResponse.json({ error: "Brak treści żądania." }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const fileEntry = formData.get("file");

    if (!(fileEntry instanceof Blob)) {
      return NextResponse.json({ error: "Nie przesłano pliku." }, { status: 400 });
    }

    const validatedFile = FileSchema.safeParse({ file: fileEntry });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(" ");

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const originalFilename = fileEntry instanceof File ? fileEntry.name : "plik";
    const filename = sanitizeFilename(originalFilename);
    const objectPath = `users/${session.user.id}/${crypto.randomUUID()}-${filename}`;
    const fileBuffer = await fileEntry.arrayBuffer();

    try {
      const data = await put(objectPath, fileBuffer, {
        access: "public",
        addRandomSuffix: false,
      });

      return NextResponse.json(data);
    } catch (_error) {
      return NextResponse.json(
        { error: "Nie udało się zapisać pliku." },
        { status: 500 }
      );
    }
  } catch (_error) {
    return NextResponse.json(
      { error: "Nie udało się przetworzyć żądania." },
      { status: 500 }
    );
  }
}
