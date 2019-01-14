import { Injectable } from "@angular/core";
import { ToastController, AlertController } from "ionic-angular";

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

    private toast: any;

    constructor(public alertCtrl: AlertController,
                public toastCtl: ToastController) {
        console.log("Hello ToastProvider Provider");
    }

    createToast(msg, type, cb = null) {
        if (this.toast) {
            this.toast.dismiss();
        }
        let position = "middle";
        switch (type) {
            case "default":
                position = "top";
                break;
            case "bottom":
                position = "bottom";
                break;
        }
        let toast = this.toast = this.toastCtl.create({
            message: msg,
            duration: 1000,
            position: position,
            cssClass: type + "-toast",
            dismissOnPageChange: true
        });
        toast.onDidDismiss(() => {
            if (typeof cb == "function") {
                cb();
            }
        });
        toast.present();
    }

    createAlert(msg, cb) {
        let alert = this.alertCtrl.create({
            message: msg,
            buttons: [
                "取消",
                {
                    text: "确认",
                    handler: () => {
                        cb();
                    }
                }
            ]
        });
        alert.present()
    }
}
