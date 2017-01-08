import {Chat} from '../models/chat.model'
import {MongoObservable} from 'meteor-rxjs';

const chatCollection = new Mongo.Collection<Chat>('chats', {
  transform: chat => new Chat(chat),
});
const Chats = MongoObservable.fromExisting<Chat>(chatCollection);
export default Chats;
