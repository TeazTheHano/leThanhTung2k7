export interface StorageItem {
    user: UserFormat,

    wallets: WalletFormat[];
    balance: number;
    transferences: TransferenceFormat[];
    budgets: BudgetFormat[];
    categories: CategoryFormat[];
}

export interface UserFormat {
    name: string;
    email: string;
    pinCode: number[];
}

export interface WalletFormat {
    name: string;
    amount: number;
    // TODO: add currency in future feature
    sourceOfMoney: string;
}

export interface TransferenceFormat {
    from: string;
    to?: string;
    amount: number;
    kind: 'in' | 'out' | 'transfer';
    time: Date;
    category?: string;
    note?: string;
    repeat?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
}

export interface BudgetFormat {
    name: string;
    amount: number;
    kind: 'in' | 'out';
}

export interface CategoryFormat {
    name: string;
    kind: 'in' | 'out';
    img: any;
}