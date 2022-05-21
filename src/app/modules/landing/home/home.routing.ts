import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { BaihocComponent } from '../baihoc/baihoc.component';
import { CauhoiComponent } from '../cauhoi/cauhoi.component';
import { DethiComponent } from '../dethi/dethi.component';
import { KythiComponent } from '../kythi/kythi.component';
import { LophocComponent } from '../lophoc/lophoc.component';
import { TailieunguonComponent } from '../tailieunguon/tailieunguon.component';

export const landingHomeRoutes: Route[] = [
    {
        path: '',
        component: LandingHomeComponent,
        children: [
            { path: 'tai-lieu-nguon', component: TailieunguonComponent },
            { path: 'bai-hoc', component: BaihocComponent },
            { path: 'lop-hoc', component: LophocComponent },
            { path: 'cau-hoi', component: CauhoiComponent },
            {path: 'de-thi', component: DethiComponent},
            {path: 'ky-thi', component: KythiComponent}



        ],
    },
];
