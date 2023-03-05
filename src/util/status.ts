export function statusUser(fechaFin) {
  var today = new Date();
  return  (new Date(fechaFin).getTime() - today.getTime()) / (1000 * 60 * 60 * 24) > 0;
}
