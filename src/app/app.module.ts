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

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

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
    ChatboxComponent
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
    ReactiveFormsModule,
    FormsModule,
    NzLayoutModule,
    NzRateModule,
    NzCardModule,
    NzInputModule,
    NzDropDownModule
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
