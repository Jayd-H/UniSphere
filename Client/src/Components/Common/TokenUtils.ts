import { JwtPayload, InvalidTokenError, jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp < currentTime : false;
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      console.error('Invalid token specified:', error.message);
    } else {
      console.error('Error decoding token:', error);
    }
    return true;
  }
};