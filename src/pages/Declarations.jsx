import { Heart, Sparkles } from 'lucide-react';
import InteractiveEmoji from '../components/InteractiveEmoji.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

export default function Declarations() {
  return (
    <section className="page-shell page-section">
      <SectionHeader
        eyebrow="declaracoes"
        title="Uma declaracao guardada so para voce"
        description="Se voce chegou ate aqui, e porque eu queria deixar uma parte ainda mais especial so para voce ler."
        icon={Sparkles}
      />

      <article className="declaration-letter heart-pattern overflow-hidden rounded-lg border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur sm:p-10">
        <div className="mb-6 inline-flex items-center gap-3">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cherry text-white shadow-card">
            <Heart className="h-8 w-8 fill-white animate-heartbeat" aria-hidden="true" />
          </span>
          <InteractiveEmoji
            symbol="🍒"
            label="Cereja interativa"
            className="h-14 w-14"
          />
          <InteractiveEmoji
            symbol="💕"
            label="Coracoes interativos"
            className="h-14 w-14"
          />
        </div>
        <h2 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Minha coxinha
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-ink/75">
          <p>
            Minha coxinha, se você está lendo isso, significa que este site
            ainda está em processo de construção, assim como esta cartinha.
            Feliz Dia dos Namorados. Fique sabendo que eu te amo muito e que,
            com certeza, ainda vou completar tudo isso e deixar bom o suficiente
            para ser uma área onde você venha para se lembrar de nós, se sentir
            confortável, amada e, talvez, matar um pouco da saudade.
          </p>
        </div>
      </article>
    </section>
  );
}
