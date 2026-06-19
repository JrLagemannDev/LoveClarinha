import InteractiveEmoji from './InteractiveEmoji.jsx';

const accents = [
  { id: 'cherry', label: 'Cereja decorativa', symbol: '🍒' },
  { id: 'heart-one', label: 'Coracao vermelho decorativo', symbol: '❤️' },
  { id: 'heart-two', label: 'Coracoes decorativos', symbol: '💕' },
];

export default function DecorativeAccent({ className = '' }) {
  return (
    <div className={`mt-5 flex flex-wrap justify-center gap-3 ${className}`}>
      {accents.map((accent) => (
        <InteractiveEmoji
          key={accent.id}
          symbol={accent.symbol}
          label={accent.label}
          className="h-12 w-12"
        />
      ))}
    </div>
  );
}
