export const isValidUrl = url => {
  let pattern =
    '^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$'
  let regexQuery = new RegExp(pattern, 'i')
  return regexQuery.test(url) ? true : false
}
