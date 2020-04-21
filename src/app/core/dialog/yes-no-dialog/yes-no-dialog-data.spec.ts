import { YesNoDialogData } from './yes-no-dialog-data';

describe('DialogData', () => {
  it('should create an instance', () => {
    expect(new YesNoDialogData('Some question')).toBeTruthy();
  });
});
