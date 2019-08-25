import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../db/project.service';
import {Project} from '../../db/model/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projectCount: number;
  projects: Project[];
  tag = '';
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjectsLength().subscribe(data => {
      this.projectCount = data.length;
    });

    this.projectService.getProjects().subscribe(data => {
      this.projects = data.map(e => {
        // @ts-ignore
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

  loadMore(key) {
    this.projectService.getProjects(key).subscribe(data => {
      const temp = data.map(e => {
        // @ts-ignore
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
