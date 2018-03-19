import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { DevicesComponent } from './devices/devices.component';
import { ProfileComponent } from './profile/profile.component';
import { MonetizationComponent } from './monetization/monetization.component';
import { AuthService } from './auth/auth.service';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: MainComponent , canActivate: [AuthService]},
  // { path: '', redirectTo: '/dash', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dash', component: DashComponent , canActivate: [AuthService]},
  { path: 'devices', component: DevicesComponent , canActivate: [AuthService] },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthService] },
  { path: 'monetization', component: MonetizationComponent , canActivate: [AuthService] },
  // { path: '**', redirectTo: '/dash', pathMatch: 'full' }
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
