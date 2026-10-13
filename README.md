# FRAME — Nature-inspired Cloudinary Gallery

FRAME is a React + Vite app with a full-screen nature photograph behind each page. It uses Tailwind CSS utility classes directly in JSX through the Tailwind browser CDN for learning/coursework.

## Pages

- `/` — Home page with a nature background and collection summary.
- `/gallery` — All uploaded images, filename search, preview, favourite toggle and remove-from-gallery control.
- `/upload` — Image upload page with drag-and-drop, file validation, loading feedback and errors.
- `/favorites` — A separate page containing images marked as favourites.

React Router manages navigation. Gallery entries and favourite states are saved in this browser's `localStorage`.

## . Test the app

1. Visit `/upload` and upload a valid image.
2. Visit `/gallery` and confirm the image appears.
3. Upload a second image and confirm both are shown.
4. Click the heart on one image, then visit `/favorites`.
5. Search for an image by filename.
6. Open an image preview and close it with the close button or Escape.
7. Remove an image from this browser gallery and confirm the prompt. This does not delete the Cloudinary asset.
8. Refresh the page and confirm the gallery and favourites remain in this browser.

## Background photos

The page backgrounds use nature photographs hosted by Unsplash and load over the internet. Each route uses a different nature scene with dark overlays to keep text readable.

## Deployment note

This project uses Tailwind's browser CDN for learning. For a production-grade deployment, configure Tailwind through its Vite plugin. If deploying with client-side routing, configure the host to serve `index.html` as the fallback for routes such as `/gallery` and `/favorites`.
