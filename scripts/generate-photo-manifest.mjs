import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = path.join(rootDir, 'src', 'data', 'generatedPhotos.js');
const imageExtensions = new Set([
  '.avif',
  '.gif',
  '.heic',
  '.heif',
  '.jpeg',
  '.jpg',
  '.png',
  '.webp',
]);

async function collectPhotos(folderName, labelPrefix, description) {
  const folderPath = path.join(rootDir, 'public', folderName);

  try {
    const entries = await readdir(folderPath, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile())
      .filter((entry) => imageExtensions.has(path.extname(entry.name).toLowerCase()))
      .sort((first, second) =>
        first.name.localeCompare(second.name, 'pt-BR', { numeric: true }),
      )
      .map((entry, index) => ({
        id: `${folderName}-${index + 1}`,
        title: `${labelPrefix} ${index + 1}`,
        description,
        alt: `${labelPrefix} ${index + 1}`,
        image: `/${folderName}/${entry.name}`,
      }));
  } catch {
    return [];
  }
}

const claraPhotos = await collectPhotos(
  'clara',
  'Foto da Clarinha',
  'Uma lembranca linda da Clarinha.',
);
const nosPhotos = await collectPhotos(
  'nos',
  'Foto nossa',
  'Uma lembranca nossa guardada com carinho.',
);
const accentedNosPhotos = await collectPhotos(
  'nós',
  'Foto nossa',
  'Uma lembranca nossa guardada com carinho.',
);

const generated = `// Arquivo gerado automaticamente por scripts/generate-photo-manifest.mjs.
// Para atualizar depois de adicionar fotos, rode: npm run sync-photos

export const generatedClaraPhotos = ${JSON.stringify(claraPhotos, null, 2)};

export const generatedUsPhotos = ${JSON.stringify([...nosPhotos, ...accentedNosPhotos], null, 2)};
`;

await writeFile(outputFile, `${generated}\n`, 'utf8');

console.log(
  `Fotos sincronizadas: ${claraPhotos.length} em clara, ${
    nosPhotos.length + accentedNosPhotos.length
  } em nos.`,
);
