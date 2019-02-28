import { Component, OnInit } from '@angular/core';
//models
import { Gn_blome } from './models/models';
//components
import { SmartTableData } from '../../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';
//services
import { BlomeService } from './services/blome.service';
import { NbToastrService } from '@nebular/theme';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'ngx-blome',
  templateUrl: './blome.component.html',
  styleUrls: ['./blome.component.scss']
})

export class BlomeComponent implements OnInit {
  loading:boolean=false;
  months: any[];
  states: any[];
  myBlome: Gn_blome = new Gn_blome();
  mySource: Gn_blome[]=[];
  bloqueados:number=0;
  activos:number=0;
  constructor(private service: BlomeService, private toastrService: NbToastrService) {

    this.months = [
      { title: 'todos', value: 0, },
      { title: 'Enero', value: 1, },
      { title: 'Febrero', value: 2 },
      { title: 'Marzo', value: 3 },
      { title: 'Abril', value: 4 },
      { title: 'Mayo', value: 5 },
      { title: 'Junio', value: 6 },
      { title: 'Julio', value: 7 },
      { title: 'Agosto', value: 8 },
      { title: 'Septimebre', value: 9 },
      { title: 'Octubre', value: 10 },
      { title: 'Noviembre', value: 11 },
      { title: 'Diciembre', value: 12 },
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
        type: 'string'        
      },
      Blo_Mesp: {
        title: 'Mes',
        type: 'string',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [      
              { title: 'Enero', value: 1, },
              { title: 'Febrero', value: 2 },
              { title: 'Marzo', value: 3 },
              { title: 'Abril', value: 4 },
              { title: 'Mayo', value: 5 },
              { title: 'Junio', value: 6 },
              { title: 'Julio', value: 7 },
              { title: 'Agosto', value: 8 },
              { title: 'Septimebre', value: 9 },
              { title: 'Octubre', value: 10 },
              { title: 'Noviembre', value: 11 },
              { title: 'Diciembre', value: 12 },
            ] ,
          },
        }
      },
      Blo_Acti: {
        title: 'Estado',
        type: 'string',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              {value: 'S', title:'Activo'},
              {value: 'N', title:'Inactivo'},             
            ],
          },
        }
      }
    },
    actions: {
      columnTitle: 'Acciones'
    },
    noDataMessage: 'No hay datos'
  };

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartLabels= [this.myBlome.Blo_Anop]; 
  public barChartData:any[] = [
    {data: [20], label: 'Bloqueados'},
    {data: [21], label: 'Desbloqueados'}
  ];
  public chartClicked(e:any):void {
  
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
 

  ngOnInit() {
    console.log('entrasdss');
  }


  GetGnBlome() {
    this.loading=true;
    console.log(this.months);
    if(this.myBlome.Blo_Mesp==null)
    this.myBlome.Blo_Mesp=0;
    this.service.getBlome(this.myBlome).subscribe((data: any) => {
      
      this.source = data.ObjTransaction;
      this.loading=false;
      let chartSource: Gn_blome[] = data.ObjTransaction;
      console.log(chartSource.length);
      this.bloqueados = chartSource.filter(b=>b.Blo_Acti=='N').length;
      console.log(chartSource.length);
      this.activos = chartSource.filter(b=>b.Blo_Acti=='S').length;   
      console.log(this.activos);
      console.log(this.bloqueados);
      this.barChartLabels.length = 0;
      this.barChartLabels.push(this.myBlome.Blo_Anop);     
      let newData:any[]= [
        { data:[this.bloqueados],label:'Bloqueados'},
        {data:[this.activos],label:'Desbloqueados'}
      ];
        this.barChartData = newData;    
        this.ngOnInit(); 
        console.log(this.barChartData)      ;
    })
  }
  updateBlome() {
    this.service.updateBlome(this.myBlome).subscribe(data => console.log(data));
  }
  deleteBlome(myBlome: Gn_blome) {

  }

  PostGnBlome() {
    this.service.setBlome(this.myBlome);
  }
  onDeleteConfirm(event): void {
  
    console.log(event);
    if (window.confirm('Está seguro de eliminar el registro?')) {
      this.loading=true;
      console.log("entra");
      this.service.deleteBlome(event.data).subscribe((data: any) => {
        this.loading=false;
        console.log("respuesta");
        if (data.Retorno == 0) {
          this.showToast(false, "Registro eliminado correctamente");
          event.confirm.resolve();
        }
        else {
          this.showToast(false, data.TxtError);
          event.confirm.reject();
        }
      });


    } else {

    }
  }

  onCreateConfirm(event) {
    this.loading=true;
    let newBlome :Gn_blome = new Gn_blome();
    newBlome.Blo_Acti = event.newData.Blo_Acti;
    newBlome.Blo_Anop = event.newData.Blo_Anop;
    newBlome.Blo_Mesp = event.newData.Blo_Mesp;
    console.log("create");
    this.service.setBlome(newBlome).subscribe((data: any) => {
      if (data.Retorno == 0) {
        this.showToast(false, "Registro añadido correctamente");
        event.confirm.resolve();
      }
      else {
        this.showToast(false, data.TxtError);
        event.confirm.reject();
      }
      this.loading=false;
    });
  }
  onEditConfirm(event) {
    this.loading=true;
    console.log(event);
    this.service.updateBlome(event.newData).subscribe((data: any) => {
      this.loading=false;
      if (data.Retorno == 0) {
        this.showToast(false, "Registro actualizado correctamente");
        event.confirm.resolve();
      }
      else {
        this.showToast(false, data.TxtError);
        event.confirm.reject();
      }
    });

  }
  editConfirm(event) {
    console.log("editar");
  }
  showToast(destroyByClick, message: string) {
    this.toastrService.show(
      message,
      `Mensaje de sistema`,
      { destroyByClick });
  }

}
