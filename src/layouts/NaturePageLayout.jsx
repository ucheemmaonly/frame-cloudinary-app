import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const natureBackgrounds = {
  home: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=90',
  gallery: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=90',
  upload: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2400&q=90',
  favorites: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2400&q=90',
  notFound: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=90',
};

export default function NaturePageLayout({
  page = 'home',
  favoriteCount = 0,
  children,
  contentClassName = '',
}) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white selection:bg-orange-300 selection:text-slate-950">
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${natureBackgrounds[page] || natureBackgrounds.home}")` }}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-gradient-to-br from-slate-950/75 via-slate-950/55 to-emerald-950/45"
      />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_42%)]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar favoriteCount={favoriteCount} />
        <div className={`flex-1 ${contentClassName}`}>{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export function NaturePageEyebrow({ children }) {
  return (
    <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-orange-300 sm:text-sm">
      {children}
    </p>
  );
}

export function PrimaryLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-0.5 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-slate-950"
    >
      {children}
    </Link>
  );
}
