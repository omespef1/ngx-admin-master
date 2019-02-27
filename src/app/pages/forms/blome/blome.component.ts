import { Component, OnInit } from '@angular/core';
//models
import { Gn_blome } from './models/models';
//components
import { SmartTableData } from '../../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';
//services
import { BlomeService } from './services/blome.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-blome',
  templateUrl: './blome.component.html',
  styleUrls: ['./blome.component.scss']
})

export class BlomeComponent implements OnInit {

  months: any[];
  states: any[];
  myBlome: Gn_blome = new Gn_blome();
  mySource: Gn_blome[];
  constructor(private service: BlomeService,private toastrService: NbToastrService) {

    this.months = [
      { name: 'Seleccione Mes', value: 0, },
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
    this.states = [      
      {
      title: 'Activo',
      value: 'S'
    },
    {
      title: 'Inactivo',
      value: 'N'
    }]
  }

  source: LocalDataSource = new LocalDataSource();
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true 
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true 
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      Blo_Anop: {
        title: 'Año',
        type: 'string',
      },
      Blo_Mesp: {
        title: 'Mes',
        type: 'string',
      },
      Blo_Acti: {
        title: 'Estado',
        type: 'string',
      }
    },
    actions: {
      columnTitle: 'Acciones'
    },
    noDataMessage: 'No hay datos'
  };

  ngOnInit() {
    console.log('entrasdss');
  }


  GetGnBlome() {
    console.log(this.months);
    this.service.getBlome(this.myBlome).subscribe((data: any) => {
      console.log(data);
      this.source = data.ObjTransaction;
    })
  }
  updateBlome() {
    this.service.updateBlome(this.myBlome).subscribe(data=> console.log(data));
  }
  deleteBlome(myBlome:Gn_blome){
    
  }

  PostGnBlome() {
    this.service.setBlome(this.myBlome);
  }
  onDeleteConfirm(event): void {
    console.log(event);
    if (window.confirm('Está seguro de eliminar el registro?')) {
console.log("entra");
      this.service.deleteBlome(event.data).subscribe((data:any)=>{
        console.log("respuesta");
        if(data.Retorno==0){
          this.showToast(false,"Registro eliminado correctamente");
          event.confirm.resolve();
        }
        else {
          this.showToast(false,data.TxtError);
          event.confirm.reject();
        }
      });
     
     
    } else {
     
    }
  }

  onCreateConfirm(event){
    console.log("create");
    this.service.setBlome(event.data).subscribe((data:any)=>{
      if(data.Retorno==0){
        this.showToast(false,"Registro añadido correctamente");
        event.confirm.resolve();
      }
      else {
        this.showToast(false,data.TxtError);
        event.confirm.reject();
      }
    });
  }
  onEditConfirm(event){
    this.service.updateBlome(event.data).subscribe((data:any)=>{
      if(data.Retorno==0){
        this.showToast(false,"Registro actualizado correctamente");
        event.confirm.resolve();
      }
      else {
        this.showToast(false,data.TxtError);
        event.confirm.reject();
      }
    });
    
  }
  editConfirm(event){
    console.log("editar");
  }
  showToast(destroyByClick,message:string) {
    this.toastrService.show(
      message,
      `Mensaje de sistema`,
      { destroyByClick });
  }

}
