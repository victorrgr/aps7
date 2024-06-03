import { Component, OnInit } from '@angular/core';
import { WaqiService } from '../services/waqi.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  form: FormGroup;
  filteredOptions: any[] = [];

  constructor(private waqiService: WaqiService) {
    this.form = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit() {
    this.form
      .get('search')
      ?.valueChanges.pipe(debounceTime(400))
      .subscribe((value) => {
        this._filter(value);
      });
  }

  selectOption(option: any) {
    console.log(option)
  }

  private _filter(value: string) {
    this.waqiService.search(value).subscribe({
      next: (res) => {
        this.filteredOptions = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
