import { Injectable } from '@angular/core';
import {MessageTDO} from '../../../models/messageTDO';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  selectedMessage: MessageTDO = new MessageTDO();
}
