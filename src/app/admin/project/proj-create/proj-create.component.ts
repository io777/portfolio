import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../db/project.service';
import {Project} from '../../../db/model/project.model';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
declare var $: any;
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NotificationsService} from 'angular2-notifications';
import {UploadService} from '../../../upload.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-proj-update',
  templateUrl: './proj-create.component.html',
  styleUrls: ['./proj-create.component.scss']
})
export class ProjCreateComponent implements OnInit, AfterViewInit {

  public Editor = ClassicEditor;
  project: Project;
  imgAvaUrl: string;
  imgMainUrl: string;

  constructor(
    public uploadService: UploadService,
    private notifyService: NotificationsService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  createProjForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    author: ['', [Validators.required]],
    creationDate: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    img: ['', [Validators.required]],
    img_description: ['', [Validators.required]]
  });

  get title() {return this.createProjForm.get('title'); }
  get description() {return this.createProjForm.get('description'); }
  get author() {return this.createProjForm.get('author'); }
  get creationDate() {return this.createProjForm.get('creationDate'); }
  get tags() {return this.createProjForm.get('tags'); }
  get img() {return this.createProjForm.get('img'); }
  get img_description() {return this.createProjForm.get('img_description'); }

  ngOnInit() {
    this.imgUrl = '';
  }

  ngAfterViewInit() {
    // Подключаем дата пикер
    ($('#creationDate') as any).datepicker({
      onSelect: function(formattedDate, date, inst) {
        // При изменени даты сохраняем значение в localStorage
        const test = $('#creationDate').val();
        localStorage.setItem('creationDate', $('#creationDate').val());
      }
    });
  }

  uploadAvaFile(event) {
    this.uploadService.onFileChange(event);
    this.uploadService.uploadFile().then(res => {
      this.createProjForm.get('img').setValue(this.uploadService.url);
      this.imgAvaUrl = this.uploadService.url;
    });
  }

  uploadMainFile(event) {
    this.uploadService.onFileChange(event);
    this.uploadService.uploadFile().then(res => {
      this.createProjForm.get('img_description').setValue(this.uploadService.url);
      this.imgMainUrl = this.uploadService.url;
    });
  }

  createProj() {
    // Присваиваем дату из localStorage
    const dateTime = localStorage.getItem('creationDate').split('.').reverse().join('.');
    this.createProjForm.value.creationDate = firestore.Timestamp.fromDate(new Date(dateTime));
    this.projectService.createProject(this.createProjForm.value).then(res => {
      this.notifyService.success('Успешно', 'Элемент успешно обновлен');
    }).catch(err => {
      this.notifyService.error('Ошибка', err);
    });
  }

}
