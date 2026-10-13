import { useRef, useState } from 'react';
import { MAX_IMAGE_SIZE_MB } from '../config/cloudinary.js';

export default function UploadForm({ onUpload, uploading, error, message }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [localError, setLocalError] = useState('');
  const inputRef = useRef(null);

  function chooseFile(file) {
    setLocalError('');
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setSelectedFile(null);
      setLocalError('Please choose a valid image file.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setSelectedFile(null);
      setLocalError(`Please choose an image smaller than ${MAX_IMAGE_SIZE_MB} MB.`);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    setSelectedFile(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLocalError('');
    if (!selectedFile) {
      setLocalError('Choose an image before uploading.');
      return;
    }

    const uploaded = await onUpload(selectedFile);
    if (uploaded) {
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    if (uploading) return;
    chooseFile(event.dataTransfer.files?.[0]);
  }

  return (
    <section className="rounded-[2rem] border border-white/20 bg-slate-950/35 p-4 shadow-2xl shadow-black/15 backdrop-blur-xl sm:p-7">
      <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
        <div className="flex flex-col justify-center p-2 sm:p-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-200">Add to your collection</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Upload something beautiful.</h2>
          <p className="mt-4 max-w-md leading-7 text-white/70">
            Choose a photo from your device. FRAME stores it with Cloudinary and adds a resized version to your collection.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-white/80">
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">JPG</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">PNG</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">WEBP</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">Up to {MAX_IMAGE_SIZE_MB} MB</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4 rounded-3xl border border-white/10 bg-black/15 p-4 sm:p-6">
          <label
            htmlFor="frame-image-input"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            className={`flex min-h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-7 text-center transition ${uploading ? 'cursor-not-allowed border-white/10 opacity-60' : 'cursor-pointer border-emerald-100/45 bg-white/5 hover:border-orange-300 hover:bg-white/10'}`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-200/15 text-2xl text-emerald-100" aria-hidden="true">↑</span>
            <span className="mt-3 font-bold text-white">Drop your image here</span>
            <span className="mt-1 text-sm text-white/60">or click to browse your files</span>
            <input
              ref={inputRef}
              id="frame-image-input"
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(event) => chooseFile(event.target.files?.[0])}
              className="sr-only"
            />
          </label>

          {selectedFile && (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{selectedFile.name}</p>
                <p className="mt-1 text-xs text-white/55">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Ready to upload</p>
              </div>
              <button type="button" disabled={uploading} onClick={() => { setSelectedFile(null); if (inputRef.current) inputRef.current.value = ''; }} className="rounded-full px-3 py-2 text-sm font-semibold text-white/70 hover:bg-white/10 disabled:opacity-40" aria-label="Remove selected image">Remove</button>
            </div>
          )}

          <button type="submit" disabled={!selectedFile || uploading} className="flex w-full items-center justify-center gap-3 rounded-full bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/50">
            {uploading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Uploading your image...</> : <>Upload to gallery <span aria-hidden="true">↗</span></>}
          </button>

          {localError && <p role="alert" className="rounded-xl border border-red-300/20 bg-red-950/40 px-4 py-3 text-sm text-red-100">{localError}</p>}
          {error && <p role="alert" className="rounded-xl border border-red-300/20 bg-red-950/40 px-4 py-3 text-sm text-red-100">{error}</p>}
          {message && <p role="status" className="rounded-xl border border-emerald-200/20 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-100">{message}</p>}
          {uploading && <p role="status" className="text-center text-sm text-white/55">Please keep this tab open while Cloudinary processes your image.</p>}
        </form>
      </div>
    </section>
  );
}
