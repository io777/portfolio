import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../db/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projectCount: any;
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjectsLength().subscribe(data => {
      this.projectCount = data.length;
    });
  }

}
