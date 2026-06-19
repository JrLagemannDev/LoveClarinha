import { Music2 } from 'lucide-react';
import ContentCarousel from '../components/ContentCarousel.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { songs } from '../data/songs.js';

export default function Music() {
  return (
    <section className="mx-auto w-full max-w-[92rem] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="nossas musicas"
        title="trilha sonora de JURA (Junior + Clara) ❤️🎵"
        icon={Music2}
      />

      <ContentCarousel
        items={songs}
        ariaLabel="Carrossel de musicas"
        maxVisibleItems={2}
        gridClassName="grid min-w-0 gap-6 lg:grid-cols-2"
        renderItem={(song) => (
          <article className="h-full">
            <h2 className="mb-3 text-center font-display text-3xl font-black text-ink">
              {song.title}
            </h2>

            <div className="overflow-hidden rounded-lg border border-white/70 bg-cherry/70 shadow-soft">
              <iframe
                className="block aspect-video w-full"
                src={`${song.embedUrl}?rel=0&modestbranding=1`}
                title={song.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </article>
        )}
      />
    </section>
  );
}
