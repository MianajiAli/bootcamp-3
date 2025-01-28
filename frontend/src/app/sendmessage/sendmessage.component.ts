import { Component } from '@angular/core';
import { TelegramService } from './telegram.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sendmessage',
  imports: [CommonModule, FormsModule],
  templateUrl: './sendmessage.component.html',
  styleUrls: ['./sendmessage.component.scss'],
})
export class SendmessageComponent {
  channelId: string = ''; // Telegram chat/channel ID
  messageText: string = ''; // Text message
  selectedFiles: File[] = []; // Selected files for upload
  uploadError: string = ''; // Upload error message
  isUploading: boolean = false; // Uploading state
  responseText: string = ''; // Response message for feedback

  constructor(private telegramService: TelegramService) { }

  // Handle file selection
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.selectedFiles = Array.from(input.files);
      console.log('Files selected:', this.selectedFiles);
    }
  }

  // Send text message
  sendText(): void {
    if (!this.channelId || !this.messageText) {
      this.uploadError = 'Channel ID and message text are required.';
      return;
    }

    this.isUploading = true;
    this.telegramService.sendMessage(this.channelId, this.messageText).subscribe({
      next: (response) => {
        this.responseText = 'Message sent successfully!';
        console.log('Text message response:', response);
      },
      error: (error) => {
        this.uploadError = 'Failed to send the text message.';
        console.error('Text message error:', error);
      },
      complete: () => (this.isUploading = false),
    });
  }

  // Send selected files
  sendFiles(): void {
    if (!this.channelId || this.selectedFiles.length === 0) {
      this.uploadError = 'Channel ID and at least one file are required.';
      return;
    }

    this.isUploading = true;
    this.selectedFiles.forEach((file) => {
      const fileType = file.type.split('/')[0];
      const caption = this.messageText;

      if (fileType === 'image') {
        this.telegramService.sendImage(this.channelId, caption, file).subscribe(this.handleFileResponse(file));
      } else if (fileType === 'video') {
        this.telegramService.sendVideo(this.channelId, caption, file).subscribe(this.handleFileResponse(file));
      } else if (fileType === 'audio') {
        this.telegramService.sendAudio(this.channelId, caption, file).subscribe(this.handleFileResponse(file));
      } else {
        this.telegramService.sendDocument(this.channelId, caption, file).subscribe(this.handleFileResponse(file));
      }
    });
  }

  // Handle response for each file
  private handleFileResponse(file: File) {
    return {
      next: (response: any) => {
        this.responseText = `File ${file.name} uploaded successfully!`;
        console.log(`Response for ${file.name}:`, response);
      },
      error: (error: any) => {
        this.uploadError = `Failed to upload file ${file.name}.`;
        console.error(`Error for ${file.name}:`, error);
      },
      complete: () => (this.isUploading = false),
    };
  }

  // Reset inputs
  resetInputs(): void {
    this.channelId = '';
    this.messageText = '';
    this.selectedFiles = [];
    this.responseText = '';
    this.uploadError = '';
  }
}
