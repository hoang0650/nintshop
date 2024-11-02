import { Component, Input } from '@angular/core';
interface Client {
  name: string;
  avatar: string;
  rating: number;
}

interface Project {
  title: string;
  description: string;
  budget: string;
  deadline: string;
  skills: string[];
  proposals: number;
  client: Client;
  category: string;
}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() project!: Project;
}
