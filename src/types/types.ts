import { GridSortModel } from "@mui/x-data-grid";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Тип объекта с инф-цией о репозитории
export type Item = {
  id: number;
  name: string;
  language: string | null;
  forks: number;
  stargazers_count: number;
  updated_at: string;
  description: string | null;
  license: {
    name: string
  } | null;
}

// Тип форматированного объекта с инф-цией о репозитории
export type FormattedItem = {
  id: number;
  name: string;
  language: string | null;
  forks: number;
  stars: number;
  updated: string;
  description: string | null;
  license: {
    name: string
  } | null;
}

// Тип положительного ответа от сервера
export type Response = {
  total_count: number,
  items: Item[],
}

// Тип форматированного положительного ответа от сервера
export type FormattedResponse = {
  total_count: number,
  items: FormattedItem[],
}

//Пропсы

export type ErrorType = {
  error: FetchBaseQueryError | SerializedError | undefined
}

export type HeaderPropsType = {
  setQ: React.Dispatch<React.SetStateAction<string>>,
  isLoading: boolean,
}

export type RepoDescriptionPropsType = {
  activeRepo: FormattedItem | undefined,
}

export type RepoListPropsType = {
  data: FormattedResponse,
  setActiveRepo: React.Dispatch<React.SetStateAction<FormattedItem | undefined>>,
  per_page: number,
  setPer_page: React.Dispatch<React.SetStateAction<number>>,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setSort: React.Dispatch<React.SetStateAction<GridSortModel>>,
  isLoading: boolean,
}

//Типы для store

export type QueryParams = {
  q: string;
  per_page: number;
  page: number;
  sort: string;
  order: string | null | undefined;
}