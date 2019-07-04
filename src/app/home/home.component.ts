import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../db/project.service';
import {Project} from '../db/model/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects: Project[];
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(key?) {
    this.projectService.getProjects(key).subscribe(projects => {
      projects.forEach(item => {
        console.log(item.payload.doc.data());
      });
    });
  }

}
