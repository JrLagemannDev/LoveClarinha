# LoveClarinha

Um presente romantico em React + Vite + Tailwind CSS, com paginas separadas para fotos, historias, filmes e series, musicas e declaracoes.

## Como rodar

```bash
npm install
npm run dev
```

Para gerar a versao de producao:

```bash
npm run build
```

Para sincronizar fotos adicionadas nas pastas:

```bash
npm run sync-photos
```

## Onde colocar fotos reais

- Fotos da Clarinha: `public/clara`
- Fotos de voces juntos: `public/nos`

Para aparecer automaticamente, use estes nomes:

- `public/clara/clara-1.jpg`
- `public/clara/clara-2.jpg`
- `public/clara/clara-3.jpg`
- `public/nos/nos-1.jpg`
- `public/nos/nos-2.jpg`
- `public/nos/nos-3.jpg`

Se preferir outros nomes ou extensoes, edite `src/data/photos.js` e troque os caminhos, por exemplo:

```js
image: '/clara/minha-foto.jpg'
image: '/nos/nossa-foto.jpg'
```

Enquanto as fotos reais nao existirem, o site usa placeholders automaticamente.
O projeto tambem sincroniza essas pastas automaticamente antes de `npm run dev` e `npm run build`.

## Login simples

O login usa apenas estado/localStorage para personalizar a navegacao. Ele nao e uma camada de seguranca real.
