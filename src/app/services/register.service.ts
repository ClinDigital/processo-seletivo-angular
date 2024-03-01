import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(cpf: string, name: string, email: string, password: string, phoneNumber: string): Observable<any[]> {
    return this.http.post<any>(`${environment.API_URL}/users`, {
      cpf, name, email, password, phoneNumber
    }).pipe((retry(1)));
  }

}
