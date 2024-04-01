import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../../../types/post";
import {PostService} from "../post.service";
import * as moment from 'moment';
import {Subscription} from "rxjs";
import {SearchService} from "../../search.service";


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  isLoading: boolean = true
  posts: Post[] | null = []
  filteredPosts: Post[] | null = []
  private searchSubscription: Subscription | undefined

  constructor(private api: PostService, private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchSubscription = this.searchService.searchAction$.subscribe(searchString => {
      if (searchString) {
        this.filteredPosts = (this.posts || []).filter(post =>
          post.title.toLowerCase().includes(searchString.toLowerCase()) ||
          post.description.toLowerCase().includes(searchString.toLowerCase())
        );
      } else {
        this.filteredPosts = this.posts
      }
    });

    this.api.getPosts().subscribe(posts => {
      this.posts = Object.values(posts)
        .map(post => ({...post, timeSinceCreation: moment(post.created_at).fromNow()}))
      this.filteredPosts = this.posts
      this.isLoading = false
    })

  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe()
  }
}
