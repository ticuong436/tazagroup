import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { BaihocComponent } from '../baihoc/baihoc.component';
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

        ],
    },
];
