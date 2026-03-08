import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import type { Metadata } from 'next';

const siteUrl = 'https://k-ui-theta.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'K-UI',
    template: '%s | K-UI',
  },
  description:
    'A clean, accessible React UI component library inspired by KRDS (Korea Design System). 30+ components with dark mode, TypeScript, and Tailwind CSS.',
  keywords: [
    'React',
    'UI Library',
    'Component Library',
    'Tailwind CSS',
    'TypeScript',
    'Accessibility',
    'KRDS',
    'Dark Mode',
    'Design System',
  ],
  authors: [{ name: 'kysclient', url: 'https://github.com/kysclient' }],
  creator: 'kysclient',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    title: 'K-UI',
    description:
      'A clean, accessible React UI component library inspired by KRDS (Korea Design System). 30+ components with dark mode, TypeScript, and Tailwind CSS.',
    siteName: 'K-UI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K-UI',
    description:
      'A clean, accessible React UI component library inspired by KRDS (Korea Design System).',
    creator: '@kysclient',
  },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <meta name="theme-color" content="#004098" />
      </head>
      <body
        className="flex flex-col min-h-screen"
        style={{
          fontFamily:
            '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
          letterSpacing: '-0.02em',
        }}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
