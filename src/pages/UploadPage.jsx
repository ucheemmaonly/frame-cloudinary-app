import { Link } from 'react-router-dom';
import UploadForm from '../components/UploadForm.jsx';
import NaturePageLayout, { NaturePageEyebrow } from '../layouts/NaturePageLayout.jsx';

export default function UploadPage({ favoriteCount, onUpload, uploading, error, message }) {
  return (
    <NaturePageLayout page="upload" favoriteCount={favoriteCount}>
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-10 sm:px-7 sm:py-14">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8 max-w-2xl">
            <NaturePageEyebrow>Save a moment</NaturePageEyebrow>
            <h1 className="mt-3 text-5xl font-black tracking-tight text-white sm:text-7xl">Bring it with you<span className="text-orange-400">.</span></h1>
            <p className="mt-4 text-base leading-7 text-white/75 sm:text-lg">Choose a photo, upload it to Cloudinary, and keep it in your personal collection.</p>
          </div>
          <UploadForm onUpload={onUpload} uploading={uploading} error={error} message={message} />
          <p className="mt-5 text-center text-sm text-white/65">Already have images here? <Link className="font-bold text-emerald-200 underline decoration-emerald-200/50 underline-offset-4 hover:text-white" to="/gallery">Visit your gallery</Link>.</p>
        </div>
      </main>
    </NaturePageLayout>
  );
}
