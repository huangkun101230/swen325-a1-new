import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalendarService } from './calendar.service';
var MonthViewComponent = /** @class */ (function () {
    function MonthViewComponent(calendarService) {
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
    MonthViewComponent_1 = MonthViewComponent;
    ;
    MonthViewComponent.getDates = function (startDate, n) {
        var dates = new Array(n), current = new Date(startDate.getTime());
        var i = 0;
        while (i < n) {
            dates[i++] = new Date(current.getTime());
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };
    MonthViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.sliderOptions) {
            this.sliderOptions = {};
        }
        this.sliderOptions.loop = true;
        if (this.dateFormatter && this.dateFormatter.formatMonthViewDay) {
            this.formatDayLabel = this.dateFormatter.formatMonthViewDay;
        }
        else {
            var dayLabelDatePipe_1 = new DatePipe('en-US');
            this.formatDayLabel = function (date) {
                return dayLabelDatePipe_1.transform(date, this.formatDay);
            };
        }
        if (this.dateFormatter && this.dateFormatter.formatMonthViewDayHeader) {
            this.formatDayHeaderLabel = this.dateFormatter.formatMonthViewDayHeader;
        }
        else {
            var datePipe_1 = new DatePipe(this.locale);
            this.formatDayHeaderLabel = function (date) {
                return datePipe_1.transform(date, this.formatDayHeader);
            };
        }
        if (this.dateFormatter && this.dateFormatter.formatMonthViewTitle) {
            this.formatTitle = this.dateFormatter.formatMonthViewTitle;
        }
        else {
            var datePipe_2 = new DatePipe(this.locale);
            this.formatTitle = function (date) {
                return datePipe_2.transform(date, this.formatMonthTitle);
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
        this.currentDateChangedFromParentSubscription = this.calendarService.currentDateChangedFromParent$.subscribe(function (currentDate) {
            _this.refreshView();
        });
        this.eventSourceChangedSubscription = this.calendarService.eventSourceChanged$.subscribe(function () {
            _this.onDataLoaded();
        });
        this.slideChangedSubscription = this.calendarService.slideChanged$.subscribe(function (direction) {
            if (direction === 1) {
                _this.slider.slideNext();
            }
            else if (direction === -1) {
                _this.slider.slidePrev();
            }
        });
        this.slideUpdatedSubscription = this.calendarService.slideUpdated$.subscribe(function () {
            _this.slider.update();
        });
    };
    MonthViewComponent.prototype.ngOnDestroy = function () {
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
    };
    MonthViewComponent.prototype.ngOnChanges = function (changes) {
        if (!this.inited) {
            return;
        }
        var eventSourceChange = changes.eventSource;
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }
        var lockSwipeToPrev = changes.lockSwipeToPrev;
        if (lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(lockSwipeToPrev.currentValue);
        }
        var lockSwipes = changes.lockSwipes;
        if (lockSwipes) {
            this.slider.lockSwipes(lockSwipes.currentValue);
        }
    };
    MonthViewComponent.prototype.ngAfterViewInit = function () {
        var title = this.getTitle();
        this.onTitleChanged.emit(title);
    };
    MonthViewComponent.prototype.onSlideChanged = function () {
        var _this = this;
        if (this.callbackOnInit) {
            this.callbackOnInit = false;
            return;
        }
        var direction = 0;
        var currentViewIndex = this.currentViewIndex;
        this.slider.getActiveIndex().then(function (currentSlideIndex) {
            currentSlideIndex = (currentSlideIndex + 2) % 3;
            if (isNaN(currentSlideIndex)) {
                currentSlideIndex = currentViewIndex;
            }
            if (currentSlideIndex - currentViewIndex === 1) {
                direction = 1;
            }
            else if (currentSlideIndex === 0 && currentViewIndex === 2) {
                direction = 1;
                _this.slider.slideTo(1, 0, false);
            }
            else if (currentViewIndex - currentSlideIndex === 1) {
                direction = -1;
            }
            else if (currentSlideIndex === 2 && currentViewIndex === 0) {
                direction = -1;
                _this.slider.slideTo(3, 0, false);
            }
            _this.currentViewIndex = currentSlideIndex;
            _this.move(direction);
        });
    };
    MonthViewComponent.prototype.move = function (direction) {
        if (direction === 0) {
            return;
        }
        this.direction = direction;
        if (!this.moveOnSelected) {
            var adjacentDate = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
            this.calendarService.setCurrentDate(adjacentDate);
        }
        this.refreshView();
        this.direction = 0;
        this.moveOnSelected = false;
    };
    MonthViewComponent.prototype.createDateObject = function (date) {
        var disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(date);
        }
        return {
            date: date,
            events: [],
            label: this.formatDayLabel(date),
            secondary: false,
            disabled: disabled
        };
    };
    MonthViewComponent.prototype.getViewData = function (startTime) {
        var startDate = startTime, date = startDate.getDate(), month = (startDate.getMonth() + (date !== 1 ? 1 : 0)) % 12;
        var dates = MonthViewComponent_1.getDates(startDate, 42);
        var days = [];
        for (var i = 0; i < 42; i++) {
            var dateObject = this.createDateObject(dates[i]);
            dateObject.secondary = dates[i].getMonth() !== month;
            days[i] = dateObject;
        }
        var dayHeaders = [];
        for (var i = 0; i < 7; i++) {
            dayHeaders.push(this.formatDayHeaderLabel(days[i].date));
        }
        return {
            dates: days,
            dayHeaders: dayHeaders
        };
    };
    MonthViewComponent.prototype.getHighlightClass = function (date) {
        var className = '';
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
    };
    MonthViewComponent.prototype.getRange = function (currentDate) {
        var year = currentDate.getFullYear(), month = currentDate.getMonth(), firstDayOfMonth = new Date(year, month, 1, 12, 0, 0), // set hour to 12 to avoid DST problem
        difference = this.startingDayMonth - firstDayOfMonth.getDay(), numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference, startDate = new Date(firstDayOfMonth.getTime());
        if (numDisplayedFromPreviousMonth > 0) {
            startDate.setDate(-numDisplayedFromPreviousMonth + 1);
        }
        var endDate = new Date(startDate.getTime());
        endDate.setDate(endDate.getDate() + 42);
        return {
            startTime: startDate,
            endTime: endDate
        };
    };
    MonthViewComponent.prototype.onDataLoaded = function () {
        var range = this.range, eventSource = this.eventSource, len = eventSource ? eventSource.length : 0, startTime = range.startTime, endTime = range.endTime, utcStartTime = Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate()), utcEndTime = Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate()), currentViewIndex = this.currentViewIndex, dates = this.views[currentViewIndex].dates, oneDay = 86400000, eps = 0.0006;
        for (var r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].hasEvent = false;
                dates[r].events = [];
            }
        }
        for (var i = 0; i < len; i += 1) {
            var event_1 = eventSource[i], eventStartTime = event_1.startTime, eventEndTime = event_1.endTime;
            var eventUTCStartTime = void 0, eventUTCEndTime = void 0;
            if (event_1.allDay) {
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
            var timeDifferenceStart = void 0, timeDifferenceEnd = void 0;
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
            var index = Math.floor(timeDifferenceStart);
            var endIndex = Math.ceil(timeDifferenceEnd - eps);
            while (index < endIndex) {
                dates[index].hasEvent = true;
                var eventSet = dates[index].events;
                if (eventSet) {
                    eventSet.push(event_1);
                }
                else {
                    eventSet = [];
                    eventSet.push(event_1);
                    dates[index].events = eventSet;
                }
                index += 1;
            }
        }
        for (var r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].events.sort(this.compareEvent);
            }
        }
        if (this.autoSelect) {
            var findSelected = false;
            for (var r = 0; r < 42; r += 1) {
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
    };
    MonthViewComponent.prototype.refreshView = function () {
        this.range = this.getRange(this.calendarService.currentDate);
        if (this.inited) {
            var title = this.getTitle();
            this.onTitleChanged.emit(title);
        }
        this.calendarService.populateAdjacentViews(this);
        this.updateCurrentView(this.range.startTime, this.views[this.currentViewIndex]);
        this.calendarService.rangeChanged(this);
    };
    MonthViewComponent.prototype.getTitle = function () {
        var currentViewStartDate = this.range.startTime, date = currentViewStartDate.getDate(), month = (currentViewStartDate.getMonth() + (date !== 1 ? 1 : 0)) % 12, year = currentViewStartDate.getFullYear() + (date !== 1 && month === 0 ? 1 : 0), headerDate = new Date(year, month, 1, 12, 0, 0, 0);
        return this.formatTitle(headerDate);
    };
    MonthViewComponent.prototype.compareEvent = function (event1, event2) {
        if (event1.allDay) {
            return 1;
        }
        else if (event2.allDay) {
            return -1;
        }
        else {
            return (event1.startTime.getTime() - event2.startTime.getTime());
        }
    };
    MonthViewComponent.prototype.select = function (viewDate) {
        if (!this.views) {
            return;
        }
        var selectedDate = viewDate.date, events = viewDate.events;
        if (!viewDate.disabled) {
            var dates = this.views[this.currentViewIndex].dates, currentCalendarDate = this.calendarService.currentDate, currentMonth = currentCalendarDate.getMonth(), currentYear = currentCalendarDate.getFullYear(), selectedMonth = selectedDate.getMonth(), selectedYear = selectedDate.getFullYear();
            var direction = 0;
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
                var currentViewStartDate = this.range.startTime, oneDay = 86400000, selectedDayDifference = Math.round((Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay);
                for (var r = 0; r < 42; r += 1) {
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
        this.onTimeSelected.emit({ selectedTime: selectedDate, events: events, disabled: viewDate.disabled });
    };
    MonthViewComponent.prototype.slideView = function (direction) {
        if (direction === 1) {
            this.slider.slideNext();
        }
        else if (direction === -1) {
            this.slider.slidePrev();
        }
    };
    MonthViewComponent.prototype.updateCurrentView = function (currentViewStartDate, view) {
        var currentCalendarDate = this.calendarService.currentDate, today = new Date(), oneDay = 86400000, selectedDayDifference = Math.round((Date.UTC(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), currentCalendarDate.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay), currentDayDifference = Math.round((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay);
        for (var r = 0; r < 42; r += 1) {
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
    };
    MonthViewComponent.prototype.eventSelected = function (event) {
        this.onEventSelected.emit(event);
    };
    var MonthViewComponent_1;
    MonthViewComponent.ctorParameters = function () { return [
        { type: CalendarService }
    ]; };
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
            template: "\n        <div>\n            <ion-slides #monthSlider [options]=\"sliderOptions\" [dir]=\"dir\" (ionSlideDidChange)=\"onSlideChanged()\">\n                <ion-slide>\n                    <table *ngIf=\"0===currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr>\n                            <th *ngFor=\"let dayHeader of views[0].dayHeaders\">\n                                <small>{{dayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\" tappable (click)=\"select(views[0].dates[row*7+col])\"\n                                [ngClass]=\"getHighlightClass(views[0].dates[row*7+col])\">\n                                <ng-template [ngTemplateOutlet]=\"monthviewDisplayEventTemplate\"\n                                             [ngTemplateOutletContext]=\"{view: views[0], row: row, col: col}\">\n                                </ng-template>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                    <table *ngIf=\"0!==currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr class=\"text-center\">\n                            <th *ngFor=\"let dayHeader of views[0].dayHeaders\">\n                                <small>{{dayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\">\n                                <ng-template [ngTemplateOutlet]=\"monthviewInactiveDisplayEventTemplate\"\n                                             [ngTemplateOutletContext]=\"{view: views[0], row: row, col: col}\">\n                                </ng-template>\n                            </td>\n                        <tr>\n                        </tbody>\n                    </table>\n                </ion-slide>\n                <ion-slide>\n                    <table *ngIf=\"1===currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr>\n                            <th *ngFor=\"let dayHeader of views[1].dayHeaders\">\n                                <small>{{dayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\" tappable (click)=\"select(views[1].dates[row*7+col])\"\n                                [ngClass]=\"getHighlightClass(views[1].dates[row*7+col])\">\n                                <ng-template [ngTemplateOutlet]=\"monthviewDisplayEventTemplate\"\n                                             [ngTemplateOutletContext]=\"{view: views[1], row: row, col: col}\">\n                                </ng-template>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                    <table *ngIf=\"1!==currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr class=\"text-center\">\n                            <th *ngFor=\"let dayHeader of views[1].dayHeaders\">\n                                <small>{{dayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\">\n                                <ng-template [ngTemplateOutlet]=\"monthviewInactiveDisplayEventTemplate\"\n                                             [ngTemplateOutletContext]=\"{view: views[1], row: row, col: col}\">\n                                </ng-template>\n                            </td>\n                        <tr>\n                        </tbody>\n                    </table>\n                </ion-slide>\n                <ion-slide>\n                    <table *ngIf=\"2===currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr>\n                            <th *ngFor=\"let dayHeader of views[2].dayHeaders\">\n                                <small>{{dayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\" tappable (click)=\"select(views[2].dates[row*7+col])\"\n                                [ngClass]=\"getHighlightClass(views[2].dates[row*7+col])\">\n                                <ng-template [ngTemplateOutlet]=\"monthviewDisplayEventTemplate\"\n                                             [ngTemplateOutletContext]=\"{view: views[2], row: row, col: col}\">\n                                </ng-template>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                    <table *ngIf=\"2!==currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr class=\"text-center\">\n                            <th *ngFor=\"let dayHeader of views[2].dayHeaders\">\n                                <small>{{dayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\">\n                                <ng-template [ngTemplateOutlet]=\"monthviewInactiveDisplayEventTemplate\"\n                                             [ngTemplateOutletContext]=\"{view: views[2], row: row, col: col}\">\n                                </ng-template>\n                            </td>\n                        <tr>\n                        </tbody>\n                    </table>\n                </ion-slide>\n            </ion-slides>\n            <ng-template [ngTemplateOutlet]=\"monthviewEventDetailTemplate\"\n                         [ngTemplateOutletContext]=\"{showEventDetail:showEventDetail, selectedDate: selectedDate, noEventsLabel: noEventsLabel}\">\n            </ng-template>\n        </div>\n    ",
            styles: ["\n        .text-muted {\n            color: #999;\n        }\n\n        .table-fixed {\n            table-layout: fixed;\n        }\n\n        .table {\n            width: 100%;\n            max-width: 100%;\n            background-color: transparent;\n        }\n\n        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td,\n        .table > tbody > tr > td, .table > tfoot > tr > td {\n            padding: 8px;\n            line-height: 20px;\n            vertical-align: top;\n        }\n\n        .table > thead > tr > th {\n            vertical-align: bottom;\n            border-bottom: 2px solid #ddd;\n        }\n\n        .table > thead:first-child > tr:first-child > th, .table > thead:first-child > tr:first-child > td {\n            border-top: 0\n        }\n\n        .table > tbody + tbody {\n            border-top: 2px solid #ddd;\n        }\n\n        .table-bordered {\n            border: 1px solid #ddd;\n        }\n\n        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th,\n        .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {\n            border: 1px solid #ddd;\n        }\n\n        .table-bordered > thead > tr > th, .table-bordered > thead > tr > td {\n            border-bottom-width: 2px;\n        }\n\n        .table-striped > tbody > tr:nth-child(odd) > td, .table-striped > tbody > tr:nth-child(odd) > th {\n            background-color: #f9f9f9\n        }\n\n        .monthview-primary-with-event {\n            background-color: #3a87ad;\n            color: white;\n        }\n\n        .monthview-current {\n            background-color: #f0f0f0;\n        }\n\n        .monthview-selected {\n            background-color: #009900;\n            color: white;\n        }\n\n        .monthview-datetable td.monthview-disabled {\n            color: lightgrey;\n            cursor: default;\n        }\n\n        .monthview-datetable th {\n            text-align: center;\n        }\n\n        .monthview-datetable td {\n            cursor: pointer;\n            text-align: center;\n        }\n\n        .monthview-secondary-with-event {\n            background-color: #d9edf7;\n        }\n\n        ::-webkit-scrollbar,\n        *::-webkit-scrollbar {\n            display: none;\n        }\n    "]
        })
    ], MonthViewComponent);
    return MonthViewComponent;
}());
export { MonthViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGh2aWV3LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW9uaWMyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9udGh2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUdULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUVaLFNBQVMsRUFJWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFJekMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBNk5uRDtJQUVJLDRCQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFpQjNDLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFJbEIsUUFBRyxHQUFHLEVBQUUsQ0FBQztRQUtSLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM1QyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDN0MsbUJBQWMsR0FBRyxJQUFJLFlBQVksQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFDdkQsbUJBQWMsR0FBRyxJQUFJLFlBQVksQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUVuRCxVQUFLLEdBQWlCLEVBQUUsQ0FBQztRQUN6QixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFHckIsU0FBSSxHQUFpQixPQUFPLENBQUM7UUFDN0IsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUViLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixtQkFBYyxHQUFHLElBQUksQ0FBQztJQXZDOUIsQ0FBQzsyQkFIUSxrQkFBa0I7SUFJM0IsQ0FBQztJQWlETSwyQkFBUSxHQUFmLFVBQWdCLFNBQWUsRUFBRSxDQUFTO1FBQ3RDLElBQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUN0QixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMs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SUFDekI7UUFBUixLQUFLLEVBQUU7NkRBQXVCO0lBQ3RCO1FBQVIsS0FBSyxFQUFFOzBEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs0REFBdUM7SUFDdEM7UUFBUixLQUFLLEVBQUU7c0RBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7NkRBQStCO0lBQzlCO1FBQVIsS0FBSyxFQUFFO21EQUFVO0lBQ1Q7UUFBUixLQUFLLEVBQUU7K0RBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFOzBEQUFxQjtJQUNwQjtRQUFSLEtBQUssRUFBRTs2REFBb0I7SUFFbEI7UUFBVCxNQUFNLEVBQUU7OERBQTZDO0lBQzVDO1FBQVQsTUFBTSxFQUFFOytEQUE4QztJQUM3QztRQUFULE1BQU0sRUFBRTs4REFBd0Q7SUFDdkQ7UUFBVCxNQUFNLEVBQUU7OERBQWlEO0lBL0JqRCxrQkFBa0I7UUExTjlCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSw0N05BNkhUO3FCQUNRLGkyRUF3RlI7U0FDSixDQUFDO09BQ1csa0JBQWtCLENBMmhCOUI7SUFBRCx5QkFBQztDQUFBLEFBM2hCRCxJQTJoQkM7U0EzaEJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIE9uSW5pdCxcbiAgICBPbkNoYW5nZXMsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGF0ZVBpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0lvblNsaWRlc30gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xuXG5pbXBvcnQge0lDYWxlbmRhckNvbXBvbmVudCwgSUV2ZW50LCBJTW9udGhWaWV3LCBJTW9udGhWaWV3Um93LCBJVGltZVNlbGVjdGVkLCBJUmFuZ2UsIENhbGVuZGFyTW9kZSwgSURhdGVGb3JtYXR0ZXJ9IGZyb20gJy4vY2FsZW5kYXInO1xuaW1wb3J0IHtDYWxlbmRhclNlcnZpY2V9IGZyb20gJy4vY2FsZW5kYXIuc2VydmljZSc7XG5pbXBvcnQge0lNb250aFZpZXdEaXNwbGF5RXZlbnRUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vY2FsZW5kYXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21vbnRodmlldycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxpb24tc2xpZGVzICNtb250aFNsaWRlciBbb3B0aW9uc109XCJzbGlkZXJPcHRpb25zXCIgW2Rpcl09XCJkaXJcIiAoaW9uU2xpZGVEaWRDaGFuZ2UpPVwib25TbGlkZUNoYW5nZWQoKVwiPlxuICAgICAgICAgICAgICAgIDxpb24tc2xpZGU+XG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSAqbmdJZj1cIjA9PT1jdXJyZW50Vmlld0luZGV4XCIgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1maXhlZCBtb250aHZpZXctZGF0ZXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBkYXlIZWFkZXIgb2Ygdmlld3NbMF0uZGF5SGVhZGVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGw+e3tkYXlIZWFkZXJ9fTwvc21hbGw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2YgWzAsMSwyLDMsNCw1XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgY29sIG9mIFswLDEsMiwzLDQsNSw2XVwiIHRhcHBhYmxlIChjbGljayk9XCJzZWxlY3Qodmlld3NbMF0uZGF0ZXNbcm93KjcrY29sXSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRIaWdobGlnaHRDbGFzcyh2aWV3c1swXS5kYXRlc1tyb3cqNytjb2xdKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibW9udGh2aWV3RGlzcGxheUV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInt2aWV3OiB2aWV3c1swXSwgcm93OiByb3csIGNvbDogY29sfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlICpuZ0lmPVwiMCE9PWN1cnJlbnRWaWV3SW5kZXhcIiBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWZpeGVkIG1vbnRodmlldy1kYXRldGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBkYXlIZWFkZXIgb2Ygdmlld3NbMF0uZGF5SGVhZGVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGw+e3tkYXlIZWFkZXJ9fTwvc21hbGw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2YgWzAsMSwyLDMsNCw1XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgY29sIG9mIFswLDEsMiwzLDQsNSw2XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibW9udGh2aWV3SW5hY3RpdmVEaXNwbGF5RXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3ZpZXc6IHZpZXdzWzBdLCByb3c6IHJvdywgY29sOiBjb2x9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgPC9pb24tc2xpZGU+XG4gICAgICAgICAgICAgICAgPGlvbi1zbGlkZT5cbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlICpuZ0lmPVwiMT09PWN1cnJlbnRWaWV3SW5kZXhcIiBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWZpeGVkIG1vbnRodmlldy1kYXRldGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGRheUhlYWRlciBvZiB2aWV3c1sxXS5kYXlIZWFkZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbD57e2RheUhlYWRlcn19PC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiBbMCwxLDIsMyw0LDVdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2wgb2YgWzAsMSwyLDMsNCw1LDZdXCIgdGFwcGFibGUgKGNsaWNrKT1cInNlbGVjdCh2aWV3c1sxXS5kYXRlc1tyb3cqNytjb2xdKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldEhpZ2hsaWdodENsYXNzKHZpZXdzWzFdLmRhdGVzW3Jvdyo3K2NvbF0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJtb250aHZpZXdEaXNwbGF5RXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3ZpZXc6IHZpZXdzWzFdLCByb3c6IHJvdywgY29sOiBjb2x9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgKm5nSWY9XCIxIT09Y3VycmVudFZpZXdJbmRleFwiIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtZml4ZWQgbW9udGh2aWV3LWRhdGV0YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGRheUhlYWRlciBvZiB2aWV3c1sxXS5kYXlIZWFkZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbD57e2RheUhlYWRlcn19PC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiBbMCwxLDIsMyw0LDVdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2wgb2YgWzAsMSwyLDMsNCw1LDZdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJtb250aHZpZXdJbmFjdGl2ZURpc3BsYXlFdmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dmlldzogdmlld3NbMV0sIHJvdzogcm93LCBjb2w6IGNvbH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICA8L2lvbi1zbGlkZT5cbiAgICAgICAgICAgICAgICA8aW9uLXNsaWRlPlxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgKm5nSWY9XCIyPT09Y3VycmVudFZpZXdJbmRleFwiIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtZml4ZWQgbW9udGh2aWV3LWRhdGV0YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgZGF5SGVhZGVyIG9mIHZpZXdzWzJdLmRheUhlYWRlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPnt7ZGF5SGVhZGVyfX08L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIFswLDEsMiwzLDQsNV1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbCBvZiBbMCwxLDIsMyw0LDUsNl1cIiB0YXBwYWJsZSAoY2xpY2spPVwic2VsZWN0KHZpZXdzWzJdLmRhdGVzW3Jvdyo3K2NvbF0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0SGlnaGxpZ2h0Q2xhc3Modmlld3NbMl0uZGF0ZXNbcm93KjcrY29sXSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm1vbnRodmlld0Rpc3BsYXlFdmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dmlldzogdmlld3NbMl0sIHJvdzogcm93LCBjb2w6IGNvbH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSAqbmdJZj1cIjIhPT1jdXJyZW50Vmlld0luZGV4XCIgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1maXhlZCBtb250aHZpZXctZGF0ZXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgZGF5SGVhZGVyIG9mIHZpZXdzWzJdLmRheUhlYWRlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPnt7ZGF5SGVhZGVyfX08L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIFswLDEsMiwzLDQsNV1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbCBvZiBbMCwxLDIsMyw0LDUsNl1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm1vbnRodmlld0luYWN0aXZlRGlzcGxheUV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInt2aWV3OiB2aWV3c1syXSwgcm93OiByb3csIGNvbDogY29sfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgIDwvaW9uLXNsaWRlPlxuICAgICAgICAgICAgPC9pb24tc2xpZGVzPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm1vbnRodmlld0V2ZW50RGV0YWlsVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7c2hvd0V2ZW50RGV0YWlsOnNob3dFdmVudERldGFpbCwgc2VsZWN0ZWREYXRlOiBzZWxlY3RlZERhdGUsIG5vRXZlbnRzTGFiZWw6IG5vRXZlbnRzTGFiZWx9XCI+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLnRleHQtbXV0ZWQge1xuICAgICAgICAgICAgY29sb3I6ICM5OTk7XG4gICAgICAgIH1cblxuICAgICAgICAudGFibGUtZml4ZWQge1xuICAgICAgICAgICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZSB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRoLCAudGFibGUgPiB0Ym9keSA+IHRyID4gdGgsIC50YWJsZSA+IHRmb290ID4gdHIgPiB0aCwgLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRkLFxuICAgICAgICAudGFibGUgPiB0Ym9keSA+IHRyID4gdGQsIC50YWJsZSA+IHRmb290ID4gdHIgPiB0ZCB7XG4gICAgICAgICAgICBwYWRkaW5nOiA4cHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMjBweDtcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICAgIH1cblxuICAgICAgICAudGFibGUgPiB0aGVhZCA+IHRyID4gdGgge1xuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZGRkO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRhYmxlID4gdGhlYWQ6Zmlyc3QtY2hpbGQgPiB0cjpmaXJzdC1jaGlsZCA+IHRoLCAudGFibGUgPiB0aGVhZDpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkID4gdGQge1xuICAgICAgICAgICAgYm9yZGVyLXRvcDogMFxuICAgICAgICB9XG5cbiAgICAgICAgLnRhYmxlID4gdGJvZHkgKyB0Ym9keSB7XG4gICAgICAgICAgICBib3JkZXItdG9wOiAycHggc29saWQgI2RkZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJsZS1ib3JkZXJlZCB7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRoLCAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGgsIC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHIgPiB0aCxcbiAgICAgICAgLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRkLCAudGFibGUtYm9yZGVyZWQgPiB0Ym9keSA+IHRyID4gdGQsIC50YWJsZS1ib3JkZXJlZCA+IHRmb290ID4gdHIgPiB0ZCB7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRhYmxlLWJvcmRlcmVkID4gdGhlYWQgPiB0ciA+IHRoLCAudGFibGUtYm9yZGVyZWQgPiB0aGVhZCA+IHRyID4gdGQge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMnB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnRhYmxlLXN0cmlwZWQgPiB0Ym9keSA+IHRyOm50aC1jaGlsZChvZGQpID4gdGQsIC50YWJsZS1zdHJpcGVkID4gdGJvZHkgPiB0cjpudGgtY2hpbGQob2RkKSA+IHRoIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmOWY5ZjlcbiAgICAgICAgfVxuXG4gICAgICAgIC5tb250aHZpZXctcHJpbWFyeS13aXRoLWV2ZW50IHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzYTg3YWQ7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIH1cblxuICAgICAgICAubW9udGh2aWV3LWN1cnJlbnQge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tb250aHZpZXctc2VsZWN0ZWQge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwOTkwMDtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tb250aHZpZXctZGF0ZXRhYmxlIHRkLm1vbnRodmlldy1kaXNhYmxlZCB7XG4gICAgICAgICAgICBjb2xvcjogbGlnaHRncmV5O1xuICAgICAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLm1vbnRodmlldy1kYXRldGFibGUgdGgge1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLm1vbnRodmlldy1kYXRldGFibGUgdGQge1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLm1vbnRodmlldy1zZWNvbmRhcnktd2l0aC1ldmVudCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDllZGY3O1xuICAgICAgICB9XG5cbiAgICAgICAgOjotd2Via2l0LXNjcm9sbGJhcixcbiAgICAgICAgKjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIE1vbnRoVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIElDYWxlbmRhckNvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbGVuZGFyU2VydmljZTogQ2FsZW5kYXJTZXJ2aWNlKSB7XG4gICAgfVxuICAgIDtcblxuICAgIEBWaWV3Q2hpbGQoJ21vbnRoU2xpZGVyJywge3N0YXRpYzogdHJ1ZX0pIHNsaWRlcjogSW9uU2xpZGVzO1xuXG4gICAgQElucHV0KCkgbW9udGh2aWV3RGlzcGxheUV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPElNb250aFZpZXdEaXNwbGF5RXZlbnRUZW1wbGF0ZUNvbnRleHQ+O1xuICAgIEBJbnB1dCgpIG1vbnRodmlld0luYWN0aXZlRGlzcGxheUV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPElNb250aFZpZXdEaXNwbGF5RXZlbnRUZW1wbGF0ZUNvbnRleHQ+O1xuICAgIEBJbnB1dCgpIG1vbnRodmlld0V2ZW50RGV0YWlsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPElNb250aFZpZXdEaXNwbGF5RXZlbnRUZW1wbGF0ZUNvbnRleHQ+O1xuXG4gICAgQElucHV0KCkgZm9ybWF0RGF5OiBzdHJpbmc7XG4gICAgQElucHV0KCkgZm9ybWF0RGF5SGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZm9ybWF0TW9udGhUaXRsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGV2ZW50U291cmNlOiBJRXZlbnRbXTtcbiAgICBASW5wdXQoKSBzdGFydGluZ0RheU1vbnRoOiBudW1iZXI7XG4gICAgQElucHV0KCkgc2hvd0V2ZW50RGV0YWlsOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIG5vRXZlbnRzTGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBhdXRvU2VsZWN0ID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBtYXJrRGlzYWJsZWQ6IChkYXRlOiBEYXRlKSA9PiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGRhdGVGb3JtYXR0ZXI6IElEYXRlRm9ybWF0dGVyO1xuICAgIEBJbnB1dCgpIGRpciA9ICcnO1xuICAgIEBJbnB1dCgpIGxvY2tTd2lwZVRvUHJldjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBsb2NrU3dpcGVzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNsaWRlck9wdGlvbnM6IGFueTtcblxuICAgIEBPdXRwdXQoKSBvblJhbmdlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SVJhbmdlPigpO1xuICAgIEBPdXRwdXQoKSBvbkV2ZW50U2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPElFdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgb25UaW1lU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPElUaW1lU2VsZWN0ZWQ+KHRydWUpO1xuICAgIEBPdXRwdXQoKSBvblRpdGxlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPih0cnVlKTtcblxuICAgIHB1YmxpYyB2aWV3czogSU1vbnRoVmlld1tdID0gW107XG4gICAgcHVibGljIGN1cnJlbnRWaWV3SW5kZXggPSAwO1xuICAgIHB1YmxpYyBzZWxlY3RlZERhdGU6IElNb250aFZpZXdSb3c7XG4gICAgcHVibGljIHJhbmdlOiBJUmFuZ2U7XG4gICAgcHVibGljIG1vZGU6IENhbGVuZGFyTW9kZSA9ICdtb250aCc7XG4gICAgcHVibGljIGRpcmVjdGlvbiA9IDA7XG5cbiAgICBwcml2YXRlIG1vdmVPblNlbGVjdGVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBpbml0ZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIGNhbGxiYWNrT25Jbml0ID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgY3VycmVudERhdGVDaGFuZ2VkRnJvbVBhcmVudFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgZXZlbnRTb3VyY2VDaGFuZ2VkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBzbGlkZUNoYW5nZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIHNsaWRlVXBkYXRlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHJpdmF0ZSBmb3JtYXREYXlMYWJlbDogKGRhdGU6IERhdGUpID0+IHN0cmluZztcbiAgICBwcml2YXRlIGZvcm1hdERheUhlYWRlckxhYmVsOiAoZGF0ZTogRGF0ZSkgPT4gc3RyaW5nO1xuICAgIHByaXZhdGUgZm9ybWF0VGl0bGU6IChkYXRlOiBEYXRlKSA9PiBzdHJpbmc7XG5cbiAgICBzdGF0aWMgZ2V0RGF0ZXMoc3RhcnREYXRlOiBEYXRlLCBuOiBudW1iZXIpOiBEYXRlW10ge1xuICAgICAgICBjb25zdCBkYXRlcyA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgICAgIGN1cnJlbnQgPSBuZXcgRGF0ZShzdGFydERhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgICAgICAgIGRhdGVzW2krK10gPSBuZXcgRGF0ZShjdXJyZW50LmdldFRpbWUoKSk7XG4gICAgICAgICAgICBjdXJyZW50LnNldERhdGUoY3VycmVudC5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZXM7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zbGlkZXJPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlck9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNsaWRlck9wdGlvbnMubG9vcCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZUZvcm1hdHRlciAmJiB0aGlzLmRhdGVGb3JtYXR0ZXIuZm9ybWF0TW9udGhWaWV3RGF5KSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdERheUxhYmVsID0gdGhpcy5kYXRlRm9ybWF0dGVyLmZvcm1hdE1vbnRoVmlld0RheTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRheUxhYmVsRGF0ZVBpcGUgPSBuZXcgRGF0ZVBpcGUoJ2VuLVVTJyk7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdERheUxhYmVsID0gZnVuY3Rpb24oZGF0ZTogRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXlMYWJlbERhdGVQaXBlLnRyYW5zZm9ybShkYXRlLCB0aGlzLmZvcm1hdERheSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZUZvcm1hdHRlciAmJiB0aGlzLmRhdGVGb3JtYXR0ZXIuZm9ybWF0TW9udGhWaWV3RGF5SGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdERheUhlYWRlckxhYmVsID0gdGhpcy5kYXRlRm9ybWF0dGVyLmZvcm1hdE1vbnRoVmlld0RheUhlYWRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQaXBlID0gbmV3IERhdGVQaXBlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0RGF5SGVhZGVyTGFiZWwgPSBmdW5jdGlvbihkYXRlOiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGVQaXBlLnRyYW5zZm9ybShkYXRlLCB0aGlzLmZvcm1hdERheUhlYWRlcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZUZvcm1hdHRlciAmJiB0aGlzLmRhdGVGb3JtYXR0ZXIuZm9ybWF0TW9udGhWaWV3VGl0bGUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0VGl0bGUgPSB0aGlzLmRhdGVGb3JtYXR0ZXIuZm9ybWF0TW9udGhWaWV3VGl0bGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGlwZSA9IG5ldyBEYXRlUGlwZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdFRpdGxlID0gZnVuY3Rpb24oZGF0ZTogRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgdGhpcy5mb3JtYXRNb250aFRpdGxlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sb2NrU3dpcGVUb1ByZXYpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmxvY2tTd2lwZVRvUHJldih0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxvY2tTd2lwZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmxvY2tTd2lwZXModHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmN1cnJlbnREYXRlQ2hhbmdlZEZyb21QYXJlbnRTdWJzY3JpcHRpb24gPSB0aGlzLmNhbGVuZGFyU2VydmljZS5jdXJyZW50RGF0ZUNoYW5nZWRGcm9tUGFyZW50JC5zdWJzY3JpYmUoY3VycmVudERhdGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmV2ZW50U291cmNlQ2hhbmdlZFN1YnNjcmlwdGlvbiA9IHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmV2ZW50U291cmNlQ2hhbmdlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25EYXRhTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2xpZGVDaGFuZ2VkU3Vic2NyaXB0aW9uID0gdGhpcy5jYWxlbmRhclNlcnZpY2Uuc2xpZGVDaGFuZ2VkJC5zdWJzY3JpYmUoZGlyZWN0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyLnNsaWRlUHJldigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNsaWRlVXBkYXRlZFN1YnNjcmlwdGlvbiA9IHRoaXMuY2FsZW5kYXJTZXJ2aWNlLnNsaWRlVXBkYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnVwZGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudERhdGVDaGFuZ2VkRnJvbVBhcmVudFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUNoYW5nZWRGcm9tUGFyZW50U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlQ2hhbmdlZEZyb21QYXJlbnRTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZXZlbnRTb3VyY2VDaGFuZ2VkU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50U291cmNlQ2hhbmdlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZUNoYW5nZWRTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2xpZGVDaGFuZ2VkU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlQ2hhbmdlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZUNoYW5nZWRTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2xpZGVVcGRhdGVkU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVXBkYXRlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZVVwZGF0ZWRTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBldmVudFNvdXJjZUNoYW5nZSA9IGNoYW5nZXMuZXZlbnRTb3VyY2U7XG4gICAgICAgIGlmIChldmVudFNvdXJjZUNoYW5nZSAmJiBldmVudFNvdXJjZUNoYW5nZS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMub25EYXRhTG9hZGVkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2NrU3dpcGVUb1ByZXYgPSBjaGFuZ2VzLmxvY2tTd2lwZVRvUHJldjtcbiAgICAgICAgaWYgKGxvY2tTd2lwZVRvUHJldikge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIubG9ja1N3aXBlVG9QcmV2KGxvY2tTd2lwZVRvUHJldi5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9ja1N3aXBlcyA9IGNoYW5nZXMubG9ja1N3aXBlcztcbiAgICAgICAgaWYgKGxvY2tTd2lwZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmxvY2tTd2lwZXMobG9ja1N3aXBlcy5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKTtcbiAgICAgICAgdGhpcy5vblRpdGxlQ2hhbmdlZC5lbWl0KHRpdGxlKTtcbiAgICB9XG5cbiAgICBvblNsaWRlQ2hhbmdlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tPbkluaXQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tPbkluaXQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSAwO1xuICAgICAgICBjb25zdCBjdXJyZW50Vmlld0luZGV4ID0gdGhpcy5jdXJyZW50Vmlld0luZGV4O1xuXG4gICAgICAgIHRoaXMuc2xpZGVyLmdldEFjdGl2ZUluZGV4KCkudGhlbigoY3VycmVudFNsaWRlSW5kZXgpID0+IHtcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZUluZGV4ID0gKGN1cnJlbnRTbGlkZUluZGV4ICsgMikgJSAzO1xuICAgICAgICAgICAgaWYoaXNOYU4oY3VycmVudFNsaWRlSW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFNsaWRlSW5kZXggPSBjdXJyZW50Vmlld0luZGV4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY3VycmVudFNsaWRlSW5kZXggLSBjdXJyZW50Vmlld0luZGV4ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFNsaWRlSW5kZXggPT09IDAgJiYgY3VycmVudFZpZXdJbmRleCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2xpZGVUbygxLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRWaWV3SW5kZXggLSBjdXJyZW50U2xpZGVJbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U2xpZGVJbmRleCA9PT0gMiAmJiBjdXJyZW50Vmlld0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gLTE7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2xpZGVUbygzLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3SW5kZXggPSBjdXJyZW50U2xpZGVJbmRleDtcbiAgICAgICAgICAgIHRoaXMubW92ZShkaXJlY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtb3ZlKGRpcmVjdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICBpZiAoIXRoaXMubW92ZU9uU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGFkamFjZW50RGF0ZSA9IHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmdldEFkamFjZW50Q2FsZW5kYXJEYXRlKHRoaXMubW9kZSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLnNldEN1cnJlbnREYXRlKGFkamFjZW50RGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IDA7XG4gICAgICAgIHRoaXMubW92ZU9uU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjcmVhdGVEYXRlT2JqZWN0KGRhdGU6IERhdGUpOiBJTW9udGhWaWV3Um93IHtcbiAgICAgICAgbGV0IGRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLm1hcmtEaXNhYmxlZCkge1xuICAgICAgICAgICAgZGlzYWJsZWQgPSB0aGlzLm1hcmtEaXNhYmxlZChkYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgZXZlbnRzOiBbXSxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLmZvcm1hdERheUxhYmVsKGRhdGUpLFxuICAgICAgICAgICAgc2Vjb25kYXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0Vmlld0RhdGEoc3RhcnRUaW1lOiBEYXRlKTogSU1vbnRoVmlldyB7XG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHN0YXJ0VGltZSxcbiAgICAgICAgICAgIGRhdGUgPSBzdGFydERhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgbW9udGggPSAoc3RhcnREYXRlLmdldE1vbnRoKCkgKyAoZGF0ZSAhPT0gMSA/IDEgOiAwKSkgJSAxMjtcblxuICAgICAgICBjb25zdCBkYXRlcyA9IE1vbnRoVmlld0NvbXBvbmVudC5nZXREYXRlcyhzdGFydERhdGUsIDQyKTtcbiAgICAgICAgY29uc3QgZGF5czogSU1vbnRoVmlld1Jvd1tdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGF0ZU9iamVjdCA9IHRoaXMuY3JlYXRlRGF0ZU9iamVjdChkYXRlc1tpXSk7XG4gICAgICAgICAgICBkYXRlT2JqZWN0LnNlY29uZGFyeSA9IGRhdGVzW2ldLmdldE1vbnRoKCkgIT09IG1vbnRoO1xuICAgICAgICAgICAgZGF5c1tpXSA9IGRhdGVPYmplY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXlIZWFkZXJzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgZGF5SGVhZGVycy5wdXNoKHRoaXMuZm9ybWF0RGF5SGVhZGVyTGFiZWwoZGF5c1tpXS5kYXRlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGVzOiBkYXlzLFxuICAgICAgICAgICAgZGF5SGVhZGVyc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldEhpZ2hsaWdodENsYXNzKGRhdGU6IElNb250aFZpZXdSb3cpOiBzdHJpbmcge1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gJyc7XG5cbiAgICAgICAgaWYgKGRhdGUuaGFzRXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChkYXRlLnNlY29uZGFyeSkge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdtb250aHZpZXctc2Vjb25kYXJ5LXdpdGgtZXZlbnQnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnbW9udGh2aWV3LXByaW1hcnktd2l0aC1ldmVudCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnICc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGFzc05hbWUgKz0gJ21vbnRodmlldy1zZWxlY3RlZCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZS5jdXJyZW50KSB7XG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9ICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnbW9udGh2aWV3LWN1cnJlbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGUuc2Vjb25kYXJ5KSB7XG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9ICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsYXNzTmFtZSArPSAndGV4dC1tdXRlZCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnICc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGFzc05hbWUgKz0gJ21vbnRodmlldy1kaXNhYmxlZCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgICB9XG5cbiAgICBnZXRSYW5nZShjdXJyZW50RGF0ZTogRGF0ZSk6IElSYW5nZSB7XG4gICAgICAgIGNvbnN0IHllYXIgPSBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgbW9udGggPSBjdXJyZW50RGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgZmlyc3REYXlPZk1vbnRoID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEsIDEyLCAwLCAwKSwgLy8gc2V0IGhvdXIgdG8gMTIgdG8gYXZvaWQgRFNUIHByb2JsZW1cblxuICAgICAgICAgICAgZGlmZmVyZW5jZSA9IHRoaXMuc3RhcnRpbmdEYXlNb250aCAtIGZpcnN0RGF5T2ZNb250aC5nZXREYXkoKSxcbiAgICAgICAgICAgIG51bURpc3BsYXllZEZyb21QcmV2aW91c01vbnRoID0gKGRpZmZlcmVuY2UgPiAwKSA/IDcgLSBkaWZmZXJlbmNlIDogLWRpZmZlcmVuY2UsXG4gICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZShmaXJzdERheU9mTW9udGguZ2V0VGltZSgpKTtcblxuICAgICAgICBpZiAobnVtRGlzcGxheWVkRnJvbVByZXZpb3VzTW9udGggPiAwKSB7XG4gICAgICAgICAgICBzdGFydERhdGUuc2V0RGF0ZSgtbnVtRGlzcGxheWVkRnJvbVByZXZpb3VzTW9udGggKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZShzdGFydERhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgZW5kRGF0ZS5zZXREYXRlKGVuZERhdGUuZ2V0RGF0ZSgpICsgNDIpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydFRpbWU6IHN0YXJ0RGF0ZSxcbiAgICAgICAgICAgIGVuZFRpbWU6IGVuZERhdGVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbkRhdGFMb2FkZWQoKSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5yYW5nZSxcbiAgICAgICAgICAgIGV2ZW50U291cmNlID0gdGhpcy5ldmVudFNvdXJjZSxcbiAgICAgICAgICAgIGxlbiA9IGV2ZW50U291cmNlID8gZXZlbnRTb3VyY2UubGVuZ3RoIDogMCxcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHJhbmdlLnN0YXJ0VGltZSxcbiAgICAgICAgICAgIGVuZFRpbWUgPSByYW5nZS5lbmRUaW1lLFxuICAgICAgICAgICAgdXRjU3RhcnRUaW1lID0gRGF0ZS5VVEMoc3RhcnRUaW1lLmdldEZ1bGxZZWFyKCksIHN0YXJ0VGltZS5nZXRNb250aCgpLCBzdGFydFRpbWUuZ2V0RGF0ZSgpKSxcbiAgICAgICAgICAgIHV0Y0VuZFRpbWUgPSBEYXRlLlVUQyhlbmRUaW1lLmdldEZ1bGxZZWFyKCksIGVuZFRpbWUuZ2V0TW9udGgoKSwgZW5kVGltZS5nZXREYXRlKCkpLFxuICAgICAgICAgICAgY3VycmVudFZpZXdJbmRleCA9IHRoaXMuY3VycmVudFZpZXdJbmRleCxcbiAgICAgICAgICAgIGRhdGVzID0gdGhpcy52aWV3c1tjdXJyZW50Vmlld0luZGV4XS5kYXRlcyxcbiAgICAgICAgICAgIG9uZURheSA9IDg2NDAwMDAwLFxuICAgICAgICAgICAgZXBzID0gMC4wMDA2O1xuXG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgNDI7IHIgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGRhdGVzW3JdLmhhc0V2ZW50KSB7XG4gICAgICAgICAgICAgICAgZGF0ZXNbcl0uaGFzRXZlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkYXRlc1tyXS5ldmVudHMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRTb3VyY2VbaV0sXG4gICAgICAgICAgICAgICAgZXZlbnRTdGFydFRpbWUgPSBldmVudC5zdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgZXZlbnRFbmRUaW1lID0gZXZlbnQuZW5kVGltZTtcblxuICAgICAgICAgICAgbGV0IGV2ZW50VVRDU3RhcnRUaW1lOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgZXZlbnRVVENFbmRUaW1lOiBudW1iZXI7XG4gICAgICAgICAgICBpZiAoZXZlbnQuYWxsRGF5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnRVVENTdGFydFRpbWUgPSBldmVudFN0YXJ0VGltZS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgZXZlbnRVVENFbmRUaW1lID0gZXZlbnRFbmRUaW1lLmdldFRpbWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXZlbnRVVENTdGFydFRpbWUgPSBEYXRlLlVUQyhldmVudFN0YXJ0VGltZS5nZXRGdWxsWWVhcigpLCBldmVudFN0YXJ0VGltZS5nZXRNb250aCgpLCBldmVudFN0YXJ0VGltZS5nZXREYXRlKCkpO1xuICAgICAgICAgICAgICAgIGV2ZW50VVRDRW5kVGltZSA9IERhdGUuVVRDKGV2ZW50RW5kVGltZS5nZXRGdWxsWWVhcigpLCBldmVudEVuZFRpbWUuZ2V0TW9udGgoKSwgZXZlbnRFbmRUaW1lLmdldERhdGUoKSArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXZlbnRVVENFbmRUaW1lIDw9IHV0Y1N0YXJ0VGltZSB8fCBldmVudFVUQ1N0YXJ0VGltZSA+PSB1dGNFbmRUaW1lKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB0aW1lRGlmZmVyZW5jZVN0YXJ0OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgdGltZURpZmZlcmVuY2VFbmQ6IG51bWJlcjtcblxuICAgICAgICAgICAgaWYgKGV2ZW50VVRDU3RhcnRUaW1lIDwgdXRjU3RhcnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGltZURpZmZlcmVuY2VTdGFydCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpbWVEaWZmZXJlbmNlU3RhcnQgPSAoZXZlbnRVVENTdGFydFRpbWUgLSB1dGNTdGFydFRpbWUpIC8gb25lRGF5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXZlbnRVVENFbmRUaW1lID4gdXRjRW5kVGltZSkge1xuICAgICAgICAgICAgICAgIHRpbWVEaWZmZXJlbmNlRW5kID0gKHV0Y0VuZFRpbWUgLSB1dGNTdGFydFRpbWUpIC8gb25lRGF5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aW1lRGlmZmVyZW5jZUVuZCA9IChldmVudFVUQ0VuZFRpbWUgLSB1dGNTdGFydFRpbWUpIC8gb25lRGF5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKHRpbWVEaWZmZXJlbmNlU3RhcnQpO1xuICAgICAgICAgICAgY29uc3QgZW5kSW5kZXggPSBNYXRoLmNlaWwodGltZURpZmZlcmVuY2VFbmQgLSBlcHMpO1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgZW5kSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBkYXRlc1tpbmRleF0uaGFzRXZlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBldmVudFNldCA9IGRhdGVzW2luZGV4XS5ldmVudHM7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50U2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50U2V0LnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50U2V0ID0gW107XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50U2V0LnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBkYXRlc1tpbmRleF0uZXZlbnRzID0gZXZlbnRTZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IDQyOyByICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChkYXRlc1tyXS5oYXNFdmVudCkge1xuICAgICAgICAgICAgICAgIGRhdGVzW3JdLmV2ZW50cy5zb3J0KHRoaXMuY29tcGFyZUV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF1dG9TZWxlY3QpIHtcbiAgICAgICAgICAgIGxldCBmaW5kU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgNDI7IHIgKz0gMSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlc1tyXS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGVzW3JdO1xuICAgICAgICAgICAgICAgICAgICBmaW5kU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmaW5kU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGltZVNlbGVjdGVkLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFRpbWU6IHRoaXMuc2VsZWN0ZWREYXRlLmRhdGUsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50czogdGhpcy5zZWxlY3RlZERhdGUuZXZlbnRzLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zZWxlY3RlZERhdGUuZGlzYWJsZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hWaWV3KCkge1xuICAgICAgICB0aGlzLnJhbmdlID0gdGhpcy5nZXRSYW5nZSh0aGlzLmNhbGVuZGFyU2VydmljZS5jdXJyZW50RGF0ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGVkKSB7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKTtcbiAgICAgICAgICAgIHRoaXMub25UaXRsZUNoYW5nZWQuZW1pdCh0aXRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UucG9wdWxhdGVBZGphY2VudFZpZXdzKHRoaXMpO1xuICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRWaWV3KHRoaXMucmFuZ2Uuc3RhcnRUaW1lLCB0aGlzLnZpZXdzW3RoaXMuY3VycmVudFZpZXdJbmRleF0pO1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5yYW5nZUNoYW5nZWQodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0VGl0bGUoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZpZXdTdGFydERhdGUgPSB0aGlzLnJhbmdlLnN0YXJ0VGltZSxcbiAgICAgICAgICAgIGRhdGUgPSBjdXJyZW50Vmlld1N0YXJ0RGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICBtb250aCA9IChjdXJyZW50Vmlld1N0YXJ0RGF0ZS5nZXRNb250aCgpICsgKGRhdGUgIT09IDEgPyAxIDogMCkpICUgMTIsXG4gICAgICAgICAgICB5ZWFyID0gY3VycmVudFZpZXdTdGFydERhdGUuZ2V0RnVsbFllYXIoKSArIChkYXRlICE9PSAxICYmIG1vbnRoID09PSAwID8gMSA6IDApLFxuICAgICAgICAgICAgaGVhZGVyRGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxLCAxMiwgMCwgMCwgMCk7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFRpdGxlKGhlYWRlckRhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29tcGFyZUV2ZW50KGV2ZW50MTogSUV2ZW50LCBldmVudDI6IElFdmVudCk6IG51bWJlciB7XG4gICAgICAgIGlmIChldmVudDEuYWxsRGF5KSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudDIuYWxsRGF5KSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKGV2ZW50MS5zdGFydFRpbWUuZ2V0VGltZSgpIC0gZXZlbnQyLnN0YXJ0VGltZS5nZXRUaW1lKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0KHZpZXdEYXRlOiBJTW9udGhWaWV3Um93KSB7XG4gICAgICAgIGlmICghdGhpcy52aWV3cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWREYXRlID0gdmlld0RhdGUuZGF0ZSxcbiAgICAgICAgICAgIGV2ZW50cyA9IHZpZXdEYXRlLmV2ZW50cztcblxuICAgICAgICBpZiAoIXZpZXdEYXRlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlcyA9IHRoaXMudmlld3NbdGhpcy5jdXJyZW50Vmlld0luZGV4XS5kYXRlcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2FsZW5kYXJEYXRlID0gdGhpcy5jYWxlbmRhclNlcnZpY2UuY3VycmVudERhdGUsXG4gICAgICAgICAgICAgICAgY3VycmVudE1vbnRoID0gY3VycmVudENhbGVuZGFyRGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRZZWFyID0gY3VycmVudENhbGVuZGFyRGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTW9udGggPSBzZWxlY3RlZERhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFllYXIgPSBzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSAwO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudFllYXIgPT09IHNlbGVjdGVkWWVhcikge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50TW9udGggIT09IHNlbGVjdGVkTW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gY3VycmVudE1vbnRoIDwgc2VsZWN0ZWRNb250aCA/IDEgOiAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IGN1cnJlbnRZZWFyIDwgc2VsZWN0ZWRZZWFyID8gMSA6IC0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5zZXRDdXJyZW50RGF0ZShzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWaWV3U3RhcnREYXRlID0gdGhpcy5yYW5nZS5zdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIG9uZURheSA9IDg2NDAwMDAwLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERheURpZmZlcmVuY2UgPSBNYXRoLnJvdW5kKChEYXRlLlVUQyhzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKSwgc2VsZWN0ZWREYXRlLmdldE1vbnRoKCksIHNlbGVjdGVkRGF0ZS5nZXREYXRlKCkpIC0gRGF0ZS5VVEMoY3VycmVudFZpZXdTdGFydERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudFZpZXdTdGFydERhdGUuZ2V0TW9udGgoKSwgY3VycmVudFZpZXdTdGFydERhdGUuZ2V0RGF0ZSgpKSkgLyBvbmVEYXkpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCA0MjsgciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVzW3JdLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkRGF5RGlmZmVyZW5jZSA+PSAwICYmIHNlbGVjdGVkRGF5RGlmZmVyZW5jZSA8IDQyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVzW3NlbGVjdGVkRGF5RGlmZmVyZW5jZV0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGVzW3NlbGVjdGVkRGF5RGlmZmVyZW5jZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVPblNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlVmlldyhkaXJlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblRpbWVTZWxlY3RlZC5lbWl0KHtzZWxlY3RlZFRpbWU6IHNlbGVjdGVkRGF0ZSwgZXZlbnRzLCBkaXNhYmxlZDogdmlld0RhdGUuZGlzYWJsZWR9KTtcbiAgICB9XG5cbiAgICBzbGlkZVZpZXcoZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2xpZGVQcmV2KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVDdXJyZW50VmlldyhjdXJyZW50Vmlld1N0YXJ0RGF0ZTogRGF0ZSwgdmlldzogSU1vbnRoVmlldykge1xuICAgICAgICBjb25zdCBjdXJyZW50Q2FsZW5kYXJEYXRlID0gdGhpcy5jYWxlbmRhclNlcnZpY2UuY3VycmVudERhdGUsXG4gICAgICAgICAgICB0b2RheSA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBvbmVEYXkgPSA4NjQwMDAwMCxcbiAgICAgICAgICAgIHNlbGVjdGVkRGF5RGlmZmVyZW5jZSA9IE1hdGgucm91bmQoKERhdGUuVVRDKGN1cnJlbnRDYWxlbmRhckRhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudENhbGVuZGFyRGF0ZS5nZXRNb250aCgpLCBjdXJyZW50Q2FsZW5kYXJEYXRlLmdldERhdGUoKSkgLSBEYXRlLlVUQyhjdXJyZW50Vmlld1N0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50Vmlld1N0YXJ0RGF0ZS5nZXRNb250aCgpLCBjdXJyZW50Vmlld1N0YXJ0RGF0ZS5nZXREYXRlKCkpKSAvIG9uZURheSksXG4gICAgICAgICAgICBjdXJyZW50RGF5RGlmZmVyZW5jZSA9IE1hdGgucm91bmQoKERhdGUuVVRDKHRvZGF5LmdldEZ1bGxZZWFyKCksIHRvZGF5LmdldE1vbnRoKCksIHRvZGF5LmdldERhdGUoKSkgLSBEYXRlLlVUQyhjdXJyZW50Vmlld1N0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50Vmlld1N0YXJ0RGF0ZS5nZXRNb250aCgpLCBjdXJyZW50Vmlld1N0YXJ0RGF0ZS5nZXREYXRlKCkpKSAvIG9uZURheSk7XG5cbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCA0MjsgciArPSAxKSB7XG4gICAgICAgICAgICB2aWV3LmRhdGVzW3JdLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWREYXlEaWZmZXJlbmNlID49IDAgJiYgc2VsZWN0ZWREYXlEaWZmZXJlbmNlIDwgNDIgJiYgIXZpZXcuZGF0ZXNbc2VsZWN0ZWREYXlEaWZmZXJlbmNlXS5kaXNhYmxlZCAmJiAodGhpcy5hdXRvU2VsZWN0IHx8IHRoaXMubW92ZU9uU2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICB2aWV3LmRhdGVzW3NlbGVjdGVkRGF5RGlmZmVyZW5jZV0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB2aWV3LmRhdGVzW3NlbGVjdGVkRGF5RGlmZmVyZW5jZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBkYXRlOiBudWxsLFxuICAgICAgICAgICAgICAgIGV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgbGFiZWw6IG51bGwsXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiBudWxsLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50RGF5RGlmZmVyZW5jZSA+PSAwICYmIGN1cnJlbnREYXlEaWZmZXJlbmNlIDwgNDIpIHtcbiAgICAgICAgICAgIHZpZXcuZGF0ZXNbY3VycmVudERheURpZmZlcmVuY2VdLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRTZWxlY3RlZChldmVudDogSUV2ZW50KSB7XG4gICAgICAgIHRoaXMub25FdmVudFNlbGVjdGVkLmVtaXQoZXZlbnQpO1xuICAgIH1cbn1cbiJdfQ==