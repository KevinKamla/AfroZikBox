import { Component, OnInit } from '@angular/core';
import { RadioService } from 'src/app/services/radio.service';

@Component({
  selector: 'app-createradiostation',
  templateUrl: './createradiostation.page.html',
  styleUrls: ['./createradiostation.page.scss'],
})
export class CreateradiostationPage implements OnInit {
// savedStations: { id: number, name: string, url: string, logo: string, genre: string, country: string }[] = [];
savedStations: { id: number, name: string, url: string, logo: string, genre: string, country: string }[] = [
  { id: 1, name: 'Station A', url: 'https://stationa.com', logo: 'https://stationa.com/logo.png', genre: 'Rock', country: 'France' },
  { id: 2, name: 'Station B', url: 'https://stationb.com', logo: 'https://stationb.com/logo.png', genre: 'Jazz', country: 'USA' },
  { id: 3, name: 'yesaii', url: 'https://stationc.com', logo: 'https://stationc.com/logo.png', genre: 'Pop', country: 'UK' },
  { id: 4, name: 'Gospel', url: 'https://stationd.com', logo: 'https://stationd.com/logo.png', genre: 'Classical', country: 'Germany' },
  { id: 5, name: 'Station E', url: 'https://statione.com', logo: 'https://statione.com/logo.png', genre: 'Hip-Hop', country: 'Canada' }
]; // Tableau complet des stations
  isModalOpen: boolean = false;
  stationId!: number;
  stationName!: string;
  stationUrl!: string;
  stationLogo!: string;
  stationGenre!: string;
  stationCountry!: string;
  filteredStations: any[] = []; // Tableau des stations filtrées
  searchKeyword: string = ''; // Mot-clé pour la recherche

  constructor(private radioService: RadioService) { }

  ngOnInit() {
    this.filteredStations = this.savedStations;
  }
  onLogoSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) { // Vérification ajoutée
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.stationLogo = reader.result as string; // Met à jour l'URL du logo avec la donnée du fichier
      };
      reader.readAsDataURL(file); // Lit le fichier comme une URL de données
    }
  }
  filterStations() {
    const keyword = this.searchKeyword.toLowerCase();
    if (keyword) {
      this.filteredStations = this.savedStations.filter(station =>
        station.name.toLowerCase().includes(keyword) ||
        station.genre.toLowerCase().includes(keyword) ||
        station.country.toLowerCase().includes(keyword)
      );
      // this.radioService.searchStations(keyword).subscribe(filteredStations => {
      //   this.filteredStations = filteredStations;
      // });
      console.log(this.filteredStations);
    } else {
      // Si le champ de recherche est vide, on affiche toutes les stations
      this.filteredStations = this.savedStations;
    }
  }
  onAddStation() {
    if (!this.stationId || !this.stationName || !this.stationUrl || !this.stationLogo || !this.stationGenre || !this.stationCountry) {
        console.error('Tous les champs doivent être remplis');
        return;
    }

    this.radioService
      .addStation(
        this.stationId,
        this.stationName,
        this.stationUrl,
        this.stationLogo,
        this.stationGenre,
        this.stationCountry
      )
      .subscribe(
        (response) => {
          console.log('Station ajoutée avec succès :', response);
          
          // Ajouter la station au tableau `savedStations`
          const newStation = {
            id: this.stationId,
            name: this.stationName,
            url: this.stationUrl,
            logo: this.stationLogo,
            genre: this.stationGenre,
            country: this.stationCountry
          };
          this.savedStations.push(newStation);
          // Réinitialiser les champs
          this.stationId = 0;
          this.stationName = '';
          this.stationUrl = '';
          this.stationLogo = '';
          this.stationGenre = '';
          this.stationCountry = '';

          // Fermer le modal
          this.closeAddStationModal();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la station :', error);
        }
      );
  }
  // onAddStation() {
  //   this.yourService
  //     .addStation(
  //       this.stationId,
  //       this.stationName,
  //       this.stationUrl,
  //       this.stationLogo,
  //       this.stationGenre,
  //       this.stationCountry
  //     )
  //     .subscribe(
  //       (response) => {
  //         console.log('Station added successfully:', response);
  //         this.closeAddStationModal();
  //         this.loadStations(); // Refresh the station list
  //       },
  //       (error) => {
  //         console.error('Error adding station:', error);
  //       }
  //     );
  // }

  loadStations() {
    // Fetch saved stations, assuming a method in your service returns the list of stations
    // this.ra.getStations().subscribe((stations) => {
    //   this.savedStations = stations;
    // });
  }

  openAddStationModal() {
    this.isModalOpen = true;
  }

  closeAddStationModal() {
    this.isModalOpen = false;
  }
}
