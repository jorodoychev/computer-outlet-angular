import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PostService} from "../post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  createPostFailed: boolean | undefined

  constructor(private postService: PostService, private router: Router) {
  }

  createPost(form: NgForm) {

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
      likes: 0,
      users_liked: [userId],
      created_at: new Date(),
      userId: userId
    }


    this.postService.createPost(postData)
      .subscribe({
        next: () => {
          this.router.navigate(['/catalog'])
        },
        error: (err) => {
          if (err.status === 409) {
            this.createPostFailed = true
          }
        }
      })

  }
}
