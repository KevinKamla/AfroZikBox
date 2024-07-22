/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-createpub',
  templateUrl: './createpub.page.html',
  styleUrls: ['./createpub.page.scss'],
})
export class CreatepubPage implements OnInit {
  isGetImg = false;
  imgPath: string = '';
  valueAnnoceType = "Type d'annonce";
  valuePubliCible = 'Plublic Cible';
  valuePlacement = 'Placement';
  valueTarifs = 'Tarifs';
  pays = [
    'Afghanistan',
    'Afrique du Sud',
    'Albanie',
    'Algérie',
    'Allemagne',
    'Andorre',
    'Angola',
    'Antigua-et-Barbuda',
    'Arabie Saoudite',
    'Argentine',
    'Arménie',
    'Australie',
    'Autriche',
    'Azerbaïdjan',
    'Bahamas',
    'Bahreïn',
    'Bangladesh',
    'Barbade',
    'Belgique',
    'Belize',
    'Bénin',
    'Bhoutan',
    'Biélorussie',
    'Birmanie',
    'Bolivie',
    'Botswana',
    'Brésil',
    'Brunei',
    'Bulgarie',
    'Burkina Faso',
    'Burundi',
    'Cambodge',
    'Cameroun',
    'Canada',
    'Cap-Vert',
    'Chili',
    'Chine',
    'Chypre',
    'Colombie',
    'Comores',
    'Corée du Nord',
    'Corée du Sud',
    'Costa Rica',
    'Côte d’Ivoire',
    'Croatie',
    'Cuba',
    'Danemark',
    'Djibouti',
    'Dominique',
    'Égypte',
    'Équateur',
    'Érythrée',
    'Espagne',
    'Eswatini',
    'Estonie',
    'États-Unis',
    'Éthiopie',
    'Fidji',
    'Finlande',
    'France',
    'Gabon',
    'Gambie',
    'Géorgie',
    'Ghana',
    'Grèce',
    'Grenade',
    'Guatemala',
    'Guinée',
    'Guinée équatoriale',
    'Guinée-Bissau',
    'Guyana',
    'Haïti',
    'Honduras',
    'Hongrie',
    'Inde',
    'Indonésie',
    'Irak',
    'Iran',
    'Irlande',
    'Islande',
    'Israël',
    'Italie',
    'Jamaïque',
    'Japon',
    'Jordanie',
    'Kazakhstan',
    'Kenya',
    'Kirghizistan',
    'Kiribati',
    'Koweït',
    'Laos',
    'Lesotho',
    'Lettonie',
    'Liban',
    'Liberia',
    'Libye',
    'Liechtenstein',
    'Lituanie',
    'Luxembourg',
    'Madagascar',
    'Malaisie',
    'Malawi',
    'Maldives',
    'Mali',
    'Malte',
    'Maroc',
    'Maurice',
    'Mauritanie',
    'Mexique',
    'Micronésie',
    'Moldavie',
    'Monaco',
    'Mongolie',
    'Monténégro',
    'Mozambique',
    'Namibie',
    'Nauru',
    'Népal',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norvège',
    'Oman',
    'Ouganda',
    'Ouzbékistan',
    'Pakistan',
    'Palaos',
    'Palestine',
    'Panama',
    'Pérou',
    'Philippines',
    'Pologne',
    'Portugal',
    'Qatar',
    'République centrafricaine',
    'République démocratique du Congo',
    'République du Congo',
    'République tchèque',
    'Roumanie',
    'Royaume-Uni',
    'Russie',
    'Rwanda',
    'Salvador',
    'Samoa',
    'Sénégal',
    'Serbie',
    'Seychelles',
    'Singapour',
    'Slovaquie',
    'Slovénie',
    'Somalie',
    'Soudan',
    'Soudan du Sud',
    'Sri Lanka',
    'Suède',
    'Suisse',
    'Suriname',
    'Syrie',
    'Tadjikistan',
    'Tanzanie',
    'Tchad',
    'Thaïlande',
    'Timor oriental',
    'Togo',
    'Tonga',
    'Trinité-et-Tobago',
    'Tunisie',
    'Turkménistan',
    'Turquie',
    'Tuvalu',
    'Ukraine',
    'Uruguay',
    'Vanuatu',
    'Vatican',
    'Venezuela',
    'Vietnam',
    'Yémen',
    'Zambie',
    'Zimbabwe'
  ];

  constructor(
    private modal: ModalController
  ) { }


  async camera() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.imgPath = 'data:image/png;base64,' + image.base64String
    this.isGetImg = true
  }

  selectedAnnoceType(item: string) {
    this.valueAnnoceType = item;
    this.modal.dismiss()
  }

  selectedPlacement(item: string) {
    this.valuePlacement = item;
    this.modal.dismiss()
  }

  selectedTarifs(item: string) {
    this.valueTarifs = item;
    this.modal.dismiss()
  }

  ngOnInit() {
  }

}
