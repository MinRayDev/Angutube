import {Component, OnInit} from '@angular/core';
import {NgClass, NgStyle, SlicePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {RouterLink} from '@angular/router';
import {PlaylistService} from '../../services/playlist.service';
import {Video} from '../../entities/video';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgClass,
    NgStyle,
    RouterLink,
    SlicePipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  user!: {"email": string, "username": string, "password": string}
  isLoggedIn = false;
  videos: Video[] = [];
  constructor(private readonly authService: AuthService, private readonly playlistService: PlaylistService) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.user = user;
    });
    this.playlistService.playlist.subscribe(playlist => {
      this.videos = playlist;
    })
    this.videos = this.playlistService.getPlaylist();
  }
}
