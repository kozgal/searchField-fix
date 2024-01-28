import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import 'zone.js';
import { SapphireSearchFieldModule } from './search-field/search-field.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SapphireSearchFieldModule, FormsModule],
  template: `<div
  style="display: flex; align-items: center; gap: 1rem;"
>
  <sp-search-field>
    <input
      [(ngModel)]="value"
      spSearchFieldInput
      aria-label="Search"
      placeholder="Search"
      (spSearchFieldSubmitted)="doSearch()"
    />
  </sp-search-field>
</div>
  `,
})
export class App {
  alert = alert;
  value = '';

  // cleaner to have "business logic" in component than in template
  doSearch() {
    alert('searched: ' + this.value);
  }
}

bootstrapApplication(App);
