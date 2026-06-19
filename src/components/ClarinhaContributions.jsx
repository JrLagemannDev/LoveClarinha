import {
  ChevronDown,
  Eye,
  MessageSquareQuote,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const MAX_TEXT_LENGTH = 500;
const COMMENT_STORAGE_PREFIX = 'loveclarinha:clarinhaComments:v1';
const TEXT_STORAGE_PREFIX = 'loveclarinha:clarinhaTexts:v1';

function getCommentKey(itemId) {
  return `${COMMENT_STORAGE_PREFIX}:${itemId}`;
}

function getTextKey(section, itemId) {
  return `${TEXT_STORAGE_PREFIX}:${section}:${itemId}`;
}

function loadStoredText(key) {
  try {
    return localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

function saveStoredText(key, value) {
  localStorage.setItem(key, value);
}

function removeStoredText(key) {
  localStorage.removeItem(key);
}

function MenuIconButton({ label, isOpen, onClick }) {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-cherry text-white shadow-card transition hover:-translate-y-0.5 hover:bg-red-700"
      aria-label={label}
      aria-expanded={isOpen}
      onClick={onClick}
    >
      <ChevronDown
        className={`h-5 w-5 text-white transition ${isOpen ? 'rotate-180' : ''}`}
        aria-hidden="true"
      />
    </button>
  );
}

function ActionMenu({ children }) {
  return (
    <div className="absolute bottom-full left-0 z-[100] mb-2 w-64 overflow-hidden rounded-xl border border-white/35 bg-cherry/95 p-2 text-white shadow-soft backdrop-blur">
      {children}
    </div>
  );
}

function ActionMenuButton({ children, icon: Icon, disabled = false, onClick }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-black text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-45"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className="h-4 w-4 text-white" aria-hidden="true" />
      {children}
    </button>
  );
}

function TextForm({
  label,
  initialValue = '',
  submitLabel,
  placeholder,
  onCancel,
  onSubmit,
}) {
  const [text, setText] = useState(initialValue.slice(0, MAX_TEXT_LENGTH));

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedText = text.trim().slice(0, MAX_TEXT_LENGTH);

    if (!trimmedText) {
      return;
    }

    onSubmit(trimmedText);
  }

  return (
    <form
      className="space-y-3 rounded-lg border border-white/30 bg-white/10 p-3"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-black text-white">{label}</span>
        <button
          type="button"
          className="close-icon-dark inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 transition hover:scale-105"
          aria-label="Cancelar"
          onClick={onCancel}
        >
          <X className="close-icon-dark h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <textarea
        className="input-field h-28 resize-none overflow-y-auto"
        maxLength={MAX_TEXT_LENGTH}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={placeholder}
      />
      <p className="contribution-counter text-right text-xs font-black text-white/70">
        {text.length}/{MAX_TEXT_LENGTH}
      </p>
      <button type="submit" className="btn-secondary w-full">
        {submitLabel}
      </button>
    </form>
  );
}

function ClarinhaQuote({ text, className = '' }) {
  if (!text) {
    return null;
  }

  return (
    <figure className={`rounded-lg border border-white/35 bg-white/10 p-4 ${className}`}>
      <blockquote className="contribution-quote max-h-36 overflow-y-auto pr-2 text-sm font-extrabold leading-6 text-white">
        “{text}”
      </blockquote>
      <figcaption className="contribution-author mt-2 text-xs font-black uppercase tracking-[0.16em]">
        adicionado por Clarinha
      </figcaption>
    </figure>
  );
}

