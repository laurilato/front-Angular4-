import { Component, OnInit } from '@angular/core';
import * as Global from '../../../provider/globals';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  loadAPI: Promise<any>;

  constructor() { }

  ngOnInit() {
      this.loadAPI = new Promise((resolve) => {
          console.log('resolving promise');
          Global.loadScript();
      });
  }

}
