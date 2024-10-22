export interface Reply {
    author: string;      // Tên tác giả phản hồi
    content: string;     // Nội dung phản hồi
    date: Date;          // Ngày phản hồi được gửi
    avatarUrl: string;   // Đường dẫn tới avatar của tác giả phản hồi
}

export interface Comment {
    id: number;          // Thêm ID cho bình luận để quản lý phản hồi
    author: string;      // Tên của tác giả bình luận
    content: string;     // Nội dung bình luận
    date: Date;          // Ngày bình luận được gửi
    avatarUrl: string;   // Đường dẫn tới avatar của người dùng
    likes: number;       // Số lượt like cho bình luận
    replies: Reply[];    // Danh sách phản hồi
    showReplies?: boolean; // Để theo dõi xem có hiển thị phản hồi hay không
}
