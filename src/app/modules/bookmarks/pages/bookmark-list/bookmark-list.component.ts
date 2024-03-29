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
import { NzCardModule } from "ng-zorro-antd/card";

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
    NzCardModule
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
  ) {
    this.activatedRoute.data.subscribe(({ bookmark }) => {
      this.data=[];
      if (bookmark['bookmark'] && bookmark['bookmark'].length > 1) {
        this.data = bookmark['bookmark'];
      } else if (bookmark['bookmark'].length===1) {
        this.data.push(bookmark['bookmark']);
      }else{
        this.data=[];
      }
    });

    
  }

  ngOnInit(): void {}

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

  createRenameBookmarkModal(item: IBookmark) {
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
    componentInstance.isLoading = true;
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

  refresh() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        refresh: new Date().getTime(),
      },
    });
  }
}
