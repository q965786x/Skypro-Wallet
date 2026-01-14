import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/user";

export async function signIn(userData) {
  try {
    console.log("signIn получил:", userData);

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
      }
    );

    console.log("✅ Ответ от сервера (signIn):", {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });

    // Проверяем структуру ответа
    if (response.data.token) {
      console.log("✅ Токен получен:", response.data.token.substring(0, 20) + "...");
      return {
        user: response.data.user,
        token: response.data.token,
      };
    } else if (response.data.user?.token) {
      console.log("✅ Токен внутри user:", response.data.user.token.substring(0, 20) + "...");
      // Если токен внутри user объекта
      return {
        user: response.data.user,
        token: response.data.user.token,
      };
    } else {
      console.error("❌ Неожиданная структура ответа:", response.data);
      throw new Error("Токен не получен от сервера");
    }
  } catch (error) {
    console.error("❌ Ошибка входа:", {
      message: error.message,
      response: error.response,
      status: error.response?.status,
      data: error.response?.data
    });

    // ВАЖНО: При ошибке входа НЕ возвращаем объект с null
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Неверный логин или пароль";

    // Выбрасываем ошибку, чтобы AuthForm.jsx мог её обработать
    throw new Error(errorMessage);
  }
}

export async function signUp(userData) {
  try {
    console.log("signUp получил:", userData);

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
      }
    );

    console.log("Полный ответ от сервера (signUp):", response.data);

    // Проверяем разные варианты структуры ответа
    if (response.data.token) {
      // Вариант 1: токен в корне ответа
      return {
        user: response.data.user,
        token: response.data.token,
      };
    } else if (response.data.user?.token) {
      // Вариант 2: токен внутри user
      return {
        user: response.data.user,
        token: response.data.user.token,
      };
    } else if (response.data.user) {
      // Вариант 3: только user, токен нужно сгенерировать
      console.log("Токен не получен от сервера, генерирую временный");
      return {
        user: response.data.user,
        token: `temp_token_${Date.now()}_${response.data.user.id || "new_user"}`,
      };
    } else {
      throw new Error("Некорректный ответ от сервера");
    }
  } catch (error) {
    console.error("Ошибка регистрации:", error.response?.data);
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Ошибка при регистрации";
    throw new Error(errorMessage);
  }
}
