import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { AuthService } from '../provider/service/auth.service';
import * as Global from '../provider/globals';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  loadAPI: Promise<any>;

  constructor( private router: Router, private http: Http, private authService: AuthService) {
  }
  name: string = "Wallpapers";
  names: string[] = ["Members", "Groups", "Wallpapers"];

  ngOnInit() {
    this.loadAPI = new Promise((resolve) => {
        console.log('resolving promise');
        Global.loadScript();
    });
  }

  clicked(value: string): void {
    switch(value){
      case 'Members': {
        this.router.navigate(['search-member']);
        break;
      }
      case 'Wallpapers': {
        this.router.navigate(['search-wallpaper']);
        break;
      }
      default :{
        break;
      }
    }
  }

  fileUpload(event) {
    let filelist: FileList = event.target.files;
    if(filelist.length >0 ){
      let file: File = filelist[0];
      let formData: FormData = new FormData();
      formData.append('photo', file, file.name);
      this.http.post('http://localhost:8083/api/upload', formData)
        .map(res => res.json())
        .subscribe(
          data => console.log(data),
          error => console.log(error)
        )
    }
  }
}
