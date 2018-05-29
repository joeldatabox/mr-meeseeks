import {ComponentFactoryResolver, Inject, Injectable, ViewContainerRef} from "@angular/core";

@Injectable()
export class SrViewInjectorService {
  constructor(@Inject(ComponentFactoryResolver) private factoryResolver: ComponentFactoryResolver) {
  }

  /**
   * Adds any component to the container
   * @param viewContainer -> instance of the ViewContainerRef
   * @param component -> class of its component to be injected
   */
  addFormIn(viewContainer: ViewContainerRef, component: any) {
    const factory = this.factoryResolver.resolveComponentFactory(component);
    const componentCreated = factory.create(viewContainer.parentInjector);
    viewContainer.insert(componentCreated.hostView);
  }

  /**
   * Remove any component from a container
   * @param viewContainer -> instance of the ViewContainerRef
   * @param component -> class of its component a will be removed
   */
  removeFormIn(viewContainer: ViewContainerRef, component: any) {
    viewContainer.remove(viewContainer.indexOf(component));
  }
}
