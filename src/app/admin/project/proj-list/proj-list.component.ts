import { Component, OnInit } from '@angular/core';
import {Project} from '../../../db/model/project.model';
import {ProjectService} from '../../../db/project.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-proj-list',
  templateUrl: './proj-list.component.html',
  styleUrls: ['./proj-list.component.scss']
})
export class ProjListComponent implements OnInit {

  projectCount: number;
  projects: Project[];
  constructor(private notifyService: NotificationsService, private projectService: ProjectService) { }

  ngOnInit() {

    this.projectService.getProjectsLength().subscribe(data => {
      this.projectCount = data.length;
    });

    this.projectService.getProjects().subscribe(data => {
      this.projects = data.map(e => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data().title,
          description: e.payload.doc.data().description,
          author: e.payload.doc.data().author,
          img: e.payload.doc.data().img,
          tags: e.payload.doc.data().tags.split(','),
          creationDate: e.payload.doc.data().creationDate
        } as Project;
      });
    });
  }

  deleteProj(projectId) {
    this.projectService.deleteProject(projectId);
    this.notifyService.success('Успешно', 'Элемент успешно удален');
  }

  loadMore(key) {
    this.projectService.getProjects(key).subscribe(data => {
      const temp = data.map(e => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data().title,
          description: e.payload.doc.data().description,
          author: e.payload.doc.data().author,
          img: e.payload.doc.data().img,
          tags: e.payload.doc.data().tags.split(','),
          creationDate: e.payload.doc.data().creationDate
        } as Project;
      });
      this.projects = this.projects.concat(temp).sort((a: any, b: any) => {
        return b.creationDate - a.creationDate;
      });
    });
  }
}
