use near_sdk::store::Vector;
use near_sdk::{env, near, require, AccountId, BorshStorageKey, PanicOnDefault, Promise, NearToken};
use near_sdk::json_types::U64;

#[near]
#[derive(BorshStorageKey)]
pub enum Prefix {
    Vector,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct NftData {
    id: U64,
    owner: AccountId,
    uri: String,
    price: NearToken,
    seen: i64,
}

#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    owner: AccountId,
    item_counter: U64,
    nfts: Vector<NftData>,
}

#[near]
impl Contract {

    #[init]
    #[private]
    pub fn init() -> Self {
        Self {
            owner: env::signer_account_id(),
            item_counter: U64(0),
            nfts: Vector::new(Prefix::Vector),
        }
    }

    pub fn mint(&mut self, uri: String, price:NearToken) -> U64 {
        let sender = env::signer_account_id();

        
        let nft = NftData {
            id: self.item_counter,
            owner: sender,
            uri,
            price,
            seen: 0
        };
        
        let new_counter = self.item_counter.0 + 1;
        self.item_counter = U64(new_counter);  
        self.nfts.push(nft.clone());
        self.item_counter
    }

    #[payable]
    pub fn watch(&mut self, index: U64) -> Promise{
        let received = env::attached_deposit();
        let mut nft = self.get_nft(index).expect("NFT doesn't exist").clone();
        require!(
            received >= nft.price, "Not enough amount received"
        );

        nft.seen = nft.seen + 1;
        self.nfts.replace(index.0 as u32, nft.clone());

        Promise::new(nft.owner.clone()).transfer(received)
    }

    pub fn get_total_count(&self) -> U64 {
        self.item_counter
    }

    pub fn get_nft(&self, index:U64) -> Option<NftData> {
        self.nfts.get(index.0 as u32).cloned()
    }

    pub fn get_owner_of_contract(&self) -> AccountId {
        self.owner.clone()
    }
}