import { Component, ViewChild, ElementRef, Inject } from "@angular/core";
import { Input } from "@angular/core";
import { Element } from "@angular/compiler";
import { JQ_TOKEN } from "./index";

@Component({
    selector: 'simple-modal',
    template: `
    <div id="{{elementId}}" #modalcontainer class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" 
                        data-dismiss="modal"><span>&times;</span></button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div content="modal-body" (click)="closeModal()">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    </div>
`,
    styles: [`
    .modal-body { height: 250px; overflow-y: scroll; }
`]
})
export class SimpleModalComponent {
    @Input() title: string;
    @Input() elementId: string;
    @Input() closeOnBodyClick: string;
    @ViewChild('modalcontainer') contrainerElement: ElementRef

    constructor( @Inject(JQ_TOKEN) private $: any) { }

    closeModal() {
        if (this.closeOnBodyClick.toLocaleLowerCase() === "true") {
            this.$(this.contrainerElement.nativeElement).modal('hide')
        }
    }
}