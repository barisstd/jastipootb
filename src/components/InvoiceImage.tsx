import { forwardRef } from "react";
import { PaymentStatusBadge } from "@/components/PaymentStatusBadge";
import { ProductRow } from "@/components/ProductRow";
import { PaymentSummaryCard } from "@/components/PaymentSummaryCard";
import { formatOrderDate } from "@/lib/format";
import type { OrderDetail } from "@/types/order";

/**
 * The invoice exactly as it appears in the downloaded image. Rendered
 * off-screen at a fixed width (so the image looks the same on every
 * device) and captured by downloadElementAsPng.
 */
export const INVOICE_WIDTH = 440;

export const InvoiceImage = forwardRef<HTMLDivElement, { order: OrderDetail }>(
  function InvoiceImage({ order }, ref) {
    return (
      <div
        ref={ref}
        style={{ width: INVOICE_WIDTH }}
        className="flex flex-col gap-4 bg-paper p-5 font-body text-ink"
      >
        <div className="text-center">
          <p className="font-display text-3xl font-bold tracking-wide text-cloth">
            JASTIP IJUN
          </p>
          <p className="text-sm text-ink/60">- Baby &amp; Kids Bookshop -</p>
        </div>

        <div className="rounded-card border border-line bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-xl font-semibold">{order.orderId}</p>
              <p className="mt-0.5 whitespace-nowrap text-sm text-ink/60">{formatOrderDate(order.orderDate)}</p>
            </div>
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
          <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="shrink-0 whitespace-nowrap text-ink/50">Nama</span>
              <span className="whitespace-nowrap text-right font-medium">{order.customerName}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="shrink-0 whitespace-nowrap text-ink/50">Pengiriman</span>
              <span className="whitespace-nowrap text-right font-medium">{order.shippingMethod}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="shrink-0 whitespace-nowrap text-ink/50">Status Pesanan</span>
              <span className="whitespace-nowrap text-right font-medium">{order.orderStatus}</span>
            </div>
          </div>
        </div>

        <div className="rounded-card border border-line bg-white p-5">
          <p className="mb-1 text-sm font-medium text-ink/70">Produk</p>
          <div className="divide-y divide-line">
            {order.items.map((item, i) => (
              <ProductRow key={`${item.productName}-${i}`} item={item} />
            ))}
          </div>
        </div>

        <PaymentSummaryCard
          subtotalBeforeDiscount={order.subtotalBeforeDiscount}
          discountTotal={order.discountTotal}
          total={order.total}
          paid={order.paid}
          remaining={order.remaining}
          status={order.paymentStatus}
        />


        <p className="pt-1 text-center text-sm text-ink/60">
          Terimakasih sudah berbelanja di Jastip Ijun
        </p>
      </div>
    );
  }
);
