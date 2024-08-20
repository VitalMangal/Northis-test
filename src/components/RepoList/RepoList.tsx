import {useState, useEffect} from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

import styles from './RepoList.module.scss'
import { RepoListPropsType } from '../../types';

export const RepoList = ({data, 
                  setActiveRepo,
                  per_page, setPer_page,
                  page, setPage,
                  setSort,
                  isLoading
                }:RepoListPropsType ) => {
  
  const [activeRepoId, setActiveRepoId] = useState<GridRowSelectionModel>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: page,
    pageSize: per_page,
  });

  useEffect(() => {
    setPer_page(paginationModel.pageSize);
    setPage(paginationModel.page);
  }, [paginationModel])

  const handleChange = (newRowSelectionModel: GridRowSelectionModel) => {
    setActiveRepoId(newRowSelectionModel);
    const active = data.items.find((item) => item.id === newRowSelectionModel[0]);
    setActiveRepo(active);
  }

  const {items, total_count  } = data;

  if(items.length === 0) {
    return  (
      <Typography variant="body2" className={styles.zero_result}>
        Не нашлось ни одного репозитория с таким названием
      </Typography>
    )
  }

  const rows: GridRowsProp = items;
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Название', sortable: false, flex: 0.2 },
    { field: 'language', headerName: 'Язык', sortable: false, flex: 0.2 },
    { field: 'forks', headerName: 'Число форков', flex: 0.2 },
    { field: 'stars', headerName: 'Число звёзд', flex: 0.2 },
    { field: 'updated', headerName: 'Дата обновления', flex: 0.2 },
  ];

  return (
    <>
      <Typography variant="h3" className={styles.searchResult} sx={{margin: '10px'}}>
        Результаты поиска
      </Typography>
      <Box className={styles.dataGridContainer}>      
        <DataGrid 
          className={styles.dataGrid}
          loading={isLoading}

          rows={rows}
          columns={columns}

          // Пагинация
          rowCount={total_count}
          pageSizeOptions={[10, 15, 20, 50]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}

          //Описание репозитория
          keepNonExistentRowsSelected // Оставить выбранное описание после перелистывания
          onRowSelectionModelChange={(newRowSelectionModel) => {
            handleChange(newRowSelectionModel);
          }}
          rowSelectionModel={activeRepoId}

          //Сортировка
          sortingMode="server"
          onSortModelChange={setSort}
          sortingOrder={['desc','asc']}
          disableColumnMenu={true} // Удалить меню
        />
      </Box>
    </>
  )
};

