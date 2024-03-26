import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../types/post";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getPosts() {
    return this.http.get<Post[]>(`http://localhost:3030/jsonstore/computer-outlet/`);
  }

  getPost(postId: string) {
    return this.http.get<Post>(`http://localhost:3030/jsonstore/computer-outlet/${postId}`);
  }

  createPost(postData: string) {
    return this.http.post<Post>(`http://localhost:3030/jsonstore/computer-outlet/`, postData);
  }

  updatePost(postId: string, postData: string) {
    return this.http.put<Post>(`http://localhost:3030/jsonstore/computer-outlet/${postId}`, postData);
  }

  deletePost(postId: string) {
    return this.http.delete(`http://localhost:3030/jsonstore/computer-outlet/${postId}`);
  }


}
