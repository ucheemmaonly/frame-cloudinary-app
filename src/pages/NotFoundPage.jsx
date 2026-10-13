import { Link } from 'react-router-dom';
import NaturePageLayout, { NaturePageEyebrow } from '../layouts/NaturePageLayout.jsx';

export default function NotFoundPage({ favoriteCount = 0 }) {
  return (
    <NaturePageLayout page="notFound" favoriteCount={favoriteCount}>
      <main className="mx-auto flex min-h-[65vh] max-w-4xl flex-col items-center justify-center px-5 py-20 text-center">
        <NaturePageEyebrow>Wrong trail</NaturePageEyebrow>
        <h1 className="mt-5 text-7xl font-black tracking-tight sm:text-9xl">404<span className="text-orange-400">.</span></h1>
        <p className="mt-5 max-w-lg text-lg leading-8 text-white/75">This page isn't on the map. Let's take you back to the beginning.</p>
        <Link to="/" className="mt-8 rounded-full bg-orange-500 px-6 py-3.5 font-bold text-white transition hover:bg-orange-400">Back home ↗</Link>
      </main>
    </NaturePageLayout>
  );
}
