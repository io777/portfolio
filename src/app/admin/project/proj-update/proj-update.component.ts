import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../db/project.service';
import {Project} from '../../../db/model/project.model';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
declare var $: any;
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-proj-update',
  templateUrl: './proj-update.component.html',
  styleUrls: ['./proj-update.component.scss']
})
export class ProjUpdateComponent implements OnInit, AfterViewInit {

  public Editor = ClassicEditor;
  project: Project;
  constructor(private projectService: ProjectService, private route: ActivatedRoute, private fb: FormBuilder) { }

  updProjForm = this.fb.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    author: ['', [Validators.required]],
    creationDate: ['', [Validators.required]],
    tags: ['', [Validators.required]]
  });

  get id() {return this.updProjForm.get('id'); }
  get title() {return this.updProjForm.get('title'); }
  get description() {return this.updProjForm.get('description'); }
  get author() {return this.updProjForm.get('author'); }
  get creationDate() {return this.updProjForm.get('creationDate'); }
  get tags() {return this.updProjForm.get('tags'); }

  ngOnInit() {
    this.projectService.getProject(this.route.snapshot.params.id).subscribe(data => {
      console.log(data.data());
      this.project = {
        id: data.id,
        ...data.data()
      } as Project;

      this.updProjForm.get('id').setValue(data.id);
      this.updProjForm.get('title').setValue(data.data().title);
      this.updProjForm.get('description').setValue(data.data().description);
      this.updProjForm.get('author').setValue(data.data().author);
      this.updProjForm.get('creationDate').setValue(data.data().creationDate);
      this.updProjForm.get('tags').setValue(data.data().tags);
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

  updateProj() {
    // Присваиваем дату из localStorage
    this.updProjForm.value.creationDate = localStorage.getItem('creationDate');
    console.log(this.updProjForm.value);
    // Обновляем данные проекта
    this.projectService.updateProject(this.updProjForm.value).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
}
