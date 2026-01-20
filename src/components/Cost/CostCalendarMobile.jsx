import React, { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionsContext } from "../../context/TransactionContext";

const CostCalendarMobile = () => {
  const navigate = useNavigate();
  const { refetchTransactions } = useContext(TransactionsContext);

  const [selectedStartDay, setSelectedStartDay] = useState(null);
  const [selectedEndDay, setSelectedEndDay] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

  const generateMonthDays = useCallback((year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  }, []);

  // Проверяем, находится ли день в выбранном диапазоне
  const isDayInRange = (year, month, day) => {
    if (!selectedStartDay || !selectedEndDay) return false;

    const currentDate = new Date(year, month, day);
    const startDate = new Date(
      selectedStartDay.year,
      selectedStartDay.month,
      selectedStartDay.day,
    );
    const endDate = new Date(
      selectedEndDay.year,
      selectedEndDay.month,
      selectedEndDay.day,
    );

    return currentDate >= startDate && currentDate <= endDate;
  };

  // Проверяем, является ли день началом диапазона
  const isStartDay = (year, month, day) => {
    if (!selectedStartDay) return false;
    return (
      year === selectedStartDay.year &&
      month === selectedStartDay.month &&
      day === selectedStartDay.day
    );
  };

  // Проверяем, является ли день концом диапазона
  const isEndDay = (year, month, day) => {
    if (!selectedEndDay) return false;
    return (
      year === selectedEndDay.year &&
      month === selectedEndDay.month &&
      day === selectedEndDay.day
    );
  };

  const handleDayClick = (day, month, year) => {
    if (!day) return;

    const dateObj = { day, month, year };

    if (!isSelecting) {
      setSelectedStartDay(dateObj);
      setSelectedEndDay(dateObj);
      setIsSelecting(true);
    } else {
      setSelectedEndDay(dateObj);
      setIsSelecting(false);
    }
  };

  const handleDayMouseEnter = (day, month, year) => {
    if (!day || !isSelecting) return;

    setSelectedEndDay({ day, month, year });
  };

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

  const getWeekRange = useCallback((date) => {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() + diff);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { monday, sunday };
  }, []);

  // Функция для перехода на страницу диаграмм с выбранным периодом
  const handleSelectPeriod = () => {
    if (!selectedStartDay || !selectedEndDay) {
      alert("Пожалуйста, выберите период");
      return;
    }

    const startDate = new Date(
      selectedStartDay.year,
      selectedStartDay.month,
      selectedStartDay.day,
    );

    const endDate = new Date(
      selectedEndDay.year,
      selectedEndDay.month,
      selectedEndDay.day,
    );

    navigate("/analysis/diagrams", {
      state: {
        startDate,
        endDate,
        isRange: true,
      },
    });
  };

  // Сброс выбора
  const handleResetSelection = () => {
    setSelectedStartDay(null);
    setSelectedEndDay(null);
    setIsSelecting(false);
  };

  // Функция для возврата на страницу диаграмм
  const handleBackToDiagrams = () => {
    navigate("/analysis/diagrams");
  };

  const currentMonthDays = generateMonthDays(currentYear, currentMonth);

  const generateNextMonths = (count) => {
    const months = [];
    for (let i = 0; i < count; i++) {
      let month = currentMonth + i + 1;
      let year = currentYear;

      while (month > 11) {
        month -= 12;
        year += 1;
      }

      months.push({
        month,
        year,
        days: generateMonthDays(year, month),
      });
    }
    return months;
  };

  const nextMonths = generateNextMonths(6); // Генерируем 6 месяцев вперед

  // Функция для получения стиля дня
  const getDayStyle = (year, month, day, isStart, isEnd, inRange) => {
    const baseStyle = {
      width: "34px",
      height: "34px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "400",
      cursor: "pointer",
      margin: "0 auto",
      transition: "all 0.2s ease",
      position: "relative",
    };

    if (isStart || isEnd) {
      // День начала или конца диапазона
      return {
        ...baseStyle,
        backgroundColor: "#F1EBFD",
        color: "#7334ea",
        borderRadius: "60px",
      };
    } else if (inRange) {
      // День внутри диапазона
      return {
        ...baseStyle,
        backgroundColor: "#F1EBFD",
        color: "#7334ea",
        borderRadius: "0px",
      };
    } else {
      // Обычный день
      return {
        ...baseStyle,
        backgroundColor: "#F4F5F6",
        color: "#000000",
        borderRadius: "60px",
      };
    }
  };

  // Вычисляем количество выбранных дней
  const getSelectedDaysCount = () => {
    if (!selectedStartDay || !selectedEndDay) return 0;

    const startDate = new Date(
      selectedStartDay.year,
      selectedStartDay.month,
      selectedStartDay.day,
    );

    const endDate = new Date(
      selectedEndDay.year,
      selectedEndDay.month,
      selectedEndDay.day,
    );

    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    return dayDiff;
  };

  return (
    <div
      className="page"
      style={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        style={{
          padding: "0 16px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          maxWidth: "100vw",
          margin: "0 auto",
        }}
      >
        {/* Верхняя часть с заголовком */}
        <div
          style={{
            flexShrink: 0,
            marginBottom: "16px",
            width: "100%",
          }}
        >
          {/* Заголовок с кнопкой "Назад" */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: "24px",
              marginBottom: "12px",
              cursor: "pointer",
            }}
            onClick={handleBackToDiagrams}
          >
            <img
              src="/images/arrow-left.svg"
              alt="Назад"
              style={{
                width: "14px",
                height: "14px",
                marginRight: "6px",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#000000",
              }}
            >
              Анализ расходов
            </span>
          </div>

          <h1
            style={{
              marginBottom: "16px",
              fontSize: "24px",
              fontWeight: "700",
              color: "#000000",
              textAlign: "left",
            }}
          >
            Выбор периода
          </h1>

          {/* Информация о выбранном периоде */}
          {selectedStartDay && selectedEndDay && (
            <div
              style={{
                backgroundColor: "#F1EBFD",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "12px",
                border: "1px solid #7334ea",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#7334ea",
                      marginBottom: "4px",
                    }}
                  >
                    Выбранный период:
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#000000",
                    }}
                  >
                    {selectedStartDay.day}.{selectedStartDay.month + 1}.
                    {selectedStartDay.year} -{selectedEndDay.day}.
                    {selectedEndDay.month + 1}.{selectedEndDay.year}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666666",
                      marginTop: "4px",
                    }}
                  >
                    {getSelectedDaysCount()}{" "}
                    {getSelectedDaysCount() === 1
                      ? "день"
                      : getSelectedDaysCount() < 5
                        ? "дня"
                        : "дней"}
                  </div>
                </div>
                <button
                  onClick={handleResetSelection}
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #7334ea",
                    color: "#7334ea",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Сбросить
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Контейнер календаря с фиксированной высотой и скроллом */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            marginBottom: "16px",
          }}
        >
          {/* Заголовок календаря - дни недели с подчеркиванием */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              textAlign: "center",
              paddingBottom: "8px",
              borderBottom: "1px solid #999999",
              marginBottom: "12px",
              flexShrink: 0,
            }}
          >
            {weekdays.map((day) => (
              <div
                key={day}
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#999999",
                  padding: "4px 0",
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Скроллируемая область календаря */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              paddingRight: "4px",
            }}
            onMouseLeave={() => {
              if (isSelecting) {
                setIsSelecting(false);
              }
            }}
          >
            {/* Текущий месяц - полный */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#000000",
                  marginBottom: "10px",
                  textAlign: "left",
                }}
              >
                {monthNames[currentMonth]} {currentYear}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "4px",
                  textAlign: "center",
                }}
              >
                {currentMonthDays.map((day, index) => {
                  if (day === null) {
                    return (
                      <div key={`empty-${index}`} style={{ height: "32px" }} />
                    );
                  }

                  const inRange = isDayInRange(currentYear, currentMonth, day);
                  const isStart = isStartDay(currentYear, currentMonth, day);
                  const isEnd = isEndDay(currentYear, currentMonth, day);

                  return (
                    <div
                      key={`${currentYear}-${currentMonth}-${day}`}
                      onClick={() =>
                        handleDayClick(day, currentMonth, currentYear)
                      }
                      onMouseEnter={() =>
                        handleDayMouseEnter(day, currentMonth, currentYear)
                      }
                      style={getDayStyle(
                        currentYear,
                        currentMonth,
                        day,
                        isStart,
                        isEnd,
                        inRange,
                      )}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Следующие месяцы - можно скроллить */}
            {nextMonths.map((monthData, monthIndex) => (
              <div
                key={`${monthData.year}-${monthData.month}`}
                style={{ marginBottom: "20px" }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#000000",
                    marginBottom: "10px",
                    textAlign: "left",
                  }}
                >
                  {monthNames[monthData.month]} {monthData.year}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "4px",
                    textAlign: "center",
                  }}
                >
                  {monthData.days.map((day, dayIndex) => {
                    if (day === null) {
                      return (
                        <div
                          key={`${monthIndex}-empty-${dayIndex}`}
                          style={{ height: "32px" }}
                        />
                      );
                    }

                    const inRange = isDayInRange(
                      monthData.year,
                      monthData.month,
                      day,
                    );
                    const isStart = isStartDay(
                      monthData.year,
                      monthData.month,
                      day,
                    );
                    const isEnd = isEndDay(
                      monthData.year,
                      monthData.month,
                      day,
                    );

                    return (
                      <div
                        key={`${monthData.year}-${monthData.month}-${day}`}
                        onClick={() =>
                          handleDayClick(day, monthData.month, monthData.year)
                        }
                        onMouseEnter={() =>
                          handleDayMouseEnter(
                            day,
                            monthData.month,
                            monthData.year,
                          )
                        }
                        style={getDayStyle(
                          monthData.year,
                          monthData.month,
                          day,
                          isStart,
                          isEnd,
                          inRange,
                        )}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка "Выбрать период" */}
        <div
          style={{
            flexShrink: 0,
            paddingBottom: "16px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <button
            onClick={handleSelectPeriod}
            style={{
              width: "100%",
              padding: "16px",
              background: "#7334ea",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              boxSizing: "border-box",
              transition: "background-color 0.2s ease",
              opacity: selectedStartDay && selectedEndDay ? 1 : 0.5,
            }}
            onMouseEnter={(e) => {
              if (selectedStartDay && selectedEndDay) {
                e.target.style.backgroundColor = "#6229d1";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedStartDay && selectedEndDay) {
                e.target.style.backgroundColor = "#7334ea";
              }
            }}
            disabled={!selectedStartDay || !selectedEndDay}
          >
            {selectedStartDay && selectedEndDay
              ? `Выбрать период (${getSelectedDaysCount()} ${getSelectedDaysCount() === 1 ? "день" : getSelectedDaysCount() < 5 ? "дня" : "дней"})`
              : "Выберите период"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostCalendarMobile;
