/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoryService } from 'src/app/services/story.service';


@Component({
  selector: 'app-addstory',
  templateUrl: './addstory.page.html',
  styleUrls: ['./addstory.page.scss'],
})
export class AddstoryPage implements OnInit {


  isGetImg = false;
  imgPath: string = '';
  imgMucic: string = '';
  canview = 'Qui peut voir'
  storyForm: FormGroup;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private fileChooser: FileChooser,
    private yourService: StoryService, private fb: FormBuilder
  ) { 
    this.storyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null],
    });
  }

  // async pickAudioFile() {
  //   const result = await this.fileChooser.open({
  //     mime: 'audio/mp3',      
  //   });
  
  //   if (result && result.length > 0) {
  //     const fileObject = result[0];
  //     // const filePath = fileObject.nativeURL;
      
  //   }
  //   this.imgMucic = 'assets/icon/son.png';
  // }
  async pickAudioFile() {
    try {
      // Open the file chooser for audio files
      const result = await this.fileChooser.open();
  
      // Verify file selection and retrieve file path
      if (result) {
        const fileUri = result; // The file path or URI selected
  
        // Set the image or icon as feedback for selection
        this.imgMucic = 'assets/icon/son.png';
  
        console.log('Selected audio file:', fileUri);
      } else {
        console.log('No file selected');
      }
    } catch (error) {
      console.error('Error selecting audio file:', error);
    }
  }
  

  async camera() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.imgPath = 'data:image/png;base64,' + image.base64String
    this.isGetImg = true
  }

  async openCanViewModal() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Qui peut voir ?',
      buttons: [
        {
          text: 'Mes abonnés',
          handler: () => {
            this.canview = "Mes abonnés"
            console.log(this.canview);

          }
        },
        {
          text: 'Tout le monde(Promotion)',
          handler: () => {
            this.canview = 'Tout le monde(Promotion)'
            console.log(this.canview);

          }
        }
      ]
    })

    await actionSheet.present();
  }

  ngOnInit() {
  }
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.storyForm.patchValue({ image: input.files[0] });
    }
  }

  // Méthode pour soumettre le formulaire
  onSubmit() {
    if (this.storyForm.valid) {
      const formData = new FormData();
      formData.append('title', this.storyForm.get('title')?.value);
      formData.append('description', this.storyForm.get('description')?.value);

      // Ajouter l'image au formData si elle est présente
      const image = this.storyForm.get('image')?.value;
      if (image) {
        formData.append('image', image);
      }

      // Appel au service pour créer la story
      this.yourService.createStory(formData).subscribe({
        next: (response) => {
          console.log('Story créée avec succès', response);
          // Gérer le succès (ex: message de confirmation ou réinitialisation du formulaire)
        },
        error: (error) => {
          console.error('Erreur lors de la création de la story', error);
          // Gérer l'erreur (ex: message d'erreur)
        },
      });
    }
  }
}
