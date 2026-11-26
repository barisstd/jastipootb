import { BookMark } from "@/components/BookMark";

export function BrandHeader({ large = false }: { large?: boolean }) {
  return (
    <div className={`flex items-center ${large ? "justify-center gap-3" : "gap-2"}`}>
      <BookMark className={large ? "h-11 w-11 shrink-0" : "h-6 w-6 shrink-0"} />
      <span
        className={`font-display font-bold tracking-tight text-cloth ${
          large ? "text-[32px] leading-none" : "text-[15px] font-semibold"
        }`}
      >
        Jastip Ijun
      </span>
    </div>
  );
}
