import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${props => props.$variant === 'primary' ? '#7334ea' : 'transparent'};
  border: ${props => props.$variant === 'primary' ? 'none' : '1px solid #7334ea'};
  border-radius: 6px;
  padding: ${props => {
    if (props.$size === 'small') return '0 12px';
    if (props.$size === 'medium') return '8px 16px';
    return '12px 24px';
  }};
  font-weight: ${props => props.$weight || '500'};
  font-size: ${props => {
    if (props.$size === 'small') return '10px';
    if (props.$size === 'medium') return '12px';
    return '14px';
  }};
  color: ${props => props.$variant === 'primary' ? '#ffffff' : '#7334ea'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${props => {
    if (props.$size === 'small') return '18px';
    if (props.$size === 'medium') return '38px';
    return '42px';
  }};
  min-height: ${props => {
    if (props.$size === 'small') return '18px';
    return 'auto';
  }};
  min-width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  &:hover {
    background: ${props => {
      if (props.$variant === 'primary') return '#5a2bb8';
      if (props.$variant === 'secondary') return '#f1ebfd';
      return '#f5f5f5';
    }};
  }
  
  &:disabled {
    background: #cccccc;
    border-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    font-size: ${props => {
      if (props.$size === 'small') return '10px';
      return '12px';
    }};
    padding: ${props => {
      if (props.$size === 'small') return '0 8px';
      return '8px 12px';
    }};
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  weight = '500',
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $weight={weight}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;