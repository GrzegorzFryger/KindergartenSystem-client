import {Role} from './role';

export class Account {
   id: string;
   name: string;
   surname: string;
   postalCode: string;
   city: string;
   streetNumber: string;
   phone: string;
   status: string;
   email: string;
   roles: Array<Role>;

  constructor(init?: Partial<Account>) {
    Object.assign(this, init);
  }
}
