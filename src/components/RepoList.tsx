
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
  }
  setActiveRepo: any,
}

const RepoList = ({data, setActiveRepo}:PropsType ) => {
  
  const {items} = data;

  if(items.length === 0) {
    return <p>Не нашлось ни одного репозитория с таким названием</p>
  }
  return (
    <div className="repo_list">
      <p>Результаты поиска</p>
      <div className="table_head">
        <div className="table_title">Название</div>
        <div className="table_title">Язык</div>
        <div className="table_title">Число форков</div>
        <div className="table_title">Число звёзд</div>
        <div className="table_title">Дата обновления</div>
      </div>
      <div className="table_body">
        <ul>
          {items.map(item => {
            return (
              <li key={item.id} onClick={() => setActiveRepo(item)}>
                <div className="repo">
                  <div className="repo_item">{item.name}</div>
                  <div className="repo_item">{item.language}</div>
                  <div className="repo_item">{item.forks}</div>
                  <div className="repo_item">{item.stargazers_count}</div>
                  <div className="repo_item">{item.updated_at}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
};

export default RepoList;
