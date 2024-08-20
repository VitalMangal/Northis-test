import styles from './Error.module.css';
import { ErrorType } from '../../types';

export const ErrorComponent = ({error}: ErrorType ) => {

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
    return (
      <div className={styles.error}>
        Произошла ошибка при загрузке данных
      </div>
    )
  }
  return  <div className={styles.error}></div>;
};

