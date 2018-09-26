/*
    #Loader service is used to show and hide the loader
*/
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../_models/LoaderState';
@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject.asObservable();
    constructor() { }
    show() {
        // Show  the  loader
        this.loaderSubject.next(<LoaderState>{ show: true });
    }
    hide() {
        // hide  the  loader
        this.loaderSubject.next(<LoaderState>{ show: false });
    }
}
