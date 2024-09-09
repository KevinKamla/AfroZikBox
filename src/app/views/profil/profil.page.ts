/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  
  selectedSegment: string = 'Chansons';

  email: string = '';  

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create(); 

    // Récupérer les informations utilisateur stockées
    const user = await this.storage.get('user');
    if (user) {
      this.email = user.email;  // Assigner l'email stocké à la variable
    }
  }

}
