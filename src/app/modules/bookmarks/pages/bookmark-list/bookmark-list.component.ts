import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateBookmarkShownModalComponent } from "../../components/create-bookmark-shown-modal/create-bookmark-shown-modal.component";
import { BookmarkService } from "../../services/bookmark.service";
import { IBookmark } from "src/shared/common/src/lib/interfaces";
import { CreateBookamrkDeleteModalComponent } from "../../components/create-bookamrk-delete-modal/create-bookamrk-delete-modal.component";
import { finalize } from "rxjs";
import { NzMessageModule, NzMessageService } from "ng-zorro-antd/message";
import { CreateBookmarkRenameModalComponent } from "../../components/create-bookmark-rename-modal/create-bookmark-rename-modal.component";
import { ThisReceiver } from "@angular/compiler";

@Component({
  selector: "app-bookmark-list",
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzModalModule,
    NzMessageModule,
  ],
  templateUrl: "./bookmark-list.component.html",
  styleUrls: ["./bookmark-list.component.less"],
})
export class BookmarkListComponent implements OnInit {
  data: IBookmark[] = [];

  isLoading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private bookmarkService: BookmarkService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bookmarkList }) =>
      bookmarkList["bookmark"] ? this.data.push(bookmarkList["bookmark"]) : []
    );

    this.data.forEach((v) => {
      Number(v.id);
    });
  }

  listOfSelection = [
    {
      text: "Select All Row",
      onSelect: () => {
        this.onAllChecked(true);
      },
    },
    {
      text: "Select Odd Row",
      onSelect: () => {
        this.listOfCurrentPageData.forEach(
          (data: { id: number }, index: number) =>
            this.updateCheckedSet(data.id, index % 2 !== 0)
        );
        this.refreshCheckedStatus();
      },
    },
    {
      text: "Select Even Row",
      onSelect: () => {
        this.listOfCurrentPageData.forEach(
          (data: { id: number }, index: number) =>
            this.updateCheckedSet(data.id, index % 2 === 0)
        );
        this.refreshCheckedStatus();
      },
    },
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any = [];
  // listOfData: any = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item: { id: number }) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item: { id: number }) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item: { id: number }) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }

  createShowBookMarkModal(item: IBookmark) {
    this.modalService.create({
      nzTitle: "مشاهده bookmark",
      nzContent: CreateBookmarkShownModalComponent,
      nzComponentParams: {
        item,
      },
      nzFooter: [
        {
          label: "بستن",
          type: "default",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
      ],
    });
  }

  createDeleteBookmarkModal(item: IBookmark) {
    this.modalService.create({
      nzTitle: "حذف bookmark",
      nzContent: CreateBookamrkDeleteModalComponent,
      nzComponentParams: {},
      nzFooter: [
        {
          label: "انصراف",
          type: "default",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
        {
          label: "تایید",
          type: "primary",
          onClick: (componentInstance) =>
            this.handleDeleteBookmark(componentInstance, item.id),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }

  handleDeleteBookmark(componentInstance: any, id: number) {
    componentInstance.isLoading = true;

    this.bookmarkService
      .deleteOne(id)
      .pipe(finalize(() => (componentInstance.isLoading = false)))
      .subscribe(() => handleRes());

    const handleRes = () => {
      this.message.success("عملیات با موفقیت انجام شد");
      componentInstance.destroyModal();
      this.refresh();
    };
  }

  refresh() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        refresh: new Date().getTime(),
      },
    });
  }

  createRenameBookmarkModal(item: IBookmark) {
    console.log(item);

    this.modalService.create({
      nzTitle: "تغییر نام bookmark",
      nzContent: CreateBookmarkRenameModalComponent,
      nzComponentParams: {
        item,
      },
      nzFooter: [
        {
          label: "انصراف",
          type: "default",
          onClick: (componentInstance) => componentInstance.destroyModal(),
        },
        {
          label: "تایید",
          type: "primary",
          onClick: (componentInstance) =>
            this.handleRenameBookmark(componentInstance, item.id),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }

  handleRenameBookmark(componentInstance: any, id: number) {
    this.bookmarkService
      .renameBookmark(componentInstance.form.get("name").value, id)
      .pipe(finalize(() => (componentInstance.isLoading = false)))
      .subscribe(() => handleRes());

    const handleRes = () => {
      this.message.success("عملیات با موفقیت انجام شد");
      componentInstance.destroyModal();
      this.refresh();
    };
  }
}
