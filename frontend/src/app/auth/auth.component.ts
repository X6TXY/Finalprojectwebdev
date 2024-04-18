import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isSignUp: boolean = false;

  toggleSignUp(): void {
    this.isSignUp = !this.isSignUp;
  }
}
