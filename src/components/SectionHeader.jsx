import DecorativeAccent from './DecorativeAccent.jsx';

export default function SectionHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  align = 'center',
}) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <div className={`mb-8 flex flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cherry shadow-card backdrop-blur">
          {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
          {eyebrow}
        </span>
      )}
      <h1 className="max-w-3xl font-display text-4xl font-black leading-tight text-ink sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-base font-extrabold leading-7 text-ink/70 sm:text-lg">
          {description}
        </p>
      )}
      <DecorativeAccent className={align === 'left' ? 'justify-start' : ''} />
    </div>
  );
}
