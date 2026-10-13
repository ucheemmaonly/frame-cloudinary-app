import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ImagePreviewModal from './components/ImagePreviewModal.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import UploadPage from './pages/UploadPage.jsx';
import { uploadImageToCloudinary } from './services/cloudinary.js';

const STORAGE_KEY = 'frame-gallery-images-v1';

function readSavedImages() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (image) => image && image.id && image.url && image.thumbnailUrl && image.name,
    );
  } catch {
    return [];
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const [images, setImages] = useState(readSavedImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const favoriteCount = images.filter((image) => image.isFavorite).length;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    } catch {
      // The gallery still works in memory if browser storage is unavailable.
    }
  }, [images]);

  async function handleUpload(file) {
    setError('');
    setMessage('');
    setUploading(true);

    try {
      const uploadedImage = await uploadImageToCloudinary(file);
      setImages((currentImages) => [uploadedImage, ...currentImages]);
      setSearch('');
      setMessage('Upload complete — your image has been added to the gallery.');
      return true;
    } catch (uploadError) {
      setError(uploadError.message || 'Upload failed. Please try again.');
      return false;
    } finally {
      setUploading(false);
    }
  }

  function toggleFavorite(imageId) {
    setImages((currentImages) =>
      currentImages.map((image) =>
        image.id === imageId
          ? { ...image, isFavorite: !image.isFavorite }
          : image,
      ),
    );
  }

  function removeFromGallery(imageId) {
    const image = images.find((item) => item.id === imageId);
    if (!image) return;

    const confirmed = window.confirm(
      `Remove "${image.name}" from this browser gallery? This will not delete it from Cloudinary.`,
    );
    if (!confirmed) return;

    setImages((currentImages) => currentImages.filter((item) => item.id !== imageId));
    setPreviewImage((currentPreview) =>
      currentPreview?.id === imageId ? null : currentPreview,
    );
  }

  const sharedGalleryProps = {
    images,
    search,
    onSearchChange: setSearch,
    onToggleFavorite: toggleFavorite,
    onPreview: setPreviewImage,
    onRemove: removeFromGallery,
    favoriteCount,
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage images={images} favoriteCount={favoriteCount} />} />
        <Route path="/gallery" element={<GalleryPage {...sharedGalleryProps} />} />
        <Route
          path="/upload"
          element={
            <UploadPage
              favoriteCount={favoriteCount}
              onUpload={handleUpload}
              uploading={uploading}
              error={error}
              message={message}
            />
          }
        />
        <Route path="/favorites" element={<FavoritesPage {...sharedGalleryProps} />} />
        <Route path="*" element={<NotFoundPage favoriteCount={favoriteCount} />} />
      </Routes>
      <ImagePreviewModal image={previewImage} onClose={() => setPreviewImage(null)} />
    </>
  );
}
