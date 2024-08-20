import React, {useState, useEffect, useCallback} from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridSortModel } from '@mui/x-data-grid';
import { CssBaseline, Box, Input, TextField, Button } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import styles from './Error.module.css';
import { ErrorType } from '../../types';

export const GreetingErrorComponent = ({error}: ErrorType ) => {

  if (error) {
    if ('status' in error) {
        if(error.status === 403) {
          return (
            <div className={styles.error}>
              Превышено число запросов в минуту
            </div>
          )
        }
      }
  }
  return  <div className={styles.error}></div>;
};

