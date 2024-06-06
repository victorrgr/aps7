import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WaqiService } from '../services/waqi.service';
import { AqiResponse } from './model/aqi-response.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  id: number = 0;
  loading: boolean = false;
  data: AqiResponse;
  index: any = {};
  indexTable = [
    {
      range: [0, 50],
      level: 'Good',
      color: '009966',
      textColor: 'white',
      implications:
        'Air quality is considered satisfactory, and air pollution poses little or no risk',
    },
    {
      range: [51, 100],
      level: 'Moderate',
      color: 'ffde33',
      textColor: 'black',
      implications:
        'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
    },
    {
      range: [101, 150],
      level: 'Unhealthy for Sensitive Groups',
      color: 'ff9933',
      textColor: 'black',
      implications:
        'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
    },
    {
      range: [151, 200],
      level: 'Unhealthy',
      color: 'cc0033',
      textColor: 'white',
      implications:
        'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
    },
    {
      range: [201, 300],
      level: 'Very Unhealthy',
      color: '660099',
      textColor: 'white',
      implications:
        'Health warnings of emergency conditions. The entire population is more likely to be affected.',
    },
    {
      range: [300],
      level: 'Hazardous',
      color: '7e0023',
      textColor: 'white',
      implications:
        'Health alert: everyone may experience more serious health effects.',
    },
  ];

  constructor(
    private waqiService: WaqiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id') || 0);
      console.log(this.id);
      this.waqiService.getById(this.id).subscribe({
        next: (res) => {
          this.data = res.data;
          this.index = this.findIndex(this.data);
          console.log(this.data);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
    });
  }

  aqiStyle(index: any) {
    if (index) {
      return {
        'background-color': `#${index.color}`,
        color: index.textColor,
      };
    }
    return null;
  }

  findIndex(data: AqiResponse): any {
    let index = this.indexTable.find((i) => {
      let start = i.range[0];
      let end = i.range[1];
      if (end) {
        return data.aqi >= start && data.aqi <= end;
      }
      return data.aqi >= start;
    });
    return (
      index || {
        range: [-1, -1],
        level: 'No Data',
        color: '262626',
        implications: 'No data was found about the region.',
      }
    );
  }
}
