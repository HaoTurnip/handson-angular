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
  
  // this is a hack to make the nickname field work lol dont judge me
  displayNickname = '';
  
  private userSubject = new BehaviorSubject<any>(this.user);
  userData$ = this.userSubject.asObservable();
  
  submitted = false;
  jsonOutput = '';
  liveJsonOutput = '';
  hasCustomNickname = false;
  nicknameFocused = false;

  ngOnInit() {
    this.userData$.subscribe(data => {
      this.liveJsonOutput = JSON.stringify(data, null, 2);
    });
  }

  updateUser() {
    this.userSubject.next({...this.user});
  }

  onFirstNameChange() {
    if (!this.hasCustomNickname) {
      this.displayNickname = this.user.firstName;
      // Only update the actual user object if the field has been focused
      if (this.nicknameFocused) {
        this.user.nickName = this.user.firstName;
      }
    }
  }

  onNicknameChange() {
    // If user typed something custom, set the flag
    if (this.displayNickname !== this.user.firstName) {
      this.hasCustomNickname = true;
    }
    // If user cleared it, reset the flag
    if (!this.displayNickname) {
      this.hasCustomNickname = false;
    }
    // Update the actual user object with the display value
    this.user.nickName = this.displayNickname;
    this.updateUser();
  }
  
  onNicknameFocus() {
    this.nicknameFocused = true;
    // When focused for the first time, sync the model with the display value
    if (!this.hasCustomNickname && !this.user.nickName && this.displayNickname) {
      this.user.nickName = this.displayNickname;
      this.updateUser();
    }
  }

  onSubmit() {
    // Make sure the nickname is synced before submitting
    if (!this.user.nickName && this.displayNickname) {
      this.user.nickName = this.displayNickname;
    }
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
    this.displayNickname = '';
    this.hasCustomNickname = false;
    this.nicknameFocused = false;
    this.updateUser();
    this.submitted = false;
    this.jsonOutput = '';
  }
}
