import { useState } from "react";
import { useParams, Link } from "react-router";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductDetail } from "@/hooks/useProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
      <div className="container max-w-6xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container max-w-6xl mx-auto py-16 text-center">
        <h2 className="text-2xl font-semibold text-destructive mb-4">
          Error loading product
        </h2>
        <p className="text-muted-foreground mb-8">Please try again later</p>
        <Button asChild size="lg">
          <Link to="/">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12">
      <Button variant="ghost" asChild className="mb-8 hover:bg-accent">
        <Link to="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-card p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="max-h-[500px] w-full object-contain "
          />
        </div>

        <div className="space-y-6">
          <div>
            <Badge className="mb-4 uppercase tracking-wide">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating.rate)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <div className="text-3xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium block">
                  Quantity
                </label>
                <select
                  id="quantity"
                  className="h-10 w-24 rounded-md border border-input bg-background px-3 py-2"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Product Details</h3>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Category</dt>
                <dd className="font-medium">{product.category}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">SKU</dt>
                <dd className="font-medium">PROD-{product.id}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Availability</dt>
                <dd className="font-medium text-green-600">In Stock</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
