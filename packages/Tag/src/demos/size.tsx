import React from 'react';
import Button from '@pro/Button';

const Basic: React.FC<any> = ({}) => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div style={{ marginRight: '20px' }}>
        small: <Button size="small">click me</Button>
      </div>
      <div style={{ marginRight: '20px' }}>
        middle: <Button size="middle">click me</Button>
      </div>
      <div style={{ marginRight: '20px' }}>
        large: <Button size="large">click me</Button>
      </div>
    </div>
  );
};

export default Basic;
