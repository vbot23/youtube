import {Injectable, Inject} from "@angular/core";
import {YOUTUBE_KEY_CONFIG, YOUTUBE_URL_CONFIG} from "./constants";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {SearchResult} from "./search-result.model";


export const YOUTUBE_API_KEY: string = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
export const YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';


@Injectable()
export class YoutubeService {
  constructor(@Inject(YOUTUBE_KEY_CONFIG) private apiKey:string,
              @Inject(YOUTUBE_URL_CONFIG) private apiUrl:string,
              private http:Http) {
  }


  search(query:string):Observable<SearchResult[]> {
    let params:string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');
    let queryUrl:string = `${this.apiUrl}?${params}`;
    return this.http.get(queryUrl)
      .map((response:Response) => {
        return (response.json()).items.map(item => {
          // console.log("raw item", item); // uncomment if you want to debug
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          });
        });
      });
  }
}

//     return this.http.get(queryUrl)
//       .map((res: Response) => res.json().items)
//       .map(item => new SearchResult({
//         id: item.id.videoId,
//         title: item.snippet.title,
//         description: item.snippet.description,
//         thumbnailUrl: item.snippet.thumbnails.high.url
//       }));
//   }
// }

