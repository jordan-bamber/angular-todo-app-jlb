import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  selector: '[appToolTip]'
})
export class ToolTipDirective implements AfterViewInit, OnChanges {

  @Input('appToolTip') toolTipContent: string;
  
  tippyInstance: any

  constructor(private elementRef: ElementRef) {

   }

   ngAfterViewInit() {
    this.tippyInstance = tippy(this.elementRef.nativeElement, {
      content: this.toolTipContent
    });
   }

   ngOnChanges(changes: SimpleChanges) {

      if(changes['toolTipContent']){ //input content has changed
        this.updateTipContent();
      }
   }

   updateTipContent() {
      if(this.tippyInstance){
        this.tippyInstance.setContent(this.toolTipContent);
      }
   }

}
