import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';


/* 
    En Angular se pueden tener mas de un router,
    de hecho, es comun tener mas de uno.

    Cuando implementamos este concepto de rutas, se abre
    una nueva opcion llamada lazyload, carga perezosa de componentes
    o modulos.

    El lazyload depende de la aplicacion que se quiera hacer.
*/


const routes: Routes = [
    // Esta es la forma en como se definen las rutas en mi router
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'about',
        component: AboutPageComponent
    },
    {
        path: 'contact',
        component: ContactPageComponent
    },
    {
        path: 'countries',
        loadChildren: () => import('./countries/countries.module')
                                    .then( m => m.CountriesModule )
        /* 
        Esta funcion resuelve una promesa

        Importa una ruta, esa ruta es la del modulo
        */
    },
    {
        /* 
        Cualquier ruta que no este definida en mi router 
        con este codigo redirige a mi home
        */
        path: '**',
        redirectTo: 'countries' 
    }
];

@NgModule({
    imports: [
        /*Si es el primer router y es el principal pues se agrega el .forRoute
         y se envia como parametro las rutas que tenemos definidas */
        RouterModule.forRoot(routes), 
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }
