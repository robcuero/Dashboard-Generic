

export function auth() {
  return sessionStorage.getItem('token')  ? true : false; 
}