import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  
  onRegister() {
    this.authService.registerUser(this.name, this.email, this.username, this.password, this.confirmPassword)
      .subscribe(
        (response) => {
          console.log('Inscription réussie :', response);
        },
        (error) => {
          console.error('Erreur d\'inscription :', error);
        }
      );
  }

}
