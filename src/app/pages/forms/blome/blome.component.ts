import { Component, OnInit } from '@angular/core';
//models
import {Gn_blome}  from './models/models';
//components
import { SmartTableData } from '../../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';
//services
import {BlomeService} from './services/blome.service';

@Component({
  selector: 'ngx-blome',
  templateUrl: './blome.component.html',
  styleUrls: ['./blome.component.scss']
})

export class BlomeComponent implements OnInit {

 months:any[];
 myBlome:Gn_blome= new Gn_blome();
 mySource:Gn_blome[];
  constructor(private service:BlomeService) {

    this.months = [
      { name: 'Enero', value: 1, },
      { name: 'Febrero', value: 2 },
      { name: 'Marzo', value: 3 },
      { name: 'Abril', value: 4 },
      { name: 'Mayo', value: 5 },
      { name: 'Junio', value: 6 },
      { name: 'Julio', value: 7 },
      { name: 'Agosto', value: 8 },
      { name: 'Septimebre', value: 9 },
      { name: 'Noviembre', value: 10 },
      { name: 'Diciembre', value: 11 },     
    ];
  }
  source: LocalDataSource = new LocalDataSource();
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {      
      Blo_anop: {
        title: 'Año',
        type: 'string',
      },
      Blo_Mesp: {
        title: 'Mes',
        type: 'string',
      },
     Blo_Acti : {
        title: 'Estado',
        type: 'string',
      }
    },
  };

  ngOnInit() {
    console.log('entra');
  }


  GetGnBlome(){

       this.service.getBlome().subscribe((data:any)=>{
         this.source = data;
       })
  }
  updateBlome(){
        this.service.updateBlome(this.myBlome);
  }

  PostGnBlome(){
    this.service.setBlome(this.myBlome);
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
