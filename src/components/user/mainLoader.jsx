import React from 'react';
const  linkedinImage = "https://st.zippyshareme.com/cache/plugins/filepreviewer/5029/48b9b1af59a4716826a5ae2e09022e3e8afd1d839eac2d01b14e59cbe38bd7fc/1100x800_cropped.jpg"

const Loader1 = () => {
  const width = '100px';
  const height = '100px';

  const containerStyles = {
    width: `${parseInt(width) * 2}px`,
    height: `${parseInt(height) * 2}px`,
    backgroundSize: 'cover',
    verticalAlign: 'middle',
    margin: '20% auto',
  };

  const lineStyles = {
    height: '3px',
    width: '100%',
    background: '#e8e8e8',
    marginTop: '30%',
  };

  const innerStyles = {
    width: '100%',
    height: 'inherit',
    background: '#0077B5',
    animation: 'slide 2s ease-in-out infinite',
  };

  return (
    <div style={containerStyles}>
      <img src={linkedinImage} alt="LinkedIn Icon" style={{ width: '100%', height: '100%' }} />
      <div style={lineStyles}>
        <div style={innerStyles}></div>
      </div>
    </div>
  );
};

export default Loader1;

// Add the animation keyframes directly in a <style> block within the component
const styles = `
  @keyframes slide {
    0% {
      transform-origin: left;
      transform: scaleX(0.3);
    }
    /* ... Define the rest of the animation keyframes here */
  }
`;

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(styles, styleSheet.cssRules.length);
