import { Component, OnInit } from '@angular/core';
import {Project} from '../../../db/model/project.model';
import {ProjectService} from '../../../db/project.service';

@Component({
  selector: 'app-proj-list',
  templateUrl: './proj-list.component.html',
  styleUrls: ['./proj-list.component.sass']
})
export class ProjListComponent implements OnInit {

  projects: Project[];
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Project;
      });
    });
  }

}
