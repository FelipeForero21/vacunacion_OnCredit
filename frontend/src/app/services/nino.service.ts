import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NinoService {
  private apiNinosUrl = 'http://localhost:3000/ninos';
  private apiDepartamentosUrl = 'http://localhost:3000/Departamentos';
  private apiMunicipiosUrl = 'http://localhost:3000/municipios';

  constructor(private http: HttpClient) {}

  agregarNino(nino: any): Observable<any> {
    return this.http.post<any>(this.apiNinosUrl, nino);
  }

  buscarPorTI(tarjetaIdentidad: string): Observable<any> {
    return this.http.get(
      `${this.apiNinosUrl}/tarjeta-identidad/${tarjetaIdentidad}`
    );
  }

  obtenerDepartamentos(): Observable<any> {
    return this.http.get<any>(this.apiDepartamentosUrl);
  }

  obtenerMunicipiosPorDepartamento(idDepartamento: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiMunicipiosUrl}/departamento/${idDepartamento}`
    );
  }

  obtenerNinosPorMunicipio(municipioId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiNinosUrl}/municipio/${municipioId}`)
      .pipe(map((response) => response.data || response));
  }

  obtenerResumenNinosPorMunicipio(): Observable<any> {
    return this.http.get<any>(`${this.apiNinosUrl}/resumen/municipios`);
  }

  obtenerMunicipioPorId(municipioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiMunicipiosUrl}/${municipioId}`);
  }

  obtenerDepartamentoPorMunicipio(municipioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiMunicipiosUrl}/${municipioId}`);
  }

  obtenerPromedioEdadPorMunicipio(municipioId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiNinosUrl}/municipio/${municipioId}/promedio-edad`
    );
  }
  cambiarMunicipioDeNino(ninoId: number, municipioId: number): Observable<any> {
    const body = { municipioId };
    return this.http.put(`${this.apiNinosUrl}/${ninoId}/municipio`, body);
  }

  getFilteredNinos(
    municipioId: number,
    estadoVacunacion: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('municipioId', municipioId.toString())
      .set('estadoVacunacion', estadoVacunacion);

    return this.http.get<any>(`${this.apiNinosUrl}/filtrados`, { params });
  }
}
