import jwtDecode from 'jwt-decode';
import axios from './axios';

const PATH_AUTH = '/login';

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded: { exp: number } = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp: number) => {
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    localStorage.removeItem('accessToken');

    window.location.href = PATH_AUTH;
  }, timeLeft);
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp }: { exp: number } = jwtDecode(accessToken); // ~5 days by minimals server
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
