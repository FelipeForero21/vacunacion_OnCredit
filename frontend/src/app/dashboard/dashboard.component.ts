import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComunicacionService } from '../services/comunicacion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalDepartamentos: number = 0;
  totalMunicipios: number = 0;
  ninosVacunados: number = 0;
  ninosRestantes: number = 0;

  ninos: any[] = [];
  totalNinos: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  vacunasPendientes: any[] = [];
  ninoSeleccionado: any;
  ninoEncontrado: any = null;

  @ViewChild('ninoModal') ninoModal!: TemplateRef<any>;
  @ViewChild('vacunasPendientesModal')
  vacunasPendientesModal!: TemplateRef<any>;

  constructor(
    private dashboardService: DashboardService,
    private modalService: NgbModal,
    private comunicacionService: ComunicacionService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadNinos();

    this.comunicacionService.ninoEncontrado$.subscribe((nino) => {
      if (nino) {
        this.ninoEncontrado = nino;
        this.modalService.open(this.ninoModal, { size: 'lg' });
      }
    });
  }

  loadDashboardData(): void {
    this.dashboardService.getTotalDepartamentos().subscribe((data) => {
      this.totalDepartamentos = data;
    });

    this.dashboardService.getTotalMunicipios().subscribe((data) => {
      this.totalMunicipios = data;
    });

    this.dashboardService.getNinosVacunados().subscribe((data) => {
      this.ninosVacunados = data;
      this.calcularNiñosRestantes();
    });

    this.dashboardService.getNinosNoVacunados().subscribe((data) => {
      this.ninosRestantes = data;
    });
  }

  calcularNiñosRestantes(): void {}

  loadNinos(page: number = 1): void {
    this.dashboardService
      .getNinos(page, this.pageSize)
      .subscribe((response) => {
        this.ninos = response.data.sort((a: any, b: any) => {
          return (
            new Date(b.fechaActualizacion).getTime() -
            new Date(a.fechaActualizacion).getTime()
          );
        });
        this.totalNinos = response.meta.totalItems;
        this.currentPage = +response.meta.currentPage;
      });
  }

  onPageChange(page: number): void {
    this.loadNinos(page);
  }

  verVacunasPendientes(nino: any): void {
    this.ninoSeleccionado = nino;
    this.dashboardService.getVacunasPendientes(nino.id).subscribe({
      next: (data: any) => {
        this.vacunasPendientes = data;
        this.modalService.open(this.vacunasPendientesModal, { size: 'lg' });
      },
      error: (error: any) => {
        console.error('Error al obtener vacunas pendientes:', error);
      },
    });
  }

  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  getImageForGenero(genero: string): string {
    if (genero === 'Masculino') {
      return 'assets/imagenes/nino.png';
    } else if (genero === 'Femenino') {
      return 'assets/imagenes/nina.png';
    } else {
      return 'assets/imagenes/default.png';
    }
  }
}
