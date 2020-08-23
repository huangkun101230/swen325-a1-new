import { __decorate, __param } from "tslib";
import { Component, EventEmitter, Input, Output, Inject, LOCALE_ID } from '@angular/core';
import { CalendarService } from './calendar.service';
export var Step;
(function (Step) {
    Step[Step["QuarterHour"] = 15] = "QuarterHour";
    Step[Step["HalfHour"] = 30] = "HalfHour";
    Step[Step["Hour"] = 60] = "Hour";
})(Step || (Step = {}));
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(calendarService, appLocale) {
        this.calendarService = calendarService;
        this.appLocale = appLocale;
        this.eventSource = [];
        this.calendarMode = 'month';
        this.formatDay = 'd';
        this.formatDayHeader = 'EEE';
        this.formatDayTitle = 'MMMM dd, yyyy';
        this.formatWeekTitle = 'MMMM yyyy, \'Week\' w';
        this.formatMonthTitle = 'MMMM yyyy';
        this.formatWeekViewDayHeader = 'EEE d';
        this.formatHourColumn = 'ha';
        this.showEventDetail = true;
        this.startingDayMonth = 0;
        this.startingDayWeek = 0;
        this.allDayLabel = 'all day';
        this.noEventsLabel = 'No Events';
        this.queryMode = 'local';
        this.step = Step.Hour;
        this.timeInterval = 60;
        this.autoSelect = true;
        this.dir = "";
        this.scrollToHour = 0;
        this.preserveScrollPosition = false;
        this.lockSwipeToPrev = false;
        this.lockSwipes = false;
        this.locale = "";
        this.startHour = 0;
        this.endHour = 24;
        this.onCurrentDateChanged = new EventEmitter();
        this.onRangeChanged = new EventEmitter();
        this.onEventSelected = new EventEmitter();
        this.onTimeSelected = new EventEmitter();
        this.onTitleChanged = new EventEmitter();
        this.hourParts = 1;
        this.hourSegments = 1;
        this.locale = appLocale;
    }
    Object.defineProperty(CalendarComponent.prototype, "currentDate", {
        get: function () {
            return this._currentDate;
        },
        set: function (val) {
            if (!val) {
                val = new Date();
            }
            this._currentDate = val;
            this.calendarService.setCurrentDate(val, true);
            this.onCurrentDateChanged.emit(this._currentDate);
        },
        enumerable: true,
        configurable: true
    });
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.autoSelect) {
            if (this.autoSelect.toString() === 'false') {
                this.autoSelect = false;
            }
            else {
                this.autoSelect = true;
            }
        }
        this.hourSegments = 60 / this.timeInterval;
        this.hourParts = 60 / this.step;
        if (this.hourParts <= this.hourSegments) {
            this.hourParts = 1;
        }
        else {
            this.hourParts = this.hourParts / this.hourSegments;
        }
        this.startHour = parseInt(this.startHour.toString());
        this.endHour = parseInt(this.endHour.toString());
        this.calendarService.queryMode = this.queryMode;
        this.currentDateChangedFromChildrenSubscription = this.calendarService.currentDateChangedFromChildren$.subscribe(function (currentDate) {
            _this._currentDate = currentDate;
            _this.onCurrentDateChanged.emit(currentDate);
        });
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        if (this.currentDateChangedFromChildrenSubscription) {
            this.currentDateChangedFromChildrenSubscription.unsubscribe();
            this.currentDateChangedFromChildrenSubscription = null;
        }
    };
    CalendarComponent.prototype.rangeChanged = function (range) {
        this.onRangeChanged.emit(range);
    };
    CalendarComponent.prototype.eventSelected = function (event) {
        this.onEventSelected.emit(event);
    };
    CalendarComponent.prototype.timeSelected = function (timeSelected) {
        this.onTimeSelected.emit(timeSelected);
    };
    CalendarComponent.prototype.titleChanged = function (title) {
        this.onTitleChanged.emit(title);
    };
    CalendarComponent.prototype.loadEvents = function () {
        this.calendarService.loadEvents();
    };
    CalendarComponent.prototype.slideNext = function () {
        this.calendarService.slide(1);
    };
    CalendarComponent.prototype.slidePrev = function () {
        this.calendarService.slide(-1);
    };
    CalendarComponent.prototype.update = function () {
        this.calendarService.update();
    };
    CalendarComponent.ctorParameters = function () { return [
        { type: CalendarService },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    __decorate([
        Input()
    ], CalendarComponent.prototype, "currentDate", null);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "eventSource", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "calendarMode", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "formatDay", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "formatDayHeader", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "formatDayTitle", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "formatWeekTitle", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "formatMonthTitle", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "formatWeekViewDayHeader", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "formatHourColumn", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "showEventDetail", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "startingDayMonth", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "startingDayWeek", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "allDayLabel", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "noEventsLabel", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "queryMode", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "step", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "timeInterval", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "autoSelect", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "markDisabled", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "monthviewDisplayEventTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "monthviewInactiveDisplayEventTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "monthviewEventDetailTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "weekviewHeaderTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "weekviewAllDayEventTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "weekviewNormalEventTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "dayviewAllDayEventTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "dayviewNormalEventTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "weekviewAllDayEventSectionTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "weekviewNormalEventSectionTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "dayviewAllDayEventSectionTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "dayviewNormalEventSectionTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "weekviewInactiveAllDayEventSectionTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "weekviewInactiveNormalEventSectionTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "dayviewInactiveAllDayEventSectionTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "dayviewInactiveNormalEventSectionTemplate", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "dateFormatter", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "dir", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "scrollToHour", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "preserveScrollPosition", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "lockSwipeToPrev", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "lockSwipes", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "locale", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "startHour", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "endHour", void 0);
    __decorate([
        Input()
    ], CalendarComponent.prototype, "sliderOptions", void 0);
    __decorate([
        Output()
    ], CalendarComponent.prototype, "onCurrentDateChanged", void 0);
    __decorate([
        Output()
    ], CalendarComponent.prototype, "onRangeChanged", void 0);
    __decorate([
        Output()
    ], CalendarComponent.prototype, "onEventSelected", void 0);
    __decorate([
        Output()
    ], CalendarComponent.prototype, "onTimeSelected", void 0);
    __decorate([
        Output()
    ], CalendarComponent.prototype, "onTitleChanged", void 0);
    CalendarComponent = __decorate([
        Component({
            selector: 'calendar',
            template: "\n        <ng-template #monthviewDefaultDisplayEventTemplate let-view=\"view\" let-row=\"row\" let-col=\"col\">\n            {{view.dates[row*7+col].label}}\n        </ng-template>\n        <ng-template #monthviewDefaultEventDetailTemplate let-showEventDetail=\"showEventDetail\" let-selectedDate=\"selectedDate\" let-noEventsLabel=\"noEventsLabel\">\n            <ion-list class=\"event-detail-container\" has-bouncing=\"false\" *ngIf=\"showEventDetail\" overflow-scroll=\"false\">\n                <ion-item *ngFor=\"let event of selectedDate?.events\" (click)=\"eventSelected(event)\">\n                        <span *ngIf=\"!event.allDay\" class=\"monthview-eventdetail-timecolumn\">{{event.startTime|date: 'HH:mm'}}\n                            -\n                            {{event.endTime|date: 'HH:mm'}}\n                        </span>\n                    <span *ngIf=\"event.allDay\" class=\"monthview-eventdetail-timecolumn\">{{allDayLabel}}</span>\n                    <span class=\"event-detail\">  |  {{event.title}}</span>\n                </ion-item>\n                <ion-item *ngIf=\"selectedDate?.events.length==0\">\n                    <div class=\"no-events-label\">{{noEventsLabel}}</div>\n                </ion-item>\n            </ion-list>\n        </ng-template>\n        <ng-template #defaultWeekviewHeaderTemplate let-viewDate=\"viewDate\">\n            {{ viewDate.dayHeader }}\n        </ng-template>\n        <ng-template #defaultAllDayEventTemplate let-displayEvent=\"displayEvent\">\n            <div class=\"calendar-event-inner\">{{displayEvent.event.title}}</div>\n        </ng-template>\n        <ng-template #defaultNormalEventTemplate let-displayEvent=\"displayEvent\">\n            <div class=\"calendar-event-inner\">{{displayEvent.event.title}}</div>\n        </ng-template>\n        <ng-template #defaultWeekViewAllDayEventSectionTemplate let-day=\"day\" let-eventTemplate=\"eventTemplate\">\n            <div [ngClass]=\"{'calendar-event-wrap': day.events}\" *ngIf=\"day.events\"\n                 [ngStyle]=\"{height: 25*day.events.length+'px'}\">\n                <div *ngFor=\"let displayEvent of day.events\" class=\"calendar-event\" tappable\n                     (click)=\"eventSelected(displayEvent.event)\"\n                     [ngStyle]=\"{top: 25*displayEvent.position+'px', width: 100*(displayEvent.endIndex-displayEvent.startIndex)+'%', height: '25px'}\">\n                    <ng-template [ngTemplateOutlet]=\"eventTemplate\"\n                                 [ngTemplateOutletContext]=\"{displayEvent:displayEvent}\">\n                    </ng-template>\n                </div>\n            </div>\n        </ng-template>\n        <ng-template #defaultDayViewAllDayEventSectionTemplate let-allDayEvents=\"allDayEvents\" let-eventTemplate=\"eventTemplate\">\n            <div *ngFor=\"let displayEvent of allDayEvents; let eventIndex=index\"\n                 class=\"calendar-event\" tappable\n                 (click)=\"eventSelected(displayEvent.event)\"\n                 [ngStyle]=\"{top: 25*eventIndex+'px',width: '100%',height:'25px'}\">\n                <ng-template [ngTemplateOutlet]=\"eventTemplate\"\n                             [ngTemplateOutletContext]=\"{displayEvent:displayEvent}\">\n                </ng-template>\n            </div>\n        </ng-template>\n        <ng-template #defaultNormalEventSectionTemplate let-tm=\"tm\" let-hourParts=\"hourParts\" let-eventTemplate=\"eventTemplate\">\n            <div [ngClass]=\"{'calendar-event-wrap': tm.events}\" *ngIf=\"tm.events\">\n                <div *ngFor=\"let displayEvent of tm.events\" class=\"calendar-event\" tappable\n                     (click)=\"eventSelected(displayEvent.event)\"\n                     [ngStyle]=\"{top: (37*displayEvent.startOffset/hourParts)+'px',left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}\">\n                    <ng-template [ngTemplateOutlet]=\"eventTemplate\"\n                                 [ngTemplateOutletContext]=\"{displayEvent:displayEvent}\">\n                    </ng-template>\n                </div>\n            </div>\n        </ng-template>\n        <ng-template #defaultInactiveAllDayEventSectionTemplate>\n        </ng-template>\n        <ng-template #defaultInactiveNormalEventSectionTemplate>\n        </ng-template>\n\n        <div [ngSwitch]=\"calendarMode\" class=\"{{calendarMode}}view-container\">\n            <monthview *ngSwitchCase=\"'month'\"\n                [formatDay]=\"formatDay\"\n                [formatDayHeader]=\"formatDayHeader\"\n                [formatMonthTitle]=\"formatMonthTitle\"\n                [startingDayMonth]=\"startingDayMonth\"\n                [showEventDetail]=\"showEventDetail\"\n                [noEventsLabel]=\"noEventsLabel\"\n                [autoSelect]=\"autoSelect\"\n                [eventSource]=\"eventSource\"\n                [markDisabled]=\"markDisabled\"\n                [monthviewDisplayEventTemplate]=\"monthviewDisplayEventTemplate||monthviewDefaultDisplayEventTemplate\"\n                [monthviewInactiveDisplayEventTemplate]=\"monthviewInactiveDisplayEventTemplate||monthviewDefaultDisplayEventTemplate\"\n                [monthviewEventDetailTemplate]=\"monthviewEventDetailTemplate||monthviewDefaultEventDetailTemplate\"\n                [locale]=\"locale\"\n                [dateFormatter]=\"dateFormatter\"\n                [dir]=\"dir\"\n                [lockSwipeToPrev]=\"lockSwipeToPrev\"\n                [lockSwipes]=\"lockSwipes\"\n                [sliderOptions]=\"sliderOptions\"\n                (onRangeChanged)=\"rangeChanged($event)\"\n                (onEventSelected)=\"eventSelected($event)\"\n                (onTimeSelected)=\"timeSelected($event)\"\n                (onTitleChanged)=\"titleChanged($event)\">\n            </monthview>\n            <weekview *ngSwitchCase=\"'week'\"\n                [formatWeekTitle]=\"formatWeekTitle\"\n                [formatWeekViewDayHeader]=\"formatWeekViewDayHeader\"\n                [formatHourColumn]=\"formatHourColumn\"\n                [startingDayWeek]=\"startingDayWeek\"\n                [allDayLabel]=\"allDayLabel\"\n                [hourParts]=\"hourParts\"\n                [autoSelect]=\"autoSelect\"\n                [hourSegments]=\"hourSegments\"\n                [eventSource]=\"eventSource\"\n                [markDisabled]=\"markDisabled\"\n                [weekviewHeaderTemplate]=\"weekviewHeaderTemplate||defaultWeekviewHeaderTemplate\"\n                [weekviewAllDayEventTemplate]=\"weekviewAllDayEventTemplate||defaultAllDayEventTemplate\"\n                [weekviewNormalEventTemplate]=\"weekviewNormalEventTemplate||defaultNormalEventTemplate\"\n                [weekviewAllDayEventSectionTemplate]=\"weekviewAllDayEventSectionTemplate||defaultWeekViewAllDayEventSectionTemplate\"\n                [weekviewNormalEventSectionTemplate]=\"weekviewNormalEventSectionTemplate||defaultNormalEventSectionTemplate\"\n                [weekviewInactiveAllDayEventSectionTemplate]=\"weekviewInactiveAllDayEventSectionTemplate||defaultInactiveAllDayEventSectionTemplate\"\n                [weekviewInactiveNormalEventSectionTemplate]=\"weekviewInactiveNormalEventSectionTemplate||defaultInactiveNormalEventSectionTemplate\"\n                [locale]=\"locale\"\n                [dateFormatter]=\"dateFormatter\"\n                [dir]=\"dir\"\n                [scrollToHour]=\"scrollToHour\"\n                [preserveScrollPosition]=\"preserveScrollPosition\"\n                [lockSwipeToPrev]=\"lockSwipeToPrev\"\n                [lockSwipes]=\"lockSwipes\"\n                [startHour]=\"startHour\"\n                [endHour]=\"endHour\"\n                [sliderOptions]=\"sliderOptions\"\n                (onRangeChanged)=\"rangeChanged($event)\"\n                (onEventSelected)=\"eventSelected($event)\"\n                (onTimeSelected)=\"timeSelected($event)\"\n                (onTitleChanged)=\"titleChanged($event)\">\n            </weekview>\n            <dayview *ngSwitchCase=\"'day'\"\n                [formatDayTitle]=\"formatDayTitle\"\n                [formatHourColumn]=\"formatHourColumn\"\n                [allDayLabel]=\"allDayLabel\"\n                [hourParts]=\"hourParts\"\n                [hourSegments]=\"hourSegments\"\n                [eventSource]=\"eventSource\"\n                [markDisabled]=\"markDisabled\"\n                [dayviewAllDayEventTemplate]=\"dayviewAllDayEventTemplate||defaultAllDayEventTemplate\"\n                [dayviewNormalEventTemplate]=\"dayviewNormalEventTemplate||defaultNormalEventTemplate\"\n                [dayviewAllDayEventSectionTemplate]=\"dayviewAllDayEventSectionTemplate||defaultDayViewAllDayEventSectionTemplate\"\n                [dayviewNormalEventSectionTemplate]=\"dayviewNormalEventSectionTemplate||defaultNormalEventSectionTemplate\"\n                [dayviewInactiveAllDayEventSectionTemplate]=\"dayviewInactiveAllDayEventSectionTemplate||defaultInactiveAllDayEventSectionTemplate\"\n                [dayviewInactiveNormalEventSectionTemplate]=\"dayviewInactiveNormalEventSectionTemplate||defaultInactiveNormalEventSectionTemplate\"\n                [locale]=\"locale\"\n                [dateFormatter]=\"dateFormatter\"\n                [dir]=\"dir\"\n                [scrollToHour]=\"scrollToHour\"\n                [preserveScrollPosition]=\"preserveScrollPosition\"\n                [lockSwipeToPrev]=\"lockSwipeToPrev\"\n                [lockSwipes]=\"lockSwipes\"\n                [startHour]=\"startHour\"\n                [endHour]=\"endHour\"\n                [sliderOptions]=\"sliderOptions\"\n                (onRangeChanged)=\"rangeChanged($event)\"\n                (onEventSelected)=\"eventSelected($event)\"\n                (onTimeSelected)=\"timeSelected($event)\"\n                (onTitleChanged)=\"titleChanged($event)\">\n            </dayview>\n        </div>\n    ",
            providers: [CalendarService],
            styles: ["\n        :host > div { height: 100%; }\n\n        .event-detail-container {\n          border-top: 2px darkgrey solid;\n        }\n\n        .no-events-label {\n          font-weight: bold;\n          color: darkgrey;\n          text-align: center;\n        }\n\n        .event-detail {\n          cursor: pointer;\n          white-space: nowrap;\n          text-overflow: ellipsis;\n        }\n\n        .monthview-eventdetail-timecolumn {\n          width: 110px;\n          overflow: hidden;\n        }\n\n        .calendar-event-inner {\n          overflow: hidden;\n          background-color: #3a87ad;\n          color: white;\n          height: 100%;\n          width: 100%;\n          padding: 2px;\n          line-height: 15px;\n          text-align: initial;\n        }\n\n        @media (max-width: 750px) {\n          .calendar-event-inner {\n            font-size: 12px;\n          }\n        }\n    "]
        }),
        __param(1, Inject(LOCALE_ID))
    ], CalendarComponent);
    return CalendarComponent;
}());
export { CalendarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb25pYzItY2FsZW5kYXIvIiwic291cmNlcyI6WyJjYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBZSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRy9HLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWlKckQsTUFBTSxDQUFOLElBQVksSUFJWDtBQUpELFdBQVksSUFBSTtJQUNaLDhDQUFnQixDQUFBO0lBQ2hCLHdDQUFhLENBQUE7SUFDYixnQ0FBUyxDQUFBO0FBQ2IsQ0FBQyxFQUpXLElBQUksS0FBSixJQUFJLFFBSWY7QUEwTUQ7SUF5RUksMkJBQW9CLGVBQStCLEVBQTZCLFNBQWdCO1FBQTVFLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUE2QixjQUFTLEdBQVQsU0FBUyxDQUFPO1FBekR2RixnQkFBVyxHQUFZLEVBQUUsQ0FBQztRQUMxQixpQkFBWSxHQUFnQixPQUFPLENBQUM7UUFDcEMsY0FBUyxHQUFVLEdBQUcsQ0FBQztRQUN2QixvQkFBZSxHQUFVLEtBQUssQ0FBQztRQUMvQixtQkFBYyxHQUFVLGVBQWUsQ0FBQztRQUN4QyxvQkFBZSxHQUFVLHVCQUF1QixDQUFDO1FBQ2pELHFCQUFnQixHQUFVLFdBQVcsQ0FBQztRQUN0Qyw0QkFBdUIsR0FBVSxPQUFPLENBQUM7UUFDekMscUJBQWdCLEdBQVUsSUFBSSxDQUFDO1FBQy9CLG9CQUFlLEdBQVcsSUFBSSxDQUFDO1FBQy9CLHFCQUFnQixHQUFVLENBQUMsQ0FBQztRQUM1QixvQkFBZSxHQUFVLENBQUMsQ0FBQztRQUMzQixnQkFBVyxHQUFVLFNBQVMsQ0FBQztRQUMvQixrQkFBYSxHQUFVLFdBQVcsQ0FBQztRQUNuQyxjQUFTLEdBQWEsT0FBTyxDQUFDO1FBQzlCLFNBQUksR0FBUSxJ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O0lBQ2pHO1FBQVIsS0FBSyxFQUFFO3dGQUFrRztJQUNqRztRQUFSLEtBQUssRUFBRTs0REFBOEI7SUFDN0I7UUFBUixLQUFLLEVBQUU7a0RBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFOzJEQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTtxRUFBd0M7SUFDdkM7UUFBUixLQUFLLEVBQUU7OERBQWlDO0lBQ2hDO1FBQVIsS0FBSyxFQUFFO3lEQUE0QjtJQUMzQjtRQUFSLEtBQUssRUFBRTtxREFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7d0RBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO3NEQUFxQjtJQUNwQjtRQUFSLEtBQUssRUFBRTs0REFBbUI7SUFFakI7UUFBVCxNQUFNLEVBQUU7bUVBQWlEO0lBQ2hEO1FBQVQsTUFBTSxFQUFFOzZEQUE2QztJQUM1QztRQUFULE1BQU0sRUFBRTs4REFBOEM7SUFDN0M7UUFBVCxNQUFNLEVBQUU7NkRBQW9EO0lBQ25EO1FBQVQsTUFBTSxFQUFFOzZEQUE2QztJQWxFN0MsaUJBQWlCO1FBeE03QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsdzNUQTBKVDtZQTBDRCxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7cUJBekNuQixvNUJBd0NSO1NBRUosQ0FBQztRQTBFd0QsV0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7T0F6RTlELGlCQUFpQixDQTRJN0I7SUFBRCx3QkFBQztDQUFBLEFBNUlELElBNElDO1NBNUlZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBJbmplY3QsIExPQ0FMRV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENhbGVuZGFyU2VydmljZSB9IGZyb20gJy4vY2FsZW5kYXIuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50IHtcbiAgICBhbGxEYXk6IGJvb2xlYW47XG4gICAgZW5kVGltZTogRGF0ZTtcbiAgICBzdGFydFRpbWU6IERhdGU7XG4gICAgdGl0bGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmFuZ2Uge1xuICAgIHN0YXJ0VGltZTogRGF0ZTtcbiAgICBlbmRUaW1lOiBEYXRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElWaWV3IHtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGF5VmlldyBleHRlbmRzIElWaWV3IHtcbiAgICBhbGxEYXlFdmVudHM6IElEaXNwbGF5QWxsRGF5RXZlbnRbXTtcbiAgICByb3dzOiBJRGF5Vmlld1Jvd1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEYXlWaWV3Um93IHtcbiAgICBldmVudHM6IElEaXNwbGF5RXZlbnRbXTtcbiAgICB0aW1lOiBEYXRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElNb250aFZpZXcgZXh0ZW5kcyBJVmlldyB7XG4gICAgZGF0ZXM6IElNb250aFZpZXdSb3dbXTtcbiAgICBkYXlIZWFkZXJzOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTW9udGhWaWV3Um93IHtcbiAgICBjdXJyZW50PzogYm9vbGVhbjtcbiAgICBkYXRlOiBEYXRlO1xuICAgIGV2ZW50czogSUV2ZW50W107XG4gICAgaGFzRXZlbnQ/OiBib29sZWFuO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgc2Vjb25kYXJ5OiBib29sZWFuO1xuICAgIHNlbGVjdGVkPzogYm9vbGVhbjtcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJV2Vla1ZpZXcgZXh0ZW5kcyBJVmlldyB7XG4gICAgZGF0ZXM6IElXZWVrVmlld0RhdGVSb3dbXTtcbiAgICByb3dzOiBJV2Vla1ZpZXdSb3dbXVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElXZWVrVmlld0RhdGVSb3cge1xuICAgIGN1cnJlbnQ/OiBib29sZWFuO1xuICAgIGRhdGU6IERhdGU7XG4gICAgZXZlbnRzOiBJRGlzcGxheUV2ZW50W107XG4gICAgaGFzRXZlbnQ/OiBib29sZWFuO1xuICAgIHNlbGVjdGVkPzogYm9vbGVhbjtcbiAgICBkYXlIZWFkZXI6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJV2Vla1ZpZXdSb3cge1xuICAgIGV2ZW50czogSURpc3BsYXlFdmVudFtdO1xuICAgIHRpbWU6IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURpc3BsYXlFdmVudCB7XG4gICAgZW5kSW5kZXg6IG51bWJlcjtcbiAgICBlbmRPZmZzZXQ/OiBudW1iZXI7XG4gICAgZXZlbnQ6IElFdmVudDtcbiAgICBzdGFydEluZGV4OiBudW1iZXI7XG4gICAgc3RhcnRPZmZzZXQ/OiBudW1iZXI7XG4gICAgb3ZlcmxhcE51bWJlcj86IG51bWJlcjtcbiAgICBwb3NpdGlvbj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGlzcGxheVdlZWtWaWV3SGVhZGVyIHtcbiAgICB2aWV3RGF0ZTogSVdlZWtWaWV3RGF0ZVJvdztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGlzcGxheUFsbERheUV2ZW50IHtcbiAgICBldmVudDogSUV2ZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDYWxlbmRhckNvbXBvbmVudCB7XG4gICAgY3VycmVudFZpZXdJbmRleDogbnVtYmVyO1xuICAgIGRpcmVjdGlvbjogbnVtYmVyO1xuICAgIGV2ZW50U291cmNlOiBJRXZlbnRbXTtcbiAgICBnZXRSYW5nZTogeyAoZGF0ZTpEYXRlKTogSVJhbmdlOyB9O1xuICAgIGdldFZpZXdEYXRhOiB7IChkYXRlOkRhdGUpOiBJVmlldyB9O1xuICAgIG1vZGU6IENhbGVuZGFyTW9kZTtcbiAgICByYW5nZTogSVJhbmdlO1xuICAgIHZpZXdzOiBJVmlld1tdO1xuICAgIG9uRGF0YUxvYWRlZDogeyAoKTogdm9pZCB9O1xuICAgIG9uUmFuZ2VDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8SVJhbmdlPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVGltZVNlbGVjdGVkIHtcbiAgICBldmVudHM6IElFdmVudFtdO1xuICAgIHNlbGVjdGVkVGltZTogRGF0ZTtcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTW9udGhWaWV3RGlzcGxheUV2ZW50VGVtcGxhdGVDb250ZXh0IHtcbiAgICB2aWV3OiBJVmlldztcbiAgICByb3c6IG51bWJlcjtcbiAgICBjb2w6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTW9udGhWaWV3RXZlbnREZXRhaWxUZW1wbGF0ZUNvbnRleHQge1xuICAgIHNlbGVjdGVkRGF0ZTogSVRpbWVTZWxlY3RlZDtcbiAgICBub0V2ZW50c0xhYmVsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVdlZWtWaWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVDb250ZXh0IHtcbiAgICBkYXk6IElXZWVrVmlld0RhdGVSb3csXG4gICAgZXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SURpc3BsYXlBbGxEYXlFdmVudD5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJV2Vla1ZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZUNvbnRleHQge1xuICAgIHRtOiBJV2Vla1ZpZXdSb3csXG4gICAgZXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SURpc3BsYXlFdmVudD5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGF5Vmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlQ29udGV4dCB7XG4gICAgYWxsZGF5RXZlbnRzOiBJRGlzcGxheUFsbERheUV2ZW50W10sXG4gICAgZXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SURpc3BsYXlBbGxEYXlFdmVudD5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGF5Vmlld05vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlQ29udGV4dCB7XG4gICAgdG06IElEYXlWaWV3Um93LFxuICAgIGV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPElEaXNwbGF5RXZlbnQ+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVGb3JtYXR0ZXIge1xuICAgIGZvcm1hdE1vbnRoVmlld0RheT86IHsgKGRhdGU6RGF0ZSk6IHN0cmluZzsgfTtcbiAgICBmb3JtYXRNb250aFZpZXdEYXlIZWFkZXI/OiB7IChkYXRlOkRhdGUpOiBzdHJpbmc7IH07XG4gICAgZm9ybWF0TW9udGhWaWV3VGl0bGU/OiB7IChkYXRlOkRhdGUpOiBzdHJpbmc7IH07XG4gICAgZm9ybWF0V2Vla1ZpZXdEYXlIZWFkZXI/OiB7IChkYXRlOkRhdGUpOiBzdHJpbmc7IH07XG4gICAgZm9ybWF0V2Vla1ZpZXdUaXRsZT86IHsgKGRhdGU6RGF0ZSk6IHN0cmluZzsgfTtcbiAgICBmb3JtYXRXZWVrVmlld0hvdXJDb2x1bW4/OiB7IChkYXRlOkRhdGUpOiBzdHJpbmc7IH07XG4gICAgZm9ybWF0RGF5Vmlld1RpdGxlPzogeyAoZGF0ZTpEYXRlKTogc3RyaW5nOyB9O1xuICAgIGZvcm1hdERheVZpZXdIb3VyQ29sdW1uPzogeyAoZGF0ZTpEYXRlKTogc3RyaW5nOyB9O1xufVxuXG5leHBvcnQgdHlwZSBDYWxlbmRhck1vZGUgPSAnZGF5JyB8ICdtb250aCcgfCAnd2Vlayc7XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5TW9kZSA9ICdsb2NhbCcgfCAncmVtb3RlJztcblxuZXhwb3J0IGVudW0gU3RlcCB7XG4gICAgUXVhcnRlckhvdXIgPSAxNSxcbiAgICBIYWxmSG91ciA9IDMwLFxuICAgIEhvdXIgPSA2MFxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NhbGVuZGFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctdGVtcGxhdGUgI21vbnRodmlld0RlZmF1bHREaXNwbGF5RXZlbnRUZW1wbGF0ZSBsZXQtdmlldz1cInZpZXdcIiBsZXQtcm93PVwicm93XCIgbGV0LWNvbD1cImNvbFwiPlxuICAgICAgICAgICAge3t2aWV3LmRhdGVzW3Jvdyo3K2NvbF0ubGFiZWx9fVxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgI21vbnRodmlld0RlZmF1bHRFdmVudERldGFpbFRlbXBsYXRlIGxldC1zaG93RXZlbnREZXRhaWw9XCJzaG93RXZlbnREZXRhaWxcIiBsZXQtc2VsZWN0ZWREYXRlPVwic2VsZWN0ZWREYXRlXCIgbGV0LW5vRXZlbnRzTGFiZWw9XCJub0V2ZW50c0xhYmVsXCI+XG4gICAgICAgICAgICA8aW9uLWxpc3QgY2xhc3M9XCJldmVudC1kZXRhaWwtY29udGFpbmVyXCIgaGFzLWJvdW5jaW5nPVwiZmFsc2VcIiAqbmdJZj1cInNob3dFdmVudERldGFpbFwiIG92ZXJmbG93LXNjcm9sbD1cImZhbHNlXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1pdGVtICpuZ0Zvcj1cImxldCBldmVudCBvZiBzZWxlY3RlZERhdGU/LmV2ZW50c1wiIChjbGljayk9XCJldmVudFNlbGVjdGVkKGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZXZlbnQuYWxsRGF5XCIgY2xhc3M9XCJtb250aHZpZXctZXZlbnRkZXRhaWwtdGltZWNvbHVtblwiPnt7ZXZlbnQuc3RhcnRUaW1lfGRhdGU6ICdISDptbSd9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2V2ZW50LmVuZFRpbWV8ZGF0ZTogJ0hIOm1tJ319XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiZXZlbnQuYWxsRGF5XCIgY2xhc3M9XCJtb250aHZpZXctZXZlbnRkZXRhaWwtdGltZWNvbHVtblwiPnt7YWxsRGF5TGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJldmVudC1kZXRhaWxcIj4gIHwgIHt7ZXZlbnQudGl0bGV9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2lvbi1pdGVtPlxuICAgICAgICAgICAgICAgIDxpb24taXRlbSAqbmdJZj1cInNlbGVjdGVkRGF0ZT8uZXZlbnRzLmxlbmd0aD09MFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm8tZXZlbnRzLWxhYmVsXCI+e3tub0V2ZW50c0xhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2lvbi1pdGVtPlxuICAgICAgICAgICAgPC9pb24tbGlzdD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0V2Vla3ZpZXdIZWFkZXJUZW1wbGF0ZSBsZXQtdmlld0RhdGU9XCJ2aWV3RGF0ZVwiPlxuICAgICAgICAgICAge3sgdmlld0RhdGUuZGF5SGVhZGVyIH19XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEFsbERheUV2ZW50VGVtcGxhdGUgbGV0LWRpc3BsYXlFdmVudD1cImRpc3BsYXlFdmVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWV2ZW50LWlubmVyXCI+e3tkaXNwbGF5RXZlbnQuZXZlbnQudGl0bGV9fTwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHROb3JtYWxFdmVudFRlbXBsYXRlIGxldC1kaXNwbGF5RXZlbnQ9XCJkaXNwbGF5RXZlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1ldmVudC1pbm5lclwiPnt7ZGlzcGxheUV2ZW50LmV2ZW50LnRpdGxlfX08L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0V2Vla1ZpZXdBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZSBsZXQtZGF5PVwiZGF5XCIgbGV0LWV2ZW50VGVtcGxhdGU9XCJldmVudFRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsnY2FsZW5kYXItZXZlbnQtd3JhcCc6IGRheS5ldmVudHN9XCIgKm5nSWY9XCJkYXkuZXZlbnRzXCJcbiAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwie2hlaWdodDogMjUqZGF5LmV2ZW50cy5sZW5ndGgrJ3B4J31cIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBkaXNwbGF5RXZlbnQgb2YgZGF5LmV2ZW50c1wiIGNsYXNzPVwiY2FsZW5kYXItZXZlbnRcIiB0YXBwYWJsZVxuICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImV2ZW50U2VsZWN0ZWQoZGlzcGxheUV2ZW50LmV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7dG9wOiAyNSpkaXNwbGF5RXZlbnQucG9zaXRpb24rJ3B4Jywgd2lkdGg6IDEwMCooZGlzcGxheUV2ZW50LmVuZEluZGV4LWRpc3BsYXlFdmVudC5zdGFydEluZGV4KSsnJScsIGhlaWdodDogJzI1cHgnfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Rpc3BsYXlFdmVudDpkaXNwbGF5RXZlbnR9XCI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0RGF5Vmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlIGxldC1hbGxEYXlFdmVudHM9XCJhbGxEYXlFdmVudHNcIiBsZXQtZXZlbnRUZW1wbGF0ZT1cImV2ZW50VGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRpc3BsYXlFdmVudCBvZiBhbGxEYXlFdmVudHM7IGxldCBldmVudEluZGV4PWluZGV4XCJcbiAgICAgICAgICAgICAgICAgY2xhc3M9XCJjYWxlbmRhci1ldmVudFwiIHRhcHBhYmxlXG4gICAgICAgICAgICAgICAgIChjbGljayk9XCJldmVudFNlbGVjdGVkKGRpc3BsYXlFdmVudC5ldmVudClcIlxuICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7dG9wOiAyNSpldmVudEluZGV4KydweCcsd2lkdGg6ICcxMDAlJyxoZWlnaHQ6JzI1cHgnfVwiPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJldmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkaXNwbGF5RXZlbnQ6ZGlzcGxheUV2ZW50fVwiPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGUgbGV0LXRtPVwidG1cIiBsZXQtaG91clBhcnRzPVwiaG91clBhcnRzXCIgbGV0LWV2ZW50VGVtcGxhdGU9XCJldmVudFRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsnY2FsZW5kYXItZXZlbnQtd3JhcCc6IHRtLmV2ZW50c31cIiAqbmdJZj1cInRtLmV2ZW50c1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRpc3BsYXlFdmVudCBvZiB0bS5ldmVudHNcIiBjbGFzcz1cImNhbGVuZGFyLWV2ZW50XCIgdGFwcGFibGVcbiAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJldmVudFNlbGVjdGVkKGRpc3BsYXlFdmVudC5ldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwie3RvcDogKDM3KmRpc3BsYXlFdmVudC5zdGFydE9mZnNldC9ob3VyUGFydHMpKydweCcsbGVmdDogMTAwL2Rpc3BsYXlFdmVudC5vdmVybGFwTnVtYmVyKmRpc3BsYXlFdmVudC5wb3NpdGlvbisnJScsIHdpZHRoOiAxMDAvZGlzcGxheUV2ZW50Lm92ZXJsYXBOdW1iZXIrJyUnLCBoZWlnaHQ6IDM3KihkaXNwbGF5RXZlbnQuZW5kSW5kZXggLWRpc3BsYXlFdmVudC5zdGFydEluZGV4IC0gKGRpc3BsYXlFdmVudC5lbmRPZmZzZXQgKyBkaXNwbGF5RXZlbnQuc3RhcnRPZmZzZXQpL2hvdXJQYXJ0cykrJ3B4J31cIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkaXNwbGF5RXZlbnQ6ZGlzcGxheUV2ZW50fVwiPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEluYWN0aXZlQWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGU+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEluYWN0aXZlTm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGU+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwiY2FsZW5kYXJNb2RlXCIgY2xhc3M9XCJ7e2NhbGVuZGFyTW9kZX19dmlldy1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxtb250aHZpZXcgKm5nU3dpdGNoQ2FzZT1cIidtb250aCdcIlxuICAgICAgICAgICAgICAgIFtmb3JtYXREYXldPVwiZm9ybWF0RGF5XCJcbiAgICAgICAgICAgICAgICBbZm9ybWF0RGF5SGVhZGVyXT1cImZvcm1hdERheUhlYWRlclwiXG4gICAgICAgICAgICAgICAgW2Zvcm1hdE1vbnRoVGl0bGVdPVwiZm9ybWF0TW9udGhUaXRsZVwiXG4gICAgICAgICAgICAgICAgW3N0YXJ0aW5nRGF5TW9udGhdPVwic3RhcnRpbmdEYXlNb250aFwiXG4gICAgICAgICAgICAgICAgW3Nob3dFdmVudERldGFpbF09XCJzaG93RXZlbnREZXRhaWxcIlxuICAgICAgICAgICAgICAgIFtub0V2ZW50c0xhYmVsXT1cIm5vRXZlbnRzTGFiZWxcIlxuICAgICAgICAgICAgICAgIFthdXRvU2VsZWN0XT1cImF1dG9TZWxlY3RcIlxuICAgICAgICAgICAgICAgIFtldmVudFNvdXJjZV09XCJldmVudFNvdXJjZVwiXG4gICAgICAgICAgICAgICAgW21hcmtEaXNhYmxlZF09XCJtYXJrRGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIFttb250aHZpZXdEaXNwbGF5RXZlbnRUZW1wbGF0ZV09XCJtb250aHZpZXdEaXNwbGF5RXZlbnRUZW1wbGF0ZXx8bW9udGh2aWV3RGVmYXVsdERpc3BsYXlFdmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbW9udGh2aWV3SW5hY3RpdmVEaXNwbGF5RXZlbnRUZW1wbGF0ZV09XCJtb250aHZpZXdJbmFjdGl2ZURpc3BsYXlFdmVudFRlbXBsYXRlfHxtb250aHZpZXdEZWZhdWx0RGlzcGxheUV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFttb250aHZpZXdFdmVudERldGFpbFRlbXBsYXRlXT1cIm1vbnRodmlld0V2ZW50RGV0YWlsVGVtcGxhdGV8fG1vbnRodmlld0RlZmF1bHRFdmVudERldGFpbFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgICAgW2RhdGVGb3JtYXR0ZXJdPVwiZGF0ZUZvcm1hdHRlclwiXG4gICAgICAgICAgICAgICAgW2Rpcl09XCJkaXJcIlxuICAgICAgICAgICAgICAgIFtsb2NrU3dpcGVUb1ByZXZdPVwibG9ja1N3aXBlVG9QcmV2XCJcbiAgICAgICAgICAgICAgICBbbG9ja1N3aXBlc109XCJsb2NrU3dpcGVzXCJcbiAgICAgICAgICAgICAgICBbc2xpZGVyT3B0aW9uc109XCJzbGlkZXJPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAob25SYW5nZUNoYW5nZWQpPVwicmFuZ2VDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChvbkV2ZW50U2VsZWN0ZWQpPVwiZXZlbnRTZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAob25UaW1lU2VsZWN0ZWQpPVwidGltZVNlbGVjdGVkKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChvblRpdGxlQ2hhbmdlZCk9XCJ0aXRsZUNoYW5nZWQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPC9tb250aHZpZXc+XG4gICAgICAgICAgICA8d2Vla3ZpZXcgKm5nU3dpdGNoQ2FzZT1cIid3ZWVrJ1wiXG4gICAgICAgICAgICAgICAgW2Zvcm1hdFdlZWtUaXRsZV09XCJmb3JtYXRXZWVrVGl0bGVcIlxuICAgICAgICAgICAgICAgIFtmb3JtYXRXZWVrVmlld0RheUhlYWRlcl09XCJmb3JtYXRXZWVrVmlld0RheUhlYWRlclwiXG4gICAgICAgICAgICAgICAgW2Zvcm1hdEhvdXJDb2x1bW5dPVwiZm9ybWF0SG91ckNvbHVtblwiXG4gICAgICAgICAgICAgICAgW3N0YXJ0aW5nRGF5V2Vla109XCJzdGFydGluZ0RheVdlZWtcIlxuICAgICAgICAgICAgICAgIFthbGxEYXlMYWJlbF09XCJhbGxEYXlMYWJlbFwiXG4gICAgICAgICAgICAgICAgW2hvdXJQYXJ0c109XCJob3VyUGFydHNcIlxuICAgICAgICAgICAgICAgIFthdXRvU2VsZWN0XT1cImF1dG9TZWxlY3RcIlxuICAgICAgICAgICAgICAgIFtob3VyU2VnbWVudHNdPVwiaG91clNlZ21lbnRzXCJcbiAgICAgICAgICAgICAgICBbZXZlbnRTb3VyY2VdPVwiZXZlbnRTb3VyY2VcIlxuICAgICAgICAgICAgICAgIFttYXJrRGlzYWJsZWRdPVwibWFya0Rpc2FibGVkXCJcbiAgICAgICAgICAgICAgICBbd2Vla3ZpZXdIZWFkZXJUZW1wbGF0ZV09XCJ3ZWVrdmlld0hlYWRlclRlbXBsYXRlfHxkZWZhdWx0V2Vla3ZpZXdIZWFkZXJUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW3dlZWt2aWV3QWxsRGF5RXZlbnRUZW1wbGF0ZV09XCJ3ZWVrdmlld0FsbERheUV2ZW50VGVtcGxhdGV8fGRlZmF1bHRBbGxEYXlFdmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbd2Vla3ZpZXdOb3JtYWxFdmVudFRlbXBsYXRlXT1cIndlZWt2aWV3Tm9ybWFsRXZlbnRUZW1wbGF0ZXx8ZGVmYXVsdE5vcm1hbEV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFt3ZWVrdmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlXT1cIndlZWt2aWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGV8fGRlZmF1bHRXZWVrVmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbd2Vla3ZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZV09XCJ3ZWVrdmlld05vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlfHxkZWZhdWx0Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFt3ZWVrdmlld0luYWN0aXZlQWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVdPVwid2Vla3ZpZXdJbmFjdGl2ZUFsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlfHxkZWZhdWx0SW5hY3RpdmVBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW3dlZWt2aWV3SW5hY3RpdmVOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZV09XCJ3ZWVrdmlld0luYWN0aXZlTm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGV8fGRlZmF1bHRJbmFjdGl2ZU5vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgICAgW2RhdGVGb3JtYXR0ZXJdPVwiZGF0ZUZvcm1hdHRlclwiXG4gICAgICAgICAgICAgICAgW2Rpcl09XCJkaXJcIlxuICAgICAgICAgICAgICAgIFtzY3JvbGxUb0hvdXJdPVwic2Nyb2xsVG9Ib3VyXCJcbiAgICAgICAgICAgICAgICBbcHJlc2VydmVTY3JvbGxQb3NpdGlvbl09XCJwcmVzZXJ2ZVNjcm9sbFBvc2l0aW9uXCJcbiAgICAgICAgICAgICAgICBbbG9ja1N3aXBlVG9QcmV2XT1cImxvY2tTd2lwZVRvUHJldlwiXG4gICAgICAgICAgICAgICAgW2xvY2tTd2lwZXNdPVwibG9ja1N3aXBlc1wiXG4gICAgICAgICAgICAgICAgW3N0YXJ0SG91cl09XCJzdGFydEhvdXJcIlxuICAgICAgICAgICAgICAgIFtlbmRIb3VyXT1cImVuZEhvdXJcIlxuICAgICAgICAgICAgICAgIFtzbGlkZXJPcHRpb25zXT1cInNsaWRlck9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIChvblJhbmdlQ2hhbmdlZCk9XCJyYW5nZUNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG9uRXZlbnRTZWxlY3RlZCk9XCJldmVudFNlbGVjdGVkKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChvblRpbWVTZWxlY3RlZCk9XCJ0aW1lU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG9uVGl0bGVDaGFuZ2VkKT1cInRpdGxlQ2hhbmdlZCgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8L3dlZWt2aWV3PlxuICAgICAgICAgICAgPGRheXZpZXcgKm5nU3dpdGNoQ2FzZT1cIidkYXknXCJcbiAgICAgICAgICAgICAgICBbZm9ybWF0RGF5VGl0bGVdPVwiZm9ybWF0RGF5VGl0bGVcIlxuICAgICAgICAgICAgICAgIFtmb3JtYXRIb3VyQ29sdW1uXT1cImZvcm1hdEhvdXJDb2x1bW5cIlxuICAgICAgICAgICAgICAgIFthbGxEYXlMYWJlbF09XCJhbGxEYXlMYWJlbFwiXG4gICAgICAgICAgICAgICAgW2hvdXJQYXJ0c109XCJob3VyUGFydHNcIlxuICAgICAgICAgICAgICAgIFtob3VyU2VnbWVudHNdPVwiaG91clNlZ21lbnRzXCJcbiAgICAgICAgICAgICAgICBbZXZlbnRTb3VyY2VdPVwiZXZlbnRTb3VyY2VcIlxuICAgICAgICAgICAgICAgIFttYXJrRGlzYWJsZWRdPVwibWFya0Rpc2FibGVkXCJcbiAgICAgICAgICAgICAgICBbZGF5dmlld0FsbERheUV2ZW50VGVtcGxhdGVdPVwiZGF5dmlld0FsbERheUV2ZW50VGVtcGxhdGV8fGRlZmF1bHRBbGxEYXlFdmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbZGF5dmlld05vcm1hbEV2ZW50VGVtcGxhdGVdPVwiZGF5dmlld05vcm1hbEV2ZW50VGVtcGxhdGV8fGRlZmF1bHROb3JtYWxFdmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbZGF5dmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlXT1cImRheXZpZXdBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZXx8ZGVmYXVsdERheVZpZXdBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW2RheXZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZV09XCJkYXl2aWV3Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGV8fGRlZmF1bHROb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW2RheXZpZXdJbmFjdGl2ZUFsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlXT1cImRheXZpZXdJbmFjdGl2ZUFsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlfHxkZWZhdWx0SW5hY3RpdmVBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW2RheXZpZXdJbmFjdGl2ZU5vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlXT1cImRheXZpZXdJbmFjdGl2ZU5vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlfHxkZWZhdWx0SW5hY3RpdmVOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICAgIFtkYXRlRm9ybWF0dGVyXT1cImRhdGVGb3JtYXR0ZXJcIlxuICAgICAgICAgICAgICAgIFtkaXJdPVwiZGlyXCJcbiAgICAgICAgICAgICAgICBbc2Nyb2xsVG9Ib3VyXT1cInNjcm9sbFRvSG91clwiXG4gICAgICAgICAgICAgICAgW3ByZXNlcnZlU2Nyb2xsUG9zaXRpb25dPVwicHJlc2VydmVTY3JvbGxQb3NpdGlvblwiXG4gICAgICAgICAgICAgICAgW2xvY2tTd2lwZVRvUHJldl09XCJsb2NrU3dpcGVUb1ByZXZcIlxuICAgICAgICAgICAgICAgIFtsb2NrU3dpcGVzXT1cImxvY2tTd2lwZXNcIlxuICAgICAgICAgICAgICAgIFtzdGFydEhvdXJdPVwic3RhcnRIb3VyXCJcbiAgICAgICAgICAgICAgICBbZW5kSG91cl09XCJlbmRIb3VyXCJcbiAgICAgICAgICAgICAgICBbc2xpZGVyT3B0aW9uc109XCJzbGlkZXJPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAob25SYW5nZUNoYW5nZWQpPVwicmFuZ2VDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChvbkV2ZW50U2VsZWN0ZWQpPVwiZXZlbnRTZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAob25UaW1lU2VsZWN0ZWQpPVwidGltZVNlbGVjdGVkKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChvblRpdGxlQ2hhbmdlZCk9XCJ0aXRsZUNoYW5nZWQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPC9kYXl2aWV3PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3QgPiBkaXYgeyBoZWlnaHQ6IDEwMCU7IH1cblxuICAgICAgICAuZXZlbnQtZGV0YWlsLWNvbnRhaW5lciB7XG4gICAgICAgICAgYm9yZGVyLXRvcDogMnB4IGRhcmtncmV5IHNvbGlkO1xuICAgICAgICB9XG5cbiAgICAgICAgLm5vLWV2ZW50cy1sYWJlbCB7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgY29sb3I6IGRhcmtncmV5O1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5ldmVudC1kZXRhaWwge1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICB9XG5cbiAgICAgICAgLm1vbnRodmlldy1ldmVudGRldGFpbC10aW1lY29sdW1uIHtcbiAgICAgICAgICB3aWR0aDogMTEwcHg7XG4gICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jYWxlbmRhci1ldmVudC1pbm5lciB7XG4gICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2E4N2FkO1xuICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgcGFkZGluZzogMnB4O1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxNXB4O1xuICAgICAgICAgIHRleHQtYWxpZ246IGluaXRpYWw7XG4gICAgICAgIH1cblxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzUwcHgpIHtcbiAgICAgICAgICAuY2FsZW5kYXItZXZlbnQtaW5uZXIge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIGBdLFxuICAgIHByb3ZpZGVyczogW0NhbGVuZGFyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGN1cnJlbnREYXRlKCk6RGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50RGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgY3VycmVudERhdGUodmFsOkRhdGUpIHtcbiAgICAgICAgaWYgKCF2YWwpIHtcbiAgICAgICAgICAgIHZhbCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdXJyZW50RGF0ZSA9IHZhbDtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2Uuc2V0Q3VycmVudERhdGUodmFsLCB0cnVlKTtcbiAgICAgICAgdGhpcy5vbkN1cnJlbnREYXRlQ2hhbmdlZC5lbWl0KHRoaXMuX2N1cnJlbnREYXRlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBldmVudFNvdXJjZTpJRXZlbnRbXSA9IFtdO1xuICAgIEBJbnB1dCgpIGNhbGVuZGFyTW9kZTpDYWxlbmRhck1vZGUgPSAnbW9udGgnO1xuICAgIEBJbnB1dCgpIGZvcm1hdERheTpzdHJpbmcgPSAnZCc7XG4gICAgQElucHV0KCkgZm9ybWF0RGF5SGVhZGVyOnN0cmluZyA9ICdFRUUnO1xuICAgIEBJbnB1dCgpIGZvcm1hdERheVRpdGxlOnN0cmluZyA9ICdNTU1NIGRkLCB5eXl5JztcbiAgICBASW5wdXQoKSBmb3JtYXRXZWVrVGl0bGU6c3RyaW5nID0gJ01NTU0geXl5eSwgXFwnV2Vla1xcJyB3JztcbiAgICBASW5wdXQoKSBmb3JtYXRNb250aFRpdGxlOnN0cmluZyA9ICdNTU1NIHl5eXknO1xuICAgIEBJbnB1dCgpIGZvcm1hdFdlZWtWaWV3RGF5SGVhZGVyOnN0cmluZyA9ICdFRUUgZCc7XG4gICAgQElucHV0KCkgZm9ybWF0SG91ckNvbHVtbjpzdHJpbmcgPSAnaGEnO1xuICAgIEBJbnB1dCgpIHNob3dFdmVudERldGFpbDpib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzdGFydGluZ0RheU1vbnRoOm51bWJlciA9IDA7XG4gICAgQElucHV0KCkgc3RhcnRpbmdEYXlXZWVrOm51bWJlciA9IDA7XG4gICAgQElucHV0KCkgYWxsRGF5TGFiZWw6c3RyaW5nID0gJ2FsbCBkYXknO1xuICAgIEBJbnB1dCgpIG5vRXZlbnRzTGFiZWw6c3RyaW5nID0gJ05vIEV2ZW50cyc7XG4gICAgQElucHV0KCkgcXVlcnlNb2RlOlF1ZXJ5TW9kZSA9ICdsb2NhbCc7XG4gICAgQElucHV0KCkgc3RlcDpTdGVwID0gU3RlcC5Ib3VyO1xuICAgIEBJbnB1dCgpIHRpbWVJbnRlcnZhbDpudW1iZXIgPSA2MDtcbiAgICBASW5wdXQoKSBhdXRvU2VsZWN0OmJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIG1hcmtEaXNhYmxlZDooZGF0ZTpEYXRlKSA9PiBib29sZWFuO1xuICAgIEBJbnB1dCgpIG1vbnRodmlld0Rpc3BsYXlFdmVudFRlbXBsYXRlOlRlbXBsYXRlUmVmPElNb250aFZpZXdEaXNwbGF5RXZlbnRUZW1wbGF0ZUNvbnRleHQ+O1xuICAgIEBJbnB1dCgpIG1vbnRodmlld0luYWN0aXZlRGlzcGxheUV2ZW50VGVtcGxhdGU6VGVtcGxhdGVSZWY8SU1vbnRoVmlld0Rpc3BsYXlFdmVudFRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgbW9udGh2aWV3RXZlbnREZXRhaWxUZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJTW9udGhWaWV3RXZlbnREZXRhaWxUZW1wbGF0ZUNvbnRleHQ+O1xuICAgIEBJbnB1dCgpIHdlZWt2aWV3SGVhZGVyVGVtcGxhdGU6VGVtcGxhdGVSZWY8SURpc3BsYXlXZWVrVmlld0hlYWRlcj47XG4gICAgQElucHV0KCkgd2Vla3ZpZXdBbGxEYXlFdmVudFRlbXBsYXRlOlRlbXBsYXRlUmVmPElEaXNwbGF5QWxsRGF5RXZlbnQ+O1xuICAgIEBJbnB1dCgpIHdlZWt2aWV3Tm9ybWFsRXZlbnRUZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJRGlzcGxheUV2ZW50PjtcbiAgICBASW5wdXQoKSBkYXl2aWV3QWxsRGF5RXZlbnRUZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJRGlzcGxheUFsbERheUV2ZW50PjtcbiAgICBASW5wdXQoKSBkYXl2aWV3Tm9ybWFsRXZlbnRUZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJRGlzcGxheUV2ZW50PjtcbiAgICBASW5wdXQoKSB3ZWVrdmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlOlRlbXBsYXRlUmVmPElXZWVrVmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgd2Vla3ZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJV2Vla1ZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZUNvbnRleHQ+O1xuICAgIEBJbnB1dCgpIGRheXZpZXdBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJRGF5Vmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgZGF5dmlld05vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlOlRlbXBsYXRlUmVmPElEYXlWaWV3Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGVDb250ZXh0PjtcbiAgICBASW5wdXQoKSB3ZWVrdmlld0luYWN0aXZlQWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGU6VGVtcGxhdGVSZWY8SVdlZWtWaWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVDb250ZXh0PjtcbiAgICBASW5wdXQoKSB3ZWVrdmlld0luYWN0aXZlTm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGU6VGVtcGxhdGVSZWY8SVdlZWtWaWV3Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGVDb250ZXh0PjtcbiAgICBASW5wdXQoKSBkYXl2aWV3SW5hY3RpdmVBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJRGF5Vmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgZGF5dmlld0luYWN0aXZlTm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGU6VGVtcGxhdGVSZWY8SURheVZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZUNvbnRleHQ+O1xuICAgIEBJbnB1dCgpIGRhdGVGb3JtYXR0ZXI6SURhdGVGb3JtYXR0ZXI7XG4gICAgQElucHV0KCkgZGlyOnN0cmluZyA9IFwiXCI7XG4gICAgQElucHV0KCkgc2Nyb2xsVG9Ib3VyOm51bWJlciA9IDA7XG4gICAgQElucHV0KCkgcHJlc2VydmVTY3JvbGxQb3NpdGlvbjpib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgbG9ja1N3aXBlVG9QcmV2OmJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBsb2NrU3dpcGVzOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBsb2NhbGU6c3RyaW5nID0gXCJcIjtcbiAgICBASW5wdXQoKSBzdGFydEhvdXI6bnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBlbmRIb3VyOm51bWJlciA9IDI0O1xuICAgIEBJbnB1dCgpIHNsaWRlck9wdGlvbnM6YW55O1xuXG4gICAgQE91dHB1dCgpIG9uQ3VycmVudERhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuICAgIEBPdXRwdXQoKSBvblJhbmdlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SVJhbmdlPigpO1xuICAgIEBPdXRwdXQoKSBvbkV2ZW50U2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPElFdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgb25UaW1lU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPElUaW1lU2VsZWN0ZWQ+KCk7XG4gICAgQE91dHB1dCgpIG9uVGl0bGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBwcml2YXRlIF9jdXJyZW50RGF0ZTpEYXRlO1xuICAgIHB1YmxpYyBob3VyUGFydHMgPSAxO1xuICAgIHB1YmxpYyBob3VyU2VnbWVudHMgPSAxO1xuICAgIHByaXZhdGUgY3VycmVudERhdGVDaGFuZ2VkRnJvbUNoaWxkcmVuU3Vic2NyaXB0aW9uOlN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FsZW5kYXJTZXJ2aWNlOkNhbGVuZGFyU2VydmljZSwgQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgYXBwTG9jYWxlOnN0cmluZykge1xuICAgICAgICB0aGlzLmxvY2FsZSA9IGFwcExvY2FsZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1NlbGVjdCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1NlbGVjdC50b1N0cmluZygpID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvU2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b1NlbGVjdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ob3VyU2VnbWVudHMgPSA2MCAvIHRoaXMudGltZUludGVydmFsO1xuICAgICAgICB0aGlzLmhvdXJQYXJ0cyA9IDYwIC8gdGhpcy5zdGVwO1xuICAgICAgICBpZih0aGlzLmhvdXJQYXJ0cyA8PSB0aGlzLmhvdXJTZWdtZW50cykge1xuICAgICAgICAgICAgdGhpcy5ob3VyUGFydHMgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ob3VyUGFydHMgPSB0aGlzLmhvdXJQYXJ0cyAvIHRoaXMuaG91clNlZ21lbnRzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhcnRIb3VyID0gcGFyc2VJbnQodGhpcy5zdGFydEhvdXIudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZW5kSG91ciA9IHBhcnNlSW50KHRoaXMuZW5kSG91ci50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UucXVlcnlNb2RlID0gdGhpcy5xdWVyeU1vZGU7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUNoYW5nZWRGcm9tQ2hpbGRyZW5TdWJzY3JpcHRpb24gPSB0aGlzLmNhbGVuZGFyU2VydmljZS5jdXJyZW50RGF0ZUNoYW5nZWRGcm9tQ2hpbGRyZW4kLnN1YnNjcmliZShjdXJyZW50RGF0ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlO1xuICAgICAgICAgICAgdGhpcy5vbkN1cnJlbnREYXRlQ2hhbmdlZC5lbWl0KGN1cnJlbnREYXRlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnREYXRlQ2hhbmdlZEZyb21DaGlsZHJlblN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUNoYW5nZWRGcm9tQ2hpbGRyZW5TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGVDaGFuZ2VkRnJvbUNoaWxkcmVuU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJhbmdlQ2hhbmdlZChyYW5nZTpJUmFuZ2UpIHtcbiAgICAgICAgdGhpcy5vblJhbmdlQ2hhbmdlZC5lbWl0KHJhbmdlKTtcbiAgICB9XG5cbiAgICBldmVudFNlbGVjdGVkKGV2ZW50OklFdmVudCkge1xuICAgICAgICB0aGlzLm9uRXZlbnRTZWxlY3RlZC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aW1lU2VsZWN0ZWQodGltZVNlbGVjdGVkOklUaW1lU2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5vblRpbWVTZWxlY3RlZC5lbWl0KHRpbWVTZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgdGl0bGVDaGFuZ2VkKHRpdGxlOnN0cmluZykge1xuICAgICAgICB0aGlzLm9uVGl0bGVDaGFuZ2VkLmVtaXQodGl0bGUpO1xuICAgIH1cblxuICAgIGxvYWRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmxvYWRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBzbGlkZU5leHQoKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLnNsaWRlKDEpO1xuICAgIH1cblxuICAgIHNsaWRlUHJldigpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2Uuc2xpZGUoLTEpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UudXBkYXRlKCk7XG4gICAgfVxufVxuIl19