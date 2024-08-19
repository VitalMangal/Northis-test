
//Поменять тип
interface PropsType {
  per_page: any,
  setPer_page: any,
  data: any,
  page: any,
  setPage: any,
}


export const Pages = ({ per_page, setPer_page, data, page, setPage }: PropsType) => {

  const { total_count } = data;

  return (
    <div className="pages">
      <div className="rows_per_page">
        <label>
          Rows per page:
          <select
            value={per_page}
            onChange={e => setPer_page(e.target.value)}
          >
            <option value='5'>5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </label>        
      </div>
      <div className="number_of_rows">
        <span>{(page - 1) * per_page + 1}-{page * per_page > total_count ? total_count : page * per_page} of {total_count}</span>
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="pagination_btn page_down">
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.70504 1.41L6.29504 0L0.295044 6L6.29504 12L7.70504 10.59L3.12504 6L7.70504 1.41Z" fill="black" fillOpacity="0.56"/>
          </svg>
        </button>
        <button onClick={() => setPage(page + 1)} disabled={page === Math.ceil(total_count / per_page)} className="pagination_btn page_up">
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.70504 0L0.295044 1.41L4.87504 6L0.295044 10.59L1.70504 12L7.70504 6L1.70504 0Z" fill="black" fillOpacity="0.56"/>
          </svg>
        </button>
      </div>
    </div>
  )
};
