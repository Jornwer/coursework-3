import { Component } from '@angular/core';
import {DecisionService} from '../../shared/service/decision.service';
import {Decision} from '../../shared/model/decision';

@Component({
  selector: 'app-decisions',
  templateUrl: './decisions.component.html',
  styleUrls: ['./decisions.component.scss', '../../shared/style/loader.scss']
})
export class DecisionsComponent {

  decisions = new Array<Decision>();
  loaded = false;

  constructor(private decisionService: DecisionService) {
    decisionService.findAll().subscribe(data => {
      this.decisions = data;
      this.loaded = true;
    });
  }

  delete(id: number): void {
    this.decisionService.delete(id).subscribe(() => {
       this.decisions = this.decisions.filter(d => d.id !== id);
    });
  }
}
