export function formatdate(userDate) {
  var omar = new Date(userDate);
  let y = omar.getFullYear().toString();
  let m =
    (omar.getMonth() + 1).toString().length === 1
      ? `0${(omar.getMonth() + 1).toString()}`
      : (omar.getMonth() + 1).toString();
  let d =
    omar.getDate().toString().length === 1
      ? `0${omar.getDate().toString()}`
      : omar.getDate().toString();
  let result = y + '-' + m + '-' + d;
  return result;
}
