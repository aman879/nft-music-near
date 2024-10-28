import React from 'react';

const Home = ({ onRouteChange }) => {
  return (
    <div className="text-white d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="font-weight-bold display-4">
          Mint and Watch<br />
          <span className="font-weight-light text-primary">Music NFTs</span>
        </h1>
        <p 
          style={{
            fontSize: '1.1rem',
            color: '#fff',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          "Music NFTs are unique digital assets that represent ownership of a specific file.
          They ensure authenticity and provenance by recording ownership on the blockchain.
          Each NFT has a unique identifier, ensuring its uniqueness and non-interchangeability."
        </p>
        <button 
          onClick={() => onRouteChange("mint")}
          type="button" 
          className="btn btn-gradient mt-4"
          style={{
            background: 'linear-gradient(to right, #6f42c1, #d63384)',
            border: 'none',
          }}
        >
          Mint
        </button>
      </div>
    </div>
  );
}

export default Home;
