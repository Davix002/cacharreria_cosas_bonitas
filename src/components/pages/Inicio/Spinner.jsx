const Spinner = () => {
    const commonStyles = {
      border: '16px solid #f3f3f3',
      borderRadius: '50%',
      borderTop: '16px solid #40e0d0',
      width: '120px',
      height: '120px',
      animation: 'spin 2s linear infinite',
    };
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={commonStyles}></div>
      </div>
    );
  };
  
  export default Spinner;
  
  