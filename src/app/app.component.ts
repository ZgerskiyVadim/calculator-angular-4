import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: any = 0;

  regExp(e) {
    if (this.form !== undefined && e.keyCode !== 13) {
      this.checkDublicate(e);
      this.validData(e);
    }
  }

  validData(e) {
    const validData = /[0-9()+\-*/.]/.test(e.key);
    if (!validData) {
      this.form = this.form.replace(e.key, '');
    }
  }

  checkDublicate(e) {
    const dublicateOperators = this.form.match(/\+{2,}|\-{2,}|\*{2,}|\/{2,}/g);
    const operatorsLength = this.form.match(/[+\-*/]/g) ? this.form.match(/[+\-*/]/g).length : 1;
    if (dublicateOperators !== null ||  operatorsLength >= 2) {
      this.form = this.form.replace(e.key, '');
    }
  }

  checkZero() {
    if (this.form == 0 || this.form == 'Infinity' || this.form == 'NaN') {
      this.form = '';
    }
  }

  buttonsClick(operator) {
    this.checkZero();
    const lastElement = this.form[this.form.length - 1];
    if (lastElement !== operator) {
      this.form = this.form + operator;
      if (this.form == operator) {
        this.form = '';
      }
    }
  }

  calculate(value) {
    this.form = eval(value);
  }

  preventNumbers(e) {
    this.regExp(e);
    if (e.keyCode === 187 && e.key === '=') {
      this.calculate(this.form);
    }
  }
}
