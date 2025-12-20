import styled from "styled-components";

export const SCalendarMonth = styled.div`
//стили для .calendar-month
    margin-bottom: 32px;
`;

export const SMonthHeader = styled.div`
//стили для .month-header 
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 16px;
    color: #000000;
    text-align: center;
`;

export const SWeekdays = styled.div`
//стили для .weekdays 
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
`;

export const SWeekday = styled.div`
//стили для .weekday
    text-align: center;
    font-weight: 400;
    font-size: 12px;
    color: #999999;
    padding: 8px 0;
`;

export const SDay = styled.div`
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    padding: 12px 0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #ffffff;
    border: 1px solid #e5e5e7;

    &:hover {
        background: #f5f5f7;
        border-color: #7334ea;
    }

    &.active {
        background: #7334ea;
        color: #ffffff;
        border-color: #7334ea;
        font-weight: 600;
    }

    &.empty {
        background: transparent;
        border: none;
        cursor: default;
    }

    &.empty:hover {
        background: transparent;
    }
`;