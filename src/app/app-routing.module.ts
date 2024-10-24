import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { DetailComponent } from './components/detail/detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { AdminComponent } from './components/admin/admin.component';
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
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCreatorComponent } from './components/blog-creator/blog-creator.component';
import { LightningSaleComponent } from './components/lightning-sale/lightning-sale.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop-page', canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE }, component: PostFeedComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'blog-creator', canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE }, component: BlogCreatorComponent },
  { path: 'blog/:id', component: BlogComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'balance', canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE }, component: BalanceComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'reset-password', component: OtpComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'livestream', canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE },  component: LivestreamComponent },
  { path: 'livestream-homepage', canActivate: [adminGuard], data: { requiredPermission: Permission.WRITE }, component: LivestreamHomepageComponent },
  { path: 'qr-payment', component: QrCodeComponent },
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
