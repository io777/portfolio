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

@Component({
  selector: 'app-proj-update',
  templateUrl: './proj-update.component.html',
  styleUrls: ['./proj-update.component.scss']
})
export class ProjUpdateComponent implements OnInit, AfterViewInit {

  public Editor = ClassicEditor;
  project: Project;
  public imgUrl: string;

  constructor(
    private uploadService: UploadService,
    private notifyService: NotificationsService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  updProjForm = this.fb.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    author: ['', [Validators.required]],
    creationDate: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    img: ['', [Validators.required]]
  });

  get id() {return this.updProjForm.get('id'); }
  get title() {return this.updProjForm.get('title'); }
  get description() {return this.updProjForm.get('description'); }
  get author() {return this.updProjForm.get('author'); }
  get creationDate() {return this.updProjForm.get('creationDate'); }
  get tags() {return this.updProjForm.get('tags'); }
  get img() {return this.updProjForm.get('img'); }

  ngOnInit() {
    this.projectService.getProject(this.route.snapshot.params.id).subscribe(data => {
      console.log(data.data());
      this.project = {
        id: data.id,
        ...data.data()
      } as Project;

      function timestampToDate(ts) {
        let d = new Date();
        d.setTime(ts);
        return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
      }

      this.updProjForm.get('id').setValue(data.id);
      this.updProjForm.get('title').setValue(data.data().title);
      this.updProjForm.get('description').setValue(data.data().description);
      this.updProjForm.get('author').setValue(data.data().author);
      this.updProjForm.get('creationDate').setValue(timestampToDate(data.data().creationDate.seconds * 1000));
      this.updProjForm.get('tags').setValue(data.data().tags);
      this.updProjForm.get('img').setValue(data.data().img);
      this.imgUrl = data.data().img;
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

  uploadFile(event) {
    this.uploadService.onFileChange(event);
    this.uploadService.uploadFile().then(res => {
      this.updProjForm.get('img').setValue(this.uploadService.url);
      this.imgUrl = this.uploadService.url;
    });
  }

  updateProj() {
    // Присваиваем дату из localStorage
    const dateTime = localStorage.getItem('creationDate').split('.').reverse().join('.');
    this.updProjForm.value.creationDate = firestore.Timestamp.fromDate(new Date(dateTime));
    // Обновляем данные проекта
    this.projectService.updateProject(this.updProjForm.value).then(res => {
      this.notifyService.success('Успешно', 'Элемент успешно обновлен');
    }).catch(err => {
      this.notifyService.error('Ошибка', err);
      console.log(err);
    });
  }
}
