import {Component, OnInit} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgClass,
    NgStyle,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  user!: {"email": string, "username": string, "password": string}
  isLoggedIn = false;

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      console.log(user);
      this.isLoggedIn = !!user;
      this.user = user;
    });
  }

  getUsername(): string {
    return this.user["username"];
  }
}
