import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map, retry } from 'rxjs';
import { ClincDTO } from '../dtos/clinc.dto';

@Injectable({
  providedIn: 'root'
})
export class ClincService {

  constructor(private http: HttpClient) { }


  createClinc(clinc: ClincDTO): Observable<ClincDTO> {
    return this.http.post<ClincDTO>(`${environment.API_URL}/clinc`, clinc);
  }

  updateClinc(id: number, clinc: ClincDTO): Observable<ClincDTO> {
    return this.http.put<ClincDTO>(`${environment.API_URL}/clinc/${id}`, clinc);
  }

  deleteClinc(id: number) {
    return this.http.delete(`${environment.API_URL}/clinc/${id}`);
  }

  getClincs(page: number, limit: number): Observable<{ data: ClincDTO[]; total: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<{ data: ClincDTO[]; total: number }>(`${environment.API_URL}/clinc`, { params }).pipe(
      map(response => ({
        data: response.data.map(this.transformToClincDTO),
        total: response.total
      })),
      retry(1)
    );
  }


  private transformToClincDTO(apiResponse: any): ClincDTO {
    return {
      id: apiResponse.id,
      name: apiResponse.name,
      phone: apiResponse.phone,
      ownerName: apiResponse.ownerName,
      cep: apiResponse.address.cep,
      uf: apiResponse.address.uf,
      city: apiResponse.address.city,
      neighborhood: apiResponse.address.neighborhood,
      street: apiResponse.address.street,
      number: apiResponse.address.number,
      complement: apiResponse.address.complement
    };
  }
}
