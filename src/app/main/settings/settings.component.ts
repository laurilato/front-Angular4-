import { ElementRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Global from '../../provider/globals';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  loadAPI: Promise<any>;
  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
      this.loadAPI = new Promise((resolve) => {
          console.log('resolving promise');
          Global.loadScript();
      });
  }

  ngAfterViewInit() {
    var s = document.createElement("script");
    s.text = `    
      $(function(){
          $('.pagination').rPage();
      });
    `;
    this._elementRef.nativeElement.appendChild(s);
  }

}
