
const getTokenFromLocalStorage = localStorage.getItem("token") || "";

export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage}`,
    Accept: "application/json",
  },
};
