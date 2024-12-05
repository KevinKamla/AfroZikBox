import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Share } from '@capacitor/share';
import { NavController, AlertController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.page.html',
  styleUrls: ['./eventdetail.page.scss'],
})
export class EventdetailPage implements OnInit {
  eventId: any; // ID de l'événement à rejoindre
  type: 'join' | 'unjoin' = 'join'; // Par défaut, on rejoint
  isJoined!: any;
  constructor(
    private navCtrl: NavController,
    public route: Router,
    private routes: ActivatedRoute,
    private eventService: EventService,
    private alertController: AlertController // Ajout de l'AlertController
  ) {}

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }
  achats: any;
  achat: any;
  cover: any;
  url: any;

  ngOnInit() {
    this.achat = this.routes.snapshot.paramMap.get('id');
    console.log(this.achat, 'achatttt');
    const storedAlbum = localStorage.getItem('selectedArticle');

    if (storedAlbum) {
      // Convertir la chaîne JSON en un objet
      this.achats = JSON.parse(storedAlbum);
      console.log(this.achats, 'achatttt');
      this.eventId = this.achats.event_id;
      console.log(this.eventId);
      this.cover = this.achats.image;
      this.url = this.achats.url;
    } else {
      console.log("Aucun album n'est stocké dans le localStorage");
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
  copyLinkAndRedirect(url: any) {
    const artistLink = this.achats.url; // Remplacez par l'URL appropriée
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('Lien copié :', url);
        // window.open(url, '_blank'); // Ouvre le lien dans un nouvel onglet
      })
      .catch((err) => {
        console.error('Erreur lors de la copie du lien :', err);
      });
  }

  joinEvent(eventId: any) {
    this.eventService.joinEvent(eventId, this.type).subscribe({
      next: (response) => {
        console.log('Événement rejoint avec succès', response);

        // Mise à jour de l'état local
        if (response.type === 'join') {
          this.isJoined = 'join';
          this.addToLocalStorage(eventId);
        } else {
          this.isJoined = 'unjoin';
          this.removeFromLocalStorage(eventId);
        }

        // Affichage de l'alerte
        this.showAlert(
          'Succès',
          `Événement ${
            response.type === 'join' ? 'rejoint' : 'quitté'
          } avec succès !`
        );
      },
      error: (error) => {
        console.error("Erreur lors du joint de l'événement", error);
        this.showAlert('Erreur', "Erreur lors du joint de l'événement.");
      },
    });
  }

  // Ajouter l'ID de l'événement au localStorage
  addToLocalStorage(eventId: any) {
    let joinedEvents = JSON.parse(localStorage.getItem('joinedEvents') || '[]');
    if (!joinedEvents.includes(eventId)) {
      joinedEvents.push(eventId);
      localStorage.setItem('joinedEvents', JSON.stringify(joinedEvents));
    }
  }

  // Supprimer l'ID de l'événement du localStorage
  removeFromLocalStorage(eventId: any) {
    let joinedEvents = JSON.parse(localStorage.getItem('joinedEvents') || '[]');
    joinedEvents = joinedEvents.filter((id: any) => id !== eventId);
    localStorage.setItem('joinedEvents', JSON.stringify(joinedEvents));
  }

  // Vérifier si l'utilisateur a déjà rejoint l'événement
  isEventJoined(eventId: any): boolean {
    const joinedEvents = JSON.parse(
      localStorage.getItem('joinedEvents') || '[]'
    );
    return joinedEvents.includes(eventId);
  }

  ionViewWillEnter() {
    const eventId = this.achats.id; // Remplacez par l'ID de l'événement en cours
    this.isJoined = this.isEventJoined(eventId) ? 'join' : 'unjoin';
  }
  

  buyTicket(eventId: any) {
    this.eventService.buyTicket(eventId).subscribe({
      next: (response) => {
        console.log('Réponse de succès:', response);

        // Vérifie si le statut est 200 pour afficher une alerte de succès
        if (response.status === 200) {
          this.showAlert(
            'Succès',
            response.message || 'Ticket acheté avec succès !'
          );
        } else {
          // En cas d'autre statut, affiche une alerte d'erreur
          this.showAlert(
            'Erreur',
            response.error || "Une erreur s'est produite."
          );
        }
      },
      error: (error) => {
        console.error("Erreur lors de l'achat du billet:", error);

        // En cas de requête échouée (statut HTTP 4xx ou 5xx)
        const errorMessage =
          error.error?.error || "Une erreur inattendue s'est produite.";
        this.showAlert('Erreur', errorMessage);
      },
    });
  }

  // Nouvelle méthode pour afficher une alerte
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
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
