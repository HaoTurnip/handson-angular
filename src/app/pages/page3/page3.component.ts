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


  displayNickname = '';

  private userSubject = new BehaviorSubject<any>({});
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
    const filteredUser = Object.fromEntries(
      Object.entries(this.user)
        .filter(([_, value]) => value !== '' && value !== null)
    );

    this.userSubject.next(filteredUser);
  }

  onFirstNameChange() {
    if (!this.hasCustomNickname) {
      this.displayNickname = this.user.firstName;

      if (this.nicknameFocused) {
        this.user.nickName = this.user.firstName;
      }
    }
  }

  onNicknameChange() {

    if (this.displayNickname !== this.user.firstName) {
      this.hasCustomNickname = true;
    }

    if (!this.displayNickname) {
      this.hasCustomNickname = false;
    }

    this.user.nickName = this.displayNickname;
    this.updateUser();
  }

  onNicknameFocus() {
    this.nicknameFocused = true;

    if (!this.hasCustomNickname && !this.user.nickName && this.displayNickname) {
      this.user.nickName = this.displayNickname;
      this.updateUser();
    }
  }

  onSubmit() {

    if (!this.user.nickName && this.displayNickname) {
      this.user.nickName = this.displayNickname;
    }

    const filteredUser = Object.fromEntries(
      Object.entries(this.user)
        .filter(([_, value]) => value !== '' && value !== null)
    );

    this.submitted = true;
    this.jsonOutput = JSON.stringify(filteredUser, null, 2);
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
