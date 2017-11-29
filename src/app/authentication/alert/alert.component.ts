import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {
    message: any;
    constructor(private alertService: AlertService) { }

    ngOnInit() {
         this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
