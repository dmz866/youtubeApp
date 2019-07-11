import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService
{
  youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  apiKey = 'AIzaSyC1D0IMlVHSPTLysKrZT35xQZaW6lk8_m4';
  playList = 'UUa90xqK2odw1KV5wHU9WRhg';
  nextPageToken;

  constructor(private http: HttpClient) { }

  getVideos()
  {
    const params = new HttpParams().set('part', 'snippet')
    .set('maxResults', '10')
    .set('playlistId', this.playList)
    .set('key', this.apiKey );

    if(this.nextPageToken)
    {
      params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(`${ this.youtubeUrl }/playlistItems/`, { params: params } )
    .pipe( map((data: any) => {

      this.nextPageToken = data.nextPageToken;
     //console.log(this.nextPageToken);

      const videos: any[] = [];
      for ( const video of data.items)
      {
        const snippet = video.snippet;
        videos.push(snippet);
      }

      return videos;
    }) );
  }
}
