import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters, {
  type FilterState,
} from "@/components/product/ProductFilters";
import { useProducts, useCategories } from "@/hooks/useProducts";
import type { Product } from "@/types";

export default function Home() {
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const getFiltersFromUrl = (): FilterState => {
    const categoryParam = searchParams.get("category");

    return {
      categories: categoryParam ? categoryParam.split(",") : [],
    };
  };

  const getSortFromUrl = (): string => {
    return searchParams.get("sort") || "featured";
  };

  const getSearchFromUrl = (): string => {
    return searchParams.get("q") || "";
  };

  useEffect(() => {
    if (!products) return;

    const filters = getFiltersFromUrl();
    const sort = getSortFromUrl();
    const searchQuery = getSearchFromUrl();

    let result = [...products];

    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    setFilteredProducts(result);
  }, [products, searchParams]);

  const handleFilterChange = (newFilters: FilterState) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (newFilters.categories.length > 0) {
      newParams.set("category", newFilters.categories.join(","));
    } else {
      newParams.delete("category");
    }

    setSearchParams(newParams);
  };

  const handleSortChange = (newSort: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (newSort !== "featured") {
      newParams.set("sort", newSort);
    } else {
      newParams.delete("sort");
    }

    setSearchParams(newParams);
  };

  if (productsError) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-xl font-semibold text-destructive">
          Error loading products
        </h2>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  const isLoading = productsLoading || categoriesLoading;
  const searchQuery = getSearchFromUrl();

  return (
    <div className="py-6 md:py-8 flex flex-col md:flex-row gap-6">
      <ProductFilters
        categories={categories}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        isLoading={categoriesLoading}
        urlFilters={getFiltersFromUrl()}
        urlSort={getSortFromUrl()}
      />

      <div className="mt-6 md:mt-8 ">
        {searchQuery && (
          <div className="mb-4">
            <h2 className="text-lg font-medium">
              Search results for:{" "}
              <span className="font-bold">"{searchQuery}"</span>
            </h2>
            <button
              onClick={() => {
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.delete("q");
                setSearchParams(newParams);
              }}
              className="text-sm text-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        <ProductGrid products={filteredProducts} isLoading={isLoading} />
      </div>
    </div>
  );
}
