import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-achatdetail',
  templateUrl: './achatdetail.page.html',
  styleUrls: ['./achatdetail.page.scss'],
})
export class AchatdetailPage implements OnInit {
  eventId: any; // ID de l'événement à rejoindre
  type: 'join' | 'unjoin' = 'join'; // Par défaut, on rejoint
  isJoined!:any;
  constructor(
    private navCtrl: NavController,
    public route: Router,
    private routes: ActivatedRoute,
    private eventService: EventService,
    private alertController: AlertController // Ajout de l'AlertController

  ) { }
 

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }
  achats:any;
  achat:any;
  cover:any;
  url:any;
  
  ngOnInit() {
    this.achat = this.routes.snapshot.paramMap.get('id');
    console.log(this.achat, 'achatttt');
    const storedAlbum = localStorage.getItem('selectedArticle');

    if (storedAlbum) {
      // Convertir la chaîne JSON en un objet
      this.achats = JSON.parse(storedAlbum);
      console.log(this.achats, 'achatttt');
      this.eventId = this.achats.event_id;
      console.log(this.eventId)
      this.cover =this.achats.event.image;
      this.url = this.achats.url;
    } else {
      console.log('Aucun album n\'est stocké dans le localStorage');
    }
  }
  public alertActionreeButtons = [
    {
      text: 'Partager',
      role: 'confirm',
      handler: () => { 
        this.shareMusicLink();
      },
    },
    {
      text: 'Copier',
      role: 'cancel',
      handler: () => {
        this.copyLinkAndRedirect(this.achats.event.url);
      },
    },
  ];
  copyLinkAndRedirect(url:any) {
    const artistLink = this.achats.url; // Remplacez par l'URL appropriée
    navigator.clipboard.writeText(url).then(() => {
      console.log('Lien copié :', url);
      // window.open(url, '_blank'); // Ouvre le lien dans un nouvel onglet
    }).catch(err => {
      console.error('Erreur lors de la copie du lien :', err);
    });
  }

  joinEvent() {
    this.eventService.joinEvent(this.eventId, this.type).subscribe({
      next: (response) => {
        console.log('Événement rejoint avec succès', response);
        this.isJoined=response.type;
        console.log(this.isJoined)
        this.showAlert('Succès', `Événement ${JSON.stringify(response.type)} avec succès !`); // Correction de la popup de succès
      },
      error: (error) => {
        console.error('Erreur lors du joint de l\'événement', error);
        this.showAlert('Erreur', 'Erreur lors du joint de l\'événement.'); // Correction de la popup d'erreur
      }
    });
  }
  buyTicket() {
    this.eventService.buyTicket(this.eventId).subscribe({
      next: (response) => {
        console.log('Ticket acheté avec succès', response);
        this.showAlert('Succès', `${JSON.stringify(response.message)}`); // Correction de la popup de succès

        // Gérer le succès ici (afficher un message, mettre à jour l'interface, etc.)
      },
      error: (error) => {
        console.error('Erreur lors de l\'achat du billet', error);
        this.showAlert('Erreur', 'Erreur lors de l\'achat du ticket.'); // Correction de la popup d'erreur

        // Gérer l'erreur ici
      }
    });
  }

  // Nouvelle méthode pour afficher une alerte
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async shareMusicLink() {
    try {
      await Share.share({
        title: 'Partager ceci !',
        text: 'Découvrez cette evenement incroyable !',
        url: this.url,
        dialogTitle: 'Partager l evenement',
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  }

}
