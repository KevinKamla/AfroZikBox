import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { NavController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chats: any[] = [];
  userID: any | null = null;
  userName: string = '';
  userAvatar: string = '';
  chatUser: any = {};
  newMessage: string = '';
  mediaFile: File | null = null;
  avatarFile: any;
  imgPath: string | undefined;
  isGetImg: boolean | undefined;
  constructor(
    private navCtrl: NavController,
    public route: Router,
    private chatService: ChatService,
    private router: ActivatedRoute,
    private fileChooser: FileChooser, 
  ) {}

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }

  ngOnInit() {
    this.chatUser = JSON.parse(localStorage.getItem('ChatUserData') || '{}');
    this.userID = +this.router.snapshot.paramMap.get('idUser')!; 
    this.fetchChatMessages();
    setInterval(() => {
      this.fetchChatMessages();
    }, 5000);
  }

  fetchChatMessages() {
    console.log(this.userID);

    this.chatService.getChatsMessages(20, 0, this.userID).subscribe(
      (response) => {
        this.chats = response.data; // Assuming 'data' contains chat messages
        console.log(response);
      },
      (error) => {
        console.error('Error fetching chats:', error);
      }
    );
  }

  cleanDescription(description: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    const cleanText = tempDiv.textContent || tempDiv.innerText || '';

    // Retourner les 50 premiers caractères
    return cleanText.length > 50
      ? cleanText.substring(0, 50) + '...'
      : cleanText;
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


  sendMessage() {
    if (this.newMessage.trim().length === 0) {
      console.error('Message is empty');
      return;
    }

    this.chatService.sendMessage(this.userID, this.newMessage).subscribe(
      (response) => {
        console.log('Message sent successfully:', response);
        this.newMessage = ''; // Réinitialiser le champ après envoi
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }

  sendMedia() {
    if (this.avatarFile) {
      this.chatService.sendMedia(this.userID, this.avatarFile).subscribe(
        (response) => {
          console.log('Media sent successfully:', response);
        },
        (error) => {
          console.error('Error sending media:', error);
        }
      );
    } else {
      console.error('No media file selected');
    }
  }

  dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const match = arr[0].match(/:(.*?);/); // Extraction du mime-type
    let mime = 'application/octet-stream'; // Valeur par défaut si mime-type non trouvé
  
    if (match) {
      mime = match[1]; // Récupération du mime-type
    }
  
    const bstr = atob(arr[1]); // Décodage de la base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new  File([u8arr], filename, { type: mime });
  }
  
  async camera() {
    try {
      // Capture une image en utilisant la caméra
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64, // On récupère l'image en base64
        source: CameraSource.Camera, // Spécifie que la source est la caméra
      });
  
      if (image && image.base64String) {
        const base64Image = image.base64String;
        this.imgPath = `data:image/jpeg;base64,${base64Image}`;
        this.isGetImg = true;
  
        // Conversion en fichier utilisable
        this.avatarFile = this.dataURLtoFile(this.imgPath, 'image.jpg');
        console.log('Fichier image généré depuis la caméra :', this.avatarFile);
      }
    } catch (error) {
      console.error('Erreur lors de l’utilisation de la caméra :', error);
      
      // Si la caméra échoue, on propose à l’utilisateur de sélectionner un fichier
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      
      input.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          this.avatarFile = file;
          this.imgPath = URL.createObjectURL(file); // Crée un chemin temporaire pour prévisualisation
          this.isGetImg = true;
          console.log('Fichier sélectionné :', this.avatarFile);
        }
      };
      
      input.click();
    }
  }
  
  // Convertit une chaîne base64 en Blob
  base64ToBlob(base64: string, type: string) {
    const binary = atob(base64.replace(/\s/g, ''));
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: type });
  }
  
  

  // Méthode pour supprimer une discussion
  deleteChat() {
    this.chatService.deleteChat(this.userID).subscribe(
      (response) => {
        console.log('Chat deleted successfully:', response);
      },
      (error) => {
        console.error('Error deleting chat:', error);
      }
    );
  }


  async captureAndSendMedia() {
    try {
      // Capture l'image ou sélectionne le fichier via la méthode camera()
      await this.camera();
      
      // Une fois l'image capturée/choisie et convertie en fichier, on l'envoie
      if (this.avatarFile) {
        this.sendMedia(); // Appelle la méthode sendMedia pour l'envoyer
      }
    } catch (error) {
      console.error('Erreur lors de la capture ou de la sélection du média :', error);
    }
  }
}
