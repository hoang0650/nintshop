import { Component } from '@angular/core';
import { AIService } from '../../services/ai.service';
@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css'
})
export class AiChatComponent {
  trainingText = '';
  query = '';
  response = '';
  filename = '';
  status = 'Ready';
  error = false;
  trainedModels: string[] = [];

  constructor(private aiService: AIService) {}

  ngOnInit() {
    this.loadTrainedModels();
  }

  loadTrainedModels() {
    this.aiService.getTrainedModels().subscribe(
      models => {
        this.trainedModels = models;
      },
      error => {
        console.error('Failed to load trained models', error);
        this.status = 'Failed to load trained models';
        this.error = true;
      }
    );
  }

  trainAI() {
    this.status = 'Training...';
    this.error = false;
    this.aiService.trainAI(this.trainingText).subscribe(
      response => {
        console.log('Training successful', response);
        this.status = 'Training completed successfully';
        this.trainingText = '';
        this.loadTrainedModels(); // Refresh the list of trained models
      },
      error => {
        console.error('Training failed', error);
        this.status = 'Training failed';
        this.error = true;
      }
    );
  }

  queryAI() {
    this.status = 'Querying...';
    this.error = false;
    this.aiService.queryAI(this.query).subscribe(
      response => {
        this.response = response.response;
        this.status = 'Query completed';
      },
      error => {
        console.error('Query failed', error);
        this.response = 'Error occurred while querying AI';
        this.status = 'Query failed';
        this.error = true;
      }
    );
  }

  saveModel() {
    this.status = 'Saving model...';
    this.error = false;
    this.aiService.saveModel(this.filename).subscribe(
      response => {
        console.log('Model saved successfully', response);
        this.status = 'Model saved successfully';
        this.loadTrainedModels(); // Refresh the list of trained models
      },
      error => {
        console.error('Failed to save model', error);
        this.status = 'Failed to save model';
        this.error = true;
      }
    );
  }

  loadModel(filename: string = this.filename) {
    this.status = 'Loading model...';
    this.error = false;
    this.aiService.loadModel(filename).subscribe(
      response => {
        console.log('Model loaded successfully', response);
        this.status = 'Model loaded successfully';
        this.filename = filename;
      },
      error => {
        console.error('Failed to load model', error);
        this.status = 'Failed to load model';
        this.error = true;
      }
    );
  }
}
