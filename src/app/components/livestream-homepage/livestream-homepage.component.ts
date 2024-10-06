import { Component } from '@angular/core';
import { LivestreamService, Livestream, CreateLivestreamDto } from '../../services/livestream.service';
interface Video {
  id: number;
  title: string;
  views: number;
  timeAgo: string;
  thumbnailUrl: string;
}

interface Gift {
  id: number;
  name: string;
}
@Component({
  selector: 'app-livestream-homepage',
  templateUrl: './livestream-homepage.component.html',
  styleUrls: ['./livestream-homepage.component.scss']
})
export class LivestreamHomepageComponent {
  constructor(private livestreamService: LivestreamService) { }
  latestVideo: Video = {
    id: 1,
    title: 'Livestream gần nhất',
    views: 10000,
    timeAgo: '1 giờ trước',
    thumbnailUrl: '/assets/latest-video-thumbnail.jpg'
  };

  gifts: Gift[] = [
    { id: 1, name: 'Quà 1' },
    { id: 2, name: 'Quà 2' },
    { id: 3, name: 'Quà 3' },
    { id: 4, name: 'Quà 4' }
  ];

  relatedVideos: Video[] = Array(12).fill(null).map((_, index) => ({
    id: index + 2,
    title: `Video liên quan ${index + 1}`,
    views: Math.floor(Math.random() * 10000),
    timeAgo: `${Math.floor(Math.random() * 24)} giờ trước`,
    thumbnailUrl: `/assets/video-thumbnail-${index + 1}.jpg`
  }));

  getRelatedVideoCards() {
    return Array(3).fill(null).map((_, i) => 
      this.relatedVideos.slice(i * 4, (i + 1) * 4)
    );
  }

  startLivestream() {
    const newLivestream: CreateLivestreamDto = {
      title: 'My New Livestream',
      description: 'This is a test livestream',
      thumbnailUrl: 'https://example.com/thumbnail.jpg'
    };

    this.livestreamService.createLivestream(newLivestream).subscribe(
      (createdLivestream: Livestream) => {
        console.log('Livestream created:', createdLivestream);
        // Navigate to the new livestream or update the UI as needed
      },
      (error) => {
        console.error('Error creating livestream:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    );
  }
}