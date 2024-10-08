import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://sale-nest-api.onrender.com/api';
// const API_URL = 'http://localhost:3000/api';

export interface Video {
  _id: string;
  title: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  viewers: number;
  category: string;
  thumbnailUrl: string;
  streamUrl: string;
}

export interface Creator {
  _id: string;
  username: string;
  followers: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class LivestreamService {
  constructor(private http: HttpClient) {}

  getVideoById(id: string): Observable<Video> {
    return this.http.get<Video>(`${API_URL}/videos/${id}`);
  }

  getFeaturedVideo(): Observable<Video> {
    return this.http.get<Video>(`${API_URL}/videos/featured`);
  }

  getRelatedVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${API_URL}/videos/related`);
  }

  getTopCreators(): Observable<Creator[]> {
    return this.http.get<Creator[]>(`${API_URL}/creators/top`);
  }
}