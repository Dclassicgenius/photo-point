import { useSelector } from "react-redux";
import { Link } from "react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { RootState } from "@/store/store";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (cartItems.length === 0) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div>
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
}
