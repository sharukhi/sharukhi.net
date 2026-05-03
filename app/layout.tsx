import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import config from "@/site.config.json";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata();

function buildThemeVars(): string {
  const { theme } = config;
  const { light, dark } = theme.colors;

  return `
    :root {
      --bg:           ${light.background};
      --text:         ${light.text};
      --text-muted:   ${light.textMuted};
      --link:         ${light.link};
      --link-hover:   ${light.linkHover};
      --border:       ${light.border};
      --accent:       #c8ff3a;
      --accent-text:  #0a0b08;
      --surface-lift: #f0f1ea;
      --code-bg:      rgba(0,0,0,0.06);

      --font-display: 'Big Shoulders Display', sans-serif;
      --font:         ${theme.fontFamily};
      --font-size:    ${theme.fontSize};
      --line-height:  ${theme.lineHeight};

      --content-width: ${theme.contentWidth ?? "600px"};
      --h-pad:         24px;
      --v-pad:         96px;

      --radius-sm: 0px;
      --radius-md: 0px;
      --radius-lg: 2px;

      --shadow-card: rgba(10,11,8,0.08) 0 0 0 1px;
      --border-card: 1px solid rgba(10,11,8,0.10);
      --border-divider: rgba(10,11,8,0.10);
    }

    [data-theme="dark"] {
      --bg:           ${dark.background};
      --text:         ${dark.text};
      --text-muted:   ${dark.textMuted};
      --link:         ${dark.link};
      --link-hover:   ${dark.linkHover};
      --border:       ${dark.border};
      --surface-lift: #11120f;
      --code-bg:      rgba(238,240,230,0.08);
      --shadow-card: rgba(238,240,230,0.06) 0 0 0 1px;
      --border-card: 1px solid rgba(238,240,230,0.06);
      --border-divider: rgba(238,240,230,0.06);
    }
    [data-theme="light"] {
          --accent: #95b829;
    }
  `;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
        <style dangerouslySetInnerHTML={{ __html: buildThemeVars() }} />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="sharukhi.net" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme={config.theme.defaultTheme}
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
