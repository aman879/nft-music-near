import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ id, owner, name, video, description, seen, price, handlePay, isPlaying}) => {
  const idNum = Number(id);
  return (
    <>
      <style>
        {`
          .card-div {
            flex: 1 1 250px;
            max-width: 250px;
            height: 450px;
            transition: all 0.2s;
            position: relative;
            cursor: pointer;
          }

          .card-inner {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, .05);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(10px);
            border-radius: 8px;
            padding: 15px;
          }

          .card-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            text-align: left;
            margin-top: 10px;
          }

          .card-title {
            font-size: 1.5rem;
            color: white;
            margin-bottom: 5px;
            font-weight: bold;
          }

          .card-owner {
            font-size: 1.1rem;
            color: #ddd;
            margin: 0;
            margin-top: 5px;
            font-weight: 500;
          }

          .card-description {
            font-size: 1rem;
            color: #ccc;
            margin-top: 10px;
            line-height: 1.4;
          }

          .card-img-top {
            height: 230px;
            width: 100%;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 10px;
          }

          .card-content span {
            font-weight: bold;
            color: #f0f0f0;
          }

          .label {
            color: #f0f0f0;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .value {
            color: white;
            margin-bottom: 10px;
          }

          .counter {
            font-size: 0.7rem;
            color: #ddd; 
          }

          .context-menu {
            position: absolute;
            background: white;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
            z-index: 1000;
          }
        `}
      </style>

        <div className="card-div">
          <div className="card-inner">
            <video
              className="card-img-top"
              alt="NFT"
              src={video}
              controls={false}
              autoPlay={false}
              style={{ height: "120px", width: "200px" }}
            >
            </video>
            <div className="d-flex justify-content-between align-items-center text-white">
              <p></p>
              <span className="counter">Played {seen} times</span>
            </div>
            <div className="card-content">
              <div>
                <span className="label">Name:</span>
                <p className="value">{name}</p>
              </div>
              <div>
                <span className="label">Owner:</span>
                <p className="value">{owner}</p>
              </div>
              <div>
                <span className="label">Description:</span>
                <p className="value">{description}</p>
              </div>
              <div className="text-center mt-auto">
                {!isPlaying && (              
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => handlePay(idNum, video, price)}
                    >
                      <span className="text-pink-300">Play for</span> <span className="text-sky-400">{price}</span>
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Card;
