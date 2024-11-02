import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
  @Input() project: any;

  // Danh sách bình luận của freelancer
  comments = [
    {
      freelancer: {
        name: 'Nguyễn Văn A',
        avatar: '/path/to/avatar1.png',
      },
      comment: 'Tôi có kinh nghiệm trong lĩnh vực này và cam kết hoàn thành đúng tiến độ.',
      offerPrice: '5,500,000',
    },
    {
      freelancer: {
        name: 'Trần Thị B',
        avatar: '/path/to/avatar2.png',
      },
      comment: 'Tôi sẽ hoàn thành dự án này với chất lượng cao nhất và giá cạnh tranh.',
      offerPrice: '5,200,000',
    },
    {
      freelancer: {
        name: 'Lê Văn C',
        avatar: '/path/to/avatar3.png',
      },
      comment: 'Tôi có thể làm dự án này trong thời gian ngắn với giá hợp lý.',
      offerPrice: '4,900,000',
    },
  ];

  // Hàm chọn freelancer
  selectFreelancer(freelancer: any) {
    alert(`Bạn đã chọn freelancer ${freelancer.name}!`);
  }
}
