import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  {path:'users',component: UsersComponent},
  {path:'questions',component: QuestionsComponent},
  {path:'',redirectTo : 'questions',pathMatch:'full'},
  {path:'login',component : LoginComponent},
  {path:'register',component : RegisterComponent},
  {path:'admin',component : AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
