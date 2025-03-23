import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types";

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="rounded-lg border p-6 space-y-4">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Button className="w-full" disabled={items.length === 0}>
        Checkout
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Shipping and taxes calculated at checkout
      </p>
    </div>
  );
}
