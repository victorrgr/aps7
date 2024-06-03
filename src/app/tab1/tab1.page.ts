import { Component, OnInit } from '@angular/core';
import { WaqiService } from '../services/waqi.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  loading = false;
  form: FormGroup;
  filteredOptions: any[] = [];

  constructor(
    private waqiService: WaqiService,
    // TODO: Possibly use this to go to the page in which there's more details of the
    //  region
    private navCtrl: NavController
  ) {
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
    this.navCtrl.navigateForward(`/tabs/tab2/${option.uid}`);
  }

  private _filter(value: string) {
    this.loading = true;
    this.waqiService.search(value).subscribe({
      next: (res) => {
        this.filteredOptions = res.data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
