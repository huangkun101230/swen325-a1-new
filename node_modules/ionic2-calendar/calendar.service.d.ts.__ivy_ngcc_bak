import { Observable } from 'rxjs';
import { ICalendarComponent, CalendarMode, QueryMode } from './calendar';
export declare class CalendarService {
    queryMode: QueryMode;
    currentDateChangedFromParent$: Observable<Date>;
    currentDateChangedFromChildren$: Observable<Date>;
    eventSourceChanged$: Observable<void>;
    slideChanged$: Observable<number>;
    slideUpdated$: Observable<void>;
    private _currentDate;
    private currentDateChangedFromParent;
    private currentDateChangedFromChildren;
    private eventSourceChanged;
    private slideChanged;
    private slideUpdated;
    constructor();
    setCurrentDate(val: Date, fromParent?: boolean): void;
    get currentDate(): Date;
    rangeChanged(component: ICalendarComponent): void;
    private getStep;
    getAdjacentCalendarDate(mode: CalendarMode, direction: number): Date;
    getAdjacentViewStartTime(component: ICalendarComponent, direction: number): Date;
    populateAdjacentViews(component: ICalendarComponent): void;
    loadEvents(): void;
    slide(direction: number): void;
    update(): void;
}
