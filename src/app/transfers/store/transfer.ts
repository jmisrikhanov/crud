export interface Transfer {
    id: number;
    account_holder: string;
    IBAN: string;
    date: string;
    amount: number;
    note: string;
}

export interface TransferState{
    transfers: Transfer[],
}