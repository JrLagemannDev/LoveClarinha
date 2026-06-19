import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-shell page-section text-center">
      <div className="mx-auto max-w-xl">
        <span className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-cherry shadow-card">
          <Heart className="h-8 w-8 fill-cherry" aria-hidden="true" />
        </span>
        <h1 className="font-display text-5xl font-bold text-ink">
          Opa, esse cantinho nao existe
        </h1>
        <p className="mt-4 text-ink/70">
          Mesmo assim, ainda tem muita coisa bonita esperando por voce.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Voltar ao inicio
        </Link>
      </div>
    </section>
  );
}
