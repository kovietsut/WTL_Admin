import { TGenre } from '@/interfaces/genre';
import { ELanguage } from '@/libs/helpers/enums';
import { z } from 'zod';
import { Manga } from './_section/_list/ComicList';

export const mangaData: Manga[] = [
  {
    id: 1,
    coverImage: '/assets/sample.png',
    name: 'Manga 1',
    preface: 'This is a short description of Manga 1.',
    authorName: 'Author 1',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 2,
    coverImage: '/assets/sample.png',
    name: 'Manga 2',
    preface: 'This is a short description of Manga 2.',
    authorName: 'Author 2',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 3,
    coverImage: '/assets/sample.png',
    name: 'Manga 3',
    preface: 'This is a short description of Manga 3.',
    authorName: 'Author 3',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 4,
    coverImage: '/assets/sample.png',
    name: 'Manga 4',
    preface: 'This is a short description of Manga 4.',
    authorName: 'Author 4',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 5,
    coverImage: '/assets/sample.png',
    name: 'Manga 5',
    preface: 'This is a short description of Manga 5.',
    authorName: 'Author 5',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 6,
    coverImage: '/assets/sample.png',
    name: 'Manga 6',
    preface: 'This is a short description of Manga 6.',
    authorName: 'Author 6',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 7,
    coverImage: '/assets/sample.png',
    name: 'Manga 6',
    preface: 'This is a short description of Manga 6.',
    authorName: 'Author 6',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 8,
    coverImage: '/assets/sample.png',
    name: 'Manga 6',
    preface: 'This is a short description of Manga 6.',
    authorName: 'Author 6',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
  {
    id: 9,
    coverImage: '/assets/sample.png',
    name: 'Manga 6',
    preface: 'This is a short description of Manga 6.',
    authorName: 'Author 6',
    genres: ['Action', 'Adventure'],
    hasAdult: true,
    status: 'Ongoing',
    isPublic: true,
  },
];

export const platformOptions = ['Web', 'Node.js', 'Python', 'C#'];

export const genres = [
  {
    value: 1,
    label: 'ABC',
  },
  {
    value: 2,
    label: 'XYZ',
  },
  {
    value: 3,
    label: 'QQQ',
  },
  {
    value: 4,
    label: 'QQQ',
  },
  {
    value: 5,
    label: 'QQQ',
  },
  {
    value: 6,
    label: 'QQQ',
  },
  {
    value: 7,
    label: 'QQQ',
  },
  {
    value: 8,
    label: 'QQQ',
  },
  {
    value: 9,
    label: 'QQQ',
  },
];

interface CategoryOption {
  description: string;
  title: string;
  value: string;
}

export const categoryOptions: CategoryOption[] = [
  {
    description: 'Engaging long-form stories with detailed narratives and character development.',
    title: 'Novel',
    value: 'novel',
  },
  {
    description:
      'Visual storytelling with rich illustrations, often serialized and quick to consume.',
    title: 'Manga',
    value: 'manga',
  },
];

export const listGenreId: TGenre[] = [
  { genreId: 1, isEnabled: true, name: 'Action' },
  { genreId: 2, isEnabled: true, name: 'Adventure' },
  { genreId: 3, isEnabled: false, name: 'Fantasy' },
  { genreId: 4, isEnabled: true, name: 'Sci-Fi' },
  { genreId: 5, isEnabled: true }, // name is optional, so this is valid
];

export const languageOptions = [
  { language: ELanguage.NA, name: 'Vietnamese' },
  { language: ELanguage.VN, name: 'English' },
];

//#regnion State In Comic
export const schemaComic = z.object({
  name: z.string().min(1, 'Comic title is required'),
  preface: z.string().min(1, 'Summary is required'),
  listGenreId: z.array(z.number()).min(1, 'Select at least 1 genre'),
  // coverImage: z.string().url(),
  // List Optional
  type: z.string().optional(),
  createdBy: z.number().optional(),
  amountOfReadings: z.coerce.number().positive('At least positive number').optional(),
  language: z.nativeEnum(ELanguage).optional(),
  hasAdult: z.boolean().optional(),
});

export type ComicFormProps = {
  createdBy?: number;
  type: string;
  name: string;
  preface: string;
  amountOfReadings?: number;
  coverImage: string;
  language?: ELanguage[];
  hasAdult: boolean;
  listGenreId: TGenre[];
};
//#endregion
