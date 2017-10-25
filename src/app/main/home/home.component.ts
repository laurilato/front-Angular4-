import { Component, ElementRef, OnInit, AfterViewInit, NgZone } from '@angular/core';
import * as Global from '../../provider/globals';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
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
        HomeBannerOverlay();
        HomeGalleryGrid();
        if ($(window).width() < 768) {
        HomeInfoSlide();
        }
        function recaptchaCallback(){
        var testObject = {'verify': 1};
        localStorage.setItem('bot',JSON.stringify(testObject));
        }
        `;
        this._elementRef.nativeElement.appendChild(s);
    }

}
