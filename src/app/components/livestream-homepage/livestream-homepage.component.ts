import { Component } from '@angular/core';
import { LivestreamService, Video, Creator } from '../../services/livestream.service';

@Component({
  selector: 'app-livestream-homepage',
  templateUrl: './livestream-homepage.component.html',
  styleUrls: ['./livestream-homepage.component.scss']
})
export class LivestreamHomepageComponent {
  mainVideo: Video = {
    _id: '0',
    title: 'Default Video',
    username: '@default_user',
    description: 'This is a default video description.',
    likes: 0,
    comments: 0,
    viewers: 0,
    category: 'Default',
    thumbnailUrl: '/assets/default-thumbnail.jpg',
    streamUrl: ''
  };

  relatedVideos: Video[] = [];
  creatorRankings: Creator[] = [];

  suggestedCategories = [
    'All', 'Gaming', 'Music', 'Cooking', 'Art', 'Technology', 'Fitness', 'Travel', 'Comedy'
  ];

  constructor(private livestreamService: LivestreamService) {}

  ngOnInit() {
    this.loadFeaturedVideo();
    this.loadRelatedVideos();
    this.loadTopCreators();
  }

  loadFeaturedVideo() {
    this.livestreamService.getFeaturedVideo().subscribe(
      video => {
        if (video) {
          this.mainVideo = video;
        }
      },
      error => {
        console.error('Error loading featured video:', error);
      }
    );
  }

  loadRelatedVideos() {
    this.livestreamService.getRelatedVideos().subscribe(
      videos => {
        this.relatedVideos = videos.length > 0 ? videos : this.generateDefaultVideos(4);
      },
      error => {
        console.error('Error loading related videos:', error);
        this.relatedVideos = this.generateDefaultVideos(4);
      }
    );
  }

  loadTopCreators() {
    this.livestreamService.getTopCreators().subscribe(
      creators => {
        this.creatorRankings = creators.length > 0 ? creators : this.generateDefaultCreators(5);
      },
      error => {
        console.error('Error loading top creators:', error);
        this.creatorRankings = this.generateDefaultCreators(5);
      }
    );
  }

  generateDefaultVideos(count: number): Video[] {
    return Array(count).fill(null).map((_, index) => ({
      _id: `default-${index}`,
      title: `Default Video ${index + 1}`,
      username: `@default_user_${index + 1}`,
      description: 'This is a default video description.',
      likes: 0,
      comments: 0,
      viewers: 0,
      category: 'Default',
      thumbnailUrl: '/assets/default-thumbnail.jpg',
      streamUrl: ''
    }));
  }

  generateDefaultCreators(count: number): Creator[] {
    return Array(count).fill(null).map((_, index) => ({
      _id: `default-creator-${index}`,
      username: `@default_creator_${index + 1}`,
      followers: 0,
      category: 'Default'
    }));
  }

  goToLiveDetail(videoId: string) {
    console.log(`Navigating to live detail page for video ${videoId}`);
    // Implement navigation logic here
  }

  filterByCategory(category: string) {
    console.log(`Filtering by category: ${category}`);
    // Implement category filtering logic here
  }
}