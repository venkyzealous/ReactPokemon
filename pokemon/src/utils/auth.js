// src/utils/auth.js

export const login = async (username, password) => {
  // In a real app, you would make a network request to your backend API
  // For this simulation, we'll just check for hardcoded credentials
  if (username === 'user' && password === 'password') {
    // This is a fake JWT. In a real application, the server would generate
    // this token and send it back to the client.
    const fakeJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    // Store the token in localStorage
    localStorage.setItem('authToken', fakeJwt);
    return { success: true, token: fakeJwt };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
};

export const logout = () => {
  // Remove the token from localStorage
  localStorage.removeItem('authToken');
};

export const isAuthenticated = () => {
  // Check if the auth token exists in localStorage
  const token = localStorage.getItem('authToken');
  return !!token; // Returns true if token exists, false otherwise
};