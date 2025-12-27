// Ключ для хранения транзакций в localStorage
const STORAGE_KEY = "mock_transactions_data";

// Функция для сброса моковых данных (для отладки)
export const resetMockTransactions = () => {
  localStorage.removeItem(STORAGE_KEY);
  //console.log("🧹 Моковые транзакции сброшены");
};

// Вспомогательная функция для парсинга дат разных форматов
const parseDate = (dateStr) => {
  if (!dateStr) return new Date();

  try {
    // Формат из API: "MM-DD-YYYY" (например, "7-8-2024")
    if (dateStr.includes("-")) {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const month = parseInt(parts[0]) - 1; // месяцы 0-indexed в JS
        const day = parseInt(parts[1]);
        const year = parseInt(parts[2]);

        // Проверяем валидность даты
        if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
          const date = new Date(year, month, day);
          if (!isNaN(date.getTime())) {
            return date;
          }
        }
      }
    }

    // Пробуем стандартный парсинг (ISO или другие форматы)
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date;
    }

    // Если ничего не сработало, возвращаем текущую дату
    //console.warn("⚠️ Не удалось распарсить дату:", dateStr);
    return new Date();
  } catch (error) {
    //console.error("❌ Ошибка парсинга даты:", dateStr, error);
    return new Date();
  }
};

// Функция для получения транзакций из localStorage или инициализации новых
const getOrInitializeTransactions = () => {
  try {
    // Пытаемся получить из localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      //console.log("📂 Загружаю транзакции из localStorage");
      return JSON.parse(saved);
    }
  } catch (error) {
    //console.warn("⚠️ Ошибка при чтении из localStorage:", error);
  }

  // Если нет сохраненных данных, создаем новые
  //console.log("🔄 Инициализирую новые моковые транзакции...");
  const categories = [
    "food",
    "transport",
    "housing",
    "joy",
    "education",
    "others",
  ];
  const descriptions = [
    "Покупка продуктов",
    "Такси",
    "Оплата квартиры",
    "Поход в кино",
    "Курсы программирования",
    "Прочие расходы",
    "Кафе",
    "Бензин",
    "Интернет",
    "Подарок",
    "Книги",
  ];

  const transactions = [];
  const now = Date.now();
  // Создаем транзакции за последние 30 дней
  for (let i = 0; i < 15; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const date = new Date(now - Math.random() * 30 * 24 * 60 * 60 * 1000);

    transactions.push({
      _id: `mock_transaction_initial_${now}_${i}`,
      userId: "mock_user_id_123",
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      category: category,
      date: date.toISOString(),
      sum: Math.floor(Math.random() * 10000) + 100,
    });
  }

  // Сохраняем в localStorage
  saveTransactions(transactions);
  return transactions;
};

// Функция для сохранения транзакций в localStorage
const saveTransactions = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    //console.log("💾 Сохранено транзакций в localStorage:", transactions.length);
  } catch (error) {
    //console.warn("⚠️ Ошибка при сохранении в localStorage:", error);
  }
};

export const fetchMockTransactions = async () => {
  //console.log("🔧 Используется МОК fetchTransactions");
  await new Promise((resolve) => setTimeout(resolve, 300));

  const transactions = getOrInitializeTransactions();
  return {
    transactions: [...transactions],
    message: "Тестовые данные",
  };
};

