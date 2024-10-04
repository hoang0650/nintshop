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
import { adminGuard } from './guard/admin.guard';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { LivestreamComponent } from './components/livestream/livestream.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop-page', component: PostFeedComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'livestream', component: LivestreamComponent },
  { path: 'qr-payment', component: QrCodeComponent },
  { path: 'order-tracking', component: OrderTrackingComponent },
  { path: 'chart', component: RevenueChartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: 'admin',canActivate: [adminGuard], component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
