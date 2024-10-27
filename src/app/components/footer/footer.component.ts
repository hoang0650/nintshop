import { Component,OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  currentLanguage: string;
  contactForm: FormGroup;
  constructor(private messageService: MessageService, private fb: FormBuilder,private languageService: LanguageService,private contactService: ContactService) {
    this.currentLanguage = 'en'; // Ngôn ngữ mặc định
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['Subscibe', Validators.required],
      message: ['Subscibe Email', Validators.required]
    });
  }
  ngOnInit(): void {
    this.languageService.currentLanguage.subscribe(lang => {
      this.currentLanguage = lang; // Cập nhật ngôn ngữ khi thay đổi
    });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.sendContactForm(this.contactForm.value).subscribe(
        (response) => {
          this.messageService.addMessage('success', 'This is a success message!');
          this.contactForm.reset();
        },
        (error) => {
          this.messageService.addMessage('danger', 'This is an error message!');
        }
      );
    }
  }
}
