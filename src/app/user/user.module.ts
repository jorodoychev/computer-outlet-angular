import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import {UserRoutingModule} from "./user-routing.module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MyPostsComponent } from './my-posts/my-posts.component';



@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    MyPostsComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        RouterModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class UserModule { }
