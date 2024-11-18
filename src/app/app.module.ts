import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Media } from '@awesome-cordova-plugins/media/ngx';
// import { MusicControls } from '@ionic-native/music-controls/ngx';
import { File } from '@ionic-native/file/ngx'; // Ajoutez cette ligne
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ReactiveFormsModule } from '@angular/forms'; // Ajoutez ceci
import { MusicPlayerComponent } from './components/music-player/music-player.component';

@NgModule({
  declarations: [AppComponent, MusicPlayerComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule, // Ajoutez ceci ici aussi
    IonicStorageModule.forRoot(), // Ajoutez cette ligne
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FileChooser,
    // MusicControls,
    Media,
    File,
    AndroidPermissions,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
