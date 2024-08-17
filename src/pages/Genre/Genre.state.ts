import { ValidationSchema } from '@/interfaces/common/object';
import { GenreStoreState, TGenre } from '@/interfaces/genre';
import {  useMemo } from 'react';
import { z } from 'zod';
import { create } from 'zustand';

export const useGenresIds = (genres: TGenre[] = []) => {
  return useMemo(() => {
    return genres.map((genre) => genre.genreId);
  }, [genres]);
};

const initialState: GenreStoreState = {
  openDrawer: false,
  drawerMode: 'add',
};

export const useGenreStore = create<GenreStoreState>((set) => ({
  ...initialState,
  setOpenDrawer(open) {
    set({ openDrawer: open });
  },
  setDrawerMode: (mode) => set({ drawerMode: mode }),
  setGenreId: (genreId) => set({ genreId: genreId }),
  setGenre: (genre) => set({ genre: genre }),
}));

export const validationCreateGenreSchema: ValidationSchema = z.object({
  name: z.string().min(1, 'Genre name is required'),
});
