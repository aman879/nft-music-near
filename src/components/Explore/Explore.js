import React from "react";
import CardList from "../CardList/CardList";
import 'bootstrap/dist/css/bootstrap.min.css';

const Explore = ({ nfts, isConnected, isLoading, canPlay, handlePay, url, handleCloseVideo }) => {
  return (
    <>
      <style>
        {`
          .gradient-bg-welcome {
            min-height: 100vh;
            background-color: #0f0e13;
            background-image: 
              radial-gradient(at 0% 0%, hsla(253,16%,7%,0.5) 0, transparent 50%), 
              radial-gradient(at 50% 0%, hsla(225,39%,30%,0.5) 0, transparent 50%), 
              radial-gradient(at 100% 0%, hsla(339,49%,30%,0.5) 0, transparent 50%);
          }
        `}
      </style>
      <div className="d-flex flex align-items-center gradient-bg-welcome py-5">
        {canPlay && url && (
          <div className="d-flex flex-column align-items-center p-5" style={{ height: "500px", width: "500px" }}>
            <div className="bg-dark p-3 rounded">
              <video
                controls
                className="w-100 h-auto rounded"
                src={url}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <button
              onClick={handleCloseVideo}
              className="mt-2 btn btn-danger"
            >
              Close
            </button>
          </div>
        )}

        <div className="p-4">
        </div>

        {isConnected ? (
          isLoading ? (
            <p className="text-white h4">Loading...</p>
          ) : (
            <CardList userNFTs={nfts} handlePay={handlePay} isPlaying={canPlay} />
          )
        ) : (
          <div className="text-center">
            <p className="text-white h5">Connect your wallet</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
