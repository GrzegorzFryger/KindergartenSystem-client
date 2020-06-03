import {DiscountPayment} from './discount-payment';

export class RecurringPayment {
  id: number;
  amount: string;
  description: string;
  child: string;
  guardian: string;
  startDate: Date;
  endDate: Date;
  type: string;
  discount: DiscountPayment;

  constructor(init?: Partial<RecurringPayment>) {
    Object.assign(this, init);
  }

}
