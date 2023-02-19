import shortid from "shortid"

function Table({
  headers = [],
  data = [],
  range = [],
  page,
  handlePagination,
  handleDelete,
}) {
  return (
    <>
      <table className="w-full border-collapse border-none">
        <thead className="bg-transparent radius-xl">
          <tr>
            {headers.map((header) => {
              return (
                <th
                  key={shortid.generate()}
                  className="p-3 text-start text-base capitalize bg-slate-500"
                >
                  {header}
                </th>
              )
            })}
            <th
              key={shortid.generate()}
              className="p-3 text-start text-base capitalize bg-slate-500"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={shortid.generate()} className="cursor-auto">
                {headers.map((key) => {
                  const keys = key.split(".")
                  if (keys.length > 1) {
                    if (item[keys[0]]) {
                      return (
                        <td
                          key={shortid.generate()}
                          className="p-3 text-sm text-black"
                        >
                          {item[keys[0]][keys[1]]}
                        </td>
                      )
                    }
                    return (
                      <td
                        key={shortid.generate()}
                        className="p-3 text-sm text-black"
                      >
                        Null
                      </td>
                    )
                  }
                  return (
                    <td
                      key={shortid.generate()}
                      className="p-3 text-sm text-black"
                    >
                      {item[key] ? item[key] : "Null"}
                    </td>
                  )
                })}
                <td key={shortid.generate()} className="p-3 text-sm text-black">
                  <div className="flex gap-4">
                    <button className="h-[40px] w-[80px] text-white bg-sky-600 rounded-xl">
                      Update
                    </button>
                    <button
                      className="h-[40px] w-[80px] text-white bg-red-600 rounded-xl"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="w-full py-3 flex justify-flex items-flex bg-slate-500 font-base text-start">
        {range.map((num) => {
          return (
            <button
              key={shortid.generate()}
              className={`mx-2 py-3 px-4 border-none cursor-pointer ${
                num == page ? "bg-sky-500" : "bg-white"
              }`}
              onClick={() => handlePagination(num)}
            >
              {num}
            </button>
          )
        })}
      </div>
    </>
  )
}

export default Table
