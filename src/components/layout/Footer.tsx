export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} PhotoPoint. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
