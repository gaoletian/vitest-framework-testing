export interface IRouteConfig {
  path: string;
  component: any;
  isDynamic?: boolean;
  domain?: string;
  beforeEach?: () => void;
  beforeEnter?: () => void;
}

export type RouteInfo = {
  path: string;
  Component: any;
  routeParams?: any;
  isDynamic?: boolean;
  domain?: string;
  beforeEach?: () => void;
  beforeEnter?: () => void;
};

/**
 * Router控制器
 */
export class RouterController {
  static instance: RouterController;

  static getInstance(routes: Array<IRouteConfig> = []) {
    if (!RouterController.instance) {
      RouterController.instance = new RouterController(routes);
    }
    return RouterController.instance;
  }

  private routeMap: Record<string, RouteInfo>;

  private dynamicRouteMap: Record<string, RouteInfo>;

  private dynamicRouterPaths: Array<string>;

  private hasDynamicRoute: boolean = false;

  constructor(routes: Array<IRouteConfig>) {
    this.routeMap = {};
    this.dynamicRouteMap = {};
    this.dynamicRouterPaths = [];
    //路由装载
    routes.forEach((route) => this.addRoute(route));
  }

  getDynamicRoute = (path) => {
    const paths = path.split('/');
    const routeParams = [];
    let fitPath = '';
    paths.shift();
    //把动态部分抽取
    paths.forEach((part, index) => {
      if (part[0] === ':') {
        let paramsName = part.slice(1);
        let isMust = true;
        if (part[part.length - 1] === '?') {
          paramsName = paramsName.slice(0, paramsName.length - 1);
          isMust = false;
        }
        routeParams.push({ index: index + 1, isMust, paramsName });
      } else {
        fitPath = fitPath + '/' + part;
      }
    });
    fitPath = fitPath + '/';

    return { fitPath, routeParams };
  };

  /**
   * 获得path对应的component
   * @param routePath
   */
  getComponent = (routePath) => {
    const componet = this.routeMap[routePath];

    if (componet) {
      return componet;
    }

    if (this.hasDynamicRoute) {
      //如果有动态路由，进行动态路由验证
      const fitPath = this.dynamicRouterPaths.find((path) => routePath.indexOf(path) > -1);
      if (fitPath) {
        return this.dynamicRouteMap[fitPath];
      }
    }

    return { Component: null, path: routePath, domain: 'default' } as RouteInfo;
  };

  getRoute = (routePath) => {
    const routeInfo = this.routeMap[routePath];

    if (routeInfo) {
      return routeInfo;
    }

    if (this.hasDynamicRoute) {
      //如果有动态路由，进行动态路由验证
      const fitPath = this.dynamicRouterPaths.find((path) => routePath.indexOf(path) > -1);
      if (fitPath) {
        return this.dynamicRouteMap[fitPath];
      }
    }

    return {} as RouteInfo;
  };

  /**
   * 动态的添加一个路由
   */
  addRoute(route: IRouteConfig) {
    const { path, isDynamic, component, domain = 'default', beforeEach, beforeEnter } = route;
    if (isDynamic) {
      const { fitPath, routeParams } = this.getDynamicRoute(path);
      this.dynamicRouteMap[fitPath] = {
        path,
        routeParams,
        Component: component,
        domain,
        beforeEach,
        beforeEnter,
      };
      this.dynamicRouterPaths.push(fitPath);
      this.hasDynamicRoute = true;
    } else {
      this.routeMap[path] = { path, Component: component, domain, beforeEach, beforeEnter };
    }
  }

  /**
   * 动态删除一个路由
   */
  removeRoute(routePath: string) {
    if (this.routeMap[routePath]) {
      delete this.routeMap[routePath];
    } else {
      //不存在route
    }
  }

  /**
   * 路由就绪状态标识
   */
  private allRouteReady = false;

  /**
   * 设置当前路由就绪状态
   * @param isReady
   */
  setAllReady(isReady = true) {
    this.allRouteReady = isReady;
  }
  /**
   * 返回当前路由就绪状态
   */
  isReady() {
    return this.allRouteReady;
  }
}

/**
 * 路由合并的方法，会做重名判断
 * @param routeArrays
 * @returns {Array}
 */
export function mergeRoutes(...routeArrays: Array<Array<IRouteConfig>>): Array<IRouteConfig> {
  console.info('---------', routeArrays);
  const newRoutes = [];
  const routeMap = {};

  routeArrays.forEach((routes) => {
    routes.forEach((route) => {
      //判断route是否重名了
      if (routeMap[route.path]) {
        throw Error(`${route.path}已存在，Route.Path不能重复!!`);
      } else {
        newRoutes.push(route);
        routeMap[route.path] = true;
      }
    });
  });

  return newRoutes;
}

describe('RouterController', () => {
  describe('getComponent', () => {
    it('should return the component for a registered route', () => {
      const routes = [{ path: '/home', component: 'Home' }];
      const instance = RouterController.getInstance(routes);
      expect(instance.getComponent('/home')).toMatchInlineSnapshot(`
        {
          "Component": "Home",
          "beforeEach": undefined,
          "beforeEnter": undefined,
          "domain": "default",
          "path": "/home",
        }
      `);
    });
  });
});
