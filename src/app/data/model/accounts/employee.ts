export class Employee {
  id: string;
  name: string;
  surname: string;
  postalCode: string;
  city: string;
  streetNumber: string;
  phone: string;
  status: string;
  email: string;

  constructor(init?: Partial<Employee>) {
    Object.assign(this, init);
  }
}
