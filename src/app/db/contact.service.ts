import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Contact} from './model/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private firestore: AngularFirestore) { }

  getContacts(key?, offset= 5) {
    if (key) {
      return this.firestore.collection('contacts', ref => {
        return ref.orderBy('creationDate', 'desc').startAfter(key).limit(offset);
      }).snapshotChanges();
    } else {
      return this.firestore.collection('contacts', ref => {
        return ref.orderBy('creationDate', 'desc').limit(offset);
      }).snapshotChanges();
    }
  }

  getContactsLength() {
    return this.firestore.collection('contacts').snapshotChanges();
  }

  getContact(contactId: string) {
    return this.firestore.doc('contacts/' + contactId).get();
  }

  createContact(contact: Contact) {
    return this.firestore.collection('contacts').add(contact);
  }

  updateContact(contact: Contact) {
    return this.firestore.doc('contacts/' + contact.id).update(contact);
  }

  deleteContact(contactId: string) {
    this.firestore.doc('contacts/' + contactId).delete();
  }

}
