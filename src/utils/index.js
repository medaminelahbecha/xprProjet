export const login = (info,id) => {
  localStorage.setItem("jwt", info);
  localStorage.setItem("_id", id);
};

export const logout = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("iduseradmin");
};

export const isLogin = () => {
  if (localStorage.getItem("jwt") && localStorage.getItem("_id") || localStorage.getItem("iduseradmin")) return true;
  else return false;
};
<<<<<<< HEAD
export const decodetoken =  () => {
=======
export const decodetoken = () => {
>>>>>>> 48607a93e216d91e5a1b4ba1f8ff63054de35698
  let token = localStorage.getItem("jwt")
  if (token) {
  const jwtData = token.split('.')[1]
  const decodedJwtJsonData = window.atob(jwtData)
return JSON.parse(decodedJwtJsonData)
  }
  else if(localStorage.getItem('iduseradmin') !== null && localStorage.getItem('iduseradmin') !== undefined ) {
    
    return  {'role' : 'admin'}


  }
  else
  return null
}