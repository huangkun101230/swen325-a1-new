var MonthViewComponent_1;
import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalendarService } from './calendar.service';
let MonthViewComponent = MonthViewComponent_1 = class MonthViewComponent {
    constructor(calendarService) {
        this.calendarService = calendarService;
        this.autoSelect = true;
        this.dir = '';
        this.onRangeChanged = new EventEmitter();
        this.onEventSelected = new EventEmitter();
        this.onTimeSelected = new EventEmitter(true);
        this.onTitleChanged = new EventEmitter(true);
        this.views = [];
        this.currentViewIndex = 0;
        this.mode = 'month';
        this.direction = 0;
        this.moveOnSelected = false;
        this.inited = false;
        this.callbackOnInit = true;
    }
    ;
    static getDates(startDate, n) {
        const dates = new Array(n), current = new Date(startDate.getTime());
        let i = 0;
        while (i < n) {
            dates[i++] = new Date(current.getTime());
            current.setDate(current.getDate() + 1);
        }
        return dates;
    }
    ngOnInit() {
        if (!this.sliderOptions) {
            this.sliderOptions = {};
        }
        this.sliderOptions.loop = true;
        if (this.dateFormatter && this.dateFormatter.formatMonthViewDay) {
            this.formatDayLabel = this.dateFormatter.formatMonthViewDay;
        }
        else {
            const dayLabelDatePipe = new DatePipe('en-US');
            this.formatDayLabel = function (date) {
                return dayLabelDatePipe.transform(date, this.formatDay);
            };
        }
        if (this.dateFormatter && this.dateFormatter.formatMonthViewDayHeader) {
            this.formatDayHeaderLabel = this.dateFormatter.formatMonthViewDayHeader;
        }
        else {
            const datePipe = new DatePipe(this.locale);
            this.formatDayHeaderLabel = function (date) {
                return datePipe.transform(date, this.formatDayHeader);
            };
        }
        if (this.dateFormatter && this.dateFormatter.formatMonthViewTitle) {
            this.formatTitle = this.dateFormatter.formatMonthViewTitle;
        }
        else {
            const datePipe = new DatePipe(this.locale);
            this.formatTitle = function (date) {
                return datePipe.transform(date, this.formatMonthTitle);
            };
        }
        if (this.lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(true);
        }
        if (this.lockSwipes) {
            this.slider.lockSwipes(true);
        }
        this.refreshView();
        this.inited = true;
        this.currentDateChangedFromParentSubscription = this.calendarService.currentDateChangedFromParent$.subscribe(currentDate => {
            this.refreshView();
        });
        this.eventSourceChangedSubscription = this.calendarService.eventSourceChanged$.subscribe(() => {
            this.onDataLoaded();
        });
        this.slideChangedSubscription = this.calendarService.slideChanged$.subscribe(direction => {
            if (direction === 1) {
                this.slider.slideNext();
            }
            else if (direction === -1) {
                this.slider.slidePrev();
            }
        });
        this.slideUpdatedSubscription = this.calendarService.slideUpdated$.subscribe(() => {
            this.slider.update();
        });
    }
    ngOnDestroy() {
        if (this.currentDateChangedFromParentSubscription) {
            this.currentDateChangedFromParentSubscription.unsubscribe();
            this.currentDateChangedFromParentSubscription = null;
        }
        if (this.eventSourceChangedSubscription) {
            this.eventSourceChangedSubscription.unsubscribe();
            this.eventSourceChangedSubscription = null;
        }
        if (this.slideChangedSubscription) {
            this.slideChangedSubscription.unsubscribe();
            this.slideChangedSubscription = null;
        }
        if (this.slideUpdatedSubscription) {
            this.slideUpdatedSubscription.unsubscribe();
            this.slideUpdatedSubscription = null;
        }
    }
    ngOnChanges(changes) {
        if (!this.inited) {
            return;
        }
        const eventSourceChange = changes.eventSource;
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }
        const lockSwipeToPrev = changes.lockSwipeToPrev;
        if (lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(lockSwipeToPrev.currentValue);
        }
        const lockSwipes = changes.lockSwipes;
        if (lockSwipes) {
            this.slider.lockSwipes(lockSwipes.currentValue);
        }
    }
    ngAfterViewInit() {
        const title = this.getTitle();
        this.onTitleChanged.emit(title);
    }
    onSlideChanged() {
        if (this.callbackOnInit) {
            this.callbackOnInit = false;
            return;
        }
        let direction = 0;
        const currentViewIndex = this.currentViewIndex;
        this.slider.getActiveIndex().then((currentSlideIndex) => {
            currentSlideIndex = (currentSlideIndex + 2) % 3;
            if (isNaN(currentSlideIndex)) {
                currentSlideIndex = currentViewIndex;
            }
            if (currentSlideIndex - currentViewIndex === 1) {
                direction = 1;
            }
            else if (currentSlideIndex === 0 && currentViewIndex === 2) {
                direction = 1;
                this.slider.slideTo(1, 0, false);
            }
            else if (currentViewIndex - currentSlideIndex === 1) {
                direction = -1;
            }
            else if (currentSlideIndex === 2 && currentViewIndex === 0) {
                direction = -1;
                this.slider.slideTo(3, 0, false);
            }
            this.currentViewIndex = currentSlideIndex;
            this.move(direction);
        });
    }
    move(direction) {
        if (direction === 0) {
            return;
        }
        this.direction = direction;
        if (!this.moveOnSelected) {
            const adjacentDate = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
            this.calendarService.setCurrentDate(adjacentDate);
        }
        this.refreshView();
        this.direction = 0;
        this.moveOnSelected = false;
    }
    createDateObject(date) {
        let disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(date);
        }
        return {
            date,
            events: [],
            label: this.formatDayLabel(date),
            secondary: false,
            disabled
        };
    }
    getViewData(startTime) {
        const startDate = startTime, date = startDate.getDate(), month = (startDate.getMonth() + (date !== 1 ? 1 : 0)) % 12;
        const dates = MonthViewComponent_1.getDates(startDate, 42);
        const days = [];
        for (let i = 0; i < 42; i++) {
            const dateObject = this.createDateObject(dates[i]);
            dateObject.secondary = dates[i].getMonth() !== month;
            days[i] = dateObject;
        }
        const dayHeaders = [];
        for (let i = 0; i < 7; i++) {
            dayHeaders.push(this.formatDayHeaderLabel(days[i].date));
        }
        return {
            dates: days,
            dayHeaders
        };
    }
    getHighlightClass(date) {
        let className = '';
        if (date.hasEvent) {
            if (date.secondary) {
                className = 'monthview-secondary-with-event';
            }
            else {
                className = 'monthview-primary-with-event';
            }
        }
        if (date.selected) {
            if (className) {
                className += ' ';
            }
            className += 'monthview-selected';
        }
        if (date.current) {
            if (className) {
                className += ' ';
            }
            className += 'monthview-current';
        }
        if (date.secondary) {
            if (className) {
                className += ' ';
            }
            className += 'text-muted';
        }
        if (date.disabled) {
            if (className) {
                className += ' ';
            }
            className += 'monthview-disabled';
        }
        return className;
    }
    getRange(currentDate) {
        const year = currentDate.getFullYear(), month = currentDate.getMonth(), firstDayOfMonth = new Date(year, month, 1, 12, 0, 0), // set hour to 12 to avoid DST problem
        difference = this.startingDayMonth - firstDayOfMonth.getDay(), numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference, startDate = new Date(firstDayOfMonth.getTime());
        if (numDisplayedFromPreviousMonth > 0) {
            startDate.setDate(-numDisplayedFromPreviousMonth + 1);
        }
        const endDate = new Date(startDate.getTime());
        endDate.setDate(endDate.getDate() + 42);
        return {
            startTime: startDate,
            endTime: endDate
        };
    }
    onDataLoaded() {
        const range = this.range, eventSource = this.eventSource, len = eventSource ? eventSource.length : 0, startTime = range.startTime, endTime = range.endTime, utcStartTime = Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate()), utcEndTime = Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate()), currentViewIndex = this.currentViewIndex, dates = this.views[currentViewIndex].dates, oneDay = 86400000, eps = 0.0006;
        for (let r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].hasEvent = false;
                dates[r].events = [];
            }
        }
        for (let i = 0; i < len; i += 1) {
            const event = eventSource[i], eventStartTime = event.startTime, eventEndTime = event.endTime;
            let eventUTCStartTime, eventUTCEndTime;
            if (event.allDay) {
                eventUTCStartTime = eventStartTime.getTime();
                eventUTCEndTime = eventEndTime.getTime();
            }
            else {
                eventUTCStartTime = Date.UTC(eventStartTime.getFullYear(), eventStartTime.getMonth(), eventStartTime.getDate());
                eventUTCEndTime = Date.UTC(eventEndTime.getFullYear(), eventEndTime.getMonth(), eventEndTime.getDate() + 1);
            }
            if (eventUTCEndTime <= utcStartTime || eventUTCStartTime >= utcEndTime) {
                continue;
            }
            let timeDifferenceStart, timeDifferenceEnd;
            if (eventUTCStartTime < utcStartTime) {
                timeDifferenceStart = 0;
            }
            else {
                timeDifferenceStart = (eventUTCStartTime - utcStartTime) / oneDay;
            }
            if (eventUTCEndTime > utcEndTime) {
                timeDifferenceEnd = (utcEndTime - utcStartTime) / oneDay;
            }
            else {
                timeDifferenceEnd = (eventUTCEndTime - utcStartTime) / oneDay;
            }
            let index = Math.floor(timeDifferenceStart);
            const endIndex = Math.ceil(timeDifferenceEnd - eps);
            while (index < endIndex) {
                dates[index].hasEvent = true;
                let eventSet = dates[index].events;
                if (eventSet) {
                    eventSet.push(event);
                }
                else {
                    eventSet = [];
                    eventSet.push(event);
                    dates[index].events = eventSet;
                }
                index += 1;
            }
        }
        for (let r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].events.sort(this.compareEvent);
            }
        }
        if (this.autoSelect) {
            let findSelected = false;
            for (let r = 0; r < 42; r += 1) {
                if (dates[r].selected) {
                    this.selectedDate = dates[r];
                    findSelected = true;
                    break;
                }
            }
            if (findSelected) {
                this.onTimeSelected.emit({
                    selectedTime: this.selectedDate.date,
                    events: this.selectedDate.events,
                    disabled: this.selectedDate.disabled
                });
            }
        }
    }
    refreshView() {
        this.range = this.getRange(this.calendarService.currentDate);
        if (this.inited) {
            const title = this.getTitle();
            this.onTitleChanged.emit(title);
        }
        this.calendarService.populateAdjacentViews(this);
        this.updateCurrentView(this.range.startTime, this.views[this.currentViewIndex]);
        this.calendarService.rangeChanged(this);
    }
    getTitle() {
        const currentViewStartDate = this.range.startTime, date = currentViewStartDate.getDate(), month = (currentViewStartDate.getMonth() + (date !== 1 ? 1 : 0)) % 12, year = currentViewStartDate.getFullYear() + (date !== 1 && month === 0 ? 1 : 0), headerDate = new Date(year, month, 1, 12, 0, 0, 0);
        return this.formatTitle(headerDate);
    }
    compareEvent(event1, event2) {
        if (event1.allDay) {
            return 1;
        }
        else if (event2.allDay) {
            return -1;
        }
        else {
            return (event1.startTime.getTime() - event2.startTime.getTime());
        }
    }
    select(viewDate) {
        if (!this.views) {
            return;
        }
        const selectedDate = viewDate.date, events = viewDate.events;
        if (!viewDate.disabled) {
            const dates = this.views[this.currentViewIndex].dates, currentCalendarDate = this.calendarService.currentDate, currentMonth = currentCalendarDate.getMonth(), currentYear = currentCalendarDate.getFullYear(), selectedMonth = selectedDate.getMonth(), selectedYear = selectedDate.getFullYear();
            let direction = 0;
            if (currentYear === selectedYear) {
                if (currentMonth !== selectedMonth) {
                    direction = currentMonth < selectedMonth ? 1 : -1;
                }
            }
            else {
                direction = currentYear < selectedYear ? 1 : -1;
            }
            this.calendarService.setCurrentDate(selectedDate);
            if (direction === 0) {
                const currentViewStartDate = this.range.startTime, oneDay = 86400000, selectedDayDifference = Math.round((Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay);
                for (let r = 0; r < 42; r += 1) {
                    dates[r].selected = false;
                }
                if (selectedDayDifference >= 0 && selectedDayDifference < 42) {
                    dates[selectedDayDifference].selected = true;
                    this.selectedDate = dates[selectedDayDifference];
                }
            }
            else {
                this.moveOnSelected = true;
                this.slideView(direction);
            }
        }
        this.onTimeSelected.emit({ selectedTime: selectedDate, events, disabled: viewDate.disabled });
    }
    slideView(direction) {
        if (direction === 1) {
            this.slider.slideNext();
        }
        else if (direction === -1) {
            this.slider.slidePrev();
        }
    }
    updateCurrentView(currentViewStartDate, view) {
        const currentCalendarDate = this.calendarService.currentDate, today = new Date(), oneDay = 86400000, selectedDayDifference = Math.round((Date.UTC(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), currentCalendarDate.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay), currentDayDifference = Math.round((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay);
        for (let r = 0; r < 42; r += 1) {
            view.dates[r].selected = false;
        }
        if (selectedDayDifference >= 0 && selectedDayDifference < 42 && !view.dates[selectedDayDifference].disabled && (this.autoSelect || this.moveOnSelected)) {
            view.dates[selectedDayDifference].selected = true;
            this.selectedDate = view.dates[selectedDayDifference];
        }
        else {
            this.selectedDate = {
                date: null,
                events: [],
                label: null,
                secondary: null,
                disabled: false
            };
        }
        if (currentDayDifference >= 0 && currentDayDifference < 42) {
            view.dates[currentDayDifference].current = true;
        }
    }
    eventSelected(event) {
        this.onEventSelected.emit(event);
    }
};
MonthViewComponent.ctorParameters = () => [
    { type: CalendarService }
];
__decorate([
    ViewChild('monthSlider', { static: true })
], MonthViewComponent.prototype, "slider", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "monthviewDisplayEventTemplate", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "monthviewInactiveDisplayEventTemplate", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "monthviewEventDetailTemplate", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "formatDay", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "formatDayHeader", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "formatMonthTitle", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "eventSource", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "startingDayMonth", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "showEventDetail", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "noEventsLabel", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "autoSelect", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "markDisabled", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "locale", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "dateFormatter", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "dir", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "lockSwipeToPrev", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "lockSwipes", void 0);
__decorate([
    Input()
], MonthViewComponent.prototype, "sliderOptions", void 0);
__decorate([
    Output()
], MonthViewComponent.prototype, "onRangeChanged", void 0);
__decorate([
    Output()
], MonthViewComponent.prototype, "onEventSelected", void 0);
__decorate([
    Output()
], MonthViewComponent.prototype, "onTimeSelected", void 0);
__decorate([
    Output()
], MonthViewComponent.prototype, "onTitleChanged", void 0);
MonthViewComponent = MonthViewComponent_1 = __decorate([
    Component({
        selector: 'monthview',
        template: `
        <div>
            <ion-slides #monthSlider [options]="sliderOptions" [dir]="dir" (ionSlideDidChange)="onSlideChanged()">
                <ion-slide>
                    <table *ngIf="0===currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr>
                            <th *ngFor="let dayHeader of views[0].dayHeaders">
                                <small>{{dayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td *ngFor="let col of [0,1,2,3,4,5,6]" tappable (click)="select(views[0].dates[row*7+col])"
                                [ngClass]="getHighlightClass(views[0].dates[row*7+col])">
                                <ng-template [ngTemplateOutlet]="monthviewDisplayEventTemplate"
                                             [ngTemplateOutletContext]="{view: views[0], row: row, col: col}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table *ngIf="0!==currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr class="text-center">
                            <th *ngFor="let dayHeader of views[0].dayHeaders">
                                <small>{{dayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td *ngFor="let col of [0,1,2,3,4,5,6]">
                                <ng-template [ngTemplateOutlet]="monthviewInactiveDisplayEventTemplate"
                                             [ngTemplateOutletContext]="{view: views[0], row: row, col: col}">
                                </ng-template>
                            </td>
                        <tr>
                        </tbody>
                    </table>
                </ion-slide>
                <ion-slide>
                    <table *ngIf="1===currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr>
                            <th *ngFor="let dayHeader of views[1].dayHeaders">
                                <small>{{dayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td *ngFor="let col of [0,1,2,3,4,5,6]" tappable (click)="select(views[1].dates[row*7+col])"
                                [ngClass]="getHighlightClass(views[1].dates[row*7+col])">
                                <ng-template [ngTemplateOutlet]="monthviewDisplayEventTemplate"
                                             [ngTemplateOutletContext]="{view: views[1], row: row, col: col}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table *ngIf="1!==currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr class="text-center">
                            <th *ngFor="let dayHeader of views[1].dayHeaders">
                                <small>{{dayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td *ngFor="let col of [0,1,2,3,4,5,6]">
                                <ng-template [ngTemplateOutlet]="monthviewInactiveDisplayEventTemplate"
                                             [ngTemplateOutletContext]="{view: views[1], row: row, col: col}">
                                </ng-template>
                            </td>
                        <tr>
                        </tbody>
                    </table>
                </ion-slide>
                <ion-slide>
                    <table *ngIf="2===currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr>
                            <th *ngFor="let dayHeader of views[2].dayHeaders">
                                <small>{{dayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td *ngFor="let col of [0,1,2,3,4,5,6]" tappable (click)="select(views[2].dates[row*7+col])"
                                [ngClass]="getHighlightClass(views[2].dates[row*7+col])">
                                <ng-template [ngTemplateOutlet]="monthviewDisplayEventTemplate"
                                             [ngTemplateOutletContext]="{view: views[2], row: row, col: col}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table *ngIf="2!==currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr class="text-center">
                            <th *ngFor="let dayHeader of views[2].dayHeaders">
                                <small>{{dayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td *ngFor="let col of [0,1,2,3,4,5,6]">
                                <ng-template [ngTemplateOutlet]="monthviewInactiveDisplayEventTemplate"
                                             [ngTemplateOutletContext]="{view: views[2], row: row, col: col}">
                                </ng-template>
                            </td>
                        <tr>
                        </tbody>
                    </table>
                </ion-slide>
            </ion-slides>
            <ng-template [ngTemplateOutlet]="monthviewEventDetailTemplate"
                         [ngTemplateOutletContext]="{showEventDetail:showEventDetail, selectedDate: selectedDate, noEventsLabel: noEventsLabel}">
            </ng-template>
        </div>
    `,
        styles: [`
        .text-muted {
            color: #999;
        }

        .table-fixed {
            table-layout: fixed;
        }

        .table {
            width: 100%;
            max-width: 100%;
            background-color: transparent;
        }

        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td,
        .table > tbody > tr > td, .table > tfoot > tr > td {
            padding: 8px;
            line-height: 20px;
            vertical-align: top;
        }

        .table > thead > tr > th {
            vertical-align: bottom;
            border-bottom: 2px solid #ddd;
        }

        .table > thead:first-child > tr:first-child > th, .table > thead:first-child > tr:first-child > td {
            border-top: 0
        }

        .table > tbody + tbody {
            border-top: 2px solid #ddd;
        }

        .table-bordered {
            border: 1px solid #ddd;
        }

        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th,
        .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
            border: 1px solid #ddd;
        }

        .table-bordered > thead > tr > th, .table-bordered > thead > tr > td {
            border-bottom-width: 2px;
        }

        .table-striped > tbody > tr:nth-child(odd) > td, .table-striped > tbody > tr:nth-child(odd) > th {
            background-color: #f9f9f9
        }

        .monthview-primary-with-event {
            background-color: #3a87ad;
            color: white;
        }

        .monthview-current {
            background-color: #f0f0f0;
        }

        .monthview-selected {
            background-color: #009900;
            color: white;
        }

        .monthview-datetable td.monthview-disabled {
            color: lightgrey;
            cursor: default;
        }

        .monthview-datetable th {
            text-align: center;
        }

        .monthview-datetable td {
            cursor: pointer;
            text-align: center;
        }

        .monthview-secondary-with-event {
            background-color: #d9edf7;
        }

        ::-webkit-scrollbar,
        *::-webkit-scrollbar {
            display: none;
        }
    `]
    })
], MonthViewComponent);
export { MonthViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGh2aWV3LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW9uaWMyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9udGh2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFHVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFFWixTQUFTLEVBSVosTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBSXpDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQTZObkQsSUFBYSxrQkFBa0IsMEJBQS9CLE1BQWEsa0JBQWtCO0lBRTNCLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQWlCM0MsZUFBVSxHQUFHLElBQUksQ0FBQztRQUlsQixRQUFHLEdBQUcsRUFBRSxDQUFDO1FBS1IsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzVDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM3QyxtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUN2RCxtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFTLElBQUksQ0FBQyxDQUFDO1FBRW5ELFVBQUssR0FBaUIsRUFBRSxDQUFDO1FBQ3pCLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUdyQixTQUFJLEdBQWlCLE9BQU8sQ0FBQztRQUM3QixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLG1CQUFjLEdBQUcsSUFBSSxDQUFDO0lBdkM5QixDQUFDO0lBQ0QsQ0FBQztJQWlERCxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQWUsRUFBRSxDQUFTO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUN0QixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1YsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixFQUFFO1lBQzdELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztTQUMvRDthQUFNO1lBQ0gsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVMsSUFBVTtnQkFDckMsT0FBTyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUM7U0FDTDtRQUVELElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixFQUFFO1lBQ25FLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDO1NBQzNFO2FBQU07WUFDSCxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFVBQVMsSUFBVTtnQkFDM0MsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDO1NBQ0w7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsRUFBRTtZQUMvRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7U0FDOUQ7YUFBTTtZQUNILE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVMsSUFBVTtnQkFDbEMsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUM7U0FDTDtRQUVELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQztRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztRQUVELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLENBQUMsd0NBQXdDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyw2QkFBNkIsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdkgsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLDhCQUE4QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMxRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3JGLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUMzQjtpQkFBTSxJQUFJLFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUMzQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDOUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsd0NBQXdDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVELElBQUksQ0FBQyx3Q0FBd0MsR0FBRyxJQUFJLENBQUM7U0FDeEQ7UUFFRCxJQUFJLElBQUksQ0FBQyw4QkFBOEIsRUFBRTtZQUNyQyxJQUFJLENBQUMsOEJBQThCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLDhCQUE4QixHQUFHLElBQUksQ0FBQztTQUM5QztRQUVELElBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQy9CLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsT0FBTztTQUNWO1FBRUQsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQzlDLElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsWUFBWSxFQUFFO1lBQ3JELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtRQUVELE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUM7UUFDaEQsSUFBSSxlQUFlLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdEO1FBRUQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFJLFVBQVUsRUFBRTtZQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzVCLE9BQU87U0FDVjtRQUVELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUUvQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDcEQsaUJBQWlCLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEQsSUFBRyxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDekIsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7YUFDeEM7WUFFRCxJQUFJLGlCQUFpQixHQUFHLGdCQUFnQixLQUFLLENBQUMsRUFBRTtnQkFDNUMsU0FBUyxHQUFHLENBQUMsQ0FBQzthQUNqQjtpQkFBTSxJQUFJLGlCQUFpQixLQUFLLENBQUMsSUFBSSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUU7Z0JBQzFELFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNwQztpQkFBTSxJQUFJLGdCQUFnQixHQUFHLGlCQUFpQixLQUFLLENBQUMsRUFBRTtnQkFDbkQsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2xCO2lCQUFNLElBQUksaUJBQWlCLEtBQUssQ0FBQyxJQUFJLGdCQUFnQixLQUFLLENBQUMsRUFBRTtnQkFDMUQsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDcEM7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUM7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJLENBQUMsU0FBaUI7UUFDbEIsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsSUFBVTtRQUN2QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsT0FBTztZQUNILElBQUk7WUFDSixNQUFNLEVBQUUsRUFBRTtZQUNWLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztZQUNoQyxTQUFTLEVBQUUsS0FBSztZQUNoQixRQUFRO1NBQ1gsQ0FBQztJQUNOLENBQUM7SUFFRCxXQUFXLENBQUMsU0FBZTtRQUN2QixNQUFNLFNBQVMsR0FBRyxTQUFTLEVBQ3ZCLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQzFCLEtBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFL0QsTUFBTSxLQUFLLEdBQUcsb0JBQWtCLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RCxNQUFNLElBQUksR0FBb0IsRUFBRSxDQUFDO1FBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELFVBQVUsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO1NBQ3hCO1FBRUQsTUFBTSxVQUFVLEdBQWEsRUFBRSxDQUFDO1FBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUk7WUFDWCxVQUFVO1NBQ2IsQ0FBQztJQUNOLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxJQUFtQjtRQUNqQyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNoQixTQUFTLEdBQUcsZ0NBQWdDLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0gsU0FBUyxHQUFHLDhCQUE4QixDQUFDO2FBQzlDO1NBQ0o7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLFNBQVMsRUFBRTtnQkFDWCxTQUFTLElBQUksR0FBRyxDQUFDO2FBQ3BCO1lBQ0QsU0FBUyxJQUFJLG9CQUFvQixDQUFDO1NBQ3JDO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxTQUFTLEVBQUU7Z0JBQ1gsU0FBUyxJQUFJLEdBQUcsQ0FBQzthQUNwQjtZQUNELFNBQVMsSUFBSSxtQkFBbUIsQ0FBQztTQUNwQztRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLFNBQVMsRUFBRTtnQkFDWCxTQUFTLElBQUksR0FBRyxDQUFDO2FBQ3BCO1lBQ0QsU0FBUyxJQUFJLFlBQVksQ0FBQztTQUM3QjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksU0FBUyxFQUFFO2dCQUNYLFNBQVMsSUFBSSxHQUFHLENBQUM7YUFDcEI7WUFDRCxTQUFTLElBQUksb0JBQW9CLENBQUM7U0FDckM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUSxDQUFDLFdBQWlCO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsRUFDbEMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFDOUIsZUFBZSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsc0NBQXNDO1FBRTVGLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxFQUM3RCw2QkFBNkIsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQy9FLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVwRCxJQUFJLDZCQUE2QixHQUFHLENBQUMsRUFBRTtZQUNuQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsNkJBQTZCLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDekQ7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUM5QyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUV4QyxPQUFPO1lBQ0gsU0FBUyxFQUFFLFNBQVM7WUFDcEIsT0FBTyxFQUFFLE9BQU87U0FDbkIsQ0FBQztJQUNOLENBQUM7SUFFRCxZQUFZO1FBQ1IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDcEIsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQzlCLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDMUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQzNCLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxFQUN2QixZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUMzRixVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUNuRixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQ3hDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxFQUMxQyxNQUFNLEdBQUcsUUFBUSxFQUNqQixHQUFHLEdBQUcsTUFBTSxDQUFDO1FBRWpCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzthQUN4QjtTQUNKO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdCLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDeEIsY0FBYyxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQ2hDLFlBQVksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBRWpDLElBQUksaUJBQXlCLEVBQ3pCLGVBQXVCLENBQUM7WUFDNUIsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNkLGlCQUFpQixHQUFHLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDN0MsZUFBZSxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUM1QztpQkFBTTtnQkFDSCxpQkFBaUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxjQUFjLENBQUMsUUFBUSxFQUFFLEVBQUUsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ2hILGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQy9HO1lBRUQsSUFBSSxlQUFlLElBQUksWUFBWSxJQUFJLGlCQUFpQixJQUFJLFVBQVUsRUFBRTtnQkFDcEUsU0FBUzthQUNaO1lBRUQsSUFBSSxtQkFBMkIsRUFDM0IsaUJBQXlCLENBQUM7WUFFOUIsSUFBSSxpQkFBaUIsR0FBRyxZQUFZLEVBQUU7Z0JBQ2xDLG1CQUFtQixHQUFHLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDSCxtQkFBbUIsR0FBRyxDQUFDLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQzthQUNyRTtZQUVELElBQUksZUFBZSxHQUFHLFVBQVUsRUFBRTtnQkFDOUIsaUJBQWlCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLEdBQUcsTUFBTSxDQUFDO2FBQzVEO2lCQUFNO2dCQUNILGlCQUFpQixHQUFHLENBQUMsZUFBZSxHQUFHLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQzthQUNqRTtZQUVELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM1QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sS0FBSyxHQUFHLFFBQVEsRUFBRTtnQkFDckIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQzdCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ25DLElBQUksUUFBUSxFQUFFO29CQUNWLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3hCO3FCQUFNO29CQUNILFFBQVEsR0FBRyxFQUFFLENBQUM7b0JBQ2QsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7aUJBQ2xDO2dCQUNELEtBQUssSUFBSSxDQUFDLENBQUM7YUFDZDtTQUNKO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO29CQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDcEIsTUFBTTtpQkFDVDthQUNKO1lBRUQsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7b0JBQ3JCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUk7b0JBQ3BDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU07b0JBQ2hDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVE7aUJBQ3ZDLENBQUMsQ0FBQzthQUNOO1NBQ0o7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTdELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsUUFBUTtRQUNKLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQzdDLElBQUksR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsRUFDckMsS0FBSyxHQUFHLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUNyRSxJQUFJLEdBQUcsb0JBQW9CLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQy9FLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVPLFlBQVksQ0FBQyxNQUFjLEVBQUUsTUFBYztRQUMvQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLENBQUMsQ0FBQztTQUNaO2FBQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDYjthQUFNO1lBQ0gsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQ3BFO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUF1QjtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNiLE9BQU87U0FDVjtRQUVELE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQzlCLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRTdCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQ3BCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxFQUNqRCxtQkFBbUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFDdEQsWUFBWSxHQUFHLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxFQUM3QyxXQUFXLEdBQUcsbUJBQW1CLENBQUMsV0FBVyxFQUFFLEVBQy9DLGFBQWEsR0FBRyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQ3ZDLFlBQVksR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBRWxCLElBQUksV0FBVyxLQUFLLFlBQVksRUFBRTtnQkFDOUIsSUFBSSxZQUFZLEtBQUssYUFBYSxFQUFFO29CQUNoQyxTQUFTLEdBQUcsWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDckQ7YUFDSjtpQkFBTTtnQkFDSCxTQUFTLEdBQUcsV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuRDtZQUVELElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2xELElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtnQkFDakIsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDN0MsTUFBTSxHQUFHLFFBQVEsRUFDakIscUJBQXFCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxFQUFFLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxFQUFFLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztnQkFFelAsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM1QixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztpQkFDN0I7Z0JBRUQsSUFBSSxxQkFBcUIsSUFBSSxDQUFDLElBQUkscUJBQXFCLEdBQUcsRUFBRSxFQUFFO29CQUMxRCxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2lCQUNwRDthQUNKO2lCQUFNO2dCQUNILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0o7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRUQsU0FBUyxDQUFDLFNBQWlCO1FBQ3ZCLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzNCO2FBQU0sSUFBSSxTQUFTLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxvQkFBMEIsRUFBRSxJQUFnQjtRQUMxRCxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUN4RCxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFDbEIsTUFBTSxHQUFHLFFBQVEsRUFDakIscUJBQXFCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLEVBQUUsbUJBQW1CLENBQUMsUUFBUSxFQUFFLEVBQUUsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxFQUFFLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxFQUFFLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsRUFDelEsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxFQUFFLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxFQUFFLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUVuTyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxxQkFBcUIsSUFBSSxDQUFDLElBQUkscUJBQXFCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3JKLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2xELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQ3pEO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHO2dCQUNoQixJQUFJLEVBQUUsSUFBSTtnQkFDVixNQUFNLEVBQUUsRUFBRTtnQkFDVixLQUFLLEVBQUUsSUFBSTtnQkFDWCxTQUFTLEVBQUUsSUFBSTtnQkFDZixRQUFRLEVBQUUsS0FBSzthQUNsQixDQUFDO1NBQ0w7UUFFRCxJQUFJLG9CQUFvQixJQUFJLENBQUMsSUFBSSxvQkFBb0IsR0FBRyxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDbkQ7SUFDTCxDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQWE7UUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNKLENBQUE7O1lBemhCd0MsZUFBZTs7QUFJVjtJQUF6QyxTQUFTLENBQUMsYUFBYSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO2tEQUFtQjtBQUVuRDtJQUFSLEtBQUssRUFBRTt5RUFBbUY7QUFDbEY7SUFBUixLQUFLLEVBQUU7aUZBQTJGO0FBQzFGO0lBQVIsS0FBSyxFQUFFO3dFQUFrRjtBQUVqRjtJQUFSLEtBQUssRUFBRTtxREFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7MkRBQXlCO0FBQ3hCO0lBQVIsS0FBSyxFQUFFOzREQUEwQjtBQUN6QjtJQUFSLEtBQUssRUFBRTt1REFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7NERBQTBCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFOzJEQUEwQjtBQUN6QjtJQUFSLEtBQUssRUFBRTt5REFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7c0RBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFO3dEQUF1QztBQUN0QztJQUFSLEtBQUssRUFBRTtrREFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTt5REFBK0I7QUFDOUI7SUFBUixLQUFLLEVBQUU7K0NBQVU7QUFDVDtJQUFSLEtBQUssRUFBRTsyREFBMEI7QUFDekI7SUFBUixLQUFLLEVBQUU7c0RBQXFCO0FBQ3BCO0lBQVIsS0FBSyxFQUFFO3lEQUFvQjtBQUVsQjtJQUFULE1BQU0sRUFBRTswREFBNkM7QUFDNUM7SUFBVCxNQUFNLEVBQUU7MkRBQThDO0FBQzdDO0lBQVQsTUFBTSxFQUFFOzBEQUF3RDtBQUN2RDtJQUFULE1BQU0sRUFBRTswREFBaUQ7QUEvQmpELGtCQUFrQjtJQTFOOUIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTZIVDtpQkFDUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXdGUjtLQUNKLENBQUM7R0FDVyxrQkFBa0IsQ0EyaEI5QjtTQTNoQlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgT25Jbml0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBBZnRlclZpZXdJbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEYXRlUGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW9uU2xpZGVzfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5cbmltcG9ydCB7SUNhbGVuZGFyQ29tcG9uZW50LCBJRXZlbnQsIElNb250aFZpZXcsIElNb250aFZpZXdSb3csIElUaW1lU2VsZWN0ZWQsIElSYW5nZSwgQ2FsZW5kYXJNb2RlLCBJRGF0ZUZvcm1hdHRlcn0gZnJvbSAnLi9jYWxlbmRhcic7XG5pbXBvcnQge0NhbGVuZGFyU2VydmljZX0gZnJvbSAnLi9jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCB7SU1vbnRoVmlld0Rpc3BsYXlFdmVudFRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9jYWxlbmRhcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbW9udGh2aWV3JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGlvbi1zbGlkZXMgI21vbnRoU2xpZGVyIFtvcHRpb25zXT1cInNsaWRlck9wdGlvbnNcIiBbZGlyXT1cImRpclwiIChpb25TbGlkZURpZENoYW5nZSk9XCJvblNsaWRlQ2hhbmdlZCgpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1zbGlkZT5cbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlICpuZ0lmPVwiMD09PWN1cnJlbnRWaWV3SW5kZXhcIiBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWZpeGVkIG1vbnRodmlldy1kYXRldGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGRheUhlYWRlciBvZiB2aWV3c1swXS5kYXlIZWFkZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbD57e2RheUhlYWRlcn19PC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiBbMCwxLDIsMyw0LDVdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2wgb2YgWzAsMSwyLDMsNCw1LDZdXCIgdGFwcGFibGUgKGNsaWNrKT1cInNlbGVjdCh2aWV3c1swXS5kYXRlc1tyb3cqNytjb2xdKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldEhpZ2hsaWdodENsYXNzKHZpZXdzWzBdLmRhdGVzW3Jvdyo3K2NvbF0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJtb250aHZpZXdEaXNwbGF5RXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3ZpZXc6IHZpZXdzWzBdLCByb3c6IHJvdywgY29sOiBjb2x9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgKm5nSWY9XCIwIT09Y3VycmVudFZpZXdJbmRleFwiIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtZml4ZWQgbW9udGh2aWV3LWRhdGV0YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGRheUhlYWRlciBvZiB2aWV3c1swXS5kYXlIZWFkZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbD57e2RheUhlYWRlcn19PC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiBbMCwxLDIsMyw0LDVdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2wgb2YgWzAsMSwyLDMsNCw1LDZdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJtb250aHZpZXdJbmFjdGl2ZURpc3BsYXlFdmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dmlldzogdmlld3NbMF0sIHJvdzogcm93LCBjb2w6IGNvbH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICA8L2lvbi1zbGlkZT5cbiAgICAgICAgICAgICAgICA8aW9uLXNsaWRlPlxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgKm5nSWY9XCIxPT09Y3VycmVudFZpZXdJbmRleFwiIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtZml4ZWQgbW9udGh2aWV3LWRhdGV0YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgZGF5SGVhZGVyIG9mIHZpZXdzWzFdLmRheUhlYWRlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPnt7ZGF5SGVhZGVyfX08L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIFswLDEsMiwzLDQsNV1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbCBvZiBbMCwxLDIsMyw0LDUsNl1cIiB0YXBwYWJsZSAoY2xpY2spPVwic2VsZWN0KHZpZXdzWzFdLmRhdGVzW3Jvdyo3K2NvbF0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0SGlnaGxpZ2h0Q2xhc3Modmlld3NbMV0uZGF0ZXNbcm93KjcrY29sXSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm1vbnRodmlld0Rpc3BsYXlFdmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dmlldzogdmlld3NbMV0sIHJvdzogcm93LCBjb2w6IGNvbH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSAqbmdJZj1cIjEhPT1jdXJyZW50Vmlld0luZGV4XCIgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1maXhlZCBtb250aHZpZXctZGF0ZXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgZGF5SGVhZGVyIG9mIHZpZXdzWzFdLmRheUhlYWRlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPnt7ZGF5SGVhZGVyfX08L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIFswLDEsMiwzLDQsNV1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbCBvZiBbMCwxLDIsMyw0LDUsNl1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm1vbnRodmlld0luYWN0aXZlRGlzcGxheUV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInt2aWV3OiB2aWV3c1sxXSwgcm93OiByb3csIGNvbDogY29sfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgIDwvaW9uLXNsaWRlPlxuICAgICAgICAgICAgICAgIDxpb24tc2xpZGU+XG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSAqbmdJZj1cIjI9PT1jdXJyZW50Vmlld0luZGV4XCIgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1maXhlZCBtb250aHZpZXctZGF0ZXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBkYXlIZWFkZXIgb2Ygdmlld3NbMl0uZGF5SGVhZGVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGw+e3tkYXlIZWFkZXJ9fTwvc21hbGw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2YgWzAsMSwyLDMsNCw1XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgY29sIG9mIFswLDEsMiwzLDQsNSw2XVwiIHRhcHBhYmxlIChjbGljayk9XCJzZWxlY3Qodmlld3NbMl0uZGF0ZXNbcm93KjcrY29sXSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRIaWdobGlnaHRDbGFzcyh2aWV3c1syXS5kYXRlc1tyb3cqNytjb2xdKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibW9udGh2aWV3RGlzcGxheUV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInt2aWV3OiB2aWV3c1syXSwgcm93OiByb3csIGNvbDogY29sfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlICpuZ0lmPVwiMiE9PWN1cnJlbnRWaWV3SW5kZXhcIiBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWZpeGVkIG1vbnRodmlldy1kYXRldGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBkYXlIZWFkZXIgb2Ygdmlld3NbMl0uZGF5SGVhZGVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGw+e3tkYXlIZWFkZXJ9fTwvc21hbGw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2YgWzAsMSwyLDMsNCw1XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgY29sIG9mIFswLDEsMiwzLDQsNSw2XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibW9udGh2aWV3SW5hY3RpdmVEaXNwbGF5RXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3ZpZXc6IHZpZXdzWzJdLCByb3c6IHJvdywgY29sOiBjb2x9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgPC9pb24tc2xpZGU+XG4gICAgICAgICAgICA8L2lvbi1zbGlkZXM+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibW9udGh2aWV3RXZlbnREZXRhaWxUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntzaG93RXZlbnREZXRhaWw6c2hvd0V2ZW50RGV0YWlsLCBzZWxlY3RlZERhdGU6IHNlbGVjdGVkRGF0ZSwgbm9FdmVudHNMYWJlbDogbm9FdmVudHNMYWJlbH1cIj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICAudGV4dC1tdXRlZCB7XG4gICAgICAgICAgICBjb2xvcjogIzk5OTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZS1maXhlZCB7XG4gICAgICAgICAgICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRhYmxlIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAudGFibGUgPiB0aGVhZCA+IHRyID4gdGgsIC50YWJsZSA+IHRib2R5ID4gdHIgPiB0aCwgLnRhYmxlID4gdGZvb3QgPiB0ciA+IHRoLCAudGFibGUgPiB0aGVhZCA+IHRyID4gdGQsXG4gICAgICAgIC50YWJsZSA+IHRib2R5ID4gdHIgPiB0ZCwgLnRhYmxlID4gdGZvb3QgPiB0ciA+IHRkIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDhweDtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZSA+IHRoZWFkID4gdHIgPiB0aCB7XG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNkZGQ7XG4gICAgICAgIH1cblxuICAgICAgICAudGFibGUgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkID4gdGgsIC50YWJsZSA+IHRoZWFkOmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgPiB0ZCB7XG4gICAgICAgICAgICBib3JkZXItdG9wOiAwXG4gICAgICAgIH1cblxuICAgICAgICAudGFibGUgPiB0Ym9keSArIHRib2R5IHtcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCAjZGRkO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRhYmxlLWJvcmRlcmVkIHtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgIH1cblxuICAgICAgICAudGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGgsIC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHIgPiB0aCwgLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRoLFxuICAgICAgICAudGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGQsIC50YWJsZS1ib3JkZXJlZCA+IHRib2R5ID4gdHIgPiB0ZCwgLnRhYmxlLWJvcmRlcmVkID4gdGZvb3QgPiB0ciA+IHRkIHtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgIH1cblxuICAgICAgICAudGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGgsIC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0ZCB7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tLXdpZHRoOiAycHg7XG4gICAgICAgIH1cblxuICAgICAgICAudGFibGUtc3RyaXBlZCA+IHRib2R5ID4gdHI6bnRoLWNoaWxkKG9kZCkgPiB0ZCwgLnRhYmxlLXN0cmlwZWQgPiB0Ym9keSA+IHRyOm50aC1jaGlsZChvZGQpID4gdGgge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOVxuICAgICAgICB9XG5cbiAgICAgICAgLm1vbnRodmlldy1wcmltYXJ5LXdpdGgtZXZlbnQge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzNhODdhZDtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tb250aHZpZXctY3VycmVudCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xuICAgICAgICB9XG5cbiAgICAgICAgLm1vbnRodmlldy1zZWxlY3RlZCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5OTAwO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLm1vbnRodmlldy1kYXRldGFibGUgdGQubW9udGh2aWV3LWRpc2FibGVkIHtcbiAgICAgICAgICAgIGNvbG9yOiBsaWdodGdyZXk7XG4gICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAubW9udGh2aWV3LWRhdGV0YWJsZSB0aCB7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAubW9udGh2aWV3LWRhdGV0YWJsZSB0ZCB7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAubW9udGh2aWV3LXNlY29uZGFyeS13aXRoLWV2ZW50IHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkOWVkZjc7XG4gICAgICAgIH1cblxuICAgICAgICA6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuICAgICAgICAqOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgTW9udGhWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgSUNhbGVuZGFyQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FsZW5kYXJTZXJ2aWNlOiBDYWxlbmRhclNlcnZpY2UpIHtcbiAgICB9XG4gICAgO1xuXG4gICAgQFZpZXdDaGlsZCgnbW9udGhTbGlkZXInLCB7c3RhdGljOiB0cnVlfSkgc2xpZGVyOiBJb25TbGlkZXM7XG5cbiAgICBASW5wdXQoKSBtb250aHZpZXdEaXNwbGF5RXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SU1vbnRoVmlld0Rpc3BsYXlFdmVudFRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgbW9udGh2aWV3SW5hY3RpdmVEaXNwbGF5RXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SU1vbnRoVmlld0Rpc3BsYXlFdmVudFRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgbW9udGh2aWV3RXZlbnREZXRhaWxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SU1vbnRoVmlld0Rpc3BsYXlFdmVudFRlbXBsYXRlQ29udGV4dD47XG5cbiAgICBASW5wdXQoKSBmb3JtYXREYXk6IHN0cmluZztcbiAgICBASW5wdXQoKSBmb3JtYXREYXlIZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBmb3JtYXRNb250aFRpdGxlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZXZlbnRTb3VyY2U6IElFdmVudFtdO1xuICAgIEBJbnB1dCgpIHN0YXJ0aW5nRGF5TW9udGg6IG51bWJlcjtcbiAgICBASW5wdXQoKSBzaG93RXZlbnREZXRhaWw6IGJvb2xlYW47XG4gICAgQElucHV0KCkgbm9FdmVudHNMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGF1dG9TZWxlY3QgPSB0cnVlO1xuICAgIEBJbnB1dCgpIG1hcmtEaXNhYmxlZDogKGRhdGU6IERhdGUpID0+IGJvb2xlYW47XG4gICAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZGF0ZUZvcm1hdHRlcjogSURhdGVGb3JtYXR0ZXI7XG4gICAgQElucHV0KCkgZGlyID0gJyc7XG4gICAgQElucHV0KCkgbG9ja1N3aXBlVG9QcmV2OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGxvY2tTd2lwZXM6IGJvb2xlYW47XG4gICAgQElucHV0KCkgc2xpZGVyT3B0aW9uczogYW55O1xuXG4gICAgQE91dHB1dCgpIG9uUmFuZ2VDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxJUmFuZ2U+KCk7XG4gICAgQE91dHB1dCgpIG9uRXZlbnRTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBvblRpbWVTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SVRpbWVTZWxlY3RlZD4odHJ1ZSk7XG4gICAgQE91dHB1dCgpIG9uVGl0bGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KHRydWUpO1xuXG4gICAgcHVibGljIHZpZXdzOiBJTW9udGhWaWV3W10gPSBbXTtcbiAgICBwdWJsaWMgY3VycmVudFZpZXdJbmRleCA9IDA7XG4gICAgcHVibGljIHNlbGVjdGVkRGF0ZTogSU1vbnRoVmlld1JvdztcbiAgICBwdWJsaWMgcmFuZ2U6IElSYW5nZTtcbiAgICBwdWJsaWMgbW9kZTogQ2FsZW5kYXJNb2RlID0gJ21vbnRoJztcbiAgICBwdWJsaWMgZGlyZWN0aW9uID0gMDtcblxuICAgIHByaXZhdGUgbW92ZU9uU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIGluaXRlZCA9IGZhbHNlO1xuICAgIHByaXZhdGUgY2FsbGJhY2tPbkluaXQgPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBjdXJyZW50RGF0ZUNoYW5nZWRGcm9tUGFyZW50U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBldmVudFNvdXJjZUNoYW5nZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIHNsaWRlQ2hhbmdlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgc2xpZGVVcGRhdGVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBwcml2YXRlIGZvcm1hdERheUxhYmVsOiAoZGF0ZTogRGF0ZSkgPT4gc3RyaW5nO1xuICAgIHByaXZhdGUgZm9ybWF0RGF5SGVhZGVyTGFiZWw6IChkYXRlOiBEYXRlKSA9PiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBmb3JtYXRUaXRsZTogKGRhdGU6IERhdGUpID0+IHN0cmluZztcblxuICAgIHN0YXRpYyBnZXREYXRlcyhzdGFydERhdGU6IERhdGUsIG46IG51bWJlcik6IERhdGVbXSB7XG4gICAgICAgIGNvbnN0IGRhdGVzID0gbmV3IEFycmF5KG4pLFxuICAgICAgICAgICAgY3VycmVudCA9IG5ldyBEYXRlKHN0YXJ0RGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgbikge1xuICAgICAgICAgICAgZGF0ZXNbaSsrXSA9IG5ldyBEYXRlKGN1cnJlbnQuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIGN1cnJlbnQuc2V0RGF0ZShjdXJyZW50LmdldERhdGUoKSArIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlcztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNsaWRlck9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyT3B0aW9ucyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2xpZGVyT3B0aW9ucy5sb29wID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5kYXRlRm9ybWF0dGVyICYmIHRoaXMuZGF0ZUZvcm1hdHRlci5mb3JtYXRNb250aFZpZXdEYXkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0RGF5TGFiZWwgPSB0aGlzLmRhdGVGb3JtYXR0ZXIuZm9ybWF0TW9udGhWaWV3RGF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF5TGFiZWxEYXRlUGlwZSA9IG5ldyBEYXRlUGlwZSgnZW4tVVMnKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0RGF5TGFiZWwgPSBmdW5jdGlvbihkYXRlOiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRheUxhYmVsRGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsIHRoaXMuZm9ybWF0RGF5KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRlRm9ybWF0dGVyICYmIHRoaXMuZGF0ZUZvcm1hdHRlci5mb3JtYXRNb250aFZpZXdEYXlIZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0RGF5SGVhZGVyTGFiZWwgPSB0aGlzLmRhdGVGb3JtYXR0ZXIuZm9ybWF0TW9udGhWaWV3RGF5SGVhZGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0ZVBpcGUgPSBuZXcgRGF0ZVBpcGUodGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgdGhpcy5mb3JtYXREYXlIZWFkZXJMYWJlbCA9IGZ1bmN0aW9uKGRhdGU6IERhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsIHRoaXMuZm9ybWF0RGF5SGVhZGVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRlRm9ybWF0dGVyICYmIHRoaXMuZGF0ZUZvcm1hdHRlci5mb3JtYXRNb250aFZpZXdUaXRsZSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXRUaXRsZSA9IHRoaXMuZGF0ZUZvcm1hdHRlci5mb3JtYXRNb250aFZpZXdUaXRsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQaXBlID0gbmV3IERhdGVQaXBlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0VGl0bGUgPSBmdW5jdGlvbihkYXRlOiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGVQaXBlLnRyYW5zZm9ybShkYXRlLCB0aGlzLmZvcm1hdE1vbnRoVGl0bGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxvY2tTd2lwZVRvUHJldikge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIubG9ja1N3aXBlVG9QcmV2KHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubG9ja1N3aXBlcykge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIubG9ja1N3aXBlcyh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3VycmVudERhdGVDaGFuZ2VkRnJvbVBhcmVudFN1YnNjcmlwdGlvbiA9IHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmN1cnJlbnREYXRlQ2hhbmdlZEZyb21QYXJlbnQkLnN1YnNjcmliZShjdXJyZW50RGF0ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZXZlbnRTb3VyY2VDaGFuZ2VkU3Vic2NyaXB0aW9uID0gdGhpcy5jYWxlbmRhclNlcnZpY2UuZXZlbnRTb3VyY2VDaGFuZ2VkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkRhdGFMb2FkZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zbGlkZUNoYW5nZWRTdWJzY3JpcHRpb24gPSB0aGlzLmNhbGVuZGFyU2VydmljZS5zbGlkZUNoYW5nZWQkLnN1YnNjcmliZShkaXJlY3Rpb24gPT4ge1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyLnNsaWRlTmV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2xpZGVQcmV2KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2xpZGVVcGRhdGVkU3Vic2NyaXB0aW9uID0gdGhpcy5jYWxlbmRhclNlcnZpY2Uuc2xpZGVVcGRhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIudXBkYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50RGF0ZUNoYW5nZWRGcm9tUGFyZW50U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlQ2hhbmdlZEZyb21QYXJlbnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGVDaGFuZ2VkRnJvbVBhcmVudFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ldmVudFNvdXJjZUNoYW5nZWRTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTb3VyY2VDaGFuZ2VkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50U291cmNlQ2hhbmdlZFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zbGlkZUNoYW5nZWRTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVDaGFuZ2VkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLnNsaWRlQ2hhbmdlZFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zbGlkZVVwZGF0ZWRTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVVcGRhdGVkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVXBkYXRlZFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICghdGhpcy5pbml0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGV2ZW50U291cmNlQ2hhbmdlID0gY2hhbmdlcy5ldmVudFNvdXJjZTtcbiAgICAgICAgaWYgKGV2ZW50U291cmNlQ2hhbmdlICYmIGV2ZW50U291cmNlQ2hhbmdlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5vbkRhdGFMb2FkZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvY2tTd2lwZVRvUHJldiA9IGNoYW5nZXMubG9ja1N3aXBlVG9QcmV2O1xuICAgICAgICBpZiAobG9ja1N3aXBlVG9QcmV2KSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5sb2NrU3dpcGVUb1ByZXYobG9ja1N3aXBlVG9QcmV2LmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2NrU3dpcGVzID0gY2hhbmdlcy5sb2NrU3dpcGVzO1xuICAgICAgICBpZiAobG9ja1N3aXBlcykge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIubG9ja1N3aXBlcyhsb2NrU3dpcGVzLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5nZXRUaXRsZSgpO1xuICAgICAgICB0aGlzLm9uVGl0bGVDaGFuZ2VkLmVtaXQodGl0bGUpO1xuICAgIH1cblxuICAgIG9uU2xpZGVDaGFuZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5jYWxsYmFja09uSW5pdCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja09uSW5pdCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IDA7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWaWV3SW5kZXggPSB0aGlzLmN1cnJlbnRWaWV3SW5kZXg7XG5cbiAgICAgICAgdGhpcy5zbGlkZXIuZ2V0QWN0aXZlSW5kZXgoKS50aGVuKChjdXJyZW50U2xpZGVJbmRleCkgPT4ge1xuICAgICAgICAgICAgY3VycmVudFNsaWRlSW5kZXggPSAoY3VycmVudFNsaWRlSW5kZXggKyAyKSAlIDM7XG4gICAgICAgICAgICBpZihpc05hTihjdXJyZW50U2xpZGVJbmRleCkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGVJbmRleCA9IGN1cnJlbnRWaWV3SW5kZXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50U2xpZGVJbmRleCAtIGN1cnJlbnRWaWV3SW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U2xpZGVJbmRleCA9PT0gMCAmJiBjdXJyZW50Vmlld0luZGV4ID09PSAyKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci5zbGlkZVRvKDEsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFZpZXdJbmRleCAtIGN1cnJlbnRTbGlkZUluZGV4ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gLTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTbGlkZUluZGV4ID09PSAyICYmIGN1cnJlbnRWaWV3SW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAtMTtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci5zbGlkZVRvKDMsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXdJbmRleCA9IGN1cnJlbnRTbGlkZUluZGV4O1xuICAgICAgICAgICAgdGhpcy5tb3ZlKGRpcmVjdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1vdmUoZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIGlmICghdGhpcy5tb3ZlT25TZWxlY3RlZCkge1xuICAgICAgICAgICAgY29uc3QgYWRqYWNlbnREYXRlID0gdGhpcy5jYWxlbmRhclNlcnZpY2UuZ2V0QWRqYWNlbnRDYWxlbmRhckRhdGUodGhpcy5tb2RlLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2Uuc2V0Q3VycmVudERhdGUoYWRqYWNlbnREYXRlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gMDtcbiAgICAgICAgdGhpcy5tb3ZlT25TZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNyZWF0ZURhdGVPYmplY3QoZGF0ZTogRGF0ZSk6IElNb250aFZpZXdSb3cge1xuICAgICAgICBsZXQgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMubWFya0Rpc2FibGVkKSB7XG4gICAgICAgICAgICBkaXNhYmxlZCA9IHRoaXMubWFya0Rpc2FibGVkKGRhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICBldmVudHM6IFtdLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMuZm9ybWF0RGF5TGFiZWwoZGF0ZSksXG4gICAgICAgICAgICBzZWNvbmRhcnk6IGZhbHNlLFxuICAgICAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRWaWV3RGF0YShzdGFydFRpbWU6IERhdGUpOiBJTW9udGhWaWV3IHtcbiAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gc3RhcnRUaW1lLFxuICAgICAgICAgICAgZGF0ZSA9IHN0YXJ0RGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICBtb250aCA9IChzdGFydERhdGUuZ2V0TW9udGgoKSArIChkYXRlICE9PSAxID8gMSA6IDApKSAlIDEyO1xuXG4gICAgICAgIGNvbnN0IGRhdGVzID0gTW9udGhWaWV3Q29tcG9uZW50LmdldERhdGVzKHN0YXJ0RGF0ZSwgNDIpO1xuICAgICAgICBjb25zdCBkYXlzOiBJTW9udGhWaWV3Um93W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlT2JqZWN0ID0gdGhpcy5jcmVhdGVEYXRlT2JqZWN0KGRhdGVzW2ldKTtcbiAgICAgICAgICAgIGRhdGVPYmplY3Quc2Vjb25kYXJ5ID0gZGF0ZXNbaV0uZ2V0TW9udGgoKSAhPT0gbW9udGg7XG4gICAgICAgICAgICBkYXlzW2ldID0gZGF0ZU9iamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRheUhlYWRlcnM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBkYXlIZWFkZXJzLnB1c2godGhpcy5mb3JtYXREYXlIZWFkZXJMYWJlbChkYXlzW2ldLmRhdGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0ZXM6IGRheXMsXG4gICAgICAgICAgICBkYXlIZWFkZXJzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0SGlnaGxpZ2h0Q2xhc3MoZGF0ZTogSU1vbnRoVmlld1Jvdyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBjbGFzc05hbWUgPSAnJztcblxuICAgICAgICBpZiAoZGF0ZS5oYXNFdmVudCkge1xuICAgICAgICAgICAgaWYgKGRhdGUuc2Vjb25kYXJ5KSB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ21vbnRodmlldy1zZWNvbmRhcnktd2l0aC1ldmVudCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdtb250aHZpZXctcHJpbWFyeS13aXRoLWV2ZW50JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9ICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnbW9udGh2aWV3LXNlbGVjdGVkJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xhc3NOYW1lICs9ICdtb250aHZpZXctY3VycmVudCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZS5zZWNvbmRhcnkpIHtcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xhc3NOYW1lICs9ICd0ZXh0LW11dGVkJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9ICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnbW9udGh2aWV3LWRpc2FibGVkJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGdldFJhbmdlKGN1cnJlbnREYXRlOiBEYXRlKTogSVJhbmdlIHtcbiAgICAgICAgY29uc3QgeWVhciA9IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICBtb250aCA9IGN1cnJlbnREYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICBmaXJzdERheU9mTW9udGggPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSwgMTIsIDAsIDApLCAvLyBzZXQgaG91ciB0byAxMiB0byBhdm9pZCBEU1QgcHJvYmxlbVxuXG4gICAgICAgICAgICBkaWZmZXJlbmNlID0gdGhpcy5zdGFydGluZ0RheU1vbnRoIC0gZmlyc3REYXlPZk1vbnRoLmdldERheSgpLFxuICAgICAgICAgICAgbnVtRGlzcGxheWVkRnJvbVByZXZpb3VzTW9udGggPSAoZGlmZmVyZW5jZSA+IDApID8gNyAtIGRpZmZlcmVuY2UgOiAtZGlmZmVyZW5jZSxcbiAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKGZpcnN0RGF5T2ZNb250aC5nZXRUaW1lKCkpO1xuXG4gICAgICAgIGlmIChudW1EaXNwbGF5ZWRGcm9tUHJldmlvdXNNb250aCA+IDApIHtcbiAgICAgICAgICAgIHN0YXJ0RGF0ZS5zZXREYXRlKC1udW1EaXNwbGF5ZWRGcm9tUHJldmlvdXNNb250aCArIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKHN0YXJ0RGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICBlbmREYXRlLnNldERhdGUoZW5kRGF0ZS5nZXREYXRlKCkgKyA0Mik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0VGltZTogc3RhcnREYXRlLFxuICAgICAgICAgICAgZW5kVGltZTogZW5kRGF0ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uRGF0YUxvYWRlZCgpIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLnJhbmdlLFxuICAgICAgICAgICAgZXZlbnRTb3VyY2UgPSB0aGlzLmV2ZW50U291cmNlLFxuICAgICAgICAgICAgbGVuID0gZXZlbnRTb3VyY2UgPyBldmVudFNvdXJjZS5sZW5ndGggOiAwLFxuICAgICAgICAgICAgc3RhcnRUaW1lID0gcmFuZ2Uuc3RhcnRUaW1lLFxuICAgICAgICAgICAgZW5kVGltZSA9IHJhbmdlLmVuZFRpbWUsXG4gICAgICAgICAgICB1dGNTdGFydFRpbWUgPSBEYXRlLlVUQyhzdGFydFRpbWUuZ2V0RnVsbFllYXIoKSwgc3RhcnRUaW1lLmdldE1vbnRoKCksIHN0YXJ0VGltZS5nZXREYXRlKCkpLFxuICAgICAgICAgICAgdXRjRW5kVGltZSA9IERhdGUuVVRDKGVuZFRpbWUuZ2V0RnVsbFllYXIoKSwgZW5kVGltZS5nZXRNb250aCgpLCBlbmRUaW1lLmdldERhdGUoKSksXG4gICAgICAgICAgICBjdXJyZW50Vmlld0luZGV4ID0gdGhpcy5jdXJyZW50Vmlld0luZGV4LFxuICAgICAgICAgICAgZGF0ZXMgPSB0aGlzLnZpZXdzW2N1cnJlbnRWaWV3SW5kZXhdLmRhdGVzLFxuICAgICAgICAgICAgb25lRGF5ID0gODY0MDAwMDAsXG4gICAgICAgICAgICBlcHMgPSAwLjAwMDY7XG5cbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCA0MjsgciArPSAxKSB7XG4gICAgICAgICAgICBpZiAoZGF0ZXNbcl0uaGFzRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBkYXRlc1tyXS5oYXNFdmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRhdGVzW3JdLmV2ZW50cyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudFNvdXJjZVtpXSxcbiAgICAgICAgICAgICAgICBldmVudFN0YXJ0VGltZSA9IGV2ZW50LnN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICBldmVudEVuZFRpbWUgPSBldmVudC5lbmRUaW1lO1xuXG4gICAgICAgICAgICBsZXQgZXZlbnRVVENTdGFydFRpbWU6IG51bWJlcixcbiAgICAgICAgICAgICAgICBldmVudFVUQ0VuZFRpbWU6IG51bWJlcjtcbiAgICAgICAgICAgIGlmIChldmVudC5hbGxEYXkpIHtcbiAgICAgICAgICAgICAgICBldmVudFVUQ1N0YXJ0VGltZSA9IGV2ZW50U3RhcnRUaW1lLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICBldmVudFVUQ0VuZFRpbWUgPSBldmVudEVuZFRpbWUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudFVUQ1N0YXJ0VGltZSA9IERhdGUuVVRDKGV2ZW50U3RhcnRUaW1lLmdldEZ1bGxZZWFyKCksIGV2ZW50U3RhcnRUaW1lLmdldE1vbnRoKCksIGV2ZW50U3RhcnRUaW1lLmdldERhdGUoKSk7XG4gICAgICAgICAgICAgICAgZXZlbnRVVENFbmRUaW1lID0gRGF0ZS5VVEMoZXZlbnRFbmRUaW1lLmdldEZ1bGxZZWFyKCksIGV2ZW50RW5kVGltZS5nZXRNb250aCgpLCBldmVudEVuZFRpbWUuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChldmVudFVUQ0VuZFRpbWUgPD0gdXRjU3RhcnRUaW1lIHx8IGV2ZW50VVRDU3RhcnRUaW1lID49IHV0Y0VuZFRpbWUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHRpbWVEaWZmZXJlbmNlU3RhcnQ6IG51bWJlcixcbiAgICAgICAgICAgICAgICB0aW1lRGlmZmVyZW5jZUVuZDogbnVtYmVyO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnRVVENTdGFydFRpbWUgPCB1dGNTdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICB0aW1lRGlmZmVyZW5jZVN0YXJ0ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGltZURpZmZlcmVuY2VTdGFydCA9IChldmVudFVUQ1N0YXJ0VGltZSAtIHV0Y1N0YXJ0VGltZSkgLyBvbmVEYXk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChldmVudFVUQ0VuZFRpbWUgPiB1dGNFbmRUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGltZURpZmZlcmVuY2VFbmQgPSAodXRjRW5kVGltZSAtIHV0Y1N0YXJ0VGltZSkgLyBvbmVEYXk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpbWVEaWZmZXJlbmNlRW5kID0gKGV2ZW50VVRDRW5kVGltZSAtIHV0Y1N0YXJ0VGltZSkgLyBvbmVEYXk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IodGltZURpZmZlcmVuY2VTdGFydCk7XG4gICAgICAgICAgICBjb25zdCBlbmRJbmRleCA9IE1hdGguY2VpbCh0aW1lRGlmZmVyZW5jZUVuZCAtIGVwcyk7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCBlbmRJbmRleCkge1xuICAgICAgICAgICAgICAgIGRhdGVzW2luZGV4XS5oYXNFdmVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50U2V0ID0gZGF0ZXNbaW5kZXhdLmV2ZW50cztcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRTZXQucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRTZXQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRTZXQucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVzW2luZGV4XS5ldmVudHMgPSBldmVudFNldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgNDI7IHIgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGRhdGVzW3JdLmhhc0V2ZW50KSB7XG4gICAgICAgICAgICAgICAgZGF0ZXNbcl0uZXZlbnRzLnNvcnQodGhpcy5jb21wYXJlRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b1NlbGVjdCkge1xuICAgICAgICAgICAgbGV0IGZpbmRTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCA0MjsgciArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVzW3JdLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZXNbcl07XG4gICAgICAgICAgICAgICAgICAgIGZpbmRTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpbmRTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25UaW1lU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVGltZTogdGhpcy5zZWxlY3RlZERhdGUuZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiB0aGlzLnNlbGVjdGVkRGF0ZS5ldmVudHMsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnNlbGVjdGVkRGF0ZS5kaXNhYmxlZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaFZpZXcoKSB7XG4gICAgICAgIHRoaXMucmFuZ2UgPSB0aGlzLmdldFJhbmdlKHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmN1cnJlbnREYXRlKTtcblxuICAgICAgICBpZiAodGhpcy5pbml0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5nZXRUaXRsZSgpO1xuICAgICAgICAgICAgdGhpcy5vblRpdGxlQ2hhbmdlZC5lbWl0KHRpdGxlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5wb3B1bGF0ZUFkamFjZW50Vmlld3ModGhpcyk7XG4gICAgICAgIHRoaXMudXBkYXRlQ3VycmVudFZpZXcodGhpcy5yYW5nZS5zdGFydFRpbWUsIHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld0luZGV4XSk7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLnJhbmdlQ2hhbmdlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRUaXRsZSgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBjdXJyZW50Vmlld1N0YXJ0RGF0ZSA9IHRoaXMucmFuZ2Uuc3RhcnRUaW1lLFxuICAgICAgICAgICAgZGF0ZSA9IGN1cnJlbnRWaWV3U3RhcnREYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgIG1vbnRoID0gKGN1cnJlbnRWaWV3U3RhcnREYXRlLmdldE1vbnRoKCkgKyAoZGF0ZSAhPT0gMSA/IDEgOiAwKSkgJSAxMixcbiAgICAgICAgICAgIHllYXIgPSBjdXJyZW50Vmlld1N0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpICsgKGRhdGUgIT09IDEgJiYgbW9udGggPT09IDAgPyAxIDogMCksXG4gICAgICAgICAgICBoZWFkZXJEYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEsIDEyLCAwLCAwLCAwKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VGl0bGUoaGVhZGVyRGF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21wYXJlRXZlbnQoZXZlbnQxOiBJRXZlbnQsIGV2ZW50MjogSUV2ZW50KTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGV2ZW50MS5hbGxEYXkpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50Mi5hbGxEYXkpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAoZXZlbnQxLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSBldmVudDIuc3RhcnRUaW1lLmdldFRpbWUoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3Qodmlld0RhdGU6IElNb250aFZpZXdSb3cpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWxlY3RlZERhdGUgPSB2aWV3RGF0ZS5kYXRlLFxuICAgICAgICAgICAgZXZlbnRzID0gdmlld0RhdGUuZXZlbnRzO1xuXG4gICAgICAgIGlmICghdmlld0RhdGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVzID0gdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3SW5kZXhdLmRhdGVzLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRDYWxlbmRhckRhdGUgPSB0aGlzLmNhbGVuZGFyU2VydmljZS5jdXJyZW50RGF0ZSxcbiAgICAgICAgICAgICAgICBjdXJyZW50TW9udGggPSBjdXJyZW50Q2FsZW5kYXJEYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgY3VycmVudFllYXIgPSBjdXJyZW50Q2FsZW5kYXJEYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRNb250aCA9IHNlbGVjdGVkRGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkWWVhciA9IHNlbGVjdGVkRGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IDA7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50WWVhciA9PT0gc2VsZWN0ZWRZZWFyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRNb250aCAhPT0gc2VsZWN0ZWRNb250aCkge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBjdXJyZW50TW9udGggPCBzZWxlY3RlZE1vbnRoID8gMSA6IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gY3VycmVudFllYXIgPCBzZWxlY3RlZFllYXIgPyAxIDogLTE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLnNldEN1cnJlbnREYXRlKHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZpZXdTdGFydERhdGUgPSB0aGlzLnJhbmdlLnN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICAgICAgb25lRGF5ID0gODY0MDAwMDAsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF5RGlmZmVyZW5jZSA9IE1hdGgucm91bmQoKERhdGUuVVRDKHNlbGVjdGVkRGF0ZS5nZXRGdWxsWWVhcigpLCBzZWxlY3RlZERhdGUuZ2V0TW9udGgoKSwgc2VsZWN0ZWREYXRlLmdldERhdGUoKSkgLSBEYXRlLlVUQyhjdXJyZW50Vmlld1N0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50Vmlld1N0YXJ0RGF0ZS5nZXRNb250aCgpLCBjdXJyZW50Vmlld1N0YXJ0RGF0ZS5nZXREYXRlKCkpKSAvIG9uZURheSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IDQyOyByICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZXNbcl0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWREYXlEaWZmZXJlbmNlID49IDAgJiYgc2VsZWN0ZWREYXlEaWZmZXJlbmNlIDwgNDIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZXNbc2VsZWN0ZWREYXlEaWZmZXJlbmNlXS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZXNbc2VsZWN0ZWREYXlEaWZmZXJlbmNlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZU9uU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVWaWV3KGRpcmVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uVGltZVNlbGVjdGVkLmVtaXQoe3NlbGVjdGVkVGltZTogc2VsZWN0ZWREYXRlLCBldmVudHMsIGRpc2FibGVkOiB2aWV3RGF0ZS5kaXNhYmxlZH0pO1xuICAgIH1cblxuICAgIHNsaWRlVmlldyhkaXJlY3Rpb246IG51bWJlcikge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zbGlkZU5leHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zbGlkZVByZXYoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUN1cnJlbnRWaWV3KGN1cnJlbnRWaWV3U3RhcnREYXRlOiBEYXRlLCB2aWV3OiBJTW9udGhWaWV3KSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDYWxlbmRhckRhdGUgPSB0aGlzLmNhbGVuZGFyU2VydmljZS5jdXJyZW50RGF0ZSxcbiAgICAgICAgICAgIHRvZGF5ID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgIG9uZURheSA9IDg2NDAwMDAwLFxuICAgICAgICAgICAgc2VsZWN0ZWREYXlEaWZmZXJlbmNlID0gTWF0aC5yb3VuZCgoRGF0ZS5VVEMoY3VycmVudENhbGVuZGFyRGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50Q2FsZW5kYXJEYXRlLmdldE1vbnRoKCksIGN1cnJlbnRDYWxlbmRhckRhdGUuZ2V0RGF0ZSgpKSAtIERhdGUuVVRDKGN1cnJlbnRWaWV3U3RhcnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnRWaWV3U3RhcnREYXRlLmdldE1vbnRoKCksIGN1cnJlbnRWaWV3U3RhcnREYXRlLmdldERhdGUoKSkpIC8gb25lRGF5KSxcbiAgICAgICAgICAgIGN1cnJlbnREYXlEaWZmZXJlbmNlID0gTWF0aC5yb3VuZCgoRGF0ZS5VVEModG9kYXkuZ2V0RnVsbFllYXIoKSwgdG9kYXkuZ2V0TW9udGgoKSwgdG9kYXkuZ2V0RGF0ZSgpKSAtIERhdGUuVVRDKGN1cnJlbnRWaWV3U3RhcnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnRWaWV3U3RhcnREYXRlLmdldE1vbnRoKCksIGN1cnJlbnRWaWV3U3RhcnREYXRlLmdldERhdGUoKSkpIC8gb25lRGF5KTtcblxuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IDQyOyByICs9IDEpIHtcbiAgICAgICAgICAgIHZpZXcuZGF0ZXNbcl0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZERheURpZmZlcmVuY2UgPj0gMCAmJiBzZWxlY3RlZERheURpZmZlcmVuY2UgPCA0MiAmJiAhdmlldy5kYXRlc1tzZWxlY3RlZERheURpZmZlcmVuY2VdLmRpc2FibGVkICYmICh0aGlzLmF1dG9TZWxlY3QgfHwgdGhpcy5tb3ZlT25TZWxlY3RlZCkpIHtcbiAgICAgICAgICAgIHZpZXcuZGF0ZXNbc2VsZWN0ZWREYXlEaWZmZXJlbmNlXS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHZpZXcuZGF0ZXNbc2VsZWN0ZWREYXlEaWZmZXJlbmNlXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0ge1xuICAgICAgICAgICAgICAgIGRhdGU6IG51bGwsXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICBsYWJlbDogbnVsbCxcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnk6IG51bGwsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnREYXlEaWZmZXJlbmNlID49IDAgJiYgY3VycmVudERheURpZmZlcmVuY2UgPCA0Mikge1xuICAgICAgICAgICAgdmlldy5kYXRlc1tjdXJyZW50RGF5RGlmZmVyZW5jZV0uY3VycmVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudFNlbGVjdGVkKGV2ZW50OiBJRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkV2ZW50U2VsZWN0ZWQuZW1pdChldmVudCk7XG4gICAgfVxufVxuIl19