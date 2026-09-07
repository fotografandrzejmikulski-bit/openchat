"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { memo } from "react";
import type { ChatMessage } from "@/lib/types";
import { Suggestion } from "./elements/suggestion";
import type { VisibilityType } from "./visibility-selector";

type SuggestedActionsProps = {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>["sendMessage"];
  selectedVisibilityType: VisibilityType;
};

const suggestedActions = [
  { label: "Zbadaj temat", prompt: "Przeanalizuj dla mnie najważniejsze informacje na wybrany przeze mnie temat.", tone: "burgundy" },
  { label: "Stwórz coś", prompt: "Pomóż mi stworzyć wysokiej jakości materiał na podstawie mojego pomysłu.", tone: "gold" },
  { label: "Rozwiąż problem", prompt: "Pomóż mi metodycznie rozwiązać problem, który Ci opiszę.", tone: "blue" },
  { label: "Ulepsz projekt", prompt: "Przeanalizuj mój projekt i wskaż konkretne ulepszenia o największym wpływie.", tone: "green" },
] as const;

function PureSuggestedActions({ chatId, sendMessage }: SuggestedActionsProps) {
  return (
    <div className="grid w-full gap-2 sm:grid-cols-2" data-testid="suggested-actions">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="h-full"
          initial={{ opacity: 0, y: 12 }}
          key={suggestedAction.label}
          transition={{ delay: 0.08 * index, duration: 0.35 }}
        >
          <Suggestion
            className={`group h-full min-h-16 w-full whitespace-normal rounded-xl border border-border/70 bg-card/60 p-3 text-left shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4AF37]/50 hover:bg-card hover:shadow-lg ${
              suggestedAction.tone === "burgundy" ? "hover:text-[#5A0F24] dark:hover:text-[#D4AF37]" :
              suggestedAction.tone === "gold" ? "hover:text-[#8B6B1E] dark:hover:text-[#D4AF37]" :
              suggestedAction.tone === "blue" ? "hover:text-[#173B8F] dark:hover:text-[#4C70C5]" :
              "hover:text-[#123C2A] dark:hover:text-[#2C7554]"
            }`}
            onClick={(suggestion) => {
              window.history.pushState({}, "", `/chat/${chatId}`);
              sendMessage({
                role: "user",
                parts: [{ type: "text", text: suggestion }],
              });
            }}
            suggestion={suggestedAction.prompt}
          >
            <span className="font-medium">{suggestedAction.label}</span>
            <span className="mt-1 block text-xs text-muted-foreground group-hover:text-foreground/70">
              {suggestedAction.prompt}
            </span>
          </Suggestion>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) =>
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType
);
