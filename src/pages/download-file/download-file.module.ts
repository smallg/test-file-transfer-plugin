import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DownloadFilePage } from './download-file';

@NgModule({
    declarations: [
        DownloadFilePage,
    ],
    imports: [
        IonicPageModule.forChild(DownloadFilePage),
    ],
})
export class DownloadFilePageModule {
}
