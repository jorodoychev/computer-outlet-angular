import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../types/post";
import {PostService} from "../post.service";
import * as moment from "moment/moment";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-current-post',
  templateUrl: './current-post.component.html',
  styleUrls: ['./current-post.component.css']
})
export class CurrentPostComponent implements OnInit {
  deletePostFailed: boolean | undefined

  post: Post = {} as Post
  timeSinceCreation: string | undefined


  constructor(
    private apiService: PostService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  get isOwner() {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const currentUserId = user ? user._id : undefined
    return this.post.userId === currentUserId

  }

  get isLoggedIn() {
    return this.userService.isLogged
  }


  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const postId = data['postId']

      this.apiService.getPost(postId).subscribe((post) => {
        this.post = {...post}
        this.timeSinceCreation = moment(post.created_at).fromNow()
      })
    })

  }

  increaseLikes(): void {
    if (this.post._id) {
      if (this.post.timeSinceCreation) {
        const b = this.post.timeSinceCreation
      }
      if (this.post.users_liked.includes(this.post.userId)) {
        return
      }

      this.post.likes += 1
      this.post.users_liked.push(this.post.userId)

      this.apiService.updatePost(this.post._id, this.post).subscribe(
        {
          error: (err) => {
            if (err) {
              console.log(err)
            }
          }

        })

    }
  }

  deletePost() {
    if (this.isOwner) {
      if (this.post._id) {
        this.apiService.deletePost(this.post._id).subscribe({
          next: () => {
            this.router.navigate(['/catalog'])
          },
          error: (err) => {
            if (err.status === 500) {
              this.deletePostFailed = true
            }
          }
        })
      }
    }
  }
}
