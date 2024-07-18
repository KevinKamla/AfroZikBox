/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filteractionsearch',
  templateUrl: './filteractionsearch.page.html',
  styleUrls: ['./filteractionsearch.page.scss'],
})
export class FilteractionsearchPage implements OnInit {

  modalPriceIsOpen: boolean = false;
  modalGenreIsOpen: boolean = false;
  genreList = ['Afrozouk', 'Afrobeat', 'Afropop', 'Afrotrap', 'Amapiano', 'Ancestral Soul', 'Assiko',
    'Azonto', ' Batuque', 'Bend-skin', 'Bikutsi', 'Bongo Flava', 'Coupé-décalé', 'Dancehall',
    'Gqom', 'Highlife', 'Kizomba', 'Kwaito', 'Makossa', 'Maloya', 'Mapouka', 'Mbalax', 'Morna',
    'Ndombolo', 'Rumba congolaise', 'Sega', 'Soukous', 'Swede Swede', 'Tribal House', 'Wassoulou',
    'Zaïko', 'Ziglibithy', 'Zoblazo', 'Zouglou', 'Zouk']

  constructor(
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
  ) { }

  selectAll() {
    this.closeModal();
  }
  applyFilter() {
    this.closeModal();
  }

  openModalPrice() {
    this.modalPriceIsOpen = true
  }

  openModalGenre() {
    this.modalGenreIsOpen = true
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  
  closeModalGenre() {
    this.modalGenreIsOpen = false
  }

  closeModalPrice() {
    this.modalPriceIsOpen = false
  }

  ngOnInit() {
  }



  // =================== Annimation des modals ============================

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

}
