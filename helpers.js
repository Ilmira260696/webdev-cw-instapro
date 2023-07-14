// сохранить пользователя в локальном хранилище
export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

//получить пользователя из локального хранилища
export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}
//удалить пользователя из локального хранилища
export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}
