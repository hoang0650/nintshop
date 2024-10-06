import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Livestream {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  viewerCount: number;
}

export interface CreateLivestreamDto {
  title: string;
  description: string;
  thumbnailUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class LivestreamService {
  private apiUrl = 'http://your-api-url/api/livestreams'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getLivestreams(): Observable<Livestream[]> {
    return this.http.get<Livestream[]>(this.apiUrl);
  }

  getLivestreamById(id: string): Observable<Livestream> {
    return this.http.get<Livestream>(`${this.apiUrl}/${id}`);
  }

  createLivestream(livestreamData: CreateLivestreamDto): Observable<Livestream> {
    return this.http.post<Livestream>(this.apiUrl, livestreamData);
  }
}