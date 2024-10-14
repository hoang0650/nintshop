// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent  implements OnInit {
  avatarUrl: any;
  user: any;
  posts: any[] = [];
  friends: any[] = [];
  blockedUsers: any[] = [];
  userId: string =''; // Replace with actual user ID or authentication mechanism
  friend = [
    { avatarUrl: 'img/cat-1.jpg', name: 'Follower 1', location: 'Hồ Chí Minh' },
    { avatarUrl: 'img/cat-2.jpg', name: 'Follower 2', location: 'Hà Nội' },
    { avatarUrl: 'img/cat-3.jpg', name: 'Follower 3', location: 'Đà Nẵng' },
    { avatarUrl: 'img/cat-4.jpg', name: 'Follower 4', location: 'Đồng Nai' },
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserInfor();
    this.loadUserProfile();
    this.loadUserPosts();
    this.loadFriends();
    this.loadBlockedUsers();
  }

  loadUserInfor(){
    this.userService.getUserInfor().subscribe(
      (data:any)=>{
        this.userId = data._id
      }
    )
  }

  loadUserProfile() {
    this.userService.getFriendLists(this.userId).subscribe(
      (data: any) => {
        this.friends = data;
      },
      error => console.error('Error loading user profile', error)
    );
  }

  loadUserPosts() {
    this.userService.getUserPosts(this.userId).subscribe(
      (data: any) => {
        this.posts = data;
      },
      error => console.error('Error loading user posts', error)
    );
  }

  loadFriends() {
    this.userService.getFriends(this.userId).subscribe(
      (data: any) => {
        this.friends = data;
      },
      error => console.error('Error loading friends', error)
    );
  }

  loadBlockedUsers() {
    this.userService.getBlockedUsers(this.userId).subscribe(
      (data: any) => {
        this.blockedUsers = data;
      },
      error => console.error('Error loading blocked users', error)
    );
  }

  addFriend(friendId: string) {
    this.userService.addFriend(this.userId, friendId).subscribe(
      () => {
        this.loadFriends();
      },
      error => console.error('Error adding friend', error)
    );
  }

  removeFriend(friendId: string) {
    this.userService.removeFriend(this.userId, friendId).subscribe(
      () => {
        this.loadFriends();
      },
      error => console.error('Error removing friend', error)
    );
  }

  blockUser(blockedUserId: string) {
    this.userService.blockUser(this.userId, blockedUserId).subscribe(
      () => {
        this.loadBlockedUsers();
      },
      error => console.error('Error blocking user', error)
    );
  }

  updateAvatar(event: any) {
    const file = event.target.files[0];
    this.userService.updateAvatar(this.userId, file).subscribe(
      (data: any) => {
        this.user.avatar = data.avatar;
      },
      error => console.error('Error updating avatar', error)
    );
  }

  updateCoverPhoto(event: any) {
    const file = event.target.files[0];
    this.userService.updateCoverPhoto(this.userId, file).subscribe(
      (data: any) => {
        this.user.coverPhoto = data.coverPhoto;
      },
      error => console.error('Error updating cover photo', error)
    );
  }

  addPost(event: Event) {
    this.posts.unshift(event);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;  // Hiển thị ảnh mới
      };
      reader.readAsDataURL(file);
    }
  }
  
}