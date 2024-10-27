import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent implements OnInit {
  constructor(private seoService: SeoService){}
  ngOnInit(): void {
    this.seoService.setSocialShareTags({
      title: 'Nintshop | FAQs - Câu hỏi thường gặp.',
      description: 'FAQs - Câu hỏi thường gặp',
      image: 'https://sale-nest-api.onrender.com/api/upload/image/66f8429b500667cc9350d3f0',
      url: 'www.nintshop.com',
    });
  }
 
  panels = [
    {
      active: false,
      disabled: false,
      name: '1. Tiếp thị liên kết',
      childPanel: [
        {
          active: false,
          question: 'Q: NintShop hỗ trợ chương trình tiếp thị liên kết như thế nào?',
          answer:'A: Chúng tôi cung cấp nền tảng tiếp thị liên kết, giúp bạn kiếm thu nhập thông qua việc giới thiệu sản phẩm và dịch vụ của NintShop. Bạn sẽ nhận được hoa hồng khi khách hàng mua hàng qua liên kết của bạn.'
        },
        {
          active: false,
          question: 'Q: Làm thế nào để tham gia chương trình tiếp thị liên kết?',
          answer:'A: Bạn có thể đăng ký tài khoản tiếp thị liên kết trên trang web của chúng tôi. Sau khi được phê duyệt, bạn sẽ nhận được đường link để bắt đầu quảng bá.'
        }
      ]
    },
    {
      active: false,
      disabled: false,
      name: '2. Đăng tin bất động sản, hàng hóa',
      childPanel: [
        {
          active: false,
          question: 'Q: Tôi có thể đăng tin bất động sản hoặc hàng hóa trên NintShop không?',
          answer:'A: Có, NintShop cho phép người dùng đăng tin bất động sản và hàng hóa để bán. Bạn chỉ cần đăng ký tài khoản và làm theo hướng dẫn để đăng tin.'
        },
        {
          active: false,
          question: 'Q: Quy trình duyệt tin đăng như thế nào?',
          answer:'A: Tin đăng của bạn sẽ được xem xét trong vòng 24-48 giờ. Sau khi được duyệt, tin đăng sẽ hiển thị trên nền tảng của chúng tôi.'
        }
      ]
    },
    {
      active: false,
      disabled: false,
      name: '3. Thúc đẩy doanh thu bán hàng trên đa nền tảng',
      childPanel: [
        {
          active: false,
          question: 'Q: NintShop hỗ trợ quảng bá sản phẩm trên các nền tảng nào?',
          answer:'A: Chúng tôi tích hợp các công cụ quảng cáo và tiếp thị với Google, Facebook, Zalo, và các mạng xã hội khác, giúp bạn tăng khả năng tiếp cận khách hàng.'
        },
        {
          active: false,
          question: 'Q: NintShop có các công cụ nào để theo dõi hiệu quả quảng cáo?',
          answer:'A: Chúng tôi cung cấp các công cụ phân tích và báo cáo chi tiết, giúp bạn theo dõi hiệu quả chiến dịch quảng cáo theo thời gian thực.'
        }
      ]
    },
    {
      active: false,
      disabled: false,
      name: '4. Cho thuê gian hàng trên website',
      childPanel: [
        {
          active: false,
          question: 'Q: Làm thế nào để thuê gian hàng trên NintShop?',
          answer:'A: Bạn chỉ cần liên hệ với đội ngũ hỗ trợ của chúng tôi để đăng ký thuê gian hàng. Sau khi đăng ký thành công, bạn sẽ có thể quản lý và trưng bày sản phẩm của mình.'
        },
        {
          active: false,
          question: 'Q: Có các gói thuê gian hàng nào không?',
          answer:'A: Chúng tôi cung cấp các gói thuê gian hàng linh hoạt, phù hợp với nhu cầu từ cá nhân đến doanh nghiệp lớn.'
        }
      ]
    },
    {
      active: false,
      disabled: false,
      name: '5. Cho blogger thuê để viết blog',
      childPanel: [
        {
          active: false,
          question: 'Q: NintShop có cung cấp dịch vụ thuê blogger để quảng bá không?',
          answer:'A: Có, chúng tôi kết nối với các blogger chuyên nghiệp để viết bài quảng cáo và giới thiệu sản phẩm của bạn tới khách hàng tiềm năng.'
        },
        {
          active: false,
          question: 'Q: Tôi có thể chọn blogger theo lĩnh vực cụ thể không?',
          answer:'A: Chúng tôi sẽ hỗ trợ bạn tìm blogger phù hợp với lĩnh vực sản phẩm hoặc dịch vụ của bạn để tối ưu hóa hiệu quả quảng cáo.'
        }
      ]
    },
    {
      active: false,
      disabled: false,
      name: '6. Đặt hàng order',
      childPanel: [
        {
          active: false,
          question: 'Q: Tôi có thể đặt hàng order qua NintShop như thế nào?',
          answer:'A: Bạn chỉ cần cung cấp thông tin sản phẩm cần order và chi tiết liên hệ. NintShop sẽ hỗ trợ bạn trong quá trình đặt hàng và vận chuyển.'
        },
        {
          active: false,
          question: 'Q: Thời gian giao hàng cho đơn hàng order là bao lâu?',
          answer:'A: Thời gian giao hàng phụ thuộc vào sản phẩm và vị trí của bạn. Thông thường, thời gian giao hàng dao động từ 7-14 ngày làm việc.'
        }
      ]
    },
    {
      active: false,
      disabled: false,
      name: '7. Viết blog, quảng bá hoặc giới thiệu sản phẩm',
      childPanel: [
        {
          active: false,
          question: 'Q: NintShop có dịch vụ viết blog để quảng bá sản phẩm không?',
          answer:'A: Có, chúng tôi có đội ngũ viết bài chuyên nghiệp, cung cấp dịch vụ viết blog để giới thiệu và quảng bá sản phẩm trên website và mạng xã hội.'
        },
        {
          active: false,
          question: 'Q: Bài viết có được tối ưu hóa SEO không?',
          answer:'A: Mọi bài viết đều được tối ưu hóa SEO để giúp sản phẩm của bạn dễ dàng xuất hiện trên các công cụ tìm kiếm.'
        }
      ]
    },
    {
      active: false,
      disabled: false,
      name: '8. Nhận thiết kế website (tên miền tùy chỉnh, tối ưu hóa SEO)',
      childPanel: [
        {
          active: false,
          question: 'Q: NintShop có cung cấp dịch vụ thiết kế website theo yêu cầu không?',
          answer:'A: Có, chúng tôi cung cấp dịch vụ thiết kế website tùy chỉnh, bao gồm cả tên miền và các tính năng theo yêu cầu của khách hàng.'
        },
        {
          active: false,
          question: 'Q: Các website thiết kế có được tối ưu hóa SEO không?',
          answer:'A: Chúng tôi luôn tối ưu hóa SEO cho website của bạn, giúp trang web có thứ hạng cao hơn trên các công cụ tìm kiếm và tăng khả năng tiếp cận khách hàng.'
        }
      ]
    },
    {
      active: false,
      disabled: false,
      name: '9. Sử dụng và tích hợp AI',
      childPanel: [
        {
          active: false,
          question: 'Q: NintShop có cung cấp dịch vụ AI vào sản phẩm của mình hay không?',
          answer:'A: Có, chúng tôi đang phát triển AI riêng của mình và sẽ ra mắt dịch vụ AI học sản phẩm và có khả năng tư vấn bán hàng trực tiếp cho nhà bán hàng trên Nintshop.'
        },
        {
          active: false,
          question: 'Q: Vai trò của AI?',
          answer:'A: AI đóng vai trò quan trọng trong tương lai, giúp tăng hiệu suất và doanh thu của tất cả nhà bán hàng trong mọi ngành nghề và lĩnh vực kinh doanh hiện nay.'
        }
      ]
    },
    {
      active: false,
      disabled: false,
      name: '10. Cộng đồng và mạng xã hội của Nintshop',
      childPanel: [
        {
          active: false,
          question: 'Q: NintShop có cộng đồng riêng hay nền tảng mạng xã hội riêng hay không?',
          answer:'A: Có, chúng tôi đang phát triển nền tảng mạng xã hội riêng dành cho các nhà bán hàng, giúp cho các nhà bán hàng có thể trao đổi, học hỏi kinh nghiệm giữa cộng đồng của chúng tôi và sẽ ra mắt trong các phiên bản tiếp theo của chúng tôi.'
        },
        {
          active: false,
          question: 'Q: Trong cộng đồng Nintshop có những điểm gì nổi bật?',
          answer:'A: Chúng tôi sẽ cung cấp AI riêng dành cho nhà bán hàng, tạo các phiên live, kết nối các KOL/KOC với nhà bán hàng để thúc đẩy doanh thu, tăng doanh số cho nhà bán hàng.'
        }
      ]
    }
  ];
  
}
