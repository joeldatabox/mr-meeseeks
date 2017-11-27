import {Injectable} from "@angular/core";
import {Meta} from "@angular/platform-browser";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable()
export class SrMetaService {

  constructor(private meta: Meta) {
  }

  setDefaultColorApp(color: string) {
    //Chrome, Firefox OS, Opera and Vivaldi
    this.meta.addTag({name: "theme-color", content: color});
    //Windows Phone
    this.meta.addTag({name: "msapplication-navbutton-color", content: color});
    //enable full-screen mode
    this.meta.addTag({name: "apple-mobile-web-app-capable", content: "yes"});
    this.meta.addTag({name: "apple-mobile-web-app-status-bar-style", content: "black"});
  }
}
