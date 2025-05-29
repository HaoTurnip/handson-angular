import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    nickName: '',
    address: null as string | null
  };
  
  private userSubject = new BehaviorSubject<any>(this.user);
  userData$ = this.userSubject.asObservable();
  
  submitted = false;
  jsonOutput = '';
  liveJsonOutput = '';

  ngOnInit() {
    this.userData$.subscribe(data => {
      this.liveJsonOutput = JSON.stringify(data, null, 2);
    });
  }

  updateUser() {
    this.userSubject.next({...this.user});
  }

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
    this.updateUser();
    this.submitted = false;
    this.jsonOutput = '';
  }
}
