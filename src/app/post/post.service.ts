import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../types/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3030/jsonstore/computer-outlet/'

  constructor(private http: HttpClient) {
  }

  getPosts() {
    return this.http.get<Post[]>(this.apiUrl)
  }

  getPost(postId: string) {
    return this.http.get<Post>(this.apiUrl + postId)
  }

  createPost(postData: { imgUrl: string; description: string; title: string }) {
    return this.http.post<Post>(this.apiUrl, postData)
  }

  updatePost(postId: string, postData: string) {
    return this.http.put<Post>(this.apiUrl + postId, postData)
  }

  deletePost(postId: string) {
    return this.http.delete(this.apiUrl + postId)
  }
}
