const calculateRange = (total, rowsPerPage) => {
  const range = []
  const num = Math.ceil(total / rowsPerPage)
  let i = 1
  for (let i = 1; i <= num; i++) {
    range.push(i)
  }
  return range
}

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
}

export {
    calculateRange,
    sliceData
}
