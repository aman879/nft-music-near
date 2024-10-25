import React from "react";
import Card from "../Card/Card";

const CardList = ({ userNFTs, handlePay, isPlaying}) => {
    let cardComponents = [];

    if (userNFTs) {
        cardComponents = userNFTs.map((nft) => (
            <Card
                key={nft.id}
                id={nft.id}
                owner={nft.owner}
                name={nft.name}
                description={nft.description}
                video={nft.video}
                seen={nft.seen}
                price={nft.price}
                handlePay={handlePay}
                isPlaying={isPlaying}
            />
        ));
    }

    return (
        <div>
            {userNFTs.length === 0 ? (
                <p>No NFTs found.</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 g-4 pb-5">
                    {cardComponents}
                </div>
            )}
        </div>
    );
};

export default CardList;
