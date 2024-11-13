import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { ArticlesService } from 'src/app/services/articles.service';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { musicTab } from '../play/play.page';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  @ViewChild('dateFilterModal') dateFilterModal!: IonModal;
  @ViewChild('calendarElement') calendarElement: any;
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  accessToken: string = localStorage.getItem('accessToken') || '';
  events: any[] = [];
  article: any[] = [];
  eventId!: number;
  isLoading = true;
  countdowns: { [key: string]: string } = {};
  private countdownSubscription: Subscription | undefined;
  filteredEvents: any[] = [];
  isDateModalOpen = false;
  minDate: string | undefined;
  maxDate: string | undefined;
  eventDays: Set<string> = new Set();
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private userService: UserService,
    private articleService: ArticlesService,
    private route: Router,
    private yourService: EventService
  ) {
    this.initDateRange();
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), 0, 1).toISOString(); // 1er janvier de l'année
    this.maxDate = new Date(today.getFullYear(), 11, 31).toISOString(); // 31 décembre de l'année
  }

  deleteEvent(eventId: number) {
    this.yourService.deleteEvent(eventId).subscribe({
      next: (response) => {
        console.log('Événement supprimé avec succès', response);
        // Mettez à jour la liste après suppression
        this.events = this.events.filter((item) => item.id !== eventId);
      },
      error: (error) => {
        console.error("Erreur lors de la suppression de l'événement", error);
      },
    });
  }

  editEvent(item: any) {
    // Implémentez votre logique pour éditer l'événement
    console.log("Éditer l'événement", item);
    // Par exemple, naviguer vers un formulaire d'édition
  }

  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios',
    });
    await modal.present();
  }

  goToPlay() {
    musicTab.musicIsPlay = true;
    musicTab.isClose = false;
    this.navCtrl.navigateForward('play');
  }

  selectArticle(article: any) {
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    this.route.navigate(['achatdetail', article.id]);
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.yourService.getEvents().subscribe((response) => {
      this.events = response.data;
      this.filteredEvents = this.events;
      this.initializeCountdowns();
      this.extractEventDays();
    });
  }

  initializeCountdowns() {
    this.events.forEach((event) => {
      const startDate = new Date(event.start_date + ' ' + event.start_time);
      const now = new Date();

      if (startDate > now) {
        const countdown = this.calculateCountdown(startDate);
        this.countdowns[event.id] = countdown;
      }
    });
  }
  ngOnDestroy() {
    // Arrêter l'intervalle quand le composant est détruit
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  calculateCountdown(eventDate: Date) {
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} jours, ${hours} heures, ${minutes} minutes`;
  }

  startCountdown() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.events.forEach((event) => {
        const eventId = event.id;
        const startTime = new Date(
          event.start_date + ' ' + event.start_time
        ).getTime();
        const currentTime = new Date().getTime();
        const timeLeft = startTime - currentTime;

        if (timeLeft > 0) {
          this.countdowns[eventId] = this.formatTimeLeft(timeLeft);
        } else {
          this.countdowns[eventId] = 'Événement commencé';
        }
      });
    });
  }

  formatTimeLeft(timeLeft: number): string {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `
      <ion-icon name="calendar-outline"></ion-icon> ${days}j 
      <ion-icon name="time-outline"></ion-icon> ${hours}h 
      <ion-icon name="alarm-outline"></ion-icon> ${minutes}m 
      <ion-icon name="hourglass-outline"></ion-icon> ${seconds}s
    `;
  }

  // Initialisation des dates minimales et maximales
  initDateRange() {
    const today = new Date();
    this.minDate = today.toISOString(); // La date d'aujourd'hui comme minimum
    this.maxDate = new Date(today.getFullYear() + 1, 11, 31).toISOString(); // Date maximale pour la fin de l'année suivante
  }

  // Ouvrir le modal de filtre de date
  openDateModal() {
    this.isDateModalOpen = true;
  }

  // Fermer le modal de filtre de date
  closeDateModal() {
    this.isDateModalOpen = false;

    // Si aucun filtre n'est appliqué, réinitialiser la liste filtrée
    if (this.filteredEvents.length === 0) {
      this.filteredEvents = this.events;
    }
  }

  // Filtrer les événements par date
  filterByDate(event: any) {
    console.log(event);

    const selectedDate = event.detail.value
      ? new Date(event.detail.value)
      : null;

    if (selectedDate) {
      // Log the selected date and the filtering process
      console.log('Selected Date:', selectedDate);

      this.filteredEvents = this.events.filter((ev) => {
        console.log(ev);

        const eventDate = new Date(ev.start_date);
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate()
        );
      });

      console.log('Filtered Events:', this.filteredEvents);
    } else {
      // Reset if no date selected
      this.filteredEvents = [];
    }

    this.closeDateModal(); // Close the modal after filtering
  }

  highlightEventDates() {
    return this.events.map((event) => {
      const eventDate = new Date(event.start_date);
      return {
        date: eventDate.toISOString().split('T')[0], // Format ISO pour le jour
        class: 'highlight-event', // Classe CSS pour styliser
      };
    });
  }
  extractEventDays() {
    this.eventDays.clear(); // S'assurer que l'ensemble est vidé à chaque fois
    this.events.forEach((event) => {
      const eventDate = new Date(event.start_date);
      const dateString = eventDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
      this.eventDays.add(dateString);
    });

    // Affichage pour débogage
    console.log('Jours avec événements:', Array.from(this.eventDays));
  }

  highlightEventDays() {
    // Récupérer l'élément ion-datetime
    const calendarElement =
      this.calendarElement.el.shadowRoot.querySelector('ion-datetime');
    const calendarDays =
      calendarElement.shadowRoot.querySelectorAll('.days .day');
    const eventDays = this.events.map((event) => event.start_date); // Liste des dates des événements

    calendarDays.forEach((dayElement: HTMLElement) => {
      const dayValue = dayElement.getAttribute('data-day'); // Récupérer la date du jour
      console.log('Jour:', dayValue, 'Événements:', eventDays);

      if (dayValue && eventDays.includes(dayValue)) {
        console.log(dayValue);
        dayElement.classList.add('highlighted-day'); // Ajouter la classe CSS si la date est un jour d'événement
      }
    });
  }

  // Check if the event is today
  isEventToday(event: any): boolean {
    console.log(event.start_date);

    // Vérifier si l'événement et ses propriétés existent avant de continuer
    if (!event || !event.start_date) {
      console.warn('Événement manquant ou start_date absent:', event);
      return false; // Retourner false si l'événement ou start_date n'existe pas
    }

    const eventDate = new Date(event.start_date);

    // Si la date de l'événement est invalide, journaliser l'erreur et retourner false
    if (isNaN(eventDate.getTime())) {
      console.error(
        "Date de début invalide pour l'événement:",
        event.start_date
      );
      return false;
    }

    const today = new Date().toISOString().split('T')[0]; // Date d'aujourd'hui au format YYYY-MM-DD
    const eventDateString = eventDate.toISOString().split('T')[0];

    return today === eventDateString; // Vérifier si l'événement est aujourd'hui
  }

  // onDateSelected(event: any) {
  //   const selectedDate = event.detail.value
  //     ? new Date(event.detail.value)
  //     : null;
  //   console.log('Date sélectionnée:', selectedDate);
  //   this.closeDateModal(); // Ferme le calendrier une fois la date sélectionnée
  // }

  openModal() {
    this.dateFilterModal.present();
  }

  closeModal() {
    this.dateFilterModal.dismiss();
  }

  onDateSelected(event: any) {
    const selectedDate = event.detail.value;
    // Logique pour filtrer les événements en fonction de la date sélectionnée
    this.filterEventsByDate(selectedDate);
    this.closeModal();
  }

  filterEventsByDate(date: string) {
    // Logique pour filtrer les événements
    this.filteredEvents = this.events.filter((event) =>
      event.start_date.includes(date)
    );
  }
}
