import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(private httpClient: HttpClient) {}

  Init() {
    return new Promise<void>((resolve, reject) => {
      if (localStorage.getItem('token')) {
        this.httpClient.get<{ user :any }>(`/api/me`).subscribe({
          next: (res: any) => resolve(res),
          error: () => reject(),
        });
      } else {
        reject();
      }
    });
  }
}
