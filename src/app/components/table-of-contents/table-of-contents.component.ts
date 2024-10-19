import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.css'
})
export class TableOfContentsComponent {
  @Input() sections: { title: string; content: string }[] = [];
}
