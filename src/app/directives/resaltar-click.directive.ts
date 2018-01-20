import { Directive, HostListener, HostBinding} from '@angular/core';

@Directive({
  selector: 'button[resaltar-click]'
})
export class ResaltarClickDirective {

  class= 'btn btn-primary btn-lg m-0 mb-4';
  @HostBinding('class') clases = this.class;
  @HostListener('click',['$event.target']) onclick(btn){
    this.class = 'btn btn-success btn-lg m-0 mb-4';
    this.clases = this.class;
  }
}