export function ClarinhaEditableText({
  section,
  itemId,
  defaultText = '',
  addLabel = 'Adicionar texto',
  editLabel = 'Editar texto',
  deleteLabel = 'Excluir texto',
  placeholder = 'Escreva até 500 letras...',
}) {
  const { isLoggedIn } = useAuth();
  const storageKey = getTextKey(section, itemId);
  const [storedText, setStoredText] = useState(() => loadStoredText(storageKey));
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const textToShow = storedText || defaultText;
  const hasText = Boolean(textToShow.trim());
  const canAdd = isLoggedIn && !hasText;
  const canEdit = isLoggedIn && Boolean(storedText.trim());

  function handleSave(nextText) {
    saveStoredText(storageKey, nextText);
    setStoredText(nextText);
    setIsEditing(false);
  }

  function handleDelete() {
    removeStoredText(storageKey);
    setStoredText('');
    setIsMenuOpen(false);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <TextForm
        label={storedText ? editLabel : addLabel}
        initialValue={storedText}
        submitLabel="Salvar"
        placeholder={placeholder}
        onCancel={() => setIsEditing(false)}
        onSubmit={handleSave}
      />
    );
  }

  return (
    <div className="space-y-3">
      {hasText &&
        (storedText ? (
          <ClarinhaQuote text={storedText} />
        ) : (
          <p className="leading-7 text-ink/70">{defaultText}</p>
        ))}

      {canAdd && (
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-cherry px-4 py-2 text-xs font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-red-700"
          onClick={() => setIsEditing(true)}
        >
          <Plus className="h-4 w-4 text-white" aria-hidden="true" />
          {addLabel}
        </button>
      )}

      {canEdit && (
        <div className="relative">
          <MenuIconButton
            label="Opções do texto"
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          />
          {isMenuOpen && (
            <ActionMenu>
              <ActionMenuButton
                icon={Pencil}
                onClick={() => {
                  setIsEditing(true);
                  setIsMenuOpen(false);
                }}
              >
                {editLabel}
              </ActionMenuButton>
              <ActionMenuButton icon={Trash2} onClick={handleDelete}>
                {deleteLabel}
              </ActionMenuButton>
            </ActionMenu>
          )}
        </div>
      )}
    </div>
  );
}

export function ClarinhaCommentMenu({ itemId }) {
  const { isLoggedIn } = useAuth();
  const storageKey = getCommentKey(itemId);
  const [comment, setComment] = useState(() => loadStoredText(storageKey));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  function handleSave(nextComment) {
    saveStoredText(storageKey, nextComment);
    setComment(nextComment);
    setIsFormOpen(false);
    setIsViewerOpen(true);
  }

  function handleDelete() {
    removeStoredText(storageKey);
    setComment('');
    setIsMenuOpen(false);
    setIsFormOpen(false);
    setIsViewerOpen(false);
  }

  return (
    <div className="relative mt-5 space-y-3">
      <MenuIconButton
        label="Opções de comentários"
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen((value) => !value)}
      />

      {isMenuOpen && (
        <ActionMenu>
          {isLoggedIn && (
            <>
              <ActionMenuButton
                icon={MessageSquareQuote}
                onClick={() => {
                  setIsFormOpen(true);
                  setIsViewerOpen(false);
                  setIsMenuOpen(false);
                }}
              >
                Adicionar comentário
              </ActionMenuButton>
              <ActionMenuButton
                icon={Trash2}
                disabled={!comment}
                onClick={handleDelete}
              >
                Excluir comentário
              </ActionMenuButton>
            </>
          )}
          <ActionMenuButton
            icon={Eye}
            onClick={() => {
              setIsViewerOpen(true);
              setIsFormOpen(false);
              setIsMenuOpen(false);
            }}
          >
            Ver comentário
          </ActionMenuButton>
        </ActionMenu>
      )}

      {isFormOpen && (
        <TextForm
          label="Adicionar comentário"
          initialValue={comment}
          submitLabel="Salvar comentário"
          placeholder="Comentário da Clarinha sobre essa história..."
          onCancel={() => setIsFormOpen(false)}
          onSubmit={handleSave}
        />
      )}

      {isViewerOpen && (
        <div className="rounded-xl border border-white/35 bg-cherry/95 p-4 text-white shadow-card">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-sm font-black">Comentário da Clarinha</span>
            <button
              type="button"
              className="close-icon-dark inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 transition hover:scale-105"
              aria-label="Fechar comentário"
              onClick={() => setIsViewerOpen(false)}
            >
              <X className="close-icon-dark h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          {comment ? (
            <ClarinhaQuote text={comment} />
          ) : (
            <p className="text-sm font-bold text-white/80">
              Ainda não tem comentário da Clarinha aqui.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
