import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent {

  now!: number;

    constructor() {
        setInterval(() => {
          this.now = Date.now();
        }, 1);
    }

  
}
