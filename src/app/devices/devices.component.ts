import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DevicesService } from './devices.service';

import { Device } from './device';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor(public dialog: MatDialog, private devicesService: DevicesService) {}

  ngOnInit() { 
    this.readDevices();
  }
  
  panelOpenState: boolean = false;

  step = -1;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  animal: string;
  type: string;

  openDialog(): void {
    let dialogRef = this.dialog.open(DeviceNewDialog, {hasBackdrop:true, width: '100%',
      data: { name: this.type, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: '+ result);
      this.animal = result;
    });
  }

  readDevices(): void{
    this.devicesService.readDevices();
  }
}

@Component({
  selector: 'devices.component.new-device-dialog',
  templateUrl: 'devices.component.new-device-dialog.html',
})
export class DeviceNewDialog {

  constructor(public dialogRef: MatDialogRef<DeviceNewDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder) {
  }

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}