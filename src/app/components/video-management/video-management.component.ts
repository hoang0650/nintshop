import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VideoService, Video } from '../../services/video.service';
import { VideoFormComponent } from '../video-form/video-form.component';

@Component({
  selector: 'app-video-management',
  templateUrl: './video-management.component.html',
  styleUrl: './video-management.component.css'
})
export class VideoManagementComponent {
  videos: Video[] = [];

  constructor(
    private videoService: VideoService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this.videoService.getVideos().subscribe(
      videos => this.videos = videos,
      error => {
        console.error('Error loading videos', error);
        this.message.error('Failed to load videos');
      }
    );
  }

  openVideoModal(video?: Video) {
    const modal = this.modalService.create({
      nzTitle: video ? 'Edit Video/Lesson' : 'Add New Video/Lesson',
      nzContent: VideoFormComponent,
      nzData:{
        video
      },
      nzFooter: null,
      nzWidth: 720
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        if (video) {
          this.updateVideo(video._id, result);
        } else {
          this.addVideo(result);
        }
      }
    });
  }

  addVideo(video: Omit<Video, '_id'>) {
    this.videoService.addVideo(video).subscribe(
      newVideo => {
        this.videos = [...this.videos, newVideo];
        this.message.success('Video/Lesson added successfully');
      },
      error => {
        console.error('Error adding video', error);
        this.message.error('Failed to add video/lesson');
      }
    );
  }

  updateVideo(id: string, video: Partial<Video>) {
    this.videoService.updateVideo(id, video).subscribe(
      updatedVideo => {
        this.videos = this.videos.map(v => v._id === id ? updatedVideo : v);
        this.message.success('Video/Lesson updated successfully');
      },
      error => {
        console.error('Error updating video', error);
        this.message.error('Failed to update video/lesson');
      }
    );
  }

  deleteVideo(id: string) {
    this.videoService.deleteVideo(id).subscribe(
      () => {
        this.videos = this.videos.filter(v => v._id !== id);
        this.message.success('Video/Lesson deleted successfully');
      },
      error => {
        console.error('Error deleting video', error);
        this.message.error('Failed to delete video/lesson');
      }
    );
  }
}
