import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzButtonModule } from "ng-zorro-antd/button";
import { CreateAddRoleUserModalComponent } from "../../components";
import { ActivatedRoute, Router } from "@angular/router";
import { IUser } from "src/shared/common/src/lib/interfaces";
import { CreateUpdateUserModalComponent } from "../../components/create-update-user-modal/create-update-user-modal.component";
import { UserManagementService } from "../../services/user-management.service";
import { finalize } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-create-user-management-modal",
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzModalModule,
  ],
  templateUrl: "./user-management-list.component.html",
  styleUrls: ["./user-management-list.component.less"],
})
export class UserManagementListComponent implements OnInit {
  isLoading: boolean;

  listOfCurrentPageData: any = [];
  listOfUsers: IUser[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private userManagementService: UserManagementService,
    private nzMessage: NzMessageService
  ) {
    this.activatedRoute.data.subscribe(({ user }) => {
      this.listOfUsers = user;
    });
  }

  ngOnInit(): void {}

  createAddRoleModal() {
    this.modalService.create({
      nzTitle: "افزودن نقش به کاربر",
      nzContent: CreateAddRoleUserModalComponent,
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
            this.handleUserRole(componentInstance),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }
  handleUserRole(componentInstance: any) {
    this.userManagementService
      .assignRole(
        componentInstance.form.get("users").value,
        componentInstance.form.get("roles").value
      )
      .pipe(finalize(() => (componentInstance.isLoading = false)))
      .subscribe(() => handleRes());

    const handleRes = () => {
      this.nzMessage.success("عملیات با موفقیت انجام شد");
      componentInstance.destroyModal();
      this.refresh();
    };
  }

  createUpdateUserModal(item: IUser) {
    this.modalService.create({
      nzTitle: " ویرایش اطلاعات کاربر",
      nzContent: CreateUpdateUserModalComponent,
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
            this.handleUpdateUser(componentInstance, item),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }
  handleUpdateUser(componentInstance: any, item: IUser) {
  
    // this.userManagementService
    //   .renameUser({ ...item, ...componentInstance.form.value })
    //   .pipe(finalize(() => (componentInstance.isLoading = false)))
    //   .subscribe(() => handleRes());

    // const handleRes = () => {
    //   this.nzMessage.success("عملیات با موفقیت انجام شد");
    //   componentInstance.destroyModal();
    //   this.refresh();
    // };
  }
  refresh() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { refresh: new Date().getTime() },
    });
  }
}
