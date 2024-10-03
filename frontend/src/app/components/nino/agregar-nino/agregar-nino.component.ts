import { Component, OnInit } from '@angular/core';
import { NinoService } from 'src/app/services/nino.service';

@Component({
  selector: 'app-agregar-nino',
  templateUrl: './agregar-nino.component.html'
})
export class AgregarNinoComponent implements OnInit {
  nino = {
    nombres: '',
    fechaNacimiento: '',
    genero: '',
    tarjetaIdentidad: '',
    municipioId: 0
  };

  departamentos: any[] = [];
  municipios: any[] = [];

  constructor(private ninoService: NinoService) {}

  ngOnInit(): void {
    this.ninoService.obtenerDepartamentos().subscribe(departamentos => {
      this.departamentos = departamentos;
    });
  }

  onDepartamentoChange(event: any): void {
    const departamentoId = event.target.value;
    this.ninoService.obtenerMunicipiosPorDepartamento(departamentoId).subscribe(municipios => {
      this.municipios = municipios;
    });
  }

  onSubmit(): void {
    this.ninoService.agregarNino(this.nino).subscribe({
      next: (response) => {
        alert('Niño agregado correctamente');
        this.nino = { nombres: '', fechaNacimiento: '', genero: '', tarjetaIdentidad: '', municipioId: 0 };
      },
      error: (error) => {
        alert('Hubo un error al agregar el niño, ya existe');
        console.error('Error:', error);
      }
    });
  }
  
}
