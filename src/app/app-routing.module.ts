import { RouterModule, Routes, Params } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import dev Define Component
import { CommunityComponent } from './community/community.component';
import { ContactComponent } from './contact/contact.component';
import { AuthComponent } from './auth/auth.component';
import { ForgotComponent } from './auth/forgot/forgot.component';

// import authGuard Service
import { AuthGuard } from './provider/auth.guard';

// Definition Routing
export const routes: Routes = [
    // Landing page
    { path: 'index', component: AuthComponent },
    // Main page
    { path: 'cms', component: CommunityComponent} ,
    { path: 'contact', component: ContactComponent },
    { path: 'changepassword/:token', component: ForgotComponent },
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: false});
// export const routing: ModuleWithProviders = RouterModule.forRoot(routes);