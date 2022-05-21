import { Component, OnInit } from '@angular/core';
import { TailienguonService } from '../tailieunguon/tailienguon.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { map } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DethiService } from '../dethi/dethi.service';
import { KythiService } from './kythi.service';


@Component({
  selector: 'app-kythi',
  templateUrl: './kythi.component.html',
  styleUrls: ['./kythi.component.scss']
})
export class KythiComponent implements OnInit {

  tailieu: any;
    kythi: any[];
    dethi:any[];
    baihocDetail: any;
    kythiList: FormGroup;
    public Editor = ClassicEditor;

    constructor(
        private tailieunguonService: TailienguonService,
        private fb: FormBuilder,
        private kythiService: KythiService,
        private dethiService: DethiService
    ) {}

    onSubmit() {
        this.kythiService.uploadBaihoc(this.kythiList.value).subscribe();
        alert('Tạo bài học thành công');
        this.resetForm();
    }
    deleteBaihoc(id) {
        this.kythiService.deleteBaihoc(id).subscribe;
    }

    onSelect(item) {
        this.kythiList.addControl('id', new FormControl(item.id));
        this.kythiList.get('id').setValue(item.id);

        this.kythiList.get('idTailieu').setValue(item.idTailieu);

        this.kythiList.get('name').setValue(item.name);
        this.kythiList.get('danhMuc').setValue(item.danhMuc);

        this.kythiList.get('content').setValue(item.content);
        this.kythiList.get('nguoiDuyet').setValue(item.nguoiDuyet);
        this.kythiList.get('deThi').setValue(item.deThi);
        this.kythiList.get('note').setValue(item.note);
    }
    resetForm() {
        this.kythiList.removeControl('id');
        this.kythiList = this.fb.group({
            idTailieu: [0],
            name: [''],
            danhMuc: [''],
            content: [''],
            nguoiDuyet: [''],
            deThi: [''],
            note: [''],
        });
    }
    updateBaihoc() {
        alert('Cập nhật thành công');

        this.kythiService.updateBaihoc(this.kythiList.value).subscribe();
        this.resetForm();
        this.ngOnInit();
    }

    ngOnInit(): void {
        this.kythiList = this.fb.group({
            idTailieu: [0],
            name: [''],
            danhMuc: [''],
            content: [''],
            nguoiDuyet: [''],
            deThi: [''],
            note: [''],
        });
        this.dethiService.getDethi().subscribe();
        this.dethiService.dethi$.subscribe((res) => (this.dethi = res));
        this.kythiService.getBaihoc().subscribe();
        this.kythiService.kythi$.subscribe((res) => {
            console.log(res);

            return (this.kythi = res);
        });
        this.tailieunguonService.getFile().subscribe();
        this.tailieunguonService.files$
            .pipe(
                map(
                    (arr: any) =>
                        arr &&
                        arr.length &&
                        arr.filter((r) => {
                            return r.type == 'file';
                        })
                )
            )
            .subscribe((result) => {
                if (result) {
                    console.log(result);

                    this.tailieu = result;
                }
            });
    }
}
