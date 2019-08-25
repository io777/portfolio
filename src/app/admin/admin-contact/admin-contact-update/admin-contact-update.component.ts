import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
declare var $: any;
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ToolsService} from '../../../db/tools.service';
import {Contact} from '../../../db/model/contact.model';
import {ContactService} from '../../../db/contact.service';
import {firestore} from 'firebase';

@Component({
  selector: 'app-admin-contact-update',
  templateUrl: './admin-contact-update.component.html',
  styleUrls: ['./admin-contact-update.component.scss']
})
export class AdminContactUpdateComponent implements OnInit, AfterViewInit {

  public Editor = ClassicEditor;
  contact: Contact;

  constructor(
    private notifyService: NotificationsService,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tools: ToolsService) { }

  updContactForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
    creationDate: ['', [Validators.required]]
  });

  get id() {return this.updContactForm.get('id'); }
  get name() {return this.updContactForm.get('name'); }
  get email() {return this.updContactForm.get('email'); }
  get message() {return this.updContactForm.get('message'); }
  get creationDate() {return this.updContactForm.get('creationDate'); }

  ngOnInit() {
    this.contactService.getContact(this.route.snapshot.params.id).subscribe(data => {
      this.contact = {
        id: data.id,
        ...data.data()
      } as Contact;

      this.updContactForm.get('id').setValue(data.id);
      this.updContactForm.get('name').setValue(data.data().name);
      this.updContactForm.get('email').setValue(data.data().email);
      this.updContactForm.get('message').setValue(data.data().message);
      this.updContactForm.get('creationDate').setValue(this.tools.timestampToDate(data.data().creationDate.seconds * 1000));
    });
  }

  ngAfterViewInit() {
    // Подключаем дата пикер
    ($('#creationDate') as any).datepicker({
      onSelect: function(formattedDate, date, inst) {
        // При изменени даты сохраняем значение в localStorage
        localStorage.setItem('creationDate', $('#creationDate').val());
      }
    });
  }

  updateContact() {
    // Присваиваем дату из localStorage
    const dateTimeArray = [];
    const dateTime = localStorage.getItem('creationDate').split(' ');
    dateTimeArray[0] = dateTime[0].split('.').reverse().join('.');
    dateTimeArray[1] = dateTime[1];
    const dateTimeFormat = dateTimeArray.join(' ');
    this.updContactForm.value.creationDate = firestore.Timestamp.fromMillis(+new Date(dateTimeFormat));
    // Обновляем данные проекта
    this.contactService.updateContact(this.updContactForm.value).then(res => {
      this.notifyService.success('Успешно', 'Элемент успешно обновлен');
    }).catch(err => {
      this.notifyService.error('Ошибка', err);
      console.log(err);
    });
  }

}
