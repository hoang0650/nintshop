import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface Project {
  id: number;
  title: string;
  blogger: string;
  startDate: string;
  endDate: string;
  status: string;
  progress: number;
}

interface Milestone {
  title: string;
  date: string;
  description: string;
}
@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.css'
})
export class ProjectManagementComponent implements OnInit {
  projects: Project[] = [
    { id: 1, title: 'Chiến dịch quảng cáo sản phẩm A', blogger: 'Nguyễn Văn A', startDate: '2023-06-01', endDate: '2023-06-30', status: 'Đang thực hiện', progress: 60 },
    { id: 2, title: 'Review nhà hàng XYZ', blogger: 'Trần Thị B', startDate: '2023-06-15', endDate: '2023-07-15', status: 'Đang thực hiện', progress: 30 },
    { id: 3, title: 'Bài viết về du lịch Đà Nẵng', blogger: 'Lê Văn C', startDate: '2023-05-01', endDate: '2023-05-31', status: 'Hoàn thành', progress: 100 },
    { id: 4, title: 'Series video về công nghệ mới', blogger: 'Phạm Thị D', startDate: '2023-07-01', endDate: '2023-08-31', status: 'Chưa bắt đầu', progress: 0 },
    { id: 5, title: 'Bài viết về xu hướng thời trang', blogger: 'Hoàng Văn E', startDate: '2023-06-10', endDate: '2023-07-10', status: 'Đang thực hiện', progress: 45 },
  ];

  selectedProject: Project | null = null;
  isModalVisible = false;
  isCreateModalVisible = false;
  createProjectForm!: FormGroup;

  milestones: Milestone[] = [
    { title: 'Bắt đầu dự án', date: '2023-06-01', description: 'Khởi động dự án và phân công nhiệm vụ' },
    { title: 'Hoàn thành bản nháp', date: '2023-06-15', description: 'Hoàn thành bản nháp đầu tiên của bài viết' },
    { title: 'Chỉnh sửa và phản hồi', date: '2023-06-22', description: 'Nhận phản hồi và chỉnh sửa bài viết' },
    { title: 'Hoàn thiện nội dung', date: '2023-06-28', description: 'Hoàn thiện nội dung cuối cùng' },
    { title: 'Xuất bản', date: '2023-06-30', description: 'Xuất bản bài viết trên các nền tảng' },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createProjectForm = this.fb.group({
      title: ['', [Validators.required]],
      blogger: ['', [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      status: ['Chưa bắt đầu', [Validators.required]]
    });
  }

  showProjectDetails(project: Project): void {
    this.selectedProject = project;
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Đang thực hiện':
        return 'blue';
      case 'Hoàn thành':
        return 'green';
      case 'Chưa bắt đầu':
        return 'gray';
      default:
        return 'default';
    }
  }
  showCreateProjectModal(): void {
    this.isCreateModalVisible = true;
  }

  handleCreateProjectCancel(): void {
    this.isCreateModalVisible = false;
    this.createProjectForm.reset();
  }

  handleCreateProjectOk(): void {
    if (this.createProjectForm.valid) {
      const newProject: Project = {
        id: this.projects.length + 1,
        title: this.createProjectForm.get('title')?.value,
        blogger: this.createProjectForm.get('blogger')?.value,
        startDate: this.createProjectForm.get('startDate')?.value,
        endDate: this.createProjectForm.get('endDate')?.value,
        status: this.createProjectForm.get('status')?.value,
        progress: 0
      };
      this.projects = [...this.projects, newProject];
      this.isCreateModalVisible = false;
      this.createProjectForm.reset();
    } else {
      Object.values(this.createProjectForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
