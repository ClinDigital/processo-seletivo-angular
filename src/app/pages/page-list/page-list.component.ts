import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClincDTO } from 'src/app/dtos/clinc.dto';
import { RoutesEnum } from 'src/app/enums/routes.enum';
import { ClincService } from 'src/app/services/clinc.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  clinics: ClincDTO[] = [];
  searchTerm: string = '';
  totalClinics: number = 0;


  constructor(
    private clincService: ClincService,
    private toastService: ToastService,
    private route: Router,
  ){}

  ngOnInit(): void {
    this.fetchClinics();
  }

  fetchClinics(page: number = 1, limit: number = 10) {
    this.clinics = [];
    if (!this.searchTerm) {
      this.clincService.getClincs(page, limit).subscribe({
        next: (response) => {
          this.clinics = response.data;
          this.totalClinics = response.total;
        },
        error: () => {
          this.toastService.showError(`Erro ao resgatar listagem de clínicas`);
        }
      });
    }
  }

  redirectNewClinc(){
    this.route.navigate([RoutesEnum.SESSION_NEW_CLINC]);
  }

  edit(clincId: any){
    this.route.navigate([`${RoutesEnum.SESSION_CLINC_INFO}/${clincId}`])
  }

  delete(clincId: any){
    this.clincService.deleteClinc(clincId).subscribe({
      next: () => {
        this.toastService.showSuccess('Clínica excluída com sucesso!');
      },
      error: () => {
        this.toastService.showError(`Erro ao excluir clínica`);
      }
    });
  }

}
