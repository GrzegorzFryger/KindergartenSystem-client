import {animate, state, style, transition, trigger} from '@angular/animations';

export const fadeAnimation2 = trigger('paymentTable', [
  state('initial', style({
    width: '100%'
  })),
  state('final', style({
    width: '30%'
  })),
  transition('initial=>final', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
  transition('final=>initial', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
]);

export const fadeAnimation = trigger('paymentChildComponent', [
  state('initial', style({
  })),
  state('final', style({
    width: '70%'
  })),
  transition('initial=>final', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
  transition('final=>initial', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
]);

export const showHide = trigger('hide', [
  state('initial', style({
    display: 'none'
  })),
  state('final', style({
  })),
  transition('initial=>final', animate('0ms')),
  transition('final=>initial', animate('0ms'))
]);

