import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
  }

  public getBalance(): Balance {
    const incomeTotal = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0,
      );

    const outcomeTotal = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0,
      );

    const balance = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: incomeTotal - outcomeTotal,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
