import { Component, OnInit } from '@angular/core';
import { WaqiService } from '../services/waqi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  id: number = 0;

  constructor(
    private waqiService: WaqiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id') || 0);
      console.log(this.id);
      this.waqiService.getById(this.id).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }
}
