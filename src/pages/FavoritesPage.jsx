import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery.jsx';
import NaturePageLayout, { NaturePageEyebrow } from '../layouts/NaturePageLayout.jsx';

export default function FavoritesPage(props) {
  return (
    <NaturePageLayout page="favorites" favoriteCount={props.favoriteCount}>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-7 sm:py-14">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <NaturePageEyebrow>Saved close to the heart</NaturePageEyebrow>
            <h1 className="mt-3 text-5xl font-black tracking-tight text-white sm:text-7xl">Your favourites<span className="text-orange-400">.</span></h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">The images you have marked with a heart. Keep the ones that mean a little more.</p>
          </div>
          <Link to="/gallery" className="inline-flex w-fit items-center gap-3 rounded-full border border-white/35 bg-white/10 px-5 py-3.5 font-bold text-white transition hover:bg-white/20">Explore all images ↗</Link>
        </div>
        <div className="rounded-[2rem] border border-white/20 bg-slate-950/35 p-3 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-6">
          <Gallery {...props} mode="favorites" />
        </div>
      </main>
    </NaturePageLayout>
  );
}
