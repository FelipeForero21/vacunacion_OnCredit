import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getTotalDepartamentos(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/departamentos`).pipe(
      map(departamentos => departamentos.length)  
    );
  }

  getTotalMunicipios(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/municipios`).pipe(
      map(municipios => municipios.length)  
    );
  }

  getNinosVacunados(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/nino-vacuna/vacunados/count`);
  }

  getNinosNoVacunados(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/nino-vacuna/no-vacunados/count`);
  }

  getNinos(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ninos?page=${page}&limit=${limit}`);
  }

  getVacunasPendientes(ninoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nino-vacuna/pendientes/${ninoId}`);
  }

  aplicarVacuna(aplicarVacunaDto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/nino-vacuna`, aplicarVacunaDto);
  }

  actualizarEstadoVacunacion(ninoId: number, estado: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/ninos/${ninoId}/estado-vacunacion`, { estaVacunado: estado });
  }
  
  
}
