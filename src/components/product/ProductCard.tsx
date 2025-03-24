import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-4">
        <Link to={`/product/${product.id}`} className="overflow-hidden">
          <div className="aspect-square overflow-hidden rounded-md">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="h-full w-full object-contain transition-transform hover:scale-105"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs capitalize">
            {product.category}
          </Badge>
        </div>
        <Link to={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-medium line-clamp-2 h-12">{product.title}</h3>
        </Link>
      </CardContent>
      <CardFooter className="p-4 py-0 flex flex-col items-start gap-4">
        <div className="font-bold">${product.price.toFixed(2)}</div>
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
