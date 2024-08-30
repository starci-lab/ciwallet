export enum Network {
  Devnet = "Devnet",
  Testnet = "Testnet",
  Mainnet = "Mainnet",
}

export interface ChainAccount {
  address: string;
  privateKey: string;
  publicKey: string;
}

export interface TokenMetadata {
  symbol: string;
  name: string;
  decimals: number;
}