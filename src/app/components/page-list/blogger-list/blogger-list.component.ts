import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-blogger-list',
  templateUrl: './blogger-list.component.html',
  styleUrl: './blogger-list.component.css'
})
export class BloggerListComponent implements OnInit {
  bloggers: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private adminService: AdminService) {}

  ngOnInit() {
    this.fetchBloggers();
  }

  fetchBloggers() {
    this.adminService.getAllBloggers().subscribe(
      (response: any) => {
        this.bloggers = response;
      },
      (error) => {
        console.error("Error fetching stores:", error);
      }
    );
  }

  get filteredBloggers() {
    return this.bloggers.filter(blogger =>
      blogger.bloggerName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      blogger.specialty?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  hireBlogger(bloggerId: string) {
    // Implement hire blogger logic here
    console.log('Hiring blogger:', bloggerId);
  }
}
