import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "@/services/api";
import { Product } from "@/types";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useProductDetail(id: number) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}
