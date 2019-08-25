import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {ContactService} from '../../db/contact.service';
import {firestore} from 'firebase';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private notifyService: NotificationsService,
    private contactService: ContactService
  ) { }

  get name() {return this.createContactForm.get('name'); }
  get email() {return this.createContactForm.get('email'); }
  get message() {return this.createContactForm.get('message'); }

  createContactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
    creationDate: ['']
  });

  ngOnInit() {
  }

  createContact() {
    console.log(this.createContactForm.value);
    this.createContactForm.value.creationDate = firestore.Timestamp.fromDate(new Date());
    this.contactService.createContact(this.createContactForm.value).then(res => {
      console.log('ok');
      this.notifyService.success('Успешно', 'Ваше письмо успешно отправлено');
    }).catch(err => {
      console.log('bad');
      this.notifyService.error('Ошибка', err);
    });
  }

}
