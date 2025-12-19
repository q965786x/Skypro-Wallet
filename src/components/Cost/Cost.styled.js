import styled from "styled-components";

export const SAnalysisContainer = styled.div`
  //стили для .analysis-container
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 40px 40px;
`;

export const SAnalysisTitle = styled.h2`
  //стили для .analysis-title
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 32px;
  color: #000000;
`;

export const SAnalysisContent = styled.div`
  //стили для .analysis-content
  display: flex;
  gap: 40px;
`;

export const SAnalysisLeft = styled.div`
  //стили для .analysis-left
  width: 379px;
  flex-shrink: 0;
`;

export const SAnalysisRight = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SPeriodSection = styled.div`
  //стили для .period-section
  width: 379px;
  height: 540px;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

export const SPeriodTitle = styled.h3`
  //стили для .period-title
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 24px;
  color: #000000;
  flex-shrink: 0;
`;

export const SCalendarContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const SWeekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 16px;
  background: #f8f9fa;
  padding: 8px;
  border-radius: 6px;
  text-decoration: underline;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const SWeekday = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  color: #666666;
  padding: 6px 0;
  text-transform: uppercase;
`;

export const SCalendarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;

  /* Полоса прокрутки */
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

export const SCalendarWrapper = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SMonthHeader = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
  color: #000000;
  text-align: left;
  padding-left: 8px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const SDaysContainer = styled.div`
  margin-bottom: 16px;
`;

export const SDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 8px;
`;

export const SDay = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  padding: 12px 0;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f4f5f6;
  border: 1px solid #e5e5e7;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f5f5f7;
    border-color: #7334ea;
  }

  ${({ $active }) =>
    $active &&
    ` 
    background: #7334ea;
    color: #ffffff;
    border-color: #7334ea;
    font-weight: 600;
  `}
`;

export const SDayEmpty = styled.div`
  height: 40px;
  padding: 12px 0;
  border-radius: 6px;
  background: transparent;
  border: 1px solid transparent;
  cursor: default;
`;

export const SDiagramSection = styled.div`
  width: 789px;
  height: 540px;
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

export const STotalContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const STotalAmount = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 12px;
`;

export const STotalPeriod = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #999999;
`;

export const SChartsContainer = styled.div`
  flex: 1;
  display: flex;
  gap: 24px;
  justify-content: space-between;
`;

export const SChartWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
`;

export const SChartAmount = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #000000;
  margin-bottom: 12px;
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SChartDiagram = styled.div`
  width: 94px;
  height: 328px;
  background: #f5f5f7;
  border-radius: 12px;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
`;

export const SChartColumn = styled.div`
  width: 100%;
  height: ${(props) => props.$height || 0}%;
  background: ${(props) => props.$color || "#7334ea"};
  border-radius: 12px;
  transition: height 0.5s ease;
`;

export const SChartCategory = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
