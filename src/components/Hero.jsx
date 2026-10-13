import { Link } from 'react-router-dom';
import { NaturePageEyebrow, PrimaryLink } from '../layouts/NaturePageLayout.jsx';

export default function Hero({ imageCount = 0, favoriteCount = 0 }) {
  return (
    <section className="mx-auto flex min-h-[72vh] w-full max-w-7xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[calc(100svh-150px)] lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <div className="max-w-4xl">
        <NaturePageEyebrow>Nature looks good on you · Your visual journal</NaturePageEyebrow>
        <h1 className="mt-6 text-[clamp(3.6rem,10vw,8.5rem)] font-black leading-[0.88] tracking-[-0.07em] text-white">
          Keep the
          <br />
          wild <span className="font-serif font-medium italic tracking-[-0.08em] text-emerald-200">close.</span>
        </h1>
        <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
          A calm little home for the images you love. Upload moments, save your favourites, and build a collection that feels like your own quiet corner of the world.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryLink to="/upload">Upload an image <span aria-hidden="true">↗</span></PrimaryLink>
          <Link to="/gallery" className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-md transition hover:bg-white/20">Explore gallery</Link>
        </div>
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
          <span><strong className="mr-2 text-xl text-white">{imageCount}</strong>{imageCount === 1 ? 'image collected' : 'images collected'}</span>
          <span><strong className="mr-2 text-xl text-white">{favoriteCount}</strong>{favoriteCount === 1 ? 'favourite' : 'favourites'}</span>
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-300" /> Stored with Cloudinary</span>
        </div>
      </div>

      <div className="mt-12 hidden w-full max-w-xs lg:block">
        <div className="rounded-[2rem] border border-white/25 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-200/20 text-2xl">✳</div>
            <div>
              <p className="font-bold text-white">Your nature journal</p>
              <p className="mt-1 text-xs text-white/60">A little room to breathe</p>
            </div>
          </div>
          <div className="my-5 h-px bg-white/15" />
          <p className="text-sm leading-6 text-white/75">“Look deep into nature, and then you will understand everything better.”</p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Collect what moves you</p>
          <Link to="/favorites" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-100">View your favourites ♥</Link>
        </div>
      </div>
    </section>
  );
}
