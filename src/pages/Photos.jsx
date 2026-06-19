import { Camera } from 'lucide-react';
import GalleryGrid from '../components/GalleryGrid.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { claraPhotos, usPhotos } from '../data/photos.js';

export default function Photos() {
  return (
    <section className="page-shell page-section">
      <SectionHeader
        eyebrow="nossas lembrancas"
        title="Galeria da Clara"
        icon={Camera}
      />

      <GalleryGrid
        title="Clarinha"
        description="Um monte de pedacinhos seus que deixam esse cantinho mais bonito."
        photos={claraPhotos}
      />

      <GalleryGrid
        title="Nos dois"
        description="Momentos nossos que eu guardo com carinho."
        photos={usPhotos}
      />
    </section>
  );
}
