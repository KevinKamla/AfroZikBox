import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.page.html',
  styleUrls: ['./comments-modal.page.scss'],
})
export class CommentsModalPage implements OnInit {
  comments: { text: string, likes: number, avatarUrl: string }[] = [ ]; // Mise à jour de la structure des commentaires
  newComment: string = ''; // Ajoutez cette ligne

  constructor(private modalController: ModalController) {}

  ngOnInit() {
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
