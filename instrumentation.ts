import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({ serviceName: "rozmowa-ai" });
}
