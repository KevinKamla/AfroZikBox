/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController, ToastController } from '@ionic/angular';
import { AdsUploadService } from 'src/app/services/ads-upload.service';
import { environment } from 'src/environments/environment';
interface Country {
  value: string;
  text: string;
}
@Component({
  selector: 'app-createpub',
  templateUrl: './createpub.page.html',
  styleUrls: ['./createpub.page.scss'],
})
export class CreatepubPage implements OnInit {
  isGetImg = false;
  imgPath: string = '';
  valueAnnoceTypes = "Type d'annonce";
  valueAnnoceType: any;
  valuePubliCible = 'Plublic Cible';
  valuePlacements = 'Placement';
  valuePlacement: any;
  valueTarifs: any;
  valueTarif = 'Tarifs';

  selectedFile: any | null = null;
  pays: Country[] = [];
  private accessToken = localStorage.getItem('accessToken');
  private serverKey = environment.server_key;

  adData = {
    name: '',
    title: '',
    url: '',
    description: '',
    dailyLimit: '',
    adType: '',
    placement: '',
    rates: '',
    image: '',
  };
  selectedCountries: string[] = [];

  constructor(
    private modal: ModalController,
    private addService: AdsUploadService,
    private toastController: ToastController
  ) {}

  async camera() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });

      if (image.base64String) {
        this.imgPath = 'data:image/png;base64,' + image.base64String;
        this.isGetImg = true;

        const byteString = atob(image.base64String);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }
        this.selectedFile = new File([uintArray], 'thumbnail.jpg', {
          type: 'image/jpeg',
        });
      } else {
        console.error('La chaîne base64 est indéfinie.');
      }
    } catch (error) {
      console.error("Erreur lors de la capture de l'image:", error);
    }
  }

  selectedAnnoceType(item: string) {
    this.valueAnnoceType = item;
    this.modal.dismiss();
  }

  isCountrySelected(value: string): boolean {
    return this.selectedCountries.includes(value); // Check if the value is selected
  }

  toggleCountrySelection(value: string, event: any) {
    if (event.detail.checked) {
      if (!this.selectedCountries.includes(value)) {
        this.selectedCountries.push(value); // Push the value instead of text
      }
    } else {
      this.selectedCountries = this.selectedCountries.filter(
        (c) => c !== value
      );
    }
  }

  toggleAllCountries() {
    if (this.areAllCountriesSelected()) {
      this.selectedCountries = [];
    } else {
      this.selectedCountries = this.pays.map((country) => country.value); // Use value
    }
  }

  areAllCountriesSelected(): boolean {
    return this.selectedCountries.length === this.pays.length;
  }

  selectedPlacement(item: string) {
    if (item === 'Uniquement sur les pages de piste') {
      this.valuePlacement = 1;
    } else if (item === 'Sur toutes les pages') {
      this.valuePlacement = 2;
    }

    this.modal.dismiss();
  }

  selectedTarifs(item: string) {
    if (item === 'Prix par clique($0.5) ($0.5)') {
      this.valueTarifs = 1;
    } else if (item === 'Prix par impression ($0.1) ($0.1)') {
      this.valueTarifs = 2;
    }
    this.modal.dismiss();
  }

  ngOnInit() {
    this.addService.getCountries().subscribe((data: any) => {
      this.pays = data.option.map(
        (option: { value: string; text: string }) => ({
          value: option.value,
          text: option.text,
        })
      );
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Durée d'affichage du toast (2 secondes)
      color: color, // Couleur du toast (success, danger, etc.)
      position: 'bottom', // Position (top, middle, bottom)
    });
    toast.present();
  }

  submitForm() {
    if (
      !this.adData.name ||
      !this.adData.title ||
      !this.adData.url ||
      !this.adData.description
    ) {
      // Afficher un message d'erreur si les champs obligatoires ne sont pas remplis
      this.presentToast(
        'Tous les champs obligatoires ne sont pas remplis',
        'danger'
      );
      return;
    }

    const params = {
      name: this.adData.name,
      title: this.adData.title,
      url: this.adData.url,
      desc: this.adData.description,
      'audience-list': this.selectedCountries, // Liste des pays sélectionnés
      placement: this.valuePlacement,
      cost: this.valueTarifs,
      day_limit: this.adData.dailyLimit,
      adType: this.valueAnnoceType,
      access_token: this.accessToken || '',
      server_key: this.serverKey,
    };
    // Validation du formulaire avant l'envoi
    const validationError = this.validateAdForm(
      params,
      this.selectedFile,
      null
    ); // Le fichier audio n'est pas inclus ici
    if (validationError) {
      // Afficher le message d'erreur si la validation échoue
      this.presentToast(validationError, 'danger');
      return;
    }
    // Appel à l'API pour créer l'annonce
    this.addService.addAdsAPI(params, this.selectedFile).subscribe(
      (response) => {
        // Afficher un toast de succès
        this.presentToast('Annonce créée avec succès', 'success');
        console.log('Annonce créée avec succès', response);
      },
      (error) => {
        // Afficher un toast d'erreur
        this.presentToast("Erreur lors de la création de l'annonce", 'danger');
        console.error("Erreur lors de la création de l'annonce", error);
      }
    );
  }

  // Validate ad form inputs (similar to the checks in your PHP code)
  validateAdForm(
    params: any,
    mediaFile: File | null,
    audioFile: File | null
  ): string | null {
    if (!params.name || params.name.length < 5 || params.name.length > 100) {
      return 'Name must be between 5 and 100 characters.';
    }
    if (!this.isValidUrl(params.url)) {
      return 'Invalid URL. Please enter a valid URL.';
    }
    if (
      !params.title ||
      params.title.length < 10 ||
      params.title.length > 150
    ) {
      return 'Ad title must be between 10 and 150 characters.';
    }
    if (!params['audience-list']) {
      return 'Please select an audience.';
    }
    if (!params.cost || ![1, 2].includes(params.cost)) {
      return 'Invalid cost type.';
    }
    if (!params.placement || ![1, 2].includes(params.placement)) {
      return 'Invalid placement value.';
    }
    if (
      params.type === 'audio' &&
      audioFile &&
      audioFile.size > this.getMaxUploadSize()
    ) {
      return `Audio file is too large. Max upload size is ${this.getMaxUploadSizeFormatted()}.`;
    }
    if (mediaFile && mediaFile.size > this.getMaxUploadSize()) {
      return `Media file is too large. Max upload size is ${this.getMaxUploadSizeFormatted()}.`;
    }
    return null; // No errors
  }

  private isValidUrl(url: string): boolean {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return !!urlPattern.test(url);
  }

  private getMaxUploadSize(): number {
    // You can set a max upload size value based on your server configuration
    return 10 * 1024 * 1024; // Example: 10MB
  }

  private getMaxUploadSizeFormatted(): string {
    // Convert max upload size to a readable format
    return '10MB'; // Example: 10MB
  }
}
