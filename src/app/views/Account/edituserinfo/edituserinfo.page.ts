import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edituserinfo',
  templateUrl: './edituserinfo.page.html',
  styleUrls: ['./edituserinfo.page.scss'],
})
export class EdituserinfoPage implements OnInit {

  user = {
    name: '',
    about_me: '',
    facebook: '',
    website: '',
  };

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  updateProfile() {
    this.userService.updateUserProfile(this.user).subscribe({
      next: (response) => {
        alert('Profil mis à jour avec succès');
        // Redirection ou autre action après la mise à jour
      },
      error: (error) => {
        alert(error);
      },
    });
  }
}
