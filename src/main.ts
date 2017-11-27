import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { SrMeeseeksModule } from "./app/sr-meeseeks.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(SrMeeseeksModule)
  .catch(err => console.log(err));
