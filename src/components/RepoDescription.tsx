
//Поменять тип
interface PropsType {
  activeRepo: any,
}


const RepoDescription = ({activeRepo}: PropsType) => {

  if(!activeRepo) {
    return (
      <div className="greeting repo-description">
        <p>Выберите репозиторий</p>
      </div>
    )
  }

  const { name, description, license, stargazers_count, forks } = activeRepo;
  return (
    <div className="repo-description">
      <div className="repo-description-name">{name}</div>
      <div className="repo-description-description">Описание: {description}</div>
      <div className="repo-description-license">Лицензия: {license?.name || 'Отсутствует'}</div>
      <div className="repo-description-stars">Количество звезд: {stargazers_count}</div>
      <div className="repo-description-stars">Количество форков: {forks}</div>
    </div>
  )
};

export default RepoDescription;