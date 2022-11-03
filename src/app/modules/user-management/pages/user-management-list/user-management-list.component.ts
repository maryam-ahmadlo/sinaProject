import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzButtonModule } from "ng-zorro-antd/button";
import {
  CreateAddRoleUserModalComponent,
  CreateDeleteUserModalComponent,
} from "../../components";
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
      this.listOfUsers=[];
      if(user.length>1){
      this.listOfUsers = user;
      }else if(user){
        this.listOfUsers.push(user);
      }else{
        this.listOfUsers=[];
      }
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
    componentInstance.isLoading = true;

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
    componentInstance.isLoading = true;
    let data: IUser = { ...item, ...componentInstance.form.value };
    this.userManagementService
      .renameUser(data)
      .pipe(finalize(() => (componentInstance.isLoading = false)))
      .subscribe(() => handleRes());

    const handleRes = () => {
      this.nzMessage.success("عملیات با موفقیت انجام شد");
      componentInstance.destroyModal();
      this.refresh();
    };
  }

  createDeleteUserModal(item: IUser) {
    this.modalService.create({
      nzTitle: "حذف کاربر",
      nzContent: CreateDeleteUserModalComponent,
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
            this.handleDeleteUser(componentInstance, item.id),
          loading: (componentInstance) => componentInstance.isLoading,
        },
      ],
    });
  }

  handleDeleteUser(componentInstance, id: string) { 
    componentInstance.isLoading = true;
    this.userManagementService
      .deleteUser(id)
      .pipe(finalize(() => (componentInstance.isLoading = false)))
      .subscribe(() => handleRes());

    const handleRes = () => {
      this.nzMessage.success("عملیات با موفقیت انجام شد");
      componentInstance.destroyModal();
      this.refresh();
    };
  }

  refresh() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { refresh: new Date().getTime() },
    });
  }
}
