import { Component } from '@angular/core';
import { LivestreamService, Livestream, CreateLivestreamDto } from '../../services/livestream.service';
interface Stream {
  id: number;
  title: string;
  streamer: string;
  viewers: number;
  thumbnailUrl: string;
}

interface ChatMessage {
  username: string;
  message: string;
}
@Component({
  selector: 'app-livestream-homepage',
  templateUrl: './livestream-homepage.component.html',
  styleUrls: ['./livestream-homepage.component.scss']
})
export class LivestreamHomepageComponent {
  mainVideo = {
    id: 0,
    title: 'Featured Live Stream',
    username: '@featured_user',
    description: 'Don\'t miss out on this amazing live performance!',
    likes: '50.2K',
    comments: '5.2K',
    viewers: '100K'
  };

  relatedVideos = [
    { id: 1, title: 'Cooking Show', username: '@chef_user', description: 'Learn to cook delicious meals', likes: '15.2K', comments: '1.2K', category: 'Cooking' },
    { id: 2, title: 'Gaming Stream', username: '@gamer_user', description: 'Watch me play the latest games', likes: '20.5K', comments: '2.8K', category: 'Gaming' },
    { id: 3, title: 'Music Concert', username: '@musician_user', description: 'Live music performance', likes: '30.1K', comments: '3.5K', category: 'Music' },
    { id: 4, title: 'Art Creation', username: '@artist_user', description: 'Watch me create a masterpiece', likes: '10.7K', comments: '800', category: 'Art' }
  ];

  creatorRankings = [
    { rank: 1, username: '@top_creator', followers: '1.2M', category: 'Entertainment' },
    { rank: 2, username: '@music_star', followers: '980K', category: 'Music' },
    { rank: 3, username: '@fitness_guru', followers: '850K', category: 'Fitness' },
    { rank: 4, username: '@tech_wizard', followers: '720K', category: 'Technology' },
    { rank: 5, username: '@food_lover', followers: '650K', category: 'Cooking' }
  ];

  suggestedCategories = [
    'All', 'Gaming', 'Music', 'Cooking', 'Art', 'Technology', 'Fitness', 'Travel', 'Comedy'
  ];

  goToLiveDetail(videoId: number) {
    console.log(`Navigating to live detail page for video ${videoId}`);
    // Implement navigation logic here
  }

  filterByCategory(category: string) {
    console.log(`Filtering by category: ${category}`);
    // Implement category filtering logic here
  }
}