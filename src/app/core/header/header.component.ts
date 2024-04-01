import {Component} from '@angular/core';
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";
import {SearchService} from "../../search.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private router: Router) {
  }
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement
    this.searchService.search(target.value)
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged
  }


  logout() {
    this.userService.logout()
    this.router.navigate(['/login'])
  }

}
