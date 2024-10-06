import { Component } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent {
  balance: number = 100; // Số dư ban đầu (USD)
  coinBalance: number = 0; // Số coin ban đầu
  depositAmount: number = 0;
  transferAmount: number = 0;
  recipient: string = '';
  searchAccount: string = '';
  convertAmount: number = 0;
  giftRecipient: string = '';
  giftAmount: number = 0;
  withdrawAmount: number = 0;
  coinToMoneyAmount: number = 0; // Số coin cần đổi sang tiền
  isAccountValid: boolean | null = null;
  coinRate: number = 1000; // 1 USD = 1000 coin
  coinToMoneyFee: number = 0.01; // Phí 1% khi quy đổi từ coin sang tiền

  // Nạp tiền
  onDeposit() {
    this.balance += this.depositAmount;
    alert(`Đã nạp ${this.depositAmount} USD!`);
    this.depositAmount = 0; // Đặt lại sau khi nạp tiền
  }

  // Chuyển tiền (quy đổi sang coin)
  onTransfer() {
    const coinAmount = this.transferAmount * this.coinRate; // Quy đổi số tiền sang coin
    if (this.transferAmount <= this.balance) {
      this.balance -= this.transferAmount; // Trừ số tiền trong tài khoản
      this.coinBalance += coinAmount; // Tăng số coin
      alert(`Đã chuyển ${this.transferAmount} USD (${coinAmount} coin) cho ${this.recipient}`);
      this.transferAmount = 0; // Đặt lại sau khi chuyển tiền
    } else {
      alert('Số dư không đủ để chuyển!');
    }
  }

  // Kiểm tra tài khoản hợp lệ
  checkAccount() {
    // Giả sử kiểm tra tài khoản thành công
    this.isAccountValid = true; // Hoặc false nếu tài khoản không hợp lệ
  }

  // Quy đổi sang coin
  onConvert() {
    const coins = this.convertAmount * this.coinRate; // 1 USD = 1000 coin
    if (this.convertAmount <= this.balance) {
      this.balance -= this.convertAmount; // Giảm số dư USD sau khi quy đổi
      this.coinBalance += coins; // Tăng số coin
      alert(`Đã quy đổi ${this.convertAmount} USD thành ${coins} coin`);
      this.convertAmount = 0; // Đặt lại sau khi quy đổi
    } else {
      alert('Số dư không đủ để quy đổi!');
    }
  }

  // Tặng quà (bằng coin)
  onGift() {
    if (this.giftAmount <= this.coinBalance) {
      this.coinBalance -= this.giftAmount; // Trừ số coin sau khi tặng
      alert(`Đã tặng ${this.giftAmount} coin cho ${this.giftRecipient}`);
      this.giftRecipient = ''; // Đặt lại sau khi tặng quà
      this.giftAmount = 0; // Đặt lại sau khi tặng quà
    } else {
      alert('Số dư coin không đủ để tặng quà!');
    }
  }

  // Rút tiền
  onWithdraw() {
    if (this.withdrawAmount <= this.balance) {
      this.balance -= this.withdrawAmount; // Trừ số tiền khi rút
      alert(`Đã rút ${this.withdrawAmount} USD`);
      this.withdrawAmount = 0; // Đặt lại sau khi rút tiền
    } else {
      alert('Số dư không đủ để rút!');
    }
  }

  // Quy đổi từ coin sang tiền (có phí 1%)
  onConvertCoinToMoney() {
    const usdAmount = this.coinToMoneyAmount / this.coinRate; // Tính số tiền USD trước khi tính phí
    const fee = usdAmount * this.coinToMoneyFee; // Tính phí 1%
    const amountAfterFee = usdAmount - fee; // Số tiền sau khi trừ phí

    if (this.coinToMoneyAmount <= this.coinBalance) {
      this.coinBalance -= this.coinToMoneyAmount; // Trừ số coin
      this.balance += amountAfterFee; // Cộng số tiền sau khi trừ phí vào số dư
      alert(`Đã quy đổi ${this.coinToMoneyAmount} coin thành ${amountAfterFee.toFixed(2)} USD (đã trừ phí ${fee.toFixed(2)} USD)`);
      this.coinToMoneyAmount = 0; // Đặt lại sau khi quy đổi
    } else {
      alert('Số dư coin không đủ để quy đổi!');
    }
  }

  // Chức năng quay lại (có thể để điều hướng nếu cần)
  goBack() {
    alert('Quay lại trang trước');
  }
}
