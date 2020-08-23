var DayViewComponent_1;
import { __decorate } from "tslib";
import { DatePipe } from '@angular/common';
import { Component, OnInit, OnChanges, HostBinding, Input, Output, EventEmitter, SimpleChanges, ViewChild, ViewEncapsulation, TemplateRef, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CalendarService } from './calendar.service';
let DayViewComponent = DayViewComponent_1 = class DayViewComponent {
    constructor(calendarService, elm) {
        this.calendarService = calendarService;
        this.elm = elm;
        this.class = true;
        this.dir = '';
        this.scrollToHour = 0;
        this.onRangeChanged = new EventEmitter();
        this.onEventSelected = new EventEmitter();
        this.onTimeSelected = new EventEmitter();
        this.onTitleChanged = new EventEmitter(true);
        this.views = [];
        this.currentViewIndex = 0;
        this.direction = 0;
        this.mode = 'day';
        this.inited = false;
        this.callbackOnInit = true;
    }
    static createDateObjects(startTime, startHour, endHour, timeInterval) {
        const rows = [], currentHour = 0, currentDate = startTime.getDate();
        let time, hourStep, minStep;
        if (timeInterval < 1) {
            hourStep = Math.floor(1 / timeInterval);
            minStep = 60;
        }
        else {
            hourStep = 1;
            minStep = Math.floor(60 / timeInterval);
        }
        for (let hour = startHour; hour < endHour; hour += hourStep) {
            for (let interval = 0; interval < 60; interval += minStep) {
                time = new Date(startTime.getTime());
                time.setHours(currentHour + hour, interval);
                time.setDate(currentDate);
                rows.push({
                    time,
                    events: []
                });
            }
        }
        return rows;
    }
    static compareEventByStartOffset(eventA, eventB) {
        return eventA.startOffset - eventB.startOffset;
    }
    static calculateWidth(orderedEvents, size, hourParts) {
        const totalSize = size * hourParts, cells = new Array(totalSize);
        // sort by position in descending order, the right most columns should be calculated first
        orderedEvents.sort((eventA, eventB) => {
            return eventB.position - eventA.position;
        });
        for (let i = 0; i < totalSize; i += 1) {
            cells[i] = {
                calculated: false,
                events: []
            };
        }
        const len = orderedEvents.length;
        for (let i = 0; i < len; i += 1) {
            const event = orderedEvents[i];
            let index = event.startIndex * hourParts + event.startOffset;
            while (index < event.endIndex * hourParts - event.endOffset) {
                cells[index].events.push(event);
                index += 1;
            }
        }
        let i = 0;
        while (i < len) {
            let event = orderedEvents[i];
            if (!event.overlapNumber) {
                const overlapNumber = event.position + 1;
                event.overlapNumber = overlapNumber;
                const eventQueue = [event];
                while (event = eventQueue.shift()) {
                    let index = event.startIndex * hourParts + event.startOffset;
                    while (index < event.endIndex * hourParts - event.endOffset) {
                        if (!cells[index].calculated) {
                            cells[index].calculated = true;
                            if (cells[index].events) {
                                const eventCountInCell = cells[index].events.length;
                                for (let j = 0; j < eventCountInCell; j += 1) {
                                    const currentEventInCell = cells[index].events[j];
                                    if (!currentEventInCell.overlapNumber) {
                                        currentEventInCell.overlapNumber = overlapNumber;
                                        eventQueue.push(currentEventInCell);
                                    }
                                }
                            }
                        }
                        index += 1;
                    }
                }
            }
            i += 1;
        }
    }
    ngOnInit() {
        if (!this.sliderOptions) {
            this.sliderOptions = {};
        }
        this.sliderOptions.loop = true;
        this.hourRange = (this.endHour - this.startHour) * this.hourSegments;
        if (this.dateFormatter && this.dateFormatter.formatDayViewTitle) {
            this.formatTitle = this.dateFormatter.formatDayViewTitle;
        }
        else {
            const datePipe = new DatePipe(this.locale);
            this.formatTitle = function (date) {
                return datePipe.transform(date, this.formatDayTitle);
            };
        }
        if (this.dateFormatter && this.dateFormatter.formatDayViewHourColumn) {
            this.formatHourColumnLabel = this.dateFormatter.formatDayViewHourColumn;
        }
        else {
            const datePipe = new DatePipe(this.locale);
            this.formatHourColumnLabel = function (date) {
                return datePipe.transform(date, this.formatHourColumn);
            };
        }
        if (this.lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(true);
        }
        if (this.lockSwipes) {
            this.slider.lockSwipes(true);
        }
        this.refreshView();
        this.hourColumnLabels = this.getHourColumnLabels();
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
    ngAfterViewInit() {
        const title = this.getTitle();
        this.onTitleChanged.emit(title);
        if (this.scrollToHour > 0) {
            const hourColumns = this.elm.nativeElement.querySelector('.dayview-normal-event-container').querySelectorAll('.calendar-hour-column');
            const me = this;
            setTimeout(() => {
                me.initScrollPosition = hourColumns[me.scrollToHour - me.startHour].offsetTop;
            }, 50);
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
        const adjacentDate = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
        this.calendarService.setCurrentDate(adjacentDate);
        this.refreshView();
        this.direction = 0;
    }
    getHourColumnLabels() {
        const hourColumnLabels = [];
        for (let hour = 0, length = this.views[0].rows.length; hour < length; hour += 1) {
            // handle edge case for DST
            if (hour === 0 && this.views[0].rows[hour].time.getHours() !== this.startHour) {
                const time = new Date(this.views[0].rows[hour].time);
                time.setDate(time.getDate() + 1);
                time.setHours(this.startHour);
                hourColumnLabels.push(this.formatHourColumnLabel(time));
            }
            else {
                hourColumnLabels.push(this.formatHourColumnLabel(this.views[0].rows[hour].time));
            }
        }
        return hourColumnLabels;
    }
    getViewData(startTime) {
        return {
            rows: DayViewComponent_1.createDateObjects(startTime, this.startHour, this.endHour, this.hourSegments),
            allDayEvents: []
        };
    }
    getRange(currentDate) {
        const year = currentDate.getFullYear(), month = currentDate.getMonth(), date = currentDate.getDate(), startTime = new Date(year, month, date, 12, 0, 0), endTime = new Date(year, month, date + 1, 12, 0, 0);
        return {
            startTime,
            endTime
        };
    }
    onDataLoaded() {
        const eventSource = this.eventSource, len = eventSource ? eventSource.length : 0, startTime = this.range.startTime, endTime = this.range.endTime, utcStartTime = Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate()), utcEndTime = Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate()), currentViewIndex = this.currentViewIndex, rows = this.views[currentViewIndex].rows, allDayEvents = this.views[currentViewIndex].allDayEvents = [], oneHour = 3600000, eps = 0.016, rangeStartRowIndex = this.startHour * this.hourSegments, rangeEndRowIndex = this.endHour * this.hourSegments;
        let normalEventInRange = false;
        for (let hour = 0; hour < this.hourRange; hour += 1) {
            rows[hour].events = [];
        }
        for (let i = 0; i < len; i += 1) {
            const event = eventSource[i];
            const eventStartTime = event.startTime;
            const eventEndTime = event.endTime;
            let eventUTCStartTime, eventUTCEndTime;
            if (event.allDay) {
                eventUTCStartTime = eventStartTime.getTime();
                eventUTCEndTime = eventEndTime.getTime();
            }
            else {
                eventUTCStartTime = Date.UTC(eventStartTime.getFullYear(), eventStartTime.getMonth(), eventStartTime.getDate());
                eventUTCEndTime = Date.UTC(eventEndTime.getFullYear(), eventEndTime.getMonth(), eventEndTime.getDate() + 1);
            }
            if (eventUTCEndTime <= utcStartTime || eventUTCStartTime >= utcEndTime || eventStartTime >= eventEndTime) {
                continue;
            }
            if (event.allDay) {
                allDayEvents.push({
                    event
                });
            }
            else {
                normalEventInRange = true;
                let timeDifferenceStart;
                if (eventUTCStartTime < utcStartTime) {
                    timeDifferenceStart = 0;
                }
                else {
                    timeDifferenceStart = (eventStartTime.getHours() + eventStartTime.getMinutes() / 60) * this.hourSegments;
                }
                let timeDifferenceEnd;
                if (eventUTCEndTime > utcEndTime) {
                    timeDifferenceEnd = (utcEndTime - utcStartTime) / oneHour * this.hourSegments;
                }
                else {
                    timeDifferenceEnd = (eventEndTime.getHours() + eventEndTime.getMinutes() / 60) * this.hourSegments;
                }
                let startIndex = Math.floor(timeDifferenceStart);
                let endIndex = Math.ceil(timeDifferenceEnd - eps);
                let startOffset = 0;
                let endOffset = 0;
                if (this.hourParts !== 1) {
                    if (startIndex < rangeStartRowIndex) {
                        startOffset = 0;
                    }
                    else {
                        startOffset = Math.floor((timeDifferenceStart - startIndex) * this.hourParts);
                    }
                    if (endIndex > rangeEndRowIndex) {
                        endOffset = 0;
                    }
                    else {
                        endOffset = Math.floor((endIndex - timeDifferenceEnd) * this.hourParts);
                    }
                }
                if (startIndex < rangeStartRowIndex) {
                    startIndex = 0;
                }
                else {
                    startIndex -= rangeStartRowIndex;
                }
                if (endIndex > rangeEndRowIndex) {
                    endIndex = rangeEndRowIndex;
                }
                endIndex -= rangeStartRowIndex;
                if (startIndex < endIndex) {
                    const displayEvent = {
                        event,
                        startIndex,
                        endIndex,
                        startOffset,
                        endOffset
                    };
                    let eventSet = rows[startIndex].events;
                    if (eventSet) {
                        eventSet.push(displayEvent);
                    }
                    else {
                        eventSet = [];
                        eventSet.push(displayEvent);
                        rows[startIndex].events = eventSet;
                    }
                }
            }
        }
        if (normalEventInRange) {
            let orderedEvents = [];
            for (let hour = 0; hour < this.hourRange; hour += 1) {
                if (rows[hour].events) {
                    rows[hour].events.sort(DayViewComponent_1.compareEventByStartOffset);
                    orderedEvents = orderedEvents.concat(rows[hour].events);
                }
            }
            if (orderedEvents.length > 0) {
                this.placeEvents(orderedEvents);
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
        this.calendarService.rangeChanged(this);
    }
    getTitle() {
        const startingDate = new Date(this.range.startTime.getTime());
        startingDate.setHours(12, 0, 0, 0);
        return this.formatTitle(startingDate);
    }
    select(selectedTime, events) {
        let disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(selectedTime);
        }
        this.onTimeSelected.emit({
            selectedTime,
            events: events.map(e => e.event),
            disabled
        });
    }
    placeEvents(orderedEvents) {
        this.calculatePosition(orderedEvents);
        DayViewComponent_1.calculateWidth(orderedEvents, this.hourRange, this.hourParts);
    }
    placeAllDayEvents(orderedEvents) {
        this.calculatePosition(orderedEvents);
    }
    overlap(event1, event2) {
        let earlyEvent = event1, lateEvent = event2;
        if (event1.startIndex > event2.startIndex || (event1.startIndex === event2.startIndex && event1.startOffset > event2.startOffset)) {
            earlyEvent = event2;
            lateEvent = event1;
        }
        if (earlyEvent.endIndex <= lateEvent.startIndex) {
            return false;
        }
        else {
            return !(earlyEvent.endIndex - lateEvent.startIndex === 1 && earlyEvent.endOffset + lateEvent.startOffset >= this.hourParts);
        }
    }
    calculatePosition(events) {
        const len = events.length, isForbidden = new Array(len);
        let maxColumn = 0, col;
        for (let i = 0; i < len; i += 1) {
            for (col = 0; col < maxColumn; col += 1) {
                isForbidden[col] = false;
            }
            for (let j = 0; j < i; j += 1) {
                if (this.overlap(events[i], events[j])) {
                    isForbidden[events[j].position] = true;
                }
            }
            for (col = 0; col < maxColumn; col += 1) {
                if (!isForbidden[col]) {
                    break;
                }
            }
            if (col < maxColumn) {
                events[i].position = col;
            }
            else {
                events[i].position = maxColumn++;
            }
        }
        if (this.dir === 'rtl') {
            for (let i = 0; i < len; i += 1) {
                events[i].position = maxColumn - 1 - events[i].position;
            }
        }
    }
    eventSelected(event) {
        this.onEventSelected.emit(event);
    }
    setScrollPosition(scrollPosition) {
        this.initScrollPosition = scrollPosition;
    }
};
DayViewComponent.ctorParameters = () => [
    { type: CalendarService },
    { type: ElementRef }
];
__decorate([
    ViewChild('daySlider', { static: true })
], DayViewComponent.prototype, "slider", void 0);
__decorate([
    HostBinding('class.dayview')
], DayViewComponent.prototype, "class", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "dayviewAllDayEventTemplate", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "dayviewNormalEventTemplate", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "dayviewAllDayEventSectionTemplate", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "dayviewNormalEventSectionTemplate", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "dayviewInactiveAllDayEventSectionTemplate", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "dayviewInactiveNormalEventSectionTemplate", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "formatHourColumn", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "formatDayTitle", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "allDayLabel", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "hourParts", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "eventSource", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "markDisabled", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "locale", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "dateFormatter", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "dir", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "scrollToHour", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "preserveScrollPosition", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "lockSwipeToPrev", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "lockSwipes", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "startHour", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "endHour", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "sliderOptions", void 0);
__decorate([
    Input()
], DayViewComponent.prototype, "hourSegments", void 0);
__decorate([
    Output()
], DayViewComponent.prototype, "onRangeChanged", void 0);
__decorate([
    Output()
], DayViewComponent.prototype, "onEventSelected", void 0);
__decorate([
    Output()
], DayViewComponent.prototype, "onTimeSelected", void 0);
__decorate([
    Output()
], DayViewComponent.prototype, "onTitleChanged", void 0);
DayViewComponent = DayViewComponent_1 = __decorate([
    Component({
        selector: 'dayview',
        template: `
        <ion-slides #daySlider [options]="sliderOptions" [dir]="dir" (ionSlideDidChange)="onSlideChanged()" class="slides-container">
            <ion-slide class="slide-container">
                <div class="dayview-allday-table">
                    <div class="dayview-allday-label">{{allDayLabel}}</div>
                    <div class="dayview-allday-content-wrapper scroll-content">
                        <table class="table table-bordered dayview-allday-content-table">
                            <tbody>
                            <tr>
                                <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':views[0].allDayEvents.length>0}"
                                    [ngStyle]="{height: 25*views[0].allDayEvents.length+'px'}"
                                    *ngIf="0===currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[0].allDayEvents,eventTemplate:dayviewAllDayEventTemplate}">
                                    </ng-template>
                                </td>
                                <td class="calendar-cell" *ngIf="0!==currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewInactiveAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[0].allDayEvents}">
                                    </ng-template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <init-position-scroll *ngIf="0===currentViewIndex" class="dayview-normal-event-container"
                                      [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition"
                                      (onScroll)="setScrollPosition($event)">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[0].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                <ng-template [ngTemplateOutlet]="dayviewNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts, eventTemplate:dayviewNormalEventTemplate}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
                <init-position-scroll *ngIf="0!==currentViewIndex" class="dayview-normal-event-container"
                                      [initPosition]="initScrollPosition">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[0].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell">
                                <ng-template [ngTemplateOutlet]="dayviewInactiveNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
            </ion-slide>
            <ion-slide class="slide-container">
                <div class="dayview-allday-table">
                    <div class="dayview-allday-label">{{allDayLabel}}</div>
                    <div class="dayview-allday-content-wrapper scroll-content">
                        <table class="table table-bordered dayview-allday-content-table">
                            <tbody>
                            <tr>
                                <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':views[1].allDayEvents.length>0}"
                                    [ngStyle]="{height: 25*views[1].allDayEvents.length+'px'}"
                                    *ngIf="1===currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[1].allDayEvents,eventTemplate:dayviewAllDayEventTemplate}">
                                    </ng-template>
                                </td>
                                <td class="calendar-cell" *ngIf="1!==currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewInactiveAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[1].allDayEvents}">
                                    </ng-template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <init-position-scroll *ngIf="1===currentViewIndex" class="dayview-normal-event-container"
                                      [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition"
                                      (onScroll)="setScrollPosition($event)">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[1].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                <ng-template [ngTemplateOutlet]="dayviewNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts, eventTemplate:dayviewNormalEventTemplate}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
                <init-position-scroll *ngIf="1!==currentViewIndex" class="dayview-normal-event-container"
                                      [initPosition]="initScrollPosition">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[1].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell">
                                <ng-template [ngTemplateOutlet]="dayviewInactiveNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
            </ion-slide>
            <ion-slide class="slide-container">
                <div class="dayview-allday-table">
                    <div class="dayview-allday-label">{{allDayLabel}}</div>
                    <div class="dayview-allday-content-wrapper scroll-content">
                        <table class="table table-bordered dayview-allday-content-table">
                            <tbody>
                            <tr>
                                <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':views[2].allDayEvents.length>0}"
                                    [ngStyle]="{height: 25*views[2].allDayEvents.length+'px'}"
                                    *ngIf="2===currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[2].allDayEvents,eventTemplate:dayviewAllDayEventTemplate}">
                                    </ng-template>
                                </td>
                                <td class="calendar-cell" *ngIf="2!==currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewInactiveAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[2].allDayEvents}">
                                    </ng-template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <init-position-scroll *ngIf="2===currentViewIndex" class="dayview-normal-event-container"
                                      [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition"
                                      (onScroll)="setScrollPosition($event)">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[2].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                <ng-template [ngTemplateOutlet]="dayviewNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts, eventTemplate:dayviewNormalEventTemplate}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
                <init-position-scroll *ngIf="2!==currentViewIndex" class="dayview-normal-event-container"
                                      [initPosition]="initScrollPosition">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[2].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell">
                                <ng-template [ngTemplateOutlet]="dayviewInactiveNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
            </ion-slide>
        </ion-slides>
    `,
        encapsulation: ViewEncapsulation.None,
        styles: [`
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

        .calendar-hour-column {
            width: 50px;
            white-space: nowrap;
        }

        .calendar-event-wrap {
            position: relative;
            width: 100%;
            height: 100%;
        }

        .calendar-event {
            position: absolute;
            padding: 2px;
            cursor: pointer;
            z-index: 10000;
        }

        .slides-container {
            height: 100%;
        }

        .slide-container {
            display: block;
        }

        .calendar-cell {
            padding: 0 !important;
            height: 37px;
        }

        .dayview-allday-label {
            float: left;
            height: 100%;
            line-height: 50px;
            text-align: center;
            width: 50px;
            border-left: 1px solid #ddd;
        }

        [dir="rtl"] .dayview-allday-label {
            border-right: 1px solid #ddd;
            float: right;
        }

        .dayview-allday-content-wrapper {
            margin-left: 50px;
            overflow: hidden;
            height: 51px;
        }

        [dir="rtl"] .dayview-allday-content-wrapper {
            margin-left: 0;
            margin-right: 50px;
        }

        .dayview-allday-content-table {
            min-height: 50px;
        }

        .dayview-allday-content-table td {
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
        }

        .dayview-allday-table {
            height: 50px;
            position: relative;
            border-bottom: 1px solid #ddd;
            font-size: 14px;
        }

        .dayview-normal-event-container {
            margin-top: 50px;
            overflow: hidden;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            position: absolute;
            font-size: 14px;
        }

        .scroll-content {
            overflow-y: auto;
            overflow-x: hidden;
        }

        ::-webkit-scrollbar,
        *::-webkit-scrollbar {
            display: none;
        }

        .table > tbody > tr > td.calendar-hour-column {
            padding-left: 0;
            padding-right: 0;
            vertical-align: middle;
        }

        @media (max-width: 750px) {
            .dayview-allday-label, .calendar-hour-column {
                width: 31px;
                font-size: 12px;
            }

            .dayview-allday-label {
                padding-top: 4px;
            }

            .table > tbody > tr > td.calendar-hour-column {
                padding-left: 0;
                padding-right: 0;
                vertical-align: middle;
                line-height: 12px;
            }

            .dayview-allday-label {
                line-height: 20px;
            }

            .dayview-allday-content-wrapper {
                margin-left: 31px;
            }

            [dir="rtl"] .dayview-allday-content-wrapper {
                margin-left: 0;
                margin-right: 31px;
            }
        }
    `]
    })
], DayViewComponent);
export { DayViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5dmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2lvbmljMi1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImRheXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUNILFNBQVMsRUFDVCxNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixhQUFhLEVBQ2IsU0FBUyxFQUNULGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsVUFBVSxFQUNWLGFBQWEsRUFBRSxTQUFTLEVBQzNCLE1BQU0sZUFBZSxDQUFDO0FBY3ZCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQWlYbkQsSUFBYSxnQkFBZ0Isd0JBQTdCLE1BQWEsZ0JBQWdCO0lBRXpCLFlBQW9CLGVBQWdDLEVBQVUsR0FBZTtRQUF6RCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBSS9DLFVBQUssR0FBRyxJQUFJLENBQUM7UUFpQmxDLFFBQUcsR0FBRyxFQUFFLENBQUM7UUFDVCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQVNoQixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDNUMsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzdDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDbkQsbUJBQWMsR0FBRyxJQUFJLFlBQVksQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUVuRCxVQUFLLEdBQWUsRUFBRSxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsU0FBSSxHQUFpQixLQUFLLENBQUM7UUFHMUIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLG1CQUFjLEdBQUcsSUFBSSxDQUFDO0lBMUM5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QUssRUFBRTtvREFBcUI7QUFDcEI7SUFBUixLQUFLLEVBQUU7bURBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFO2lEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTt1REFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7c0RBQXNCO0FBRXBCO0lBQVQsTUFBTSxFQUFFO3dEQUE2QztBQUM1QztJQUFULE1BQU0sRUFBRTt5REFBOEM7QUFDN0M7SUFBVCxNQUFNLEVBQUU7d0RBQW9EO0FBQ25EO0lBQVQsTUFBTSxFQUFFO3dEQUFpRDtBQXBDakQsZ0JBQWdCO0lBOVc1QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsU0FBUztRQUNuQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXVMVDtRQW1MRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFsTDVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FpTFI7S0FFSixDQUFDO0dBQ1csZ0JBQWdCLENBK2lCNUI7U0EvaUJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGF0ZVBpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0lvblNsaWRlc30gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgT25Jbml0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBIb3N0QmluZGluZyxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICAgIElDYWxlbmRhckNvbXBvbmVudCxcbiAgICBJRGF5VmlldyxcbiAgICBJRGF5Vmlld1JvdyxcbiAgICBJRGlzcGxheUV2ZW50LFxuICAgIElFdmVudCxcbiAgICBJVGltZVNlbGVjdGVkLFxuICAgIElSYW5nZSxcbiAgICBDYWxlbmRhck1vZGUsXG4gICAgSURhdGVGb3JtYXR0ZXJcbn0gZnJvbSAnLi9jYWxlbmRhcic7XG5pbXBvcnQge0NhbGVuZGFyU2VydmljZX0gZnJvbSAnLi9jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCB7SURpc3BsYXlBbGxEYXlFdmVudCwgSURheVZpZXdBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZUNvbnRleHQsIElEYXlWaWV3Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL2NhbGVuZGFyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdkYXl2aWV3JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW9uLXNsaWRlcyAjZGF5U2xpZGVyIFtvcHRpb25zXT1cInNsaWRlck9wdGlvbnNcIiBbZGlyXT1cImRpclwiIChpb25TbGlkZURpZENoYW5nZSk9XCJvblNsaWRlQ2hhbmdlZCgpXCIgY2xhc3M9XCJzbGlkZXMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW9uLXNsaWRlIGNsYXNzPVwic2xpZGUtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRheXZpZXctYWxsZGF5LXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXl2aWV3LWFsbGRheS1sYWJlbFwiPnt7YWxsRGF5TGFiZWx9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF5dmlldy1hbGxkYXktY29udGVudC13cmFwcGVyIHNjcm9sbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCBkYXl2aWV3LWFsbGRheS1jb250ZW50LXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY2VsbFwiIFtuZ0NsYXNzXT1cInsnY2FsZW5kYXItZXZlbnQtd3JhcCc6dmlld3NbMF0uYWxsRGF5RXZlbnRzLmxlbmd0aD4wfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7aGVpZ2h0OiAyNSp2aWV3c1swXS5hbGxEYXlFdmVudHMubGVuZ3RoKydweCd9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiMD09PWN1cnJlbnRWaWV3SW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJkYXl2aWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7YWxsRGF5RXZlbnRzOnZpZXdzWzBdLmFsbERheUV2ZW50cyxldmVudFRlbXBsYXRlOmRheXZpZXdBbGxEYXlFdmVudFRlbXBsYXRlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY2VsbFwiICpuZ0lmPVwiMCE9PWN1cnJlbnRWaWV3SW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJkYXl2aWV3SW5hY3RpdmVBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInthbGxEYXlFdmVudHM6dmlld3NbMF0uYWxsRGF5RXZlbnRzfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5pdC1wb3NpdGlvbi1zY3JvbGwgKm5nSWY9XCIwPT09Y3VycmVudFZpZXdJbmRleFwiIGNsYXNzPVwiZGF5dmlldy1ub3JtYWwtZXZlbnQtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2luaXRQb3NpdGlvbl09XCJpbml0U2Nyb2xsUG9zaXRpb25cIiBbZW1pdEV2ZW50XT1cInByZXNlcnZlU2Nyb2xsUG9zaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25TY3JvbGwpPVwic2V0U2Nyb2xsUG9zaXRpb24oJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1maXhlZCBkYXl2aWV3LW5vcm1hbC1ldmVudC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCB0bSBvZiB2aWV3c1swXS5yb3dzOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItaG91ci1jb2x1bW4gdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tob3VyQ29sdW1uTGFiZWxzW2ldfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNhbGVuZGFyLWNlbGxcIiB0YXBwYWJsZSAoY2xpY2spPVwic2VsZWN0KHRtLnRpbWUsIHRtLmV2ZW50cylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRheXZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3RtOnRtLCBob3VyUGFydHM6IGhvdXJQYXJ0cywgZXZlbnRUZW1wbGF0ZTpkYXl2aWV3Tm9ybWFsRXZlbnRUZW1wbGF0ZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgPC9pbml0LXBvc2l0aW9uLXNjcm9sbD5cbiAgICAgICAgICAgICAgICA8aW5pdC1wb3NpdGlvbi1zY3JvbGwgKm5nSWY9XCIwIT09Y3VycmVudFZpZXdJbmRleFwiIGNsYXNzPVwiZGF5dmlldy1ub3JtYWwtZXZlbnQtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2luaXRQb3NpdGlvbl09XCJpbml0U2Nyb2xsUG9zaXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtZml4ZWQgZGF5dmlldy1ub3JtYWwtZXZlbnQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgdG0gb2Ygdmlld3NbMF0ucm93czsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNhbGVuZGFyLWhvdXItY29sdW1uIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aG91ckNvbHVtbkxhYmVsc1tpXX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1jZWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJkYXl2aWV3SW5hY3RpdmVOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3RtOnRtLCBob3VyUGFydHM6IGhvdXJQYXJ0c31cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgPC9pbml0LXBvc2l0aW9uLXNjcm9sbD5cbiAgICAgICAgICAgIDwvaW9uLXNsaWRlPlxuICAgICAgICAgICAgPGlvbi1zbGlkZSBjbGFzcz1cInNsaWRlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXl2aWV3LWFsbGRheS10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF5dmlldy1hbGxkYXktbGFiZWxcIj57e2FsbERheUxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRheXZpZXctYWxsZGF5LWNvbnRlbnQtd3JhcHBlciBzY3JvbGwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgZGF5dmlldy1hbGxkYXktY29udGVudC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNhbGVuZGFyLWNlbGxcIiBbbmdDbGFzc109XCJ7J2NhbGVuZGFyLWV2ZW50LXdyYXAnOnZpZXdzWzFdLmFsbERheUV2ZW50cy5sZW5ndGg+MH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwie2hlaWdodDogMjUqdmlld3NbMV0uYWxsRGF5RXZlbnRzLmxlbmd0aCsncHgnfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIjE9PT1jdXJyZW50Vmlld0luZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZGF5dmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2FsbERheUV2ZW50czp2aWV3c1sxXS5hbGxEYXlFdmVudHMsZXZlbnRUZW1wbGF0ZTpkYXl2aWV3QWxsRGF5RXZlbnRUZW1wbGF0ZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNhbGVuZGFyLWNlbGxcIiAqbmdJZj1cIjEhPT1jdXJyZW50Vmlld0luZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZGF5dmlld0luYWN0aXZlQWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7YWxsRGF5RXZlbnRzOnZpZXdzWzFdLmFsbERheUV2ZW50c31cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGluaXQtcG9zaXRpb24tc2Nyb2xsICpuZ0lmPVwiMT09PWN1cnJlbnRWaWV3SW5kZXhcIiBjbGFzcz1cImRheXZpZXctbm9ybWFsLWV2ZW50LWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpbml0UG9zaXRpb25dPVwiaW5pdFNjcm9sbFBvc2l0aW9uXCIgW2VtaXRFdmVudF09XCJwcmVzZXJ2ZVNjcm9sbFBvc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uU2Nyb2xsKT1cInNldFNjcm9sbFBvc2l0aW9uKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtZml4ZWQgZGF5dmlldy1ub3JtYWwtZXZlbnQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgdG0gb2Ygdmlld3NbMV0ucm93czsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNhbGVuZGFyLWhvdXItY29sdW1uIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aG91ckNvbHVtbkxhYmVsc1tpXX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1jZWxsXCIgdGFwcGFibGUgKGNsaWNrKT1cInNlbGVjdCh0bS50aW1lLCB0bS5ldmVudHMpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJkYXl2aWV3Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInt0bTp0bSwgaG91clBhcnRzOiBob3VyUGFydHMsIGV2ZW50VGVtcGxhdGU6ZGF5dmlld05vcm1hbEV2ZW50VGVtcGxhdGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgIDwvaW5pdC1wb3NpdGlvbi1zY3JvbGw+XG4gICAgICAgICAgICAgICAgPGluaXQtcG9zaXRpb24tc2Nyb2xsICpuZ0lmPVwiMSE9PWN1cnJlbnRWaWV3SW5kZXhcIiBjbGFzcz1cImRheXZpZXctbm9ybWFsLWV2ZW50LWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpbml0UG9zaXRpb25dPVwiaW5pdFNjcm9sbFBvc2l0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWZpeGVkIGRheXZpZXctbm9ybWFsLWV2ZW50LXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHRtIG9mIHZpZXdzWzFdLnJvd3M7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1ob3VyLWNvbHVtbiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2hvdXJDb2x1bW5MYWJlbHNbaV19fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZGF5dmlld0luYWN0aXZlTm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInt0bTp0bSwgaG91clBhcnRzOiBob3VyUGFydHN9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgIDwvaW5pdC1wb3NpdGlvbi1zY3JvbGw+XG4gICAgICAgICAgICA8L2lvbi1zbGlkZT5cbiAgICAgICAgICAgIDxpb24tc2xpZGUgY2xhc3M9XCJzbGlkZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF5dmlldy1hbGxkYXktdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRheXZpZXctYWxsZGF5LWxhYmVsXCI+e3thbGxEYXlMYWJlbH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXl2aWV3LWFsbGRheS1jb250ZW50LXdyYXBwZXIgc2Nyb2xsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIGRheXZpZXctYWxsZGF5LWNvbnRlbnQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1jZWxsXCIgW25nQ2xhc3NdPVwieydjYWxlbmRhci1ldmVudC13cmFwJzp2aWV3c1syXS5hbGxEYXlFdmVudHMubGVuZ3RoPjB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cIntoZWlnaHQ6IDI1KnZpZXdzWzJdLmFsbERheUV2ZW50cy5sZW5ndGgrJ3B4J31cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIyPT09Y3VycmVudFZpZXdJbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRheXZpZXdBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInthbGxEYXlFdmVudHM6dmlld3NbMl0uYWxsRGF5RXZlbnRzLGV2ZW50VGVtcGxhdGU6ZGF5dmlld0FsbERheUV2ZW50VGVtcGxhdGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1jZWxsXCIgKm5nSWY9XCIyIT09Y3VycmVudFZpZXdJbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRheXZpZXdJbmFjdGl2ZUFsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2FsbERheUV2ZW50czp2aWV3c1syXS5hbGxEYXlFdmVudHN9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbml0LXBvc2l0aW9uLXNjcm9sbCAqbmdJZj1cIjI9PT1jdXJyZW50Vmlld0luZGV4XCIgY2xhc3M9XCJkYXl2aWV3LW5vcm1hbC1ldmVudC1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaW5pdFBvc2l0aW9uXT1cImluaXRTY3JvbGxQb3NpdGlvblwiIFtlbWl0RXZlbnRdPVwicHJlc2VydmVTY3JvbGxQb3NpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvblNjcm9sbCk9XCJzZXRTY3JvbGxQb3NpdGlvbigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWZpeGVkIGRheXZpZXctbm9ybWFsLWV2ZW50LXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHRtIG9mIHZpZXdzWzJdLnJvd3M7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1ob3VyLWNvbHVtbiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2hvdXJDb2x1bW5MYWJlbHNbaV19fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY2VsbFwiIHRhcHBhYmxlIChjbGljayk9XCJzZWxlY3QodG0udGltZSwgdG0uZXZlbnRzKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZGF5dmlld05vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dG06dG0sIGhvdXJQYXJ0czogaG91clBhcnRzLCBldmVudFRlbXBsYXRlOmRheXZpZXdOb3JtYWxFdmVudFRlbXBsYXRlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICA8L2luaXQtcG9zaXRpb24tc2Nyb2xsPlxuICAgICAgICAgICAgICAgIDxpbml0LXBvc2l0aW9uLXNjcm9sbCAqbmdJZj1cIjIhPT1jdXJyZW50Vmlld0luZGV4XCIgY2xhc3M9XCJkYXl2aWV3LW5vcm1hbC1ldmVudC1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaW5pdFBvc2l0aW9uXT1cImluaXRTY3JvbGxQb3NpdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1maXhlZCBkYXl2aWV3LW5vcm1hbC1ldmVudC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCB0bSBvZiB2aWV3c1syXS5yb3dzOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItaG91ci1jb2x1bW4gdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tob3VyQ29sdW1uTGFiZWxzW2ldfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNhbGVuZGFyLWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRheXZpZXdJbmFjdGl2ZU5vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dG06dG0sIGhvdXJQYXJ0czogaG91clBhcnRzfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICA8L2luaXQtcG9zaXRpb24tc2Nyb2xsPlxuICAgICAgICAgICAgPC9pb24tc2xpZGU+XG4gICAgICAgIDwvaW9uLXNsaWRlcz5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLnRhYmxlLWZpeGVkIHtcbiAgICAgICAgICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAudGFibGUge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZSA+IHRoZWFkID4gdHIgPiB0aCwgLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRoLCAudGFibGUgPiB0Zm9vdCA+IHRyID4gdGgsIC50YWJsZSA+IHRoZWFkID4gdHIgPiB0ZCxcbiAgICAgICAgLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRkLCAudGFibGUgPiB0Zm9vdCA+IHRyID4gdGQge1xuICAgICAgICAgICAgcGFkZGluZzogOHB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRoIHtcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2RkZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZSA+IHRoZWFkOmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCwgLnRhYmxlID4gdGhlYWQ6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCA+IHRkIHtcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDBcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZSA+IHRib2R5ICsgdGJvZHkge1xuICAgICAgICAgICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICNkZGQ7XG4gICAgICAgIH1cblxuICAgICAgICAudGFibGUtYm9yZGVyZWQge1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0aCwgLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRoLCAudGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyID4gdGgsXG4gICAgICAgIC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0ZCwgLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRkLCAudGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyID4gdGQge1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0aCwgLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRkIHtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDJweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZS1zdHJpcGVkID4gdGJvZHkgPiB0cjpudGgtY2hpbGQob2RkKSA+IHRkLCAudGFibGUtc3RyaXBlZCA+IHRib2R5ID4gdHI6bnRoLWNoaWxkKG9kZCkgPiB0aCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5XG4gICAgICAgIH1cblxuICAgICAgICAuY2FsZW5kYXItaG91ci1jb2x1bW4ge1xuICAgICAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNhbGVuZGFyLWV2ZW50LXdyYXAge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAuY2FsZW5kYXItZXZlbnQge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgcGFkZGluZzogMnB4O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgei1pbmRleDogMTAwMDA7XG4gICAgICAgIH1cblxuICAgICAgICAuc2xpZGVzLWNvbnRhaW5lciB7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAuc2xpZGUtY29udGFpbmVyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNhbGVuZGFyLWNlbGwge1xuICAgICAgICAgICAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgaGVpZ2h0OiAzN3B4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmRheXZpZXctYWxsZGF5LWxhYmVsIHtcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2RkZDtcbiAgICAgICAgfVxuXG4gICAgICAgIFtkaXI9XCJydGxcIl0gLmRheXZpZXctYWxsZGF5LWxhYmVsIHtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAuZGF5dmlldy1hbGxkYXktY29udGVudC13cmFwcGVyIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiA1MHB4O1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIGhlaWdodDogNTFweDtcbiAgICAgICAgfVxuXG4gICAgICAgIFtkaXI9XCJydGxcIl0gLmRheXZpZXctYWxsZGF5LWNvbnRlbnQtd3JhcHBlciB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogNTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5kYXl2aWV3LWFsbGRheS1jb250ZW50LXRhYmxlIHtcbiAgICAgICAgICAgIG1pbi1oZWlnaHQ6IDUwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAuZGF5dmlldy1hbGxkYXktY29udGVudC10YWJsZSB0ZCB7XG4gICAgICAgICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZGRkO1xuICAgICAgICB9XG5cbiAgICAgICAgLmRheXZpZXctYWxsZGF5LXRhYmxlIHtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmRheXZpZXctbm9ybWFsLWV2ZW50LWNvbnRhaW5lciB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiA1MHB4O1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zY3JvbGwtY29udGVudCB7XG4gICAgICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgICAgICB9XG5cbiAgICAgICAgOjotd2Via2l0LXNjcm9sbGJhcixcbiAgICAgICAgKjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZSA+IHRib2R5ID4gdHIgPiB0ZC5jYWxlbmRhci1ob3VyLWNvbHVtbiB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NTBweCkge1xuICAgICAgICAgICAgLmRheXZpZXctYWxsZGF5LWxhYmVsLCAuY2FsZW5kYXItaG91ci1jb2x1bW4ge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAzMXB4O1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmRheXZpZXctYWxsZGF5LWxhYmVsIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLXRvcDogNHB4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAudGFibGUgPiB0Ym9keSA+IHRyID4gdGQuY2FsZW5kYXItaG91ci1jb2x1bW4ge1xuICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgICAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDEycHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5kYXl2aWV3LWFsbGRheS1sYWJlbCB7XG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5kYXl2aWV3LWFsbGRheS1jb250ZW50LXdyYXBwZXIge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAzMXB4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBbZGlyPVwicnRsXCJdIC5kYXl2aWV3LWFsbGRheS1jb250ZW50LXdyYXBwZXIge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMzFweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIGBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRGF5Vmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIElDYWxlbmRhckNvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbGVuZGFyU2VydmljZTogQ2FsZW5kYXJTZXJ2aWNlLCBwcml2YXRlIGVsbTogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoJ2RheVNsaWRlcicsIHtzdGF0aWM6IHRydWV9KSBzbGlkZXI6IElvblNsaWRlcztcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRheXZpZXcnKSBjbGFzcyA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBkYXl2aWV3QWxsRGF5RXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SURpc3BsYXlBbGxEYXlFdmVudD47XG4gICAgQElucHV0KCkgZGF5dmlld05vcm1hbEV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPElEaXNwbGF5RXZlbnQ+O1xuICAgIEBJbnB1dCgpIGRheXZpZXdBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8SURheVZpZXdBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZUNvbnRleHQ+O1xuICAgIEBJbnB1dCgpIGRheXZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8SURheVZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZUNvbnRleHQ+O1xuICAgIEBJbnB1dCgpIGRheXZpZXdJbmFjdGl2ZUFsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxJRGF5Vmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgZGF5dmlld0luYWN0aXZlTm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPElEYXlWaWV3Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGVDb250ZXh0PjtcblxuICAgIEBJbnB1dCgpIGZvcm1hdEhvdXJDb2x1bW46IHN0cmluZztcbiAgICBASW5wdXQoKSBmb3JtYXREYXlUaXRsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFsbERheUxhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaG91clBhcnRzOiBudW1iZXI7XG4gICAgQElucHV0KCkgZXZlbnRTb3VyY2U6IElFdmVudFtdO1xuICAgIEBJbnB1dCgpIG1hcmtEaXNhYmxlZDogKGRhdGU6IERhdGUpID0+IGJvb2xlYW47XG4gICAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZGF0ZUZvcm1hdHRlcjogSURhdGVGb3JtYXR0ZXI7XG4gICAgQElucHV0KCkgZGlyID0gJyc7XG4gICAgQElucHV0KCkgc2Nyb2xsVG9Ib3VyID0gMDtcbiAgICBASW5wdXQoKSBwcmVzZXJ2ZVNjcm9sbFBvc2l0aW9uOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGxvY2tTd2lwZVRvUHJldjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBsb2NrU3dpcGVzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHN0YXJ0SG91cjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGVuZEhvdXI6IG51bWJlcjtcbiAgICBASW5wdXQoKSBzbGlkZXJPcHRpb25zOiBhbnk7XG4gICAgQElucHV0KCkgaG91clNlZ21lbnRzOiBudW1iZXI7XG5cbiAgICBAT3V0cHV0KCkgb25SYW5nZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPElSYW5nZT4oKTtcbiAgICBAT3V0cHV0KCkgb25FdmVudFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxJRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIG9uVGltZVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxJVGltZVNlbGVjdGVkPigpO1xuICAgIEBPdXRwdXQoKSBvblRpdGxlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPih0cnVlKTtcblxuICAgIHB1YmxpYyB2aWV3czogSURheVZpZXdbXSA9IFtdO1xuICAgIHB1YmxpYyBjdXJyZW50Vmlld0luZGV4ID0gMDtcbiAgICBwdWJsaWMgZGlyZWN0aW9uID0gMDtcbiAgICBwdWJsaWMgbW9kZTogQ2FsZW5kYXJNb2RlID0gJ2RheSc7XG4gICAgcHVibGljIHJhbmdlOiBJUmFuZ2U7XG5cbiAgICBwcml2YXRlIGluaXRlZCA9IGZhbHNlO1xuICAgIHByaXZhdGUgY2FsbGJhY2tPbkluaXQgPSB0cnVlO1xuICAgIHByaXZhdGUgY3VycmVudERhdGVDaGFuZ2VkRnJvbVBhcmVudFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgZXZlbnRTb3VyY2VDaGFuZ2VkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBzbGlkZUNoYW5nZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIHNsaWRlVXBkYXRlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHVibGljIGhvdXJDb2x1bW5MYWJlbHM6IHN0cmluZ1tdO1xuICAgIHB1YmxpYyBpbml0U2Nyb2xsUG9zaXRpb246IG51bWJlcjtcbiAgICBwcml2YXRlIGZvcm1hdFRpdGxlOiAoZGF0ZTogRGF0ZSkgPT4gc3RyaW5nO1xuICAgIHByaXZhdGUgZm9ybWF0SG91ckNvbHVtbkxhYmVsOiAoZGF0ZTogRGF0ZSkgPT4gc3RyaW5nO1xuICAgIHByaXZhdGUgaG91clJhbmdlOiBudW1iZXI7XG5cbiAgICBzdGF0aWMgY3JlYXRlRGF0ZU9iamVjdHMoc3RhcnRUaW1lOiBEYXRlLCBzdGFydEhvdXI6IG51bWJlciwgZW5kSG91cjogbnVtYmVyLCB0aW1lSW50ZXJ2YWw6IG51bWJlcik6IElEYXlWaWV3Um93W10ge1xuICAgICAgICBjb25zdCByb3dzOiBJRGF5Vmlld1Jvd1tdID0gW10sXG4gICAgICAgICAgICBjdXJyZW50SG91ciA9IDAsXG4gICAgICAgICAgICBjdXJyZW50RGF0ZSA9IHN0YXJ0VGltZS5nZXREYXRlKCk7XG4gICAgICAgIGxldCB0aW1lOiBEYXRlLFxuICAgICAgICAgICAgaG91clN0ZXAsXG4gICAgICAgICAgICBtaW5TdGVwO1xuXG4gICAgICAgIGlmICh0aW1lSW50ZXJ2YWwgPCAxKSB7XG4gICAgICAgICAgICBob3VyU3RlcCA9IE1hdGguZmxvb3IoMSAvIHRpbWVJbnRlcnZhbCk7XG4gICAgICAgICAgICBtaW5TdGVwID0gNjA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob3VyU3RlcCA9IDE7XG4gICAgICAgICAgICBtaW5TdGVwID0gTWF0aC5mbG9vcig2MCAvIHRpbWVJbnRlcnZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBob3VyID0gc3RhcnRIb3VyOyBob3VyIDwgZW5kSG91cjsgaG91ciArPSBob3VyU3RlcCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaW50ZXJ2YWwgPSAwOyBpbnRlcnZhbCA8IDYwOyBpbnRlcnZhbCArPSBtaW5TdGVwKSB7XG4gICAgICAgICAgICAgICAgdGltZSA9IG5ldyBEYXRlKHN0YXJ0VGltZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgIHRpbWUuc2V0SG91cnMoY3VycmVudEhvdXIgKyBob3VyLCBpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgdGltZS5zZXREYXRlKGN1cnJlbnREYXRlKTtcbiAgICAgICAgICAgICAgICByb3dzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aW1lLFxuICAgICAgICAgICAgICAgICAgICBldmVudHM6IFtdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvd3M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgY29tcGFyZUV2ZW50QnlTdGFydE9mZnNldChldmVudEE6IElEaXNwbGF5RXZlbnQsIGV2ZW50QjogSURpc3BsYXlFdmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnRBLnN0YXJ0T2Zmc2V0IC0gZXZlbnRCLnN0YXJ0T2Zmc2V0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGNhbGN1bGF0ZVdpZHRoKG9yZGVyZWRFdmVudHM6IElEaXNwbGF5RXZlbnRbXSwgc2l6ZTogbnVtYmVyLCBob3VyUGFydHM6IG51bWJlcikge1xuICAgICAgICBjb25zdCB0b3RhbFNpemUgPSBzaXplICogaG91clBhcnRzLFxuICAgICAgICAgICAgY2VsbHM6IHsgY2FsY3VsYXRlZDogYm9vbGVhbjsgZXZlbnRzOiBJRGlzcGxheUV2ZW50W107IH1bXSA9IG5ldyBBcnJheSh0b3RhbFNpemUpO1xuXG4gICAgICAgIC8vIHNvcnQgYnkgcG9zaXRpb24gaW4gZGVzY2VuZGluZyBvcmRlciwgdGhlIHJpZ2h0IG1vc3QgY29sdW1ucyBzaG91bGQgYmUgY2FsY3VsYXRlZCBmaXJzdFxuICAgICAgICBvcmRlcmVkRXZlbnRzLnNvcnQoKGV2ZW50QSwgZXZlbnRCKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnRCLnBvc2l0aW9uIC0gZXZlbnRBLnBvc2l0aW9uO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbFNpemU7IGkgKz0gMSkge1xuICAgICAgICAgICAgY2VsbHNbaV0gPSB7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsZW4gPSBvcmRlcmVkRXZlbnRzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBvcmRlcmVkRXZlbnRzW2ldO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gZXZlbnQuc3RhcnRJbmRleCAqIGhvdXJQYXJ0cyArIGV2ZW50LnN0YXJ0T2Zmc2V0O1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgZXZlbnQuZW5kSW5kZXggKiBob3VyUGFydHMgLSBldmVudC5lbmRPZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBjZWxsc1tpbmRleF0uZXZlbnRzLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBvcmRlcmVkRXZlbnRzW2ldO1xuICAgICAgICAgICAgaWYgKCFldmVudC5vdmVybGFwTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3ZlcmxhcE51bWJlciA9IGV2ZW50LnBvc2l0aW9uICsgMTtcbiAgICAgICAgICAgICAgICBldmVudC5vdmVybGFwTnVtYmVyID0gb3ZlcmxhcE51bWJlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudFF1ZXVlID0gW2V2ZW50XTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZXZlbnQgPSBldmVudFF1ZXVlLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gZXZlbnQuc3RhcnRJbmRleCAqIGhvdXJQYXJ0cyArIGV2ZW50LnN0YXJ0T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaW5kZXggPCBldmVudC5lbmRJbmRleCAqIGhvdXJQYXJ0cyAtIGV2ZW50LmVuZE9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjZWxsc1tpbmRleF0uY2FsY3VsYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzW2luZGV4XS5jYWxjdWxhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbHNbaW5kZXhdLmV2ZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudENvdW50SW5DZWxsID0gY2VsbHNbaW5kZXhdLmV2ZW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZXZlbnRDb3VudEluQ2VsbDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50RXZlbnRJbkNlbGwgPSBjZWxsc1tpbmRleF0uZXZlbnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50RXZlbnRJbkNlbGwub3ZlcmxhcE51bWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFdmVudEluQ2VsbC5vdmVybGFwTnVtYmVyID0gb3ZlcmxhcE51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFF1ZXVlLnB1c2goY3VycmVudEV2ZW50SW5DZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNsaWRlck9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyT3B0aW9ucyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2xpZGVyT3B0aW9ucy5sb29wID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmhvdXJSYW5nZSA9ICh0aGlzLmVuZEhvdXIgLSB0aGlzLnN0YXJ0SG91cikgKiB0aGlzLmhvdXJTZWdtZW50cztcbiAgICAgICAgaWYgKHRoaXMuZGF0ZUZvcm1hdHRlciAmJiB0aGlzLmRhdGVGb3JtYXR0ZXIuZm9ybWF0RGF5Vmlld1RpdGxlKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdFRpdGxlID0gdGhpcy5kYXRlRm9ybWF0dGVyLmZvcm1hdERheVZpZXdUaXRsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQaXBlID0gbmV3IERhdGVQaXBlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0VGl0bGUgPSBmdW5jdGlvbihkYXRlOiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGVQaXBlLnRyYW5zZm9ybShkYXRlLCB0aGlzLmZvcm1hdERheVRpdGxlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRlRm9ybWF0dGVyICYmIHRoaXMuZGF0ZUZvcm1hdHRlci5mb3JtYXREYXlWaWV3SG91ckNvbHVtbikge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXRIb3VyQ29sdW1uTGFiZWwgPSB0aGlzLmRhdGVGb3JtYXR0ZXIuZm9ybWF0RGF5Vmlld0hvdXJDb2x1bW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGlwZSA9IG5ldyBEYXRlUGlwZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdEhvdXJDb2x1bW5MYWJlbCA9IGZ1bmN0aW9uKGRhdGU6IERhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsIHRoaXMuZm9ybWF0SG91ckNvbHVtbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubG9ja1N3aXBlVG9QcmV2KSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5sb2NrU3dpcGVUb1ByZXYodHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sb2NrU3dpcGVzKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5sb2NrU3dpcGVzKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICAgICAgICB0aGlzLmhvdXJDb2x1bW5MYWJlbHMgPSB0aGlzLmdldEhvdXJDb2x1bW5MYWJlbHMoKTtcblxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUNoYW5nZWRGcm9tUGFyZW50U3Vic2NyaXB0aW9uID0gdGhpcy5jYWxlbmRhclNlcnZpY2UuY3VycmVudERhdGVDaGFuZ2VkRnJvbVBhcmVudCQuc3Vic2NyaWJlKGN1cnJlbnREYXRlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ldmVudFNvdXJjZUNoYW5nZWRTdWJzY3JpcHRpb24gPSB0aGlzLmNhbGVuZGFyU2VydmljZS5ldmVudFNvdXJjZUNoYW5nZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRGF0YUxvYWRlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNsaWRlQ2hhbmdlZFN1YnNjcmlwdGlvbiA9IHRoaXMuY2FsZW5kYXJTZXJ2aWNlLnNsaWRlQ2hhbmdlZCQuc3Vic2NyaWJlKGRpcmVjdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci5zbGlkZVByZXYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zbGlkZVVwZGF0ZWRTdWJzY3JpcHRpb24gPSB0aGlzLmNhbGVuZGFyU2VydmljZS5zbGlkZVVwZGF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci51cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKTtcbiAgICAgICAgdGhpcy5vblRpdGxlQ2hhbmdlZC5lbWl0KHRpdGxlKTtcblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxUb0hvdXIgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBob3VyQ29sdW1ucyA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRheXZpZXctbm9ybWFsLWV2ZW50LWNvbnRhaW5lcicpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYWxlbmRhci1ob3VyLWNvbHVtbicpO1xuICAgICAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbWUuaW5pdFNjcm9sbFBvc2l0aW9uID0gaG91ckNvbHVtbnNbbWUuc2Nyb2xsVG9Ib3VyIC0gbWUuc3RhcnRIb3VyXS5vZmZzZXRUb3A7XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICghdGhpcy5pbml0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGV2ZW50U291cmNlQ2hhbmdlID0gY2hhbmdlcy5ldmVudFNvdXJjZTtcbiAgICAgICAgaWYgKGV2ZW50U291cmNlQ2hhbmdlICYmIGV2ZW50U291cmNlQ2hhbmdlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5vbkRhdGFMb2FkZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxvY2tTd2lwZVRvUHJldiA9IGNoYW5nZXMubG9ja1N3aXBlVG9QcmV2O1xuICAgICAgICBpZiAobG9ja1N3aXBlVG9QcmV2KSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5sb2NrU3dpcGVUb1ByZXYobG9ja1N3aXBlVG9QcmV2LmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2NrU3dpcGVzID0gY2hhbmdlcy5sb2NrU3dpcGVzO1xuICAgICAgICBpZiAobG9ja1N3aXBlcykge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIubG9ja1N3aXBlcyhsb2NrU3dpcGVzLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudERhdGVDaGFuZ2VkRnJvbVBhcmVudFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUNoYW5nZWRGcm9tUGFyZW50U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlQ2hhbmdlZEZyb21QYXJlbnRTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZXZlbnRTb3VyY2VDaGFuZ2VkU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50U291cmNlQ2hhbmdlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZUNoYW5nZWRTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2xpZGVDaGFuZ2VkU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlQ2hhbmdlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZUNoYW5nZWRTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2xpZGVVcGRhdGVkU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVXBkYXRlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZVVwZGF0ZWRTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TbGlkZUNoYW5nZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrT25Jbml0KSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrT25Jbml0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gMDtcbiAgICAgICAgY29uc3QgY3VycmVudFZpZXdJbmRleCA9IHRoaXMuY3VycmVudFZpZXdJbmRleDtcblxuICAgICAgICB0aGlzLnNsaWRlci5nZXRBY3RpdmVJbmRleCgpLnRoZW4oKGN1cnJlbnRTbGlkZUluZGV4KSA9PiB7XG4gICAgICAgICAgICBjdXJyZW50U2xpZGVJbmRleCA9IChjdXJyZW50U2xpZGVJbmRleCArIDIpICUgMztcbiAgICAgICAgICAgIGlmKGlzTmFOKGN1cnJlbnRTbGlkZUluZGV4KSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZUluZGV4ID0gY3VycmVudFZpZXdJbmRleDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRTbGlkZUluZGV4IC0gY3VycmVudFZpZXdJbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTbGlkZUluZGV4ID09PSAwICYmIGN1cnJlbnRWaWV3SW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyLnNsaWRlVG8oMSwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Vmlld0luZGV4IC0gY3VycmVudFNsaWRlSW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAtMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFNsaWRlSW5kZXggPT09IDIgJiYgY3VycmVudFZpZXdJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IC0xO1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyLnNsaWRlVG8oMywgMCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50Vmlld0luZGV4ID0gY3VycmVudFNsaWRlSW5kZXg7XG4gICAgICAgICAgICB0aGlzLm1vdmUoZGlyZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbW92ZShkaXJlY3Rpb246IG51bWJlcikge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgY29uc3QgYWRqYWNlbnREYXRlID0gdGhpcy5jYWxlbmRhclNlcnZpY2UuZ2V0QWRqYWNlbnRDYWxlbmRhckRhdGUodGhpcy5tb2RlLCBkaXJlY3Rpb24pO1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5zZXRDdXJyZW50RGF0ZShhZGphY2VudERhdGUpO1xuICAgICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEhvdXJDb2x1bW5MYWJlbHMoKTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCBob3VyQ29sdW1uTGFiZWxzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBob3VyID0gMCwgbGVuZ3RoID0gdGhpcy52aWV3c1swXS5yb3dzLmxlbmd0aDsgaG91ciA8IGxlbmd0aDsgaG91ciArPSAxKSB7XG4gICAgICAgICAgICAvLyBoYW5kbGUgZWRnZSBjYXNlIGZvciBEU1RcbiAgICAgICAgICAgIGlmIChob3VyID09PSAwICYmIHRoaXMudmlld3NbMF0ucm93c1tob3VyXS50aW1lLmdldEhvdXJzKCkgIT09IHRoaXMuc3RhcnRIb3VyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKHRoaXMudmlld3NbMF0ucm93c1tob3VyXS50aW1lKTtcbiAgICAgICAgICAgICAgICB0aW1lLnNldERhdGUodGltZS5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgICAgICAgICB0aW1lLnNldEhvdXJzKHRoaXMuc3RhcnRIb3VyKTtcbiAgICAgICAgICAgICAgICBob3VyQ29sdW1uTGFiZWxzLnB1c2godGhpcy5mb3JtYXRIb3VyQ29sdW1uTGFiZWwodGltZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBob3VyQ29sdW1uTGFiZWxzLnB1c2godGhpcy5mb3JtYXRIb3VyQ29sdW1uTGFiZWwodGhpcy52aWV3c1swXS5yb3dzW2hvdXJdLnRpbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaG91ckNvbHVtbkxhYmVscztcbiAgICB9XG5cbiAgICBnZXRWaWV3RGF0YShzdGFydFRpbWU6IERhdGUpOiBJRGF5VmlldyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBEYXlWaWV3Q29tcG9uZW50LmNyZWF0ZURhdGVPYmplY3RzKHN0YXJ0VGltZSwgdGhpcy5zdGFydEhvdXIsIHRoaXMuZW5kSG91ciwgdGhpcy5ob3VyU2VnbWVudHMpLFxuICAgICAgICAgICAgYWxsRGF5RXZlbnRzOiBbXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldFJhbmdlKGN1cnJlbnREYXRlOiBEYXRlKTogSVJhbmdlIHtcbiAgICAgICAgY29uc3QgeWVhciA9IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICBtb250aCA9IGN1cnJlbnREYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICBkYXRlID0gY3VycmVudERhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgc3RhcnRUaW1lID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUsIDEyLCAwLCAwKSxcbiAgICAgICAgICAgIGVuZFRpbWUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSArIDEsIDEyLCAwLCAwKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICAgICAgZW5kVGltZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uRGF0YUxvYWRlZCgpIHtcbiAgICAgICAgY29uc3QgZXZlbnRTb3VyY2UgPSB0aGlzLmV2ZW50U291cmNlLFxuICAgICAgICAgICAgbGVuID0gZXZlbnRTb3VyY2UgPyBldmVudFNvdXJjZS5sZW5ndGggOiAwLFxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdGhpcy5yYW5nZS5zdGFydFRpbWUsXG4gICAgICAgICAgICBlbmRUaW1lID0gdGhpcy5yYW5nZS5lbmRUaW1lLFxuICAgICAgICAgICAgdXRjU3RhcnRUaW1lID0gRGF0ZS5VVEMoc3RhcnRUaW1lLmdldEZ1bGxZZWFyKCksIHN0YXJ0VGltZS5nZXRNb250aCgpLCBzdGFydFRpbWUuZ2V0RGF0ZSgpKSxcbiAgICAgICAgICAgIHV0Y0VuZFRpbWUgPSBEYXRlLlVUQyhlbmRUaW1lLmdldEZ1bGxZZWFyKCksIGVuZFRpbWUuZ2V0TW9udGgoKSwgZW5kVGltZS5nZXREYXRlKCkpLFxuICAgICAgICAgICAgY3VycmVudFZpZXdJbmRleCA9IHRoaXMuY3VycmVudFZpZXdJbmRleCxcbiAgICAgICAgICAgIHJvd3MgPSB0aGlzLnZpZXdzW2N1cnJlbnRWaWV3SW5kZXhdLnJvd3MsXG4gICAgICAgICAgICBhbGxEYXlFdmVudHM6IElEaXNwbGF5QWxsRGF5RXZlbnRbXSA9IHRoaXMudmlld3NbY3VycmVudFZpZXdJbmRleF0uYWxsRGF5RXZlbnRzID0gW10sXG4gICAgICAgICAgICBvbmVIb3VyID0gMzYwMDAwMCxcbiAgICAgICAgICAgIGVwcyA9IDAuMDE2LFxuICAgICAgICAgICAgcmFuZ2VTdGFydFJvd0luZGV4ID0gdGhpcy5zdGFydEhvdXIgKiB0aGlzLmhvdXJTZWdtZW50cyxcbiAgICAgICAgICAgIHJhbmdlRW5kUm93SW5kZXggPSB0aGlzLmVuZEhvdXIgKiB0aGlzLmhvdXJTZWdtZW50cztcbiAgICAgICAgbGV0IG5vcm1hbEV2ZW50SW5SYW5nZSA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGhvdXIgPSAwOyBob3VyIDwgdGhpcy5ob3VyUmFuZ2U7IGhvdXIgKz0gMSkge1xuICAgICAgICAgICAgcm93c1tob3VyXS5ldmVudHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRTb3VyY2VbaV07XG4gICAgICAgICAgICBjb25zdCBldmVudFN0YXJ0VGltZSA9IGV2ZW50LnN0YXJ0VGltZTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50RW5kVGltZSA9IGV2ZW50LmVuZFRpbWU7XG4gICAgICAgICAgICBsZXQgZXZlbnRVVENTdGFydFRpbWU6IG51bWJlcixcbiAgICAgICAgICAgICAgICBldmVudFVUQ0VuZFRpbWU6IG51bWJlcjtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LmFsbERheSkge1xuICAgICAgICAgICAgICAgIGV2ZW50VVRDU3RhcnRUaW1lID0gZXZlbnRTdGFydFRpbWUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50VVRDRW5kVGltZSA9IGV2ZW50RW5kVGltZS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV2ZW50VVRDU3RhcnRUaW1lID0gRGF0ZS5VVEMoZXZlbnRTdGFydFRpbWUuZ2V0RnVsbFllYXIoKSwgZXZlbnRTdGFydFRpbWUuZ2V0TW9udGgoKSwgZXZlbnRTdGFydFRpbWUuZ2V0RGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBldmVudFVUQ0VuZFRpbWUgPSBEYXRlLlVUQyhldmVudEVuZFRpbWUuZ2V0RnVsbFllYXIoKSwgZXZlbnRFbmRUaW1lLmdldE1vbnRoKCksIGV2ZW50RW5kVGltZS5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV2ZW50VVRDRW5kVGltZSA8PSB1dGNTdGFydFRpbWUgfHwgZXZlbnRVVENTdGFydFRpbWUgPj0gdXRjRW5kVGltZSB8fCBldmVudFN0YXJ0VGltZSA+PSBldmVudEVuZFRpbWUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV2ZW50LmFsbERheSkge1xuICAgICAgICAgICAgICAgIGFsbERheUV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9ybWFsRXZlbnRJblJhbmdlID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGxldCB0aW1lRGlmZmVyZW5jZVN0YXJ0OiBudW1iZXI7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50VVRDU3RhcnRUaW1lIDwgdXRjU3RhcnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVEaWZmZXJlbmNlU3RhcnQgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVEaWZmZXJlbmNlU3RhcnQgPSAoZXZlbnRTdGFydFRpbWUuZ2V0SG91cnMoKSArIGV2ZW50U3RhcnRUaW1lLmdldE1pbnV0ZXMoKSAvIDYwKSAqIHRoaXMuaG91clNlZ21lbnRzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCB0aW1lRGlmZmVyZW5jZUVuZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIGlmIChldmVudFVUQ0VuZFRpbWUgPiB1dGNFbmRUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVEaWZmZXJlbmNlRW5kID0gKHV0Y0VuZFRpbWUgLSB1dGNTdGFydFRpbWUpIC8gb25lSG91ciAqIHRoaXMuaG91clNlZ21lbnRzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVEaWZmZXJlbmNlRW5kID0gKGV2ZW50RW5kVGltZS5nZXRIb3VycygpICsgZXZlbnRFbmRUaW1lLmdldE1pbnV0ZXMoKSAvIDYwKSAqIHRoaXMuaG91clNlZ21lbnRzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBzdGFydEluZGV4ID0gTWF0aC5mbG9vcih0aW1lRGlmZmVyZW5jZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICBsZXQgZW5kSW5kZXggPSBNYXRoLmNlaWwodGltZURpZmZlcmVuY2VFbmQgLSBlcHMpO1xuICAgICAgICAgICAgICAgIGxldCBzdGFydE9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IGVuZE9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaG91clBhcnRzICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydEluZGV4IDwgcmFuZ2VTdGFydFJvd0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9mZnNldCA9IE1hdGguZmxvb3IoKHRpbWVEaWZmZXJlbmNlU3RhcnQgLSBzdGFydEluZGV4KSAqIHRoaXMuaG91clBhcnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kSW5kZXggPiByYW5nZUVuZFJvd0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kT2Zmc2V0ID0gTWF0aC5mbG9vcigoZW5kSW5kZXggLSB0aW1lRGlmZmVyZW5jZUVuZCkgKiB0aGlzLmhvdXJQYXJ0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRJbmRleCA8IHJhbmdlU3RhcnRSb3dJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFydEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGFydEluZGV4IC09IHJhbmdlU3RhcnRSb3dJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVuZEluZGV4ID4gcmFuZ2VFbmRSb3dJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBlbmRJbmRleCA9IHJhbmdlRW5kUm93SW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVuZEluZGV4IC09IHJhbmdlU3RhcnRSb3dJbmRleDtcblxuICAgICAgICAgICAgICAgIGlmIChzdGFydEluZGV4IDwgZW5kSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzcGxheUV2ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydEluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZE9mZnNldFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBldmVudFNldCA9IHJvd3Nbc3RhcnRJbmRleF0uZXZlbnRzO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U2V0LnB1c2goZGlzcGxheUV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U2V0ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFNldC5wdXNoKGRpc3BsYXlFdmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzW3N0YXJ0SW5kZXhdLmV2ZW50cyA9IGV2ZW50U2V0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vcm1hbEV2ZW50SW5SYW5nZSkge1xuICAgICAgICAgICAgbGV0IG9yZGVyZWRFdmVudHM6IElEaXNwbGF5RXZlbnRbXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaG91ciA9IDA7IGhvdXIgPCB0aGlzLmhvdXJSYW5nZTsgaG91ciArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvd3NbaG91cl0uZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd3NbaG91cl0uZXZlbnRzLnNvcnQoRGF5Vmlld0NvbXBvbmVudC5jb21wYXJlRXZlbnRCeVN0YXJ0T2Zmc2V0KTtcblxuICAgICAgICAgICAgICAgICAgICBvcmRlcmVkRXZlbnRzID0gb3JkZXJlZEV2ZW50cy5jb25jYXQocm93c1tob3VyXS5ldmVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcmRlcmVkRXZlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlRXZlbnRzKG9yZGVyZWRFdmVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaFZpZXcoKSB7XG4gICAgICAgIHRoaXMucmFuZ2UgPSB0aGlzLmdldFJhbmdlKHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmN1cnJlbnREYXRlKTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGVkKSB7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKTtcbiAgICAgICAgICAgIHRoaXMub25UaXRsZUNoYW5nZWQuZW1pdCh0aXRsZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5wb3B1bGF0ZUFkamFjZW50Vmlld3ModGhpcyk7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLnJhbmdlQ2hhbmdlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRUaXRsZSgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBzdGFydGluZ0RhdGUgPSBuZXcgRGF0ZSh0aGlzLnJhbmdlLnN0YXJ0VGltZS5nZXRUaW1lKCkpO1xuICAgICAgICBzdGFydGluZ0RhdGUuc2V0SG91cnMoMTIsIDAsIDAsIDApO1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRUaXRsZShzdGFydGluZ0RhdGUpO1xuICAgIH1cblxuICAgIHNlbGVjdChzZWxlY3RlZFRpbWU6IERhdGUsIGV2ZW50czogSURpc3BsYXlFdmVudFtdKSB7XG4gICAgICAgIGxldCBkaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5tYXJrRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGRpc2FibGVkID0gdGhpcy5tYXJrRGlzYWJsZWQoc2VsZWN0ZWRUaW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25UaW1lU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgICAgICBzZWxlY3RlZFRpbWUsXG4gICAgICAgICAgICBldmVudHM6IGV2ZW50cy5tYXAoZSA9PiBlLmV2ZW50KSxcbiAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBsYWNlRXZlbnRzKG9yZGVyZWRFdmVudHM6IElEaXNwbGF5RXZlbnRbXSkge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKG9yZGVyZWRFdmVudHMpO1xuICAgICAgICBEYXlWaWV3Q29tcG9uZW50LmNhbGN1bGF0ZVdpZHRoKG9yZGVyZWRFdmVudHMsIHRoaXMuaG91clJhbmdlLCB0aGlzLmhvdXJQYXJ0cyk7XG4gICAgfVxuXG4gICAgcGxhY2VBbGxEYXlFdmVudHMob3JkZXJlZEV2ZW50czogSURpc3BsYXlFdmVudFtdKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24ob3JkZXJlZEV2ZW50cyk7XG4gICAgfVxuXG4gICAgb3ZlcmxhcChldmVudDE6IElEaXNwbGF5RXZlbnQsIGV2ZW50MjogSURpc3BsYXlFdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZWFybHlFdmVudCA9IGV2ZW50MSxcbiAgICAgICAgICAgIGxhdGVFdmVudCA9IGV2ZW50MjtcbiAgICAgICAgaWYgKGV2ZW50MS5zdGFydEluZGV4ID4gZXZlbnQyLnN0YXJ0SW5kZXggfHwgKGV2ZW50MS5zdGFydEluZGV4ID09PSBldmVudDIuc3RhcnRJbmRleCAmJiBldmVudDEuc3RhcnRPZmZzZXQgPiBldmVudDIuc3RhcnRPZmZzZXQpKSB7XG4gICAgICAgICAgICBlYXJseUV2ZW50ID0gZXZlbnQyO1xuICAgICAgICAgICAgbGF0ZUV2ZW50ID0gZXZlbnQxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVhcmx5RXZlbnQuZW5kSW5kZXggPD0gbGF0ZUV2ZW50LnN0YXJ0SW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAhKGVhcmx5RXZlbnQuZW5kSW5kZXggLSBsYXRlRXZlbnQuc3RhcnRJbmRleCA9PT0gMSAmJiBlYXJseUV2ZW50LmVuZE9mZnNldCArIGxhdGVFdmVudC5zdGFydE9mZnNldCA+PSB0aGlzLmhvdXJQYXJ0cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVQb3NpdGlvbihldmVudHM6IElEaXNwbGF5RXZlbnRbXSkge1xuICAgICAgICBjb25zdCBsZW4gPSBldmVudHMubGVuZ3RoLFxuICAgICAgICAgICAgaXNGb3JiaWRkZW46IGJvb2xlYW5bXSA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgICBsZXQgbWF4Q29sdW1uID0gMCxcbiAgICAgICAgICAgIGNvbDogbnVtYmVyO1xuXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgZm9yIChjb2wgPSAwOyBjb2wgPCBtYXhDb2x1bW47IGNvbCArPSAxKSB7XG4gICAgICAgICAgICAgICAgaXNGb3JiaWRkZW5bY29sXSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGFwKGV2ZW50c1tpXSwgZXZlbnRzW2pdKSkge1xuICAgICAgICAgICAgICAgICAgICBpc0ZvcmJpZGRlbltldmVudHNbal0ucG9zaXRpb25dID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbCA9IDA7IGNvbCA8IG1heENvbHVtbjsgY29sICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRm9yYmlkZGVuW2NvbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbCA8IG1heENvbHVtbikge1xuICAgICAgICAgICAgICAgIGV2ZW50c1tpXS5wb3NpdGlvbiA9IGNvbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzW2ldLnBvc2l0aW9uID0gbWF4Q29sdW1uKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kaXIgPT09ICdydGwnKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzW2ldLnBvc2l0aW9uID0gbWF4Q29sdW1uIC0gMSAtIGV2ZW50c1tpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50U2VsZWN0ZWQoZXZlbnQ6IElFdmVudCkge1xuICAgICAgICB0aGlzLm9uRXZlbnRTZWxlY3RlZC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBzZXRTY3JvbGxQb3NpdGlvbihzY3JvbGxQb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5pdFNjcm9sbFBvc2l0aW9uID0gc2Nyb2xsUG9zaXRpb247XG4gICAgfVxufVxuIl19