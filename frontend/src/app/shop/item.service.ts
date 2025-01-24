import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './item.model'; // Import the ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://127.0.0.1:8000/api/items'; // Example API

  constructor(private http: HttpClient) { }

  // Fetch all items with proper typing
  getItems(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  // Send data to the API
  sendData(inputValue: string, selectedFeature: string): Observable<ApiResponse> {
    const payload = {
      title: inputValue,
      name: {
        [selectedFeature]: true // Correctly using dynamic key
      }
    };
    return this.http.post<ApiResponse>(this.apiUrl, payload);
  }
}
