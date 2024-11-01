import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blogger-list',
  templateUrl: './blogger-list.component.html',
  styleUrl: './blogger-list.component.css'
})
export class BloggerListComponent implements OnInit {
  bloggers: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBloggers();
  }

  fetchBloggers() {
    this.http.get<any[]>('/api/bloggers').subscribe(
      (data) => {
        this.bloggers = data;
      },
      (error) => {
        console.error('Error fetching bloggers:', error);
      }
    );
  }

  get filteredBloggers() {
    return this.bloggers.filter(blogger =>
      blogger.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      blogger.specialty.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  hireBlogger(bloggerId: string) {
    // Implement hire blogger logic here
    console.log('Hiring blogger:', bloggerId);
  }
}
