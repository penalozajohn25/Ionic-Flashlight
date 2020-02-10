import { Component } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import * as $ from 'jquery'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    
  isOn = false;
  tourch: boolean = false;
  status: String = 'Off';
  currentScreenOrientation:string;
  constructor(
      private flashlight: Flashlight,
      private screenOrientation: ScreenOrientation) {
      // get current
      this.currentScreenOrientation = this.screenOrientation.type; // logs the current orientation, example: 'landscape'
      this.setPortrait();
      // detect orientation changes
      this.screenOrientation.onChange().subscribe(
          () => {
              this.currentScreenOrientation = this.screenOrientation.type;
              console.log(this.currentScreenOrientation);
              if(this.currentScreenOrientation === 'landscape-primary') {
                this.setPortrait();
              }
          }
      );
  }

  ngOnInit(){
    $(".switch").on('click', function(){
        $(this).toggleClass("active");
        if ($('.span').text() == "ON")
             $('.span').text("OFF")
          else
             $('.span').text("ON");
      });
  }

    setLandscape(){
        // set to landscape
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }

    setPortrait(){
        // set to portrait
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }

    unlockScreen(){
        // allow user rotate
        this.screenOrientation.unlock();
    }


    public onTorch() {
        if (this.flashlight.available()) {
            console.log('encender');
            this.isOn = true;
            this.flashlight.switchOn();
        } else {
            alert("Flashlight Not Available");
        }
    }

    public offTorch() {
        console.log('apagar');
        this.isOn = false;
        this.flashlight.switchOff();
    }

    public startTorch(){
      this.tourch =! this.tourch;

      if(!this.tourch){
          console.log('apagar');
          this.isOn = false;
          this.flashlight.switchOff();
          this.status = "Off";
      } else {
          if (this.flashlight.available()) {
              console.log('encender');
              this.isOn = true;
              this.flashlight.switchOn();
              this.status = "On";
          } else {
              alert("Flashlight Not Available");
          }
       }
    }
}
