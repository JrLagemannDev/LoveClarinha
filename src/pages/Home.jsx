import { Camera, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PhotoCarousel from '../components/PhotoCarousel.jsx';
import { carouselPhotos } from '../data/photos.js';

export default function Home() {
  return (
    <section className="page-shell page-section heart-pattern">
      <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
        <div>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cherry shadow-card backdrop-blur">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            feito para voce, Clarinha
          </span>
          <h1 className="font-display text-5xl font-black leading-tight text-ink sm:text-6xl">
            LoveClarinha
          </h1>
          <p className="mt-5 max-w-xl text-xl font-extrabold leading-9 text-ink/70">
            Clarinha, esse cantinho e todo seu. Fiz para voce encontrar nossas
            fotos, nossas musicas, nossos momentos e um pedacinho do quanto
            voce e especial para mim.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/fotos" className="btn-primary">
              <Camera className="h-4 w-4" aria-hidden="true" />
              Ver fotos
            </Link>
            <Link to="/login" className="btn-secondary">
              <Heart className="h-4 w-4" aria-hidden="true" />
              Area especial
            </Link>
          </div>
        </div>

        <PhotoCarousel photos={carouselPhotos} />
      </div>
    </section>
  );
}
