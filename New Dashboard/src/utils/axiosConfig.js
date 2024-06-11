const getTokenFromLocalStorage = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
