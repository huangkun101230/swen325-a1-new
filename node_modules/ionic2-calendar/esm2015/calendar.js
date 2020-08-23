import { __decorate, __param } from "tslib";
import { Component, EventEmitter, Input, Output, Inject, LOCALE_ID } from '@angular/core';
import { CalendarService } from './calendar.service';
export var Step;
(function (Step) {
    Step[Step["QuarterHour"] = 15] = "QuarterHour";
    Step[Step["HalfHour"] = 30] = "HalfHour";
    Step[Step["Hour"] = 60] = "Hour";
})(Step || (Step = {}));
let CalendarComponent = class CalendarComponent {
    constructor(calendarService, appLocale) {
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
    get currentDate() {
        return this._currentDate;
    }
    set currentDate(val) {
        if (!val) {
            val = new Date();
        }
        this._currentDate = val;
        this.calendarService.setCurrentDate(val, true);
        this.onCurrentDateChanged.emit(this._currentDate);
    }
    ngOnInit() {
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
        this.currentDateChangedFromChildrenSubscription = this.calendarService.currentDateChangedFromChildren$.subscribe(currentDate => {
            this._currentDate = currentDate;
            this.onCurrentDateChanged.emit(currentDate);
        });
    }
    ngOnDestroy() {
        if (this.currentDateChangedFromChildrenSubscription) {
            this.currentDateChangedFromChildrenSubscription.unsubscribe();
            this.currentDateChangedFromChildrenSubscription = null;
        }
    }
    rangeChanged(range) {
        this.onRangeChanged.emit(range);
    }
    eventSelected(event) {
        this.onEventSelected.emit(event);
    }
    timeSelected(timeSelected) {
        this.onTimeSelected.emit(timeSelected);
    }
    titleChanged(title) {
        this.onTitleChanged.emit(title);
    }
    loadEvents() {
        this.calendarService.loadEvents();
    }
    slideNext() {
        this.calendarService.slide(1);
    }
    slidePrev() {
        this.calendarService.slide(-1);
    }
    update() {
        this.calendarService.update();
    }
};
CalendarComponent.ctorParameters = () => [
    { type: CalendarService },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
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
        template: `
        <ng-template #monthviewDefaultDisplayEventTemplate let-view="view" let-row="row" let-col="col">
            {{view.dates[row*7+col].label}}
        </ng-template>
        <ng-template #monthviewDefaultEventDetailTemplate let-showEventDetail="showEventDetail" let-selectedDate="selectedDate" let-noEventsLabel="noEventsLabel">
            <ion-list class="event-detail-container" has-bouncing="false" *ngIf="showEventDetail" overflow-scroll="false">
                <ion-item *ngFor="let event of selectedDate?.events" (click)="eventSelected(event)">
                        <span *ngIf="!event.allDay" class="monthview-eventdetail-timecolumn">{{event.startTime|date: 'HH:mm'}}
                            -
                            {{event.endTime|date: 'HH:mm'}}
                        </span>
                    <span *ngIf="event.allDay" class="monthview-eventdetail-timecolumn">{{allDayLabel}}</span>
                    <span class="event-detail">  |  {{event.title}}</span>
                </ion-item>
                <ion-item *ngIf="selectedDate?.events.length==0">
                    <div class="no-events-label">{{noEventsLabel}}</div>
                </ion-item>
            </ion-list>
        </ng-template>
        <ng-template #defaultWeekviewHeaderTemplate let-viewDate="viewDate">
            {{ viewDate.dayHeader }}
        </ng-template>
        <ng-template #defaultAllDayEventTemplate let-displayEvent="displayEvent">
            <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
        </ng-template>
        <ng-template #defaultNormalEventTemplate let-displayEvent="displayEvent">
            <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
        </ng-template>
        <ng-template #defaultWeekViewAllDayEventSectionTemplate let-day="day" let-eventTemplate="eventTemplate">
            <div [ngClass]="{'calendar-event-wrap': day.events}" *ngIf="day.events"
                 [ngStyle]="{height: 25*day.events.length+'px'}">
                <div *ngFor="let displayEvent of day.events" class="calendar-event" tappable
                     (click)="eventSelected(displayEvent.event)"
                     [ngStyle]="{top: 25*displayEvent.position+'px', width: 100*(displayEvent.endIndex-displayEvent.startIndex)+'%', height: '25px'}">
                    <ng-template [ngTemplateOutlet]="eventTemplate"
                                 [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                    </ng-template>
                </div>
            </div>
        </ng-template>
        <ng-template #defaultDayViewAllDayEventSectionTemplate let-allDayEvents="allDayEvents" let-eventTemplate="eventTemplate">
            <div *ngFor="let displayEvent of allDayEvents; let eventIndex=index"
                 class="calendar-event" tappable
                 (click)="eventSelected(displayEvent.event)"
                 [ngStyle]="{top: 25*eventIndex+'px',width: '100%',height:'25px'}">
                <ng-template [ngTemplateOutlet]="eventTemplate"
                             [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                </ng-template>
            </div>
        </ng-template>
        <ng-template #defaultNormalEventSectionTemplate let-tm="tm" let-hourParts="hourParts" let-eventTemplate="eventTemplate">
            <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                <div *ngFor="let displayEvent of tm.events" class="calendar-event" tappable
                     (click)="eventSelected(displayEvent.event)"
                     [ngStyle]="{top: (37*displayEvent.startOffset/hourParts)+'px',left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}">
                    <ng-template [ngTemplateOutlet]="eventTemplate"
                                 [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                    </ng-template>
                </div>
            </div>
        </ng-template>
        <ng-template #defaultInactiveAllDayEventSectionTemplate>
        </ng-template>
        <ng-template #defaultInactiveNormalEventSectionTemplate>
        </ng-template>

        <div [ngSwitch]="calendarMode" class="{{calendarMode}}view-container">
            <monthview *ngSwitchCase="'month'"
                [formatDay]="formatDay"
                [formatDayHeader]="formatDayHeader"
                [formatMonthTitle]="formatMonthTitle"
                [startingDayMonth]="startingDayMonth"
                [showEventDetail]="showEventDetail"
                [noEventsLabel]="noEventsLabel"
                [autoSelect]="autoSelect"
                [eventSource]="eventSource"
                [markDisabled]="markDisabled"
                [monthviewDisplayEventTemplate]="monthviewDisplayEventTemplate||monthviewDefaultDisplayEventTemplate"
                [monthviewInactiveDisplayEventTemplate]="monthviewInactiveDisplayEventTemplate||monthviewDefaultDisplayEventTemplate"
                [monthviewEventDetailTemplate]="monthviewEventDetailTemplate||monthviewDefaultEventDetailTemplate"
                [locale]="locale"
                [dateFormatter]="dateFormatter"
                [dir]="dir"
                [lockSwipeToPrev]="lockSwipeToPrev"
                [lockSwipes]="lockSwipes"
                [sliderOptions]="sliderOptions"
                (onRangeChanged)="rangeChanged($event)"
                (onEventSelected)="eventSelected($event)"
                (onTimeSelected)="timeSelected($event)"
                (onTitleChanged)="titleChanged($event)">
            </monthview>
            <weekview *ngSwitchCase="'week'"
                [formatWeekTitle]="formatWeekTitle"
                [formatWeekViewDayHeader]="formatWeekViewDayHeader"
                [formatHourColumn]="formatHourColumn"
                [startingDayWeek]="startingDayWeek"
                [allDayLabel]="allDayLabel"
                [hourParts]="hourParts"
                [autoSelect]="autoSelect"
                [hourSegments]="hourSegments"
                [eventSource]="eventSource"
                [markDisabled]="markDisabled"
                [weekviewHeaderTemplate]="weekviewHeaderTemplate||defaultWeekviewHeaderTemplate"
                [weekviewAllDayEventTemplate]="weekviewAllDayEventTemplate||defaultAllDayEventTemplate"
                [weekviewNormalEventTemplate]="weekviewNormalEventTemplate||defaultNormalEventTemplate"
                [weekviewAllDayEventSectionTemplate]="weekviewAllDayEventSectionTemplate||defaultWeekViewAllDayEventSectionTemplate"
                [weekviewNormalEventSectionTemplate]="weekviewNormalEventSectionTemplate||defaultNormalEventSectionTemplate"
                [weekviewInactiveAllDayEventSectionTemplate]="weekviewInactiveAllDayEventSectionTemplate||defaultInactiveAllDayEventSectionTemplate"
                [weekviewInactiveNormalEventSectionTemplate]="weekviewInactiveNormalEventSectionTemplate||defaultInactiveNormalEventSectionTemplate"
                [locale]="locale"
                [dateFormatter]="dateFormatter"
                [dir]="dir"
                [scrollToHour]="scrollToHour"
                [preserveScrollPosition]="preserveScrollPosition"
                [lockSwipeToPrev]="lockSwipeToPrev"
                [lockSwipes]="lockSwipes"
                [startHour]="startHour"
                [endHour]="endHour"
                [sliderOptions]="sliderOptions"
                (onRangeChanged)="rangeChanged($event)"
                (onEventSelected)="eventSelected($event)"
                (onTimeSelected)="timeSelected($event)"
                (onTitleChanged)="titleChanged($event)">
            </weekview>
            <dayview *ngSwitchCase="'day'"
                [formatDayTitle]="formatDayTitle"
                [formatHourColumn]="formatHourColumn"
                [allDayLabel]="allDayLabel"
                [hourParts]="hourParts"
                [hourSegments]="hourSegments"
                [eventSource]="eventSource"
                [markDisabled]="markDisabled"
                [dayviewAllDayEventTemplate]="dayviewAllDayEventTemplate||defaultAllDayEventTemplate"
                [dayviewNormalEventTemplate]="dayviewNormalEventTemplate||defaultNormalEventTemplate"
                [dayviewAllDayEventSectionTemplate]="dayviewAllDayEventSectionTemplate||defaultDayViewAllDayEventSectionTemplate"
                [dayviewNormalEventSectionTemplate]="dayviewNormalEventSectionTemplate||defaultNormalEventSectionTemplate"
                [dayviewInactiveAllDayEventSectionTemplate]="dayviewInactiveAllDayEventSectionTemplate||defaultInactiveAllDayEventSectionTemplate"
                [dayviewInactiveNormalEventSectionTemplate]="dayviewInactiveNormalEventSectionTemplate||defaultInactiveNormalEventSectionTemplate"
                [locale]="locale"
                [dateFormatter]="dateFormatter"
                [dir]="dir"
                [scrollToHour]="scrollToHour"
                [preserveScrollPosition]="preserveScrollPosition"
                [lockSwipeToPrev]="lockSwipeToPrev"
                [lockSwipes]="lockSwipes"
                [startHour]="startHour"
                [endHour]="endHour"
                [sliderOptions]="sliderOptions"
                (onRangeChanged)="rangeChanged($event)"
                (onEventSelected)="eventSelected($event)"
                (onTimeSelected)="timeSelected($event)"
                (onTitleChanged)="titleChanged($event)">
            </dayview>
        </div>
    `,
        providers: [CalendarService],
        styles: [`
        :host > div { height: 100%; }

        .event-detail-container {
          border-top: 2px darkgrey solid;
        }

        .no-events-label {
          font-weight: bold;
          color: darkgrey;
          text-align: center;
        }

        .event-detail {
          cursor: pointer;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .monthview-eventdetail-timecolumn {
          width: 110px;
          overflow: hidden;
        }

        .calendar-event-inner {
          overflow: hidden;
          background-color: #3a87ad;
          color: white;
          height: 100%;
          width: 100%;
          padding: 2px;
          line-height: 15px;
          text-align: initial;
        }

        @media (max-width: 750px) {
          .calendar-event-inner {
            font-size: 12px;
          }
        }
    `]
    }),
    __param(1, Inject(LOCALE_ID))
], CalendarComponent);
export { CalendarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb25pYzItY2FsZW5kYXIvIiwic291cmNlcyI6WyJjYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBZSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRy9HLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWlKckQsTUFBTSxDQUFOLElBQVksSUFJWDtBQUpELFdBQVksSUFBSTtJQUNaLDhDQUFnQixDQUFBO0lBQ2hCLHdDQUFhLENBQUE7SUFDYixnQ0FBUyxDQUFBO0FBQ2IsQ0FBQyxFQUpXLElBQUksS0FBSixJQUFJLFFBSWY7QUEwTUQsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUF5RTFCLFlBQW9CLGVBQStCLEVBQTZCLFNBQWdCO1FBQTVFLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUE2QixjQUFTLEdBQVQsU0FBUyxDQUFPO1FBekR2RixnQkFBVyxHQUFZLEVBQUUsQ0FBQztRQUMxQixpQkFBWSxHQUFnQixPQUFPLENBQUM7UUFDcEMsY0FBUyxHQUFVLEdBQUcsQ0FBQztRQUN2QixvQkFBZSxHQUFVLEtBQUssQ0FBQztRQUMvQixtQkFBYyxHQUFVLGVBQWUsQ0FBQztRQUN4QyxvQkFBZSxHQUFVLHVCQUF1QixDQUFDO1FBQ2pELHFCQUFnQixHQUFVLFdBQVcsQ0FBQztRQUN0Qyw0QkFBdUIsR0FBVSxPQUFPLENBQUM7UUFDekMscUJBQWdCLEdBQVUsSUFBSSxDQUFDO1FBQy9CLG9CQUFlLEdBQVcsSUFBSSxDQUFDO1FBQy9CLHFCQUFnQixHQUFVLENBQUMsQ0FBQztRQUM1QixvQkFBZSxHQUFVLENBQUMsQ0FBQztRQUMzQixnQkFBVyxHQUFVLFNBQVMsQ0FBQztRQUMvQixrQkFBYSxHQUFVLFdBQVcsQ0FBQztRQUNuQyxjQUFTLEdB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SUFBUixLQUFLLEVBQUU7d0RBQThCO0FBQzdCO0lBQVIsS0FBSyxFQUFFOzhDQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTt1REFBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7aUVBQXdDO0FBQ3ZDO0lBQVIsS0FBSyxFQUFFOzBEQUFpQztBQUNoQztJQUFSLEtBQUssRUFBRTtxREFBNEI7QUFDM0I7SUFBUixLQUFLLEVBQUU7aURBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFO29EQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTtrREFBcUI7QUFDcEI7SUFBUixLQUFLLEVBQUU7d0RBQW1CO0FBRWpCO0lBQVQsTUFBTSxFQUFFOytEQUFpRDtBQUNoRDtJQUFULE1BQU0sRUFBRTt5REFBNkM7QUFDNUM7SUFBVCxNQUFNLEVBQUU7MERBQThDO0FBQzdDO0lBQVQsTUFBTSxFQUFFO3lEQUFvRDtBQUNuRDtJQUFULE1BQU0sRUFBRTt5REFBNkM7QUFsRTdDLGlCQUFpQjtJQXhNN0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMEpUO1FBMENELFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQztpQkF6Q25COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBd0NSO0tBRUosQ0FBQztJQTBFd0QsV0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7R0F6RTlELGlCQUFpQixDQTRJN0I7U0E1SVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIEluamVjdCwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2FsZW5kYXJTZXJ2aWNlIH0gZnJvbSAnLi9jYWxlbmRhci5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJRXZlbnQge1xuICAgIGFsbERheTogYm9vbGVhbjtcbiAgICBlbmRUaW1lOiBEYXRlO1xuICAgIHN0YXJ0VGltZTogRGF0ZTtcbiAgICB0aXRsZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElSYW5nZSB7XG4gICAgc3RhcnRUaW1lOiBEYXRlO1xuICAgIGVuZFRpbWU6IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXcge1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEYXlWaWV3IGV4dGVuZHMgSVZpZXcge1xuICAgIGFsbERheUV2ZW50czogSURpc3BsYXlBbGxEYXlFdmVudFtdO1xuICAgIHJvd3M6IElEYXlWaWV3Um93W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURheVZpZXdSb3cge1xuICAgIGV2ZW50czogSURpc3BsYXlFdmVudFtdO1xuICAgIHRpbWU6IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1vbnRoVmlldyBleHRlbmRzIElWaWV3IHtcbiAgICBkYXRlczogSU1vbnRoVmlld1Jvd1tdO1xuICAgIGRheUhlYWRlcnM6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElNb250aFZpZXdSb3cge1xuICAgIGN1cnJlbnQ/OiBib29sZWFuO1xuICAgIGRhdGU6IERhdGU7XG4gICAgZXZlbnRzOiBJRXZlbnRbXTtcbiAgICBoYXNFdmVudD86IGJvb2xlYW47XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBzZWNvbmRhcnk6IGJvb2xlYW47XG4gICAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICAgIGRpc2FibGVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElXZWVrVmlldyBleHRlbmRzIElWaWV3IHtcbiAgICBkYXRlczogSVdlZWtWaWV3RGF0ZVJvd1tdO1xuICAgIHJvd3M6IElXZWVrVmlld1Jvd1tdW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVdlZWtWaWV3RGF0ZVJvdyB7XG4gICAgY3VycmVudD86IGJvb2xlYW47XG4gICAgZGF0ZTogRGF0ZTtcbiAgICBldmVudHM6IElEaXNwbGF5RXZlbnRbXTtcbiAgICBoYXNFdmVudD86IGJvb2xlYW47XG4gICAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICAgIGRheUhlYWRlcjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElXZWVrVmlld1JvdyB7XG4gICAgZXZlbnRzOiBJRGlzcGxheUV2ZW50W107XG4gICAgdGltZTogRGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGlzcGxheUV2ZW50IHtcbiAgICBlbmRJbmRleDogbnVtYmVyO1xuICAgIGVuZE9mZnNldD86IG51bWJlcjtcbiAgICBldmVudDogSUV2ZW50O1xuICAgIHN0YXJ0SW5kZXg6IG51bWJlcjtcbiAgICBzdGFydE9mZnNldD86IG51bWJlcjtcbiAgICBvdmVybGFwTnVtYmVyPzogbnVtYmVyO1xuICAgIHBvc2l0aW9uPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEaXNwbGF5V2Vla1ZpZXdIZWFkZXIge1xuICAgIHZpZXdEYXRlOiBJV2Vla1ZpZXdEYXRlUm93O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEaXNwbGF5QWxsRGF5RXZlbnQge1xuICAgIGV2ZW50OiBJRXZlbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNhbGVuZGFyQ29tcG9uZW50IHtcbiAgICBjdXJyZW50Vmlld0luZGV4OiBudW1iZXI7XG4gICAgZGlyZWN0aW9uOiBudW1iZXI7XG4gICAgZXZlbnRTb3VyY2U6IElFdmVudFtdO1xuICAgIGdldFJhbmdlOiB7IChkYXRlOkRhdGUpOiBJUmFuZ2U7IH07XG4gICAgZ2V0Vmlld0RhdGE6IHsgKGRhdGU6RGF0ZSk6IElWaWV3IH07XG4gICAgbW9kZTogQ2FsZW5kYXJNb2RlO1xuICAgIHJhbmdlOiBJUmFuZ2U7XG4gICAgdmlld3M6IElWaWV3W107XG4gICAgb25EYXRhTG9hZGVkOiB7ICgpOiB2b2lkIH07XG4gICAgb25SYW5nZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxJUmFuZ2U+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUaW1lU2VsZWN0ZWQge1xuICAgIGV2ZW50czogSUV2ZW50W107XG4gICAgc2VsZWN0ZWRUaW1lOiBEYXRlO1xuICAgIGRpc2FibGVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElNb250aFZpZXdEaXNwbGF5RXZlbnRUZW1wbGF0ZUNvbnRleHQge1xuICAgIHZpZXc6IElWaWV3O1xuICAgIHJvdzogbnVtYmVyO1xuICAgIGNvbDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElNb250aFZpZXdFdmVudERldGFpbFRlbXBsYXRlQ29udGV4dCB7XG4gICAgc2VsZWN0ZWREYXRlOiBJVGltZVNlbGVjdGVkO1xuICAgIG5vRXZlbnRzTGFiZWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJV2Vla1ZpZXdBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZUNvbnRleHQge1xuICAgIGRheTogSVdlZWtWaWV3RGF0ZVJvdyxcbiAgICBldmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxJRGlzcGxheUFsbERheUV2ZW50PlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElXZWVrVmlld05vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlQ29udGV4dCB7XG4gICAgdG06IElXZWVrVmlld1JvdyxcbiAgICBldmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxJRGlzcGxheUV2ZW50PlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEYXlWaWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVDb250ZXh0IHtcbiAgICBhbGxkYXlFdmVudHM6IElEaXNwbGF5QWxsRGF5RXZlbnRbXSxcbiAgICBldmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxJRGlzcGxheUFsbERheUV2ZW50PlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEYXlWaWV3Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGVDb250ZXh0IHtcbiAgICB0bTogSURheVZpZXdSb3csXG4gICAgZXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SURpc3BsYXlFdmVudD5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZUZvcm1hdHRlciB7XG4gICAgZm9ybWF0TW9udGhWaWV3RGF5PzogeyAoZGF0ZTpEYXRlKTogc3RyaW5nOyB9O1xuICAgIGZvcm1hdE1vbnRoVmlld0RheUhlYWRlcj86IHsgKGRhdGU6RGF0ZSk6IHN0cmluZzsgfTtcbiAgICBmb3JtYXRNb250aFZpZXdUaXRsZT86IHsgKGRhdGU6RGF0ZSk6IHN0cmluZzsgfTtcbiAgICBmb3JtYXRXZWVrVmlld0RheUhlYWRlcj86IHsgKGRhdGU6RGF0ZSk6IHN0cmluZzsgfTtcbiAgICBmb3JtYXRXZWVrVmlld1RpdGxlPzogeyAoZGF0ZTpEYXRlKTogc3RyaW5nOyB9O1xuICAgIGZvcm1hdFdlZWtWaWV3SG91ckNvbHVtbj86IHsgKGRhdGU6RGF0ZSk6IHN0cmluZzsgfTtcbiAgICBmb3JtYXREYXlWaWV3VGl0bGU/OiB7IChkYXRlOkRhdGUpOiBzdHJpbmc7IH07XG4gICAgZm9ybWF0RGF5Vmlld0hvdXJDb2x1bW4/OiB7IChkYXRlOkRhdGUpOiBzdHJpbmc7IH07XG59XG5cbmV4cG9ydCB0eXBlIENhbGVuZGFyTW9kZSA9ICdkYXknIHwgJ21vbnRoJyB8ICd3ZWVrJztcblxuZXhwb3J0IHR5cGUgUXVlcnlNb2RlID0gJ2xvY2FsJyB8ICdyZW1vdGUnO1xuXG5leHBvcnQgZW51bSBTdGVwIHtcbiAgICBRdWFydGVySG91ciA9IDE1LFxuICAgIEhhbGZIb3VyID0gMzAsXG4gICAgSG91ciA9IDYwXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2FsZW5kYXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjbW9udGh2aWV3RGVmYXVsdERpc3BsYXlFdmVudFRlbXBsYXRlIGxldC12aWV3PVwidmlld1wiIGxldC1yb3c9XCJyb3dcIiBsZXQtY29sPVwiY29sXCI+XG4gICAgICAgICAgICB7e3ZpZXcuZGF0ZXNbcm93KjcrY29sXS5sYWJlbH19XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjbW9udGh2aWV3RGVmYXVsdEV2ZW50RGV0YWlsVGVtcGxhdGUgbGV0LXNob3dFdmVudERldGFpbD1cInNob3dFdmVudERldGFpbFwiIGxldC1zZWxlY3RlZERhdGU9XCJzZWxlY3RlZERhdGVcIiBsZXQtbm9FdmVudHNMYWJlbD1cIm5vRXZlbnRzTGFiZWxcIj5cbiAgICAgICAgICAgIDxpb24tbGlzdCBjbGFzcz1cImV2ZW50LWRldGFpbC1jb250YWluZXJcIiBoYXMtYm91bmNpbmc9XCJmYWxzZVwiICpuZ0lmPVwic2hvd0V2ZW50RGV0YWlsXCIgb3ZlcmZsb3ctc2Nyb2xsPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWl0ZW0gKm5nRm9yPVwibGV0IGV2ZW50IG9mIHNlbGVjdGVkRGF0ZT8uZXZlbnRzXCIgKGNsaWNrKT1cImV2ZW50U2VsZWN0ZWQoZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFldmVudC5hbGxEYXlcIiBjbGFzcz1cIm1vbnRodmlldy1ldmVudGRldGFpbC10aW1lY29sdW1uXCI+e3tldmVudC5zdGFydFRpbWV8ZGF0ZTogJ0hIOm1tJ319XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ZXZlbnQuZW5kVGltZXxkYXRlOiAnSEg6bW0nfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJldmVudC5hbGxEYXlcIiBjbGFzcz1cIm1vbnRodmlldy1ldmVudGRldGFpbC10aW1lY29sdW1uXCI+e3thbGxEYXlMYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImV2ZW50LWRldGFpbFwiPiAgfCAge3tldmVudC50aXRsZX19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG4gICAgICAgICAgICAgICAgPGlvbi1pdGVtICpuZ0lmPVwic2VsZWN0ZWREYXRlPy5ldmVudHMubGVuZ3RoPT0wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuby1ldmVudHMtbGFiZWxcIj57e25vRXZlbnRzTGFiZWx9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG4gICAgICAgICAgICA8L2lvbi1saXN0PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRXZWVrdmlld0hlYWRlclRlbXBsYXRlIGxldC12aWV3RGF0ZT1cInZpZXdEYXRlXCI+XG4gICAgICAgICAgICB7eyB2aWV3RGF0ZS5kYXlIZWFkZXIgfX1cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0QWxsRGF5RXZlbnRUZW1wbGF0ZSBsZXQtZGlzcGxheUV2ZW50PVwiZGlzcGxheUV2ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItZXZlbnQtaW5uZXJcIj57e2Rpc3BsYXlFdmVudC5ldmVudC50aXRsZX19PC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdE5vcm1hbEV2ZW50VGVtcGxhdGUgbGV0LWRpc3BsYXlFdmVudD1cImRpc3BsYXlFdmVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWV2ZW50LWlubmVyXCI+e3tkaXNwbGF5RXZlbnQuZXZlbnQudGl0bGV9fTwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRXZWVrVmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlIGxldC1kYXk9XCJkYXlcIiBsZXQtZXZlbnRUZW1wbGF0ZT1cImV2ZW50VGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieydjYWxlbmRhci1ldmVudC13cmFwJzogZGF5LmV2ZW50c31cIiAqbmdJZj1cImRheS5ldmVudHNcIlxuICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7aGVpZ2h0OiAyNSpkYXkuZXZlbnRzLmxlbmd0aCsncHgnfVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRpc3BsYXlFdmVudCBvZiBkYXkuZXZlbnRzXCIgY2xhc3M9XCJjYWxlbmRhci1ldmVudFwiIHRhcHBhYmxlXG4gICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZXZlbnRTZWxlY3RlZChkaXNwbGF5RXZlbnQuZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInt0b3A6IDI1KmRpc3BsYXlFdmVudC5wb3NpdGlvbisncHgnLCB3aWR0aDogMTAwKihkaXNwbGF5RXZlbnQuZW5kSW5kZXgtZGlzcGxheUV2ZW50LnN0YXJ0SW5kZXgpKyclJywgaGVpZ2h0OiAnMjVweCd9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJldmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGlzcGxheUV2ZW50OmRpc3BsYXlFdmVudH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHREYXlWaWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGUgbGV0LWFsbERheUV2ZW50cz1cImFsbERheUV2ZW50c1wiIGxldC1ldmVudFRlbXBsYXRlPVwiZXZlbnRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZGlzcGxheUV2ZW50IG9mIGFsbERheUV2ZW50czsgbGV0IGV2ZW50SW5kZXg9aW5kZXhcIlxuICAgICAgICAgICAgICAgICBjbGFzcz1cImNhbGVuZGFyLWV2ZW50XCIgdGFwcGFibGVcbiAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImV2ZW50U2VsZWN0ZWQoZGlzcGxheUV2ZW50LmV2ZW50KVwiXG4gICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInt0b3A6IDI1KmV2ZW50SW5kZXgrJ3B4Jyx3aWR0aDogJzEwMCUnLGhlaWdodDonMjVweCd9XCI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Rpc3BsYXlFdmVudDpkaXNwbGF5RXZlbnR9XCI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHROb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZSBsZXQtdG09XCJ0bVwiIGxldC1ob3VyUGFydHM9XCJob3VyUGFydHNcIiBsZXQtZXZlbnRUZW1wbGF0ZT1cImV2ZW50VGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieydjYWxlbmRhci1ldmVudC13cmFwJzogdG0uZXZlbnRzfVwiICpuZ0lmPVwidG0uZXZlbnRzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZGlzcGxheUV2ZW50IG9mIHRtLmV2ZW50c1wiIGNsYXNzPVwiY2FsZW5kYXItZXZlbnRcIiB0YXBwYWJsZVxuICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImV2ZW50U2VsZWN0ZWQoZGlzcGxheUV2ZW50LmV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7dG9wOiAoMzcqZGlzcGxheUV2ZW50LnN0YXJ0T2Zmc2V0L2hvdXJQYXJ0cykrJ3B4JyxsZWZ0OiAxMDAvZGlzcGxheUV2ZW50Lm92ZXJsYXBOdW1iZXIqZGlzcGxheUV2ZW50LnBvc2l0aW9uKyclJywgd2lkdGg6IDEwMC9kaXNwbGF5RXZlbnQub3ZlcmxhcE51bWJlcisnJScsIGhlaWdodDogMzcqKGRpc3BsYXlFdmVudC5lbmRJbmRleCAtZGlzcGxheUV2ZW50LnN0YXJ0SW5kZXggLSAoZGlzcGxheUV2ZW50LmVuZE9mZnNldCArIGRpc3BsYXlFdmVudC5zdGFydE9mZnNldCkvaG91clBhcnRzKSsncHgnfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Rpc3BsYXlFdmVudDpkaXNwbGF5RXZlbnR9XCI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0SW5hY3RpdmVBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZT5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0SW5hY3RpdmVOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZT5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJjYWxlbmRhck1vZGVcIiBjbGFzcz1cInt7Y2FsZW5kYXJNb2RlfX12aWV3LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPG1vbnRodmlldyAqbmdTd2l0Y2hDYXNlPVwiJ21vbnRoJ1wiXG4gICAgICAgICAgICAgICAgW2Zvcm1hdERheV09XCJmb3JtYXREYXlcIlxuICAgICAgICAgICAgICAgIFtmb3JtYXREYXlIZWFkZXJdPVwiZm9ybWF0RGF5SGVhZGVyXCJcbiAgICAgICAgICAgICAgICBbZm9ybWF0TW9udGhUaXRsZV09XCJmb3JtYXRNb250aFRpdGxlXCJcbiAgICAgICAgICAgICAgICBbc3RhcnRpbmdEYXlNb250aF09XCJzdGFydGluZ0RheU1vbnRoXCJcbiAgICAgICAgICAgICAgICBbc2hvd0V2ZW50RGV0YWlsXT1cInNob3dFdmVudERldGFpbFwiXG4gICAgICAgICAgICAgICAgW25vRXZlbnRzTGFiZWxdPVwibm9FdmVudHNMYWJlbFwiXG4gICAgICAgICAgICAgICAgW2F1dG9TZWxlY3RdPVwiYXV0b1NlbGVjdFwiXG4gICAgICAgICAgICAgICAgW2V2ZW50U291cmNlXT1cImV2ZW50U291cmNlXCJcbiAgICAgICAgICAgICAgICBbbWFya0Rpc2FibGVkXT1cIm1hcmtEaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW21vbnRodmlld0Rpc3BsYXlFdmVudFRlbXBsYXRlXT1cIm1vbnRodmlld0Rpc3BsYXlFdmVudFRlbXBsYXRlfHxtb250aHZpZXdEZWZhdWx0RGlzcGxheUV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFttb250aHZpZXdJbmFjdGl2ZURpc3BsYXlFdmVudFRlbXBsYXRlXT1cIm1vbnRodmlld0luYWN0aXZlRGlzcGxheUV2ZW50VGVtcGxhdGV8fG1vbnRodmlld0RlZmF1bHREaXNwbGF5RXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW21vbnRodmlld0V2ZW50RGV0YWlsVGVtcGxhdGVdPVwibW9udGh2aWV3RXZlbnREZXRhaWxUZW1wbGF0ZXx8bW9udGh2aWV3RGVmYXVsdEV2ZW50RGV0YWlsVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgICAgICBbZGF0ZUZvcm1hdHRlcl09XCJkYXRlRm9ybWF0dGVyXCJcbiAgICAgICAgICAgICAgICBbZGlyXT1cImRpclwiXG4gICAgICAgICAgICAgICAgW2xvY2tTd2lwZVRvUHJldl09XCJsb2NrU3dpcGVUb1ByZXZcIlxuICAgICAgICAgICAgICAgIFtsb2NrU3dpcGVzXT1cImxvY2tTd2lwZXNcIlxuICAgICAgICAgICAgICAgIFtzbGlkZXJPcHRpb25zXT1cInNsaWRlck9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIChvblJhbmdlQ2hhbmdlZCk9XCJyYW5nZUNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG9uRXZlbnRTZWxlY3RlZCk9XCJldmVudFNlbGVjdGVkKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChvblRpbWVTZWxlY3RlZCk9XCJ0aW1lU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG9uVGl0bGVDaGFuZ2VkKT1cInRpdGxlQ2hhbmdlZCgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8L21vbnRodmlldz5cbiAgICAgICAgICAgIDx3ZWVrdmlldyAqbmdTd2l0Y2hDYXNlPVwiJ3dlZWsnXCJcbiAgICAgICAgICAgICAgICBbZm9ybWF0V2Vla1RpdGxlXT1cImZvcm1hdFdlZWtUaXRsZVwiXG4gICAgICAgICAgICAgICAgW2Zvcm1hdFdlZWtWaWV3RGF5SGVhZGVyXT1cImZvcm1hdFdlZWtWaWV3RGF5SGVhZGVyXCJcbiAgICAgICAgICAgICAgICBbZm9ybWF0SG91ckNvbHVtbl09XCJmb3JtYXRIb3VyQ29sdW1uXCJcbiAgICAgICAgICAgICAgICBbc3RhcnRpbmdEYXlXZWVrXT1cInN0YXJ0aW5nRGF5V2Vla1wiXG4gICAgICAgICAgICAgICAgW2FsbERheUxhYmVsXT1cImFsbERheUxhYmVsXCJcbiAgICAgICAgICAgICAgICBbaG91clBhcnRzXT1cImhvdXJQYXJ0c1wiXG4gICAgICAgICAgICAgICAgW2F1dG9TZWxlY3RdPVwiYXV0b1NlbGVjdFwiXG4gICAgICAgICAgICAgICAgW2hvdXJTZWdtZW50c109XCJob3VyU2VnbWVudHNcIlxuICAgICAgICAgICAgICAgIFtldmVudFNvdXJjZV09XCJldmVudFNvdXJjZVwiXG4gICAgICAgICAgICAgICAgW21hcmtEaXNhYmxlZF09XCJtYXJrRGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIFt3ZWVrdmlld0hlYWRlclRlbXBsYXRlXT1cIndlZWt2aWV3SGVhZGVyVGVtcGxhdGV8fGRlZmF1bHRXZWVrdmlld0hlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbd2Vla3ZpZXdBbGxEYXlFdmVudFRlbXBsYXRlXT1cIndlZWt2aWV3QWxsRGF5RXZlbnRUZW1wbGF0ZXx8ZGVmYXVsdEFsbERheUV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFt3ZWVrdmlld05vcm1hbEV2ZW50VGVtcGxhdGVdPVwid2Vla3ZpZXdOb3JtYWxFdmVudFRlbXBsYXRlfHxkZWZhdWx0Tm9ybWFsRXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW3dlZWt2aWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVdPVwid2Vla3ZpZXdBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZXx8ZGVmYXVsdFdlZWtWaWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFt3ZWVrdmlld05vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlXT1cIndlZWt2aWV3Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGV8fGRlZmF1bHROb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW3dlZWt2aWV3SW5hY3RpdmVBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZV09XCJ3ZWVrdmlld0luYWN0aXZlQWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGV8fGRlZmF1bHRJbmFjdGl2ZUFsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbd2Vla3ZpZXdJbmFjdGl2ZU5vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlXT1cIndlZWt2aWV3SW5hY3RpdmVOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZXx8ZGVmYXVsdEluYWN0aXZlTm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgICAgICBbZGF0ZUZvcm1hdHRlcl09XCJkYXRlRm9ybWF0dGVyXCJcbiAgICAgICAgICAgICAgICBbZGlyXT1cImRpclwiXG4gICAgICAgICAgICAgICAgW3Njcm9sbFRvSG91cl09XCJzY3JvbGxUb0hvdXJcIlxuICAgICAgICAgICAgICAgIFtwcmVzZXJ2ZVNjcm9sbFBvc2l0aW9uXT1cInByZXNlcnZlU2Nyb2xsUG9zaXRpb25cIlxuICAgICAgICAgICAgICAgIFtsb2NrU3dpcGVUb1ByZXZdPVwibG9ja1N3aXBlVG9QcmV2XCJcbiAgICAgICAgICAgICAgICBbbG9ja1N3aXBlc109XCJsb2NrU3dpcGVzXCJcbiAgICAgICAgICAgICAgICBbc3RhcnRIb3VyXT1cInN0YXJ0SG91clwiXG4gICAgICAgICAgICAgICAgW2VuZEhvdXJdPVwiZW5kSG91clwiXG4gICAgICAgICAgICAgICAgW3NsaWRlck9wdGlvbnNdPVwic2xpZGVyT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgKG9uUmFuZ2VDaGFuZ2VkKT1cInJhbmdlQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAob25FdmVudFNlbGVjdGVkKT1cImV2ZW50U2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG9uVGltZVNlbGVjdGVkKT1cInRpbWVTZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAob25UaXRsZUNoYW5nZWQpPVwidGl0bGVDaGFuZ2VkKCRldmVudClcIj5cbiAgICAgICAgICAgIDwvd2Vla3ZpZXc+XG4gICAgICAgICAgICA8ZGF5dmlldyAqbmdTd2l0Y2hDYXNlPVwiJ2RheSdcIlxuICAgICAgICAgICAgICAgIFtmb3JtYXREYXlUaXRsZV09XCJmb3JtYXREYXlUaXRsZVwiXG4gICAgICAgICAgICAgICAgW2Zvcm1hdEhvdXJDb2x1bW5dPVwiZm9ybWF0SG91ckNvbHVtblwiXG4gICAgICAgICAgICAgICAgW2FsbERheUxhYmVsXT1cImFsbERheUxhYmVsXCJcbiAgICAgICAgICAgICAgICBbaG91clBhcnRzXT1cImhvdXJQYXJ0c1wiXG4gICAgICAgICAgICAgICAgW2hvdXJTZWdtZW50c109XCJob3VyU2VnbWVudHNcIlxuICAgICAgICAgICAgICAgIFtldmVudFNvdXJjZV09XCJldmVudFNvdXJjZVwiXG4gICAgICAgICAgICAgICAgW21hcmtEaXNhYmxlZF09XCJtYXJrRGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIFtkYXl2aWV3QWxsRGF5RXZlbnRUZW1wbGF0ZV09XCJkYXl2aWV3QWxsRGF5RXZlbnRUZW1wbGF0ZXx8ZGVmYXVsdEFsbERheUV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtkYXl2aWV3Tm9ybWFsRXZlbnRUZW1wbGF0ZV09XCJkYXl2aWV3Tm9ybWFsRXZlbnRUZW1wbGF0ZXx8ZGVmYXVsdE5vcm1hbEV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtkYXl2aWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVdPVwiZGF5dmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlfHxkZWZhdWx0RGF5Vmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbZGF5dmlld05vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlXT1cImRheXZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZXx8ZGVmYXVsdE5vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbZGF5dmlld0luYWN0aXZlQWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVdPVwiZGF5dmlld0luYWN0aXZlQWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGV8fGRlZmF1bHRJbmFjdGl2ZUFsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbZGF5dmlld0luYWN0aXZlTm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGVdPVwiZGF5dmlld0luYWN0aXZlTm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGV8fGRlZmF1bHRJbmFjdGl2ZU5vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgICAgW2RhdGVGb3JtYXR0ZXJdPVwiZGF0ZUZvcm1hdHRlclwiXG4gICAgICAgICAgICAgICAgW2Rpcl09XCJkaXJcIlxuICAgICAgICAgICAgICAgIFtzY3JvbGxUb0hvdXJdPVwic2Nyb2xsVG9Ib3VyXCJcbiAgICAgICAgICAgICAgICBbcHJlc2VydmVTY3JvbGxQb3NpdGlvbl09XCJwcmVzZXJ2ZVNjcm9sbFBvc2l0aW9uXCJcbiAgICAgICAgICAgICAgICBbbG9ja1N3aXBlVG9QcmV2XT1cImxvY2tTd2lwZVRvUHJldlwiXG4gICAgICAgICAgICAgICAgW2xvY2tTd2lwZXNdPVwibG9ja1N3aXBlc1wiXG4gICAgICAgICAgICAgICAgW3N0YXJ0SG91cl09XCJzdGFydEhvdXJcIlxuICAgICAgICAgICAgICAgIFtlbmRIb3VyXT1cImVuZEhvdXJcIlxuICAgICAgICAgICAgICAgIFtzbGlkZXJPcHRpb25zXT1cInNsaWRlck9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIChvblJhbmdlQ2hhbmdlZCk9XCJyYW5nZUNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG9uRXZlbnRTZWxlY3RlZCk9XCJldmVudFNlbGVjdGVkKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChvblRpbWVTZWxlY3RlZCk9XCJ0aW1lU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG9uVGl0bGVDaGFuZ2VkKT1cInRpdGxlQ2hhbmdlZCgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8L2RheXZpZXc+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCA+IGRpdiB7IGhlaWdodDogMTAwJTsgfVxuXG4gICAgICAgIC5ldmVudC1kZXRhaWwtY29udGFpbmVyIHtcbiAgICAgICAgICBib3JkZXItdG9wOiAycHggZGFya2dyZXkgc29saWQ7XG4gICAgICAgIH1cblxuICAgICAgICAubm8tZXZlbnRzLWxhYmVsIHtcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICBjb2xvcjogZGFya2dyZXk7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLmV2ZW50LWRldGFpbCB7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIH1cblxuICAgICAgICAubW9udGh2aWV3LWV2ZW50ZGV0YWlsLXRpbWVjb2x1bW4ge1xuICAgICAgICAgIHdpZHRoOiAxMTBweDtcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNhbGVuZGFyLWV2ZW50LWlubmVyIHtcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzYTg3YWQ7XG4gICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBwYWRkaW5nOiAycHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDE1cHg7XG4gICAgICAgICAgdGV4dC1hbGlnbjogaW5pdGlhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NTBweCkge1xuICAgICAgICAgIC5jYWxlbmRhci1ldmVudC1pbm5lciB7XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgYF0sXG4gICAgcHJvdmlkZXJzOiBbQ2FsZW5kYXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KClcbiAgICBnZXQgY3VycmVudERhdGUoKTpEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnREYXRlO1xuICAgIH1cblxuICAgIHNldCBjdXJyZW50RGF0ZSh2YWw6RGF0ZSkge1xuICAgICAgICBpZiAoIXZhbCkge1xuICAgICAgICAgICAgdmFsID0gbmV3IERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2N1cnJlbnREYXRlID0gdmFsO1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5zZXRDdXJyZW50RGF0ZSh2YWwsIHRydWUpO1xuICAgICAgICB0aGlzLm9uQ3VycmVudERhdGVDaGFuZ2VkLmVtaXQodGhpcy5fY3VycmVudERhdGUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGV2ZW50U291cmNlOklFdmVudFtdID0gW107XG4gICAgQElucHV0KCkgY2FsZW5kYXJNb2RlOkNhbGVuZGFyTW9kZSA9ICdtb250aCc7XG4gICAgQElucHV0KCkgZm9ybWF0RGF5OnN0cmluZyA9ICdkJztcbiAgICBASW5wdXQoKSBmb3JtYXREYXlIZWFkZXI6c3RyaW5nID0gJ0VFRSc7XG4gICAgQElucHV0KCkgZm9ybWF0RGF5VGl0bGU6c3RyaW5nID0gJ01NTU0gZGQsIHl5eXknO1xuICAgIEBJbnB1dCgpIGZvcm1hdFdlZWtUaXRsZTpzdHJpbmcgPSAnTU1NTSB5eXl5LCBcXCdXZWVrXFwnIHcnO1xuICAgIEBJbnB1dCgpIGZvcm1hdE1vbnRoVGl0bGU6c3RyaW5nID0gJ01NTU0geXl5eSc7XG4gICAgQElucHV0KCkgZm9ybWF0V2Vla1ZpZXdEYXlIZWFkZXI6c3RyaW5nID0gJ0VFRSBkJztcbiAgICBASW5wdXQoKSBmb3JtYXRIb3VyQ29sdW1uOnN0cmluZyA9ICdoYSc7XG4gICAgQElucHV0KCkgc2hvd0V2ZW50RGV0YWlsOmJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHN0YXJ0aW5nRGF5TW9udGg6bnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBzdGFydGluZ0RheVdlZWs6bnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBhbGxEYXlMYWJlbDpzdHJpbmcgPSAnYWxsIGRheSc7XG4gICAgQElucHV0KCkgbm9FdmVudHNMYWJlbDpzdHJpbmcgPSAnTm8gRXZlbnRzJztcbiAgICBASW5wdXQoKSBxdWVyeU1vZGU6UXVlcnlNb2RlID0gJ2xvY2FsJztcbiAgICBASW5wdXQoKSBzdGVwOlN0ZXAgPSBTdGVwLkhvdXI7XG4gICAgQElucHV0KCkgdGltZUludGVydmFsOm51bWJlciA9IDYwO1xuICAgIEBJbnB1dCgpIGF1dG9TZWxlY3Q6Ym9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgbWFya0Rpc2FibGVkOihkYXRlOkRhdGUpID0+IGJvb2xlYW47XG4gICAgQElucHV0KCkgbW9udGh2aWV3RGlzcGxheUV2ZW50VGVtcGxhdGU6VGVtcGxhdGVSZWY8SU1vbnRoVmlld0Rpc3BsYXlFdmVudFRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgbW9udGh2aWV3SW5hY3RpdmVEaXNwbGF5RXZlbnRUZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJTW9udGhWaWV3RGlzcGxheUV2ZW50VGVtcGxhdGVDb250ZXh0PjtcbiAgICBASW5wdXQoKSBtb250aHZpZXdFdmVudERldGFpbFRlbXBsYXRlOlRlbXBsYXRlUmVmPElNb250aFZpZXdFdmVudERldGFpbFRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgd2Vla3ZpZXdIZWFkZXJUZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJRGlzcGxheVdlZWtWaWV3SGVhZGVyPjtcbiAgICBASW5wdXQoKSB3ZWVrdmlld0FsbERheUV2ZW50VGVtcGxhdGU6VGVtcGxhdGVSZWY8SURpc3BsYXlBbGxEYXlFdmVudD47XG4gICAgQElucHV0KCkgd2Vla3ZpZXdOb3JtYWxFdmVudFRlbXBsYXRlOlRlbXBsYXRlUmVmPElEaXNwbGF5RXZlbnQ+O1xuICAgIEBJbnB1dCgpIGRheXZpZXdBbGxEYXlFdmVudFRlbXBsYXRlOlRlbXBsYXRlUmVmPElEaXNwbGF5QWxsRGF5RXZlbnQ+O1xuICAgIEBJbnB1dCgpIGRheXZpZXdOb3JtYWxFdmVudFRlbXBsYXRlOlRlbXBsYXRlUmVmPElEaXNwbGF5RXZlbnQ+O1xuICAgIEBJbnB1dCgpIHdlZWt2aWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGU6VGVtcGxhdGVSZWY8SVdlZWtWaWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVDb250ZXh0PjtcbiAgICBASW5wdXQoKSB3ZWVrdmlld05vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlOlRlbXBsYXRlUmVmPElXZWVrVmlld05vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgZGF5dmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlOlRlbXBsYXRlUmVmPElEYXlWaWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVDb250ZXh0PjtcbiAgICBASW5wdXQoKSBkYXl2aWV3Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGU6VGVtcGxhdGVSZWY8SURheVZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZUNvbnRleHQ+O1xuICAgIEBJbnB1dCgpIHdlZWt2aWV3SW5hY3RpdmVBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJV2Vla1ZpZXdBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZUNvbnRleHQ+O1xuICAgIEBJbnB1dCgpIHdlZWt2aWV3SW5hY3RpdmVOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJV2Vla1ZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZUNvbnRleHQ+O1xuICAgIEBJbnB1dCgpIGRheXZpZXdJbmFjdGl2ZUFsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlOlRlbXBsYXRlUmVmPElEYXlWaWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVDb250ZXh0PjtcbiAgICBASW5wdXQoKSBkYXl2aWV3SW5hY3RpdmVOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJRGF5Vmlld05vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgZGF0ZUZvcm1hdHRlcjpJRGF0ZUZvcm1hdHRlcjtcbiAgICBASW5wdXQoKSBkaXI6c3RyaW5nID0gXCJcIjtcbiAgICBASW5wdXQoKSBzY3JvbGxUb0hvdXI6bnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBwcmVzZXJ2ZVNjcm9sbFBvc2l0aW9uOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBsb2NrU3dpcGVUb1ByZXY6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGxvY2tTd2lwZXM6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGxvY2FsZTpzdHJpbmcgPSBcIlwiO1xuICAgIEBJbnB1dCgpIHN0YXJ0SG91cjpudW1iZXIgPSAwO1xuICAgIEBJbnB1dCgpIGVuZEhvdXI6bnVtYmVyID0gMjQ7XG4gICAgQElucHV0KCkgc2xpZGVyT3B0aW9uczphbnk7XG5cbiAgICBAT3V0cHV0KCkgb25DdXJyZW50RGF0ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG4gICAgQE91dHB1dCgpIG9uUmFuZ2VDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxJUmFuZ2U+KCk7XG4gICAgQE91dHB1dCgpIG9uRXZlbnRTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBvblRpbWVTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SVRpbWVTZWxlY3RlZD4oKTtcbiAgICBAT3V0cHV0KCkgb25UaXRsZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIHByaXZhdGUgX2N1cnJlbnREYXRlOkRhdGU7XG4gICAgcHVibGljIGhvdXJQYXJ0cyA9IDE7XG4gICAgcHVibGljIGhvdXJTZWdtZW50cyA9IDE7XG4gICAgcHJpdmF0ZSBjdXJyZW50RGF0ZUNoYW5nZWRGcm9tQ2hpbGRyZW5TdWJzY3JpcHRpb246U3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYWxlbmRhclNlcnZpY2U6Q2FsZW5kYXJTZXJ2aWNlLCBASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBhcHBMb2NhbGU6c3RyaW5nKSB7XG4gICAgICAgIHRoaXMubG9jYWxlID0gYXBwTG9jYWxlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvU2VsZWN0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvU2VsZWN0LnRvU3RyaW5nKCkgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9TZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvU2VsZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvdXJTZWdtZW50cyA9IDYwIC8gdGhpcy50aW1lSW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuaG91clBhcnRzID0gNjAgLyB0aGlzLnN0ZXA7XG4gICAgICAgIGlmKHRoaXMuaG91clBhcnRzIDw9IHRoaXMuaG91clNlZ21lbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmhvdXJQYXJ0cyA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhvdXJQYXJ0cyA9IHRoaXMuaG91clBhcnRzIC8gdGhpcy5ob3VyU2VnbWVudHM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGFydEhvdXIgPSBwYXJzZUludCh0aGlzLnN0YXJ0SG91ci50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5lbmRIb3VyID0gcGFyc2VJbnQodGhpcy5lbmRIb3VyLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5xdWVyeU1vZGUgPSB0aGlzLnF1ZXJ5TW9kZTtcblxuICAgICAgICB0aGlzLmN1cnJlbnREYXRlQ2hhbmdlZEZyb21DaGlsZHJlblN1YnNjcmlwdGlvbiA9IHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmN1cnJlbnREYXRlQ2hhbmdlZEZyb21DaGlsZHJlbiQuc3Vic2NyaWJlKGN1cnJlbnREYXRlID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnREYXRlID0gY3VycmVudERhdGU7XG4gICAgICAgICAgICB0aGlzLm9uQ3VycmVudERhdGVDaGFuZ2VkLmVtaXQoY3VycmVudERhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudERhdGVDaGFuZ2VkRnJvbUNoaWxkcmVuU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlQ2hhbmdlZEZyb21DaGlsZHJlblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUNoYW5nZWRGcm9tQ2hpbGRyZW5TdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmFuZ2VDaGFuZ2VkKHJhbmdlOklSYW5nZSkge1xuICAgICAgICB0aGlzLm9uUmFuZ2VDaGFuZ2VkLmVtaXQocmFuZ2UpO1xuICAgIH1cblxuICAgIGV2ZW50U2VsZWN0ZWQoZXZlbnQ6SUV2ZW50KSB7XG4gICAgICAgIHRoaXMub25FdmVudFNlbGVjdGVkLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIHRpbWVTZWxlY3RlZCh0aW1lU2VsZWN0ZWQ6SVRpbWVTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLm9uVGltZVNlbGVjdGVkLmVtaXQodGltZVNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICB0aXRsZUNoYW5nZWQodGl0bGU6c3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25UaXRsZUNoYW5nZWQuZW1pdCh0aXRsZSk7XG4gICAgfVxuXG4gICAgbG9hZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UubG9hZEV2ZW50cygpO1xuICAgIH1cblxuICAgIHNsaWRlTmV4dCgpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2Uuc2xpZGUoMSk7XG4gICAgfVxuXG4gICAgc2xpZGVQcmV2KCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5zbGlkZSgtMSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS51cGRhdGUoKTtcbiAgICB9XG59XG4iXX0=