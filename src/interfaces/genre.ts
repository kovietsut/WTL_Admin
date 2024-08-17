import { SyntheticEvent } from 'react';
import { PaginationResponse } from './common/responseData';

//#region Response Data / List Data
export type TGenre = {
  genreId: number;
  isEnabled: boolean;
  name?: string;
};

export type TGenreWithId = Omit<TGenre, 'genreId'> & { id: number };

export type TResponseGenre = {
  data?: TGenreWithId;
};

export type TResponseGenreList = PaginationResponse<TGenre>;

export type TGenreListParams = {
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
};
//#endregion

//#region State
export type GenreState = {
  openDrawer?: boolean;
  drawerMode: 'add' | 'edit' | 'detail';
  genreId?: number;
  genre?: TGenreWithId;
};

export type GenreEvent = {
  setCurrentTab?: (event: SyntheticEvent, value: string) => void;
  setOpenDrawer?: (open: boolean) => void;
  setDrawerMode?: (mode: 'add' | 'edit' | 'detail') => void;
  setGenreId?: (genreId: number) => void;
  setGenre?: (genre: TGenreWithId) => void;
};

export type GenreStoreState = GenreState & GenreEvent;
//#endregion

//#region Request / Response Update
export type TRequestGenreCreate = Omit<TGenre, 'genreId' | 'isEnabled' > & {};
export type TRequestGenreUpdate = {};
export type TRequestGenreDelete = {};

export type TResponseGenreCreate = {};
export type TResponseGenreUpdate = {};
export type TResponseGenreDelete = {};
//#endregion
