import { useRef, useState } from "react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { InvoiceImage } from "@/components/InvoiceImage";
import { PaymentStatusBadge } from "@/components/PaymentStatusBadge";
import { ProductRow } from "@/components/ProductRow";
import { PaymentSummaryCard } from "@/components/PaymentSummaryCard";
import { PaymentAccountsPanel } from "@/components/PaymentAccountsPanel";
import { Button } from "@/components/Button";
import { formatOrderDate } from "@/lib/format";
import { downloadElementAsPng } from "@/lib/downloadInvoice";
import type { OrderDetail } from "@/types/order";

interface OrderDetailPageProps {
  order: OrderDetail;
  onBack: () => void;
  showBack: boolean;
}

const ADMIN_WHATSAPP = import.meta.env.VITE_ADMIN_WHATSAPP || "6281234567890";

export function OrderDetailPage({ order, onBack, showBack }: OrderDetailPageProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const isUnpaid = order.paymentStatus !== "LUNAS";

  const waMessage = encodeURIComponent(
    `Halo Admin Ijun Bookstore, saya mau tanya soal pesanan ${order.orderId} (${order.customerName}).`
  );
  const waHref = `https://wa.me/${ADMIN_WHATSAPP}?text=${waMessage}`;

  async function handleDownload() {
    if (!invoiceRef.current || downloading) return;
    setDownloading(true);
    setDownloadError(false);
    try {
      await downloadElementAsPng(invoiceRef.current, `invoice-${order.orderId}.png`);
    } catch {
      setDownloadError(true);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      {showBack ? (
        <ScreenHeader title="Detail Pesanan" onBack={onBack} backLabel="Daftar pesanan" />
      ) : (
        <ScreenHeader title="Detail Pesanan" onBack={onBack} backLabel="Cari nomor lain" />
      )}

      <div className="flex flex-col gap-5">
        {/* Order identity */}
        <div className="rounded-card border border-line bg-white p-5 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-xl font-semibold text-ink">
                {order.orderId}
              </p>
              <p className="mt-0.5 whitespace-nowrap text-sm text-ink/60">
                {formatOrderDate(order.orderDate)}
              </p>
            </div>
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
          <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="shrink-0 whitespace-nowrap text-ink/50">Nama</span>
              <span className="min-w-0 text-right font-medium text-ink">{order.customerName}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="shrink-0 whitespace-nowrap text-ink/50">Pengiriman</span>
              <span className="min-w-0 text-right font-medium text-ink">{order.shippingMethod}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="shrink-0 whitespace-nowrap text-ink/50">Status Pesanan</span>
              <span className="min-w-0 text-right font-medium text-ink">{order.orderStatus}</span>
            </div>
          </div>
        </div>

        {/* Product list */}
        <div className="rounded-card border border-line bg-white p-5 shadow-soft">
          <p className="mb-1 text-sm font-medium text-ink/70">Produk</p>
          <div className="divide-y divide-line">
            {order.items.map((item, i) => (
              <ProductRow key={`${item.productName}-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Payment summary */}
        <PaymentSummaryCard
          subtotalBeforeDiscount={order.subtotalBeforeDiscount}
          discountTotal={order.discountTotal}
          total={order.total}
          paid={order.paid}
          remaining={order.remaining}
          status={order.paymentStatus}
        />

        {/* Bayar Sekarang — only shown while there's a balance owing */}
        {isUnpaid && (
          <div className="flex flex-col gap-4">
            <Button
              variant="primary"
              fullWidth
              onClick={() => setShowPayment((s) => !s)}
            >
              {showPayment ? "Sembunyikan Info Transfer" : "Bayar Sekarang"}
            </Button>
            {showPayment && <PaymentAccountsPanel />}
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col gap-3 pb-2">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => window.open(waHref, "_blank", "noopener,noreferrer")}
          >
            Hubungi Admin
          </Button>
          <Button variant="outline" fullWidth loading={downloading} onClick={handleDownload}>
            Download Invoice
          </Button>
          {downloadError && (
            <p className="text-center text-sm text-brick">
              Gagal membuat gambar invoice. Coba lagi ya.
            </p>
          )}
        </div>
      </div>

      {/* Off-screen copy of the invoice that gets captured as the image. */}
      <div aria-hidden="true" className="pointer-events-none fixed left-[-9999px] top-0">
        <InvoiceImage ref={invoiceRef} order={order} />
      </div>
    </div>
  );
}
