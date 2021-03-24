import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Options } from '../interfaces/toast';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(public toastController: ToastController) {}

  async showMessage(op: Options) {
    const toast = await this.toastController.create({
      header: op.header,
      message: op.message,
      position: op.position,
      duration: op.duration,
      color: op.color,
    });
    toast.present();
  }
}
