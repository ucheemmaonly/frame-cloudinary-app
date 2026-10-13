import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from '../config/cloudinary.js';

export function getCloudinaryConfigurationError() {
  if (
    !CLOUDINARY_CLOUD_NAME.trim() ||
    CLOUDINARY_CLOUD_NAME === 'YOUR_CLOUD_NAME'
  ) {
    return 'Add your Cloudinary Cloud Name in src/config/cloudinary.js.';
  }

  if (!CLOUDINARY_UPLOAD_PRESET.trim()) {
    return 'Add your unsigned upload preset name in src/config/cloudinary.js.';
  }

  return '';
}

export async function uploadImageToCloudinary(file) {
  const configurationError = getCloudinaryConfigurationError();
  if (configurationError) throw new Error(configurationError);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Image upload failed. Please try again.');
  }

  if (!data.secure_url || !data.asset_id) {
    throw new Error('Cloudinary did not return the expected image details.');
  }

  // Cloudinary transformations resize the image served in the gallery.
  const thumbnailUrl = data.secure_url.replace(
    '/upload/',
    '/upload/w_600,h_450,c_limit,q_auto,f_auto/',
  );

  return {
    id: data.asset_id,
    name: file.name,
    url: data.secure_url,
    thumbnailUrl,
    createdAt: new Date().toISOString(),
    isFavorite: false,
  };
}
