import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController, NavController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  @ViewChild('dateFilterModal') dateFilterModal!: IonModal;
  @ViewChild('calendarElement') calendarElement: any;

  events: any[] = [];
  filteredEvents: any[] = [];
  countdowns: { [key: string]: string } = {};
  countdownSubscription: Subscription | undefined;
  isDateModalOpen = false;
  eventDays: Set<string> = new Set();
  minDate: string | undefined;
  maxDate: string | undefined;

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private eventService: EventService,
    private route: Router
  ) {
    this.initDateRange();
  }

  ngOnInit() {
    this.loadEvents();
    this.startCountdown();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe((response) => {
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

  calculateCountdown(eventDate: Date) {
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} jours, ${hours} heures, ${minutes} minutes`;
  }

  formatTimeLeft(timeLeft: number): string {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${days}j ${hours}h ${minutes}m ${seconds}s`;
  }

  initDateRange() {
    const today = new Date();
    this.minDate = today.toISOString(); // Minimum date is today
    this.maxDate = new Date(today.getFullYear() + 1, 11, 31).toISOString(); // Maximum date is the end of the next year
  }

  openModal() {
    this.dateFilterModal.present();
  }

  closeModal() {
    this.dateFilterModal.dismiss();
  }

  onDateSelected(event: any) {
    const selectedDate = event.detail.value
      ? new Date(event.detail.value)
      : null;

    if (selectedDate) {
      this.filteredEvents = this.events.filter((event) => {
        const eventDate = new Date(event.start_date);
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate()
        );
      });
    } else {
      this.filteredEvents = this.events;
    }

    this.closeModal();
  }

  extractEventDays() {
    this.eventDays.clear();
    this.events.forEach((event) => {
      const eventDate = new Date(event.start_date);
      this.eventDays.add(eventDate.toISOString().split('T')[0]); // Format the date as YYYY-MM-DD
    });
  }

  highlightEventDays() {
    const calendarElement =
      this.calendarElement.el.shadowRoot.querySelector('ion-datetime');
    const calendarDays =
      calendarElement.shadowRoot.querySelectorAll('.days .day');

    calendarDays.forEach((dayElement: HTMLElement) => {
      const dayValue = dayElement.getAttribute('data-day');
      if (dayValue && this.eventDays.has(dayValue)) {
        dayElement.classList.add('highlighted-day');
      }
    });
  }

  selectArticle(article: any) {
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    this.route.navigate(['eventdetail', article.id]);
  }
}
