import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  chats: any[] = []; // Replace with your actual chat type
  errorMessage: string | null = null;
  constructor( 
    private chatService: ChatService,
    private router: Router
  ) { }


  ngOnInit() {
    this.loadChats(10, 0); // Load chats with a limit and offset
  }

  loadChats(limit: number, offset: number) {
    this.chatService.getChats(limit, offset).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.chats = response.data; // Adjust based on your API response structure
          console.log('Chats loaded successfully:', this.chats);
        } else {
          this.errorMessage = response.error; // Handle error
          console.error('Error loading chats:', this.errorMessage);
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to load chats. Please try again later.'; // Handle error
        console.error('Error loading chats:', err);
      }
    });
  }

  calculateTimeSince(timestamp: number): string {
    const now = Math.floor(Date.now() / 1000); // Temps actuel en secondes
    const difference = now - timestamp;
  
    const secondsInAnHour = 60 * 60;
    const secondsInADay = secondsInAnHour * 24;
    const secondsInAMonth = secondsInADay * 30;
    const secondsInAYear = secondsInADay * 365;
  
    if (difference >= secondsInAYear) {
      const years = Math.floor(difference / secondsInAYear);
      return `${years} année${years > 1 ? 's' : ''}`;
    } else if (difference >= secondsInAMonth) {
      const months = Math.floor(difference / secondsInAMonth);
      return `${months} mois`;
    } else if (difference >= secondsInADay) {
      const days = Math.floor(difference / secondsInADay);
      return `${days} jour${days > 1 ? 's' : ''}`;
    } else if (difference >= secondsInAnHour) {
      const hours = Math.floor(difference / secondsInAnHour);
      return `${hours} heure${hours > 1 ? 's' : ''}`;
    } else {
      const minutes = Math.floor(difference / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  }

  openChat(chat:any) {
    localStorage.setItem('ChatUserData', JSON.stringify(chat.user));

    this.router.navigate(['/chat', chat.user.id]); 
  }
  
}
