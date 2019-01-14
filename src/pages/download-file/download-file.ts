import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, Platform } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { Diagnostic } from "@ionic-native/diagnostic";
import { File } from "@ionic-native/file";
import { ToastProvider } from "../../providers/toast/toast";

/**
 * Generated class for the DownloadFilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-download-file',
    templateUrl: 'download-file.html',
})
export class DownloadFilePage {

    constructor(public navCtrl: NavController,
                public platform: Platform,
                public transfer: FileTransfer,
                public loadingCtrl: LoadingController,
                public file: File,
                public toast: ToastProvider,
                public diagnostic: Diagnostic) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DownloadFilePage');
    }

    download() {
        this.platform.ready().then(() => {
            let fileTransfer: FileTransferObject = this.transfer.create();
            this.diagnostic.requestCameraRollAuthorization().then(() => {
                let loadCtrl = this.loadingCtrl.create({ showBackdrop: true });
                loadCtrl.present();
                let targetPath = this.file.dataDirectory;
                console.log('target file path: ', targetPath);
                this.file.resolveDirectoryUrl(targetPath).then(() => {
                    fileTransfer.download(encodeURI('http://47.75.244.75/test-files/mengxuan_store.png'), targetPath + 'mengxuan_store.png').then((entry) => {
                        console.log('download complete: ' + entry.toURL());
                    }, (error) => {
                        console.log(error)
                    });
                    fileTransfer.onProgress((event: ProgressEvent) => {
                        let num = Math.floor(event.loaded / event.total * 100);
                        if (num === 100) {
                            loadCtrl.dismiss().then(() => {
                                this.toast.createToast('下载成功', 'success')
                            })
                        }
                    })
                })

            }).catch(() => {
                this.toast.createToast("请开启图片写入功能！", "default");
            })
        });
    }

}
