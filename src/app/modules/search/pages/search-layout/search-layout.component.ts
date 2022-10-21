import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FlexModule } from "@angular/flex-layout";
import { NzTimePickerModule } from "ng-zorro-antd/time-picker";
import { NzInputModule } from "ng-zorro-antd/input";
import * as moment from "jalali-moment";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { CommonModule } from "@angular/common";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzListModule } from "ng-zorro-antd/list";
import { DatepickerModule } from "../../../../../shared/components/datepicker";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { SearchResultComponent } from "../../components";
@Component({
  selector: "app-search-layout",
  standalone: true,
  templateUrl: "./search-layout.component.html",
  styleUrls: ["./search-layout.component.css"],
  imports: [
    CommonModule,
    FlexModule,
    NzTimePickerModule,
    NzInputModule,
    NzFormModule,
    NzIconModule,
    NzButtonModule,
    FormsModule,
    NzSelectModule,
    NzListModule,
    ReactiveFormsModule,
    RouterModule,
    SearchResultComponent,
    DatepickerModule,
  ],
})
export class SearchLayoutComponent implements OnInit {
  showAdvancedOption: boolean = false;
  showResult: boolean = false;
  searchItem = {};

  simpleSearchForm: UntypedFormGroup = new UntypedFormGroup({
    search: new UntypedFormControl(null, [Validators.required]),
  });

  advancedSearchForm: UntypedFormGroup = new UntypedFormGroup({
    expression: new UntypedFormControl(null),
    searchExpression: new UntypedFormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    documentType: new UntypedFormControl(null),
    startDate: new UntypedFormControl(null),
    endDate: new UntypedFormControl(null),
    branchName: new UntypedFormControl(null),
    status: new UntypedFormControl(null),
    subject: new UntypedFormControl(null),
    title: new UntypedFormControl(null),
    keywords: new UntypedFormControl(null),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  advancedSerach() {
    this.simpleSearchForm.reset();
    this.showResult = false;
    this.router.navigate(['/','customer','dashboard']);
    this.showAdvancedOption = !this.showAdvancedOption;
  }

  onSimpleSubmit() {
    this.searchItem = {
      ...this.simpleSearchForm.value,
    };

    this.showResult = this.simpleSearchForm.valid;
  }
  onAdvancedSubmit() {
    this.searchItem = {
      ...this.advancedSearchForm.value,
    };

    this.showResult = this.advancedSearchForm.valid;
  }
}
