import { Route } from '@angular/router';

export interface WizardProgressItem {
  title: string;
  route: string;
}

/** Base functionality for container that is used to display bread crumbs */
export class Container {

  /** Route items for the stepper */
  progressSteps: WizardProgressItem[];

  /**
   * Converts a lower case string of a route in a user readable title.  e.g.
   * "personal-info" -> "Personal Info"
   */
  convertRouteToTitle(routePath: string): string {
    return routePath.split('-').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
  }

  protected setProgressSteps( pageRoutes: Route[] ): void {
        // Interface for wizard progress items
        this.progressSteps = pageRoutes.map(page => {
          if (page.path !== '') {
            return {
              title: this.convertRouteToTitle(page.path),
              route: page.path
            };
          }
        }).filter(x => x);
  }
}
