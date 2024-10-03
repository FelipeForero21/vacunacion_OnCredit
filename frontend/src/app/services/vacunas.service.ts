import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacunasService {
  private apiUrl = 'http://localhost:3000/vacunas'; 
  private aplicarVacunaUrl = 'http://localhost:3000/nino-vacuna';  

  constructor(private http: HttpClient) { }

  agregarVacuna(vacuna: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, vacuna);
  }

  aplicarVacuna(aplicacion: any): Observable<any> {
    return this.http.post<any>(this.aplicarVacunaUrl, aplicacion);  
  }

  obtenerVacunas(): Observable<any> {
    return this.http.get<any>(this.apiUrl); 
  }
}
