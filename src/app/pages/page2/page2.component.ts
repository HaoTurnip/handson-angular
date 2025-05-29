import { Component } from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component {
  user = {
    name: '',
    address: ''
  };
  
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  resetForm() {
    this.user = {
      name: '',
      address: ''
    };
    this.submitted = false;
  }
}
