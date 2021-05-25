import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DecisionService} from '../../shared/service/decision.service';
import {defaultDecision} from '../../shared/model/decision';
import {isNumeric} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-decision-edit',
  templateUrl: './decision-edit.component.html',
  styleUrls: ['./decision-edit.component.scss']
})
export class DecisionEditComponent {

  decision = defaultDecision;
  displayTable = false;
  isError = false;
  addError = false;

  constructor(activatedRoute: ActivatedRoute, private decisionService: DecisionService, private router: Router) {
    activatedRoute.params.subscribe(
      p => decisionService.findById(p.id).subscribe(data => this.decision = data)
    );
  }

  editDecision(): void {
    if (!this.checkTable()) {
      this.isError = true;
      return;
    }
    this.isError = false;
    this.decisionService.update(this.decision).subscribe(() => {
      this.addError = false;
      this.router.navigateByUrl('');
    }, () => this.addError = true);
  }

  private checkTable(): boolean {
    for (const value of this.decision.values) {
      if (value.name === '') {
        return false;
      }
      for (const i in value.buy) {
        if (!isNumeric(value.buy[i]) && !isNumeric(value.div[i]) && !isNumeric(value.sell[i])) {
          return false;
        }
      }
    }
    return true;
  }
}
