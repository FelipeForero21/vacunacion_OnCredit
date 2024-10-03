import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Error404Component } from './components/shared/error404/error404.component';
import { AgregarVacunaComponent } from './components/vacuna/agregar-vacuna/agregar-vacuna.component';
import { AgregarNinoComponent } from './components/nino/agregar-nino/agregar-nino.component';
import { AplicarVacunaComponent } from './components/nino/aplicar-vacuna/aplicar-vacuna.component';
import { NinosPorMunicipioComponent } from './components/nino/ninos-por-municipio/ninos-por-municipio.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    Error404Component,
    AgregarVacunaComponent,
    AgregarNinoComponent,
    AplicarVacunaComponent,
    NinosPorMunicipioComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
