import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CookieService } from 'ngx-cookie-service';
import { ProfileEditComponent } from './components/profile-edit/profile-edit/profile-edit.component';
import { AdminGuard } from './guards/adminGuard/admin.guard';
import { LogoutService } from './services/logout/logout.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    QuestionsComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ForgotPasswordComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    CookieService,
    AdminGuard,
    LogoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
