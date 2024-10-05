import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit/profile-edit.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminGuard } from './guards/adminGuard/admin.guard';
import { AnswersComponent } from './components/answers/answers.component';


const routes: Routes = [
  {path:'users',component: UsersComponent},
  {path:'questions',component: QuestionsComponent},
  {path:'',redirectTo : 'questions',pathMatch:'full'},
  {path:'login',component : LoginComponent},
  {path:'register',component : RegisterComponent},
  {path:'admin',component : AdminComponent,canActivate: [AdminGuard]},
  {path:'password-reset',component : ForgotPasswordComponent},
  {path:'edit-profile',component : ProfileEditComponent, canActivate: [AuthGuard]},
  {path: 'answers/:questionId',component: AnswersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
