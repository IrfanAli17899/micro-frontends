import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

export const bootstrap = () => {
  return bootstrapApplication(AppComponent, appConfig)
}
