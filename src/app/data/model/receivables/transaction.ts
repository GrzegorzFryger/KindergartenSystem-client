export class Transaction {
  id: number;
  transactionDate: Date;
  bookingDate: Date;
  contractorDetails: string;
  title: string;
  accountNumber: string;
  bankName: string;
  details: string;
  transactionAmount: number;
  transactionCurrency: string;
  childId: string;
  guardianId: string;
  isAssigned: boolean; // Field for checkbox purposes - to be removed before sending to REST API
}
