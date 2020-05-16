export class PaymentHistory {
  id: string;
  date: string;
  amount: number;
  description: string;
  child: string;
  guardian: string;
  type: string;
  operationType: string;

  constructor(init?: Partial<PaymentHistory>) {
    Object.assign(this, init);
  }
}
