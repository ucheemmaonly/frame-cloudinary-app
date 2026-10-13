import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/15 bg-slate-950/25 px-5 py-7 backdrop-blur-md sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <Link to="/" className="text-lg font-black tracking-tight text-white">FRAME<span className="text-orange-400">.</span></Link>
        <p className="text-sm text-white/70">Collect the places and moments that inspire you.</p>
        <p className="text-xs text-white/50">Images stored and served by Cloudinary</p>
      </div>
    </footer>
  );
}
