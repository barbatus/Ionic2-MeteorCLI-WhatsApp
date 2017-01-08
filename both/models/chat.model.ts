import Messages from '../collections/messages.collection';

import {Message} from './message.model';

import Users from '../collections/users.collection';

import {Observable} from 'rxjs';

declare const _;

export class Chat {
  _id?: string;
  memberIds?: string[];

  constructor(data: any) {
    _.extend(this, data);
  }

  get senderId() {
    return Meteor.userId();
  }

  get receiverId() {
    return this.memberIds.find(
      memberId => memberId !== this.senderId);
  }

  get lastMessage(): Message {
    return Messages.find({
      chatId: this._id,
    }, {
      sort: {createdAt: -1},
      limit: 1,
    })
      .map(messages =>  messages[0]);
  }

  get title() {
    return Users.find({_id: this.receiverId})
      .map(receiver => receiver[0] && receiver[0].profile.name);
  }

  get picture() {
    return Users.find({_id: this.receiverId})
      .map(receiver => receiver[0] && receiver[0].profile.picture);
  }
}
