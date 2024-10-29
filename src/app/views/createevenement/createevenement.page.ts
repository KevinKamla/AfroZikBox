import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-createevenement',
  templateUrl: './createevenement.page.html',
  styleUrls: ['./createevenement.page.scss'],
})
export class CreateevenementPage implements OnInit {
  eventData = {
    name: '',
    desc: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    location: '',
    online_url: '',
    real_address: '',
    sell_tickets: '',
    available_tickets: 0,
    ticket_price: 0,
  };
  imageFile: File | null = null;
  videoFile: File | null = null;
  constructor(private yourService: EventService,    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  onImageFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];
    }
  }

  onVideoFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.videoFile = input.files[0];
    }
  }
  onSubmitCreateEvent() {
    if (this.imageFile && this.videoFile) {
      this.yourService.createEvent(this.eventData, this.imageFile, this.videoFile).subscribe({
        next: (response) => {
          console.log("Événement créé avec succès", response);
          this.showAlert('Succès', 'Événement créé avec succès');
        },
        error: (error) => {
        console.error("Erreur lors de la création de l'événement", error);
      }
      });
    }
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
