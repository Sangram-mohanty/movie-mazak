import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environment";
import {GenreType, IGenre} from "../../types/genre.types";

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private readonly baseUrl = `${environment.url}genre/`;
  private readonly http = inject(HttpClient);

  getGenreList(genreType: GenreType) {
    return this.http.get<IGenre>(`${this.baseUrl}${genreType}/list`);
  }
}
