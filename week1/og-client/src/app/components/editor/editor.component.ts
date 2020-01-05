import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';

declare var ace: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;
  language = 'Java';
  languages: string[] = ['Java', 'C', 'Python'];
  sessionId: string;
  output: string;
  defaultContent = {
    Java: '//this is Java editor',
    C: '//this is C++ editor',
    Python: 'this is Python editor'
  };
  constructor(@Inject('collaboration') private collaborationService,
             @Inject('data') private dataService,
             private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe( params => {
        this.sessionId = params.id;
        this.initEditor();
      });
  }

  initEditor(): void {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    this.editor.$block5crolling = Infinity;
    document.getElementsByTagName('textarea')[0].focus();

    this.collaborationService.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    this.editor.on('change', (event) => {
      console.log('editor change:' + JSON.stringify(event));
      if (this.editor.lastAppliedChange != event) {
        this.collaborationService.change(JSON.stringify(event));
      }
    });
  }

  setLanguage(newLanguage: string): void {
    this.language = newLanguage;
    this.resetEditor();
  }

  resetEditor(): void {
    this.editor.session.setMode('ace/mode/' + this.language.toLowerCase());
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = '';
  }

  submit(): void {
    const userCode = this.editor.getValue();
    console.log(userCode);
    const data = {
      user_code: userCode,
      lang: this.language.toLowerCase()
    };
    this.dataService.buildAndRun(data)
      .then((res) => {this.output = res.text; });

  }

}
