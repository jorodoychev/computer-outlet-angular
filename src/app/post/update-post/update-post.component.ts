import {Component, OnInit,} from '@angular/core';
import {PostService} from "../post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Post} from "../../../types/post";

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  updatePostFailed: boolean | undefined
  post: Post = {} as Post
  postId: string | undefined


  postData: {
    title: string;
    imgUrl: string;
    description: string;
    price: string;
    likes: number;
    users_liked: string[];
    _id: string
  } = {} as Post


  constructor(
    private apiService: PostService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      this.postId = data['postId']
    })

    if (this.postId) {
      this.apiService.getPost(this.postId).subscribe((post: Post) => {
        this.post = post
        this.postData = {
          title: this.post.title,
          imgUrl: this.post.imgUrl,
          description: this.post.description,
          price: this.post.price,
          likes: this.post.likes,
          users_liked: [this.post.userId],
          _id: this.post._id
        }
      })
    }
  }

  updatePost(form: NgForm) {

    if (form.invalid) {
      return
    }

    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const userId = user ? user._id : undefined

    const postData = {
      title: form.value.title,
      imgUrl: form.value.imgUrl,
      description: form.value.description,
      price: form.value.price,
      created_at: new Date(),
      userId: userId,
      likes: this.post.likes,
      users_liked: [this.post.userId],
      _id: this.post._id
    }

    if (this.postId) {
      this.apiService.updatePost(this.postId, postData)
        .subscribe({
          next: () => {
            this.router.navigate(['/catalog'])
          },
          error: (err) => {
            if (err.status === 409) {
              this.updatePostFailed = true
            }
          }
        })

    }

  }
}
