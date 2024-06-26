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

  get isLiked() {
    return this.post.users_liked && this.post.userId && this.post.users_liked.includes(this.post.userId)
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
    this.apiService.increaseLikes(this.post)
  }

  deletePost() {
    if (this.isOwner) {
      if (this.post._id) {
        if (window.confirm("Are you sure you want to delete yours post?")) {
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
}
