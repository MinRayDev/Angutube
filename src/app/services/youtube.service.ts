import { inject, Injectable } from '@angular/core';
import {environment} from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL
const API_KEY = environment.API_KEY

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private readonly http: HttpClient = inject(HttpClient)

  getVideos(query: string, maxResults: number = 10) {
    const url = `${API_URL}?part=snippet&type=video&videoDuration=medium&&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${API_KEY}`;
    return this.http.get(url);
  }
}
