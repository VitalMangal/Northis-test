import {useEffect, useState} from 'react';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { GridSortModel } from '@mui/x-data-grid';

import {RepoList} from '../RepoList';
import {RepoDescription} from '../RepoDescription';
import {ErrorComponent, GreetingErrorComponent} from '../Error';
import {Header} from '../Header';

import { useGetRepositoriesQuery } from '../../store';

import styles from './App.module.css'
import { FormattedItem, FormattedResponse, Item } from '../../types';

const defaultPerPage = 10;
const defaultPage = 0; // Ноль из-за особенностей работы DataGrid

//Используется для единообразного оформления даты ДД.ММ.ГГГГ
const formattingDayAndMonth = (date: number): string => {
  if( date >= 0 && date <= 9) {
    return String("0" + date);
  }
  return String(date);
}

const formattingItem = (item: Item): FormattedItem => {
  const date = new Date(item.updated_at);
  const day = formattingDayAndMonth(date.getDate());
  const month = formattingDayAndMonth(date.getMonth() + 1);
  const year = date.getFullYear();
  const formattedDate = day + "-" + month + "-" + year;

  const newItem = {
    id: item.id,
    name: item.name,
    language: item.language,
    forks: item.forks,
    stars: item.stargazers_count,
    updated: formattedDate,
    description: item.description,
    license: item.license,
  }
  return newItem;
};

export function App() {

  const [activeRepo, setActiveRepo] = useState<FormattedItem | undefined>(undefined);
  const [formattedData, setFormattedData] = useState<FormattedResponse | undefined>(undefined);

  const [q, setQ] = useState<string>('');
  const [per_page, setPer_page] = useState<number>(defaultPerPage);
  const [page, setPage] = useState<number>(defaultPage);
  const [sort, setSort] = useState<GridSortModel>([{field: '', sort: 'desc'}]);

  const { data, error, isLoading, refetch } = useGetRepositoriesQuery({
     q, per_page, page: page + 1, sort: sort[0].field, order: sort[0].sort,
    });

  useEffect(() => {
    refetch()
  }, [q, per_page, page, sort])

  useEffect(() => {
    if(data) {
      const newItems = data.items.map(formattingItem);
      const newData = {
        total_count: data.total_count,
        items: newItems
      }
      setFormattedData(newData);
    }
  }, [data])

  return (
    <Grid container className={styles.container}>
      <Grid xs={12} className={styles.header_container}>
        <Header setQ={setQ} isLoading={isLoading}/>
      </Grid>
      {formattedData === undefined
        ? <>
            <GreetingErrorComponent error={error}/>
            <Box className={styles.greeting_box}>
              <Typography variant="body2">
                Добро пожаловать
              </Typography>
            </Box>
          </>
        : <Grid container xs={12} columns={3} className={styles.main_container}>
            <Grid xs={2} className={styles.repoList_container}>
              <ErrorComponent error={error}/>
              <RepoList 
                data={formattedData}
                setActiveRepo={setActiveRepo}
                per_page={per_page}
                setPer_page={setPer_page}
                page={page}
                setPage={setPage}
                setSort={setSort}
                isLoading={isLoading}
              />
            </Grid>
            <Grid xs={1} className={styles.repoDescription_container}>
              <RepoDescription activeRepo={activeRepo}/>
            </Grid>
          </Grid>              
      } 
      <Grid xs={12} className={styles.footer}>
      </Grid>
    </Grid>
  );
}