export const postMockTransaction = async (transactionData) => {
  //console.log("🔧 Используется МОК postTransaction:", transactionData);
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (transactionData && transactionData.description) {
    // Получаем текущие транзакции
    const transactions = getOrInitializeTransactions();

    // Добавляем новую транзакцию
    const newTransaction = {
      _id: `mock_transaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: "mock_user_id_123",
      description: transactionData.description,
      sum: transactionData.sum || 0,
      category: transactionData.category || "others",
      date: transactionData.date
        ? new Date(transactionData.date).toISOString()
        : new Date().toISOString(),
    };

    // Добавляем в начало списка
    transactions.unshift(newTransaction);

    // Сохраняем обновленный список
    saveTransactions(transactions);

    //console.log("✅ Добавлена новая транзакция. Всего:", transactions.length);

    // Всегда возвращаем актуальные данные
    const currentTransactions = getOrInitializeTransactions();
    return {
      transactions: [...currentTransactions],
      message: "Тестовые данные",
    };
  } else {
    //console.warn("⚠️ Неполные данные транзакции:", transactionData);

    // Даже при ошибке возвращаем текущие транзакции
    const currentTransactions = getOrInitializeTransactions();
    return {
      transactions: [...currentTransactions],
      message: "Ошибка: неполные данные",
    };
  }
};

export const deleteMockTransaction = async (id) => {
  //console.log("🗑️ Удаление транзакции с ID:", id);
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Получаем текущие транзакции
  const transactions = getOrInitializeTransactions();

  const initialLength = transactions.length;
  const updatedTransactions = transactions.filter((t) => t._id !== id);

  if (updatedTransactions.length < initialLength) {
    // Сохраняем обновленный список
    saveTransactions(updatedTransactions);
    //console.log(`✅ Транзакция ${id} удалена. Осталось: ${updatedTransactions.length}`);
  } else {
    //console.log(`⚠️ Транзакция ${id} не найдена`);
  }

  return {
    transactions: [...updatedTransactions],
    message: "Тестовые данные",
  };
};

export const editMockTransaction = async (id, updatedData) => {
  //console.log("🔧 Используется МОК editTransaction:", id, updatedData);
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Получаем текущие транзакции
  const transactions = getOrInitializeTransactions();

  // Находим индекс транзакции для редактирования
  const index = transactions.findIndex((t) => t._id === id);

  if (index !== -1 && updatedData) {
    // Обновляем транзакцию
    transactions[index] = {
      ...transactions[index],
      ...updatedData,
      _id: id,
      userId: transactions[index].userId,
    };

    // Сохраняем обновленный список
    saveTransactions(transactions);

    //console.log(`✅ Транзакция ${id} обновлена`);
  } else {
    //console.warn(`⚠️ Транзакция ${id} не найдена или нет данных для обновления`);
  }

  return {
    transactions: [...transactions],
    message: "Тестовые данные",
  };
};

export const mockFetchTransactionsByPeriod = async (start, end) => {
  //console.log(`📅 Моковая загрузка транзакций за период: ${start} - ${end}`);

  await new Promise((resolve) => setTimeout(resolve, 300));

  // Получаем все транзакции
  const allTransactions = getOrInitializeTransactions();

  // Парсим даты периода
  const startDate = parseDate(start);
  const endDate = parseDate(end);

  // Фильтруем по дате
  const filtered = allTransactions.filter((transaction) => {
    if (!transaction.date) return false;

    try {
      const transactionDate = parseDate(transaction.date);

      // Устанавливаем время на начало и конец дня для корректного сравнения
      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);

      const transDate = new Date(transactionDate);

      return transDate >= startOfDay && transDate <= endOfDay;
    } catch (error) {
      //console.error("❌ Ошибка при фильтрации транзакции:", transaction, error);
      return false;
    }
  });

  //console.log(`✅ Найдено ${filtered.length} транзакций за период ${start} - ${end}`);

  // Сортируем по дате (новые сверху)
  const sorted = [...filtered].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB - dateA; // новые сверху
  });

  return sorted;
};

// ========== Дополнительные вспомогательные функции ==========

// Получение транзакций по категории
export const getMockTransactionsByCategory = async (category) => {
  //console.log(`🔍 Моковая фильтрация по категории: ${category}`);
  await new Promise((resolve) => setTimeout(resolve, 200));

  const allTransactions = getOrInitializeTransactions();
  const filtered = allTransactions.filter((t) => t.category === category);

  //console.log(`✅ Найдено ${filtered.length} транзакций категории "${category}"`);
  return filtered;
};

// Получение статистики по категориям
export const getMockCategoryStats = async () => {
  //console.log("📊 Моковая статистика по категориям");
  await new Promise((resolve) => setTimeout(resolve, 200));

  const allTransactions = getOrInitializeTransactions();
  const stats = {};

  allTransactions.forEach((transaction) => {
    const category = transaction.category || "other";
    const amount = parseFloat(transaction.sum) || 0;
    stats[category] = (stats[category] || 0) + amount;
  });

  return Object.entries(stats).map(([category, total]) => ({
    category,
    total,
    count: allTransactions.filter((t) => t.category === category).length,
  }));
};

// Создание тестовых транзакций для определенного периода (для демонстрации)
export const createTestTransactionsForPeriod = (start, end, count = 10) => {
  //console.log(`🧪 Создание ${count} тестовых транзакций для периода: ${start} - ${end}`);

  const startDate = parseDate(start);
  const endDate = parseDate(end);
  const timeDiff = endDate - startDate;

  const categories = [
    "food",
    "transport",
    "housing",
    "joy",
    "education",
    "others",
  ];
  const descriptions = [
    "Продукты",
    "Такси",
    "Аренда",
    "Кино",
    "Курсы",
    "Подарок",
    "Кафе",
    "Бензин",
    "Интернет",
    "Книги",
  ];

  const testTransactions = [];

  for (let i = 0; i < count; i++) {
    // Случайная дата в пределах периода
    const randomTime = startDate.getTime() + Math.random() * timeDiff;
    const date = new Date(randomTime);

    const category = categories[Math.floor(Math.random() * categories.length)];

    testTransactions.push({
      _id: `test_${Date.now()}_${i}`,
      userId: "test_user",
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      category: category,
      date: date.toISOString(),
      sum: Math.floor(Math.random() * 5000) + 100,
    });
  }

  // Добавляем к существующим транзакциям
  const existingTransactions = getOrInitializeTransactions();
  const updatedTransactions = [...testTransactions, ...existingTransactions];
  saveTransactions(updatedTransactions);

  //console.log(`✅ Добавлено ${count} тестовых транзакций`);
  return testTransactions;
};
