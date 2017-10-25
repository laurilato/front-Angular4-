import { Component, OnInit } from '@angular/core';
import * as Global from '../../../provider/globals';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  loadAPI: Promise<any>;

  constructor() { }

  ngOnInit() {
      this.loadAPI = new Promise((resolve) => {
          console.log('resolving promise');
          Global.loadScript();
      });
  }


}
