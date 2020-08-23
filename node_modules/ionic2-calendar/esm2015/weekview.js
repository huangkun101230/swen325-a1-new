var WeekViewComponent_1;
import { __decorate } from "tslib";
import { DatePipe } from '@angular/common';
import { Component, OnInit, OnChanges, HostBinding, Input, Output, EventEmitter, SimpleChanges, ViewChild, ViewEncapsulation, TemplateRef, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { CalendarService } from './calendar.service';
let WeekViewComponent = WeekViewComponent_1 = class WeekViewComponent {
    constructor(calendarService, elm) {
        this.calendarService = calendarService;
        this.elm = elm;
        this.class = true;
        this.autoSelect = true;
        this.dir = '';
        this.scrollToHour = 0;
        this.onRangeChanged = new EventEmitter();
        this.onEventSelected = new EventEmitter();
        this.onTimeSelected = new EventEmitter();
        this.onTitleChanged = new EventEmitter(true);
        this.views = [];
        this.currentViewIndex = 0;
        this.direction = 0;
        this.mode = 'week';
        this.inited = false;
        this.callbackOnInit = true;
    }
    static createDateObjects(startTime, startHour, endHour, timeInterval) {
        const times = [], currentHour = 0, currentDate = startTime.getDate();
        let hourStep, minStep;
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
                const row = [];
                for (let day = 0; day < 7; day += 1) {
                    const time = new Date(startTime.getTime());
                    time.setHours(currentHour + hour, interval);
                    time.setDate(currentDate + day);
                    row.push({
                        events: [],
                        time
                    });
                }
                times.push(row);
            }
        }
        return times;
    }
    static getDates(startTime, n) {
        const dates = new Array(n), current = new Date(startTime.getTime());
        let i = 0;
        while (i < n) {
            dates[i++] = {
                date: new Date(current.getTime()),
                events: [],
                dayHeader: ''
            };
            current.setDate(current.getDate() + 1);
        }
        return dates;
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
        if (this.dateFormatter && this.dateFormatter.formatWeekViewDayHeader) {
            this.formatDayHeader = this.dateFormatter.formatWeekViewDayHeader;
        }
        else {
            const datePipe = new DatePipe(this.locale);
            this.formatDayHeader = function (date) {
                return datePipe.transform(date, this.formatWeekViewDayHeader);
            };
        }
        if (this.dateFormatter && this.dateFormatter.formatWeekViewTitle) {
            this.formatTitle = this.dateFormatter.formatWeekViewTitle;
        }
        else {
            const datePipe = new DatePipe(this.locale);
            this.formatTitle = function (date) {
                return datePipe.transform(date, this.formatWeekTitle);
            };
        }
        if (this.dateFormatter && this.dateFormatter.formatWeekViewHourColumn) {
            this.formatHourColumnLabel = this.dateFormatter.formatWeekViewHourColumn;
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
            const hourColumns = this.elm.nativeElement.querySelector('.weekview-normal-event-container').querySelectorAll('.calendar-hour-column');
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
        const currentViewIndex = this.currentViewIndex;
        let direction = 0;
        this.slider.getActiveIndex().then(currentSlideIndex => {
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
        const adjacent = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
        this.calendarService.setCurrentDate(adjacent);
        this.refreshView();
        this.direction = 0;
    }
    getHourColumnLabels() {
        const hourColumnLabels = [];
        for (let hour = 0, length = this.views[0].rows.length; hour < length; hour += 1) {
            // handle edge case for DST
            if (hour === 0 && this.views[0].rows[hour][0].time.getHours() !== this.startHour) {
                const time = new Date(this.views[0].rows[hour][0].time);
                time.setDate(time.getDate() + 1);
                time.setHours(this.startHour);
                hourColumnLabels.push(this.formatHourColumnLabel(time));
            }
            else {
                hourColumnLabels.push(this.formatHourColumnLabel(this.views[0].rows[hour][0].time));
            }
        }
        return hourColumnLabels;
    }
    getViewData(startTime) {
        const dates = WeekViewComponent_1.getDates(startTime, 7);
        for (let i = 0; i < 7; i++) {
            dates[i].dayHeader = this.formatDayHeader(dates[i].date);
        }
        return {
            rows: WeekViewComponent_1.createDateObjects(startTime, this.startHour, this.endHour, this.hourSegments),
            dates
        };
    }
    getRange(currentDate) {
        const year = currentDate.getFullYear(), month = currentDate.getMonth(), date = currentDate.getDate(), day = currentDate.getDay();
        let difference = day - this.startingDayWeek;
        if (difference < 0) {
            difference += 7;
        }
        // set hour to 12 to avoid DST problem
        const firstDayOfWeek = new Date(year, month, date - difference, 12, 0, 0), endTime = new Date(year, month, date - difference + 7, 12, 0, 0);
        return {
            startTime: firstDayOfWeek,
            endTime
        };
    }
    onDataLoaded() {
        const eventSource = this.eventSource, len = eventSource ? eventSource.length : 0, startTime = this.range.startTime, endTime = this.range.endTime, utcStartTime = Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate()), utcEndTime = Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate()), currentViewIndex = this.currentViewIndex, rows = this.views[currentViewIndex].rows, dates = this.views[currentViewIndex].dates, oneHour = 3600000, oneDay = 86400000, 
        // add allday eps
        eps = 0.016, rangeStartRowIndex = this.startHour * this.hourSegments, rangeEndRowIndex = this.endHour * this.hourSegments, allRows = 24 * this.hourSegments;
        let allDayEventInRange = false, normalEventInRange = false;
        for (let i = 0; i < 7; i += 1) {
            dates[i].events = [];
            dates[i].hasEvent = false;
        }
        for (let day = 0; day < 7; day += 1) {
            for (let hour = 0; hour < this.hourRange; hour += 1) {
                rows[hour][day].events = [];
            }
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
                allDayEventInRange = true;
                let allDayStartIndex;
                if (eventUTCStartTime <= utcStartTime) {
                    allDayStartIndex = 0;
                }
                else {
                    allDayStartIndex = Math.round((eventUTCStartTime - utcStartTime) / oneDay);
                }
                let allDayEndIndex;
                if (eventUTCEndTime >= utcEndTime) {
                    allDayEndIndex = Math.round((utcEndTime - utcStartTime) / oneDay);
                }
                else {
                    allDayEndIndex = Math.round((eventUTCEndTime - utcStartTime) / oneDay);
                }
                const displayAllDayEvent = {
                    event,
                    startIndex: allDayStartIndex,
                    endIndex: allDayEndIndex
                };
                let eventSet = dates[allDayStartIndex].events;
                if (eventSet) {
                    eventSet.push(displayAllDayEvent);
                }
                else {
                    eventSet = [];
                    eventSet.push(displayAllDayEvent);
                    dates[allDayStartIndex].events = eventSet;
                }
                dates[allDayStartIndex].hasEvent = true;
            }
            else {
                normalEventInRange = true;
                let timeDifferenceStart;
                if (eventUTCStartTime < utcStartTime) {
                    timeDifferenceStart = 0;
                }
                else {
                    timeDifferenceStart = (eventUTCStartTime - utcStartTime) / oneHour * this.hourSegments + (eventStartTime.getHours() + eventStartTime.getMinutes() / 60) * this.hourSegments;
                }
                let timeDifferenceEnd;
                if (eventUTCEndTime > utcEndTime) {
                    timeDifferenceEnd = (utcEndTime - utcStartTime) / oneHour * this.hourSegments;
                }
                else {
                    timeDifferenceEnd = (eventUTCEndTime - oneDay - utcStartTime) / oneHour * this.hourSegments + (eventEndTime.getHours() + eventEndTime.getMinutes() / 60) * this.hourSegments;
                }
                const startIndex = Math.floor(timeDifferenceStart), endIndex = Math.ceil(timeDifferenceEnd - eps);
                let startRowIndex = startIndex % allRows, dayIndex = Math.floor(startIndex / allRows), endOfDay = dayIndex * allRows, startOffset = 0, endOffset = 0;
                if (this.hourParts !== 1) {
                    if (startRowIndex < rangeStartRowIndex) {
                        startOffset = 0;
                    }
                    else {
                        startOffset = Math.floor((timeDifferenceStart - startIndex) * this.hourParts);
                    }
                }
                do {
                    endOfDay += allRows;
                    let endRowIndex;
                    if (endOfDay < endIndex) {
                        endRowIndex = allRows;
                    }
                    else {
                        if (endOfDay === endIndex) {
                            endRowIndex = allRows;
                        }
                        else {
                            endRowIndex = endIndex % allRows;
                        }
                        if (this.hourParts !== 1) {
                            if (endRowIndex > rangeEndRowIndex) {
                                endOffset = 0;
                            }
                            else {
                                endOffset = Math.floor((endIndex - timeDifferenceEnd) * this.hourParts);
                            }
                        }
                    }
                    if (startRowIndex < rangeStartRowIndex) {
                        startRowIndex = 0;
                    }
                    else {
                        startRowIndex -= rangeStartRowIndex;
                    }
                    if (endRowIndex > rangeEndRowIndex) {
                        endRowIndex = rangeEndRowIndex;
                    }
                    endRowIndex -= rangeStartRowIndex;
                    if (startRowIndex < endRowIndex) {
                        const displayEvent = {
                            event,
                            startIndex: startRowIndex,
                            endIndex: endRowIndex,
                            startOffset,
                            endOffset
                        };
                        let eventSet = rows[startRowIndex][dayIndex].events;
                        if (eventSet) {
                            eventSet.push(displayEvent);
                        }
                        else {
                            eventSet = [];
                            eventSet.push(displayEvent);
                            rows[startRowIndex][dayIndex].events = eventSet;
                        }
                        dates[dayIndex].hasEvent = true;
                    }
                    startRowIndex = 0;
                    startOffset = 0;
                    dayIndex += 1;
                } while (endOfDay < endIndex);
            }
        }
        if (normalEventInRange) {
            for (let day = 0; day < 7; day += 1) {
                let orderedEvents = [];
                for (let hour = 0; hour < this.hourRange; hour += 1) {
                    if (rows[hour][day].events) {
                        rows[hour][day].events.sort(WeekViewComponent_1.compareEventByStartOffset);
                        orderedEvents = orderedEvents.concat(rows[hour][day].events);
                    }
                }
                if (orderedEvents.length > 0) {
                    this.placeEvents(orderedEvents);
                }
            }
        }
        if (allDayEventInRange) {
            let orderedAllDayEvents = [];
            for (let day = 0; day < 7; day += 1) {
                if (dates[day].events) {
                    orderedAllDayEvents = orderedAllDayEvents.concat(dates[day].events);
                }
            }
            if (orderedAllDayEvents.length > 0) {
                this.placeAllDayEvents(orderedAllDayEvents);
            }
        }
        if (this.autoSelect) {
            let findSelected = false;
            let selectedDate;
            for (let r = 0; r < 7; r += 1) {
                if (dates[r].selected) {
                    selectedDate = dates[r];
                    findSelected = true;
                    break;
                }
            }
            if (findSelected) {
                let disabled = false;
                if (this.markDisabled) {
                    disabled = this.markDisabled(selectedDate.date);
                }
                this.onTimeSelected.emit({
                    selectedTime: selectedDate.date,
                    events: selectedDate.events.map(e => e.event),
                    disabled
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
        const firstDayOfWeek = new Date(this.range.startTime.getTime());
        firstDayOfWeek.setHours(12, 0, 0, 0);
        return this.formatTitle(firstDayOfWeek);
    }
    getHighlightClass(date) {
        let className = '';
        if (date.hasEvent) {
            if (className) {
                className += ' ';
            }
            className = 'weekview-with-event';
        }
        if (date.selected) {
            if (className) {
                className += ' ';
            }
            className += 'weekview-selected';
        }
        if (date.current) {
            if (className) {
                className += ' ';
            }
            className += 'weekview-current';
        }
        return className;
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
        WeekViewComponent_1.calculateWidth(orderedEvents, this.hourRange, this.hourParts);
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
        let maxColumn = 0;
        for (let i = 0; i < len; i += 1) {
            let col;
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
    updateCurrentView(currentViewStartDate, view) {
        const currentCalendarDate = this.calendarService.currentDate, today = new Date(), oneDay = 86400000, selectedDayDifference = Math.round((Date.UTC(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), currentCalendarDate.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay), currentDayDifference = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getTime()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay);
        for (let r = 0; r < 7; r += 1) {
            view.dates[r].selected = false;
        }
        if (selectedDayDifference >= 0 && selectedDayDifference < 7 && this.autoSelect) {
            view.dates[selectedDayDifference].selected = true;
        }
        if (currentDayDifference >= 0 && currentDayDifference < 7) {
            view.dates[currentDayDifference].current = true;
        }
    }
    daySelected(viewDate) {
        const selectedDate = viewDate.date, dates = this.views[this.currentViewIndex].dates, currentViewStartDate = this.range.startTime, oneDay = 86400000, selectedDayDifference = Math.round((Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay);
        this.calendarService.setCurrentDate(selectedDate);
        for (let r = 0; r < 7; r += 1) {
            dates[r].selected = false;
        }
        if (selectedDayDifference >= 0 && selectedDayDifference < 7) {
            dates[selectedDayDifference].selected = true;
        }
        let disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(selectedDate);
        }
        this.onTimeSelected.emit({ selectedTime: selectedDate, events: viewDate.events.map(e => e.event), disabled });
    }
    setScrollPosition(scrollPosition) {
        this.initScrollPosition = scrollPosition;
    }
};
WeekViewComponent.ctorParameters = () => [
    { type: CalendarService },
    { type: ElementRef }
];
__decorate([
    ViewChild('weekSlider', { static: true })
], WeekViewComponent.prototype, "slider", void 0);
__decorate([
    HostBinding('class.weekview')
], WeekViewComponent.prototype, "class", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "weekviewHeaderTemplate", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "weekviewAllDayEventTemplate", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "weekviewNormalEventTemplate", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "weekviewAllDayEventSectionTemplate", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "weekviewNormalEventSectionTemplate", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "weekviewInactiveAllDayEventSectionTemplate", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "weekviewInactiveNormalEventSectionTemplate", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "formatWeekTitle", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "formatWeekViewDayHeader", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "formatHourColumn", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "startingDayWeek", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "allDayLabel", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "hourParts", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "eventSource", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "autoSelect", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "markDisabled", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "locale", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "dateFormatter", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "dir", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "scrollToHour", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "preserveScrollPosition", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "lockSwipeToPrev", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "lockSwipes", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "startHour", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "endHour", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "sliderOptions", void 0);
__decorate([
    Input()
], WeekViewComponent.prototype, "hourSegments", void 0);
__decorate([
    Output()
], WeekViewComponent.prototype, "onRangeChanged", void 0);
__decorate([
    Output()
], WeekViewComponent.prototype, "onEventSelected", void 0);
__decorate([
    Output()
], WeekViewComponent.prototype, "onTimeSelected", void 0);
__decorate([
    Output()
], WeekViewComponent.prototype, "onTitleChanged", void 0);
WeekViewComponent = WeekViewComponent_1 = __decorate([
    Component({
        selector: 'weekview',
        template: `
        <ion-slides #weekSlider [options]="sliderOptions" [dir]="dir" (ionSlideDidChange)="onSlideChanged()"
                    class="slides-container">
            <ion-slide class="slide-container">
                <table class="table table-bordered table-fixed weekview-header">
                    <thead>
                    <tr>
                        <th class="calendar-hour-column"></th>
                        <th class="weekview-header text-center" *ngFor="let date of views[0].dates"
                            [ngClass]="getHighlightClass(date)"
                            (click)="daySelected(date)">
                            <ng-template [ngTemplateOutlet]="weekviewHeaderTemplate"
                                         [ngTemplateOutletContext]="{viewDate:date}">
                            </ng-template>
                        </th>
                    </tr>
                    </thead>
                </table>
                <div *ngIf="0===currentViewIndex">
                    <div class="weekview-allday-table">
                        <div class="weekview-allday-label">{{allDayLabel}}</div>
                        <div class="weekview-allday-content-wrapper scroll-content">
                            <table class="table table-fixed weekview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td *ngFor="let day of views[0].dates" class="calendar-cell">
                                        <ng-template [ngTemplateOutlet]="weekviewAllDayEventSectionTemplate"
                                                     [ngTemplateOutletContext]="{day:day, eventTemplate:weekviewAllDayEventTemplate}">
                                        </ng-template>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <init-position-scroll class="weekview-normal-event-container" [initPosition]="initScrollPosition"
                                          [emitEvent]="preserveScrollPosition" (onScroll)="setScrollPosition($event)">
                        <table class="table table-bordered table-fixed weekview-normal-event-table">
                            <tbody>
                            <tr *ngFor="let row of views[0].rows; let i = index">
                                <td class="calendar-hour-column text-center">
                                    {{hourColumnLabels[i]}}
                                </td>
                                <td *ngFor="let tm of row" class="calendar-cell" tappable
                                    (click)="select(tm.time, tm.events)">
                                    <ng-template [ngTemplateOutlet]="weekviewNormalEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts, eventTemplate:weekviewNormalEventTemplate}">
                                    </ng-template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </init-position-scroll>
                </div>
                <div *ngIf="0!==currentViewIndex">
                    <div class="weekview-allday-table">
                        <div class="weekview-allday-label">{{allDayLabel}}</div>
                        <div class="weekview-allday-content-wrapper scroll-content">
                            <table class="table table-fixed weekview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td *ngFor="let day of views[0].dates" class="calendar-cell">
                                        <ng-template [ngTemplateOutlet]="weekviewInactiveAllDayEventSectionTemplate"
                                                     [ngTemplateOutletContext]="{day:day}">
                                        </ng-template>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <init-position-scroll class="weekview-normal-event-container" [initPosition]="initScrollPosition">
                        <table class="table table-bordered table-fixed weekview-normal-event-table">
                            <tbody>
                            <tr *ngFor="let row of views[0].rows; let i = index">
                                <td class="calendar-hour-column text-center">
                                    {{hourColumnLabels[i]}}
                                </td>
                                <td *ngFor="let tm of row" class="calendar-cell">
                                    <ng-template [ngTemplateOutlet]="weekviewInactiveNormalEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts}">
                                    </ng-template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </init-position-scroll>
                </div>
            </ion-slide>
            <ion-slide class="slide-container">
                <table class="table table-bordered table-fixed weekview-header">
                    <thead>
                    <tr>
                        <th class="calendar-hour-column"></th>
                        <th class="weekview-header text-center" *ngFor="let date of views[1].dates"
                            [ngClass]="getHighlightClass(date)"
                            (click)="daySelected(date)">
                            <ng-template [ngTemplateOutlet]="weekviewHeaderTemplate"
                                         [ngTemplateOutletContext]="{viewDate:date}">
                            </ng-template>
                        </th>
                    </tr>
                    </thead>
                </table>
                <div *ngIf="1===currentViewIndex">
                    <div class="weekview-allday-table">
                        <div class="weekview-allday-label">{{allDayLabel}}</div>
                        <div class="weekview-allday-content-wrapper scroll-content">
                            <table class="table table-fixed weekview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td *ngFor="let day of views[1].dates" class="calendar-cell">
                                        <ng-template [ngTemplateOutlet]="weekviewAllDayEventSectionTemplate"
                                                     [ngTemplateOutletContext]="{day:day, eventTemplate:weekviewAllDayEventTemplate}">
                                        </ng-template>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <init-position-scroll class="weekview-normal-event-container" [initPosition]="initScrollPosition"
                                          [emitEvent]="preserveScrollPosition" (onScroll)="setScrollPosition($event)">
                        <table class="table table-bordered table-fixed weekview-normal-event-table">
                            <tbody>
                            <tr *ngFor="let row of views[1].rows; let i = index">
                                <td class="calendar-hour-column text-center">
                                    {{hourColumnLabels[i]}}
                                </td>
                                <td *ngFor="let tm of row" class="calendar-cell" tappable
                                    (click)="select(tm.time, tm.events)">
                                    <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                                        <ng-template [ngTemplateOutlet]="weekviewNormalEventSectionTemplate"
                                                     [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts, eventTemplate:weekviewNormalEventTemplate}">
                                        </ng-template>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </init-position-scroll>
                </div>
                <div *ngIf="1!==currentViewIndex">
                    <div class="weekview-allday-table">
                        <div class="weekview-allday-label">{{allDayLabel}}</div>
                        <div class="weekview-allday-content-wrapper scroll-content">
                            <table class="table table-fixed weekview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td *ngFor="let day of views[1].dates" class="calendar-cell">
                                        <ng-template [ngTemplateOutlet]="weekviewInactiveAllDayEventSectionTemplate"
                                                     [ngTemplateOutletContext]="{day:day}">
                                        </ng-template>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <init-position-scroll class="weekview-normal-event-container" [initPosition]="initScrollPosition">
                        <table class="table table-bordered table-fixed weekview-normal-event-table">
                            <tbody>
                            <tr *ngFor="let row of views[1].rows; let i = index">
                                <td class="calendar-hour-column text-center">
                                    {{hourColumnLabels[i]}}
                                </td>
                                <td *ngFor="let tm of row" class="calendar-cell">
                                    <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                                        <ng-template [ngTemplateOutlet]="weekviewInactiveNormalEventSectionTemplate"
                                                     [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts}">
                                        </ng-template>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </init-position-scroll>
                </div>
            </ion-slide>
            <ion-slide class="slide-container">
                <table class="table table-bordered table-fixed weekview-header">
                    <thead>
                    <tr>
                        <th class="calendar-hour-column"></th>
                        <th class="weekview-header text-center" *ngFor="let date of views[2].dates"
                            [ngClass]="getHighlightClass(date)"
                            (click)="daySelected(date)">
                            <ng-template [ngTemplateOutlet]="weekviewHeaderTemplate"
                                         [ngTemplateOutletContext]="{viewDate:date}">
                            </ng-template>
                        </th>
                    </tr>
                    </thead>
                </table>
                <div *ngIf="2===currentViewIndex">
                    <div class="weekview-allday-table">
                        <div class="weekview-allday-label">{{allDayLabel}}</div>
                        <div class="weekview-allday-content-wrapper scroll-content">
                            <table class="table table-fixed weekview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td *ngFor="let day of views[2].dates" class="calendar-cell">
                                        <ng-template [ngTemplateOutlet]="weekviewAllDayEventSectionTemplate"
                                                     [ngTemplateOutletContext]="{day:day, eventTemplate:weekviewAllDayEventTemplate}">
                                        </ng-template>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <init-position-scroll class="weekview-normal-event-container" [initPosition]="initScrollPosition"
                                          [emitEvent]="preserveScrollPosition" (onScroll)="setScrollPosition($event)">
                        <table class="table table-bordered table-fixed weekview-normal-event-table">
                            <tbody>
                            <tr *ngFor="let row of views[2].rows; let i = index">
                                <td class="calendar-hour-column text-center">
                                    {{hourColumnLabels[i]}}
                                </td>
                                <td *ngFor="let tm of row" class="calendar-cell" tappable
                                    (click)="select(tm.time, tm.events)">
                                    <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                                        <ng-template [ngTemplateOutlet]="weekviewNormalEventSectionTemplate"
                                                     [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts, eventTemplate:weekviewNormalEventTemplate}">
                                        </ng-template>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </init-position-scroll>
                </div>
                <div *ngIf="2!==currentViewIndex">
                    <div class="weekview-allday-table">
                        <div class="weekview-allday-label">{{allDayLabel}}</div>
                        <div class="weekview-allday-content-wrapper scroll-content">
                            <table class="table table-fixed weekview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td *ngFor="let day of views[2].dates" class="calendar-cell">
                                        <ng-template [ngTemplateOutlet]="weekviewInactiveAllDayEventSectionTemplate"
                                                     [ngTemplateOutletContext]="{day:day}">
                                        </ng-template>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <init-position-scroll class="weekview-normal-event-container" [initPosition]="initScrollPosition">
                        <table class="table table-bordered table-fixed weekview-normal-event-table">
                            <tbody>
                            <tr *ngFor="let row of views[2].rows; let i = index">
                                <td class="calendar-hour-column text-center">
                                    {{hourColumnLabels[i]}}
                                </td>
                                <td *ngFor="let tm of row" class="calendar-cell">
                                    <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                                        <ng-template [ngTemplateOutlet]="weekviewInactiveNormalEventSectionTemplate"
                                                     [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts}">
                                        </ng-template>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </init-position-scroll>
                </div>
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

        .calendar-cell {
            padding: 0 !important;
            height: 37px;
        }

        .slides-container {
            height: 100%;
        }

        .slide-container {
            display: block;
        }

        .weekview-allday-label {
            float: left;
            height: 100%;
            line-height: 50px;
            text-align: center;
            width: 50px;
            border-left: 1px solid #ddd;
        }

        [dir="rtl"] .weekview-allday-label {
            float: right;
            border-right: 1px solid #ddd;
        }

        .weekview-allday-content-wrapper {
            margin-left: 50px;
            overflow: hidden;
            height: 51px;
        }

        [dir="rtl"] .weekview-allday-content-wrapper {
            margin-left: 0;
            margin-right: 50px;
        }

        .weekview-allday-content-table {
            min-height: 50px;
        }

        .weekview-allday-content-table td {
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
        }

        .weekview-header th {
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px;
        }

        .weekview-allday-table {
            height: 50px;
            position: relative;
            border-bottom: 1px solid #ddd;
            font-size: 14px;
        }

        .weekview-normal-event-container {
            margin-top: 87px;
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
            .weekview-allday-label, .calendar-hour-column {
                width: 31px;
                font-size: 12px;
            }

            .weekview-allday-label {
                padding-top: 4px;
            }

            .table > tbody > tr > td.calendar-hour-column {
                padding-left: 0;
                padding-right: 0;
                vertical-align: middle;
                line-height: 12px;
            }

            .table > thead > tr > th.weekview-header {
                padding-left: 0;
                padding-right: 0;
                font-size: 12px;
            }

            .weekview-allday-label {
                line-height: 20px;
            }

            .weekview-allday-content-wrapper {
                margin-left: 31px;
            }

            [dir="rtl"] .weekview-allday-content-wrapper {
                margin-left: 0;
                margin-right: 31px;
            }
        }
    `]
    })
], WeekViewComponent);
export { WeekViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vla3ZpZXcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb25pYzItY2FsZW5kYXIvIiwic291cmNlcyI6WyJ3ZWVrdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQ0gsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGFBQWEsRUFDYixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxVQUFVLEVBQ1YsU0FBUyxFQUFFLGFBQWEsRUFDM0IsTUFBTSxlQUFlLENBQUM7QUFnQnZCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQXdkbkQsSUFBYSxpQkFBaUIseUJBQTlCLE1BQWEsaUJBQWlCO0lBRTFCLFlBQW9CLGVBQWdDLEVBQVUsR0FBZTtRQUF6RCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBSTlDLFVBQUssR0FBRyxJQUFJLENBQUM7UUFpQm5DLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFJbEIsUUFBRyxHQUFHLEVBQUUsQ0FBQztRQUNULGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBU2hCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM1QyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDN0MsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUNuRCxtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFTLElBQUksQ0FBQyxDQUFDO1FBRW5ELFVBQUssR0FBZ0IsRUFBRSxDQUFDO1FBQ3hCLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUVyQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsU0FBSSxHQUFpQixNQUFNLENBQUM7UUFFM0IsV0FBTSxHQUFHLEtBQUssQ0FBQztR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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYXRlUGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW9uU2xpZGVzfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBPbkluaXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gICAgSUNhbGVuZGFyQ29tcG9uZW50LFxuICAgIElEaXNwbGF5RXZlbnQsXG4gICAgSUV2ZW50LFxuICAgIElUaW1lU2VsZWN0ZWQsXG4gICAgSVJhbmdlLFxuICAgIElXZWVrVmlldyxcbiAgICBJV2Vla1ZpZXdSb3csXG4gICAgSVdlZWtWaWV3RGF0ZVJvdyxcbiAgICBDYWxlbmRhck1vZGUsXG4gICAgSURhdGVGb3JtYXR0ZXIsXG4gICAgSURpc3BsYXlXZWVrVmlld0hlYWRlclxufSBmcm9tICcuL2NhbGVuZGFyJztcbmltcG9ydCB7Q2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuL2NhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgICBJRGlzcGxheUFsbERheUV2ZW50LFxuICAgIElXZWVrVmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlQ29udGV4dCxcbiAgICBJV2Vla1ZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZUNvbnRleHRcbn0gZnJvbSAnLi9jYWxlbmRhcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnd2Vla3ZpZXcnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24tc2xpZGVzICN3ZWVrU2xpZGVyIFtvcHRpb25zXT1cInNsaWRlck9wdGlvbnNcIiBbZGlyXT1cImRpclwiIChpb25TbGlkZURpZENoYW5nZSk9XCJvblNsaWRlQ2hhbmdlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzbGlkZXMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW9uLXNsaWRlIGNsYXNzPVwic2xpZGUtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtZml4ZWQgd2Vla3ZpZXctaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwiY2FsZW5kYXItaG91ci1jb2x1bW5cIj48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwid2Vla3ZpZXctaGVhZGVyIHRleHQtY2VudGVyXCIgKm5nRm9yPVwibGV0IGRhdGUgb2Ygdmlld3NbMF0uZGF0ZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldEhpZ2hsaWdodENsYXNzKGRhdGUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZGF5U2VsZWN0ZWQoZGF0ZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwid2Vla3ZpZXdIZWFkZXJUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dmlld0RhdGU6ZGF0ZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIwPT09Y3VycmVudFZpZXdJbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2Vla3ZpZXctYWxsZGF5LXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2Vla3ZpZXctYWxsZGF5LWxhYmVsXCI+e3thbGxEYXlMYWJlbH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2Vla3ZpZXctYWxsZGF5LWNvbnRlbnQtd3JhcHBlciBzY3JvbGwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWZpeGVkIHdlZWt2aWV3LWFsbGRheS1jb250ZW50LXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBkYXkgb2Ygdmlld3NbMF0uZGF0ZXNcIiBjbGFzcz1cImNhbGVuZGFyLWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwid2Vla3ZpZXdBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGF5OmRheSwgZXZlbnRUZW1wbGF0ZTp3ZWVrdmlld0FsbERheUV2ZW50VGVtcGxhdGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGluaXQtcG9zaXRpb24tc2Nyb2xsIGNsYXNzPVwid2Vla3ZpZXctbm9ybWFsLWV2ZW50LWNvbnRhaW5lclwiIFtpbml0UG9zaXRpb25dPVwiaW5pdFNjcm9sbFBvc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlbWl0RXZlbnRdPVwicHJlc2VydmVTY3JvbGxQb3NpdGlvblwiIChvblNjcm9sbCk9XCJzZXRTY3JvbGxQb3NpdGlvbigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1maXhlZCB3ZWVrdmlldy1ub3JtYWwtZXZlbnQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2Ygdmlld3NbMF0ucm93czsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1ob3VyLWNvbHVtbiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tob3VyQ29sdW1uTGFiZWxzW2ldfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCB0bSBvZiByb3dcIiBjbGFzcz1cImNhbGVuZGFyLWNlbGxcIiB0YXBwYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdCh0bS50aW1lLCB0bS5ldmVudHMpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwid2Vla3ZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInt0bTp0bSwgaG91clBhcnRzOiBob3VyUGFydHMsIGV2ZW50VGVtcGxhdGU6d2Vla3ZpZXdOb3JtYWxFdmVudFRlbXBsYXRlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8L2luaXQtcG9zaXRpb24tc2Nyb2xsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIwIT09Y3VycmVudFZpZXdJbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2Vla3ZpZXctYWxsZGF5LXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2Vla3ZpZXctYWxsZGF5LWxhYmVsXCI+e3thbGxEYXlMYWJlbH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2Vla3ZpZXctYWxsZGF5LWNvbnRlbnQtd3JhcHBlciBzY3JvbGwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWZpeGVkIHdlZWt2aWV3LWFsbGRheS1jb250ZW50LXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBkYXkgb2Ygdmlld3NbMF0uZGF0ZXNcIiBjbGFzcz1cImNhbGVuZGFyLWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwid2Vla3ZpZXdJbmFjdGl2ZUFsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkYXk6ZGF5fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxpbml0LXBvc2l0aW9uLXNjcm9sbCBjbGFzcz1cIndlZWt2aWV3LW5vcm1hbC1ldmVudC1jb250YWluZXJcIiBbaW5pdFBvc2l0aW9uXT1cImluaXRTY3JvbGxQb3NpdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtZml4ZWQgd2Vla3ZpZXctbm9ybWFsLWV2ZW50LXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIHZpZXdzWzBdLnJvd3M7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItaG91ci1jb2x1bW4gdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aG91ckNvbHVtbkxhYmVsc1tpXX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgdG0gb2Ygcm93XCIgY2xhc3M9XCJjYWxlbmRhci1jZWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwid2Vla3ZpZXdJbmFjdGl2ZU5vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3RtOnRtLCBob3VyUGFydHM6IGhvdXJQYXJ0c31cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9pbml0LXBvc2l0aW9uLXNjcm9sbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvaW9uLXNsaWRlPlxuICAgICAgICAgICAgPGlvbi1zbGlkZSBjbGFzcz1cInNsaWRlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWZpeGVkIHdlZWt2aWV3LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cImNhbGVuZGFyLWhvdXItY29sdW1uXCI+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cIndlZWt2aWV3LWhlYWRlciB0ZXh0LWNlbnRlclwiICpuZ0Zvcj1cImxldCBkYXRlIG9mIHZpZXdzWzFdLmRhdGVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRIaWdobGlnaHRDbGFzcyhkYXRlKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImRheVNlbGVjdGVkKGRhdGUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIndlZWt2aWV3SGVhZGVyVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3ZpZXdEYXRlOmRhdGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiMT09PWN1cnJlbnRWaWV3SW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlZWt2aWV3LWFsbGRheS10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlZWt2aWV3LWFsbGRheS1sYWJlbFwiPnt7YWxsRGF5TGFiZWx9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlZWt2aWV3LWFsbGRheS1jb250ZW50LXdyYXBwZXIgc2Nyb2xsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1maXhlZCB3ZWVrdmlldy1hbGxkYXktY29udGVudC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgZGF5IG9mIHZpZXdzWzFdLmRhdGVzXCIgY2xhc3M9XCJjYWxlbmRhci1jZWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIndlZWt2aWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2RheTpkYXksIGV2ZW50VGVtcGxhdGU6d2Vla3ZpZXdBbGxEYXlFdmVudFRlbXBsYXRlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxpbml0LXBvc2l0aW9uLXNjcm9sbCBjbGFzcz1cIndlZWt2aWV3LW5vcm1hbC1ldmVudC1jb250YWluZXJcIiBbaW5pdFBvc2l0aW9uXT1cImluaXRTY3JvbGxQb3NpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZW1pdEV2ZW50XT1cInByZXNlcnZlU2Nyb2xsUG9zaXRpb25cIiAob25TY3JvbGwpPVwic2V0U2Nyb2xsUG9zaXRpb24oJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtZml4ZWQgd2Vla3ZpZXctbm9ybWFsLWV2ZW50LXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIHZpZXdzWzFdLnJvd3M7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItaG91ci1jb2x1bW4gdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aG91ckNvbHVtbkxhYmVsc1tpXX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgdG0gb2Ygcm93XCIgY2xhc3M9XCJjYWxlbmRhci1jZWxsXCIgdGFwcGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QodG0udGltZSwgdG0uZXZlbnRzKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J2NhbGVuZGFyLWV2ZW50LXdyYXAnOiB0bS5ldmVudHN9XCIgKm5nSWY9XCJ0bS5ldmVudHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwid2Vla3ZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dG06dG0sIGhvdXJQYXJ0czogaG91clBhcnRzLCBldmVudFRlbXBsYXRlOndlZWt2aWV3Tm9ybWFsRXZlbnRUZW1wbGF0ZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9pbml0LXBvc2l0aW9uLXNjcm9sbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiMSE9PWN1cnJlbnRWaWV3SW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlZWt2aWV3LWFsbGRheS10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlZWt2aWV3LWFsbGRheS1sYWJlbFwiPnt7YWxsRGF5TGFiZWx9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlZWt2aWV3LWFsbGRheS1jb250ZW50LXdyYXBwZXIgc2Nyb2xsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1maXhlZCB3ZWVrdmlldy1hbGxkYXktY29udGVudC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgZGF5IG9mIHZpZXdzWzFdLmRhdGVzXCIgY2xhc3M9XCJjYWxlbmRhci1jZWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIndlZWt2aWV3SW5hY3RpdmVBbGxEYXlFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGF5OmRheX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aW5pdC1wb3NpdGlvbi1zY3JvbGwgY2xhc3M9XCJ3ZWVrdmlldy1ub3JtYWwtZXZlbnQtY29udGFpbmVyXCIgW2luaXRQb3NpdGlvbl09XCJpbml0U2Nyb2xsUG9zaXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWZpeGVkIHdlZWt2aWV3LW5vcm1hbC1ldmVudC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiB2aWV3c1sxXS5yb3dzOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNhbGVuZGFyLWhvdXItY29sdW1uIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2hvdXJDb2x1bW5MYWJlbHNbaV19fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IHRtIG9mIHJvd1wiIGNsYXNzPVwiY2FsZW5kYXItY2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J2NhbGVuZGFyLWV2ZW50LXdyYXAnOiB0bS5ldmVudHN9XCIgKm5nSWY9XCJ0bS5ldmVudHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwid2Vla3ZpZXdJbmFjdGl2ZU5vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInt0bTp0bSwgaG91clBhcnRzOiBob3VyUGFydHN9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgIDwvaW5pdC1wb3NpdGlvbi1zY3JvbGw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2lvbi1zbGlkZT5cbiAgICAgICAgICAgIDxpb24tc2xpZGUgY2xhc3M9XCJzbGlkZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1maXhlZCB3ZWVrdmlldy1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJjYWxlbmRhci1ob3VyLWNvbHVtblwiPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ3ZWVrdmlldy1oZWFkZXIgdGV4dC1jZW50ZXJcIiAqbmdGb3I9XCJsZXQgZGF0ZSBvZiB2aWV3c1syXS5kYXRlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0SGlnaGxpZ2h0Q2xhc3MoZGF0ZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJkYXlTZWxlY3RlZChkYXRlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ3ZWVrdmlld0hlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInt2aWV3RGF0ZTpkYXRlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIjI9PT1jdXJyZW50Vmlld0luZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWVrdmlldy1hbGxkYXktdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWVrdmlldy1hbGxkYXktbGFiZWxcIj57e2FsbERheUxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWVrdmlldy1hbGxkYXktY29udGVudC13cmFwcGVyIHNjcm9sbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtZml4ZWQgd2Vla3ZpZXctYWxsZGF5LWNvbnRlbnQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGRheSBvZiB2aWV3c1syXS5kYXRlc1wiIGNsYXNzPVwiY2FsZW5kYXItY2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ3ZWVrdmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkYXk6ZGF5LCBldmVudFRlbXBsYXRlOndlZWt2aWV3QWxsRGF5RXZlbnRUZW1wbGF0ZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aW5pdC1wb3NpdGlvbi1zY3JvbGwgY2xhc3M9XCJ3ZWVrdmlldy1ub3JtYWwtZXZlbnQtY29udGFpbmVyXCIgW2luaXRQb3NpdGlvbl09XCJpbml0U2Nyb2xsUG9zaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VtaXRFdmVudF09XCJwcmVzZXJ2ZVNjcm9sbFBvc2l0aW9uXCIgKG9uU2Nyb2xsKT1cInNldFNjcm9sbFBvc2l0aW9uKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWZpeGVkIHdlZWt2aWV3LW5vcm1hbC1ldmVudC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiB2aWV3c1syXS5yb3dzOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNhbGVuZGFyLWhvdXItY29sdW1uIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2hvdXJDb2x1bW5MYWJlbHNbaV19fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IHRtIG9mIHJvd1wiIGNsYXNzPVwiY2FsZW5kYXItY2VsbFwiIHRhcHBhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KHRtLnRpbWUsIHRtLmV2ZW50cylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieydjYWxlbmRhci1ldmVudC13cmFwJzogdG0uZXZlbnRzfVwiICpuZ0lmPVwidG0uZXZlbnRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIndlZWt2aWV3Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3RtOnRtLCBob3VyUGFydHM6IGhvdXJQYXJ0cywgZXZlbnRUZW1wbGF0ZTp3ZWVrdmlld05vcm1hbEV2ZW50VGVtcGxhdGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgIDwvaW5pdC1wb3NpdGlvbi1zY3JvbGw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIjIhPT1jdXJyZW50Vmlld0luZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWVrdmlldy1hbGxkYXktdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWVrdmlldy1hbGxkYXktbGFiZWxcIj57e2FsbERheUxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWVrdmlldy1hbGxkYXktY29udGVudC13cmFwcGVyIHNjcm9sbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtZml4ZWQgd2Vla3ZpZXctYWxsZGF5LWNvbnRlbnQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGRheSBvZiB2aWV3c1syXS5kYXRlc1wiIGNsYXNzPVwiY2FsZW5kYXItY2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ3ZWVrdmlld0luYWN0aXZlQWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2RheTpkYXl9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGluaXQtcG9zaXRpb24tc2Nyb2xsIGNsYXNzPVwid2Vla3ZpZXctbm9ybWFsLWV2ZW50LWNvbnRhaW5lclwiIFtpbml0UG9zaXRpb25dPVwiaW5pdFNjcm9sbFBvc2l0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1maXhlZCB3ZWVrdmlldy1ub3JtYWwtZXZlbnQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2Ygdmlld3NbMl0ucm93czsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1ob3VyLWNvbHVtbiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tob3VyQ29sdW1uTGFiZWxzW2ldfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCB0bSBvZiByb3dcIiBjbGFzcz1cImNhbGVuZGFyLWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieydjYWxlbmRhci1ldmVudC13cmFwJzogdG0uZXZlbnRzfVwiICpuZ0lmPVwidG0uZXZlbnRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIndlZWt2aWV3SW5hY3RpdmVOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dG06dG0sIGhvdXJQYXJ0czogaG91clBhcnRzfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8L2luaXQtcG9zaXRpb24tc2Nyb2xsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9pb24tc2xpZGU+XG4gICAgICAgIDwvaW9uLXNsaWRlcz5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLnRhYmxlLWZpeGVkIHtcbiAgICAgICAgICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAudGFibGUge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZSA+IHRoZWFkID4gdHIgPiB0aCwgLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRoLCAudGFibGUgPiB0Zm9vdCA+IHRyID4gdGgsIC50YWJsZSA+IHRoZWFkID4gdHIgPiB0ZCxcbiAgICAgICAgLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRkLCAudGFibGUgPiB0Zm9vdCA+IHRyID4gdGQge1xuICAgICAgICAgICAgcGFkZGluZzogOHB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRoIHtcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2RkZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZSA+IHRoZWFkOmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCwgLnRhYmxlID4gdGhlYWQ6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCA+IHRkIHtcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDBcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZSA+IHRib2R5ICsgdGJvZHkge1xuICAgICAgICAgICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICNkZGQ7XG4gICAgICAgIH1cblxuICAgICAgICAudGFibGUtYm9yZGVyZWQge1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0aCwgLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRoLCAudGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyID4gdGgsXG4gICAgICAgIC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0ZCwgLnRhYmxlLWJvcmRlcmVkID4gdGJvZHkgPiB0ciA+IHRkLCAudGFibGUtYm9yZGVyZWQgPiB0Zm9vdCA+IHRyID4gdGQge1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZS1ib3JkZXJlZCA+IHRoZWFkID4gdHIgPiB0aCwgLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRkIHtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDJweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZS1zdHJpcGVkID4gdGJvZHkgPiB0cjpudGgtY2hpbGQob2RkKSA+IHRkLCAudGFibGUtc3RyaXBlZCA+IHRib2R5ID4gdHI6bnRoLWNoaWxkKG9kZCkgPiB0aCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5XG4gICAgICAgIH1cblxuICAgICAgICAuY2FsZW5kYXItaG91ci1jb2x1bW4ge1xuICAgICAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNhbGVuZGFyLWV2ZW50LXdyYXAge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAuY2FsZW5kYXItZXZlbnQge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgcGFkZGluZzogMnB4O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgei1pbmRleDogMTAwMDA7XG4gICAgICAgIH1cblxuICAgICAgICAuY2FsZW5kYXItY2VsbCB7XG4gICAgICAgICAgICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBoZWlnaHQ6IDM3cHg7XG4gICAgICAgIH1cblxuICAgICAgICAuc2xpZGVzLWNvbnRhaW5lciB7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAuc2xpZGUtY29udGFpbmVyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAgLndlZWt2aWV3LWFsbGRheS1sYWJlbCB7XG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgIH1cblxuICAgICAgICBbZGlyPVwicnRsXCJdIC53ZWVrdmlldy1hbGxkYXktbGFiZWwge1xuICAgICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2RkZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC53ZWVrdmlldy1hbGxkYXktY29udGVudC13cmFwcGVyIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiA1MHB4O1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIGhlaWdodDogNTFweDtcbiAgICAgICAgfVxuXG4gICAgICAgIFtkaXI9XCJydGxcIl0gLndlZWt2aWV3LWFsbGRheS1jb250ZW50LXdyYXBwZXIge1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDUwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAud2Vla3ZpZXctYWxsZGF5LWNvbnRlbnQtdGFibGUge1xuICAgICAgICAgICAgbWluLWhlaWdodDogNTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC53ZWVrdmlldy1hbGxkYXktY29udGVudC10YWJsZSB0ZCB7XG4gICAgICAgICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZGRkO1xuICAgICAgICB9XG5cbiAgICAgICAgLndlZWt2aWV3LWhlYWRlciB0aCB7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC53ZWVrdmlldy1hbGxkYXktdGFibGUge1xuICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIH1cblxuICAgICAgICAud2Vla3ZpZXctbm9ybWFsLWV2ZW50LWNvbnRhaW5lciB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiA4N3B4O1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zY3JvbGwtY29udGVudCB7XG4gICAgICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgICAgICB9XG5cbiAgICAgICAgOjotd2Via2l0LXNjcm9sbGJhcixcbiAgICAgICAgKjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZSA+IHRib2R5ID4gdHIgPiB0ZC5jYWxlbmRhci1ob3VyLWNvbHVtbiB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NTBweCkge1xuICAgICAgICAgICAgLndlZWt2aWV3LWFsbGRheS1sYWJlbCwgLmNhbGVuZGFyLWhvdXItY29sdW1uIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMzFweDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC53ZWVrdmlldy1hbGxkYXktbGFiZWwge1xuICAgICAgICAgICAgICAgIHBhZGRpbmctdG9wOiA0cHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC50YWJsZSA+IHRib2R5ID4gdHIgPiB0ZC5jYWxlbmRhci1ob3VyLWNvbHVtbiB7XG4gICAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMTJweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRoLndlZWt2aWV3LWhlYWRlciB7XG4gICAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAud2Vla3ZpZXctYWxsZGF5LWxhYmVsIHtcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMjBweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLndlZWt2aWV3LWFsbGRheS1jb250ZW50LXdyYXBwZXIge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAzMXB4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBbZGlyPVwicnRsXCJdIC53ZWVrdmlldy1hbGxkYXktY29udGVudC13cmFwcGVyIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDMxcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFdlZWtWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgSUNhbGVuZGFyQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FsZW5kYXJTZXJ2aWNlOiBDYWxlbmRhclNlcnZpY2UsIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZCgnd2Vla1NsaWRlcicsIHtzdGF0aWM6IHRydWV9KSBzbGlkZXI6IElvblNsaWRlcztcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLndlZWt2aWV3JykgY2xhc3MgPSB0cnVlO1xuXG4gICAgQElucHV0KCkgd2Vla3ZpZXdIZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SURpc3BsYXlXZWVrVmlld0hlYWRlcj47XG4gICAgQElucHV0KCkgd2Vla3ZpZXdBbGxEYXlFdmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxJRGlzcGxheUFsbERheUV2ZW50PjtcbiAgICBASW5wdXQoKSB3ZWVrdmlld05vcm1hbEV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPElEaXNwbGF5RXZlbnQ+O1xuICAgIEBJbnB1dCgpIHdlZWt2aWV3QWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPElXZWVrVmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgd2Vla3ZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8SVdlZWtWaWV3Tm9ybWFsRXZlbnRTZWN0aW9uVGVtcGxhdGVDb250ZXh0PjtcbiAgICBASW5wdXQoKSB3ZWVrdmlld0luYWN0aXZlQWxsRGF5RXZlbnRTZWN0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPElXZWVrVmlld0FsbERheUV2ZW50U2VjdGlvblRlbXBsYXRlQ29udGV4dD47XG4gICAgQElucHV0KCkgd2Vla3ZpZXdJbmFjdGl2ZU5vcm1hbEV2ZW50U2VjdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxJV2Vla1ZpZXdOb3JtYWxFdmVudFNlY3Rpb25UZW1wbGF0ZUNvbnRleHQ+O1xuXG4gICAgQElucHV0KCkgZm9ybWF0V2Vla1RpdGxlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZm9ybWF0V2Vla1ZpZXdEYXlIZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBmb3JtYXRIb3VyQ29sdW1uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3RhcnRpbmdEYXlXZWVrOiBudW1iZXI7XG4gICAgQElucHV0KCkgYWxsRGF5TGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBob3VyUGFydHM6IG51bWJlcjtcbiAgICBASW5wdXQoKSBldmVudFNvdXJjZTogSUV2ZW50W107XG4gICAgQElucHV0KCkgYXV0b1NlbGVjdCA9IHRydWU7XG4gICAgQElucHV0KCkgbWFya0Rpc2FibGVkOiAoZGF0ZTogRGF0ZSkgPT4gYm9vbGVhbjtcbiAgICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcbiAgICBASW5wdXQoKSBkYXRlRm9ybWF0dGVyOiBJRGF0ZUZvcm1hdHRlcjtcbiAgICBASW5wdXQoKSBkaXIgPSAnJztcbiAgICBASW5wdXQoKSBzY3JvbGxUb0hvdXIgPSAwO1xuICAgIEBJbnB1dCgpIHByZXNlcnZlU2Nyb2xsUG9zaXRpb246IGJvb2xlYW47XG4gICAgQElucHV0KCkgbG9ja1N3aXBlVG9QcmV2OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGxvY2tTd2lwZXM6IGJvb2xlYW47XG4gICAgQElucHV0KCkgc3RhcnRIb3VyOiBudW1iZXI7XG4gICAgQElucHV0KCkgZW5kSG91cjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHNsaWRlck9wdGlvbnM6IGFueTtcbiAgICBASW5wdXQoKSBob3VyU2VnbWVudHM6IG51bWJlcjtcblxuICAgIEBPdXRwdXQoKSBvblJhbmdlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SVJhbmdlPigpO1xuICAgIEBPdXRwdXQoKSBvbkV2ZW50U2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPElFdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgb25UaW1lU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPElUaW1lU2VsZWN0ZWQ+KCk7XG4gICAgQE91dHB1dCgpIG9uVGl0bGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KHRydWUpO1xuXG4gICAgcHVibGljIHZpZXdzOiBJV2Vla1ZpZXdbXSA9IFtdO1xuICAgIHB1YmxpYyBjdXJyZW50Vmlld0luZGV4ID0gMDtcbiAgICBwdWJsaWMgcmFuZ2U6IElSYW5nZTtcbiAgICBwdWJsaWMgZGlyZWN0aW9uID0gMDtcbiAgICBwdWJsaWMgbW9kZTogQ2FsZW5kYXJNb2RlID0gJ3dlZWsnO1xuXG4gICAgcHJpdmF0ZSBpbml0ZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIGNhbGxiYWNrT25Jbml0ID0gdHJ1ZTtcbiAgICBwcml2YXRlIGN1cnJlbnREYXRlQ2hhbmdlZEZyb21QYXJlbnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIGV2ZW50U291cmNlQ2hhbmdlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgc2xpZGVDaGFuZ2VkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBzbGlkZVVwZGF0ZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHB1YmxpYyBob3VyQ29sdW1uTGFiZWxzOiBzdHJpbmdbXTtcbiAgICBwdWJsaWMgaW5pdFNjcm9sbFBvc2l0aW9uOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBmb3JtYXREYXlIZWFkZXI6IChkYXRlOiBEYXRlKSA9PiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBmb3JtYXRUaXRsZTogKGRhdGU6IERhdGUpID0+IHN0cmluZztcbiAgICBwcml2YXRlIGZvcm1hdEhvdXJDb2x1bW5MYWJlbDogKGRhdGU6IERhdGUpID0+IHN0cmluZztcbiAgICBwcml2YXRlIGhvdXJSYW5nZTogbnVtYmVyO1xuXG4gICAgc3RhdGljIGNyZWF0ZURhdGVPYmplY3RzKHN0YXJ0VGltZTogRGF0ZSwgc3RhcnRIb3VyOiBudW1iZXIsIGVuZEhvdXI6IG51bWJlciwgdGltZUludGVydmFsOiBudW1iZXIpOiBJV2Vla1ZpZXdSb3dbXVtdIHtcbiAgICAgICAgY29uc3QgdGltZXM6IElXZWVrVmlld1Jvd1tdW10gPSBbXSxcbiAgICAgICAgICAgIGN1cnJlbnRIb3VyID0gMCxcbiAgICAgICAgICAgIGN1cnJlbnREYXRlID0gc3RhcnRUaW1lLmdldERhdGUoKTtcbiAgICAgICAgbGV0IGhvdXJTdGVwLFxuICAgICAgICAgICAgbWluU3RlcDtcblxuICAgICAgICBpZiAodGltZUludGVydmFsIDwgMSkge1xuICAgICAgICAgICAgaG91clN0ZXAgPSBNYXRoLmZsb29yKDEgLyB0aW1lSW50ZXJ2YWwpO1xuICAgICAgICAgICAgbWluU3RlcCA9IDYwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaG91clN0ZXAgPSAxO1xuICAgICAgICAgICAgbWluU3RlcCA9IE1hdGguZmxvb3IoNjAgLyB0aW1lSW50ZXJ2YWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaG91ciA9IHN0YXJ0SG91cjsgaG91ciA8IGVuZEhvdXI7IGhvdXIgKz0gaG91clN0ZXApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGludGVydmFsID0gMDsgaW50ZXJ2YWwgPCA2MDsgaW50ZXJ2YWwgKz0gbWluU3RlcCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdzogSVdlZWtWaWV3Um93W10gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBkYXkgPSAwOyBkYXkgPCA3OyBkYXkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoc3RhcnRUaW1lLmdldFRpbWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWUuc2V0SG91cnMoY3VycmVudEhvdXIgKyBob3VyLCBpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWUuc2V0RGF0ZShjdXJyZW50RGF0ZSArIGRheSk7XG4gICAgICAgICAgICAgICAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aW1lcy5wdXNoKHJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbWVzO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXREYXRlcyhzdGFydFRpbWU6IERhdGUsIG46IG51bWJlcik6IElXZWVrVmlld0RhdGVSb3dbXSB7XG4gICAgICAgIGNvbnN0IGRhdGVzID0gbmV3IEFycmF5KG4pLFxuICAgICAgICAgICAgY3VycmVudCA9IG5ldyBEYXRlKHN0YXJ0VGltZS5nZXRUaW1lKCkpO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgbikge1xuICAgICAgICAgICAgZGF0ZXNbaSsrXSA9IHtcbiAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShjdXJyZW50LmdldFRpbWUoKSksXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICBkYXlIZWFkZXI6ICcnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY3VycmVudC5zZXREYXRlKGN1cnJlbnQuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGNvbXBhcmVFdmVudEJ5U3RhcnRPZmZzZXQoZXZlbnRBOiBJRGlzcGxheUV2ZW50LCBldmVudEI6IElEaXNwbGF5RXZlbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZXZlbnRBLnN0YXJ0T2Zmc2V0IC0gZXZlbnRCLnN0YXJ0T2Zmc2V0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGNhbGN1bGF0ZVdpZHRoKG9yZGVyZWRFdmVudHM6IElEaXNwbGF5RXZlbnRbXSwgc2l6ZTogbnVtYmVyLCBob3VyUGFydHM6IG51bWJlcikge1xuICAgICAgICBjb25zdCB0b3RhbFNpemUgPSBzaXplICogaG91clBhcnRzLFxuICAgICAgICAgICAgY2VsbHMgPSBuZXcgQXJyYXkodG90YWxTaXplKTtcblxuICAgICAgICAvLyBzb3J0IGJ5IHBvc2l0aW9uIGluIGRlc2NlbmRpbmcgb3JkZXIsIHRoZSByaWdodCBtb3N0IGNvbHVtbnMgc2hvdWxkIGJlIGNhbGN1bGF0ZWQgZmlyc3RcbiAgICAgICAgb3JkZXJlZEV2ZW50cy5zb3J0KChldmVudEEsIGV2ZW50QikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50Qi5wb3NpdGlvbiAtIGV2ZW50QS5wb3NpdGlvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxTaXplOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNlbGxzW2ldID0ge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGV2ZW50czogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGVuID0gb3JkZXJlZEV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gb3JkZXJlZEV2ZW50c1tpXTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGV2ZW50LnN0YXJ0SW5kZXggKiBob3VyUGFydHMgKyBldmVudC5zdGFydE9mZnNldDtcbiAgICAgICAgICAgIHdoaWxlIChpbmRleCA8IGV2ZW50LmVuZEluZGV4ICogaG91clBhcnRzIC0gZXZlbnQuZW5kT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgY2VsbHNbaW5kZXhdLmV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gb3JkZXJlZEV2ZW50c1tpXTtcbiAgICAgICAgICAgIGlmICghZXZlbnQub3ZlcmxhcE51bWJlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG92ZXJsYXBOdW1iZXIgPSBldmVudC5wb3NpdGlvbiArIDE7XG4gICAgICAgICAgICAgICAgZXZlbnQub3ZlcmxhcE51bWJlciA9IG92ZXJsYXBOdW1iZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnRRdWV1ZSA9IFtldmVudF07XG4gICAgICAgICAgICAgICAgd2hpbGUgKGV2ZW50ID0gZXZlbnRRdWV1ZS5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGV2ZW50LnN0YXJ0SW5kZXggKiBob3VyUGFydHMgKyBldmVudC5zdGFydE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgZXZlbnQuZW5kSW5kZXggKiBob3VyUGFydHMgLSBldmVudC5lbmRPZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2VsbHNbaW5kZXhdLmNhbGN1bGF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsc1tpbmRleF0uY2FsY3VsYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxzW2luZGV4XS5ldmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnRDb3VudEluQ2VsbCA9IGNlbGxzW2luZGV4XS5ldmVudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGV2ZW50Q291bnRJbkNlbGw7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEV2ZW50SW5DZWxsID0gY2VsbHNbaW5kZXhdLmV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudEV2ZW50SW5DZWxsLm92ZXJsYXBOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RXZlbnRJbkNlbGwub3ZlcmxhcE51bWJlciA9IG92ZXJsYXBOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRRdWV1ZS5wdXNoKGN1cnJlbnRFdmVudEluQ2VsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zbGlkZXJPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlck9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNsaWRlck9wdGlvbnMubG9vcCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5ob3VyUmFuZ2UgPSAodGhpcy5lbmRIb3VyIC0gdGhpcy5zdGFydEhvdXIpICogdGhpcy5ob3VyU2VnbWVudHM7XG4gICAgICAgIGlmICh0aGlzLmRhdGVGb3JtYXR0ZXIgJiYgdGhpcy5kYXRlRm9ybWF0dGVyLmZvcm1hdFdlZWtWaWV3RGF5SGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdERheUhlYWRlciA9IHRoaXMuZGF0ZUZvcm1hdHRlci5mb3JtYXRXZWVrVmlld0RheUhlYWRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQaXBlID0gbmV3IERhdGVQaXBlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0RGF5SGVhZGVyID0gZnVuY3Rpb24gKGRhdGU6IERhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsIHRoaXMuZm9ybWF0V2Vla1ZpZXdEYXlIZWFkZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGVGb3JtYXR0ZXIgJiYgdGhpcy5kYXRlRm9ybWF0dGVyLmZvcm1hdFdlZWtWaWV3VGl0bGUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0VGl0bGUgPSB0aGlzLmRhdGVGb3JtYXR0ZXIuZm9ybWF0V2Vla1ZpZXdUaXRsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQaXBlID0gbmV3IERhdGVQaXBlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0VGl0bGUgPSBmdW5jdGlvbiAoZGF0ZTogRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgdGhpcy5mb3JtYXRXZWVrVGl0bGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGVGb3JtYXR0ZXIgJiYgdGhpcy5kYXRlRm9ybWF0dGVyLmZvcm1hdFdlZWtWaWV3SG91ckNvbHVtbikge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXRIb3VyQ29sdW1uTGFiZWwgPSB0aGlzLmRhdGVGb3JtYXR0ZXIuZm9ybWF0V2Vla1ZpZXdIb3VyQ29sdW1uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0ZVBpcGUgPSBuZXcgRGF0ZVBpcGUodGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgdGhpcy5mb3JtYXRIb3VyQ29sdW1uTGFiZWwgPSBmdW5jdGlvbiAoZGF0ZTogRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgdGhpcy5mb3JtYXRIb3VyQ29sdW1uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sb2NrU3dpcGVUb1ByZXYpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmxvY2tTd2lwZVRvUHJldih0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxvY2tTd2lwZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmxvY2tTd2lwZXModHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgICAgIHRoaXMuaG91ckNvbHVtbkxhYmVscyA9IHRoaXMuZ2V0SG91ckNvbHVtbkxhYmVscygpO1xuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUNoYW5nZWRGcm9tUGFyZW50U3Vic2NyaXB0aW9uID0gdGhpcy5jYWxlbmRhclNlcnZpY2UuY3VycmVudERhdGVDaGFuZ2VkRnJvbVBhcmVudCQuc3Vic2NyaWJlKGN1cnJlbnREYXRlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ldmVudFNvdXJjZUNoYW5nZWRTdWJzY3JpcHRpb24gPSB0aGlzLmNhbGVuZGFyU2VydmljZS5ldmVudFNvdXJjZUNoYW5nZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRGF0YUxvYWRlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNsaWRlQ2hhbmdlZFN1YnNjcmlwdGlvbiA9IHRoaXMuY2FsZW5kYXJTZXJ2aWNlLnNsaWRlQ2hhbmdlZCQuc3Vic2NyaWJlKGRpcmVjdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci5zbGlkZVByZXYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zbGlkZVVwZGF0ZWRTdWJzY3JpcHRpb24gPSB0aGlzLmNhbGVuZGFyU2VydmljZS5zbGlkZVVwZGF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci51cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKTtcbiAgICAgICAgdGhpcy5vblRpdGxlQ2hhbmdlZC5lbWl0KHRpdGxlKTtcblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxUb0hvdXIgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBob3VyQ29sdW1ucyA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLndlZWt2aWV3LW5vcm1hbC1ldmVudC1jb250YWluZXInKS5xdWVyeVNlbGVjdG9yQWxsKCcuY2FsZW5kYXItaG91ci1jb2x1bW4nKTtcbiAgICAgICAgICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1lLmluaXRTY3JvbGxQb3NpdGlvbiA9IGhvdXJDb2x1bW5zW21lLnNjcm9sbFRvSG91ciAtIG1lLnN0YXJ0SG91cl0ub2Zmc2V0VG9wO1xuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBldmVudFNvdXJjZUNoYW5nZSA9IGNoYW5nZXMuZXZlbnRTb3VyY2U7XG4gICAgICAgIGlmIChldmVudFNvdXJjZUNoYW5nZSAmJiBldmVudFNvdXJjZUNoYW5nZS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMub25EYXRhTG9hZGVkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2NrU3dpcGVUb1ByZXYgPSBjaGFuZ2VzLmxvY2tTd2lwZVRvUHJldjtcbiAgICAgICAgaWYgKGxvY2tTd2lwZVRvUHJldikge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIubG9ja1N3aXBlVG9QcmV2KGxvY2tTd2lwZVRvUHJldi5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9ja1N3aXBlcyA9IGNoYW5nZXMubG9ja1N3aXBlcztcbiAgICAgICAgaWYgKGxvY2tTd2lwZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmxvY2tTd2lwZXMobG9ja1N3aXBlcy5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnREYXRlQ2hhbmdlZEZyb21QYXJlbnRTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGVDaGFuZ2VkRnJvbVBhcmVudFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUNoYW5nZWRGcm9tUGFyZW50U3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmV2ZW50U291cmNlQ2hhbmdlZFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZUNoYW5nZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTb3VyY2VDaGFuZ2VkU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNsaWRlQ2hhbmdlZFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zbGlkZUNoYW5nZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVDaGFuZ2VkU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNsaWRlVXBkYXRlZFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVVwZGF0ZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVVcGRhdGVkU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2xpZGVDaGFuZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5jYWxsYmFja09uSW5pdCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja09uSW5pdCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudFZpZXdJbmRleCA9IHRoaXMuY3VycmVudFZpZXdJbmRleDtcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IDA7XG5cbiAgICAgICAgdGhpcy5zbGlkZXIuZ2V0QWN0aXZlSW5kZXgoKS50aGVuKGN1cnJlbnRTbGlkZUluZGV4ID0+IHtcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZUluZGV4ID0gKGN1cnJlbnRTbGlkZUluZGV4ICsgMikgJSAzO1xuICAgICAgICAgICAgaWYoaXNOYU4oY3VycmVudFNsaWRlSW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFNsaWRlSW5kZXggPSBjdXJyZW50Vmlld0luZGV4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY3VycmVudFNsaWRlSW5kZXggLSBjdXJyZW50Vmlld0luZGV4ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFNsaWRlSW5kZXggPT09IDAgJiYgY3VycmVudFZpZXdJbmRleCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2xpZGVUbygxLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRWaWV3SW5kZXggLSBjdXJyZW50U2xpZGVJbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U2xpZGVJbmRleCA9PT0gMiAmJiBjdXJyZW50Vmlld0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gLTE7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2xpZGVUbygzLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3SW5kZXggPSBjdXJyZW50U2xpZGVJbmRleDtcbiAgICAgICAgICAgIHRoaXMubW92ZShkaXJlY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtb3ZlKGRpcmVjdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgY29uc3QgYWRqYWNlbnQgPSB0aGlzLmNhbGVuZGFyU2VydmljZS5nZXRBZGphY2VudENhbGVuZGFyRGF0ZSh0aGlzLm1vZGUsIGRpcmVjdGlvbik7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLnNldEN1cnJlbnREYXRlKGFkamFjZW50KTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIb3VyQ29sdW1uTGFiZWxzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgaG91ckNvbHVtbkxhYmVsczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaG91ciA9IDAsIGxlbmd0aCA9IHRoaXMudmlld3NbMF0ucm93cy5sZW5ndGg7IGhvdXIgPCBsZW5ndGg7IGhvdXIgKz0gMSkge1xuICAgICAgICAgICAgLy8gaGFuZGxlIGVkZ2UgY2FzZSBmb3IgRFNUXG4gICAgICAgICAgICBpZiAoaG91ciA9PT0gMCAmJiB0aGlzLnZpZXdzWzBdLnJvd3NbaG91cl1bMF0udGltZS5nZXRIb3VycygpICE9PSB0aGlzLnN0YXJ0SG91cikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSh0aGlzLnZpZXdzWzBdLnJvd3NbaG91cl1bMF0udGltZSk7XG4gICAgICAgICAgICAgICAgdGltZS5zZXREYXRlKHRpbWUuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgICAgICAgICAgdGltZS5zZXRIb3Vycyh0aGlzLnN0YXJ0SG91cik7XG4gICAgICAgICAgICAgICAgaG91ckNvbHVtbkxhYmVscy5wdXNoKHRoaXMuZm9ybWF0SG91ckNvbHVtbkxhYmVsKHRpbWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaG91ckNvbHVtbkxhYmVscy5wdXNoKHRoaXMuZm9ybWF0SG91ckNvbHVtbkxhYmVsKHRoaXMudmlld3NbMF0ucm93c1tob3VyXVswXS50aW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhvdXJDb2x1bW5MYWJlbHM7XG4gICAgfVxuXG4gICAgZ2V0Vmlld0RhdGEoc3RhcnRUaW1lOiBEYXRlKTogSVdlZWtWaWV3IHtcbiAgICAgICAgY29uc3QgZGF0ZXMgPSBXZWVrVmlld0NvbXBvbmVudC5nZXREYXRlcyhzdGFydFRpbWUsIDcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgZGF0ZXNbaV0uZGF5SGVhZGVyID0gdGhpcy5mb3JtYXREYXlIZWFkZXIoZGF0ZXNbaV0uZGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogV2Vla1ZpZXdDb21wb25lbnQuY3JlYXRlRGF0ZU9iamVjdHMoc3RhcnRUaW1lLCB0aGlzLnN0YXJ0SG91ciwgdGhpcy5lbmRIb3VyLCB0aGlzLmhvdXJTZWdtZW50cyksXG4gICAgICAgICAgICBkYXRlc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldFJhbmdlKGN1cnJlbnREYXRlOiBEYXRlKTogSVJhbmdlIHtcbiAgICAgICAgY29uc3QgeWVhciA9IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICBtb250aCA9IGN1cnJlbnREYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICBkYXRlID0gY3VycmVudERhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgZGF5ID0gY3VycmVudERhdGUuZ2V0RGF5KCk7XG4gICAgICAgIGxldCBkaWZmZXJlbmNlID0gZGF5IC0gdGhpcy5zdGFydGluZ0RheVdlZWs7XG5cbiAgICAgICAgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XG4gICAgICAgICAgICBkaWZmZXJlbmNlICs9IDc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgaG91ciB0byAxMiB0byBhdm9pZCBEU1QgcHJvYmxlbVxuICAgICAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlIC0gZGlmZmVyZW5jZSwgMTIsIDAsIDApLFxuICAgICAgICAgICAgZW5kVGltZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlIC0gZGlmZmVyZW5jZSArIDcsIDEyLCAwLCAwKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnRUaW1lOiBmaXJzdERheU9mV2VlayxcbiAgICAgICAgICAgIGVuZFRpbWVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbkRhdGFMb2FkZWQoKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50U291cmNlID0gdGhpcy5ldmVudFNvdXJjZSxcbiAgICAgICAgICAgIGxlbiA9IGV2ZW50U291cmNlID8gZXZlbnRTb3VyY2UubGVuZ3RoIDogMCxcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHRoaXMucmFuZ2Uuc3RhcnRUaW1lLFxuICAgICAgICAgICAgZW5kVGltZSA9IHRoaXMucmFuZ2UuZW5kVGltZSxcbiAgICAgICAgICAgIHV0Y1N0YXJ0VGltZSA9IERhdGUuVVRDKHN0YXJ0VGltZS5nZXRGdWxsWWVhcigpLCBzdGFydFRpbWUuZ2V0TW9udGgoKSwgc3RhcnRUaW1lLmdldERhdGUoKSksXG4gICAgICAgICAgICB1dGNFbmRUaW1lID0gRGF0ZS5VVEMoZW5kVGltZS5nZXRGdWxsWWVhcigpLCBlbmRUaW1lLmdldE1vbnRoKCksIGVuZFRpbWUuZ2V0RGF0ZSgpKSxcbiAgICAgICAgICAgIGN1cnJlbnRWaWV3SW5kZXggPSB0aGlzLmN1cnJlbnRWaWV3SW5kZXgsXG4gICAgICAgICAgICByb3dzID0gdGhpcy52aWV3c1tjdXJyZW50Vmlld0luZGV4XS5yb3dzLFxuICAgICAgICAgICAgZGF0ZXMgPSB0aGlzLnZpZXdzW2N1cnJlbnRWaWV3SW5kZXhdLmRhdGVzLFxuICAgICAgICAgICAgb25lSG91ciA9IDM2MDAwMDAsXG4gICAgICAgICAgICBvbmVEYXkgPSA4NjQwMDAwMCxcbiAgICAgICAgICAgIC8vIGFkZCBhbGxkYXkgZXBzXG4gICAgICAgICAgICBlcHMgPSAwLjAxNixcbiAgICAgICAgICAgIHJhbmdlU3RhcnRSb3dJbmRleCA9IHRoaXMuc3RhcnRIb3VyICogdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICAgICAgICByYW5nZUVuZFJvd0luZGV4ID0gdGhpcy5lbmRIb3VyICogdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICAgICAgICBhbGxSb3dzID0gMjQgKiB0aGlzLmhvdXJTZWdtZW50cztcbiAgICAgICAgbGV0IGFsbERheUV2ZW50SW5SYW5nZSA9IGZhbHNlLFxuICAgICAgICAgICAgbm9ybWFsRXZlbnRJblJhbmdlID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGRhdGVzW2ldLmV2ZW50cyA9IFtdO1xuICAgICAgICAgICAgZGF0ZXNbaV0uaGFzRXZlbnQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGRheSA9IDA7IGRheSA8IDc7IGRheSArPSAxKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBob3VyID0gMDsgaG91ciA8IHRoaXMuaG91clJhbmdlOyBob3VyICs9IDEpIHtcbiAgICAgICAgICAgICAgICByb3dzW2hvdXJdW2RheV0uZXZlbnRzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudFNvdXJjZVtpXTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50U3RhcnRUaW1lID0gZXZlbnQuc3RhcnRUaW1lO1xuICAgICAgICAgICAgY29uc3QgZXZlbnRFbmRUaW1lID0gZXZlbnQuZW5kVGltZTtcblxuICAgICAgICAgICAgbGV0IGV2ZW50VVRDU3RhcnRUaW1lOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgZXZlbnRVVENFbmRUaW1lOiBudW1iZXI7XG5cbiAgICAgICAgICAgIGlmIChldmVudC5hbGxEYXkpIHtcbiAgICAgICAgICAgICAgICBldmVudFVUQ1N0YXJ0VGltZSA9IGV2ZW50U3RhcnRUaW1lLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICBldmVudFVUQ0VuZFRpbWUgPSBldmVudEVuZFRpbWUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudFVUQ1N0YXJ0VGltZSA9IERhdGUuVVRDKGV2ZW50U3RhcnRUaW1lLmdldEZ1bGxZZWFyKCksIGV2ZW50U3RhcnRUaW1lLmdldE1vbnRoKCksIGV2ZW50U3RhcnRUaW1lLmdldERhdGUoKSk7XG4gICAgICAgICAgICAgICAgZXZlbnRVVENFbmRUaW1lID0gRGF0ZS5VVEMoZXZlbnRFbmRUaW1lLmdldEZ1bGxZZWFyKCksIGV2ZW50RW5kVGltZS5nZXRNb250aCgpLCBldmVudEVuZFRpbWUuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChldmVudFVUQ0VuZFRpbWUgPD0gdXRjU3RhcnRUaW1lIHx8IGV2ZW50VVRDU3RhcnRUaW1lID49IHV0Y0VuZFRpbWUgfHwgZXZlbnRTdGFydFRpbWUgPj0gZXZlbnRFbmRUaW1lKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChldmVudC5hbGxEYXkpIHtcbiAgICAgICAgICAgICAgICBhbGxEYXlFdmVudEluUmFuZ2UgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgbGV0IGFsbERheVN0YXJ0SW5kZXg6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRVVENTdGFydFRpbWUgPD0gdXRjU3RhcnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbERheVN0YXJ0SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbERheVN0YXJ0SW5kZXggPSBNYXRoLnJvdW5kKChldmVudFVUQ1N0YXJ0VGltZSAtIHV0Y1N0YXJ0VGltZSkgLyBvbmVEYXkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBhbGxEYXlFbmRJbmRleDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIGlmIChldmVudFVUQ0VuZFRpbWUgPj0gdXRjRW5kVGltZSkge1xuICAgICAgICAgICAgICAgICAgICBhbGxEYXlFbmRJbmRleCA9IE1hdGgucm91bmQoKHV0Y0VuZFRpbWUgLSB1dGNTdGFydFRpbWUpIC8gb25lRGF5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbGxEYXlFbmRJbmRleCA9IE1hdGgucm91bmQoKGV2ZW50VVRDRW5kVGltZSAtIHV0Y1N0YXJ0VGltZSkgLyBvbmVEYXkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlBbGxEYXlFdmVudDogSURpc3BsYXlFdmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXg6IGFsbERheVN0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGVuZEluZGV4OiBhbGxEYXlFbmRJbmRleFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBsZXQgZXZlbnRTZXQgPSBkYXRlc1thbGxEYXlTdGFydEluZGV4XS5ldmVudHM7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50U2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50U2V0LnB1c2goZGlzcGxheUFsbERheUV2ZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBldmVudFNldCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBldmVudFNldC5wdXNoKGRpc3BsYXlBbGxEYXlFdmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVzW2FsbERheVN0YXJ0SW5kZXhdLmV2ZW50cyA9IGV2ZW50U2V0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRlc1thbGxEYXlTdGFydEluZGV4XS5oYXNFdmVudCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vcm1hbEV2ZW50SW5SYW5nZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGltZURpZmZlcmVuY2VTdGFydDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIGlmIChldmVudFVUQ1N0YXJ0VGltZSA8IHV0Y1N0YXJ0VGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aW1lRGlmZmVyZW5jZVN0YXJ0ID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aW1lRGlmZmVyZW5jZVN0YXJ0ID0gKGV2ZW50VVRDU3RhcnRUaW1lIC0gdXRjU3RhcnRUaW1lKSAvIG9uZUhvdXIgKiB0aGlzLmhvdXJTZWdtZW50cyArIChldmVudFN0YXJ0VGltZS5nZXRIb3VycygpICsgZXZlbnRTdGFydFRpbWUuZ2V0TWludXRlcygpIC8gNjApICogdGhpcy5ob3VyU2VnbWVudHM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVEaWZmZXJlbmNlRW5kOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50VVRDRW5kVGltZSA+IHV0Y0VuZFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZURpZmZlcmVuY2VFbmQgPSAodXRjRW5kVGltZSAtIHV0Y1N0YXJ0VGltZSkgLyBvbmVIb3VyICogdGhpcy5ob3VyU2VnbWVudHM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZURpZmZlcmVuY2VFbmQgPSAoZXZlbnRVVENFbmRUaW1lIC0gb25lRGF5IC0gdXRjU3RhcnRUaW1lKSAvIG9uZUhvdXIgKiB0aGlzLmhvdXJTZWdtZW50cyArIChldmVudEVuZFRpbWUuZ2V0SG91cnMoKSArIGV2ZW50RW5kVGltZS5nZXRNaW51dGVzKCkgLyA2MCkgKiB0aGlzLmhvdXJTZWdtZW50cztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gTWF0aC5mbG9vcih0aW1lRGlmZmVyZW5jZVN0YXJ0KSxcbiAgICAgICAgICAgICAgICAgICAgZW5kSW5kZXggPSBNYXRoLmNlaWwodGltZURpZmZlcmVuY2VFbmQgLSBlcHMpO1xuICAgICAgICAgICAgICAgIGxldCBzdGFydFJvd0luZGV4ID0gc3RhcnRJbmRleCAlIGFsbFJvd3MsXG4gICAgICAgICAgICAgICAgICAgIGRheUluZGV4ID0gTWF0aC5mbG9vcihzdGFydEluZGV4IC8gYWxsUm93cyksXG4gICAgICAgICAgICAgICAgICAgIGVuZE9mRGF5ID0gZGF5SW5kZXggKiBhbGxSb3dzLFxuICAgICAgICAgICAgICAgICAgICBzdGFydE9mZnNldCA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGVuZE9mZnNldCA9IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3VyUGFydHMgIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0Um93SW5kZXggPCByYW5nZVN0YXJ0Um93SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T2Zmc2V0ID0gTWF0aC5mbG9vcigodGltZURpZmZlcmVuY2VTdGFydCAtIHN0YXJ0SW5kZXgpICogdGhpcy5ob3VyUGFydHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBlbmRPZkRheSArPSBhbGxSb3dzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kUm93SW5kZXg6IG51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZE9mRGF5IDwgZW5kSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFJvd0luZGV4ID0gYWxsUm93cztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbmRPZkRheSA9PT0gZW5kSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRSb3dJbmRleCA9IGFsbFJvd3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFJvd0luZGV4ID0gZW5kSW5kZXggJSBhbGxSb3dzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaG91clBhcnRzICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVuZFJvd0luZGV4ID4gcmFuZ2VFbmRSb3dJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZE9mZnNldCA9IE1hdGguZmxvb3IoKGVuZEluZGV4IC0gdGltZURpZmZlcmVuY2VFbmQpICogdGhpcy5ob3VyUGFydHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRSb3dJbmRleCA8IHJhbmdlU3RhcnRSb3dJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRSb3dJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFJvd0luZGV4IC09IHJhbmdlU3RhcnRSb3dJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kUm93SW5kZXggPiByYW5nZUVuZFJvd0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRSb3dJbmRleCA9IHJhbmdlRW5kUm93SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZW5kUm93SW5kZXggLT0gcmFuZ2VTdGFydFJvd0luZGV4O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydFJvd0luZGV4IDwgZW5kUm93SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlFdmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydEluZGV4OiBzdGFydFJvd0luZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZEluZGV4OiBlbmRSb3dJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXZlbnRTZXQgPSByb3dzW3N0YXJ0Um93SW5kZXhdW2RheUluZGV4XS5ldmVudHM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFNldC5wdXNoKGRpc3BsYXlFdmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U2V0ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRTZXQucHVzaChkaXNwbGF5RXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3Nbc3RhcnRSb3dJbmRleF1bZGF5SW5kZXhdLmV2ZW50cyA9IGV2ZW50U2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZXNbZGF5SW5kZXhdLmhhc0V2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdGFydFJvd0luZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBkYXlJbmRleCArPSAxO1xuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGVuZE9mRGF5IDwgZW5kSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vcm1hbEV2ZW50SW5SYW5nZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgZGF5ID0gMDsgZGF5IDwgNzsgZGF5ICs9IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgb3JkZXJlZEV2ZW50czogSURpc3BsYXlFdmVudFtdID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaG91ciA9IDA7IGhvdXIgPCB0aGlzLmhvdXJSYW5nZTsgaG91ciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3dzW2hvdXJdW2RheV0uZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzW2hvdXJdW2RheV0uZXZlbnRzLnNvcnQoV2Vla1ZpZXdDb21wb25lbnQuY29tcGFyZUV2ZW50QnlTdGFydE9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlcmVkRXZlbnRzID0gb3JkZXJlZEV2ZW50cy5jb25jYXQocm93c1tob3VyXVtkYXldLmV2ZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyZWRFdmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlRXZlbnRzKG9yZGVyZWRFdmVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhbGxEYXlFdmVudEluUmFuZ2UpIHtcbiAgICAgICAgICAgIGxldCBvcmRlcmVkQWxsRGF5RXZlbnRzOiBJRGlzcGxheUV2ZW50W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGRheSA9IDA7IGRheSA8IDc7IGRheSArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVzW2RheV0uZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyZWRBbGxEYXlFdmVudHMgPSBvcmRlcmVkQWxsRGF5RXZlbnRzLmNvbmNhdChkYXRlc1tkYXldLmV2ZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9yZGVyZWRBbGxEYXlFdmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VBbGxEYXlFdmVudHMob3JkZXJlZEFsbERheUV2ZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hdXRvU2VsZWN0KSB7XG4gICAgICAgICAgICBsZXQgZmluZFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWREYXRlO1xuICAgICAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCA3OyByICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZXNbcl0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRlID0gZGF0ZXNbcl07XG4gICAgICAgICAgICAgICAgICAgIGZpbmRTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpbmRTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcmtEaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRoaXMubWFya0Rpc2FibGVkKHNlbGVjdGVkRGF0ZS5kYXRlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uVGltZVNlbGVjdGVkLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFRpbWU6IHNlbGVjdGVkRGF0ZS5kYXRlLFxuICAgICAgICAgICAgICAgICAgICBldmVudHM6IHNlbGVjdGVkRGF0ZS5ldmVudHMubWFwKGUgPT4gZS5ldmVudCksXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoVmlldygpIHtcbiAgICAgICAgdGhpcy5yYW5nZSA9IHRoaXMuZ2V0UmFuZ2UodGhpcy5jYWxlbmRhclNlcnZpY2UuY3VycmVudERhdGUpO1xuXG4gICAgICAgIGlmICh0aGlzLmluaXRlZCkge1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLmdldFRpdGxlKCk7XG4gICAgICAgICAgICB0aGlzLm9uVGl0bGVDaGFuZ2VkLmVtaXQodGl0bGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLnBvcHVsYXRlQWRqYWNlbnRWaWV3cyh0aGlzKTtcbiAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50Vmlldyh0aGlzLnJhbmdlLnN0YXJ0VGltZSwgdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3SW5kZXhdKTtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UucmFuZ2VDaGFuZ2VkKHRoaXMpO1xuICAgIH1cblxuICAgIGdldFRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZpcnN0RGF5T2ZXZWVrID0gbmV3IERhdGUodGhpcy5yYW5nZS5zdGFydFRpbWUuZ2V0VGltZSgpKTtcbiAgICAgICAgZmlyc3REYXlPZldlZWsuc2V0SG91cnMoMTIsIDAsIDAsIDApO1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRUaXRsZShmaXJzdERheU9mV2Vlayk7XG4gICAgfVxuXG4gICAgZ2V0SGlnaGxpZ2h0Q2xhc3MoZGF0ZTogSVdlZWtWaWV3RGF0ZVJvdyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBjbGFzc05hbWUgPSAnJztcblxuICAgICAgICBpZiAoZGF0ZS5oYXNFdmVudCkge1xuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnICc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGFzc05hbWUgPSAnd2Vla3ZpZXctd2l0aC1ldmVudCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnICc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGFzc05hbWUgKz0gJ3dlZWt2aWV3LXNlbGVjdGVkJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xhc3NOYW1lICs9ICd3ZWVrdmlldy1jdXJyZW50JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjbGFzc05hbWU7XG4gICAgfVxuXG4gICAgc2VsZWN0KHNlbGVjdGVkVGltZTogRGF0ZSwgZXZlbnRzOiBJRGlzcGxheUV2ZW50W10pIHtcbiAgICAgICAgbGV0IGRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLm1hcmtEaXNhYmxlZCkge1xuICAgICAgICAgICAgZGlzYWJsZWQgPSB0aGlzLm1hcmtEaXNhYmxlZChzZWxlY3RlZFRpbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblRpbWVTZWxlY3RlZC5lbWl0KHtcbiAgICAgICAgICAgIHNlbGVjdGVkVGltZSxcbiAgICAgICAgICAgIGV2ZW50czogZXZlbnRzLm1hcChlID0+IGUuZXZlbnQpLFxuICAgICAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGxhY2VFdmVudHMob3JkZXJlZEV2ZW50czogSURpc3BsYXlFdmVudFtdKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24ob3JkZXJlZEV2ZW50cyk7XG4gICAgICAgIFdlZWtWaWV3Q29tcG9uZW50LmNhbGN1bGF0ZVdpZHRoKG9yZGVyZWRFdmVudHMsIHRoaXMuaG91clJhbmdlLCB0aGlzLmhvdXJQYXJ0cyk7XG4gICAgfVxuXG4gICAgcGxhY2VBbGxEYXlFdmVudHMob3JkZXJlZEV2ZW50czogSURpc3BsYXlFdmVudFtdKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24ob3JkZXJlZEV2ZW50cyk7XG4gICAgfVxuXG4gICAgb3ZlcmxhcChldmVudDE6IElEaXNwbGF5RXZlbnQsIGV2ZW50MjogSURpc3BsYXlFdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZWFybHlFdmVudCA9IGV2ZW50MSxcbiAgICAgICAgICAgIGxhdGVFdmVudCA9IGV2ZW50MjtcbiAgICAgICAgaWYgKGV2ZW50MS5zdGFydEluZGV4ID4gZXZlbnQyLnN0YXJ0SW5kZXggfHwgKGV2ZW50MS5zdGFydEluZGV4ID09PSBldmVudDIuc3RhcnRJbmRleCAmJiBldmVudDEuc3RhcnRPZmZzZXQgPiBldmVudDIuc3RhcnRPZmZzZXQpKSB7XG4gICAgICAgICAgICBlYXJseUV2ZW50ID0gZXZlbnQyO1xuICAgICAgICAgICAgbGF0ZUV2ZW50ID0gZXZlbnQxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVhcmx5RXZlbnQuZW5kSW5kZXggPD0gbGF0ZUV2ZW50LnN0YXJ0SW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAhKGVhcmx5RXZlbnQuZW5kSW5kZXggLSBsYXRlRXZlbnQuc3RhcnRJbmRleCA9PT0gMSAmJiBlYXJseUV2ZW50LmVuZE9mZnNldCArIGxhdGVFdmVudC5zdGFydE9mZnNldCA+PSB0aGlzLmhvdXJQYXJ0cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVQb3NpdGlvbihldmVudHM6IElEaXNwbGF5RXZlbnRbXSkge1xuICAgICAgICBjb25zdCBsZW4gPSBldmVudHMubGVuZ3RoLFxuICAgICAgICAgICAgaXNGb3JiaWRkZW4gPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgICAgbGV0IG1heENvbHVtbiA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IGNvbDogbnVtYmVyO1xuICAgICAgICAgICAgZm9yIChjb2wgPSAwOyBjb2wgPCBtYXhDb2x1bW47IGNvbCArPSAxKSB7XG4gICAgICAgICAgICAgICAgaXNGb3JiaWRkZW5bY29sXSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGFwKGV2ZW50c1tpXSwgZXZlbnRzW2pdKSkge1xuICAgICAgICAgICAgICAgICAgICBpc0ZvcmJpZGRlbltldmVudHNbal0ucG9zaXRpb25dID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbCA9IDA7IGNvbCA8IG1heENvbHVtbjsgY29sICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRm9yYmlkZGVuW2NvbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbCA8IG1heENvbHVtbikge1xuICAgICAgICAgICAgICAgIGV2ZW50c1tpXS5wb3NpdGlvbiA9IGNvbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzW2ldLnBvc2l0aW9uID0gbWF4Q29sdW1uKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kaXIgPT09ICdydGwnKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzW2ldLnBvc2l0aW9uID0gbWF4Q29sdW1uIC0gMSAtIGV2ZW50c1tpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUN1cnJlbnRWaWV3KGN1cnJlbnRWaWV3U3RhcnREYXRlOiBEYXRlLCB2aWV3OiBJV2Vla1ZpZXcpIHtcbiAgICAgICAgY29uc3QgY3VycmVudENhbGVuZGFyRGF0ZSA9IHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmN1cnJlbnREYXRlLFxuICAgICAgICAgICAgdG9kYXkgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgb25lRGF5ID0gODY0MDAwMDAsXG4gICAgICAgICAgICBzZWxlY3RlZERheURpZmZlcmVuY2UgPSBNYXRoLnJvdW5kKChEYXRlLlVUQyhjdXJyZW50Q2FsZW5kYXJEYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnRDYWxlbmRhckRhdGUuZ2V0TW9udGgoKSwgY3VycmVudENhbGVuZGFyRGF0ZS5nZXREYXRlKCkpIC0gRGF0ZS5VVEMoY3VycmVudFZpZXdTdGFydERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudFZpZXdTdGFydERhdGUuZ2V0TW9udGgoKSwgY3VycmVudFZpZXdTdGFydERhdGUuZ2V0RGF0ZSgpKSkgLyBvbmVEYXkpLFxuICAgICAgICAgICAgY3VycmVudERheURpZmZlcmVuY2UgPSBNYXRoLmZsb29yKChEYXRlLlVUQyh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpLCB0b2RheS5nZXRUaW1lKCkpIC0gRGF0ZS5VVEMoY3VycmVudFZpZXdTdGFydERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudFZpZXdTdGFydERhdGUuZ2V0TW9udGgoKSwgY3VycmVudFZpZXdTdGFydERhdGUuZ2V0RGF0ZSgpKSkgLyBvbmVEYXkpO1xuXG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgNzsgciArPSAxKSB7XG4gICAgICAgICAgICB2aWV3LmRhdGVzW3JdLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWREYXlEaWZmZXJlbmNlID49IDAgJiYgc2VsZWN0ZWREYXlEaWZmZXJlbmNlIDwgNyAmJiB0aGlzLmF1dG9TZWxlY3QpIHtcbiAgICAgICAgICAgIHZpZXcuZGF0ZXNbc2VsZWN0ZWREYXlEaWZmZXJlbmNlXS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudERheURpZmZlcmVuY2UgPj0gMCAmJiBjdXJyZW50RGF5RGlmZmVyZW5jZSA8IDcpIHtcbiAgICAgICAgICAgIHZpZXcuZGF0ZXNbY3VycmVudERheURpZmZlcmVuY2VdLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGF5U2VsZWN0ZWQodmlld0RhdGU6IElXZWVrVmlld0RhdGVSb3cpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWREYXRlID0gdmlld0RhdGUuZGF0ZSxcbiAgICAgICAgICAgIGRhdGVzID0gdGhpcy52aWV3c1t0aGlzLmN1cnJlbnRWaWV3SW5kZXhdLmRhdGVzLFxuICAgICAgICAgICAgY3VycmVudFZpZXdTdGFydERhdGUgPSB0aGlzLnJhbmdlLnN0YXJ0VGltZSxcbiAgICAgICAgICAgIG9uZURheSA9IDg2NDAwMDAwLFxuICAgICAgICAgICAgc2VsZWN0ZWREYXlEaWZmZXJlbmNlID0gTWF0aC5yb3VuZCgoRGF0ZS5VVEMoc2VsZWN0ZWREYXRlLmdldEZ1bGxZZWFyKCksIHNlbGVjdGVkRGF0ZS5nZXRNb250aCgpLCBzZWxlY3RlZERhdGUuZ2V0RGF0ZSgpKSAtIERhdGUuVVRDKGN1cnJlbnRWaWV3U3RhcnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnRWaWV3U3RhcnREYXRlLmdldE1vbnRoKCksIGN1cnJlbnRWaWV3U3RhcnREYXRlLmdldERhdGUoKSkpIC8gb25lRGF5KTtcblxuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5zZXRDdXJyZW50RGF0ZShzZWxlY3RlZERhdGUpO1xuXG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgNzsgciArPSAxKSB7XG4gICAgICAgICAgICBkYXRlc1tyXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkRGF5RGlmZmVyZW5jZSA+PSAwICYmIHNlbGVjdGVkRGF5RGlmZmVyZW5jZSA8IDcpIHtcbiAgICAgICAgICAgIGRhdGVzW3NlbGVjdGVkRGF5RGlmZmVyZW5jZV0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLm1hcmtEaXNhYmxlZCkge1xuICAgICAgICAgICAgZGlzYWJsZWQgPSB0aGlzLm1hcmtEaXNhYmxlZChzZWxlY3RlZERhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblRpbWVTZWxlY3RlZC5lbWl0KHtzZWxlY3RlZFRpbWU6IHNlbGVjdGVkRGF0ZSwgZXZlbnRzOiB2aWV3RGF0ZS5ldmVudHMubWFwKGUgPT4gZS5ldmVudCksIGRpc2FibGVkfSk7XG4gICAgfVxuXG4gICAgc2V0U2Nyb2xsUG9zaXRpb24oc2Nyb2xsUG9zaXRpb246IG51bWJlcikge1xuICAgICAgICB0aGlzLmluaXRTY3JvbGxQb3NpdGlvbiA9IHNjcm9sbFBvc2l0aW9uO1xuICAgIH1cbn1cbiJdfQ==