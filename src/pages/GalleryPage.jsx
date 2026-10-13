import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery.jsx';
import NaturePageLayout, { NaturePageEyebrow } from '../layouts/NaturePageLayout.jsx';

export default function GalleryPage(props) {
  return (
    <NaturePageLayout page="gallery" favoriteCount={props.favoriteCount}>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-7 sm:py-14">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <NaturePageEyebrow>Every moment has a place</NaturePageEyebrow>
            <h1 className="mt-3 text-5xl font-black tracking-tight text-white sm:text-7xl">Your gallery<span className="text-orange-400">.</span></h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">All the pictures you have collected, gathered in one peaceful place.</p>
          </div>
          <Link to="/upload" className="inline-flex w-fit items-center gap-3 rounded-full bg-orange-500 px-5 py-3.5 font-bold text-white transition hover:bg-orange-400">Add a new image</Link>
        </div>
        <div className="rounded-[2rem] border border-white/20 bg-slate-950/35 p-3 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-6">
          <Gallery {...props} mode="all" />
        </div>
      </main>
    </NaturePageLayout>
  );
}
