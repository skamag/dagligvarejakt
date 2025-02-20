const PageNavigation: React.FC<any> = ({ page, setPage }) => {
  return (
    <div className="buttons-container">
      <button
        className="page-button"
        onClick={() => page > 1 && setPage(page - 1)}
        disabled={page <= 1}
      >
        &larr;
      </button>
      <div>Page {page}</div>
      <button className="page-button" onClick={() => setPage(page + 1)}>
        &rarr;
      </button>
    </div>
  );
};

export default PageNavigation;
