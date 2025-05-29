import { Component } from '@angular/core';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component {
  user = {
    firstName: '',
    lastName: '',
    nickName: '',
    address: null as string | null
  };
  
  submitted = false;
  jsonOutput = '';

  onSubmit() {
    this.submitted = true;
    this.jsonOutput = JSON.stringify(this.user, null, 2);
  }

  resetForm() {
    this.user = {
      firstName: '',
      lastName: '',
      nickName: '',
      address: null
    };
    this.submitted = false;
    this.jsonOutput = '';
  }
}
