import {ListKeyManagerOption} from "@angular/cdk/a11y";
import {Component, Input, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {SrCarouselSlide} from "../../model/sr-carousel-slide";

@Component({
  selector: "sr-carousel-slide",
  templateUrl: "./sr-carousel-slide.component.html",
  styleUrls: ["./sr-carousel-slide.component.scss"]
})
export class SrCarouselSlideComponent implements ListKeyManagerOption, SrCarouselSlide, OnInit {
  @Input() public image: string;
  @Input() public overlayColor = "#00000040";
  @Input() public hideOverlay = false;
  @Input() public disabled = false; // implements ListKeyManagerOption

  @ViewChild(TemplateRef) public templateRef: TemplateRef<any>;

  public ngOnInit(): void {
    if (this.image) {
      this.image = `url("${this.image}")`;
    }
  }
}
