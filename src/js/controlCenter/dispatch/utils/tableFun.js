export const filterNotPerson = (array=[]) => {
  return array.filter(v => {
    return v.props.personLeaf
  })
}
export const createTableDataSource = (dataArray=[]) => {
  let checkPersonList = filterNotPerson(dataArray)
  let treeTableDataSource = []
  checkPersonList.some(v => {
    treeTableDataSource.push({key: v.key,...v.props})
    return false
  })
  return treeTableDataSource
}