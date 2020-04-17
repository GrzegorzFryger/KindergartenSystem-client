export class Child {
    id: string;
    name: string;
    surname: string;
    postalCode: string;
    city: string;
    streetNumber: number;
    pesel: string;
    group: string;
    gender: string;
    startDate: string;
    endDate: string;
    dateOfBirth: string;

    constructor(init?: Partial<Child>) {
        Object.assign(this, init);
    }
}
