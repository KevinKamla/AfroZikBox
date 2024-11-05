import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

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
  eventForm = this.fb.group({
    name: ['', Validators.required],
    desc: [''],
    start_date: [''],
    start_time: [''],
    end_date: [''],
    end_time: [''],
    location: [''],
    online_url: [''],
    real_address: [''],
    sell_tickets: [''],
    available_tickets: [''],
    ticket_price: ['']
  });
  
  imageFile: File | null = null;
  videoFile: File | null = null;
  selectedEvent: any;

  constructor(private yourService: EventService,private route: ActivatedRoute,private alertController: AlertController, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['event']) {
        this.selectedEvent = JSON.parse(params['event']);
        this.preFillForm(this.selectedEvent);
      }
    });
  }
  preFillForm(eventData: any) {
    this.eventForm.patchValue({
      name: eventData.name,
      desc: eventData.desc,
      start_date: eventData.start_date,
      start_time: eventData.start_time,
      end_date: eventData.end_date,
      end_time: eventData.end_time,
      location: eventData.location,
      online_url: eventData.online_url || '',
      real_address: eventData.real_address || '',
      sell_tickets: eventData.sell_tickets,
      available_tickets: eventData.available_tickets || '',
      ticket_price: eventData.ticket_price || ''
    });
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
  // onSubmitCreateEvent() {
  //   if (this.imageFile && this.videoFile) {
  //     this.yourService.createEvent(this.eventData, this.imageFile, this.videoFile).subscribe({
  //       next: (response) => {
  //         console.log("Événement créé avec succès", response);
  //         this.showAlert('Succès', 'Événement créé avec succès');
  //       },
  //       error: (error) => {
  //       console.error("Erreur lors de la création de l'événement", error);
  //     }
  //     });
  //   }
  // }

  onSubmitCreateEvent() {
    if (this.eventForm.invalid) {
      this.showAlert('Erreur', 'Veuillez remplir tous les champs requis.');
      return;
    }
  
    // Mise à jour de `eventData` avec les données du formulaire réactif
    // this.eventData = { ...this.eventData, ...this.eventForm.value };
  
    // Vérifie si les fichiers d'image et de vidéo sont présents
    if (this.imageFile && this.videoFile) {
      this.yourService.createEvent(this.eventData, this.imageFile, this.videoFile).subscribe({
        next: (response) => {
          console.log("Événement créé avec succès", response);
          this.showAlert('Succès', 'Événement créé avec succès');
        },
        error: (error) => {
          console.error("Erreur lors de la création de l'événement", error);
          this.showAlert('Erreur', "Une erreur s'est produite lors de la création de l'événement");
        }
      });
    } else {
      this.showAlert('Erreur', 'Veuillez télécharger une image et une vidéo pour cet événement.');
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
