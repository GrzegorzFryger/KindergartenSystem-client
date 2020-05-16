export class DiscountPayment {
  id: string;
  name: string;
  description: string;
  value: number;
  typeDiscount: string;

  constructor(init?: Partial<DiscountPayment>) {
    Object.assign(this, init);
  }

}
