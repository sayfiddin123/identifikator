
const API_URL = "https://onlyauth.pythonanywhere.com"; 

export const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error('Login failed!');
    }

    const data = await response.json();

    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    return data; 
};

export const register = async ({
    username,
    password,
    email,
    first_name, 
    last_name
}: {
    username: string;
    password: string;
    email: string;
    first_name: string; 
    last_name: string;
}) => {
    const response = await fetch(`${API_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, first_name, last_name, email })
    });

    if (!response.ok) {
        throw new Error('Registration failed!');
    }

    return await response.json(); 
};

