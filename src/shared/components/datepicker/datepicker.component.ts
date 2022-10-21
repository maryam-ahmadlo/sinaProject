import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { DOCUMENT } from "@angular/common";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from "@angular/core";
import * as moment from "jalali-moment";

const ANIMATION_TIMINGS = "400ms cubic-bezier(0.25, 0.8, 0.25, 1)";
export const SlideInOutAnimation = [
  trigger("slideInOut", [
    state(
      "in",
      style({
        "max-height": "500px",
        opacity: "1",
        visibility: "visible",
      })
    ),
    state(
      "out",
      style({
        "max-height": "0px",
        opacity: "0",
        visibility: "hidden",
      })
    ),
    transition("in => out", [
      group([
        animate(
          "400ms ease-in-out",
          style({
            opacity: "0",
          })
        ),
        animate(
          "600ms ease-in-out",
          style({
            "max-height": "0px",
          })
        ),
        animate(
          "700ms ease-in-out",
          style({
            visibility: "hidden",
          })
        ),
      ]),
    ]),
    transition("out => in", [
      group([
        animate(
          "1ms ease-in-out",
          style({
            visibility: "visible",
          })
        ),
        animate(
          "600ms ease-in-out",
          style({
            "max-height": "500px",
          })
        ),
        animate(
          "800ms ease-in-out",
          style({
            opacity: "1",
          })
        ),
      ]),
    ]),
  ]),
];
import { slideMotion } from "ng-zorro-antd/core/animation";

@Component({
  selector: "app-datepicker",
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.less"],
  animations: [slideMotion],
})
export class DatepickerComponent implements OnInit {
  @Input() locale: string;
  @Input() canChangeNavMonthLogic: any;
  @Input() isAvailableLogic: any;

  @Output() emitSelectedDate = new EventEmitter<any>();

  private _value: any;

  navDate: any;
  weekDaysHeaderArr: Array<string> = [];
  gridArr: Array<any> = [];
  selectedDate: any;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    moment.locale(this.locale);
    if (this.value) {
      this.navDate = moment(this.value);
    } else {
      this.navDate = moment();
    }
    this.makeHeader();
    this.makeGrid();
  }

  get dir(): string {
    return this.document.dir;
  }

  set value(v) {
    this._value = v ? v : null;
  }

  get value() {
    return this._value;
  }

  changeNavMonth(num: number) {
    if (this.canChangeNavMonth(num)) {
      this.navDate.add(num, "month");
      this.makeGrid();
    }
  }

  canChangeNavMonth(num: number) {
    if (this.canChangeNavMonthLogic) {
      const clonedDate = moment(this.navDate);
      return this.canChangeNavMonthLogic(num, clonedDate);
    } else {
      return true;
    }
  }

  makeHeader() {
    const weekDaysArr: Array<number> = [0, 1, 2, 3, 4, 5, 6];
    weekDaysArr.forEach((day) =>
      this.weekDaysHeaderArr.push(moment().weekday(day).format("ddd"))
    );
  }

  makeGrid() {
    this.gridArr = [];

    const firstDayDate = moment(this.navDate).startOf("month");
    const initialEmptyCells = firstDayDate.weekday();
    const lastDayDate = moment(this.navDate).endOf("month");
    const lastEmptyCells = 6 - lastDayDate.weekday();
    const daysInMonth = this.navDate.daysInMonth();
    const arrayLength = initialEmptyCells + lastEmptyCells + daysInMonth;

    for (let i = 0; i < arrayLength; i++) {
      let obj: any = {};
      if (i < initialEmptyCells || i > initialEmptyCells + daysInMonth - 1) {
        obj.value = 0;
        obj.available = false;
      } else {
        obj.value = i - initialEmptyCells + 1;
        obj.available = this.isAvailable(i - initialEmptyCells + 1);
      }
      obj.isSelected = this.isSelected(i - initialEmptyCells + 1);
      obj.isToday = this.isToday(i - initialEmptyCells + 1);
      this.gridArr.push(obj);
    }
  }

  isAvailable(num: number): boolean {
    if (this.isAvailableLogic) {
      let dateToCheck = this.dateFromNum(num, this.navDate);
      return this.isAvailableLogic(dateToCheck);
    } else {
      return true;
    }
  }

  isSelected(num: number): boolean {
    if (!this.value) {
      return false;
    }
    return (
      moment(this.value).format("YYYY-MM-DD") ===
      this.dateFromNum(num, this.navDate).format("YYYY-MM-DD")
    );
  }

  isToday(num: number): boolean {
    return this.dateFromNum(num, this.navDate).isSame(new Date(), "day");
  }

  dateFromNum(num: number, referenceDate: any): moment.Moment {
    let returnDate = moment(referenceDate);
    return returnDate.date(num);
  }

  selectDay(day: any) {
    if (day.available) {
      this.selectedDate = this.dateFromNum(day.value, this.navDate);
      this.emitSelectedDate.emit(this.selectedDate);
    }
  }
}
