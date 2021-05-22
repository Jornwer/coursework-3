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
  eff = new Array<number>();
  disp = new Array<number>();
  bestDecision = -1;
  chartType = 'bar';
  chartDatasets: Array<any> = [
    {data: [], label: 'Дисперсия %'}
  ];
  chartLabels: Array<any> = [];
  public chartOptions: any = {
    responsive: true
  };
  public chartColors: Array<any> = [
    {
      backgroundColor: [],
      borderColor: [],
      borderWidth: 2,
    }
  ];
  displayTable = false;

  constructor(private activatedRoute: ActivatedRoute, private decisionService: DecisionService) {
    activatedRoute.params
      .subscribe(p => decisionService.findById(p.id)
        .subscribe(d => {
          this.decision = d;
          this.calculateEff();
        }));
  }


  public chartClicked(_: any): void { }
  public chartHovered(_: any): void { }

  private calculateEff(): void {
    const len = this.decision.values.length;
    const monthLen = this.decision.values[0].sell.length;
    for (let i = 0; i < len; i++) {
      let effSum = 0;
      let dis = 0;
      for (let j = 0; j < monthLen; j++) {
        effSum += (this.decision.values[i].sell[j] + this.decision.values[i].div[j]) / this.decision.values[i].buy[j];
      }
      const avEff = effSum / monthLen;
      for (let j = 0; j < monthLen; j++) {
        dis += Math.pow(((this.decision.values[i].sell[j] + this.decision.values[i].div[j])
          / this.decision.values[i].buy[j] - avEff), 2) / (monthLen - 1);
      }
      this.eff.push(avEff);
      this.disp.push(dis);
    }
    const arr = new Array<number>();
    for (let i = 0; i < len; i++) {
      this.chartDatasets[0].data.push(this.disp[i]);
      this.chartLabels.push(this.decision.values[i].name);
      this.chartColors[0].backgroundColor.push('rgba(153, 102, 255, 0.2)');
      this.chartColors[0].borderColor.push('rgba(153, 102, 255, 1)');
      if (this.eff[i] >= this.decision.minProfit) {
        arr.push(this.disp[i]);
      } else {
        arr.push(-1);
      }
    }
    let minIdx = -1;
    for (let i = 0; i < len; i++) {
      if (arr[i] !== -1) {
        if (minIdx === -1 || arr[minIdx] >= arr[i]) {
          minIdx = i;
        }
      }
    }
    this.bestDecision = minIdx;
  }
}
