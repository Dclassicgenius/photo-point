import ProductGrid from "@/components/product/ProductGrid";
import { useProducts } from "@/hooks/useProducts";

const Home = () => {
  const { data: products, isLoading, error } = useProducts();

  if (error) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-xl font-semibold text-destructive">
          Error loading products
        </h2>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="container py-6 md:py-8">
      {/* <ProductFilters categories={categories} onFilterChange={handleFilterChange} onSortChange={handleSortChange} /> */}

      <div className="mt-6 md:mt-8 md:ml-72">
        <ProductGrid products={products ?? []} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home;
