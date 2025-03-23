import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium">{item.title}</h3>
          <p className="text-sm font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          ${item.price.toFixed(2)} each
        </p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecreaseQuantity}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncreaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-destructive"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
