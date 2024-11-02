import { Component } from '@angular/core';
interface Project {
  id: number;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  skills: string[];
  proposals: number;
  client: {
    name: string;
    avatar: string;
    rating: number;
  };
  category: string;
}
@Component({
  selector: 'app-freelance-project-list',
  templateUrl: './freelance-project-list.component.html',
  styleUrl: './freelance-project-list.component.css'
})
export class FreelanceProjectListComponent {
  searchTerm: string = '';
  selectedCategory: string = 'all';

  projects: Project[] = [
    {
      id: 1,
      title: 'Thiết kế website bán hàng',
      description: 'Cần thiết kế một website bán hàng thời trang với giao diện hiện đại và responsive.',
      budget: '5,000,000 - 10,000,000 VNĐ',
      deadline: '30 ngày',
      skills: ['React', 'Node.js', 'UI/UX'],
      proposals: 12,
      client: {
        name: 'Công ty ABC',
        avatar: '/placeholder.svg?height=40&width=40',
        rating: 4.8
      },
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'Phát triển ứng dụng di động',
      description: 'Cần phát triển một ứng dụng di động cho cả iOS và Android để quản lý công việc cá nhân.',
      budget: '15,000,000 - 25,000,000 VNĐ',
      deadline: '60 ngày',
      skills: ['React Native', 'Firebase', 'Redux'],
      proposals: 8,
      client: {
        name: 'Startup XYZ',
        avatar: '/placeholder.svg?height=40&width=40',
        rating: 4.5
      },
      category: 'Mobile Development'
    },
    // Add more projects as in the original code
  ];

  get filteredProjects() {
    return this.projects.filter(project =>
      project.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedCategory === 'all' || project.category === this.selectedCategory)
    );
  }
}
