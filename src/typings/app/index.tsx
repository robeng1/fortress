import { PageTemplate } from "typings/theme/types";
import { WebApp } from "./dto";

export interface ShopApp extends Omit<WebApp, "template"> {
  template: PageTemplate
}