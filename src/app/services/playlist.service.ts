import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Video} from '../entities/video';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  readonly playlist: BehaviorSubject<Video[]> = new BehaviorSubject<Video[]>(this.getPlaylist());
  constructor(private readonly authService: AuthService) { }


  getPlaylist(): Video[] {
    if (!this.authService?.currentUserValue) {
      return []
    }
    const savedPlaylists: string | null = localStorage.getItem('playlists');
    const playlists = savedPlaylists ? JSON.parse(savedPlaylists) : {};
    return playlists[this.authService.currentUserValue.email] ?? [];
  }

  savePlaylist(playlist: Video[]) {
    const savedPlaylists: string | null = localStorage.getItem('playlists');
    const playlists = savedPlaylists ? JSON.parse(savedPlaylists) : {};
    playlists[this.authService.currentUserValue.email] = playlist;
    localStorage.setItem('playlists', JSON.stringify(playlists));
    this.playlist.next(playlist);
  }

  add(video: Video) {
    const playlist: Video[] = this.getPlaylist()
    playlist.push(video);
    console.log(playlist)
    this.savePlaylist(playlist);
  }

  remove(videoId: string): boolean {
    const playlist: Video[] = this.getPlaylist()
    const updatedPlaylist = playlist.filter(video => video.id !== videoId);

    if (updatedPlaylist.length === playlist.length) {
      return false;
    }
    this.savePlaylist(updatedPlaylist);
    return true;
  }

  getTitle(videoId: string): string {
    const playlist: Video[] = this.getPlaylist()
    const video = playlist.find(video => video.id === videoId);
    return video?.title ?? '';
  }
}
