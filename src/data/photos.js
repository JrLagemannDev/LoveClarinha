import claraOnePlaceholder from '../assets/placeholders/clara-1.svg';
import claraTwoPlaceholder from '../assets/placeholders/clara-2.svg';
import claraThreePlaceholder from '../assets/placeholders/clara-3.svg';
import usOnePlaceholder from '../assets/placeholders/nos-1.svg';
import usTwoPlaceholder from '../assets/placeholders/nos-2.svg';
import usThreePlaceholder from '../assets/placeholders/nos-3.svg';
import {
  generatedClaraPhotos,
  generatedUsPhotos,
} from './generatedPhotos.js';

// Coloque as fotos reais da Clarinha em public/clara.
// Use estes nomes para aparecer automaticamente: clara-1.jpg, clara-2.jpg, clara-3.jpg.
// Se preferir outros nomes, altere o campo image abaixo.
const fallbackClaraPhotos = [
  {
    id: 'clara-1',
    title: 'O sorriso dela',
    description: 'Uma lembranca linda da Clarinha.',
    alt: 'Foto da Clarinha',
    image: '/clara/clara-1.jpg',
    fallbackImage: claraOnePlaceholder,
  },
  {
    id: 'clara-2',
    title: 'Jeito unico',
    description: 'O jeitinho dela que deixa tudo mais bonito.',
    alt: 'Foto romantica da Clarinha',
    image: '/clara/clara-2.jpg',
    fallbackImage: claraTwoPlaceholder,
  },
  {
    id: 'clara-3',
    title: 'Minha favorita',
    description: 'Aquela lembranca que da vontade de olhar de novo.',
    alt: 'Foto da Clarinha em destaque',
    image: '/clara/clara-3.jpg',
    fallbackImage: claraThreePlaceholder,
  },
];

// Coloque as fotos de voces juntos em public/nos.
// Use estes nomes para aparecer automaticamente: nos-1.jpg, nos-2.jpg, nos-3.jpg.
// Se preferir outros nomes, altere o campo image abaixo.
const fallbackUsPhotos = [
  {
    id: 'nos-1',
    title: 'Nos dois',
    description: 'Um momento nosso que merece ficar guardado.',
    alt: 'Foto do casal',
    image: '/nos/nos-1.jpg',
    fallbackImage: usOnePlaceholder,
  },
  {
    id: 'nos-2',
    title: 'Memoria boa',
    description: 'Uma lembranca leve, bonita e nossa.',
    alt: 'Foto romantica do casal',
    image: '/nos/nos-2.jpg',
    fallbackImage: usTwoPlaceholder,
  },
  {
    id: 'nos-3',
    title: 'Sempre juntos',
    description: 'Um lugar para aquela foto que parece resumo de tudo.',
    alt: 'Foto do casal em destaque',
    image: '/nos/nos-3.jpg',
    fallbackImage: usThreePlaceholder,
  },
];

export const claraPhotos = generatedClaraPhotos.length
  ? generatedClaraPhotos
  : fallbackClaraPhotos;

export const usPhotos = generatedUsPhotos.length
  ? generatedUsPhotos
  : fallbackUsPhotos;

export const carouselPhotos = claraPhotos;
