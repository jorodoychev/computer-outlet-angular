import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchSubject$$ = new Subject<string>()

  searchAction$ = this.searchSubject$$.asObservable()

  search(query: string) {
    this.searchSubject$$.next(query)
  }
}
