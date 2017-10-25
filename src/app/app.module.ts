import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';

import { EqualValidator } from './provider/directives/equal-validator.directive';

// import dev define component
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { CommunityComponent } from './community/community.component';
import { ContactComponent } from './contact/contact.component';
import { ForgotComponent } from './auth/forgot/forgot.component';

// import main module
import { MainModule } from './main/main.module';

// import Routing Module
import { routing } from './app-routing.module';

// import auth service
import { AuthGuard } from './provider/auth.guard';
import { AuthService } from './provider/service/auth.service';

// file upload service
import { FileUploadService } from './provider/service/file-upload.service';

// import component concerned with firebase
import { AngularFireModule } from 'angularfire4';
import { AngularFireAuth } from 'angularfire4/auth';

// export firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyDUVMEXr4zSH2A15GH7kjmfYjZBIA82TjY",
  authDomain:"desktopnexus-a4399.firebaseapp.com",
  databaseURL: "https://desktopnexus-a4399.firebaseio.com",
  projectId: "desktopnexus-a4399",
  storageBucket: "desktopnexus-a4399.appspot.com",
  messagingSenderID:"23294922657"
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CommunityComponent,
    ContactComponent,
    ForgotComponent,
    EqualValidator,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MainModule,
    routing,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AuthService, AuthGuard, AngularFireAuth, FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
