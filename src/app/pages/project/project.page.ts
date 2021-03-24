import { FormPage } from './modal/form/form.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { UtilService } from 'src/app/shared/services/util.service';
import { ProjectService } from 'src/app/shared/services/project.service';

import { Project } from 'src/app/shared/interfaces/project';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {
  nOffset: number;
  projects: Project[];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    public modalController: ModalController,
    private projectService: ProjectService,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.nOffset = 0;
    this.getProjects();
    this.projects = [];
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FormPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }



  onDelete(id: number): void {
    this.util.showMessage({
      message: 'Indisponível no momento',
      position: 'top',
      duration: 3000,
      color: 'warning',
    });
    this.nOffset = 0;
    this.getProjects();
  }

  onUpdate(id: number): void {
    this.util.showMessage({
      message: 'Indisponível no momento',
      position: 'top',
      duration: 3000,
      color: 'warning',
    });
    this.nOffset = 0;
    this.getProjects();
  }

  loadData(event) {
    this.nOffset += 10;
    event.target.complete();
    this.getProjects(true, event);
  }

  private getProjects(scroll: boolean = false, event?: any): void {
    this.projectService.read(this.nOffset, 10).subscribe(
      (data) => {
        if (scroll) {
          data.map((pro) => {
              this.projects.push(pro);
          });
        } else {
          this.projects = data.length ? data : this.projects;
        }
        if ( !data.length ) { event.target.disabled = true; }
      },
      (error) => {
        if (error.token.code === 'TokenIvalid') {
          this.util.showMessage({
            message: 'Sua seção expirou. Faça login novamente.',
            position: 'top',
            duration: 3000,
            color: 'danger',
          });
        } else {
          this.util.showMessage({
            message: 'Erro ao obter dados.',
            position: 'top',
            duration: 3000,
            color: 'danger',
          });
        }
      }
    );
  }
}
