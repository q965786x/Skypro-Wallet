import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/user";

// МОКОВЫЕ ФУНКЦИИ (временные)
export async function signIn(userData) {
  //console.log("🔧 Используется МОК signIn с данными:", userData);
  await new Promise(resolve => setTimeout(resolve, 600));
  return {
    user: {
      id: 'mock_user_id_123',
      name: 'Тестовый Пользователь',
      email: userData.email,
      login: 'testuser'
    },
    token: 'mock_jwt_token_skypro_' + Date.now()
  };
}

export async function signUp(userData) {
  //console.log("🔧 Используется МОК signUp с данными:", userData);
  await new Promise(resolve => setTimeout(resolve, 800));
  const login = userData.email.split('@')[0];
  return {
    user: {
      id: 'mock_new_user_id_' + Date.now(),
      name: userData.name,
      email: userData.email,
      login: login
    },
    token: 'mock_jwt_token_new_user_' + Date.now()
  };
}



// Функции для работы с реальным API
{/* export async function signIn(userData) {
  try {
    console.log("signIn получил:", userData);
    
    // Формируем строку в формате email=...&password=...
    const formDataString = `email=${userData.email}&password=${userData.password}`;
    
    console.log("Отправляю как form-urlencoded:", formDataString);

    const response = await axios.post(
      `${API_URL}/login`,
      formDataString,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.user || response.data;
  } catch (error) {
    console.error("Ошибка входа:", error.response?.data);
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Неверный логин или пароль";
    throw new Error(errorMessage);
  }
}


export async function signUp(userData) {
  try {
    console.log("signUp получил:", userData);
    
    // Формируем строку в формате name=...&email=...&password=...
    const formDataString = `name=${userData.name}&email=${userData.email}&password=${userData.password}`;
    
    console.log("Отправляю как form-urlencoded:", formDataString);

    const response = await axios.post(
      API_URL,
      formDataString,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.user || response.data;
  } catch (error) {
    console.error("Ошибка регистрации:", error.response?.data);
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Ошибка при регистрации";
    throw new Error(errorMessage);
  }
} */}

