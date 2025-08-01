import { useNavigate } from "react-router-dom";
const ThankYou = () => {
    const navigate=useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>🎉 Thank You for Your Order!</h1>
      <p>Your order has been placed successfully.</p>
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#0f62fe',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default ThankYou;
