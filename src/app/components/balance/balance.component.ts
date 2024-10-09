import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
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


  constructor(private walletService: WalletService, private userService: UserService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.userService.getUserInfor().subscribe((data:any)=>{
      this.userId = data._id
      this.balance = data.balance
      this.coinBalance = data.coinBalance
    })
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
