import { ElementRef, Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { AuthService } from '../../provider/service/auth.service';
import * as Global from '../../provider/globals';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
    loadAPI: Promise<any>;
    s3Url = Global.s3Url;
    user: any = [];
    constructor(private _elementRef: ElementRef, private authService: AuthService, private _zone: NgZone) { 
            this.user = Global.getUser();
    }

    ngOnInit() {
        this.loadAPI = new Promise((resolve) => {
            console.log('resolving promise');
            Global.loadScript();
        });
    }
    ngAfterViewInit() {
        var s = document.createElement("script");
        s.text = `    
            if ($(window).width() < 1900) {
            BadgeSlider();
            }
            $(window).resize(function () {
            BadgeSlider();
            //InfoSlide();
            });

            if ($(window).width() < 481) {
            window.addEventListener('orientationchange', function() {
              InfoSlide();
            }, false);
            }
            EditProfile();   
        `;
        this._elementRef.nativeElement.appendChild(s);
    }

}
