import {Component} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFailed: boolean | undefined

  constructor(private userService: UserService, private router: Router) {
  }

  login(form: NgForm) {
    if (form.invalid) {
      return
    }

    this.userService.login(form.value.email, form.value.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/catalog'])
        },
        error: (err) => {
          if (err.status === 403) {
            this.loginFailed = true
          }
        }
      })

  }

}
