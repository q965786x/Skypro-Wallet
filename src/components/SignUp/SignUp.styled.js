import styled from "styled-components";

export const SFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px); /* Учитываем высоту header */
  padding: 20px;
`;

export const SFormRegister = styled.div`
  width: 379px;
  height: 385px;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  position: relative;
  overflow: hidden;
`;

export const SFormRegisterContainer = styled.div`
  width: 313px;
  height: 321px;
`;

export const SFormTitle = styled.h2`
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  color: #000000;
  margin-bottom: 24px;
`;

export const SFormGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

export const SFormLabel = styled.label`
  display: block;
  font-size: 12px;
  color: #000000;
  margin-bottom: 12px;
  font-weight: 400;
`;

export const SFormInput = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  color: #000000;
  transition: all 0.3s ease;
  background-color: #fff;
  gap: 12px;

  &::placeholder {
    font-weight: 400;
    font-size: 12px;
    color: #999999;
  }

  &.filled {
    color: #000;
    border-color: #888;
  }
`;

export const SBtnRegister = styled.button`
  width: 100%;
  height: 38px;
  background-color: #7334ea;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 24px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a2bb8;
  }
`;

export const SFormLink = styled.div`
  text-align: center;
  color: #999999;
  font-weight: 400;
  font-size: 12px;
  font-family: inherit;
  gap: 10px;
`;

export const SAuthLink = styled.p`
  color: #999999;
  text-decoration: none;
  font-weight: 400;
  font-size: 12px;
  font-family: inherit;

  &:hover {
    text-decoration: underline;
  }
`;
