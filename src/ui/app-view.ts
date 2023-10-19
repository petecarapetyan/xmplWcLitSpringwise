import { customElement, property } from 'lit-element'
import { Connected, State, Route, RouteSelectors, dispatch } from './connected'
import { sharedStyles } from './shared-styles'

import './view-404'
import './view-about'
import './admin-user-permissions'
import './view-account'
import './view-home'
import './view-signin'
//REPLACEMENTS
import './view-truck-C'
import './view-truck-U'
import './view-truck-RD'
import './view-airplane-C'
import './view-airplane-U'
import './view-airplane-RD'
import './view-dog-C'
import './view-dog-U'
import './view-dog-RD'

declare global {
  interface HTMLElementTagNameMap {
    'app-view': AppViewElement
  }
}

@customElement('app-view')
export class AppViewElement extends Connected {
  @property({ type: Object,
    hasChanged(newVal: Route, oldVal: Route) {
      console.log(dispatch) //remove manually as soon as a replacement happens below - for ts lint
      if (newVal !== oldVal) {
        switch (newVal.name) {
          //REPLACEMENT2
          case "truckRD":
            dispatch.retrieve.truck()
            break;

          
          case "airplaneRD":
            dispatch.retrieve.airplane()
            break;

          
          case "dogRD":
            dispatch.retrieve.dog()
            break;

          
          default: break
        }
        return true;
      }
      else {
        return false;
      }
    }
   })
  route: Route

  mapState(state: State) {
    return {
      route: RouteSelectors.route(state),
    }
  }

  render() {
    return this.route.view
  }

  static get styles() {
    return [
      sharedStyles,
    ]
  }
}

