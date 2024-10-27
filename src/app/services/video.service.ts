import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transcript {
  start: number;
  end: number;
  text: string;
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  duration: number;
  uploadDate: Date;
  isGermanLesson: boolean;
  transcript?: Transcript[];
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'http://localhost:3000/api/audios';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}`);
  }

  getGermanLessons(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}/german-lessons`);
  }

  getVideo(id: string): Observable<Video> {
    return this.http.get<Video>(`${this.apiUrl}/${id}`);
  }

  addVideo(video: Omit<Video, '_id'>): Observable<Video> {
    return this.http.post<Video>(`${this.apiUrl}`, video);
  }

  updateVideo(id: string, video: Partial<Video>): Observable<Video> {
    return this.http.put<Video>(`${this.apiUrl}/${id}`, video);
  }

  deleteVideo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}