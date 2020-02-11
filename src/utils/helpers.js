export const CHAT_APP_LOGGEDIN = "CHAT_APP_LOGGEDIN";

export const renderLogin = () => {
  const flag = !!localStorage.getItem(CHAT_APP_LOGGEDIN);
  console.log('flag', flag);
  return flag;
}