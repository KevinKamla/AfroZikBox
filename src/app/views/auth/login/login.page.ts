import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // email: string = 'PGES';  // 
  // username: string = 'PGES';
  // password: string = 'Faruja@';
  email: string = '';
  password: string = '';
  serverKey: string = 'd012ab7a1e170f66e8ed63176dcc4e7b';
  iosDeviceId: string = 'vjjkblnkghdgfdwxfjgki_yhkn';
  rememberMe: boolean = false; 
  errorMessage ='';

  constructor(private authService: AuthService, private storage: Storage, private router: Router) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const savedUser = await this.storage['get']('user');
    if (savedUser) {
      this.router.navigate(['/tabs']);
    }
  }

  async login() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      console.log('Email ou mot de passe est vide');
      return;
    }

    this.authService.login(this.email, this.password, this.serverKey, this.iosDeviceId).subscribe(
      async (response) => {
        console.log('Connexion réussie', response);

        if(this.email=='PGES' && this.password=='Faruja@'){
          this.router.navigate(['/tabs']);
        }else{
          console.error('identifiants incorrects');
          this.errorMessage = 'identifiants incorrects';
        }
        // Si l'utilisateur a coché "Se souvenir de moi", stocker les informations
        if (this.rememberMe) {
          await this.storage.set('user', { email: this.email });
        }

        // Rediriger vers la page d'accueil
      },
      (error) => {
        console.error('Erreur lors de la connexion', error);
      }
    );
  }
  ngOnInit() {
  }


}
