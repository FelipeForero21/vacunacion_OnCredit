import { Component, OnInit } from '@angular/core';
import { NinoService } from 'src/app/services/nino.service';

@Component({
  selector: 'app-ninos-por-municipio',
  templateUrl: './ninos-por-municipio.component.html',
  styleUrls: ['./ninos-por-municipio.component.css'],
})
export class NinosPorMunicipioComponent implements OnInit {
  departamentos: any[] = [];
  municipios: any[] = [];
  ninos: any[] = [];
  promedioEdad: number = 0;
  cantidadNinos: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  selectedDepartamentoId: number = 0;
  selectedMunicipioId: number = 0;
  selectedVacunacionStatus: string = 'todos';
  page: number = 1;
  limit: number = 10;

  constructor(private ninoService: NinoService) {}

  ngOnInit(): void {
    this.ninoService.obtenerDepartamentos().subscribe({
      next: (departamentos) => {
        this.departamentos = departamentos;
        if (departamentos.length > 0) {
          this.selectedDepartamentoId = departamentos[0].id;
          this.onDepartamentoChange({
            target: { value: this.selectedDepartamentoId },
          });
        }
      },
      error: (error) => {
        console.error('Error al obtener departamentos:', error);
        this.errorMessage = 'No se pudieron cargar los departamentos.';
      },
    });
  }

  onDepartamentoChange(event: any): void {
    const departamentoId = event.target.value;
    this.selectedDepartamentoId = departamentoId;
    this.ninoService.obtenerMunicipiosPorDepartamento(departamentoId).subscribe(
      (municipios) => {
        this.municipios = municipios;
        if (municipios.length > 0) {
          this.selectedMunicipioId = municipios[0].id;
          this.fetchNinos();
        } else {
          this.municipios = [];
          this.ninos = [];
          this.promedioEdad = 0;
          this.cantidadNinos = 0;
        }
      },
      (error) => {
        console.error('Error al obtener municipios:', error);
        this.errorMessage = 'No se pudieron cargar los municipios.';
      }
    );
  }

  onMunicipioChange(event: any): void {
    const municipioId = event.target.value;
    this.selectedMunicipioId = municipioId;
    this.fetchNinos();
  }

  onFilterChange(): void {
    this.fetchNinos();
  }

  fetchNinos(): void {
    if (!this.selectedMunicipioId) {
      this.ninos = [];
      this.promedioEdad = 0;
      this.cantidadNinos = 0;
      return;
    }

    const estado = this.selectedVacunacionStatus || 'todos';

    this.ninoService
      .getFilteredNinos(this.selectedMunicipioId, estado)
      .subscribe({
        next: (response: any) => {
          this.ninos = response.data;
        },
        error: (error: any) => {
          console.error('Error al obtener los niños filtrados:', error);
          this.errorMessage = 'No se pudieron cargar los niños filtrados.';
          this.ninos = [];
        },
      });

    this.ninoService
      .obtenerPromedioEdadPorMunicipio(this.selectedMunicipioId)
      .subscribe({
        next: (response: any) => {
          this.promedioEdad = parseFloat(response.promedioEdad) || 0;
        },
        error: (error: any) => {
          console.error('Error al obtener el promedio de edad:', error);
          this.promedioEdad = 0;
        },
      });

    this.ninoService
      .obtenerNinosPorMunicipio(this.selectedMunicipioId)
      .subscribe({
        next: (response: any) => {
          if (Array.isArray(response.data)) {
            this.cantidadNinos = response.data.length;
          } else if (Array.isArray(response)) {
            this.cantidadNinos = response.length;
          } else {
            this.cantidadNinos = 0;
          }
        },
        error: (error: any) => {
          console.error('Error al obtener la cantidad de niños:', error);
          this.cantidadNinos = 0;
        },
      });
  }

  onCambiarMunicipio(ninoId: number, nuevoMunicipioId: number): void {
    if (nuevoMunicipioId && ninoId) {
      this.ninoService
        .cambiarMunicipioDeNino(ninoId, nuevoMunicipioId)
        .subscribe({
          next: () => {
            this.successMessage =
              'El niño ha sido cambiado de municipio correctamente.';
            this.fetchNinos();

            setTimeout(() => {
              this.successMessage = '';
            }, 3000);
          },
          error: (error) => {
            console.error('Error al cambiar el municipio:', error);
            this.errorMessage = 'No se pudo cambiar el municipio del niño.';
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          },
        });
    }
  }
}
