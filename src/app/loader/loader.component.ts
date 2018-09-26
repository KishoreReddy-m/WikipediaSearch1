/*
    # This component is used to show/hide the progress bar
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from '../_models/loaderState';
import { LoaderService } from '../_services/loader-service';
@Component({
    selector: 'app-loader-component',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
    show = false;
    private subscription: Subscription;
    constructor(
        private loaderService: LoaderService
    ) { }
    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show; // update the loader state
            });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe(); // destroy the subscriber
    }
}
