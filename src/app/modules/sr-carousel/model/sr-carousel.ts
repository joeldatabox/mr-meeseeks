import { ThemePalette } from "@angular/material/core";

export type Orientation = "ltr" | "rtl";

export interface SrCarousel {
  // Animations.
  timings: string;
  autoplay: boolean;
  interval: number;
  // Navigation.
  loop: boolean;
  hideArrows: boolean;
  hideIndicators: boolean;
  // Appearance.
  color: ThemePalette;
  maxWidth: string;
  proportion: number;
  slides: number;
  // Accessibility.
  useKeyboard: boolean;
  useMouseWheel: boolean;
  orientation: Orientation;
}
