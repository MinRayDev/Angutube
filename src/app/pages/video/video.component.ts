import {Component, inject, OnInit} from '@angular/core';
import {PlaylistService} from '../../services/playlist.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-video',
  imports: [
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute)
  private readonly playlistService: PlaylistService = inject(PlaylistService)

  id: string | null = this.route.snapshot.paramMap.get('id');
  title!: string;

  ngOnInit(): void {
    this.title = this.playlistService.getTitle(this.id ?? "");
  }

  remove(id: string | null) {
    if (!id) return;
    this.playlistService.remove(id);
  }
}

