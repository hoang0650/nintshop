import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VideoService, Video } from '../../services/video.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-german-lesson',
  templateUrl: './german-lesson.component.html',
  styleUrl: './german-lesson.component.css'
})
export class GermanLessonComponent implements OnInit{
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  lesson: Video | null = null;
  lessons: Video[] = [];
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  playbackRate = '1';
  currentTranscript = '';

  constructor(
    private videoService: VideoService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.videoService.getGermanLessons().subscribe(
      lessons => {
        this.lessons = lessons;
        if (lessons.length > 0) {
          this.loadLesson(lessons[0]._id);
        }
      },
      error => {
        console.error('Error loading lessons', error);
        this.message.error('Failed to load lessons');
      }
    );
  }

  loadLesson(id: string) {
    this.videoService.getVideo(id).subscribe(
      lesson => {
        this.lesson = lesson;
        this.resetAudio();
      },
      error => {
        console.error('Error loading lesson', error);
        this.message.error('Failed to load lesson');
      }
    );
  }

  togglePlay() {
    if (this.audioPlayer.nativeElement.paused) {
      this.audioPlayer.nativeElement.play();
      this.isPlaying = true;
    } else {
      this.audioPlayer.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  onTimeUpdate() {
    this.currentTime = this.audioPlayer.nativeElement.currentTime;
    this.duration = this.audioPlayer.nativeElement.duration;
    this.updateCurrentTranscript();
  }

  seek(time: number) {
    this.audioPlayer.nativeElement.currentTime = time;
  }

  changePlaybackRate() {
    this.audioPlayer.nativeElement.playbackRate = parseFloat(this.playbackRate);
  }

  resetAudio() {
    this.audioPlayer.nativeElement.currentTime = 0;
    this.currentTime = 0;
    this.isPlaying = false;
    this.updateCurrentTranscript();
  }

  updateCurrentTranscript() {
    if (this.lesson  && this.lesson.transcript) {
      const currentTranscript = this.lesson.transcript.find(
        item => this.currentTime >= item.start && this.currentTime < item.end
      );
      this.currentTranscript = currentTranscript ? currentTranscript.text : '';
    }
  }

  isActiveTranscript(item: { start: number; end: number }): boolean {
    return this.currentTime >= item.start && this.currentTime < item.end;
  }

  seekToTranscript(item: { start: number; end: number }) {
    this.seek(item.start);
    if (!this.isPlaying) {
      this.togglePlay();
    }
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
