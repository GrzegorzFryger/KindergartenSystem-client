export class RecurringPayment {
  id: number;
  amount: number;
  description: string;
  child: string;
  guardian: string;
  startDate: string;
  endDate: string;
  type: string;

  constructor(init?: Partial<RecurringPayment>) {
    Object.assign(this, init);
  }
}
