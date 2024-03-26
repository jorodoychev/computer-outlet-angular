import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {matchPasswordsValidator} from "../../shared/utils/match-passwords-validator";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerFailed: boolean | undefined

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  })

  get passGroup() {
    return this.form.get('passGroup')
  }


  register(): void {

    if (this.form.invalid) {
      return
    }

    const {
      email,
      username,
      passGroup: {password, rePassword} = {},
    } = this.form.value


    this.userService.register(username!, email!, password!, rePassword!).subscribe({
      next: () => {
        this.router.navigate(['/catalog']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.registerFailed = true
        }
      }

    })
  }
}
