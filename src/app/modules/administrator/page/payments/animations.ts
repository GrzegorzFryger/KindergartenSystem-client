import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

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
  state('initial', style({})),
  state('final', style({
    width: '70%'
  })),
  transition('initial=>final', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
  transition('final=>initial', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
]);

export const showHide = trigger('show', [
  state('true', style({})),
  state('false', style({
    display: 'none'
  })),
  transition('true=>false', animate('0ms')),
  transition('false=>true', animate('0ms'))
]);

export const childHeader = trigger('childHeader', [
  state('initial', style({
    transform: 'translate3d(100%, 0px, 0px)'
  })),
  state('final', style({
    transform: 'translate3d(0, 0px, 0px)'
  })),
  transition('initial=>final', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
  transition('final=>initial', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
]);


export const refresh = trigger('refresh', [
  state('true', style({})),
  state('false', style({})),
  transition('true => false', [
    animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', keyframes ( [
      style({transform: 'translate3d(0, -100%, 0)', offset: 0}),
      style({transform: 'translate3d(0, 0px, 0)', offset: 1 })
    ]))
  ])
]);


