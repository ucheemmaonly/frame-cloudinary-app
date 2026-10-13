import Hero from '../components/Hero.jsx';
import NaturePageLayout from '../layouts/NaturePageLayout.jsx';

export default function HomePage({ images, favoriteCount }) {
  return (
    <NaturePageLayout page="home" favoriteCount={favoriteCount} contentClassName="flex flex-1 flex-col">
      <Hero imageCount={images.length} favoriteCount={favoriteCount} />
    </NaturePageLayout>
  );
}
