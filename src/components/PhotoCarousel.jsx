import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import InteractiveEmoji from './InteractiveEmoji.jsx';

export default function PhotoCarousel({ photos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPhoto = photos[currentIndex];

  const caption = useMemo(() => {
    return `${currentIndex + 1} de ${photos.length}`;
  }, [currentIndex, photos.length]);

  function goToPrevious() {
    setCurrentIndex((index) => (index === 0 ? photos.length - 1 : index - 1));
  }

  function goToNext() {
    setCurrentIndex((index) => (index === photos.length - 1 ? 0 : index + 1));
  }

  function handleImageError(event) {
    if (
      !currentPhoto.fallbackImage ||
      event.currentTarget.dataset.fallbackApplied === 'true'
    ) {
      return;
    }

    event.currentTarget.dataset.fallbackApplied = 'true';
    event.currentTarget.src = currentPhoto.fallbackImage;
  }

  return (
    <section
      className="relative min-h-[520px] overflow-hidden rounded-lg border border-white/70 bg-white shadow-soft"
      aria-label="Carrossel de fotos da Clarinha"
    >
      <img
        key={currentPhoto.id}
        src={currentPhoto.image}
        alt={currentPhoto.alt}
        fetchPriority="high"
        decoding="async"
        onError={handleImageError}
        className="absolute inset-0 h-full w-full object-cover transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-white/5" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cherry shadow-card">
          <InteractiveEmoji
            symbol="❤️"
            label="Coracao interativo"
            className="h-8 w-8"
            sizeClass="text-lg"
          />
          {caption}
        </span>
      </div>

      <button
        type="button"
        className="icon-button absolute left-3 top-1/2 -translate-y-1/2"
        aria-label="Foto anterior"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="icon-button absolute right-3 top-1/2 -translate-y-1/2"
        aria-label="Proxima foto"
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="absolute left-1/2 top-5 flex max-w-[80%] -translate-x-1/2 gap-2 overflow-hidden">
        {photos.length <= 8 ? (
          photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/50'
              }`}
              aria-label={`Ir para foto ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))
        ) : (
          <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cherry shadow-card">
            Foto {currentIndex + 1} de {photos.length}
          </span>
        )}
      </div>
    </section>
  );
}
