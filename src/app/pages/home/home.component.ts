import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {YoutubeService} from '../../services/youtube.service';
import {SlicePipe} from '@angular/common';
import {PlaylistService} from '../../services/playlist.service';
import {Video} from '../../entities/video';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    SlicePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  searchQuery: string = "";
  videos: Video[] = [];
  isLoggedIn = false;
  private readonly authService: AuthService = inject(AuthService)
  private readonly youtubeService: YoutubeService = inject(YoutubeService)
  private readonly playlistService: PlaylistService = inject(PlaylistService)

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  search(): void {
    console.log('Search query:', this.searchQuery);
    this.youtubeService.getVideos(this.searchQuery).subscribe(response => {
      this.videos = (response as any).items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title
      }) as Video);
      for (let video of this.videos) {
        console.log(video);
      }
    });
  }

  add(video: Video) {
    this.playlistService.add(video);
  }
}
