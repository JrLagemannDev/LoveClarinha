import { Heart, Stars } from 'lucide-react';
import InteractiveEmoji from '../components/InteractiveEmoji.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const curiosities = [
  {
    id: 'sorriso',
    title: 'Seu sorriso muda o clima',
    text: 'Tem dias que so de lembrar do seu sorriso eu ja fico mais leve. Ele tem esse poder bonito de deixar tudo melhor.',
    emoji: '❤️',
  },
  {
    id: 'jeito',
    title: 'Seu jeitinho fica na memoria',
    text: 'O jeito que voce fala, cuida, brinca e olha para as coisas e uma das partes mais lindas de voce.',
    emoji: '💕',
  },
  {
    id: 'presenca',
    title: 'Voce transforma momentos tranquilos',
    text: 'Com voce, ate um dia comum ganha cara de lembranca especial. Sua presenca faz tudo parecer mais nosso.',
    emoji: '🍒',
  },
  {
    id: 'carinho',
    title: 'Voce tem um carinho unico',
    text: 'Tem uma delicadeza em voce que aparece nos detalhes, e eu amo perceber isso em cada pequena coisa.',
    emoji: '❤️',
  },
  {
    id: 'risada',
    title: 'Sua risada e uma das minhas favoritas',
    text: 'Ela fica na cabeca de um jeito bom, como uma musica que eu quero ouvir de novo.',
    emoji: '💕',
  },
  {
    id: 'clarinha',
    title: 'Voce e minha Clarinha',
    text: 'E isso, para mim, ja diz muita coisa: carinho, paz, saudade, vontade de estar perto e amor.',
    emoji: '🍒',
  },
];

export default function Curiosities() {
  return (
    <section className="page-shell page-section">
      <SectionHeader
        eyebrow="so sobre voce"
        title="Curiosidades que eu amo na Clara"
        description="Algumas coisinhas suas que talvez voce nem perceba, mas que para mim fazem toda diferenca."
        icon={Stars}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {curiosities.map((curiosity) => (
          <article
            key={curiosity.id}
            className="card readable-card card-hover p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cherry text-white">
                <Heart className="h-5 w-5 fill-white" aria-hidden="true" />
              </span>
              <InteractiveEmoji
                symbol={curiosity.emoji}
                label="Emoji interativo"
                className="h-11 w-11 shrink-0"
              />
            </div>
            <h2 className="font-display text-2xl font-black text-ink">
              {curiosity.title}
            </h2>
            <p className="mt-3 leading-7 text-ink/70">{curiosity.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
