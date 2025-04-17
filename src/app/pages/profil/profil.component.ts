import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  username: string = '';
  email: string = '';

  constructor(private readonly authService: AuthService) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.username = currentUser.username;
      this.email = currentUser.email;
    }
  }
}
