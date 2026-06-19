import { BookHeart } from 'lucide-react';
import { ClarinhaEditableStory } from '../components/ClarinhaContributions.jsx';
import InteractiveEmoji from '../components/InteractiveEmoji.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { stories } from '../data/stories.js';

export default function Stories() {
  return (
    <section className="page-shell page-section">
      <SectionHeader
        eyebrow="historias"
        title="Pequenos capitulos de uma historia bonita"
        icon={BookHeart}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {stories.map((story) => {
          const isBlankStory =
            !story.date && !story.title && !story.text && !story.image;

          return (
            <article
              key={story.id}
              className={`card card-hover readable-card overflow-hidden p-0 ${
                story.image ? 'story-image-card md:col-span-2' : ''
              } ${isBlankStory ? 'min-h-48' : ''}`}
              style={
                story.image
                  ? {
                      '--story-image': `url(${story.image})`,
                      ...(story.imagePosition
                        ? { backgroundPosition: story.imagePosition }
                        : {}),
                    }
                  : undefined
              }
              aria-label={isBlankStory ? 'Historia em branco' : undefined}
            >
              <div
                className={`story-card-content p-5 sm:p-6 md:p-8 ${
                  isBlankStory ? 'flex min-h-48 items-start' : ''
                }`}
              >
                {story.date && (
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-bold uppercase tracking-[0.18em] text-cherry">
                      {story.date}
                    </span>
                    <InteractiveEmoji
                      symbol="💕"
                      label="Coracoes interativos"
                      className="h-11 w-11 shrink-0"
                    />
                  </div>
                )}
                <ClarinhaEditableStory
                  section="historias"
                  itemId={story.id}
                  defaultTitle={story.title}
                  defaultText={story.text}
                  addLabel="Adicionar Historia"
                  editLabel="Editar Historia"
                  placeholder="Escreva essa historia..."
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
