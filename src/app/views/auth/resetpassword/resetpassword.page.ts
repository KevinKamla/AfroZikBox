import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  email: string = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  forgotPassword() {
    if (this.email) {
      this.authService.forgotPassword(this.email).subscribe({
        next: (response) => {
          console.log('Demande de réinitialisation du mot de passe envoyée', response);
          if (response.status === 200) {
            console.log('Mot de passe réinitialisé avec succès');
            alert('Votre mot de passe a été réinitialisé. Veuillez vérifier votre e-mail.');
            this.router.navigate(['/tabs']);
          } else {
            console.log('Instructions de réinitialisation envoyées');
            alert('Les instructions de réinitialisation ont été envoyées à votre adresse e-mail.');
          }
        },
        error: (error) => {
          console.error('Erreur lors de la demande de réinitialisation du mot de passe', error);
          alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
        }
      });
    } else {
      console.error('Veuillez entrer une adresse e-mail');
      alert('Veuillez entrer une adresse e-mail valide.');
    }
  }
}
