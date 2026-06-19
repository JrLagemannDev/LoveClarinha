import InteractiveEmoji from './InteractiveEmoji.jsx';

const decorations = [
  {
    id: 'heart-left',
    label: 'Coracao vermelho decorativo',
    symbol: '❤️',
    className: 'left-3 top-28 sm:left-8',
    delay: '0s',
  },
  {
    id: 'cherry-right',
    label: 'Cereja decorativa',
    symbol: '🍒',
    className: 'right-3 top-40 sm:right-10',
    delay: '1s',
  },
  {
    id: 'heart-bottom',
    label: 'Coracoes decorativos inferiores',
    symbol: '💕',
    className: 'bottom-24 right-5 sm:right-16',
    delay: '2s',
  },
  {
    id: 'cherry-bottom',
    label: 'Cereja decorativa inferior',
    symbol: '🍒',
    className: 'bottom-48 left-4 sm:left-14',
    delay: '1.5s',
  },
  {
    id: 'cherry-top-left',
    label: 'Cereja decorativa superior',
    symbol: '🍒',
    className: 'left-24 top-52',
    delay: '2.4s',
  },
  {
    id: 'cherry-middle-right',
    label: 'Cereja decorativa lateral',
    symbol: '🍒',
    className: 'right-8 top-[58%] sm:right-28',
    delay: '0.7s',
  },
  {
    id: 'heart-middle-left',
    label: 'Coracao vermelho decorativo lateral',
    symbol: '❤️',
    className: 'left-5 top-[62%] sm:left-20',
    delay: '2.8s',
  },
  {
    id: 'cherry-low-right',
    label: 'Cereja decorativa baixa',
    symbol: '🍒',
    className: 'bottom-10 right-20 sm:right-28',
    delay: '3.2s',
  },
  {
    id: 'heart-low-left',
    label: 'Coracoes rosas decorativos',
    symbol: '💕',
    className: 'bottom-8 left-20 sm:left-32',
    delay: '3.7s',
  },
  {
    id: 'cherry-center-left',
    label: 'Cereja decorativa central',
    symbol: '🍒',
    className: 'left-6 top-[42%] sm:left-12',
    delay: '1.9s',
  },
];

export default function FloatingDecorations() {
  return (
    <div className="fixed inset-0 z-[70] overflow-visible pointer-events-none">
      {decorations.map(({ id, label, symbol, className, delay }) => (
        <InteractiveEmoji
          key={id}
          className={`pointer-events-auto absolute inline-flex h-11 w-11 items-center justify-center md:h-16 md:w-16 ${className}`}
          label={label}
          symbol={symbol}
          displayClass=""
          sizeClass="text-3xl md:text-5xl"
          style={{ animationDelay: delay }}
        />
      ))}
    </div>
  );
}
