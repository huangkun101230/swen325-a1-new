import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnChanges, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
let initPositionScrollComponent = class initPositionScrollComponent {
    constructor(el) {
        this.onScroll = new EventEmitter();
        this.listenerAttached = false;
        this.element = el;
    }
    ngOnChanges(changes) {
        let initPosition = changes['initPosition'];
        if (initPosition && initPosition.currentValue !== undefined && this.scrollContent) {
            const me = this;
            setTimeout(function () {
                me.scrollContent.scrollTop = initPosition.currentValue;
            }, 0);
        }
    }
    ngAfterViewInit() {
        const scrollContent = this.scrollContent = this.element.nativeElement.querySelector('.scroll-content');
        if (this.initPosition !== undefined) {
            scrollContent.scrollTop = this.initPosition;
        }
        if (this.emitEvent && !this.listenerAttached) {
            let onScroll = this.onScroll;
            this.handler = function () {
                onScroll.emit(scrollContent.scrollTop);
            };
            this.listenerAttached = true;
            scrollContent.addEventListener('scroll', this.handler);
        }
    }
    ngOnDestroy() {
        if (this.listenerAttached) {
            this.scrollContent.removeEventListener('scroll', this.handler);
        }
    }
};
initPositionScrollComponent.ctorParameters = () => [
    { type: ElementRef }
];
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
        template: `
        <div class="scroll-content" style="height:100%">
            <ng-content></ng-content>
        </div>
    `,
        encapsulation: ViewEncapsulation.None,
        styles: [`
        .scroll-content {
            overflow-y: auto;
            overflow-x: hidden;
        }        
    `]
    })
], initPositionScrollComponent);
export { initPositionScrollComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1wb3NpdGlvbi1zY3JvbGwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb25pYzItY2FsZW5kYXIvIiwic291cmNlcyI6WyJpbml0LXBvc2l0aW9uLXNjcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsYUFBYSxFQUNiLFNBQVMsRUFDVCxhQUFhLEVBQ2IsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQWlCdkIsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFVcEMsWUFBWSxFQUFhO1FBUGYsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFLeEMscUJBQWdCLEdBQVcsS0FBSyxDQUFDO1FBR3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBcUI7UUFDN0IsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNDLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxZQUFZLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDL0UsTUFBTSxFQUFFLEdBQUUsSUFBSSxDQUFDO1lBQ2YsVUFBVSxDQUFDO2dCQUNQLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7WUFDM0QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1Q7SUFDTCxDQUFDO0lBRUQsZUFBZTtRQUNYLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdkcsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUNqQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDL0M7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHO2dCQUNYLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDN0IsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNsRTtJQUNMLENBQUM7Q0FDSixDQUFBOztZQW5Da0IsVUFBVTs7QUFUaEI7SUFBUixLQUFLLEVBQUU7aUVBQXFCO0FBQ3BCO0lBQVIsS0FBSyxFQUFFOzhEQUFtQjtBQUNqQjtJQUFULE1BQU0sRUFBRTs2REFBdUM7QUFIdkMsMkJBQTJCO0lBZnZDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsUUFBUSxFQUFFOzs7O0tBSVQ7UUFPRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFONUI7Ozs7O0tBS1I7S0FFSixDQUFDO0dBQ1csMkJBQTJCLENBNkN2QztTQTdDWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBPbkNoYW5nZXMsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnaW5pdC1wb3NpdGlvbi1zY3JvbGwnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzY3JvbGwtY29udGVudFwiIHN0eWxlPVwiaGVpZ2h0OjEwMCVcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIC5zY3JvbGwtY29udGVudCB7XG4gICAgICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgICAgICB9ICAgICAgICBcbiAgICBgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIGluaXRQb3NpdGlvblNjcm9sbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBpbml0UG9zaXRpb246bnVtYmVyO1xuICAgIEBJbnB1dCgpIGVtaXRFdmVudDpib29sZWFuO1xuICAgIEBPdXRwdXQoKSBvblNjcm9sbCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgcHJpdmF0ZSBlbGVtZW50OkVsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBzY3JvbGxDb250ZW50OkhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgaGFuZGxlcjooKT0+dm9pZDtcbiAgICBwcml2YXRlIGxpc3RlbmVyQXR0YWNoZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoZWw6RWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbDtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOlNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgbGV0IGluaXRQb3NpdGlvbiA9IGNoYW5nZXNbJ2luaXRQb3NpdGlvbiddO1xuICAgICAgICBpZiAoaW5pdFBvc2l0aW9uICYmIGluaXRQb3NpdGlvbi5jdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNjcm9sbENvbnRlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lID10aGlzO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBtZS5zY3JvbGxDb250ZW50LnNjcm9sbFRvcCA9IGluaXRQb3NpdGlvbi5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsQ29udGVudCA9IHRoaXMuc2Nyb2xsQ29udGVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtY29udGVudCcpO1xuICAgICAgICBpZiAodGhpcy5pbml0UG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2Nyb2xsQ29udGVudC5zY3JvbGxUb3AgPSB0aGlzLmluaXRQb3NpdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmVtaXRFdmVudCAmJiAhdGhpcy5saXN0ZW5lckF0dGFjaGVkKSB7XG4gICAgICAgICAgICBsZXQgb25TY3JvbGwgPSB0aGlzLm9uU2Nyb2xsO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG9uU2Nyb2xsLmVtaXQoc2Nyb2xsQ29udGVudC5zY3JvbGxUb3ApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJBdHRhY2hlZCA9IHRydWU7XG4gICAgICAgICAgICBzY3JvbGxDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJBdHRhY2hlZCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxDb250ZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=