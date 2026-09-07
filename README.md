# Rozmowa AI

> **Twoja przestrzeń do myślenia, tworzenia i pracy z AI.**

Rozmowa AI to nowoczesna, polskojęzyczna aplikacja konwersacyjna zbudowana na Next.js, React i AI SDK. Łączy rozmowę z modelami AI, trwałą historię, autoryzację użytkowników, pracę z plikami oraz tryb dokumentów i artefaktów w jednym interfejsie.

Projekt zachowuje techniczne fundamenty oryginalnego OpenChat, ale otrzymuje własną warstwę produktu: język, nazewnictwo, metadane, komunikaty błędów, doświadczenie logowania i subtelny system identyfikacji marki.

## Najważniejsze możliwości

- **Rozmowa z AI** — streaming odpowiedzi, wybór modeli i obsługa narzędzi.
- **Artefakty i dokumenty** — tworzenie oraz edycja treści, kodu i arkuszy obok rozmowy.
- **Historia rozmów** — trwałe zapisywanie i zarządzanie konwersacjami.
- **Pliki** — przesyłanie materiałów do pracy z asystentem.
- **Konta użytkowników** — logowanie, rejestracja i tryb gościa.
- **Tryb jasny i ciemny** — spójne doświadczenie na desktopie i urządzeniach mobilnych.
- **Bezpieczeństwo i obserwowalność** — walidacja żądań, kontrolowane błędy i instrumentacja.

## Tożsamość produktu

**Nazwa:** Rozmowa AI  
**Krótka nazwa:** Rozmowa  
**Hasło:** Twoja przestrzeń do myślenia, tworzenia i pracy z AI.

Branding został celowo zaprojektowany jako subtelna warstwa nad istniejącą architekturą. Techniczne identyfikatory, ścieżki API i nazwy wewnętrzne mogą pozostać niezmienione, aby ograniczyć ryzyko niepotrzebnych regresji.

## Architektura

Aplikacja wykorzystuje m.in.:

- **Next.js 16 + App Router**
- **React 19**
- **AI SDK 6** i Vercel AI Gateway
- **Tailwind CSS + Radix UI / shadcn-style components**
- **Drizzle ORM + PostgreSQL**
- **Auth.js / NextAuth**
- **Vercel Blob** dla magazynowania plików
- **Playwright** dla testów end-to-end
- **OpenTelemetry / Vercel OTEL** dla obserwowalności

## Uruchomienie lokalne

```bash
pnpm install
pnpm db:migrate
pnpm dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

Zmienne środowiskowe należy skonfigurować zgodnie z [`.env.example`](.env.example). Nigdy nie commituj sekretów do repozytorium.

## Kontrola jakości

```bash
pnpm lint
pnpm test
pnpm build
```

Przed wdrożeniem uruchom pełny zestaw testów, migracji i budowania produkcyjnego w środowisku zbliżonym do docelowego.

## Bezpieczne wdrażanie

- Sekrety przechowuj wyłącznie w zmiennych środowiskowych dostawcy hostingu.
- Ogranicz dostęp do bazy danych i magazynu plików do wymaganych usług.
- Nie publikuj danych sesji, tokenów ani kluczy dostawców modeli.
- Włącz monitorowanie błędów i logów dla środowiska produkcyjnego.

## Status

Repozytorium jest rozwijane jako baza dla własnej, polskojęzycznej przestrzeni AI. Warstwa „Rozmowa” jest projektowana tak, aby można było dalej rozwijać funkcje bez kosztownego przepisywania fundamentów aplikacji.

## Licencja

Informacje o licencji znajdują się w pliku [`LICENSE`](LICENSE).
