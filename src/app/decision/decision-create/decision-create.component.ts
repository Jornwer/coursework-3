import { Component } from '@angular/core';
import {DecisionService} from '../../shared/service/decision.service';
import {defaultUser} from '../../shared/model/user';
import {Decision, Value} from '../../shared/model/decision';
import {FormControl, FormGroup} from '@angular/forms';
import {isNumeric} from 'rxjs/internal-compatibility';
import {Router} from '@angular/router';

@Component({
  selector: 'app-decision-create',
  templateUrl: './decision-create.component.html',
  styleUrls: ['./decision-create.component.scss']
})
export class DecisionCreateComponent {

  decision: Decision = {
    id: 0,
    user: defaultUser,
    name: '',
    minProfit: 0,
    values: new Array<Value>()
  };
  form: FormGroup;
  show = false;
  sell = new Array<string>();
  buy = new Array<string>();
  div = new Array<string>();
  isError = false;
  name = '';
  minProfit = '';
  submitError = false;
  addError = false;

  constructor(private decisionService: DecisionService, private router: Router) {
    this.form = new FormGroup({
      months: new FormControl('', []),
      decisions: new FormControl('', [])
    });
  }

  submit(): void {
    if (!this.checkSubmit()) {
      this.submitError = true;
      return;
    }
    this.submitError = false;
    const len: number = Number(this.form.get('months')?.value);
    const dec: number = Number(this.form.get('decisions')?.value);
    this.decision.values = new Array<Value>();
    for (let i = 0; i < Number(this.form.get('decisions')?.value); i++) {
      this.decision.values.push({
        sell: new Array<number>(len),
        buy: new Array<number>(len),
        div: new Array<number>(len),
        name: ''
      });
    }
    this.buy = new Array<string>(len * dec);
    this.sell = new Array<string>(len * dec);
    this.div = new Array<string>(len * dec);
    this.show = true;
  }

  checkSubmit(): boolean {
    return isNumeric(this.form.get('months')?.value)
      && isNumeric(this.form.get('decisions')?.value)
      && Number.isInteger(Number(this.form.get('months')?.value))
      && Number.isInteger(Number(this.form.get('decisions')?.value))
      && Number(this.form.get('months')?.value) > 1
      && Number(this.form.get('decisions')?.value) > 1
      && Number(this.form.get('months')?.value) < 21
      && Number(this.form.get('decisions')?.value) < 21;
  }

  makeDecision(): void {
    if (!this.checkInput()) {
      this.isError = true;
      return;
    }
    this.isError = false;
    this.mapDecision();
    this.decisionService.add(this.decision).subscribe(() => {
      this.addError = false;
      this.router.navigateByUrl('');
    }, () => this.addError = true);
  }

  private checkInput(): boolean {
    for (let i = 0; i < this.sell.length; i++) {
      if (!isNumeric(this.sell[i]) || !isNumeric(this.buy[i]) || !isNumeric(this.div[i])) {
        return false;
      }
    }
    for (const v of this.decision.values) {
      if (v.name === '') {
        return false;
      }
    }
    return isNumeric(this.minProfit) && this.name !== '';
  }

  private mapDecision(): void {
    const count = this.decision.values.length;
    for (let i = 0; i < this.sell.length; i++) {
      const idx1 = i % count;
      const idx2 = Math.floor(i / count);
      this.decision.values[idx1].sell[idx2] = Number(this.sell[i]);
      this.decision.values[idx1].buy[idx2] = Number(this.buy[i]);
      this.decision.values[idx1].div[idx2] = Number(this.div[i]);
    }
    this.decision.name = this.name;
    this.decision.minProfit = Number(this.minProfit);
  }

  trackByFn(index: any, _: any): void {
    return index;
  }
}
