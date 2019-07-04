import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../db/project.service';
import {Project} from '../../db/model/project.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projects: Project[];
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjectsLenght().subscribe(data => {
      this.projects = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Project;
      });
    });
  }

}
