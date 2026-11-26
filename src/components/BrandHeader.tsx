export function BrandHeader({ large = false }: { large?: boolean }) {
  return (
    <div className={`flex items-center ${large ? "justify-center gap-3" : "gap-2"}`}>
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
