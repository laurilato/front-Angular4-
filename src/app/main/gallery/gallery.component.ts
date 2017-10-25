import { ElementRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule, Routes, Params }  from '@angular/router';
import * as Global from '../../provider/globals';

// Component management
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit {
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
          CateroryToggle();
          $('.pagination').rPage();

      });
    `;
    this._elementRef.nativeElement.appendChild(s);
  }

}
