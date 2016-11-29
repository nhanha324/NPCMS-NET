namespace NPCMS_Net {

    angular.module('NPCMS_Net', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: NPCMS_Net.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('pages', {
                url: '/admin/pages',
                templateUrl: '/ngApp/views/Page/page.html',
                controller: NPCMS_Net.Controllers.PageController,
                controllerAs: 'controller'
            })
            .state('addpage', {
                url: '/admin/pages/addpage',
                templateUrl: '/ngApp/views/Page/pagedetail.html',
                controller: NPCMS_Net.Controllers.PageController,
                controllerAs: 'controller',
                params: {
                    pageTitle: "Adding Page"
                }
            })
            .state('editpage', {
                url: '/admin/pages/editpage',
                templateUrl: '/ngApp/views/Page/pagedetail.html',
                controller: NPCMS_Net.Controllers.EditPageController,
                controllerAs: 'controller',
                params: {
                    pageTitle: "Editing Page",
                    id: null}
            })
            .state('layouts', {
                url: '/admin/pages/layouts',
                templateUrl: '/ngApp/views/layout.html',
                controller: NPCMS_Net.Controllers.LayoutController,
                controllerAs: 'controller'
            })
            .state('things', {
                url: '/admin/things',
                templateUrl: '/ngApp/views/Things/list.html',
                controller: NPCMS_Net.Controllers.ThingsListController,
                controllerAs: 'controller'
            })
            .state('users', {
                url: '/admin/users',
                templateUrl: '/ngApp/views/User/user.html',
                controller: NPCMS_Net.Controllers.userController,
                controllerAs: 'controller'
            })
            .state('adduser', {
                url: '/admin/users/adduser',
                templateUrl: '/ngApp/views/User/adduser.html',
                controller: NPCMS_Net.Controllers.userController,
                controllerAs: 'controller'
            })
            .state('edituser', {
                url: '/admin/users/edituser/:userName',
                templateUrl: '/ngApp/views/User/edituser.html',
                controller: NPCMS_Net.Controllers.UpdateUserController,
                controllerAs: 'controller'
            })
            .state('roles', {
                url: '/admin/users/roles',
                templateUrl: '/ngApp/views/role.html',
                controller: NPCMS_Net.Controllers.RoleController,
                controllerAs: 'controller'
            })
            .state('extensions', {
                url: '/admin/extensions',
                templateUrl: '/ngApp/views/extension.html',
                controller: NPCMS_Net.Controllers.ExtensionController,
                controllerAs: 'controller'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: NPCMS_Net.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: NPCMS_Net.Controllers.RegisterController,
                controllerAs: 'controller'
            })
            .state('ThingsAdd', {
                url: '/admin/things/add',
                templateUrl: '/ngApp/views/Things/add.html',
                controller: NPCMS_Net.Controllers.ThingsAddController,
                controllerAs: 'controller'
            })
            .state('ThingsEdit', {
                url: '/admin/things/edit/:id',
                templateUrl: '/ngApp/views/Things/edit.html',
                controller: NPCMS_Net.Controllers.ThingsEditController,
                controllerAs: 'controller'
            })
            .state('ThingsDelete', {
                url: '/admin/things/delete/:id',
                templateUrl: '/ngApp/views/Things/delete.html',
                controller: NPCMS_Net.Controllers.ThingsDeleteController,
                controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

    
    angular.module('NPCMS_Net').factory('authInterceptor', (
        $q: ng.IQService,
        $window: ng.IWindowService,
        $location: ng.ILocationService
    ) =>
        ({
            request: function (config) {
                config.headers = config.headers || {};
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        })
    );

    angular.module('NPCMS_Net').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

}
