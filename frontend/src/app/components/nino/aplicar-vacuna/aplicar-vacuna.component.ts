import { Component, OnInit } from '@angular/core';
import { VacunasService } from 'src/app/services/vacunas.service';
import { NinoService } from 'src/app/services/nino.service';

@Component({
  selector: 'app-aplicar-vacuna',
  templateUrl: './aplicar-vacuna.component.html',
})
export class AplicarVacunaComponent implements OnInit {
  aplicacion = {
    ninoId: 0,
    vacunaId: 0,
    fechaAplicacion: '',
    departamentoId: 0,
    municipioId: 0,
  };

  tarjetaIdentidad: string = '';
  departamentos: any[] = [];
  municipios: any[] = [];
  ninos: any[] = [];
  ninoResultados: any[] = [];
  vacunas: any[] = [];

  constructor(
    private vacunasService: VacunasService,
    private ninoService: NinoService
  ) {}

  ngOnInit(): void {
    this.vacunasService.obtenerVacunas().subscribe((vacunas) => {
      this.vacunas = vacunas;
    });

    this.ninoService.obtenerDepartamentos().subscribe((departamentos) => {
      this.departamentos = departamentos;
    });
  }

  onInputChange(): void {
    if (this.tarjetaIdentidad.length > 2) {
      this.ninoService
        .buscarPorTI(this.tarjetaIdentidad)
        .subscribe((resultados) => {
          this.ninoResultados = resultados;
        });
    } else {
      this.ninoResultados = [];
    }
  }

  seleccionarNino(nino: any): void {
    if (nino) {
      this.aplicacion.ninoId = nino.id;
      this.aplicacion.fechaAplicacion = new Date().toISOString().split('T')[0];

      if (nino.municipio) {
        this.aplicacion.municipioId = nino.municipio.id || 0;
        if (nino.municipio.departamento) {
          this.aplicacion.departamentoId = nino.municipio.departamento.id || 0;
        } else {
          console.error('El municipio no tiene un departamento asociado.');
        }
      } else {
        console.error('El niño no tiene un municipio asociado.');
      }

      this.onDepartamentoChange({
        target: { value: this.aplicacion.departamentoId },
      });
      this.onMunicipioChange({
        target: { value: this.aplicacion.municipioId },
      });
    } else {
      console.error('No se encontró ningún niño.');
    }
  }

  onDepartamentoChange(event: any): void {
    const departamentoId = event.target.value;
    this.ninoService
      .obtenerMunicipiosPorDepartamento(departamentoId)
      .subscribe((municipios) => {
        this.municipios = municipios;
        this.ninos = [];
      });
  }

  onMunicipioChange(event: any): void {
    const municipioId = event.target.value;
    if (municipioId) {
      this.ninoService.obtenerNinosPorMunicipio(municipioId).subscribe({
        next: (ninos) => {
          this.ninos = ninos;
          console.log('Datos de niños asignados a this.ninos:', this.ninos);
        },
        error: (error) => {
          console.error('Error al obtener niños:', error);
        },
        complete: () => {
          console.log('Proceso de obtención de niños completado.');
        },
      });
    } else {
      this.ninos = [];
    }
  }

  onSubmit(): void {
    this.vacunasService.aplicarVacuna(this.aplicacion).subscribe({
      next: (response: any) => {
        alert('Vacuna aplicada correctamente');
        this.aplicacion = {
          ninoId: 0,
          vacunaId: 0,
          fechaAplicacion: '',
          departamentoId: 0,
          municipioId: 0,
        };
      },
      error: (error: any) => {
        alert(
          'Hubo un error al aplicar la vacuna, No cumple con la Edad Permitida.'
        );
        console.error(error);
      },
    });
  }
}
