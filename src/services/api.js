import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/transactions";

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
    throw new Error(
      "Нет соединения с сервером. Проверьте интернет-соединение."
    );
  }

  throw new Error(
    error.response?.data?.error || error.message || "Произошла ошибка"
  );
};

// Получение всех транзакций
export async function fetchTransactions({ token, signal }) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal, // Добавляем поддержку AbortSignal
    });
    return response.data;
  } catch (error) {
    // Проверяем различные способы определения отмены
    const isCanceled = 
      error.name === 'CanceledError' || 
      error.name === 'AbortError' || 
      error.code === 'ERR_CANCELED' ||
      error.message === 'canceled' ||
      axios.isCancel(error) ||
      (signal && signal.aborted);

    if (isCanceled) {
      console.log("Запрос отменен");
      // Создаем специальную ошибку отмены
      const cancelError = new Error("Запрос отменен");
      cancelError.name = "CanceledError";
      cancelError.isCanceled = true;
      throw cancelError;
    }
    handleApiError(error);
  }
}

// Получение транзакций с фильтрацией и сортировкой
export async function fetchTransactionsFiltered({ token, sortBy, filterBy }) {
  try {
    const params = new URLSearchParams();
    if (sortBy) params.append("sortBy", sortBy);
    if (filterBy) params.append("filterBy", filterBy);

    const url = `${API_URL}${params.toString() ? `?${params.toString()}` : ""}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Добавление транзакции
export async function postTransaction({ token, transaction }) {
  try {
    console.log("Отправляю транзакцию на API:", {
      transaction,
      tokenLength: token?.length,
    });

    const response = await axios.post(API_URL, transaction, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });

    console.log("Ответ от API (добавление транзакции):", {
      status: response.status,
      data: response.data,
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка добавления транзакции:", error);
    handleApiError(error);
  }
}

// Редактирование транзакции
export async function editTransaction({ token, id, transaction }) {
  try {
    // Форматируем дату для API
    const formattedTransaction = {
      ...transaction,
      date: formatDateForAPI(transaction.date),
    };

    const response = await axios.patch(
      `${API_URL}/${id}`,
      formattedTransaction,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Удаление транзакции
export async function deleteTransaction({ token, id }) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Получение транзакций за период
export async function fetchTransactionsByPeriod({ token, start, end }) {
  try {
    const response = await axios.post(
      `${API_URL}/period`,
      { start, end },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Вспомогательная функция для форматирования даты
function formatDateForAPI(dateStr) {
  if (!dateStr) return new Date().toLocaleDateString("en-US");

  try {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1; // месяцы 1-12
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  } catch (error) {
    console.error("Ошибка форматирования даты:", dateStr, error);
    return new Date().toLocaleDateString("en-US");
  }
}
