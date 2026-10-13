import { useEffect } from 'react';

export default function ImagePreviewModal({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined;
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="preview-title" className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div className="min-w-0">
            <h2 id="preview-title" className="truncate font-bold text-slate-900">{image.name}</h2>
            <p className="mt-1 text-xs text-slate-500">Preview · Cloudinary transformed image</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close preview" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-600 transition hover:bg-orange-100 hover:text-orange-700">×</button>
        </div>
        <div className="flex max-h-[calc(92vh-80px)] items-center justify-center bg-slate-950 p-2 sm:p-5">
          <img src={image.url} alt={image.name} className="max-h-[calc(92vh-130px)] max-w-full object-contain" />
        </div>
        <div className="flex justify-end px-5 py-3">
          <a href={image.url} target="_blank" rel="noreferrer" className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500">Open original ↗</a>
        </div>
      </section>
    </div>
  );
}
