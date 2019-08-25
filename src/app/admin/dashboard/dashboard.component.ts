import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../db/project.service';
import {ContactService} from '../../db/contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projectCount: any;
  contactCount: any;

  constructor(
    private projectService: ProjectService,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.projectService.getProjectsLength().subscribe(data => {
      this.projectCount = data.length;
    });
    this.contactService.getContactsLength().subscribe(data => {
      this.contactCount = data.length;
    });

  }

}
