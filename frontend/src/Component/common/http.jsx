export const apiurl = "http://localhost:8000/api/";
export const imageUrl = "http://localhost:8000/";
export const token = () => {
  const userInfo = localStorage.getItem("userInfo");
  const data = JSON.parse(userInfo);
  return data.token;
};
