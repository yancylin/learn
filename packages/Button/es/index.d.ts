import React from 'react';
import type { FC } from 'react';
import './index.less';
export interface ButtonProps {
  size?: 'small' | 'middle' | 'large';
  shape?: 'circle' | 'round';
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
declare const Button: FC<ButtonProps>;
export default Button;
