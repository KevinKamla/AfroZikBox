/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-statut',
  templateUrl: './statut.page.html',
  styleUrls: ['./statut.page.scss'],
})
export class StatutPage implements OnInit {
  stories: any[] = [];
  currentStory: any;
  audioFile: string | Blob | undefined;
  imageFile: string | Blob | undefined;

  constructor(
    private modalController: ModalController,
    private storyService: StoryService,
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  createStory() {
    const formData = new FormData();

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    } else {
      console.error('Aucune image sélectionnée');
      return;
    }

    if (this.audioFile) {
      formData.append('audio', this.audioFile);
    } else {
      console.error('Aucun fichier audio sélectionné');
      return;
    }

    formData.append('who', 'followers'); // Exemple de donnée fixe

    this.storyService.createStory(formData).subscribe(
      (response) => {
        console.log('Histoire créée avec succès :', response);
      },
      (error) => {
        console.error("Erreur lors de la création de l'histoire :", error);
      }
    );
  }

  loadStories() {
    this.storyService.getStories().subscribe((response) => {
      if (response.status === 200) {
        this.stories = response.data;
      }
    });
  }

  // Démarrer une story
  startStory(user_id: number, story_id: number) {
    this.storyService.startStory(user_id, story_id).subscribe((response) => {
      if (response.status === 200) {
        this.currentStory = response.data;
        // Optionnel : réinitialiser le cookie lorsque la story commence
        this.storyService.setNextStoryCookie(user_id, story_id);
      }
    });
  }

  // Aller à la story suivante
  nextStory(user_id: number, story_id: number, next_user_id: number, next_story_id: number) {
    this.storyService.nextStory(user_id, story_id, next_user_id, next_story_id).subscribe((response) => {
      if (response.status === 200) {
        this.currentStory = response.data;
        // Enregistrer les identifiants de la prochaine story dans le cookie
        this.storyService.setNextStoryCookie(next_user_id, next_story_id);
      }
    });
  }

  // Aller à la story précédente
  previousStory(user_id: number, story_id: number, pre_user_id: number, pre_story_id: number) {
    this.storyService.previousStory(user_id, story_id, pre_user_id, pre_story_id).subscribe((response) => {
      if (response.status === 200) {
        this.currentStory = response.data;
        // Optionnel : enregistrer l'ancienne story dans le cookie
        this.storyService.setNextStoryCookie(pre_user_id, pre_story_id);
      }
    });
  }

  rangeChange(e: any) {
    e++;
  }

  ngOnInit() {
    this.loadStories();
  }
}
