import { Component, OnInit } from '@angular/core';
import { ItemService } from './item.service';
import { ApiResponse, Item } from './item.model'; // Import the interfaces
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { StringToBooleanPipe } from '../pipes/string-to-boolean.pipe';

@Component({
  selector: 'app-shop',
  standalone: true, // Use standalone component (Angular 14+)
  imports: [CommonModule, FormsModule, StringToBooleanPipe], // Import FormsModule for ngModel
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  items: Item[] | null = null; // Use an array of Item objects
  error: string = '';
  featureKeys: string[] = []; // To store dynamic keys from the `name` object
  selectedFeature: string = ''; // To store the selected feature key
  inputValue: string = ''; // To store the input value

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.loadItems();
  }

  // Method to load items from the service
  loadItems(): void {
    this.itemService.getItems().subscribe({
      next: (response: ApiResponse) => {
        if (response.status) {
          this.items = response.data; // Assign the array of items
          console.log('Items fetched successfully:', this.items);
          // Extract feature keys from the first item's `name` object
          if (this.items.length > 0) {
            this.featureKeys = Object.keys(this.items[0].name);
          }
        } else {
          this.error = 'Failed to fetch items: ' + response.message;
        }
      },
      error: (err) => {
        this.error = 'Failed to fetch data';
        console.error('Error fetching items:', err);
      }
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (!this.selectedFeature) {
      this.error = 'Please select a feature.';
      return;
    }

    // Call the API with the selected feature and input value
    this.itemService.sendData(this.inputValue, this.selectedFeature).subscribe({
      next: (response: ApiResponse) => {
        if (response.status) {
          console.log('Data sent successfully:', response);
          this.error = '';
          // Reload items or update the UI as needed
          this.loadItems();
        } else {
          this.error = 'Failed to send data: ' + response.message;
        }
      },
      error: (err) => {
        this.error = 'Failed to send data';
        console.error('Error sending data:', err);
      }
    });
  }
}
