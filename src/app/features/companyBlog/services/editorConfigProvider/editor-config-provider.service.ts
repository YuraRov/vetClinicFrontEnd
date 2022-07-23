import { Injectable } from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor";

@Injectable({
  providedIn: 'any'
})
export class EditorConfigProviderService {

  constructor() { }

  public readonly config: AngularEditorConfig = {
    rawPaste: false,
    outline: false,
    editable: true,
    spellcheck: true,
    minHeight: '15rem',
    maxHeight: '30rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'roboto',
    fonts: [],
    customClasses: [
      {
        name: 'Title',
        class: 'mat-title',
        tag: 'h2'
      }
    ],
    uploadUrl: 'https://localhost:5001/api/articles/upload',
    toolbarHiddenButtons: [
      [
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertOrderedList',
        'heading',
        'fontName',
        'link',
        'unlink'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        //'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ]
    ]
  };
}
