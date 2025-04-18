import {Component, inject, OnInit} from '@angular/core';
import {PlaylistService} from '../../services/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

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
  private router: Router = inject(Router)

  id: string | null = this.route.snapshot.paramMap.get('id');
  title!: string;

  safeUrl!: SafeResourceUrl;

  constructor(private readonly sanitizer: DomSanitizer) {}

  private updateVideoData(): void {
    this.title = this.playlistService.getTitle(this.id ?? '');
    console.log(this.id, this.title);
    if (this.id) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.id}`
      );
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.updateVideoData();
    });
  }

  remove(id: string | null) {
    if (!id) return;
    this.playlistService.remove(id);
  }
}

