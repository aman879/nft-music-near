import React from "react";
import CardList from "../CardList/CardList";
import 'bootstrap/dist/css/bootstrap.min.css';

const Explore = ({ nfts, isConnected, isLoading, canPlay, handlePay, url, handleCloseVideo }) => {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center vh-100">
      {canPlay && url && (
        <div className="d-flex flex-column align-items-center mb-4 me-5">
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
  );
};

export default Explore;
