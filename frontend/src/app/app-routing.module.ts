import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Error404Component } from './components/shared/error404/error404.component';
import { AgregarVacunaComponent } from './components/vacuna/agregar-vacuna/agregar-vacuna.component';
import { AgregarNinoComponent } from './components/nino/agregar-nino/agregar-nino.component';
import { AplicarVacunaComponent } from './components/nino/aplicar-vacuna/aplicar-vacuna.component';
import { NinosPorMunicipioComponent } from './components/nino/ninos-por-municipio/ninos-por-municipio.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'agregar-vacuna', component: AgregarVacunaComponent},
  { path: 'agregar-nino', component: AgregarNinoComponent},
  { path: 'ninos-por-municipio', component: NinosPorMunicipioComponent},
  { path: 'aplicar-vacuna', component: AplicarVacunaComponent},

  { path: '**', component: Error404Component }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
