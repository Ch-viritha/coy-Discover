import './globals.css';
export const metadata = { title: 'Coy · Discover', description: 'Sealed until mutual.' };
export const viewport = { width: 'device-width', initialScale: 1, maximumScale: 1 };
export default function RootLayout({ children }) {
  return (<html lang="en"><head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400&family=DM+Sans:wght@400;500;700&display=swap" />
  </head><body>{children}</body></html>);
}
