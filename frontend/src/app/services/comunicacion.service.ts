import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  private ninoEncontradoSource = new BehaviorSubject<any>(null);
  ninoEncontrado$ = this.ninoEncontradoSource.asObservable();

  enviarNinoEncontrado(nino: any) {
    this.ninoEncontradoSource.next(nino);
  }
}