import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

interface LayoutProps {
  onSearch: (query: string) => void;
}

export default function Layout({ onSearch }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header onSearch={onSearch} />
      <main className="flex-1 container mx-auto px-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
