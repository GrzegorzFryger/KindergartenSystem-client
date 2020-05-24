export class Person {
  id: string;
  address: Address = new Address();
  fullName: FullName = new FullName();
  phoneNumber: Phone = new Phone();

}

class Address {
  postalCode: string;
  city: string;
  streetNumber: string;
}

class FullName {
  name: string;
  surname: string;
}

class Phone {
  phone: string;
}
