import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { Validators, Editor, Toolbar } from "ngx-editor";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxEditorModule } from "ngx-editor";

@Component({
  selector: "app-text-editor",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
  ],
  templateUrl: "./text-editor.component.html",
  styleUrls: ["./text-editor.component.less"],
  encapsulation: ViewEncapsulation.None,
})
export class TextEditorComponent implements OnInit, OnDestroy {
  editor: Editor;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"],
  ];

  form = new FormGroup({
    editorContent: new FormControl(
      { value: "", disabled: false },
      Validators.required()
    ),
  });

  get doc(): AbstractControl {
    return this.form.get("editorContent");
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
