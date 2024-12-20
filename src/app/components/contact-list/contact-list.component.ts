import { Component, OnInit } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../services/contact.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  loading = true;
  isMobile = false;
  showList = true;

  constructor(private contactService: ContactService, private message: NzMessageService,
    private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe(result => {
        this.isMobile = result.matches;
        if (!this.isMobile) {
          this.showList = true;
        }
      });
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.contactService.getContactForm().subscribe(
      (contacts) => {
        this.contacts = contacts;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
        this.message.error('Failed to load messages');
        this.loading = false;
      }
    );
  }

  selectContact(contact: Contact): void {
    this.selectedContact = contact;
    if (this.isMobile) {
      this.showList = false;
    }
  }

  backToList(): void {
    if (this.isMobile) {
      this.showList = true;
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
