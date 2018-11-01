import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  fileList: any[] = [];

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    this.fileList = this.fileService.files;
  }


  fileChoosen(e) {
    for (let i = 0; i < e.detail.length; i++) {
      var file = e.detail[i];
      this.fileList.push(file)
    }
    this.fileService.files = this.fileList
  }

  onSave(e) {
    let file = e.detail;
    let index = this.fileList.findIndex(x => x.name == file.file.name)
    if (index > -1) {
      if (!this.fileList[index].uploadObj) {
        this.fileList[index]['uploadObj'] = e.detail
      } else {
        this.fileList[index].uploadObj = e.detail
      }
      this.fileService.files = this.fileList;
    }
  }

  onProgress(e) {
  }

  onCancel(e) {
    let index = this.fileList.findIndex(x => x.name == e.detail.name && x.size == e.detail.size);
    if (index > -1) {
      this.fileList.splice(index, 1);
    }
  }
}
