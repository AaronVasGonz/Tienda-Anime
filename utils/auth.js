// auth.js

export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return token;
  }
  return null;
};

export const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user;
    return null;
  }
};
export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};

