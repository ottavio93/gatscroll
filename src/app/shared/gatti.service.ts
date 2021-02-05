import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GattiService {
  constructor(private http: HttpClient) {}

  getAllCats(): Observable<any> {
    return this.http.get(
      'https://api.thecatapi.com/images?api_key=96c18ce4-eaec-45a8-bd6c-fdf6aa3b96fa'
    );
  }

  geti() {
    return this.http.get(
      'https://api.thecatapi.com/v1/breeds?api_key=96c18ce4-eaec-45a8-bd6c-fdf6aa3b96fa'
    );
  }
}
