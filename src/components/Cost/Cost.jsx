import React, { useState } from "react";
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
  //const [selectedMonth, setSelectedMonth] = useState("Июль");
  //const [selectedDay, setSelectedDay] = useState(10);

  // Состояние выбора: true - неделя, false - день
  const [isWeeklyView, setIsWeeklyView] = useState(true);
  const [selectedDay, setSelectedDay] = useState(10);

  const dailyCategories = [
    { name: "Еда", amount: 3590, color: "#D9B6FF" },
    { name: "Транспорт", amount: 1835, color: "#FFB53D" },
    { name: "Жилье", amount: 0, color: "#6EE4FE" },
    { name: "Развлечения", amount: 1250, color: "#B0AEFF" },
    { name: "Образование", amount: 600, color: "#BCEC30" },
    { name: "Другое", amount: 2306, color: "#FFB9B8" },
  ];

  const weeklyCategories = [
    { name: "Еда", amount: 21990, color: "#D9B6FF" },
    { name: "Транспорт", amount: 11046, color: "#FFB53D" },
    { name: "Жилье", amount: 0, color: "#6EE4FE" },
    { name: "Развлечения", amount: 13050, color: "#B0AEFF" },
    { name: "Образование", amount: 0, color: "#BCEC30" },
    { name: "Другое", amount: 19106, color: "#FFB9B8" },
  ];

  //const totalAmount = categories.reduce((sum, category) => sum + category.amount, 0);
  const categories = isWeeklyView ? weeklyCategories : dailyCategories;
  const totalAmount = categories.reduce(
    (sum, category) => sum + category.amount,
    0
  );
  const maxAmount = Math.max(...categories.map((c) => c.amount));

  {
    /* const handleDayClick = (day, month) => {
    if (day) {
      setSelectedDay(day);
      setSelectedMonth(month);
    }
  }; */
  }

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDay(day);
      setIsWeeklyView(false); // Переключаем на дневной вид при выборе дня
    }
  };

  // Переключение между днем и неделей
  const handleToggleView = () => {
    setIsWeeklyView(!isWeeklyView);
  };

  // Данные для календаря
  const months = [
    {
      name: "Июль 2024",
      days: Array.from({ length: 31 }, (_, i) => i + 1), // 1-31 июля
      startDay: 0, // Понедельник (0 = ПН, 1 = ВТ, 2 = СР, 3 = ЧТ, 4 = ПТ, 5 = СБ, 6 = ВС)
    },
    {
      name: "Август 2024",
      days: Array.from({ length: 31 }, (_, i) => i + 1), // 1-31 августа
      startDay: 3, // Четверг (Август начинается с четверга)
    },
  ];

  const weekdays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

  // Функция для форматирования календаря в недели с учетом дня начала месяца
  const getWeeksForMonth = (days, startDay) => {
    const weeks = [];
    let week = [];

    // Добавляем пустые ячейки для начала месяца
    for (let i = 0; i < startDay; i++) {
      week.push(null);
    }

    // Добавляем дни
    days.forEach((day, index) => {
      week.push(day);

      // Если неделя заполнена (7 дней) или это последний день
      if (week.length === 7 || index === days.length - 1) {
        weeks.push([...week]);
        week = [];
      }
    });

    // Если остались дни в неделе, заполняем пустыми ячейками
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    return weeks;
  };

  // Форматирование заголовка периода
  const getPeriodTitle = () => {
    if (isWeeklyView) {
      return "Расходы за 29 июля — 4 августа 2024";
    } else {
      return `Расходы за ${selectedDay} июля 2024`;
    }
  };

  return (
    <div className="page">
      <SAnalysisContainer>
        <SAnalysisTitle>Анализ расходов</SAnalysisTitle>

        {/* Кнопка переключения между днем и неделей */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => setIsWeeklyView(false)}
            style={{
              padding: "8px 16px",
              background: !isWeeklyView ? "#7334ea" : "#f4f5f6",
              color: !isWeeklyView ? "white" : "#666",
              border: "1px solid #e5e5e7",
              borderRadius: "6px",
              cursor: "pointer",
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
            }}
          >
            За неделю
          </button>
        </div>

        <SAnalysisContent>
          {/* Левая часть с календарем */}
          <SAnalysisLeft>
            <SPeriodSection>
              <SPeriodTitle>Период</SPeriodTitle>

              <SCalendarContainer>
                {/* Заголовки дней недели - фиксированные */}
                <SWeekdays>
                  {weekdays.map((day) => (
                    <SWeekday key={day}>{day}</SWeekday>
                  ))}
                </SWeekdays>

                <SCalendarContent>
                  {months.map((month) => {
                    const weeks = getWeeksForMonth(month.days, month.startDay);

                    return (
                      <SCalendarWrapper key={month.name}>
                        <SMonthHeader>{month.name}</SMonthHeader>

                        {/* Дни месяца */}
                        <SDaysContainer>
                          <SDays>
                            {weeks.map((week, weekIndex) => (
                              <React.Fragment key={weekIndex}>
                                {week.map((day, dayIndex) => {
                                  if (day === null) {
                                    return (
                                      <SDayEmpty
                                        key={`${weekIndex}-${dayIndex}`}
                                      />
                                    );
                                  }

                                  // Для недельного вида подсвечиваем дни с 29 июля по 4 августа
                                  const isInWeek =
                                    isWeeklyView &&
                                    ((month.name === "Июль 2024" &&
                                      day >= 29) ||
                                      (month.name === "Август 2024" &&
                                        day <= 4));

                                  // Для дневного вида подсвечиваем выбранный день
                                  const isSelected =
                                    !isWeeklyView &&
                                    day === selectedDay &&
                                    month.name === "Июль 2024";

                                  //const isActive = day === selectedDay && month.name === selectedMonth;

                                  const isActive = isInWeek || isSelected;

                                  return (
                                    <SDay
                                      key={`${weekIndex}-${dayIndex}`}
                                      $active={isActive}
                                      onClick={() =>
                                        handleDayClick(day, month.name)
                                      }
                                    >
                                      {day}
                                    </SDay>
                                  );
                                })}
                              </React.Fragment>
                            ))}
                          </SDays>
                        </SDaysContainer>
                      </SCalendarWrapper>
                    );
                  })}
                </SCalendarContent>
              </SCalendarContainer>
            </SPeriodSection>
          </SAnalysisLeft>

          {/* Правая часть с диаграммами */}
          <SAnalysisRight>
            <SDiagramSection>
              {/* Итоговая сумма и период */}
              <STotalContainer>
                <STotalAmount>{totalAmount.toLocaleString()} ₽</STotalAmount>
                {/* <STotalPeriod>Расходы за {selectedDay} {selectedMonth} </STotalPeriod> */}
                <STotalPeriod>{getPeriodTitle()}</STotalPeriod>
              </STotalContainer>

              {/* Шесть диаграмм в ряд */}
              <SChartsContainer>
                {categories.map((category) => (
                  <SChartWrapper key={category.name}>
                    <SChartAmount>
                      {category.amount.toLocaleString()} ₽
                    </SChartAmount>
                    <SChartDiagram>
                      <SChartColumn
                        //$height={(category.amount / maxAmount) * 100}
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
              </SChartsContainer>
            </SDiagramSection>
          </SAnalysisRight>
        </SAnalysisContent>
      </SAnalysisContainer>
    </div>
  );
};

export default Cost;
