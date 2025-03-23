import { useState } from "react";
import { useParams, Link } from "react-router";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductDetail } from "@/hooks/useProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProductDetail(Number(id));
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      })
    );
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-xl font-semibold text-destructive">
          Error loading product
        </h2>
        <p className="text-muted-foreground mb-6">Please try again later</p>
        <Button asChild>
          <Link to="/">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border flex items-center justify-center">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="max-h-[400px] object-contain"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(product.rating.rate)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center space-x-4">
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity
                </label>
                <select
                  id="quantity"
                  className="h-10 w-20 rounded-md border border-input bg-background px-3 py-2"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Details</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Category: {product.category}</li>
              <li>SKU: PROD-{product.id}</li>
              <li>In Stock</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
