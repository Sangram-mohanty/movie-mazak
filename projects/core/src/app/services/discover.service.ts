import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../../environment';
import { Movie } from '../../types/discover.types';

@Injectable({
  providedIn: 'root',
})
export class DiscoverService {
  private readonly baseUrl: string = `${environment.url}discover/`;
  private readonly http = inject(HttpClient);

  getARandomMovie(): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}movie`);
  }
}
