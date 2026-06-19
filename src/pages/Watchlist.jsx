import { Film } from 'lucide-react';
import { ClarinhaEditableText } from '../components/ClarinhaContributions.jsx';
import ContentCarousel from '../components/ContentCarousel.jsx';
import InteractiveEmoji from '../components/InteractiveEmoji.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { moviesWatched, seriesWatched } from '../data/watchlist.js';

function formatRating(rating) {
  return Number(rating).toFixed(1);
}

function getStarFill(rating, index) {
  const cappedRating = Math.max(0, Math.min(Number(rating), 10));
  return Math.max(0, Math.min(cappedRating - index, 1)) * 100;
}

function RatingStars({ rating }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${formatRating(rating)} de 10 estrelas`}
    >
      {Array.from({ length: 10 }, (_, index) => (
        <span
          key={index}
          className="rating-star rating-star-empty relative inline-block h-4 w-4 text-base leading-none text-white/35"
          aria-hidden="true"
        >
          ☆
          <span
            className="rating-star-fill absolute inset-0 overflow-hidden text-yellow-300"
            style={{ width: `${getStarFill(rating, index)}%` }}
          >
            ★
          </span>
        </span>
      ))}
    </span>
  );
}

function PersonReview({ name, review, editableSection, editableItemId }) {
  const hasOpinion = Boolean(review.opinion?.trim());

  return (
    <div className="rounded-lg border border-white/35 bg-white/10 p-4">
      <h3 className="card-title text-base font-black text-ink">{name}</h3>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-extrabold text-white">
        <span>Nota: {formatRating(review.rating)}</span>
        <RatingStars rating={review.rating} />
      </div>
      <div className="mt-3">
        {hasOpinion ? (
          <p className="text-sm leading-6 text-white">
            <span className="font-black">Opiniões:</span> {review.opinion}
          </p>
        ) : editableSection && editableItemId ? (
          <div className="space-y-2">
            <p className="text-sm font-black text-white">Opiniões:</p>
            <ClarinhaEditableText
              section={editableSection}
              itemId={editableItemId}
              addLabel="Adicionar opinião"
              editLabel="Editar opinião"
              deleteLabel="Excluir opinião"
              placeholder="Escreva a opinião da Clara em até 500 letras..."
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function WatchCard({ item, section }) {
  return (
    <article className="card card-hover readable-card h-full overflow-hidden lg:grid lg:grid-cols-[minmax(220px,0.48fr)_minmax(0,1fr)]">
      <div className="flex min-h-[460px] items-start justify-center bg-cherry/80 p-3">
        <img
          src={item.image}
          alt={item.alt}
          className="max-h-[520px] w-full object-contain object-top"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="min-w-0 space-y-4 p-5">
        <h2 className="sr-only">{item.title}</h2>
        <div className="flex items-center justify-between gap-3">
          <span className="card-title text-xl font-black leading-tight text-ink">
            {item.title}
          </span>
          <InteractiveEmoji
            symbol="❤️"
            label="Coração interativo"
            className="h-10 w-10 shrink-0"
            sizeClass="text-2xl"
          />
        </div>
        <PersonReview name="Junior" review={item.reviews.junior} />
        <PersonReview
          name="Clara"
          review={item.reviews.clara}
          editableSection={section}
          editableItemId={`${item.id}-opiniao-clara`}
        />
      </div>
    </article>
  );
}

function WatchSection({ title, description, items, ariaLabel, storageSection }) {
  return (
    <section className="mt-10">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h2 className="font-display text-3xl font-black text-ink">{title}</h2>
        <InteractiveEmoji
          symbol={title === 'Filmes' ? '🍒' : '💕'}
          label="Emoji decorativo interativo"
          className="h-11 w-11"
        />
      </div>
      <p className="mb-6 max-w-2xl text-lg font-bold leading-7 text-ink/75">
        {description}
      </p>
      <ContentCarousel
        items={items}
        ariaLabel={ariaLabel}
        maxVisibleItems={2}
        gridClassName="grid min-w-0 gap-6 2xl:gap-7 lg:grid-cols-2"
        renderItem={(item) => <WatchCard item={item} section={storageSection} />}
      />
    </section>
  );
}

export default function Watchlist() {
  return (
    <section className="mx-auto w-full max-w-[92rem] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="filmes e séries"
        title="criticas cinefilas"
        description="Aqui ficam os filmes e séries que a gente viu, com a nota de cada um."
        icon={Film}
      />

      <WatchSection
        title="Filmes"
        description="Os filmes que entraram para a nossa lista, com a opinião do Junior e da Clara."
        items={moviesWatched}
        ariaLabel="Carrossel de filmes vistos"
        storageSection="filmes"
      />

      <WatchSection
        title="Séries"
        description="As séries que viraram assunto, maratona e comentário nosso depois de cada episódio."
        items={seriesWatched}
        ariaLabel="Carrossel de séries vistas"
        storageSection="series"
      />
    </section>
  );
}
