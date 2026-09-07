"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import { PlusIcon, TrashIcon } from "@/components/icons";
import { getChatHistoryPaginationKey, SidebarHistory } from "@/components/sidebar-history";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, useSidebar } from "@/components/ui/sidebar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { BRAND } from "@/lib/brand";

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const { mutate } = useSWRConfig();
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  const handleDeleteAll = () => {
    const deletePromise = fetch("/api/history", { method: "DELETE" });
    toast.promise(deletePromise, {
      loading: "Usuwanie wszystkich rozmów…",
      success: () => {
        mutate(unstable_serialize(getChatHistoryPaginationKey));
        setShowDeleteAllDialog(false);
        router.replace("/");
        router.refresh();
        return "Wszystkie rozmowy zostały usunięte";
      },
      error: "Nie udało się usunąć rozmów",
    });
  };

  return (
    <>
      <Sidebar className="group-data-[side=left]:border-r-0">
        <SidebarHeader>
          <SidebarMenu>
            <div className="flex flex-row items-center justify-between">
              <Link className="flex flex-row items-center gap-3" href="/" onClick={() => setOpenMobile(false)}>
                <span className="aurelis-display cursor-pointer px-2 font-semibold text-xl tracking-wide hover:text-[#D4AF37] transition-colors">
                  {BRAND.name}
                </span>
              </Link>
              <div className="flex flex-row gap-1">
                {user && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="h-8 p-1 md:h-fit md:p-2 hover:text-[#D4AF37]" onClick={() => setShowDeleteAllDialog(true)} type="button" variant="ghost"><TrashIcon /></Button>
                    </TooltipTrigger>
                    <TooltipContent align="end" className="hidden md:block">Usuń wszystkie rozmowy</TooltipContent>
                  </Tooltip>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="h-8 p-1 md:h-fit md:p-2 hover:text-[#D4AF37]" onClick={() => { setOpenMobile(false); router.push("/"); router.refresh(); }} type="button" variant="ghost"><PlusIcon /></Button>
                  </TooltipTrigger>
                  <TooltipContent align="end" className="hidden md:block">Nowa rozmowa</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className="mx-2 mt-2 aurelis-gold-line opacity-70" />
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent><SidebarHistory user={user} /></SidebarContent>
        <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
      </Sidebar>
      <AlertDialog onOpenChange={setShowDeleteAllDialog} open={showDeleteAllDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Usunąć wszystkie rozmowy?</AlertDialogTitle>
            <AlertDialogDescription>Tej operacji nie można cofnąć. Wszystkie rozmowy zostaną trwale usunięte z Twojego konta i serwera.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAll}>Usuń wszystko</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
