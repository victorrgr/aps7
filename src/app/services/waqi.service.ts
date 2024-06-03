import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WaqiService {
  constructor(private http: HttpClient) {}

  search(query: string) {
    return this.http.get<any>(`${environment.apiUrl}/search/`, {
      params: {
        keyword: query,
        token: environment.apiToken,
      },
    });
  }
}
