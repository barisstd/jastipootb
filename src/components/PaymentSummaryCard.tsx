import { formatRupiah } from "@/lib/format";
import type { PaymentStatus } from "@/types/order";

interface PaymentSummaryCardProps {
  subtotalBeforeDiscount: number;
  discountTotal: number;
  total: number;
  paid: number;
  remaining: number;
  status: PaymentStatus;
}

const REMAINING_COLOR: Record<PaymentStatus, string> = {
  LUNAS: "text-leaf",
  "SUDAH DP": "text-amberwarn",
  "BELUM BAYAR": "text-brick",
};

export function PaymentSummaryCard({
  subtotalBeforeDiscount,
  discountTotal,
  total,
  paid,
  remaining,
  status,
}: PaymentSummaryCardProps) {
  const hasDiscount = discountTotal > 0;

  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-soft">
      <div className="space-y-2.5 text-[15px]">
        {hasDiscount && (
          <>
            <div className="flex items-start justify-between gap-4">
              <span className="shrink-0 whitespace-nowrap text-ink/60">Subtotal Produk</span>
              <span className="whitespace-nowrap text-right font-medium text-ink">
                {formatRupiah(subtotalBeforeDiscount)}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="shrink-0 whitespace-nowrap text-ink/60">Diskon</span>
              <span className="whitespace-nowrap text-right font-medium text-marigold">
                -{formatRupiah(discountTotal)}
              </span>
            </div>
          </>
        )}
        <div className="flex items-start justify-between gap-4">
          <span className="shrink-0 whitespace-nowrap text-ink/60">Total Pesanan</span>
          <span className="whitespace-nowrap text-right font-medium text-ink">{formatRupiah(total)}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="shrink-0 whitespace-nowrap text-ink/60">Sudah Dibayar</span>
          <span className="whitespace-nowrap text-right font-medium text-ink">{formatRupiah(paid)}</span>
        </div>
      </div>

      <div
        className="my-4 border-t border-dashed border-line"
        aria-hidden="true"
      />

      <div className="flex items-end justify-between gap-4">
        <span className="shrink-0 whitespace-nowrap text-[15px] text-ink/60">
          {status === "LUNAS" ? "Status" : "Kekurangan"}
        </span>
        {status === "LUNAS" ? (
          <span className="whitespace-nowrap font-display text-2xl font-semibold text-leaf">
            Lunas ✓
          </span>
        ) : (
          <span
            className={`whitespace-nowrap font-display text-3xl font-semibold ${REMAINING_COLOR[status]}`}
          >
            {formatRupiah(remaining)}
          </span>
        )}
      </div>
    </div>
  );
}
