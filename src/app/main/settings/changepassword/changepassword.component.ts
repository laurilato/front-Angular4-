import { Component, OnInit } from '@angular/core';
import * as Global from '../../../provider/globals';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  loadAPI: Promise<any>;
  constructor() { }

  ngOnInit() {
      this.loadAPI = new Promise((resolve) => {
          console.log('resolving promise');
          Global.loadScript();
      });
  }

}
