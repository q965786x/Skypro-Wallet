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
  align-items: flex-start; 

  @media (max-width: 1024px) {
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const SLeftColumn = styled.div`
  flex: 2;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
    flex: none;
  }
`;

export const SRightColumn = styled.div`
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
    flex: none;
  }
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

  @media (max-width: 1024px) {
    height: 500px;
    padding: 24px;
  }
  
  @media (max-width: 768px) {
    height: 400px;
    padding: 16px;
    border-radius: 20px;
  }
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
  overflow-y: auto; 
  overflow-x: hidden;
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

  @media (max-width: 768px) {
    font-size: 12px;
    
    th, td {
      padding: 8px 4px;
      font-size: 12px;
    }
    
    td:nth-child(1), th:nth-child(1) {
      max-width: 120px;
    }
    
    td:nth-child(2), th:nth-child(2) {
      max-width: 80px;
    }
    
    td:nth-child(3), th:nth-child(3) {
      max-width: 70px;
    }
    
    td:nth-child(4), th:nth-child(4) {
      max-width: 80px;
    }
    
    td:nth-child(5), th:nth-child(5) {
      max-width: 40px;
    }
  }
  
  @media (max-width: 480px) {
    th, td {
      padding: 6px 2px;
      font-size: 10px;
    }
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

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
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

  @media (max-width: 1024px) {
    height: auto;
    min-height: 500px;
    padding: 24px;
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 20px;
    min-height: auto;
  }
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
  height: 42px;

  &:hover {
    background-color: #5a2bb8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    height: 42px;
    font-size: 12px;
  }
`;

export const SMobileTable = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export const SMobileTransaction = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e7;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  
  .mobile-transaction-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
  }
  
  .mobile-transaction-category {
    font-size: 12px;
    color: #7334ea;
    background: #f1ebfd;
    padding: 2px 8px;
    border-radius: 12px;
  }
  
  .mobile-transaction-description {
    font-weight: 500;
    margin-bottom: 4px;
    word-break: break-word;
  }
  
  .mobile-transaction-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }
  
  .mobile-transaction-date {
    font-size: 11px;
    color: #999;
  }
  
  .mobile-transaction-amount {
    font-weight: 600;
    color: #000;
  }
`;

export const SViewSelector = styled.div`
  display: flex;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e5e7;
  background-color: #f4f5f6;
`;

export const SToggleViewButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  border: none;
  background-color: ${props => props.$active ? '#f1ebfd' : 'transparent'};
  color: ${props => props.$active ? '#7334ea' : '#000000'};
  font-size: 14px;
  font-weight: ${props => props.$active ? '600' : '400'};
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? '#e8dffb' : '#e8e8e8'};
  }
  
  &:first-child {
    border-right: 1px solid #e5e5e7;
  }
`;
