import { Component } from '@angular/core';
import {DecisionService} from '../../shared/service/decision.service';
import {defaultUser} from '../../shared/model/user';
import {Decision, Value} from '../../shared/model/decision';
import {FormControl, FormGroup} from '@angular/forms';

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

  constructor(private decisionService: DecisionService) {
    this.form = new FormGroup({
      months: new FormControl('', []),
      decisions: new FormControl('', []),
      minProfit: new FormControl('', [])
    });
  }

  submit(): void {
    this.decision.values = new Array<Value>(Number(this.form.get('decisions')?.value));
    const len: number = Number(this.form.get('months')?.value);
    for (let value of this.decision.values) {
      value = {
        sell: new Array<number>(len),
        buy: new Array<number>(len),
        div: new Array<number>(len),
        name: ''
      };
    }
    this.show = true;
  }
}
