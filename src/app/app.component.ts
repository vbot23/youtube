import {Component, Inject} from "@angular/core";
import {HTTP_PROVIDERS, Http} from "@angular/http";
import {SearchResult} from "./search-result.model";
import "rxjs/add/operator/map";
import {YoutubeService, YOUTUBE_API_KEY, YOUTUBE_API_URL} from "./youtube.service";
import {YOUTUBE_KEY_CONFIG, YOUTUBE_URL_CONFIG} from "./constants";
import {SearchComponent} from "./search/search.component";
import {SearchResultComponent} from "./search-result/search-result.component";
// declare var require: any
// let loadingGif: string = ((<any>window).__karma__) ? '' : require('images/loading.gif');

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [YoutubeService, HTTP_PROVIDERS, {provide: YOUTUBE_KEY_CONFIG, useValue: YOUTUBE_API_KEY} , {provide: YOUTUBE_URL_CONFIG, useValue: YOUTUBE_API_URL}],
  directives: [SearchResultComponent, SearchComponent]
})
export class AppComponent {
  title = 'app works!';
  results: SearchResult[];
  constructor(@Inject(YOUTUBE_KEY_CONFIG) private apiKey:string,
              @Inject(YOUTUBE_URL_CONFIG) private apiUrl:string,
              private http:Http) {}
  updateResults(results: SearchResult[]) {
    this.results = results;
    console.log(results);
  }
  // search() {
  //   console.log(this.apiKey);
  // }
  // search(query:string) {
  //   let params:string = [
  //     `q=${query}`,
  //     `key=${this.YOUTUBE_API_KEY}`,
  //     `part=snippet`,
  //     `type=video`,
  //     `maxResults=10`
  //   ].join('&');
  //   let queryUrl:string = `${this.YOUTUBE_API_URL}?${params}`;
  //   this.http.get(queryUrl)
  //     .map(res => res.json().items.map(item => console.log(item)))
  //     // .map(item => item)
  //     .subscribe(item => console.log(item));

      // .map((response:Response) => {
      //   return response.json().items.map(item => {
      //     console.log("raw item", item); // uncomment if you want to debug
      //   });
      // });
}





