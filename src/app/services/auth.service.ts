import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') ?? 'null'));
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    const users = localStorage.getItem("registeredUsers")
    if (!users) {
      console.log("No users found.");
      return;
    }
    for (let userStored of JSON.parse(users)) {
      console.log(userStored, email, password)
      if ((email === userStored["email"]) && (password === userStored["password"])) {
        const user = {"username": userStored["username"], "email": email, token: 'fake-jwt-token'};
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }
    }
    return;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(user: any) {
    const savedUsers: string | null = localStorage.getItem('registeredUsers');
    const users: Array<any> = savedUsers ? JSON.parse(savedUsers) : [];
    console.log(users)
    users.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    return true;
  }
}
