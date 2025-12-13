import React from 'react';
//import SignIn from './components/SignIn';
//import SignUp from './components/SignUp';
//import styled from 'styled-components';



{/* const AppContent = () => {
  return (
    <AppContainer>
      {isLoginForm ? <SignIn /> : <SignUp />}
    </AppContainer>
  );
};

const App = () => {
  return (
    <AppContent />
  );
};


export default App */}

<header className="header">
      <a className="logo" href="index.html">
        <img className="logo__img" src="/images/logo.png" alt="logo" />
      </a>
      <nav className="header__nav">
        <a className="nav-link active" href="" id="expensesLink">Мои расходы</a>
        <a className="nav-link" href="" id="analysisLink">Анализ расходов</a>
        <button className="logout-btn" id="logoutBtn">Выйти</button>
      </nav>
    </header>

    {/* Форма входа */}
    <div className="page auth-page active" id="loginPage">
      <div className="form-login" id="formLogin">
        <div className="form-login-container">
          <h2 className="form-title">Вход</h2>

          <div className="form-group">
            <label className="form-label" for="loginEmail"></label>
            <input
              type="email"
              id="loginEmail"
              className="form-input"
              placeholder="Введите вашу почту"
            />
          </div>

          <div className="form-group">
            <label className="form-label" for="loginPassword"></label>
            <input
              type="password"
              id="loginPassword"
              className="form-input"
              placeholder="Введите ваш пароль"
            />
          </div>

          <button type="button" className="btn-login" id="loginBtn">Войти</button>

          <div className="form-link">
            <p className="auth-link" id="goToRegister">
              Нужно зарегистрироваться? Регистрируйтесь здесь
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Форма регистрации */}
    <div className="page auth-page" id="registerPage">
      <div className="form-register hidden" id="formRegister">
        <div className="form-register-container">
          <h2 className="form-title">Регистрация</h2>

          <div className="form-group">
            <label className="form-label" for="registerEmail"></label>
            <input
              type="email"
              id="registerEmail"
              className="form-input"
              placeholder="Введите вашу почту"
            />
          </div>

          <div className="form-group">
            <label className="form-label" for="registerPassword"></label>
            <input
              type="password"
              id="registerPassword"
              className="form-input"
              placeholder="Создайте пароль"
            />
          </div>

          <div className="form-group">
            <label className="form-label" for="confirmPassword"></label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Повторите пароль"
            />
          </div>

          <button type="button" className="btn btn-register" id="registerBtn">
            Зарегистрироваться
          </button>

          <div className="form-link">
            <p className="auth-link" id="goToRegister">
              Уже есть аккаунт? Войдите здесь
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Таблица на основной странице */}
    <div className="page" id="mainPage">
      <div className="table-container">
        <h2 className="table-container-title">Мои расходы</h2>

        {/* Таблица расходов */}
        <div className="expenses-table">
          <h3 className="table-title">Таблица расходов</h3>
          <table>
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
                <td>03.07.2024</td>
                <td>3 500 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Яндекс Такси</td>
                <td>Транспорт</td>
                <td>02.07.2024</td>
                <td>730 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Аптека Вита</td>
                <td>Другое</td>
                <td>03.07.2024</td>
                <td>1 200 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Бургер Кинг</td>
                <td>Еда</td>
                <td>03.07.2024</td>
                <td>950 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Деливери</td>
                <td>Еда</td>
                <td>02.07.2024</td>
                <td>1 320 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Кофейня №1</td>
                <td>Еда</td>
                <td>02.07.2024</td>
                <td>400 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Бильярд</td>
                <td>Развлечения</td>
                <td>29.06.2024</td>
                <td>600 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Перекресток</td>
                <td>Еда</td>
                <td>29.06.2024</td>
                <td>2 360 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Лукойл</td>
                <td>Транспорт</td>
                <td>29.06.2024</td>
                <td>1 000 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Летуаль</td>
                <td>Другое</td>
                <td>29.06.2024</td>
                <td>4 300 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Яндекс Такси</td>
                <td>Транспорт</td>
                <td>28.06.2024</td>
                <td>320 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Перекресток</td>
                <td>Еда</td>
                <td>28.06.2024</td>
                <td>1 360 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Деливери</td>
                <td>Еда</td>
                <td>28.06.2024</td>
                <td>2 320 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Вкусвилл</td>
                <td>Еда</td>
                <td>27.06.2024</td>
                <td>1 220 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Кофейня №1</td>
                <td>Еда</td>
                <td>27.06.2024</td>
                <td>920 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Вкусвилл</td>
                <td>Еда</td>
                <td>26.06.2024</td>
                <td>840 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
              <tr>
                <td>Кофейня №1</td>
                <td>Еда</td>
                <td>26.06.2024</td>
                <td>920 Р</td>
                <td><button class="delete-btn">×</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Форма добавления нового расхода */}
        <div className="new-expense-form">
          <h3 className="new-expense-form-title">Новый расход</h3>
          <form id="expense-form">
            <div className="form-group">
              <label for="description">Описание</label>
              <input
                type="text"
                id="description"
                placeholder="Введите описание"
                required
              />
            </div>

            <div className="form-group">
              <label>Категория</label>
              <div class="category-buttons">
                <button type="button" className="category-btn active">Еда</button>
                <button type="button" className="category-btn">Жилье</button>
                <button type="button" className="category-btn">Образование</button>
                <button type="button" className="category-btn">Транспорт</button>
                <button type="button" className="category-btn">Развлечения</button>
                <button type="button" className="category-btn">Другое</button>
              </div>
              <input type="hidden" id="category" value="Еда" />
            </div>

            <div className="form-group">
              <label for="date">Дата</label>
              <input type="date" id="date" required />
            </div>

            <div className="form-group">
              <label for="amount">Сумма</label>
              <input
                type="number"
                id="amount"
                placeholder="Введите сумму"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Добавить новый расход
            </button>
          </form>
        </div>
      </div>
    </div>

    {/* Страница анализа расходов */}
    <div className="page" id="analysisPage">
      <div className="analysis-container">
        <h2 className="analysis-title">Анализ расходов</h2>

        <div className="analysis-content">
          {/* Левая часть с календарем */}
          <div className="analysis-left">
            <div className="period-section">
              <h3 className="period-title">Период</h3>

              {/* Календарь июль 2024 */}
              <div className="calendar-month">
                <div className="month-header">Июль 2024</div>
                <div className="calendar-grid">
                  <div className="weekday">пн</div>
                  <div className="weekday">вт</div>
                  <div className="weekday">ср</div>
                  <div className="weekday">чт</div>
                  <div className="weekday">пт</div>
                  <div className="weekday">сб</div>
                  <div className="weekday">вс</div>

                  {/* Пустые ячейки для выравнивания (июль 2024 начинается с понедельника) */}
                  <div className="day">1</div>
                  <div className="day">2</div>
                  <div className="day">3</div>
                  <div className="day">4</div>
                  <div className="day">5</div>
                  <div className="day">6</div>
                  <div className="day">7</div>
                  <div className="day">8</div>
                  <div className="day">9</div>
                  <div className="day active">10</div>
                  <div className="day">11</div>
                  <div className="day">12</div>
                  <div className="day">13</div>
                  <div className="day">14</div>
                  <div className="day">15</div>
                  <div className="day">16</div>
                  <div className="day">17</div>
                  <div className="day">18</div>
                  <div className="day">19</div>
                  <div className="day">20</div>
                  <div className="day">21</div>
                  <div className="day">22</div>
                  <div className="day">23</div>
                  <div className="day">24</div>
                  <div className="day">25</div>
                  <div className="day">26</div>
                  <div className="day">27</div>
                  <div className="day">28</div>
                  <div className="day">29</div>
                  <div className="day">30</div>
                  <div className="day">31</div>
                </div>
              </div>

              {/* Календарь август 2024 */}
              <div className="calendar-month">
                <div className="month-header">Август 2024</div>
                <div className="calendar-grid">
                  <div className="weekday">пн</div>
                  <div className="weekday">вт</div>
                  <div className="weekday">ср</div>
                  <div className="weekday">чт</div>
                  <div className="weekday">пт</div>
                  <div className="weekday">сб</div>
                  <div className="weekday">вс</div>

                  {/* Пустые ячейки (август 2024 начинается с четверга) */}
                  <div className="day empty"></div>
                  <div className="day empty"></div>
                  <div className="day empty"></div>
                  <div className="day">1</div>
                  <div className="day">2</div>
                  <div className="day">3</div>
                  <div className="day">4</div>
                  <div className="day">5</div>
                  <div className="day">6</div>
                  <div className="day">7</div>
                  <div className="day">8</div>
                  <div className="day">9</div>
                  <div className="day">10</div>
                  <div className="day">11</div>
                  <div className="day">12</div>
                  <div className="day">13</div>
                  <div className="day">14</div>
                  <div className="day">15</div>
                  <div className="day">16</div>
                  <div className="day">17</div>
                  <div className="day">18</div>
                  <div className="day">19</div>
                  <div className="day">20</div>
                  <div className="day">21</div>
                  <div className="day">22</div>
                  <div className="day">23</div>
                  <div className="day">24</div>
                  <div className="day">25</div>
                  <div className="day">26</div>
                  <div className="day">27</div>
                  <div className="day">28</div>
                  <div className="day">29</div>
                  <div className="day">30</div>
                  <div className="day">31</div>
                </div>
              </div>
            </div>
          </div> 

          {/* Правая часть с диаграммами */}
          <div className="analysis-right">
            {/* Блок с общей суммой */}
            <div className="total-expenses">
              <div className="total-amount">9 581 ₽</div>
              <div className="total-period">Расходы за 10 июля 2024</div>
            </div>

            {/* Круговые диаграммы */}
            <div className="charts-container">
              {/* Диаграмма1 */}
              <div className="chart-section">
                <div className="chart-title">3 590 ₽</div>
                <div className="chart-circle">
                  <img src="/images/diag1.png" alt="diagram" />
                  <div className="chart-placeholder"></div>
                </div>
                <div className="chart-categories">
                  <div className="category-item">Еда</div>
                </div>
              </div>

              {/* Диаграмма2 */}
              <div className="chart-section">
                <div className="chart-title">1 835 ₽</div>
                <div className="chart-circle">
                  <img src="/images/diag2.png" alt="diagram" />
                  <div className="chart-placeholder"></div>
                </div>
                <div className="chart-categories">
                  <div className="category-item">Транспорт</div>
                </div>
              </div>

              {/* Диаграмма3 */}
              <div className="chart-section">
                <div className="chart-title">0 ₽</div>
                <div className="chart-circle">
                  <img src="/images/diag3.png" alt="diagram" />
                  <div className="chart-placeholder"></div>
                </div>
                <div className="chart-categories">
                  <div className="category-item">Жилье</div>
                </div>
              </div>

              {/* Диаграмма4 */}
              <div className="chart-section">
                <div className="chart-title">1 250 ₽</div>
                <div className="chart-circle">
                  <img src="/images/diag4.png" alt="diagram" />
                  <div className="chart-placeholder"></div>
                </div>
                <div className="chart-categories">
                  <div className="category-item">Развлечения</div>
                </div>
              </div>

              {/* Диаграмма5 */}
              <div className="chart-section">
                <div className="chart-title">600 ₽</div>
                <div className="chart-circle">
                  <img src="/images/diag5.png" alt="diagram" />
                  <div className="chart-placeholder"></div>
                </div>
                <div className="chart-categories">
                  <div className="category-item">Образование</div>
                </div>
              </div>

              {/* Диаграмма6 */}
              <div className="chart-section">
                <div className="chart-title">2 306 ₽</div>
                <div className="chart-circle">
                  <img src="/images/diag6.png" alt="diagram" />
                  <div className="chart-placeholder"></div>
                </div>
                <div className="chart-categories">
                  <div className="category-item">Другое</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    //<script src="js/script.js"></script>

    export default App

    