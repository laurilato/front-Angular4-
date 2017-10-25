import { Component, OnInit } from '@angular/core';
import * as Global from '../../../provider/globals';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  loadAPI: Promise<any>;

  constructor() { }

  ngOnInit() {
      this.loadAPI = new Promise((resolve) => {
          console.log('resolving promise');
          Global.loadScript();
      });
  }

}
