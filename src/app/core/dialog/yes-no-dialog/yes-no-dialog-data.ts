export class YesNoDialogData {
  question: string; // Question that you want to ask user
  answer: boolean;  // Answer provided by user (YES = true, NO = false)

  constructor(question: string) {
    this.question = question;
    this.answer = false;
  }
}
