import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { LightSwitch } from './light-switch';

@Component({
  selector: 'app-light-switch',
  templateUrl: './light-switch.component.html',
  styleUrls: ['./light-switch.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LightSwitchComponent {
  @Input() lightSwitch: LightSwitch;
  @Output() lightSwitchOut = new EventEmitter<LightSwitch>();

  ToggleLightSwitch() {
    this.lightSwitch.status = this.lightSwitch.status === true ? false : true;
    this.lightSwitchOut.emit(this.lightSwitch)
  }
  constructor() { }
}
