import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../db/project.service';
import {Project} from '../../../db/model/project.model';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
declare var $: any;
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NotificationsService} from 'angular2-notifications';
import {UploadService} from '../../../upload.service';
import {firestore} from 'firebase';
import {ToolsService} from '../../../db/tools.service';

@Component({
  selector: 'app-proj-update',
  templateUrl: './proj-update.component.html',
  styleUrls: ['./proj-update.component.scss']
})
export class ProjUpdateComponent implements OnInit, AfterViewInit {

  public Editor = ClassicEditor;
  project: Project;
  public imgAvaUrl: string;
  public imgMainUrl: string;

  constructor(
    private uploadService: UploadService,
    private notifyService: NotificationsService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tools: ToolsService) { }

  updProjForm = this.fb.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    author: ['', [Validators.required]],
    creationDate: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    img: ['', [Validators.required]],
    img_description: ['', [Validators.required]]
  });

  get id() {return this.updProjForm.get('id'); }
  get title() {return this.updProjForm.get('title'); }
  get description() {return this.updProjForm.get('description'); }
  get author() {return this.updProjForm.get('author'); }
  get creationDate() {return this.updProjForm.get('creationDate'); }
  get tags() {return this.updProjForm.get('tags'); }
  get img() {return this.updProjForm.get('img'); }
  get img_description() {return this.updProjForm.get('img_description'); }

  ngOnInit() {
    this.projectService.getProject(this.route.snapshot.params.id).subscribe(data => {
      this.project = {
        id: data.id,
        ...data.data()
      } as Project;

      this.updProjForm.get('id').setValue(data.id);
      this.updProjForm.get('title').setValue(data.data().title);
      this.updProjForm.get('description').setValue(data.data().description);
      this.updProjForm.get('author').setValue(data.data().author);
      this.updProjForm.get('creationDate').setValue(this.tools.timestampToDate(data.data().creationDate.seconds * 1000));
      this.updProjForm.get('tags').setValue(data.data().tags);
      this.updProjForm.get('img').setValue(data.data().img);
      this.updProjForm.get('img_description').setValue(data.data().img_description);
      this.imgAvaUrl = data.data().img;
      this.imgMainUrl = data.data().img_description;
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

  uploadAvaFile(event) {
    this.uploadService.onFileChange(event);
    this.uploadService.uploadFile().then(res => {
      this.updProjForm.get('img').setValue(this.uploadService.url);
      this.imgAvaUrl = this.uploadService.url;
    });
  }

  uploadMainFile(event) {
    this.uploadService.onFileChange(event);
    this.uploadService.uploadFile().then(res => {
      this.updProjForm.get('img_description').setValue(this.uploadService.url);
      this.imgMainUrl = this.uploadService.url;
    });
  }

  updateProj() {
    // Присваиваем дату из localStorage
    const dateTimeArray = [];
    const dateTime = localStorage.getItem('creationDate').split(' ');
    dateTimeArray[0] = dateTime[0].split('.').reverse().join('.');
    dateTimeArray[1] = dateTime[1];
    const dateTimeFormat = dateTimeArray.join(' ');
    this.updProjForm.value.creationDate = firestore.Timestamp.fromMillis(+new Date(dateTimeFormat));
    // Обновляем данные проекта
    this.projectService.updateProject(this.updProjForm.value).then(res => {
      this.notifyService.success('Успешно', 'Элемент успешно обновлен');
    }).catch(err => {
      this.notifyService.error('Ошибка', err);
      console.log(err);
    });
  }
}
