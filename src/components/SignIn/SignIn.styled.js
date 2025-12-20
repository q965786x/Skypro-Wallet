import styled from "styled-components";

export const SFormLogin = styled.div`
  width: 379px;
  height: 334px;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  position: relative;
  overflow: hidden;
`;

export const SFormLoginContainer = styled.div`
  width: 313px;
  height: 270px;
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
  font-size: 16px;
  color: #ffffff;
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

export const SBtnLogin = styled.button`
  background-color: #7334ea;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  align-items: center;
  color: #ffffff;
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
