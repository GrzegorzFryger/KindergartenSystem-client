export class RecurringPayment {
  id: number;
  amount: string;
  description: string;
  child: string;
  guardian: string;
  startDate: Date;
  endDate: Date;
  type: string;

  constructor(init?: Partial<RecurringPayment>) {
    Object.assign(this, init);
  }
}
