import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  showSignUp: boolean = true;

  toggleForm() {
    this.showSignUp = !this.showSignUp;
  }
}
