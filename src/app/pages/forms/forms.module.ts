import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { ButtonsModule } from './buttons/buttons.module';
import { BlomeComponent } from './blome/blome.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import  {NbToastrModule} from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    Ng2SmartTableModule,
    ButtonsModule,
    NbToastrModule.forRoot(),
    
  ],
  declarations: [
    ...routedComponents,
    BlomeComponent,
  ],
})
export class FormsModule { }
