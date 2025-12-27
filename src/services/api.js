//import axios from "axios";

import { 
  fetchMockTransactions, 
  postMockTransaction,
  editMockTransaction,
  deleteMockTransaction  
} from './mockTransactions.js';

const handleApiError = (error) => {
  // Для моков просто выводим ошибку, но не прерываем выполнение
  //console.warn("Моковая ошибка API (игнорируется):", error.message);
  throw error; // Или вернуть моковые данные вместо ошибки
};

// Получение всех транзакций
export async function fetchTransactions({ token }) {
  //console.log('📊 Запрос транзакций с токеном:', token?.substring(0, 20) + '...');
  return await fetchMockTransactions();
}

// Добавление транзакции
export async function postTransaction(transactionData) {
  //console.log('➕ Добавление транзакции:', transactionData);
  return await postMockTransaction(transactionData);
}

// Редактирование транзакции
export async function editTransaction(id, transactionData) {
  //console.log('✏️ Редактирование транзакции:', id, transactionData);
  return await editMockTransaction(id, transactionData);
}

// Удаление транзакции
export async function deleteTransaction(id) {
  //console.log('🗑️ Удаление транзакции:', id);
  return await deleteMockTransaction(id);
}


export async function fetchTransactionsByPeriod({ token, start, end }) {
  //console.log("🔧 Используется МОК fetchTransactionsByPeriod:", { start, end });
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Генерация тестовых данных
  const mockTransactions = [];
  const categories = ['food', 'transport', 'housing', 'joy', 'education', 'others'];
  
  // Генерируем случайные транзакции для периода
  const startDate = new Date(start);
  const endDate = new Date(end);
  const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  
  for (let i = 0; i < Math.min(daysDiff + 1, 30); i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // 70% шанс добавить транзакцию в этот день
    if (Math.random() > 0.3) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      mockTransactions.push({
        _id: `mock_period_${Date.now()}_${i}`,
        userId: 'mock_user_id_123',
        description: `Транзакция ${i + 1}`,
        category: category,
        date: date.toISOString(),
        sum: Math.floor(Math.random() * 5000) + 100
      });
    }
  }
  
  return mockTransactions;
}

  

// API для транзакций, согласно документации API
{/* const API_URL = "https://wedev-api.sky.pro/api/transactions";

const handleApiError = (error) => {
  console.error("API Error:", error.response?.status, error.response?.data);
  
  if (error.response?.status === 401) {
    throw new Error("Сессия истекла. Пожалуйста, войдите снова.");
  }
  
  if (error.response?.status === 400) {
    throw new Error(error.response?.data?.error || "Некорректные данные");
  }
  
  if (error.response?.status === 404) {
    throw new Error("Ресурс не найден");
  }
  
  if (error.response?.status === 500) {
    throw new Error("Ошибка сервера. Попробуйте позже.");
  }
  
  if (!error.response) {
    throw new Error("Нет соединения с сервером. Проверьте интернет-соединение.");
  }
  
  throw new Error(error.response?.data?.error || error.message || "Произошла ошибка");
};


export async function fetchTransactions({ token }) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function postTransaction({ token, transaction }) {
  try {
    const response = await axios.post(API_URL, transaction, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);    
  }
}


export async function getTransaction({ token, id }) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function editTransaction({ token, id, transaction }) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, transaction, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });
    return response.data.transactions;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteTransaction({ token, id }) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });
    return response.data.transactions;
  } catch (error) {
    handleApiError(error);
  }
}
  
export async function fetchTransactionsByPeriod({ token, start, end }) {
  try {
    console.log("Запрос транзакций за период:", { start, end });
    
    const response = await axios.post(
      `${API_URL}/period`,
      { start, end },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки транзакций по периоду:", error);
    handleApiError(error);
  }
} */}
