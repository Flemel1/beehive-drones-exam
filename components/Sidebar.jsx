function Sidebar({ currentPage, onPageChange }) {
  return (
    <div className="w-[20%] fixed inset-0 bg-sky-500">
      <div className="p-4 font-bold">
        <div
          className={`cursor-pointer ${currentPage == 0 && "text-white"}`}
          onClick={() => onPageChange(0)}
        >
          Positions
        </div>
        <div
          className={`cursor-pointer ${currentPage == 1 && "text-white"}`}
          onClick={() => onPageChange(1)}
        >
          Employees
        </div>
        <div
          className={`cursor-pointer ${currentPage == 2 && "text-white"}`}
          onClick={() => onPageChange(2)}
        >
          Salaries
        </div>
      </div>
    </div>
  )
}

export default Sidebar
