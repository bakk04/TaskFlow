import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import LogoutButton from './components/LogoutButton';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Gestion de projets collaboratifs',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  const user = session ? JSON.parse(session.value) : null;

  return (
    <html lang="fr">
      <body className={inter.className}>
        <header style={{
          background: '#1B8C3E', color: 'white',
          padding: '1rem 2rem', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontWeight: 700 }}>TaskFlow</h2>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="/dashboard" style={{ color: 'white' }}>Dashboard</a>
            {user ? (
              <>
                <span>{user.name}</span>
                <LogoutButton />
              </>
            ) : (
              <a href="/login" style={{ color: 'white' }}>Login</a>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
