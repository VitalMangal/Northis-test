import React, {useState, useEffect, useCallback} from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridSortModel, GridRowSelectionModel, GridRowId } from '@mui/x-data-grid';
import { CssBaseline, Box, Input, TextField, Button, Typography } from '@mui/material';

import styles from './RepoList.module.scss'


interface item {
  id: number,
  name: string,
  language: string,
  forks: number,
  stargazers_count: number,
  updated_at: string,
}
//Поменять тип
interface PropsType {
  data: {
    items: item[],
    total_count: number,
  }
  setActiveRepo: any,
  per_page: any,
  setPer_page: any,
  page: any,
  setPage: any,
  setSort: any,
  isLoading: boolean,
}

export const RepoList = ({data, 
                  setActiveRepo,
                  per_page, setPer_page,
                  page, setPage,
                  setSort,
                  isLoading
                }:PropsType ) => {
  
  const [activeRepoId, setActiveRepoId] = useState<GridRowSelectionModel>([]);

  const [paginationModel, setPaginationModel] = useState({
    page: page,
    pageSize: per_page,
  });

  useEffect(() => {
    setPer_page(paginationModel.pageSize);
    setPage(paginationModel.page);
  }, [paginationModel])

  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {

    switch (sortModel[0].field) {
      case "forks":
        setSort({field: "forks", order: sortModel[0].sort})
        break;
      case "stargazers_count":
        setSort({field: "stars", order: sortModel[0].sort})
        break;
      case "updated_at":
        setSort({field: "updated", order: sortModel[0].sort})
        break;
      default:
        setSort({field: '', order: sortModel[0].sort})
        break;
    }
  }, []);

  //поменять тип
  const handleChange = (newRowSelectionModel: any) => {
    setActiveRepoId(newRowSelectionModel);
    const active = data.items.find((item: { id: GridRowId }) => item.id === newRowSelectionModel[0]);
    setActiveRepo(active);
  }

  const {items, total_count  } = data;

  if(items.length === 0) {
    return  <Typography variant="body2" className={styles.zero_result}>
              Не нашлось ни одного репозитория с таким названием
            </Typography>
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

          rows={rows}
          columns={columns}

          loading={isLoading}
          // Пагинация
          rowCount={total_count}
          pageSizeOptions={[10, 15, 20, 50]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}

          //Описание
          keepNonExistentRowsSelected // Оставить выбранное описание
          onRowSelectionModelChange={(newRowSelectionModel) => {
            handleChange(newRowSelectionModel);
          }}
          rowSelectionModel={activeRepoId}

          //Сортировка
          sortingMode="server"
          onSortModelChange={setSort}
          sortingOrder={['desc','asc']}
          disableColumnMenu={true} // Удалить меню

          //autosizeOnMount={true} // авторазмер столбцов
        />
      </Box>
    </>
  )
};

