import { BookHeart } from 'lucide-react';
import {
  ClarinhaCommentMenu,
  ClarinhaEditableText,
} from '../components/ClarinhaContributions.jsx';
import InteractiveEmoji from '../components/InteractiveEmoji.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { stories } from '../data/stories.js';

export default function Stories() {
  return (
    <section className="page-shell page-section">
      <SectionHeader
        eyebrow="historias"
        title="Pequenos capitulos de uma historia bonita"
        description="Algumas lembrancas mereciam virar palavras, porque tudo com voce fica mais facil de guardar no coracao."
        icon={BookHeart}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {stories.map((story) => (
          <article key={story.id} className="card card-hover readable-card p-6">
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
            <h2 className="mt-3 font-display text-3xl font-bold text-ink">
              {story.title}
            </h2>
            <div className="mt-4">
              <ClarinhaEditableText
                section="historias"
                itemId={story.id}
                defaultText={story.text}
                addLabel="Adicionar Historia"
                editLabel="Editar Historia"
                deleteLabel="Excluir Historia"
                placeholder="Escreva essa historia em ate 500 letras..."
              />
              <ClarinhaCommentMenu itemId={story.id} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
