export interface CreateAccountParams {
    mnemonic: string;
    accountNumber: number;
    chainKey: string;
}

export interface ImportAccountParams {
    privateKey: string;
    chainKey: string;
    accountAddress?: string;
}