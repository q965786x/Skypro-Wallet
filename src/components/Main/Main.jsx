import React, { useState } from "react";
import {
  SMainContainer,
  SPageTitle,
  SFormsContainer,
  SLeftColumn,
  SRightColumn,
  STableForm,
  STableTitle,
  STableWrapper,
  STable,
  SDeleteBtn,
  SDeleteIcon,
  SNewExpenseForm,
  SNewExpenseFormTitle,
  SFormGroup,
  SCategoryButtons,
  SCategoryBtn,
  SSubmitBtn,
  SFormInput,
  SFormLabel,
  SCategoryIcon,
  SCategoryContent,
  SCategoryRow,
} from "./Main.styled.js";

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState("Еда");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const categories = [
    {
      name: "Еда",
      icon: "/images/category-food.svg",
    },
    {
      name: "Транспорт",
      icon: "/images/category-transport.svg",
    },
    {
      name: "Жилье",
      icon: "/images/category-housing.svg",
    },
    {
      name: "Развлечения",
      icon: "/images/category-joy.svg",
    },
    {
      name: "Образование",
      icon: "/images/category-education.svg",
    },
    {
      name: "Другое",
      icon: "/images/category-other.svg",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика добавления нового расхода
    console.log({
      description,
      category: selectedCategory,
      date,
      amount,
    });
    // Очистка формы
    setDescription("");
    setDate("");
    setAmount("");
    setSelectedCategory("Еда");
  };

  const formatDate = (dateStr) => {
    return dateStr; // данные уже в нужном формате
  };

  // Разделяем категории на ряды по 2 кнопки
  const categoryRows = [];
  for (let i = 0; i < categories.length; i += 2) {
    categoryRows.push(categories.slice(i, i + 2));
  }

  return (
    <div className="page">
      <SMainContainer>
        <SPageTitle>Мои расходы</SPageTitle>

        <SFormsContainer>
          <SLeftColumn>
            {/* Форма "Таблица расходов"  */}
            <STableForm>
              <STableTitle>Таблица расходов</STableTitle>
              <STableWrapper>
                <STable>
                  <thead>
                    <tr>
                      <th>Описание</th>
                      <th>Категория</th>
                      <th>Дата</th>
                      <th>Сумма</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Пятерочка</td>
                      <td>Еда</td>
                      <td>{formatDate("03.07.2024")}</td>
                      <td>3 500 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon
                            src="public/images/bag.svg"
                            alt="Удалить"
                          />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Яндекс Такси</td>
                      <td>Транспорт</td>
                      <td>{formatDate("03.07.2024")}</td>
                      <td>750 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Аптека Вита</td>
                      <td>Другое</td>
                      <td>{formatDate("03.07.2024")}</td>
                      <td>1 200 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Бургер Кинг</td>
                      <td>Еда</td>
                      <td>{formatDate("03.07.2024")}</td>
                      <td>950 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Деливери</td>
                      <td>Еда</td>
                      <td>{formatDate("02.07.2024")}</td>
                      <td>1 300 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Кофейня №1</td>
                      <td>Еда</td>
                      <td>{formatDate("02.07.2024")}</td>
                      <td>400 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Бильярд</td>
                      <td>Развлечения</td>
                      <td>{formatDate("29.06.2024")}</td>
                      <td>600 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Перекресток</td>
                      <td>Еда</td>
                      <td>{formatDate("29.06.2024")}</td>
                      <td>2 360 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Лукойл</td>
                      <td>Транспорт</td>
                      <td>{formatDate("29.06.2024")}</td>
                      <td>1 000 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Летуаль</td>
                      <td>Другое</td>
                      <td>{formatDate("29.06.2024")}</td>
                      <td>4 300 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Яндекс Такси</td>
                      <td>Транспорт</td>
                      <td>{formatDate("28.06.2024")}</td>
                      <td>330 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Перекресток</td>
                      <td>Еда</td>
                      <td>{formatDate("28.06.2024")}</td>
                      <td>1 350 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Деливери</td>
                      <td>Еда</td>
                      <td>{formatDate("28.06.2024")}</td>
                      <td>2 320 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Вкусвилл</td>
                      <td>Еда</td>
                      <td>{formatDate("27.06.2024")}</td>
                      <td>1 220 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Кофейня №1</td>
                      <td>Еда</td>
                      <td>{formatDate("27.06.2024")}</td>
                      <td>920 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Вкусвилл</td>
                      <td>Еда</td>
                      <td>{formatDate("26.06.2024")}</td>
                      <td>840 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                    <tr>
                      <td>Кофейня №1</td>
                      <td>Еда</td>
                      <td>{formatDate("26.06.2024")}</td>
                      <td>920 ₽</td>
                      <td>
                        <SDeleteBtn>
                          <SDeleteIcon src="/images/bag.svg" alt="Удалить" />
                        </SDeleteBtn>
                      </td>
                    </tr>
                  </tbody>
                </STable>
              </STableWrapper>
            </STableForm>
          </SLeftColumn>

          <SRightColumn>
            {/* Форма "Новый расход" */}
            <SNewExpenseForm>
              <SNewExpenseFormTitle>Новый расход</SNewExpenseFormTitle>
              <form id="expense-form" onSubmit={handleSubmit}>
                <SFormGroup>
                  <SFormLabel htmlFor="description">Описание</SFormLabel>
                  <SFormInput
                    type="text"
                    id="description"
                    placeholder="Введите описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </SFormGroup>

                <SFormGroup>
                  <SFormLabel>Категория</SFormLabel>
                  <SCategoryButtons>
                    {categoryRows.map((row, rowIndex) => (
                      <SCategoryRow key={rowIndex}>
                        {row.map((category) => (
                          <SCategoryBtn
                            key={category.name}
                            type="button"
                            className={
                              selectedCategory === category.name ? "active" : ""
                            }
                            onClick={() => setSelectedCategory(category.name)}
                          >
                            <SCategoryIcon
                              src={category.icon}
                              alt={category.name}
                            />
                            <SCategoryContent>{category.name}</SCategoryContent>
                          </SCategoryBtn>
                        ))}
                      </SCategoryRow>
                    ))}
                  </SCategoryButtons>
                </SFormGroup>

                <SFormGroup>
                  <SFormLabel htmlFor="date">Дата</SFormLabel>
                  <SFormInput
                    type="date"
                    id="date"
                    placeholder="Введите дату"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </SFormGroup>

                <SFormGroup>
                  <SFormLabel htmlFor="amount">Сумма</SFormLabel>
                  <SFormInput
                    type="number"
                    id="amount"
                    placeholder="Введите сумму"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="1"
                  />
                </SFormGroup>

                <SSubmitBtn type="submit">Добавить новый расход</SSubmitBtn>
              </form>
            </SNewExpenseForm>
          </SRightColumn>
        </SFormsContainer>
      </SMainContainer>
    </div>
  );
};

export default Main;
