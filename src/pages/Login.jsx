import { Heart, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (login(username, password)) {
      navigate(location.state?.from ?? '/declaracoes');
      return;
    }

    setError('Usuario ou senha incorretos. Confira as letras e tente de novo.');
  }

  if (isLoggedIn) {
    return (
      <section className="page-shell page-section">
        <div className="mx-auto max-w-xl">
          <SectionHeader
            eyebrow="surpresa aberta"
            title="A area especial está liberada"
            icon={LockKeyhole}
          />
          <div className="card readable-card p-6 text-center">
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blush-100 text-cherry">
              <Heart className="h-7 w-7 fill-cherry" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/declaracoes" className="btn-primary">
                Ver declaracoes
              </Link>
              <Link to="/historias" className="btn-secondary">
                Editar historias
              </Link>
              <button type="button" onClick={logout} className="btn-secondary">
                Sair
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell page-section">
      <div className="mx-auto max-w-xl">
        <SectionHeader
          eyebrow="so para voce"
          title="Entre para abrir a surpresa"
          description="Tem uma declaracao esperando por voce aqui dentro."
          icon={LockKeyhole}
        />

        <form className="card readable-card p-6" onSubmit={handleSubmit}>
          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-semibold text-ink">
              Usuario
            </span>
            <input
              className="input-field"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Seu nome"
              autoComplete="username"
            />
          </label>

          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-semibold text-ink">
              Senha
            </span>
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Senha secreta"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p className="mb-4 rounded-lg bg-cherry/10 px-4 py-3 text-sm font-semibold text-cherry">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary w-full">
            <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}
