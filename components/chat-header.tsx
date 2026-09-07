"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";
import { useWindowSize } from "usehooks-ts";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "./icons";
import { useSidebar } from "./ui/sidebar";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";
import { BRAND } from "@/lib/brand";

function PureChatHeader({ chatId, selectedVisibilityType, isReadonly }: { chatId: string; selectedVisibilityType: VisibilityType; isReadonly: boolean }) {
  const router = useRouter();
  const { open } = useSidebar();
  const { width: windowWidth } = useWindowSize();

  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border/50 bg-background/85 px-2 py-1.5 backdrop-blur-xl md:px-3">
      <SidebarToggle />
      {(!open || windowWidth < 768) && (
        <Button className="order-2 ml-auto h-8 px-2 md:order-1 md:ml-0 md:h-fit md:px-2 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]" onClick={() => { router.push("/"); router.refresh(); }} variant="outline">
          <PlusIcon /><span className="md:sr-only">Nowa rozmowa</span>
        </Button>
      )}
      {!isReadonly && <VisibilitySelector chatId={chatId} className="order-1 md:order-2" selectedVisibilityType={selectedVisibilityType} />}
      <div className="order-3 ml-auto hidden items-center md:flex">
        <span className="aurelis-display text-base font-semibold tracking-[0.12em] text-foreground/90">
          {BRAND.name}<span className="ml-1 text-[#D4AF37]">·</span>
        </span>
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => prevProps.chatId === nextProps.chatId && prevProps.selectedVisibilityType === nextProps.selectedVisibilityType && prevProps.isReadonly === nextProps.isReadonly);
