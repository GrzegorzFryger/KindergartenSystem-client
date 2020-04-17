import {Child} from './child';

export class Guardian {
  id: string;
  name: string;
  surname: string;
  postalCode: string;
  city: string;
  streetNumber: string;
  phone: string;
  status: string;
  email: string;
  children: Array<Child>;

  constructor(init?: Partial<Guardian>) {
    Object.assign(this, init);
  }
}
