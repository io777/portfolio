import { Component, OnInit } from '@angular/core';
import {Project} from '../../db/model/project.model';
import {ProjectService} from '../../db/project.service';
import {ActivatedRoute} from '@angular/router';
import {ToolsService} from '../../db/tools.service';

@Component({
  selector: 'app-projecthome',
  templateUrl: './projecthome.component.html',
  styleUrls: ['./projecthome.component.scss']
})
export class ProjecthomeComponent implements OnInit {

  project: Project;
  dateCreate: string;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private tools: ToolsService) { }

  ngOnInit() {
    this.projectService.getProject(this.route.snapshot.params.id).subscribe(data => {
      this.project = {
        id: data.id,
        ...data.data()
      } as Project;
      this.dateCreate = this.tools.timestampToDate(this.project.creationDate.seconds * 1000);
    });
  }

}
