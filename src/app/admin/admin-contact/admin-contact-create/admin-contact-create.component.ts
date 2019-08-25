import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
declare var $: any;
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Contact} from '../../../db/model/contact.model';
import {ContactService} from '../../../db/contact.service';
import {firestore} from 'firebase';

@Component({
  selector: 'app-admin-contact-create',
  templateUrl: './admin-contact-create.component.html',
  styleUrls: ['./admin-contact-create.component.scss']
})
export class AdminContactCreateComponent implements OnInit, AfterViewInit {

  public Editor = ClassicEditor;
  contact: Contact;

  constructor(
    private notifyService: NotificationsService,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  createContactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
    creationDate: ['', [Validators.required]]
  });

  get name() {return this.createContactForm.get('name'); }
  get email() {return this.createContactForm.get('email'); }
  get message() {return this.createContactForm.get('message'); }
  get creationDate() {return this.createContactForm.get('creationDate'); }

  ngOnInit() { }

  ngAfterViewInit() {
    // Подключаем дата пикер
    ($('#creationDate') as any).datepicker({
      onSelect: function(formattedDate, date, inst) {
        // При изменени даты сохраняем значение в localStorage
        localStorage.setItem('creationDate', $('#creationDate').val());
      }
    });
  }

  createContact() {
    // Присваиваем дату из localStorage
    const dateTimeArray = [];
    const dateTime = localStorage.getItem('creationDate').split(' ');
    dateTimeArray[0] = dateTime[0].split('.').reverse().join('.');
    dateTimeArray[1] = dateTime[1];
    const dateTimeFormat = dateTimeArray.join(' ');
    this.createContactForm.value.creationDate = firestore.Timestamp.fromMillis(+new Date(dateTimeFormat));
    // Обновляем данные проекта
    this.contactService.createContact(this.createContactForm.value).then(res => {
      this.notifyService.success('Успешно', 'Элемент успешно создан');
    }).catch(err => {
      this.notifyService.error('Ошибка', err);
      console.log(err);
    });
  }

}
