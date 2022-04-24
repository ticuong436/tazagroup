import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { landingHomeRoutes } from 'app/modules/landing/home/home.routing';
import { MaterialExampleModule } from 'material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TailieunguonComponent } from '../tailieunguon/tailieunguon.component';
import { BaihocComponent } from '../baihoc/baihoc.component';
import {LophocComponent} from '../lophoc/lophoc.component'
import { UploadFileComponent } from '../tailieunguon/upload-file/upload-file.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
@NgModule({
    declarations: [
        LandingHomeComponent,
        TailieunguonComponent,
        BaihocComponent,
        LophocComponent,
        UploadFileComponent
    ],
    imports     : [
        RouterModule.forChild(landingHomeRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MaterialExampleModule,
        CKEditorModule,
        PdfViewerModule,
        ReactiveFormsModule,
        FormsModule,
        NgxDocViewerModule

    ]
})
export class LandingHomeModule
{
}
