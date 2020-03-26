export enum Gender {
  MALE, FEMALE, UNSPECIFIED
}

export class Child {
  id: string;
  name: string;
  surname: string;
  postalCode: string;
  city: string;
  streetNumber: number;
  pesel: string;
  group: string;
  gender: Gender;
  startDate: string;
  endDate: string;
  dateOfBirth: string;

}
