import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Project} from './model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private firestore: AngularFirestore) { }

  getProjects() {
    return this.firestore.collection('projects').snapshotChanges();
  }

  getProject(projectId: string) {
    return this.firestore.doc('projects/' + projectId).get();
  }

  createProject(project: Project) {
    return this.firestore.collection('projects').add(project);
  }

  updateProject(project: Project) {
    // delete project.id;
    return this.firestore.doc('projects/' + project.id).update(project);
  }

  deleteProject(projectId: string) {
    this.firestore.doc('projects/' + projectId).delete();
  }
}
