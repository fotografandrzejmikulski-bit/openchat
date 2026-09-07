import { cn } from "@/lib/utils";

type AurelisBrandProps = {
  compact?: boolean;
  className?: string;
};

/** Premium AURELIS lockup inspired by the supplied AM crest: crown, laurel, monogram and wordmark. */
export function AurelisBrand({ compact = false, className }: AurelisBrandProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <svg aria-hidden="true" className={cn("shrink-0", compact ? "size-9" : "size-14")} viewBox="0 0 80 80">
        <path d="M29 14 32 8l4 5 4-7 4 7 5-4-1 8c-4 3-14 3-19 0l-1-3Z" fill="#D4AF37" />
        <path d="M27 19c4 3 22 3 27 0l-2 5H29l-2-5Z" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
        <g fill="none" stroke="#D4AF37" strokeLinecap="round" strokeWidth="1.4">
          <path d="M24 24C10 30 9 47 19 60c5 6 11 9 17 11" />
          <path d="M56 24c14 6 15 23 5 36-5 6-11 9-17 11" />
          <path d="m18 32-7-2m9 10-8-1m9 9-8 2m12 6-7 5m38-29 7-2m-9 12 8-1m-9 9 8 2m-12 6 7 5" />
        </g>
        <path d="M40 34 30 60h5l2-6h6l2 6h5L40 34Zm-2 16 2-8 2 8h-4Z" fill="#D4AF37" />
        <path d="M22 69h36" stroke="#D4AF37" strokeLinecap="round" />
      </svg>
      {!compact && (
        <div className="ml-3 min-w-0">
          <div className="aurelis-display truncate text-xl font-semibold tracking-[0.12em] text-foreground">AURELIS</div>
          <div className="mt-0.5 truncate text-[9px] font-medium uppercase tracking-[0.32em] text-muted-foreground">Andrzej Mikulski</div>
        </div>
      )}
    </div>
  );
}
