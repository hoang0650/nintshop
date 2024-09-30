import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSource = new BehaviorSubject<any[]>([]);
  products$ = this.productsSource.asObservable()
  // products$ = this.apiService.loadData<any>('rooms');

  constructor(private http: HttpClient) {
    // Mô phỏng việc tải dữ liệu từ server
    this.loadProducts();
  }

  private loadProducts() {
    // Cách 1: Data Set Cứng
    // Giả sử có một API hoặc dữ liệu từ server
    // const fakeServerData = [
    //   { id: 1, name: 'Móc khóa pokemon, móc cài balo chất liệu silicon cao cấp', description: 'SẢN PHẨM: Móc khóa pokemon, móc cài balo chất liệu silicon cao cấp \nSản phẩm được làm từ chất liệu silicon bền bỉ và an toàn \nCác chi tiết được đúc tinh tế, tỉ mỉ, và rất dễ thương \nCác nhân vật được yêu thích nhất trong Pokemon như: \n- Pikachu \n- Fat Ding -Hồng \n- Charizard -Cam \n - Jenny - Rùa Xanh \n - Koduck - Vịt vàng \n - Bulbasaur - Ếch xanh \n Phù hợp để làm móc treo chìa khóa, móc treo balo, cài túi sách hoặc dùng làm đồ trang trí hay quà tặng.\n Chúng tôi hiện nay đã có kho tại Việt Nam để thuận tiện hơn cho việc gửi hàng tói các bạn. Rất mong được phục vụ các bạn.', price: 35000, image:['nintshop_img/001/avatar.png',"nintshop_img/001/001-Pikachu.png","nintshop_img/001/002-Jenny.png","nintshop_img/001/003-Bullbasaur.png","nintshop_img/001/004-Chamender.png","nintshop_img/001/005-Psyduck.png","nintshop_img/001/006-Fat Ding.png"],quantity:1 },
    //   { id: 2, name: 'Móc khóa chủ đề hoạt hình Pokemon dễ thương bắt mắt 8 phong cách tùy chọn - Móc Chìa Khóa, Móc Khóa', description: '- Loại: Mô hình Pokemon \n- Thuộc tính: Keychain \n- Kích thước: 17,2 * 5,6 * 4,1cm Chất liệu: PVC \n- Đóng gói: 1 cái \n- Pokemon Figures Toy Pikachu Doll Keychain Túi móc khóa Mặt dây chuyền Anime Trang trí Mô hình Túi hành động Túi hành động Hình móc khóa Nhật Bản Phim hoạt hình Nhật Bản Eevee Sylveon Espeon Pikachu 10 phong cách', price: 55000, image:["nintshop_img/002/avatar.png","nintshop_img/002/001-Vaporeon .png","nintshop_img/002/002-Jolteon .png","nintshop_img/002/003-Flareon.png","nintshop_img/002/004-Espeon.png","nintshop_img/002/005-Umbreon.png","nintshop_img/002/006-Leafeon.png","nintshop_img/002/007-Glaceon.png","nintshop_img/002/008-Sylveon.png"],quantity:1 },
    //   { id: 3, name: 'Dễ Thương Móc Khóa Búp Bê capibara Nhồi Bông Đáng Yêu', description: 'S P E C I F I C A T I O N \n 1. Mặt dây chuyền móc khóa cho bé có tiếng kêu sang trọng là một phụ kiện quyến rũ và đáng yêu sẽ tạo thêm nét dễ thương cho đồ đạc của bạn. Được làm từ chất liệu cao cấp, chiếc móc khóa treo sang trọng này được thiết kế giống với nhân vật nổi tiếng trong loạt phim hoạt hình ăn khách.\n 2. Với kích thước nhỏ gọn 7cm, chiếc túi này có thể dễ dàng gắn vào ba lô, túi xách, thậm chí dùng làm móc khóa. Tính linh hoạt của nó cho phép bạn mang lại một chút thú vị và hay thay đổi mọi lúc mọi nơi.\n 3. Được làm từ chất liệu vải ngắn sang trọng siêu mềm, chiếc túi này cực kỳ dễ ôm và mềm mại khi chạm vào. Lớp đệm sang trọng của nó được làm từ bông PP, mang lại kết cấu thoải mái và mềm mại. Sự chú ý đến từng chi tiết trong nghề thủ công của sản phẩm này là rõ ràng, vì nó nắm bắt được bản chất của nhân vật với độ chính xác.\n Các tính năng: \n Chất liệu: bông PP \n Kích thước S-Capybara: 6 * 8cm \n Kích thước L-Capybara: 10 * 13cm', price: 35000, image:["nintshop_img/003/avatar.png","nintshop_img/003/1.png","nintshop_img/003/2.png","nintshop_img/003/3.png","nintshop_img/003/4.png","nintshop_img/003/s.png","nintshop_img/003/L.png"],quantity:1 },
    //   { id: 4, name: '01 Tấm Sticker dán hoạ tiết Capybara Động vật và hoạt hình đáng yêu', description: 'Lưu ý: Quý khách nên mua nhiều miếng để tạo độ cứng khi giao hàng để tránh trường hợp bị móp méo khi bị kiện hàng khác đè lên.\n Mô tả sản phẩm:\n Sticker là vật phẩm trang trí, thường có kích thước nhỏ để dán lên tập vở, dán áo, dán lên má cổ vũ, dán ly, cốc, dán mũ bảo hiểm, dán xe đạp, xe máy, xe ô tô,...Xu hướng hiện nay của các bạn trẻ đó chính là kết hợp thời trang, đồ dùng hay vật dụng với những miếng Sticker để nổi bật và khác biệt hơn trong đám đông.\n Nhà Tô đang có sẵn rất nhiều mẫu Sticker xinh xắn và độc lạ nha! Hãy cùng đón xem Tấm Sticker dán hoạ tiết Capybara!\n Kích thước: 7x7cm hoặc 6x6cm.\n Số lượng: 01 Tấm.\n Chất liệu: gồm 5 lớp.\n + Lớp PVC trong suốt chống thấm nước\n + Lớp mực in\n + Lớp màng PVC chịu nhiệt chịu được nhiệt đồ từ 40 độ C đến hơn 80 độ C.\n + Chất keo bám dính chịu được nhiệt cao\n + Lớp bảo vệ keo dán.\n Thiết kế: Nhiều kiểu dáng, màu sắc, họa tiết vô cùng xinh xắn.\n - Gia công chắc chắn, tỉ mỉ, đẹp mắt.\n - Vô vàn miếng Sticker với đủ hình dễ thương và đáng yêu.\n - Keo dính chắc chắn, độ bền cao, tạo sự tiện lợi cho việc trang trí.\n - Sticker sử dụng trang trí cho scrapbook hoặc fly album, điện thoại, nhật ký,...Khi dán lên, sticker sẽ không bị gấp nếp hoặc bong tróc ở các góc.\n - Nếu muốn vệ sinh Sticker thì bạn chỉ việc làm ẩm khăn và lau nhẹ thôi nha, đơn giản cực kì.\n - Là món quà nhỏ xinh, đáng yêu cho bạn bè và người thân.', price: 1000, image:["nintshop_img/004/avatar.png","nintshop_img/004/1.png","nintshop_img/004/2.png","nintshop_img/004/3.png","nintshop_img/004/4.png","nintshop_img/004/5.png"],quantity:1 },
    //   { id: 5, name: 'Anime Móc Khóa Nhân Vật pokemon Móc Khóa Phụ Kiện Túi Dễ Thương Mặt Dây Chuyền Vòng Chìa Khóa Cho Người Hâm Mộ Quà Tặng', description: 'Anime Móc khóa nhân vật pokemon Phụ kiện móc chìa khóa Túi dễ thương Mặt dây chuyền Vòng chìa khóa cho người hâm mộ Quà tặng\nCao: 5,5cm\nChất liệu: acrylic \nTính năng:\n1. Tay nghề tốt, món quà tinh tế\n2. Phụ kiện, dành riêng cho người hâm mộ\n3. Thích hợp cho phòng ngủ, phòng khách và học tập', price: 12000, image:["nintshop_img/005/avatar.png","nintshop_img/005/001-Articuno.png","nintshop_img/005/002-Zapdos.png","nintshop_img/005/003-Mew.png","nintshop_img/005/004-Mewtwo.png","nintshop_img/005/005-Kairyu.png","nintshop_img/005/006-Gyarados.png","nintshop_img/005/007-Gengar.png","nintshop_img/005/008-Lucario.png","nintshop_img/005/009-Charizard.png","nintshop_img/005/010-Minun&Plusle.png","nintshop_img/005/011-Bulbasaur.png","nintshop_img/005/012-squirtle.png","nintshop_img/005/013-Charmander.png","nintshop_img/005/014-Pikachu.png","nintshop_img/005/015-Eevee.png","nintshop_img/005/016-Piplup.png","nintshop_img/005/017-Totodile.png","nintshop_img/005/018-Psyduck.png","nintshop_img/005/019-Ash&Pikachu.png"],quantity:1 },
     
    // ];
    // Cập nhật dữ liệu trong BehaviorSubject
    // this.productsSource.next(fakeServerData);

    // Cách 2: Lấy data từ api
    // Gọi API để lấy dữ liệu sản phẩm
     this.http.get<any[]>('https://sale-nest-api.onrender.com/api/products').subscribe(
      data => {
        this.productsSource.next(data);
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
    
  }

  getProducts(query: string): Observable<any[]> {
    return this.http.get<any[]>(`https://sale-nest-api.onrender.com/api/products?search=${query}`);
  }

  loadUpdatedData() {
    this.loadProducts();
  }
  
  // updateProducts(newData: any[]): void {
  //   this.productsSource.next(newData);
  // }

  // Add a new product
  addProduct(newProduct: any): Observable<any> {
    return this.http.post<any>('https://sale-nest-api.onrender.com/api/products', newProduct).pipe(
      catchError(error => {
        console.error('Error adding product:', error);
        return of(null); // Handle error by returning null
      })
    );
  }

  // Update an existing product by ID
  updateProduct(updatedProduct: any): Observable<any> {
    return this.http.put<any>(`https://sale-nest-api.onrender.com/api/products/${updatedProduct.id}`, updatedProduct).pipe(
      catchError(error => {
        console.error('Error updating product:', error);
        return of(null); // Handle error by returning null
      })
    );
  }

  setSelectedProduct(product: any): void {
    this.productsSource.next(product);
  }

  getSelectedProduct(): Observable<any> {
    return this.productsSource.asObservable();
  }

  getProductById(id: number): any {
    // Lấy sản phẩm từ dữ liệu hiện tại
    const currentProducts = this.productsSource.value;
    return currentProducts.find(product => product.id === id);
  }


}
