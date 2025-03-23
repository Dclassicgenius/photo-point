import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider";
import Layout from "./components/layout/Layout";
import { useState } from "react";
import Home from "./pages/Home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function AppRoutes() {
  const navigate = useNavigate();
  const [, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate("/");
  };

  return (
    <Routes>
      <Route element={<Layout onSearch={handleSearch} />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<p>Cart</p>} />
        <Route path="/product/:id" element={<p>Product Detail</p>} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
