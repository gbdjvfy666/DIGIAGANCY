// Divider.jsx
import React from 'react';
import dividerImage from '../../assets/BACKGROUNDS9.jpg';

const Divider = ({ height = '10px' }) => {
  return (
    <div
      style={{
        width: '100%',
        height: height,
        backgroundColor: 'grey',
        backgroundImage: `url(${dividerImage})`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center',
        backgroundSize: '20px', // Увеличиваем ширину изображения, сохраняя высоту
      }}
    />
  );
};

export default Divider;