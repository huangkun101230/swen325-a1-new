import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnChanges, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
var initPositionScrollComponent = /** @class */ (function () {
    function initPositionScrollComponent(el) {
        this.onScroll = new EventEmitter();
        this.listenerAttached = false;
        this.element = el;
    }
    initPositionScrollComponent.prototype.ngOnChanges = function (changes) {
        var initPosition = changes['initPosition'];
        if (initPosition && initPosition.currentValue !== undefined && this.scrollContent) {
            var me_1 = this;
            setTimeout(function () {
                me_1.scrollContent.scrollTop = initPosition.currentValue;
            }, 0);
        }
    };
    initPositionScrollComponent.prototype.ngAfterViewInit = function () {
        var scrollContent = this.scrollContent = this.element.nativeElement.querySelector('.scroll-content');
        if (this.initPosition !== undefined) {
            scrollContent.scrollTop = this.initPosition;
        }
        if (this.emitEvent && !this.listenerAttached) {
            var onScroll_1 = this.onScroll;
            this.handler = function () {
                onScroll_1.emit(scrollContent.scrollTop);
            };
            this.listenerAttached = true;
            scrollContent.addEventListener('scroll', this.handler);
        }
    };
    initPositionScrollComponent.prototype.ngOnDestroy = function () {
        if (this.listenerAttached) {
            this.scrollContent.removeEventListener('scroll', this.handler);
        }
    };
    initPositionScrollComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], initPositionScrollComponent.prototype, "initPosition", void 0);
    __decorate([
        Input()
    ], initPositionScrollComponent.prototype, "emitEvent", void 0);
    __decorate([
        Output()
    ], initPositionScrollComponent.prototype, "onScroll", void 0);
    initPositionScrollComponent = __decorate([
        Component({
            selector: 'init-position-scroll',
            template: "\n        <div class=\"scroll-content\" style=\"height:100%\">\n            <ng-content></ng-content>\n        </div>\n    ",
            encapsulation: ViewEncapsulation.None,
            styles: ["\n        .scroll-content {\n            overflow-y: auto;\n            overflow-x: hidden;\n        }        \n    "]
        })
    ], initPositionScrollComponent);
    return initPositionScrollComponent;
}());
export { initPositionScrollComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1wb3NpdGlvbi1zY3JvbGwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb25pYzItY2FsZW5kYXIvIiwic291cmNlcyI6WyJpbml0LXBvc2l0aW9uLXNjcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsYUFBYSxFQUNiLFNBQVMsRUFDVCxhQUFhLEVBQ2IsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQWlCdkI7SUFVSSxxQ0FBWSxFQUFhO1FBUGYsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFLeEMscUJBQWdCLEdBQVcsS0FBSyxDQUFDO1FBR3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxpREFBVyxHQUFYLFVBQVksT0FBcUI7UUFDN0IsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNDLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxZQUFZLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDL0UsSUFBTSxJQUFFLEdBQUUsSUFBSSxDQUFDO1lBQ2YsVUFBVSxDQUFDO2dCQUNQLElBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7WUFDM0QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1Q7SUFDTCxDQUFDO0lBRUQscURBQWUsR0FBZjtRQUNJLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdkcsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUNqQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDL0M7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUMsSUFBSSxVQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHO2dCQUNYLFVBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDN0IsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0lBRUQsaURBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNsRTtJQUNMLENBQUM7O2dCQWxDYyxVQUFVOztJQVRoQjtRQUFSLEtBQUssRUFBRTtxRUFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7a0VBQW1CO0lBQ2pCO1FBQVQsTUFBTSxFQUFFO2lFQUF1QztJQUh2QywyQkFBMkI7UUFmdkMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxRQUFRLEVBQUUsNkhBSVQ7WUFPRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtxQkFONUIsc0hBS1I7U0FFSixDQUFDO09BQ1csMkJBQTJCLENBNkN2QztJQUFELGtDQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7U0E3Q1ksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBFbGVtZW50UmVmLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgT25DaGFuZ2VzLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgT25EZXN0cm95LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2luaXQtcG9zaXRpb24tc2Nyb2xsJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic2Nyb2xsLWNvbnRlbnRcIiBzdHlsZT1cImhlaWdodDoxMDAlXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICAuc2Nyb2xsLWNvbnRlbnQge1xuICAgICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICAgICAgfSAgICAgICAgXG4gICAgYF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBpbml0UG9zaXRpb25TY3JvbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgaW5pdFBvc2l0aW9uOm51bWJlcjtcbiAgICBASW5wdXQoKSBlbWl0RXZlbnQ6Ym9vbGVhbjtcbiAgICBAT3V0cHV0KCkgb25TY3JvbGwgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIHByaXZhdGUgZWxlbWVudDpFbGVtZW50UmVmO1xuICAgIHByaXZhdGUgc2Nyb2xsQ29udGVudDpIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGhhbmRsZXI6KCk9PnZvaWQ7XG4gICAgcHJpdmF0ZSBsaXN0ZW5lckF0dGFjaGVkOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKGVsOkVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWw7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczpTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGxldCBpbml0UG9zaXRpb24gPSBjaGFuZ2VzWydpbml0UG9zaXRpb24nXTtcbiAgICAgICAgaWYgKGluaXRQb3NpdGlvbiAmJiBpbml0UG9zaXRpb24uY3VycmVudFZhbHVlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zY3JvbGxDb250ZW50KSB7XG4gICAgICAgICAgICBjb25zdCBtZSA9dGhpcztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbWUuc2Nyb2xsQ29udGVudC5zY3JvbGxUb3AgPSBpbml0UG9zaXRpb24uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGNvbnN0IHNjcm9sbENvbnRlbnQgPSB0aGlzLnNjcm9sbENvbnRlbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLWNvbnRlbnQnKTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdFBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjcm9sbENvbnRlbnQuc2Nyb2xsVG9wID0gdGhpcy5pbml0UG9zaXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lbWl0RXZlbnQgJiYgIXRoaXMubGlzdGVuZXJBdHRhY2hlZCkge1xuICAgICAgICAgICAgbGV0IG9uU2Nyb2xsID0gdGhpcy5vblNjcm9sbDtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBvblNjcm9sbC5lbWl0KHNjcm9sbENvbnRlbnQuc2Nyb2xsVG9wKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyQXR0YWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2Nyb2xsQ29udGVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVyQXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQ29udGVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19