export type ErrorType =
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "rate_limit"
  | "offline";

export type Surface =
  | "chat"
  | "auth"
  | "api"
  | "stream"
  | "database"
  | "history"
  | "vote"
  | "document"
  | "suggestions"
  | "activate_gateway";

export type ErrorCode = `${ErrorType}:${Surface}`;
export type ErrorVisibility = "response" | "log" | "none";

export const visibilityBySurface: Record<Surface, ErrorVisibility> = {
  database: "log",
  chat: "response",
  auth: "response",
  stream: "response",
  api: "response",
  history: "response",
  vote: "response",
  document: "response",
  suggestions: "response",
  activate_gateway: "response",
};

export class OpenChatError extends Error {
  type: ErrorType;
  surface: Surface;
  statusCode: number;

  constructor(errorCode: ErrorCode, cause?: string) {
    super();
    const [type, surface] = errorCode.split(":");
    this.type = type as ErrorType;
    this.cause = cause;
    this.surface = surface as Surface;
    this.message = getMessageByErrorCode(errorCode);
    this.statusCode = getStatusCodeByType(this.type);
  }

  toResponse() {
    const code: ErrorCode = `${this.type}:${this.surface}`;
    const visibility = visibilityBySurface[this.surface];
    const { message, cause, statusCode } = this;

    if (visibility === "log") {
      console.error({ code, message, cause });
      return Response.json(
        { code: "", message: "Wystąpił błąd. Spróbuj ponownie później." },
        { status: statusCode }
      );
    }

    return Response.json({ code, message, cause }, { status: statusCode });
  }
}

export function getMessageByErrorCode(errorCode: ErrorCode): string {
  if (errorCode.includes("database")) {
    return "Wystąpił błąd podczas wykonywania operacji na bazie danych.";
  }

  switch (errorCode) {
    case "bad_request:api":
      return "Nie udało się przetworzyć żądania. Sprawdź dane i spróbuj ponownie.";
    case "bad_request:activate_gateway":
      return "Brama AI wymaga prawidłowej metody płatności. Skonfiguruj ją u dostawcy usługi, aby kontynuować.";
    case "unauthorized:auth":
      return "Zaloguj się, aby kontynuować.";
    case "forbidden:auth":
      return "Twoje konto nie ma dostępu do tej funkcji.";
    case "rate_limit:chat":
      return "Osiągnięto dzienny limit wiadomości. Spróbuj ponownie później.";
    case "not_found:chat":
      return "Nie znaleziono wskazanej rozmowy.";
    case "forbidden:chat":
      return "Ta rozmowa należy do innego użytkownika.";
    case "unauthorized:chat":
      return "Zaloguj się, aby wyświetlić tę rozmowę.";
    case "offline:chat":
      return "Nie udało się wysłać wiadomości. Sprawdź połączenie z internetem i spróbuj ponownie.";
    case "not_found:document":
      return "Nie znaleziono wskazanego dokumentu.";
    case "forbidden:document":
      return "Ten dokument należy do innego użytkownika.";
    case "unauthorized:document":
      return "Zaloguj się, aby wyświetlić ten dokument.";
    case "bad_request:document":
      return "Nieprawidłowe dane podczas tworzenia lub aktualizacji dokumentu.";
    default:
      return "Wystąpił błąd. Spróbuj ponownie później.";
  }
}

function getStatusCodeByType(type: ErrorType) {
  switch (type) {
    case "bad_request":
      return 400;
    case "unauthorized":
      return 401;
    case "forbidden":
      return 403;
    case "not_found":
      return 404;
    case "rate_limit":
      return 429;
    case "offline":
      return 503;
    default:
      return 500;
  }
}
