import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BlitzAPI – B2B Data APIs for Growth & RevOps Teams',
  description:
    'Access fresh, accurate B2B data with BlitzAPI. Search, enrich & validate contacts, boost deliverability, and scale your GTM playbooks.',
  openGraph: {
    title: 'BlitzAPI – B2B Data APIs for Growth & RevOps Teams',
    description:
      'Access fresh, accurate B2B data with BlitzAPI. Search, enrich & validate contacts, boost deliverability, and scale your GTM playbooks.',
    url: 'https://blitz-api.ai/',
    type: 'website',
    images: [
      {
        url: 'https://framerusercontent.com/assets/orex907AJXAY5ZrT1QWn4VpfN9o.png',
        width: 1200,
        height: 630,
        alt: 'BlitzAPI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlitzAPI – B2B Data APIs for Growth & RevOps Teams',
    description:
      'Access fresh, accurate B2B data with BlitzAPI. Search, enrich & validate contacts, boost deliverability, and scale your GTM playbooks.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
