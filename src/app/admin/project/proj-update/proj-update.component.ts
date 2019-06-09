import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../db/project.service';
import {Project} from '../../../db/model/project.model';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-proj-update',
  templateUrl: './proj-update.component.html',
  styleUrls: ['./proj-update.component.sass']
})
export class ProjUpdateComponent implements OnInit {

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

  updateProj() {
    console.log(this.updProjForm.value);
    this.projectService.updateProject(this.updProjForm.value).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
}
