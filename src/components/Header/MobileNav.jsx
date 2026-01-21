import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MobileNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-top: 1px solid #e5e5e7;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  z-index: 999;
`;

const MobileNavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => props.$active ? '#7334ea' : '#999999'};
  font-size: 10px;
  padding: 8px 12px;
  
  .icon {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
    background: ${props => props.$active ? '#7334ea' : '#cccccc'};
    mask: ${props => `url(${props.$icon}) center/contain no-repeat`};
    -webkit-mask: ${props => `url(${props.$icon}) center/contain no-repeat`};
  }
  
  span {
    font-weight: ${props => props.$active ? '600' : '400'};
  }
`;

const MobileNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/expenses', label: 'Расходы', icon: '/images/expenses-icon.svg' },
    { path: '/analysis', label: 'Анализ', icon: '/images/analysis-icon.svg' },
  ];
  
  return (
    <MobileNavContainer>
      {navItems.map((item) => (
        <MobileNavLink
          key={item.path}
          to={item.path}
          $active={location.pathname === item.path}
          $icon={item.icon}
        >
          <div className="icon"></div>
          <span>{item.label}</span>
        </MobileNavLink>
      ))}
    </MobileNavContainer>
  );
};

export default MobileNav;