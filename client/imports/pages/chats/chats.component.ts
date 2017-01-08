import {Component, OnInit, NgZone} from '@angular/core';
import template from './chats.component.html'
import {Observable} from 'rxjs';
import {Meteor} from 'meteor/meteor';
import {MeteorObservable} from 'meteor-rxjs';
import {Chat} from '../../../../both/models/chat.model';
import style from './chats.component.scss';
import Chats from '../../../../both/collections/chats.collection';
import Users from '../../../../both/collections/users.collection';
import {Message} from '../../../../both/models/message.model';
import Messages from '../../../../both/collections/messages.collection';
import {NavController, PopoverController, ModalController} from 'ionic-angular';
import {MessagesPage} from '../chat/messages-page.component';
import {ChatsOptionsComponent} from '../chats/chats-options.component';
import {NewChatComponent} from './new-chat.component';

import {MeteorReactive} from 'angular2-meteor';

@Component({
  selector: 'chats',
  template,
  styles: [
    style
  ]
})
export class ChatsComponent extends MeteorReactive implements OnInit {
  chats: Observable<Chat[]>;
  senderId: string;

  constructor(
    private navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
  ) {
    super();
  }

  ngOnInit() {
    this.senderId = Meteor.userId();      

    this.subscribe('chats');

    this.chats = Chats
      .find({})
      .zone();
  }

  addChat(): void {
    const modal = this.modalCtrl.create(NewChatComponent);
    modal.present();
  }

  showOptions(): void {
    const popover = this.popoverCtrl.create(ChatsOptionsComponent, {}, {
      cssClass: 'options-popover'
    });
 
    popover.present();
  }

  showMessages(chat): void {
    this.navCtrl.push(MessagesPage, { chat });
  }
}
