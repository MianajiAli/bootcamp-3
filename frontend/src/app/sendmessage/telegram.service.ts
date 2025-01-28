import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private telegramApiUrl = 'https://api.telegram.org';
  private botToken = 'bot token'; // Replace with your bot token

  constructor(private http: HttpClient) { }

  /**
   * Send a text message
   * @param chatId Telegram chat ID or channel username
   * @param message Message text
   */
  sendMessage(chatId: string, message: string): Observable<any> {
    const url = `${this.telegramApiUrl}/bot${this.botToken}/sendMessage`;
    return this.http.post(url, {
      chat_id: chatId,
      text: message,
    });
  }

  /**
   * Send an image
   * @param chatId Telegram chat ID or channel username
   * @param caption Caption for the image
   * @param file Image file to upload
   */
  sendImage(chatId: string, caption: string, file: File): Observable<any> {
    const url = `${this.telegramApiUrl}/bot${this.botToken}/sendPhoto`;
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('caption', caption);
    formData.append('photo', file);
    return this.http.post(url, formData);
  }

  /**
   * Send a video
   * @param chatId Telegram chat ID or channel username
   * @param caption Caption for the video
   * @param file Video file to upload
   */
  sendVideo(chatId: string, caption: string, file: File): Observable<any> {
    const url = `${this.telegramApiUrl}/bot${this.botToken}/sendVideo`;
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('caption', caption);
    formData.append('video', file);
    return this.http.post(url, formData);
  }

  /**
   * Send an audio file
   * @param chatId Telegram chat ID or channel username
   * @param caption Caption for the audio
   * @param file Audio file to upload
   */
  sendAudio(chatId: string, caption: string, file: File): Observable<any> {
    const url = `${this.telegramApiUrl}/bot${this.botToken}/sendAudio`;
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('caption', caption);
    formData.append('audio', file);
    return this.http.post(url, formData);
  }

  /**
   * Send a document
   * @param chatId Telegram chat ID or channel username
   * @param caption Caption for the document
   * @param file Document file to upload
   */
  sendDocument(chatId: string, caption: string, file: File): Observable<any> {
    const url = `${this.telegramApiUrl}/bot${this.botToken}/sendDocument`;
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('caption', caption);
    formData.append('document', file);
    return this.http.post(url, formData);
  }
}
