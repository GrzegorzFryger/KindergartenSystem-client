import {animate, keyframes, style, transition, trigger} from '@angular/animations';

export const move = trigger('move', [
  transition('false=>true', [
    animate('800ms cubic-bezier(0.35, 0, 0.25, 1)', keyframes([
      style({transform: 'translate3d(0,-100%, 0px)'}),
      style({transform: 'translate3d(0, 0px, 0px)'})
    ]))
  ])]);

export const moveSecond = trigger('moveSecond', [
  transition('false=>true', [
    animate('900ms  cubic-bezier(0.35, 0, 0.25, 1)', keyframes([
      style({transform: 'translate3d(0,-100%, 0px)'}),
      style({transform: 'translate3d(0, 0px, 0px)'})
    ]))
  ])]);
