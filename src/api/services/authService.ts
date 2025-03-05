import { API_URL } from "../config/apiConfig"

export const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) throw new Error('Server is busy');
  
      const data = await response.json();
  
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };
  