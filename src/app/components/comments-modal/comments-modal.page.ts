import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.page.html',
  styleUrls: ['./comments-modal.page.scss'],
})
export class CommentsModalPage implements OnInit {
  comments:any[] = [ ]; // Mise à jour de la structure des commentaires
  newComment: string = ''; // Ajoutez cette ligne
  // @Input() currentSong: any; // Recevoir les informations de la chanson
  constructor(private modalController: ModalController, private navParams: NavParams, private commentService: CommentService) {} // Modifiez le constructeur
  currentSong:any;
  sendComment() {
    const trackId = this.currentSong.audio_id; // Assurez-vous que l'ID de la chanson est disponible
    const timePercentage = 0; // Remplacez par la valeur appropriée si nécessaire

    this.commentService.addComment(trackId, timePercentage, this.newComment).subscribe(
      (response: any) => {
        console.log('Commentaire envoyé avec succès:', response); // Log pour succès
        this.addComment(); // Ajoutez le commentaire localement
        this.loadComments(); // Chargez à nouveau les commentaires pour inclure le nouveau
      },
      (error: any) => {
        console.error('Erreur lors de l\'envoi du commentaire:', error); // Log pour erreur
      }
    );
  }
  
  // ... code existant ...

  loadComments() {
    const trackId = this.currentSong.audio_id; // Assurez-vous que l'ID de la chanson est disponible
    this.commentService.toggleComment(trackId).subscribe(
      (comments: any) => {
        this.comments = comments; // Stockez les commentaires récupérés
        console.log('Commentaires récupérés:', this.comments);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des commentaires:', error);
      }
    );
  }
  
  ngOnInit() {
    this.currentSong = this.navParams.get('currentSong'); // Récupérer les informations de la chanson
    console.log('Informations de la chanson dans le modal:', this.currentSong);
    
    this.loadComments(); // Chargez les commentaires lors de l'initialisation
  }
  likeComment(comment: { text: string, likes: number }) {
    comment.likes++;
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({ text: this.newComment, likes: 0, avatarUrl: 'https://example.com/default-avatar.png' }); // Ajout d'un nouveau commentaire avec avatar
      this.newComment = '';
    }
  }
  
  dismiss() {
    this.modalController.dismiss(); // Ferme le modal
  }

}