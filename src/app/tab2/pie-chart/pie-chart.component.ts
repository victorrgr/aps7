import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { AqiIAQI } from '../model/aqi-response.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  @Output() chartReady = new EventEmitter<void>();
  @Input('iAqi') iAqi: AqiIAQI;
  @Input('id') id: string;

  @ViewChild('pieCanvas') private pieCanvas: ElementRef;
  pieChart: any;

  constructor() {}

  ngAfterViewInit() {
    this.createPieChart();
  }

  extractLabelsFromIAqi(): string[] {
    let labels: string[] = [];

    labels.push(
      'Dew',
      'Relative Humidity',
      'Nitrogen Dioxide',
      'Ozone',
      'Atmospheric Pressure',
      'PM10',
      'temperature',
      'Wind'
    );

    return labels;
  }

  extractValuesFromIAqi(): number[] {
    let values: number[] = [];

    values.push(
      this.iAqi.dew?.v || 0,
      this.iAqi.h?.v || 0,
      this.iAqi.no2?.v || 0,
      this.iAqi.o3?.v || 0,
      this.iAqi.p?.v || 0,
      this.iAqi.pm10?.v || 0,
      this.iAqi.t?.v || 0,
      this.iAqi.w?.v || 0
    );

    return values;
  }

  getColorForCategory(category: string): string {
    const colorMap: { [key: string]: string } = {
      Dew: '#66c2a5',
      'Relative Humidity': '#fc8d62',
      'Nitrogen Dioxide': '#8da0cb',
      Ozone: '#e78ac3',
      'Atmospheric Pressure': '#a6d854',
      PM10: '#ffd92f',
      temperature: '#e5c494',
      Wind: '#b3b3b3',
    };

    return colorMap[category] || '#000000';
  }

  getBorderColorForCategory(category: string): string {
    const colorMap: { [key: string]: string } = {
      Dew: '#4dab6a',
      'Relative Humidity': '#e08214',
      'Nitrogen Dioxide': '#6b6ecf',
      Ozone: '#a50026',
      'Atmospheric Pressure': '#4daf4a',
      PM10: '#fdbf6f',
      temperature: '#c994c7',
      Wind: '#737373',
    };

    return colorMap[category] || '#000000';
  }

  createPieChart() {
    const labels = this.extractLabelsFromIAqi();
    const values = this.extractValuesFromIAqi();

    const backgroundColors = labels.map((lab) => this.getColorForCategory(lab));
    const borderColors = labels.map((lab) =>
      this.getBorderColorForCategory(lab)
    );

    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {},
      },
    });
  }
}
