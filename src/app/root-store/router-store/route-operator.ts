import { Action } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { RouteChange } from './router-addon.store';
import { OperatorFunction } from "rxjs";


export function ofRoute(route: string | string[]): OperatorFunction<Action, Action> {
	return filter((action: Action) => {
		const isRouteAction = action.type === '[Router] Route Change';
		if (isRouteAction) {
			const routeAction = action as RouteChange;
			const routePath = routeAction.payload.path;
			if (Array.isArray(route)) {
				return route.includes(routePath);
			} else {
				return routePath === route;
			}
		}
		return isRouteAction;
	});
}