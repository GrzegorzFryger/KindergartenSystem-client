export enum PersonType {
  Guardian, Employee
}

export interface InputPerson {
  type: PersonType;
  data: any;
}
