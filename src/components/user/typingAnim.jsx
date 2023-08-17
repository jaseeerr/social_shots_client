import React from 'react';

const TypingAnim = () => {
  const loaderStyle = {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  };

  const typingTextStyle = {
    fontSize:"10px",
    marginRight: '8px',
    color:"white" 
  };

  const dotsStyle = {
    display: 'inline-flex',
  };

  const dotStyle = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    margin: '0 2px',
  };

  const animatedDotStyle = {
    animation: 'typing 1s infinite',
  };

  const keyframes = `@keyframes typing {
    0%, 100% {
      transform: translateY(0);
      background-color: #ccc;
    }
    50% {
      transform: translateY(-4px);
      background-color: transparent;
    }
  }`;

  return (
    <div>
      <style>{keyframes}</style>
      <div style={loaderStyle}>
        <div style={typingTextStyle}>TYPING...</div>
        <div style={dotsStyle}>
          <div style={dotStyle}></div>
          <div style={dotStyle}></div>
          <div style={{ ...dotStyle, ...animatedDotStyle }}></div>
        </div>
      </div>
    </div>
  );
}

export default TypingAnim;
