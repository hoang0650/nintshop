import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxEchartsModule } from 'ngx-echarts'; // Import NgxEchartsModule
import { HighchartsChartModule } from 'highcharts-angular';
import { EditorModule } from '@tinymce/tinymce-angular';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { CategoryComponent } from './components/category/category.component';
import { OfferComponent } from './components/offer/offer.component';
import { ProductComponent } from './components/product/product.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { ShopComponent } from './components/shop/shop.component';
import { DetailComponent } from './components/detail/detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReviewComponent } from './components/review/review.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { AdminComponent } from './components/admin/admin.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { OrderComponent } from './components/order/order.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { LivestreamComponent } from './components/livestream/livestream.component';
import { AiChatComponent } from './components/ai-chat/ai-chat.component';
import { LivestreamHomepageComponent } from './components/livestream-homepage/livestream-homepage.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { OtpComponent } from './components/otp/otp.component';
import { BalanceComponent } from './components/balance/balance.component';
import { SafePipe } from './pipes/safe.pipe';
import { MessageComponent } from './components/message/message.component';
import { SupportChatComponent } from './components/support-chat/support-chat.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BlogComponent } from './components/blog/blog.component';
import { RelatedPostComponent } from './components/related-post/related-post.component';
import { RelatedProductsComponent } from './components/related-products/related-products.component';
import { CommentBlogComponent } from './components/comment-blog/comment-blog.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCreatorComponent } from './components/blog-creator/blog-creator.component';
import { LightningSaleComponent } from './components/lightning-sale/lightning-sale.component';
import { TableOfContentsComponent } from './components/table-of-contents/table-of-contents.component';
import { HasRoleDirective } from './directives/has-role.directive';


registerLocaleData(en);
// Cấu hình để load các file JSON cho đa ngôn ngữ
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FeaturedComponent,
    CategoryComponent,
    OfferComponent,
    ProductComponent,
    SubscribeComponent,
    NewProductComponent,
    VendorComponent,
    ShopComponent,
    DetailComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    ReviewComponent,
    QrCodeComponent,
    SearchFilterPipe,
    ChatboxComponent,
    OrderTrackingComponent,
    AdminComponent,
    UnauthorizedComponent,
    NotfoundComponent,
    OrderComponent,
    NewPostComponent,
    PostCardComponent,
    PostFeedComponent,
    UserInfoComponent,
    RevenueChartComponent,
    LivestreamComponent,
    AiChatComponent,
    LivestreamHomepageComponent,
    UserManagementComponent,
    ForgotComponent,
    OtpComponent,
    BalanceComponent,
    SafePipe,
    MessageComponent,
    SupportChatComponent,
    CategoryListComponent,
    BlogComponent,
    RelatedPostComponent,
    RelatedProductsComponent,
    CommentBlogComponent,
    BlogListComponent,
    BlogCreatorComponent,
    LightningSaleComponent,
    TableOfContentsComponent,
    HasRoleDirective,
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: 'vi', // Ngôn ngữ mặc định
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    HighchartsChartModule,
    ReactiveFormsModule,
    EditorModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', // You can customize position here
      timeOut: 3000, // Duration in milliseconds
      preventDuplicates: true, // Prevent duplicate notifications
    }),
    NzLayoutModule,
    NzRateModule,
    NzCardModule,
    NzInputModule,
    NzDropDownModule,
    NzTabsModule,
    NzSelectModule,
    NzListModule,
    NzFormModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
    NzAvatarModule,
    NzTypographyModule,
    NzImageModule,
    NzCommentModule,
    NzProgressModule,
    NzStatisticModule,
    NzToolTipModule,
    NzCarouselModule,
    NzPaginationModule
  ],
  providers: [
    provideClientHydration(),
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
