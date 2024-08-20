import { Typography } from '@mui/material';
import styles from './RepoDescription.module.css';
import { RepoDescriptionPropsType } from '../../types';

export const RepoDescription = ({activeRepo}: RepoDescriptionPropsType) => {

  if(!activeRepo) {
    return (
      <div className={styles.select_repository}>
        <Typography variant="body2" className={styles.zero_result}>
          Выберите репозиторий
        </Typography>
      </div>
    )
  }

  const { name, description, license } = activeRepo;
  return (
    <div className={styles.repo_description}>
      <Typography variant="h4" className={styles.name}>
        {name}
      </Typography>
      <Typography variant="body1" className={styles.description}>
        Описание: {description}
      </Typography>
      <Typography variant="body2" className={styles.license}>
        Лицензия: {license?.name || 'Отсутствует'}
      </Typography>
    </div>
  )
};
