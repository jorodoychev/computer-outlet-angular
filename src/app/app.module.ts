import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PostModule} from "./post/post.module";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {UserModule} from "./user/user.module";
import {NotFoundComponent} from "./not-found/not-found.component";
import {FormsModule} from "@angular/forms";
import {SearchService} from "./search.service";


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    UserModule,
    PostModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
