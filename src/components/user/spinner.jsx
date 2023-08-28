import React from 'react';

const DarkSpinner = () => {
  return (
    <div style={spinnerStyles.body}>
      <div style={spinnerStyles.spinner}></div>
    </div>
  );
};

const spinnerStyles = {
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    backgroundColor: '#121212',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid rgba(255, 255, 255, 0.3)',
    borderTop: '5px solid #ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

export default DarkSpinner;
