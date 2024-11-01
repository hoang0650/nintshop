import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { DetailComponent } from './components/detail/detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/register-page/login/login.component';
import { SignupComponent } from './components/register-page/signup/signup.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { AdminComponent } from './components/admin-pages/admin/admin.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { OrderComponent } from './components/order/order.component';
import { adminGuard,Permission  } from './guard/admin.guard';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { LivestreamComponent } from './components/livestream/livestream.component';
import { AiChatComponent } from './components/ai-chat/ai-chat.component';
import { LivestreamHomepageComponent } from './components/livestream-homepage/livestream-homepage.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { OtpComponent } from './components/otp/otp.component';
import { BalanceComponent } from './components/balance/balance.component';
import { SupportChatComponent } from './components/support-chat/support-chat.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogListComponent } from './components/page-list/blog-list/blog-list.component';
import { BlogCreatorComponent } from './components/blog-creator/blog-creator.component';
import { LightningSaleComponent } from './components/lightning-sale/lightning-sale.component';
import { GermanLessonComponent } from './components/german-lesson/german-lesson.component';
import { VideoManagementComponent } from './components/video-management/video-management.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { AboutComponent } from './pages/about/about.component';
import { StoreComponent } from './components/register-page/store/store.component';
import { BloggerComponent } from './components/register-page/blogger/blogger.component';
import { ComplaintComponent } from './components/register-page/complaint/complaint.component';
import { ProjectComponent } from './components/register-page/project/project.component';
import { ShopListComponent } from './components/page-list/shop-list/shop-list.component';
import { BloggerListComponent } from './components/page-list/blogger-list/blogger-list.component';
import { RevenueManagementComponent } from './components/admin-pages/revenue-management/revenue-management.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'about', component: AboutComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'complaint', component: ComplaintComponent },
  { path: 'revenue-management', component: RevenueManagementComponent},
  { path: 'shop-page', canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE }, component: PostFeedComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'blog-creator', canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE }, component: BlogCreatorComponent },
  { path: 'blog/:id', component: BlogComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'shops', component: ShopListComponent },
  { path: 'blogger', component: BloggerListComponent },
  { path: 'shop-register', component: StoreComponent },
  { path: 'blogger-register', component: BloggerComponent },
  { path: 'balance', canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE }, component: BalanceComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'reset-password', component: OtpComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'livestream', canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE },  component: LivestreamComponent },
  { path: 'livestream-homepage', canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE }, component: LivestreamHomepageComponent },
  { path: 'qr-payment', component: QrCodeComponent },
  { path: 'german-lessons', component: GermanLessonComponent },
  { path: 'video-management', component: VideoManagementComponent },
  { path: 'order-tracking', component: OrderTrackingComponent },
  { path: 'order', component: OrderComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'support-chat', component: SupportChatComponent },
  { path: 'ai-chat', canActivate: [adminGuard], data: { requiredPermission: Permission.ADMIN }, component: AiChatComponent },
  { path: 'user-management',canActivate: [adminGuard], data: { requiredPermission: Permission.ADMIN }, component: UserManagementComponent },
  { path: 'chart', canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE }, component: RevenueChartComponent },
  { path: 'admin',canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE }, component: AdminComponent },
  { path: 'campain', canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE }, component: LightningSaleComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled', // Scrolls back to the top after navigation
    anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
