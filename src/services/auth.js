import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/user";

export async function signIn(userData) {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        login: userData.login || userData.email,
        password: userData.password,
      },
      {
        headers: {
          "Content-Type": "",
        },
      },
    );

    if (response.data.token) {
      return {
        user: response.data.user,
        token: response.data.token,
      };
    } else if (response.data.user?.token) {
      return {
        user: response.data.user,
        token: response.data.user.token,
      };
    } else {
      throw new Error("Токен не получен от сервера");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Неверный логин или пароль";

    throw new Error(errorMessage);
  }
}

export async function signUp(userData) {
  try {
    const response = await axios.post(
      API_URL,
      {
        name: userData.name,
        login: userData.email,
        password: userData.password,
      },
      {
        headers: {
          "Content-Type": "",
        },
      },
    );

    if (response.data.token) {
      return {
        user: response.data.user,
        token: response.data.token,
      };
    } else if (response.data.user?.token) {
      return {
        user: response.data.user,
        token: response.data.user.token,
      };
    } else if (response.data.user) {
      return {
        user: response.data.user,
        token: `temp_token_${Date.now()}_${response.data.user.id || "new_user"}`,
      };
    } else {
      throw new Error("Некорректный ответ от сервера");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Ошибка при регистрации";
    throw new Error(errorMessage);
  }
} 
