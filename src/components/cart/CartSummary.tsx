import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { clearCart } from "@/store/cartSlice";
import { CartItem } from "@/types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    dispatch(clearCart());
    navigate("/");
  };

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

      <Button
        className="w-full"
        disabled={items.length === 0}
        onClick={handleCheckout}
      >
        Checkout
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Shipping and taxes calculated at checkout
      </p>
    </div>
  );
}
