import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
interface Transaction {
  id: string;
  type: string; // 'Nạp', 'Rút', 'Chuyển tiền'
  amount: number;
  status: string;
  date: Date;
  details: string;
  paymentMethod: string;
  confirmationDate: Date;
  expanded?: boolean; // Để kiểm soát trạng thái mở rộng
}

interface AdminTransaction {
  id: string;
  userName: string; // Tên người dùng
  type: string; // 'Nạp', 'Rút', 'Chuyển tiền'
  amount: number;
  status: string;
  date: Date;
  details: string;
  paymentMethod: string;
  confirmationDate: Date;
  confirmedBy: string; // Tên người xác nhận
  expanded?: boolean; // Trạng thái mở rộng
}
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent implements OnInit {
  userId: string = ''; // Lấy từ auth token hoặc session
  balance: number = 0;
  coinBalance: number = 0;
  recipientEmail: string = '';
  amount: number = 0;
  coinAmount: number = 0;
  expandSet = new Set<number>();

  constructor(private walletService: WalletService, private userService: UserService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.userService.getUserInfor().subscribe((data:any)=>{
      this.userId = data._id
      this.balance = data.balance
      this.coinBalance = data.coinBalance
    })
  }
  userTransactions: Transaction[] = [
    {
      id: 'TX12345',
      type: 'Nạp',
      amount: 5000000,
      status: 'Success',
      date: new Date(),
      details: 'Giao dịch nạp tiền vào tài khoản',
      paymentMethod: 'Thẻ tín dụng',
      confirmationDate: new Date(),
      expanded: false,
    },
    {
      id: 'TX12346',
      type: 'Rút',
      amount: 2000000,
      status: 'Pending',
      date: new Date(),
      details: 'Rút tiền về tài khoản ngân hàng',
      paymentMethod: 'Ngân hàng nội địa',
      confirmationDate: new Date(),
      expanded: false,
    },
    {
      id: 'TX12347',
      type: 'Chuyển tiền',
      amount: 1000000,
      status: 'Failed',
      date: new Date(),
      details: 'Chuyển tiền đến người dùng khác',
      paymentMethod: 'Ví điện tử',
      confirmationDate: new Date(),
      expanded: false,
    }
  ];

  toggleExpand(transaction: Transaction) {
    transaction.expanded = !transaction.expanded;
  }

  adminTransactions: AdminTransaction[] = [
    {
      id: 'TX98765',
      userName: 'Nguyễn Văn A',
      type: 'Nạp',
      amount: 5000000,
      status: 'Success',
      date: new Date(),
      details: 'Giao dịch nạp tiền vào tài khoản',
      paymentMethod: 'Thẻ tín dụng',
      confirmationDate: new Date(),
      confirmedBy: 'Admin 1',
      expanded: false,
    },
    {
      id: 'TX98766',
      userName: 'Trần Thị B',
      type: 'Rút',
      amount: 3000000,
      status: 'Pending',
      date: new Date(),
      details: 'Rút tiền về tài khoản ngân hàng',
      paymentMethod: 'Ngân hàng nội địa',
      confirmationDate: new Date(),
      confirmedBy: 'Admin 2',
      expanded: false,
    },
    {
      id: 'TX98767',
      userName: 'Lê Văn C',
      type: 'Chuyển tiền',
      amount: 1500000,
      status: 'Failed',
      date: new Date(),
      details: 'Chuyển tiền đến người dùng khác',
      paymentMethod: 'Ví điện tử',
      confirmationDate: new Date(),
      confirmedBy: 'Admin 1',
      expanded: false,
    }
  ];

  toggleExpand2(transaction: AdminTransaction) {
    transaction.expanded = !transaction.expanded;
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  updateStatus(transactionId: string, status: string) {
    // Cập nhật trạng thái giao dịch
    alert(`Cập nhật trạng thái giao dịch ${transactionId} thành ${status}`);
  }

  // Nạp tiền
  deposit() {
    this.walletService.deposit(this.userId, this.amount).subscribe(response => {
      this.messageService.addMessage('success', 'This is an success message!');
      this.balance = response.balance;
      console.log('Nạp tiền thành công. Số dư hiện tại:', this.balance);
    }, error => {
      this.messageService.addMessage('danger', 'This is an error message!');
      console.error('Lỗi nạp tiền:', error);
    });
  }

  // Chuyển tiền
  transfer() {
    this.walletService.transfer(this.userId, this.recipientEmail, this.amount).subscribe(response => {
      this.messageService.addMessage('success', 'This is an success message!');
      this.balance = response.balance;
      console.log('Chuyển tiền thành công. Số dư hiện tại:', this.balance);
    }, error => {
      this.messageService.addMessage('danger', 'This is an error message!');
      console.error('Lỗi chuyển tiền:', error);
    });
  }

  // Quy đổi tiền sang coin
  convertToCoin() {
    this.walletService.convertToCoin(this.userId, this.amount).subscribe(response => {
      this.messageService.addMessage('success', 'This is an success message!');
      this.coinBalance = response.coinBalance;
      console.log('Quy đổi coin thành công. Số coin hiện tại:', this.coinBalance);
    }, error => {
      this.messageService.addMessage('danger', 'This is an error message!');
      console.error('Lỗi quy đổi coin:', error);
    });
  }

  // Tặng quà
  gift() {
    this.walletService.gift(this.userId, this.recipientEmail, this.coinAmount).subscribe(response => {
      this.messageService.addMessage('success', 'This is an success message!');
      this.coinBalance = response.coinBalance;
      console.log('Tặng quà thành công. Số coin còn lại:', this.coinBalance);
    }, error => {
      this.messageService.addMessage('danger', 'This is an error message!');
      console.error('Lỗi tặng quà:', error);
    });
  }

  // Rút tiền
  withdraw() {
    this.walletService.withdraw(this.userId, this.amount).subscribe(response => {
      this.messageService.addMessage('success', 'This is an success message!');
      this.balance = response.balance;
      console.log('Rút tiền thành công. Số dư hiện tại:', this.balance);
    }, error => {
      this.messageService.addMessage('danger', 'This is an error message!');
      console.error('Lỗi rút tiền:', error);
    });
  }

  // Quy đổi coin sang USD (trừ 1% phí)
  convertCoinToMoney() {
    this.walletService.convertCoinToMoney(this.userId, this.coinAmount).subscribe(response => {
      this.messageService.addMessage('success', 'This is an success message!');
      this.balance = response.balance;
      console.log('Quy đổi coin sang USD thành công. Số dư hiện tại:', this.balance);
    }, error => {
      this.messageService.addMessage('danger', 'This is an error message!');
      console.error('Lỗi quy đổi coin sang USD:', error);
    });
  }

  // Chức năng quay lại (có thể để điều hướng nếu cần)
  goBack() {
    alert('Quay lại trang trước');
  }
}
