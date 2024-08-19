
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
  setSort: any,
}

const RepoList = ({data, setActiveRepo, setSort}:PropsType ) => {
  
  const {items} = data;

  if(items.length === 0) {
    return <span>Не нашлось ни одного репозитория с таким названием</span>
  }
  return (
    <div className="repo_list">
      <p>Результаты поиска</p>
      <div className="table_head">
        <div onClick={() => setSort('')} className="table_title">
          <svg className="table_title_svg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.333344 7.00001L1.50834 8.17501L6.16668 3.52501V13.6667H7.83334V3.52501L12.4833 8.18334L13.6667 7.00001L7.00001 0.333344L0.333344 7.00001Z" fill="black" fillOpacity="0.56"/>
          </svg>
          <span>Название</span>
        </div>
        <div className="table_title">
          <span>Язык</span>
        </div>
        <div onClick={() => setSort('forks')} className="table_title">
          <svg className="table_title_svg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.333344 7.00001L1.50834 8.17501L6.16668 3.52501V13.6667H7.83334V3.52501L12.4833 8.18334L13.6667 7.00001L7.00001 0.333344L0.333344 7.00001Z" fill="black" fillOpacity="0.56"/>
          </svg>
          <span>Число форков</span>
        </div>
        <div onClick={() => setSort('stars')} className="table_title">
          <svg className="table_title_svg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.333344 7.00001L1.50834 8.17501L6.16668 3.52501V13.6667H7.83334V3.52501L12.4833 8.18334L13.6667 7.00001L7.00001 0.333344L0.333344 7.00001Z" fill="black" fillOpacity="0.56"/>
          </svg>
          <span>Число звёзд</span>
        </div>
        <div onClick={() => setSort('updated')} className="table_title">
          <svg className="table_title_svg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.333344 7.00001L1.50834 8.17501L6.16668 3.52501V13.6667H7.83334V3.52501L12.4833 8.18334L13.6667 7.00001L7.00001 0.333344L0.333344 7.00001Z" fill="black" fillOpacity="0.56"/>
          </svg>
          <span>Дата обновления</span>
        </div>
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
