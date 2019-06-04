import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  constructor(private authService: AuthService,
              private messageService: MessageService,) { }

  public username;

  getUser(){
    
    return this.username
  }

}
