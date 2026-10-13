export default function ImageCard({ image, onToggleFavorite, onPreview, onRemove }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/15 bg-slate-950/45 shadow-lg shadow-black/10 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-slate-950/60 hover:shadow-xl">
      <div className="relative overflow-hidden bg-black/20">
        <button
          type="button"
          onClick={() => onPreview(image)}
          className="block h-64 w-full cursor-zoom-in text-left sm:h-72"
          aria-label={`Preview ${image.name}`}
        >
          <img
            src={image.thumbnailUrl}
            alt={image.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </button>

        <button
          type="button"
          onClick={() => onToggleFavorite(image.id)}
          aria-label={image.isFavorite ? `Remove ${image.name} from favourites` : `Add ${image.name} to favourites`}
          aria-pressed={Boolean(image.isFavorite)}
          title={image.isFavorite ? 'Remove from favourites' : 'Add to favourites'}
          className={`absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 text-xl shadow-sm backdrop-blur transition hover:scale-105 ${image.isFavorite ? 'bg-orange-500 text-white' : 'bg-slate-950/55 text-white hover:bg-orange-500'}`}
        >
          {image.isFavorite ? '♥' : '♡'}
        </button>

        <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-slate-950/65 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
          Cloudinary image
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="truncate font-bold text-white" title={image.name}>{image.name}</h3>
        <p className="mt-1 text-xs text-white/55">
          Added {new Date(image.createdAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
          <button type="button" onClick={() => onPreview(image)} className="rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-200 hover:text-slate-950">
            Preview image
          </button>
          <div className="flex items-center gap-1">
            <a href={image.url} target="_blank" rel="noreferrer" aria-label={`Open original image ${image.name}`} title="Open original image" className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-white/65 transition hover:bg-white/10 hover:text-white">↗</a>
            <button type="button" onClick={() => onRemove(image.id)} title="Remove from this gallery only" aria-label={`Remove ${image.name} from gallery`} className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-white/60 transition hover:bg-red-500/20 hover:text-red-200">×</button>
          </div>
        </div>
      </div>
    </article>
  );
}
