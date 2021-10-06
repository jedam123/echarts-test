import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface DataRow {
  date: string;
  info: Info;
}

export interface Info {
  sent: string;
  bounce: string;
  open24: string;
  replies: string;
  interest: string;
  negative: string;
  neutral: string;
  dt: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-lib';
  public showPositiveResp = true;

  private chartInstance: any;
  private fakeData: Observable<DataRow[]>;
  private datesArray: string[] = [];
  private bounceArray: any[] = [];
  private interestArray: any[] = [];
  private negativeArray: any[] = [];
  private neutralArray: any[] = [];
  private open24Array: any[] = [];
  private repliesArray: any[] = [];
  private sentArray: any[] = [];
  chartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: [
        'positive responses',
        'negative responses',
        'maybe later responses',
      ],
      icon: 'pin',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: this.datesArray,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      // {
      //   name: 'bounced',
      //   type: 'line',
      //   stack: 'counts',
      //   data: this.bounceArray,
      // },
      {
        name: 'positive responses',
        type: 'line',
        smooth: true,
        stack: 'counts',
        data: this.interestArray,
      },

      {
        name: 'negative responses',
        type: 'line',
        smooth: true,
        stack: 'counts',
        data: this.negativeArray,
      },
      {
        name: 'maybe later responses',
        type: 'line',
        smooth: true,
        stack: 'counts',
        data: this.neutralArray,
      },
      // {
      //   name: 'responses',
      //   type: 'line',
      //   stack: 'counts',

      //   data: this.repliesArray,
      // },

      // {
      //   name: 'Open',
      //   type: 'line',
      //   stack: 'counts',
      //   data: this.open24Array,
      // },

      // {
      //   name: 'Sent',
      //   type: 'line',
      //   stack: 'counts',
      //   data: this.sentArray,
      // },
    ],
  };

  constructor(private http: HttpClient) {
    this.fakeData = this.http.get<DataRow[]>(environment.fakeData);
  }

  ngOnInit() {
    this.fakeData.subscribe((ec) => {
      ec.forEach((aa) => {
        this.datesArray.push(aa.date);
        this.bounceArray.push(Number(aa.info.bounce));
        this.interestArray.push(Number(aa.info.interest));
        this.negativeArray.push(Number(aa.info.negative));
        this.neutralArray.push(Number(aa.info.neutral));
        this.open24Array.push(Number(aa.info.open24));
        this.repliesArray.push(Number(aa.info.replies));
        this.sentArray.push(Number(aa.info.sent));
      });
    });
  }

  onChartInit(e: any) {
    this.chartInstance = e;
  }

  public click(): void {
    const action = this.showPositiveResp ? 'legendUnSelect' : 'legendSelect';
    this.showPositiveResp = !this.showPositiveResp;
    this.chartInstance.dispatchAction({
      type: action,
      name: 'positive responses',
    });
  }
}
