import { Component } from '@angular/core';
import { StateService } from './shared/state/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tts-ui-client';

  constructor(private stateService: StateService) {}
  public ngOnInit() {}
}
