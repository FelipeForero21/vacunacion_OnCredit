import { Component } from '@angular/core';
import { NinoService } from '../../../services/nino.service';
import { ComunicacionService } from '../../../services/comunicacion.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  tarjetaIdentidad: string = ''; 
  coincidencias: any[] = [];

  private searchTerms = new Subject<string>(); 

  constructor(
    private ninoService: NinoService,
    private comunicacionService: ComunicacionService
  ) {}

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      switchMap((term: string) => this.ninoService.buscarPorTI(term))
    ).subscribe({
      next: (data) => {
        this.coincidencias = data;
      },
      error: (error) => {
        console.error('Error en la búsqueda:', error);
      },
      complete: () => {
        console.log('Búsqueda completada');
      }
    });
  }
  

  onSearchChange(term: string): void {
    this.searchTerms.next(term); 
  }

  seleccionarNino(nino: any): void {
    this.comunicacionService.enviarNinoEncontrado(nino); 
  }
}
