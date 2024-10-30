import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { Filesystem } from '@capacitor/filesystem';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-addstory',
  templateUrl: './addstory.page.html',
  styleUrls: ['./addstory.page.scss'],
})
export class AddstoryPage {
  isGetImg = false;
  imgPath: string = '';
  imgMucic: string = '';
  canview = 'Qui peut voir';
  storyForm: FormGroup;
  imageFile: any; // Holds the captured image file
  audioFile: any; // Holds the selected audio file

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private fileChooser: FileChooser,
    private storyService: StoryService,
    private fb: FormBuilder
  ) {
    this.storyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null],
    });
  }

  async camera() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri, // Using URI to convert into a file
        source: CameraSource.Camera, // Force the use of camera
      });

      if (image && image.webPath) {
        const imageFile = await this.convertImageToFile(image.webPath);
        this.imageFile = imageFile; // Store the image file for submission
        this.imgPath = image.webPath; // Display the image preview
        this.isGetImg = true;
      } else {
        console.error('Failed to capture image or image path is undefined');
      }
    } catch (error) {
      console.error('Camera error:', error);
      // If camera fails, fallback to file input
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          this.imageFile = file;
          this.imgPath = URL.createObjectURL(file); // Preview the image
          this.isGetImg = true;
        }
      };
      input.click();
    }
  }

  base64ToUint8Array(base64: any): Uint8Array {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async convertImageToFile(imageUri: string): Promise<File> {
    const fileData = await Filesystem.readFile({ path: imageUri });
    const byteArray = this.base64ToUint8Array(fileData.data);
    const blob = new Blob([byteArray], { type: 'image/png' });
    return new File([blob], 'image.png', { type: 'image/png' });
  }

  pickAudioFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'audio/*';
    fileInput.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            this.audioFile = file; // Stockez le fichier audio pour l'envoi dans le formulaire
            this.imgMucic = URL.createObjectURL(file); // Créez une URL de prévisualisation
        }
    };
    fileInput.click();
  }
  
  async convertUriToFile(fileUri: string): Promise<File> {
    const fileData = await Filesystem.readFile({ path: fileUri });
    const byteArray = this.base64ToUint8Array(fileData.data);
    const blob = new Blob([byteArray], { type: 'audio/mp3' });
    return new File([blob], 'audio.mp3', { type: 'audio/mp3' });
  }

  async openCanViewModal() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Qui peut voir ?',
      buttons: [
        {
          text: 'Mes abonnés',
          handler: () => {
            this.canview = 'followers';
          },
        },
        {
          text: 'Tout le monde (Promotion)',
          handler: () => {
            this.canview = 'all';
          },
        },
      ],
    });

    await actionSheet.present();
  }

  onSubmit() {
    if (this.storyForm.valid) {
      const formData = new FormData();
      formData.append('title', this.storyForm.get('title')?.value);
      formData.append('description', this.storyForm.get('description')?.value);
  
      // Add the image file to the form data if it exists
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }
  
      // Add the audio file to the form data if it exists
      if (this.audioFile) {
        formData.append('audio', this.audioFile);
      }
  
      // Add the visibility option to the form data
      if (this.canview) {
        formData.append('who', this.canview);
      } else {
        console.error('No visibility option selected');
        return;
      }
  
      // Submit the form to the backend
      this.storyService.createStory(formData).subscribe({
        next: (response) => {
          console.log('Story created successfully', response);
        },
        error: (error) => {
          console.error('Error creating story', error);
        },
      });
    }
  }
  
 
}
