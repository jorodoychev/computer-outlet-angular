import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {UserRoutingModule} from "./user-routing.module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MyPostsComponent } from './my-posts/my-posts.component';
import { MyPostComponent } from './my-post/my-post.component';



@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        MyPostsComponent,
        MyPostComponent
    ],
    exports: [
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
