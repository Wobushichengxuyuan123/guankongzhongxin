export const getSuddenInfo = () => {
  let s = window.sessionStorage.getItem('suddenEventInfo')
  let res = s&&JSON.parse(s);
  return res
}