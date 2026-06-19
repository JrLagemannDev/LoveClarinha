import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import InteractiveEmoji from './InteractiveEmoji.jsx';

export default function GalleryGrid({ title, description, photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  function handleImageError(event, fallbackImage) {
    if (
      !fallbackImage ||
      event.currentTarget.dataset.fallbackApplied === 'true'
    ) {
      return;
    }

    event.currentTarget.dataset.fallbackApplied = 'true';
    event.currentTarget.src = fallbackImage;
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setSelectedPhoto(null);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="mb-12">
      <div className="mb-5">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-display text-3xl font-bold text-ink">{title}</h2>
          <InteractiveEmoji
            symbol="🍒"
            label="Cereja interativa"
            className="h-11 w-11"
          />
          <InteractiveEmoji
            symbol="💕"
            label="Coracoes interativos"
            className="h-11 w-11"
          />
        </div>
        <p className="mt-2 max-w-2xl text-ink/70">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            className="card group overflow-hidden text-left card-hover"
            onClick={() => setSelectedPhoto(photo)}
          >
            <span className="block aspect-[4/5] overflow-hidden bg-blush-100">
              <img
                src={photo.image}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                onError={(event) =>
                  handleImageError(event, photo.fallbackImage)
                }
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </span>
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-soft"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="icon-button absolute right-3 top-3 z-10"
              aria-label="Fechar foto"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.alt}
              loading="eager"
              decoding="async"
              onError={(event) =>
                handleImageError(event, selectedPhoto.fallbackImage)
              }
              className="max-h-[74vh] w-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
}
