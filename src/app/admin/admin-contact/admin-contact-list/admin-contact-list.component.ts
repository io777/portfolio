import { Component, OnInit } from '@angular/core';
import {Contact} from '../../../db/model/contact.model';
import {NotificationsService} from 'angular2-notifications';
import {ContactService} from '../../../db/contact.service';
import {Project} from '../../../db/model/project.model';

@Component({
  selector: 'app-admin-contact-list',
  templateUrl: './admin-contact-list.component.html',
  styleUrls: ['./admin-contact-list.component.sass']
})
export class AdminContactListComponent implements OnInit {

  contactCount: number;
  contacts: Contact[];
  constructor(private notifyService: NotificationsService, private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContactsLength().subscribe(data => {
      this.contactCount = data.length;
    });

    this.contactService.getContacts().subscribe(data => {
      this.contacts = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data().name,
          email: e.payload.doc.data().email,
          message: e.payload.doc.data().message,
          creationDate: e.payload.doc.data().creationDate
        } as Contact;
      });
    });
  }

  deleteContact(contactId) {
    this.contactService.deleteContact(contactId);
    this.notifyService.success('Успешно', 'Элемент успешно удален');
  }

  loadMore(key) {
    this.contactService.getContacts(key).subscribe(data => {
      const temp = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data().name,
          email: e.payload.doc.data().email,
          message: e.payload.doc.data().message,
          creationDate: e.payload.doc.data().creationDate
        } as Contact;
      });
      console.log(temp);
      this.contacts = this.contacts.concat(temp).sort((a: any, b: any) => {
        return b.creationDate - a.creationDate;
      });
    });
  }
}
