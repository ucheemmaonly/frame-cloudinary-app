import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/gallery', label: 'Gallery' },
  { to: '/upload', label: 'Upload' },
  { to: '/favorites', label: 'Favorites' },
];

export default function Navbar({ favoriteCount = 0 }) {
  return (
    <header className="px-3 pt-4 sm:px-6 sm:pt-6">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-[1.6rem] border border-white/20 bg-slate-950/35 px-4 py-3 shadow-xl shadow-slate-950/10 backdrop-blur-xl sm:rounded-full sm:px-6">
        <NavLink to="/" end aria-label="FRAME home" className="shrink-0 text-2xl font-black tracking-tight text-white sm:text-3xl">
          FRAME<span className="text-orange-400">.</span>
        </NavLink>

        <div className="order-3 flex w-full items-center justify-between gap-1 rounded-full border border-white/10 bg-black/15 p-1 sm:order-none sm:w-auto sm:justify-center">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `flex-1 whitespace-nowrap rounded-full px-3 py-2 text-center text-xs font-semibold transition sm:flex-none sm:px-4 sm:py-2.5 sm:text-sm ${isActive ? 'bg-white text-slate-950 shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              {label === 'Favorites' ? <span><span aria-hidden="true">♥ </span><span className="hidden sm:inline">Favorites</span><span className="sm:hidden">Favs</span></span> : label}
              {label === 'Favorites' && <span className="ml-1 rounded-full bg-orange-400 px-1.5 py-0.5 text-[10px] font-extrabold text-slate-950">{favoriteCount}</span>}
            </NavLink>
          ))}
        </div>

        <NavLink to="/upload" className="shrink-0 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-400 sm:px-5 sm:py-3">
          <span className="sm:hidden">+ Add</span><span className="hidden sm:inline">Add image</span>
        </NavLink>
      </nav>
    </header>
  );
}
