import {Component, OnInit, ElementRef, EventEmitter} from '@angular/core';
import {SearchResult} from "../search-result.model";
import {YoutubeService} from "../youtube.service";
import {Observable} from "rxjs/Rx";

@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  outputs: ['loading', 'results'],
})
export class SearchComponent implements OnInit {

  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();
  constructor(private youtubeService: YoutubeService, private el: ElementRef) {}

  ngOnInit() {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .filter((text: string) => text.length > 1)
      .debounceTime(250)
      .do(() => this.loading.emit(true))
      .map((query: string) => this.youtubeService.search(query))
      .switch()
      .subscribe(
        (results: SearchResult[]) => {   //success
          this.loading.emit(false);
          this.results.emit(results);
        },
        (err: any) => {                     //error
          console.log(err);
          this.loading.emit(false);
        },
        () => {                             //complete
          this.loading.emit(false);
        }
      )
  }
}
