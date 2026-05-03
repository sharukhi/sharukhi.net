import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import config from "@/site.config.json";

interface PageLayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
}

export default function PageLayout({ children, showBack = false }: PageLayoutProps) {
  const { person, nav } = config;
  const currentYear = new Date().getFullYear();

  return (
    <div className="page-shell">
      {showBack && (
        <nav className="back-nav">
          <div className="back-nav-inner">
            <Link href="/" className="back-link">
              {nav.backLabel}
            </Link>
          </div>
        </nav>
      )}

      <main className="page-main">
        {children}
      </main>

      <footer className="page-footer">
        <span className="footer-copy">© {currentYear} {person.copyright}</span>
        <ThemeToggle />
      </footer>
    </div>
  );
}
