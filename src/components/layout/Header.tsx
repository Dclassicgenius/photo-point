import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useDebounce } from "@/hooks/useDebounce";
import { ModeToggle } from "../mode-toggle";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    if (location.pathname === "/") {
      const q = searchParams.get("q");
      if (q && q !== searchQuery) {
        setSearchQuery(q);
      }
    } else {
      setSearchQuery("");
    }
  }, [location.pathname, searchParams]);

  useEffect(() => {
    if (
      location.pathname === "/" &&
      debouncedSearchQuery !== searchParams.get("q")
    ) {
      const newParams = new URLSearchParams(searchParams.toString());

      if (debouncedSearchQuery) {
        newParams.set("q", debouncedSearchQuery);
      } else {
        newParams.delete("q");
      }

      setSearchParams(newParams);
    }
  }, [debouncedSearchQuery, location.pathname]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (location.pathname !== "/") {
      navigate(`/?q=${encodeURIComponent(e.target.value)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-18 items-center justify-between mx-auto px-5">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold">
            PhotoPoint
          </Link>
        </div>

        <div className="hidden md:flex w-full max-w-sm items-center space-x-2 mx-4 px-5">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-1"
          />
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="container py-4 md:hidden">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
      )}
    </header>
  );
}
