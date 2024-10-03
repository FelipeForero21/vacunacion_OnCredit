import { Component } from '@angular/core';
import { VacunasService } from 'src/app/services/vacunas.service';

@Component({
  selector: 'app-agregar-vacuna',
  templateUrl: './agregar-vacuna.component.html'
})
export class AgregarVacunaComponent {
  vacuna = {
    nombre: '',
    edadMaxima: 0
  };

  constructor(private vacunasService: VacunasService) {}

  onSubmit(): void {
    this.vacunasService.agregarVacuna(this.vacuna).subscribe({
      next: (response: any) => {
        console.log('Vacuna guardada exitosamente', response);
        alert('Vacuna agregada correctamente');
        this.vacuna = { nombre: '', edadMaxima: 0 };
      },
      error: (error: any) => {
        console.error('Error al guardar la vacuna', error);
        alert('Hubo un error al agregar la vacuna.');
      }
    });
  }
  
}
