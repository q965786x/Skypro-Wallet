import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { useAuth } from "../../context/AuthContext";
import { TransactionsContext } from "../../context/TransactionContext";
import {
  SAnalysisContainer,
  SAnalysisTitle,
  SAnalysisContent,
  SAnalysisLeft,
  SAnalysisRight,
  SPeriodSection,
  SPeriodTitle,
  SCalendarContainer,
  SCalendarWrapper,
  SMonthHeader,
  SWeekdays,
  SWeekday,
  SCalendarContent,
  SDaysContainer,
  SDays,
  SDay,
  SDayNumber,
  SDayEmpty,
  SDiagramSection,
  STotalContainer,
  STotalAmount,
  STotalPeriod,
  SChartsContainer,
  SChartWrapper,
  SChartAmount,
  SChartDiagram,
  SChartColumn,
  SChartCategory,
} from "./Cost.styled.js";

const Cost = () => {
  const { token } = useAuth();
  const {
    transactions: allTransactions = [],
    isLoading,
    refetchTransactions,
  } = useContext(TransactionsContext);

  // Состояние для выбранного дня (по умолчанию сегодня)
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [isWeeklyView, setIsWeeklyView] = useState(true);

  // Состояния для календаря
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [transactions, setTransactions] = useState([]);
  const calendarContentRef = useRef(null);

  //console.log("📊 Cost.jsx - Всего транзакций:", allTransactions?.length);
  //console.log("🔍 Cost.jsx - allTransactions:", allTransactions);

  const weekdays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const parseTransactionDate = (dateStr) => {
    if (!dateStr) return new Date();

    try {
      // 1. Пробуем формат из API (MM-DD-YYYY)
      if (dateStr.includes("-")) {
        const [month, day, year] = dateStr.split("-").map(Number);
        if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
          return new Date(year, month - 1, day);
        }
      }

      // 2. Пробуем стандартный парсинг
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date;
      }

      return new Date();
    } catch (error) {
      //console.error("Ошибка парсинга даты:", dateStr, error);
      return new Date();
    }
  };

  // Функция для расчета данных по категориям
  const calculateCategoryData = useCallback((transactionsForPeriod) => {
    const categoryMap = {
      food: "Еда",
      transport: "Транспорт",
      housing: "Жилье",
      joy: "Развлечения",
      education: "Образование",
      others: "Другое",
    };

    const colors = {
      Еда: "#D9B6FF",
      Транспорт: "#FFB53D",
      Жилье: "#6EE4FE",
      Развлечения: "#B0AEFF",
      Образование: "#BCEC30",
      Другое: "#FFB9B8",
    };

    // Считаем сумму по категориям
    const categorySums = {};

    transactionsForPeriod.forEach((transaction) => {
      // Получаем русское название категории
      const russianCategory = categoryMap[transaction.category] || "Другое";
      categorySums[russianCategory] =
        (categorySums[russianCategory] || 0) + transaction.sum;
    });

    // Преобразуем в массив для отображения
    // ВАЖНО: возвращаем ВСЕ категории, даже если сумма 0
    return Object.keys(categoryMap).map((key) => {
      const categoryName = categoryMap[key];
      return {
        name: categoryName,
        amount: categorySums[categoryName] || 0,
        color: colors[categoryName],
      };
    });
  }, []);

  // Функция для получения суммы расходов за день
  const getExpenseForDay = useCallback(
    (year, month, day) => {
      if (!allTransactions || allTransactions.length === 0) return 0;

      const targetDate = new Date(year, month, day);

      return allTransactions
        .filter((transaction) => {
          if (!transaction.date) return false;
          const transactionDate = parseTransactionDate(transaction.date);

          return (
            transactionDate.getDate() === day &&
            transactionDate.getMonth() === month &&
            transactionDate.getFullYear() === year
          );
        })
        .reduce(
          (sum, transaction) => sum + (parseFloat(transaction.sum) || 0),
          0
        );
    },
    [allTransactions]
  );

  // Функция для фильтрации транзакций по периоду
  const filterTransactionsByPeriod = useCallback(
    (startDate, endDate) => {
      if (!allTransactions || allTransactions.length === 0) return [];

      return allTransactions.filter((transaction) => {
        if (!transaction.date) return false;

        const transactionDate = parseTransactionDate(transaction.date);
        const start = new Date(startDate);
        const end = new Date(endDate);

        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        return transactionDate >= start && transactionDate <= end;
      });
    },
    [allTransactions]
  );

  // Обновляем транзакции при изменении выбранного дня или режима просмотра
  useEffect(() => {
    if (!allTransactions || allTransactions.length === 0) {
      setTransactions([]);
      return;
    }

    let startDate, endDate;

    if (isWeeklyView) {
      const { monday, sunday } = getWeekRange(selectedDay);
      startDate = monday;
      endDate = sunday;
    } else {
      startDate = new Date(selectedDay);
      endDate = new Date(selectedDay);
      endDate.setHours(23, 59, 59, 999);
    }

    const filteredTransactions = filterTransactionsByPeriod(startDate, endDate);
    setTransactions(filteredTransactions);

    //console.log(`📊 Отфильтровано ${filteredTransactions.length} транзакций за период`);
  }, [selectedDay, isWeeklyView, allTransactions, filterTransactionsByPeriod]);

  // Генерация дней месяца
  const generateMonthDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Преобразуем воскресенье (0) в 6, понедельник (1) в 0
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];

    // Пустые ячейки в начале месяца
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Функция для получения недели по выбранной дате
  const getWeekRange = (date) => {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();

    const monday = new Date(currentDate);
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    monday.setDate(currentDate.getDate() + diff);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { monday, sunday };
  };

  const isDaySelected = (year, month, day) => {
    const dayDate = new Date(year, month, day);

    if (isWeeklyView) {
      // Режим недели: выделяем все дни недели
      const { monday, sunday } = getWeekRange(selectedDay);
      return dayDate >= monday && dayDate <= sunday;
    } else {
      // Режим дня: выделяем только конкретный день
      return (
        year === selectedDay.getFullYear() &&
        month === selectedDay.getMonth() &&
        day === selectedDay.getDate()
      );
    }
  };

  // Форматирование заголовка периода
  const getPeriodTitle = () => {
    if (isWeeklyView) {
      const { monday, sunday } = getWeekRange(selectedDay);
      const mondayStr = monday.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      });
      const sundayStr = sunday.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return `Расходы за ${mondayStr} — ${sundayStr}`;
    } else {
      const dayStr = selectedDay.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return `Расходы за ${dayStr}`;
    }
  };

  // Обработчик клика по дню
  const handleDayClick = (day, month, year) => {
    if (day) {
      const newDate = new Date(year, month, day);
      setSelectedDay(newDate);
      setIsWeeklyView(false);
    }
  };

  // Переключение месяцев
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Расчет данных для отображения
  const categories = calculateCategoryData(transactions);
  const totalAmount = categories.reduce(
    (sum, category) => sum + category.amount,
    0
  );
  const maxAmount = Math.max(...categories.map((c) => c.amount), 1);

  if (isLoading) {
    return (
      <div className="page">
        <SAnalysisContainer>
          <SAnalysisTitle>Анализ расходов</SAnalysisTitle>
          <div style={{ textAlign: "center", padding: "40px" }}>
            Загрузка данных...
          </div>
        </SAnalysisContainer>
      </div>
    );
  }

  // Генерация данных для текущего и следующего месяца
  const currentMonthDays = generateMonthDays(currentYear, currentMonth);

  let nextMonth = currentMonth + 1;
  let nextYear = currentYear;
  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear = currentYear + 1;
  }
  const nextMonthDays = generateMonthDays(nextYear, nextMonth);

  return (
    <div className="page">
      <SAnalysisContainer>
        <SAnalysisTitle>Анализ расходов</SAnalysisTitle>

        {/* Кнопки управления */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          {/* Кнопки переключения вида */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setIsWeeklyView(false)}
              style={{
                padding: "8px 16px",
                background: !isWeeklyView ? "#7334ea" : "#f4f5f6",
                color: !isWeeklyView ? "white" : "#666",
                border: "1px solid #e5e5e7",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              За день
            </button>
            <button
              onClick={() => setIsWeeklyView(true)}
              style={{
                padding: "8px 16px",
                background: isWeeklyView ? "#7334ea" : "#f4f5f6",
                color: isWeeklyView ? "white" : "#666",
                border: "1px solid #e5e5e7",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              За неделю
            </button>
          </div>

          <button
            onClick={() => refetchTransactions()}
            style={{
              padding: "8px 16px",
              background: "#7334ea",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Обновить данные
          </button>
        </div>

        <SAnalysisContent>
          {/* Левая часть с календарем */}
          <SAnalysisLeft>
            <SPeriodSection>
              <SPeriodTitle>Период</SPeriodTitle>

              {/* Кнопки навигации по месяцам */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <button
                  onClick={handlePrevMonth}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#7334ea",
                    padding: "4px 8px",
                  }}
                >
                  ‹
                </button>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#000000",
                  }}
                >
                  {monthNames[currentMonth]} {currentYear}
                </div>
                <button
                  onClick={handleNextMonth}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#7334ea",
                    padding: "4px 8px",
                  }}
                >
                  ›
                </button>
              </div>

              <SCalendarContainer>
                {/* Заголовки дней недели - фиксированные */}
                <SWeekdays>
                  {weekdays.map((day) => (
                    <SWeekday key={day}>{day}</SWeekday>
                  ))}
                </SWeekdays>

                <SCalendarContent ref={calendarContentRef}>
                  {/* Текущий месяц */}
                  <SCalendarWrapper>
                    <SDaysContainer>
                      <SDays>
                        {currentMonthDays.map((day, index) => {
                          if (day === null) {
                            return <SDayEmpty key={`empty-${index}`} />;
                          }

                          const isSelected = isDaySelected(
                            currentYear,
                            currentMonth,
                            day
                          );

                          return (
                            <SDay
                              key={`${currentYear}-${currentMonth}-${day}`}
                              $selected={isSelected} // ТОЛЬКО isSelected, убрать $active
                              onClick={() =>
                                handleDayClick(day, currentMonth, currentYear)
                              }
                              title={`${day}.${currentMonth + 1}.${currentYear}`}
                            >
                              <SDayNumber $selected={isSelected}>
                                {day}
                              </SDayNumber>
                            </SDay>
                          );
                        })}
                      </SDays>
                    </SDaysContainer>
                  </SCalendarWrapper>

                  {/* Разделитель между месяцами */}
                  <div
                    style={{
                      textAlign: "center",
                      padding: "8px 0",
                      color: "#999",
                      fontSize: "12px",
                    }}
                  >
                    ──────────
                  </div>

                  {/* Следующий месяц */}
                  <SCalendarWrapper>
                    <SMonthHeader
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#666",
                        marginBottom: "8px",
                      }}
                    >
                      {monthNames[nextMonth]} {nextYear}
                    </SMonthHeader>
                    <SDaysContainer>
                      <SDays>
                        {nextMonthDays.map((day, index) => {
                          if (day === null) {
                            return <SDayEmpty key={`next-empty-${index}`} />;
                          }

                          const isSelected = isDaySelected(
                            nextYear,
                            nextMonth,
                            day
                          );

                          return (
                            <SDay
                              key={`${nextYear}-${nextMonth}-${day}`}
                              $selected={isSelected} // ТОЛЬКО isSelected, убрать $active
                              onClick={() =>
                                handleDayClick(day, nextMonth, nextYear)
                              }
                              title={`${day}.${nextMonth + 1}.${nextYear}`}
                            >
                              <SDayNumber $selected={isSelected}>
                                {day}
                              </SDayNumber>
                            </SDay>
                          );
                        })}
                      </SDays>
                    </SDaysContainer>
                  </SCalendarWrapper>
                </SCalendarContent>
              </SCalendarContainer>
            </SPeriodSection>
          </SAnalysisLeft>

          {/* Правая часть с диаграммами */}
          <SAnalysisRight>
            <SDiagramSection>
              <STotalContainer>
                <STotalAmount>
                  {totalAmount > 0
                    ? totalAmount.toLocaleString("ru-RU") + " ₽"
                    : "0 ₽"}
                </STotalAmount>
                <STotalPeriod>{getPeriodTitle()}</STotalPeriod>
              </STotalContainer>

              {/* Шесть диаграмм в ряд */}
              <SChartsContainer>
                {categories.map((category) => (
                  <SChartWrapper key={category.name}>
                    <SChartAmount>
                      {category.amount > 0
                        ? category.amount.toLocaleString("ru-RU") + " ₽"
                        : "0 ₽"}
                    </SChartAmount>
                    <SChartDiagram>
                      <SChartColumn
                        $height={
                          maxAmount > 0
                            ? (category.amount / maxAmount) * 100
                            : 0
                        }
                        $color={category.color}
                      />
                    </SChartDiagram>
                    <SChartCategory>{category.name}</SChartCategory>
                  </SChartWrapper>
                ))}

                {/* Если транзакций нет, показываем сообщение */}
                {transactions.length === 0 &&
                  categories.every((c) => c.amount === 0) && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        color: "#999",
                        fontSize: "16px",
                        width: "100%",
                      }}
                    >
                      Нет расходов за выбранный период
                    </div>
                  )}
              </SChartsContainer>
            </SDiagramSection>
          </SAnalysisRight>
        </SAnalysisContent>
      </SAnalysisContainer>
    </div>
  );
};

export default Cost;
