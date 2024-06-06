import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { AqiForecastValue } from '../model/aqi-response.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  @Output() chartReady = new EventEmitter<void>();
  @Input('aqiForecastValue') aqiForecastValue: AqiForecastValue[];
  @Input('id') id: string;

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;

  constructor() {}

  ngAfterViewInit() {
    this.createBarChart();
  }

  extractLabelsFromForecast(): string[] {
    let labels: string[] = [];

    this.aqiForecastValue.forEach((obj: AqiForecastValue) => {
      labels.push(obj.day);
    });

    return labels;
  }

  extractAvgValuesFromForecast(): number[] {
    let avgs: number[] = [];

    this.aqiForecastValue.forEach((obj: AqiForecastValue) => {
      avgs.push(obj.avg);
    });

    return avgs;
  }

  getColorForValue(value: number): string {
    let color: string;

    if (value >= 0 && value <= 50) {
      const percent = value / 50;
      color = `rgba(
            ${Math.round(0 + (255 - 0) * percent)},
            ${Math.round(153 + (222 - 153) * percent)},
            ${Math.round(102 + (51 - 102) * percent)},
            1
        )`;
    } else if (value >= 51 && value <= 100) {
      const percent = (value - 51) / 50;
      color = `rgba(
            ${Math.round(255 + (255 - 255) * percent)},
            ${Math.round(222 + (153 - 222) * percent)},
            ${Math.round(51 + (51 - 51) * percent)},
            1
        )`;
    } else if (value >= 101 && value <= 150) {
      const percent = (value - 101) / 50;
      color = `rgba(
            ${Math.round(255 + (204 - 255) * percent)},
            ${Math.round(153 + (153 - 153) * percent)},
            ${Math.round(51 + (0 - 51) * percent)},
            1
        )`;
    } else if (value >= 151 && value <= 200) {
      const percent = (value - 151) / 50;
      color = `rgba(
            ${Math.round(204 + (204 - 204) * percent)},
            ${Math.round(102 + (0 - 102) * percent)},
            ${Math.round(51 + (51 - 51) * percent)},
            1
        )`;
    } else if (value >= 201 && value <= 300) {
      const percent = (value - 201) / 100;
      color = `rgba(
            ${Math.round(102 + (102 - 102) * percent)},
            ${Math.round(0 + (102 - 0) * percent)},
            ${Math.round(153 + (46 - 153) * percent)},
            1
        )`;
    } else {
      const percent = (value - 301) / 100;
      color = `rgba(
            ${Math.round(126 + (255 - 126) * percent)},
            ${Math.round(0 + (0 - 0) * percent)},
            ${Math.round(35 + (35 - 35) * percent)},
            1
        )`;
    }

    return color;
  }

  getBorderColorForValue(value: number): string {
    let color: string;

    if (value >= 0 && value <= 50) {
      const percent = value / 50;
      color = `rgba(
            ${Math.round(0 + (255 - 0) * percent)},
            ${Math.round(153 + (222 - 153) * percent)},
            ${Math.round(102 + (51 - 102) * percent)},
            1
        )`;
    } else if (value >= 51 && value <= 100) {
      const percent = (value - 51) / 50;
      color = `rgba(
            ${Math.round(255 + (255 - 255) * percent)},
            ${Math.round(222 + (153 - 222) * percent)},
            ${Math.round(51 + (51 - 51) * percent)},
            1
        )`;
    } else if (value >= 101 && value <= 150) {
      const percent = (value - 101) / 50;
      color = `rgba(
            ${Math.round(255 + (204 - 255) * percent)},
            ${Math.round(153 + (153 - 153) * percent)},
            ${Math.round(51 + (0 - 51) * percent)},
            1
        )`;
    } else if (value >= 151 && value <= 200) {
      const percent = (value - 151) / 50;
      color = `rgba(
            ${Math.round(204 + (204 - 204) * percent)},
            ${Math.round(102 + (0 - 102) * percent)},
            ${Math.round(51 + (51 - 51) * percent)},
            1
        )`;
    } else if (value >= 201 && value <= 300) {
      const percent = (value - 201) / 100;
      color = `rgba(
            ${Math.round(102 + (102 - 102) * percent)},
            ${Math.round(0 + (102 - 0) * percent)},
            ${Math.round(153 + (46 - 153) * percent)},
            1
        )`;
    } else {
      const percent = (value - 301) / 100;
      color = `rgba(
            ${Math.round(126 + (255 - 126) * percent)},
            ${Math.round(0 + (0 - 0) * percent)},
            ${Math.round(35 + (35 - 35) * percent)},
            1
        )`;
    }

    const darkenAmount = 0.15;
    const [r, g, b] = color
      .substring(5, color.length - 1)
      .split(',')
      .map((c) => parseInt(c.trim()));

    color = `rgba(${Math.max(0, r - darkenAmount * 255)}, ${Math.max(
      0,
      g - darkenAmount * 255
    )}, ${Math.max(0, b - darkenAmount * 255)}, 1)`;

    return color;
  }

  createBarChart() {
    const labels = this.extractLabelsFromForecast();
    const values = this.extractAvgValuesFromForecast();

    const backgroundColors = this.aqiForecastValue.map((value) =>
      this.getColorForValue(value.avg)
    );
    const borderColors = this.aqiForecastValue.map((value) =>
      this.getBorderColorForValue(value.avg)
    );

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Avg.',
            data: values,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {},
        plugins: {
          title: {
            display: true,
            text: `Average per day: ${this.id}`,
            font: {
              size: 16,
            },
          },
        },
      },
    });
  }
}
