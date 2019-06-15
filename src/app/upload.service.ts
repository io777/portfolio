import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = '/images';
  file: File;
  url = '';

  constructor(private afStorage: AngularFireStorage) { }

  onFileChange(event) {
    this.file = event.target.files[0];
  }

  async uploadFile() {
    if (this.file) {
      const filePath = `${this.basePath}/${this.file.name}`;
      const snap = await this.afStorage.upload(filePath, this.file);
      await this.getUrl(snap);
    } else {alert('Загрузите фото'); }
  }

  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url;
    console.log(this.url);
  }

}
