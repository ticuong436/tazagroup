import { Component, OnInit } from '@angular/core';
import { TailienguonService } from '../tailieunguon/tailienguon.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaihocService } from './baihoc.service';

@Component({
    selector: 'app-baihoc',
    templateUrl: './baihoc.component.html',
    styleUrls: ['./baihoc.component.scss'],
})
export class BaihocComponent implements OnInit {
    tailieu: any;
    baihocList:FormGroup
    public Editor = ClassicEditor;

    constructor(private tailieunguonService: TailienguonService, private fb:FormBuilder, private baihocService: BaihocService,) {}

    onSubmit(){
      this.baihocService.uploadBaihoc(this.baihocList.value).subscribe()
      alert('Tạo bài học thành công')
    }
    deleteBaihoc(id){
      this.baihocService.deleteBaihoc(id).subscribe
    }

    ngOnInit(): void {


      this.baihocList = this.fb.group({
        idTailieu:[0],
        name:[''],
        danhMuc:[''],
        content:[''],
        nguoiDuyet:[''],
        deThi:[''],
        note:[''],
    });

      this.tailieunguonService.getFile().subscribe()
      this.tailieunguonService.files$
      .pipe(
          map(
              (arr: any) =>
                  arr &&
                  arr.length &&
                  arr.filter((r) => {
                      return r.type == 'file'})
          )
      )
      .subscribe((result) => {
          if(result){
            console.log(result)

              this.tailieu = result;
          }
      });
    }
}
