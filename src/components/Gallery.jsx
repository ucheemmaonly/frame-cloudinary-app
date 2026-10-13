import { Link } from 'react-router-dom';
import ImageCard from './ImageCard.jsx';

export default function Gallery({
  images,
  search,
  onSearchChange,
  onToggleFavorite,
  onPreview,
  onRemove,
  mode = 'all',
}) {
  const favoriteCount = images.filter((image) => image.isFavorite).length;
  const galleryImages = mode === 'favorites'
    ? images.filter((image) => image.isFavorite)
    : images;
  const visibleImages = galleryImages.filter((image) =>
    image.name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const isFavoritesPage = mode === 'favorites';

  return (
    <section aria-label={isFavoritesPage ? 'Favorite images' : 'All uploaded images'}>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-200">{isFavoritesPage ? 'Saved with love' : 'Your collection'}</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
            {isFavoritesPage ? 'Favourite moments' : 'All your images'}<span className="text-orange-400">.</span>
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/65">
            {isFavoritesPage ? 'Images you have marked with a heart.' : 'Your uploaded images, all together in one place.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2.5 font-semibold text-white/85">
            {visibleImages.length} shown
          </span>
          {isFavoritesPage && (
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2.5 font-semibold text-white/85">
              {favoriteCount} saved
            </span>
          )}
        </div>
      </div>

      <label className="mb-6 flex min-w-0 items-center gap-3 rounded-2xl border border-white/15 bg-black/20 px-4 py-3.5 focus-within:ring-2 focus-within:ring-emerald-200/60 sm:max-w-md">
        <span aria-hidden="true" className="text-xl text-white/60">⌕</span>
        <span className="sr-only">Search images by filename</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by filename..."
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/50"
        />
      </label>

      {visibleImages.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/25 bg-black/15 px-6 py-14 text-center backdrop-blur-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl text-emerald-200">
            {isFavoritesPage ? '♡' : search ? '⌕' : '✦'}
          </div>
          <h3 className="mt-5 text-xl font-bold text-white">
            {isFavoritesPage ? 'No favourites just yet.' : search ? 'No images match your search.' : 'Your collection is waiting.'}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/65">
            {isFavoritesPage
              ? 'Open your gallery and tap the heart on any image you want to keep close.'
              : search
                ? 'Try another filename or clear your search.'
                : 'Upload your first image and it will appear here.'}
          </p>
          <Link to={isFavoritesPage ? '/gallery' : '/upload'} className="mt-5 inline-flex rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400">
            {isFavoritesPage ? 'Explore all images' : 'Upload your first image'}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {visibleImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onToggleFavorite={onToggleFavorite}
              onPreview={onPreview}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-xs leading-5 text-white/45">
        Removing an image here only removes it from this browser gallery. It does not delete the asset from Cloudinary.
      </p>
    </section>
  );
}
