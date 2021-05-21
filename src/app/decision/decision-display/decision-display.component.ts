import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {defaultDecision} from '../../shared/model/decision';
import {DecisionService} from '../../shared/service/decision.service';

@Component({
  selector: 'app-decision-display',
  templateUrl: './decision-display.component.html',
  styleUrls: ['./decision-display.component.scss', '../../shared/style/loader.scss']
})
export class DecisionDisplayComponent {

  decision = defaultDecision;

  constructor(private activatedRoute: ActivatedRoute, private decisionService: DecisionService) {
    activatedRoute.params
      .subscribe(p => decisionService.findById(p.id)
        .subscribe(d => {
          this.decision = d;
        }));
  }
}
