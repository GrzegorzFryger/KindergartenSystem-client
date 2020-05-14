import {animate, state, style, transition, trigger} from '@angular/animations';

export const fadeAnimation = trigger('move', [
  state('initial', style({
    display: 'none',
  })),
  state('final', style({
    transform: 'translate3d(0, 0, 0px)',
  })),
  transition('initial=>final', animate('500ms 500ms cubic-bezier(0.35, 0, 0.25, 1)')),
  transition('final=>initial', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
]);

export const fadeAnimation2 = trigger('move2', [
  state('initial', style({})),
  state('final', style({
    transform: 'translate3d(0, -100%, 0px)',
    display: 'none'
  })),
  transition('initial=>final', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
  transition('final=>initial', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
]);
