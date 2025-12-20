import styled from "styled-components";

export const SMainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 40px 40px;
`;

export const SPageTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 32px;
  color: #000000;
`;

export const SFormsContainer = styled.div`
  display: flex;
  gap: 34px;
  align-items: flex-start; /* Выравниваем формы по верху */
`;

export const SLeftColumn = styled.div`
  flex: 2;
  min-width: 0;
`;

export const SRightColumn = styled.div`
  flex: 1;
  min-width: 0;
`;

export const STableForm = styled.div`
  width: 100%;
  height: 618px;
  padding: 40px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const STableTitle = styled.h3`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 24px;
  color: #000000;
  padding: 24px 24px 0 24px;
  flex-shrink: 0;
`;

export const STableWrapper = styled.div`
  flex: 1;
  overflow-y: auto; /* Только вертикальная прокрутка */
  overflow-x: hidden; /* Убираем горизонтальную прокрутку */
  padding: 0 24px 24px 24px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export const STable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  thead {
    background-color: transparent;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: 1;
  }

  th {
    padding: 6px 12px;
    text-align: left;
    font-weight: 400;
    font-size: 12px;
    color: #999999;
    border-bottom: 1px solid #e5e5e7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  td {
    padding: 6px 12px;
    text-align: left;
    font-weight: 400;
    font-size: 12px;
    color: #000000;
    gap: 14px;
    border-bottom: 1px solid #e5e5e7;
    background-color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  tbody tr:hover {
    background-color: #f9f9fa;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const SDeleteBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: #ff4444;

    img {
      filter: brightness(0) invert(1);
    }
  }
`;

export const SDeleteIcon = styled.img`
  width: 12px;
  height: 12px;
  transition: filter 0.3s ease;
`;

export const SNewExpenseForm = styled.div`
  width: 100%;
  height: 618px;
  background: #ffffff;
  padding: 40px;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

export const SNewExpenseFormTitle = styled.h3`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 24px;
  color: #000000;
  flex-shrink: 0;
`;

export const SFormGroup = styled.div`
  margin-bottom: 24px;
`;

export const SFormLabel = styled.label`
  display: block;
  font-weight: 600;
  font-size: 16px;
  color: #000000;
  margin-bottom: 8px;
`;

export const SFormInput = styled.input`
  width: 100%;
  height: 39px;
  padding: 0 12px;
  border: 1px solid #e5e5e7;
  border-radius: 6px;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  background-color: #ffffff;
  transition: all 0.3s ease;

  &::placeholder {
    color: #999999;
  }

  &:focus {
    border-color: #7334ea;
    outline: none;
    box-shadow: 0 0 0 2px rgba(115, 52, 234, 0.1);
  }
`;

export const SCategoryButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
`;

export const SCategoryBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid #e5e5e7;
  background: #ffffff;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border-color: #7334ea;
    color: #7334ea;
  }

  &.active {
    background: #7334ea;
    color: white;
    border-color: #7334ea;
    font-weight: 600;

    img {
      filter: brightness(0) invert(1);
    }
  }
`;

// Компонент для строки с двумя кнопками категорий
export const SCategoryRow = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;

  /* Каждая кнопка занимает 50% ширины минус половина gap */
  ${SCategoryBtn} {
    flex: 1;
    min-width: 0; /* Позволяет кнопкам сжиматься */
  }
`;

export const SCategoryIcon = styled.img`
  width: 14px;
  height: 14px;
  transition: filter 0.3s ease;
  flex-shrink: 0;
`;

export const SCategoryContent = styled.span`
  display: inline-block;
  white-space: nowrap; /* Запрещаем перенос текста */
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1; /* Позволяет тексту занимать оставшееся пространство */
`;

export const SSubmitBtn = styled.button`
  width: 100%;
  background: #7334ea;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background-color: #5a2bb8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
