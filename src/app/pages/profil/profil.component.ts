import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  username: string = '';
  email: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('Profil');
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.username = currentUser.username;
      this.email = currentUser.email;
    }
  }
}
