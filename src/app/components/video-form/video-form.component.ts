import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Video } from '../../services/video.service';
@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrl: './video-form.component.css'
})
export class VideoFormComponent implements OnInit {
  @Input() video: Partial<Video> = {};
  videoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef
  ) {}

  ngOnInit(): void {
    
    this.videoForm = this.fb.group({
      title: [this.video.title || '', [Validators.required]],
      description: [this.video.description || ''],
      url: [this.video.url || '', [Validators.required, Validators.pattern('https?://.+')]],
      thumbnailUrl: [this.video.thumbnailUrl || '', [Validators.required, Validators.pattern('https?://.+')]],
      duration: [this.video.duration || 0, [Validators.required, Validators.min(0)]],
      isGermanLesson: [this.video.isGermanLesson || false],
      transcript: this.fb.array([])
    });

    if (this.video.transcript) {
      this.video.transcript.forEach(item => this.addTranscriptItem(item));
    }

    this.videoForm.get('isGermanLesson')?.valueChanges.subscribe(isGermanLesson => {
      if (isGermanLesson) {
        this.addTranscriptItem();
      } else {
        this.videoForm.setControl('transcript', this.fb.array([]));
      }
    });
  }

  get transcriptControls() {
    return (this.videoForm.get('transcript') as FormGroup);
  }

  addTranscriptItem(item: any = null) {
    const transcript = this.videoForm.get('transcript') as FormArray;
    transcript.push(
      this.fb.group({
        start: [item ? item.start : '', Validators.required],
        end: [item ? item.end : '', Validators.required],
        text: [item ? item.text : '', Validators.required]
      })
    );
  }
  
  removeTranscriptItem(index: number) {
    const transcript = this.videoForm.get('transcript') as FormArray;
    transcript.removeAt(index);
  }
  

  submitForm(): void {
    if (this.videoForm.valid) {
      this.modalRef.close(this.videoForm.value);
    } else {
      Object.values(this.videoForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  cancel(): void {
    this.modalRef.close();
  }
}
