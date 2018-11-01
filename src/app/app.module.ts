import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SecondaryPageComponent } from './secondary-page/secondary-page.component';
import { UploaderComponent } from './uploader/uploader.component';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

const routes: Routes = [
  { path: 'uploader', component: UploaderComponent },
  { path: 'secondary', component: SecondaryPageComponent }

];
@NgModule({
  declarations: [
    AppComponent,
    SecondaryPageComponent,
    UploaderComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA // Tells Angular we  have custom tags in our template
  ]
})
export class AppModule { }
