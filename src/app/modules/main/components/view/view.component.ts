import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  files: File[] = [];
  fileData: fileData[] = []

  constructor(private router: Router, private _getService: GetService) { }

  ngOnInit(): void {
    // Check if the current URL matches the desired URL
    // this.showSelectColumn = this.router.url != '/user/contact/manage';
    this._getService.getRequest('data/get_files').subscribe(
      res => {
        this.files = res
      },
      err => {

      })

      this._getService.getRequest('data/get_data').subscribe(
        res => {
          this.fileData = res
        },
        err => {
  
        })
  }

  deleteFile(item: File) {
    const confirmation = window.confirm('Are you sure you want to delete this file?');
    if (confirmation) {
      this._getService.getRequest('data/delete_files/' + item.id).subscribe(
        res => {;
          alert(res.message);
        },
        err => {

        })
    }
  }
}

type File = {
  id: number;
  filename: string;
  file_path: string;
  uploaded_at: string;
  user_id: number;
};

type fileData = {
  id: number,
  sex: string,
  age: string,
  indications: string,
  prothesis_type: string,
  file_id: number,
}
