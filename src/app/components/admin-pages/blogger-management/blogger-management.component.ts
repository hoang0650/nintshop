import { Component, OnInit } from '@angular/core';
interface Blogger {
  id: number;
  name: string;
  specialty: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
}
@Component({
  selector: 'app-blogger-management',
  templateUrl: './blogger-management.component.html',
  styleUrl: './blogger-management.component.css'
})
export class BloggerManagementComponent implements OnInit {
  bloggers: Blogger[] = [
    { id: 1, name: "Nguyễn Văn A", specialty: "Thời trang", email: "bloggerA@example.com", status: "active" },
    { id: 2, name: "Trần Thị B", specialty: "Ẩm thực", email: "bloggerB@example.com", status: "pending" },
    { id: 3, name: "Lê Văn C", specialty: "Du lịch", email: "bloggerC@example.com", status: "active" },
    { id: 4, name: "Phạm Thị D", specialty: "Công nghệ", email: "bloggerD@example.com", status: "inactive" },
    { id: 5, name: "Hoàng Văn E", specialty: "Sức khỏe", email: "bloggerE@example.com", status: "active" },
  ];

  searchValue = '';

  constructor() { }

  ngOnInit(): void { }

  search(): void {
    this.bloggers = this.bloggers.filter((item) =>
      item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1 ||
      item.specialty.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1 ||
      item.email.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
    );
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }
}
