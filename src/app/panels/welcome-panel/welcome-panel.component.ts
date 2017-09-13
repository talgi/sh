import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { trigger, state, style, transition, animate, keyframes, Input } from '@angular/core';


@Component({
  selector: 'app-welcome-panel',
  templateUrl: './welcome-panel.component.html',
  styleUrls: ['./welcome-panel.component.css'],
  animations: [
    trigger(/*'focusButton'*/'focusPanel', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        
        transform: 'scale(1.12)',
        opacity: 0.7,
        border: '2px solid #3fb5b7',
         
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
    /*    trigger('note', [
          state('inactive', style({
            opacity: '0'
          })),
          state('active', style({
            opacity: '1'
          })),
          transition('inactive => active', [
            animate(300, keyframes([
              style({opacity: 0, transform: 'translateY(0)', offset: 0}),
              style({opacity: 1, transform: 'translateY(-15px)', offset: 0.6}),
              style({opacity: 1, transform: 'translateY(0)', offset: 1}),
            ]))
          ]),
          transition('active => inactive', [
            animate(300, keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: 1, transform: 'translateY(-15px)', offset: 0.7}),
              style({opacity: 0, transform: 'translateY(100%)', offset: 1}),
            ]))
          ])
        ]),
        trigger('itemEnter', [
          state('in', style({transform: 'translateY(0)'})),
    
          transition('void => *', [
            style({transform: 'translateY(-100%)', opacity: 0}),
            animate('300ms ease-out')
          ]),
          transition('* => void', [
            animate('300ms ease-out', style({transform: 'scaleY(0) translateY(200px)'}))
          ])
        ])*/
  ]
})
export class WelcomePanelComponent implements OnInit {

  state: string = 'inactive';
  constructor(private router: Router) { }


  ngOnInit() {
  }

  toggleFocus() {
    this.state = (this.state === 'inactive' ? 'active' : 'inactive');
  }

  toggle() {
    this.state = (this.state === 'inactive' ? 'active' : 'inactive');
  }

  onClick() {
    console.log("onClick()");
    this.router.navigate(['/rooms']);
  }
}
