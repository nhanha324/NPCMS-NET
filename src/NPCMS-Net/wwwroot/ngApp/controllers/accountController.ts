namespace NPCMS_Net.Controllers {

    export class AccountController {
        public externalLogins;

        public getUserName() {
            return this.accountService.getUserName();
        }

        public getClaim(type) {
            return this.accountService.getClaim(type);
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        public logout() {
            this.accountService.logout();
            this.$location.path('/');
        }

        public getExternalLogins() {
            return this.accountService.getExternalLogins();
        }

        constructor(private accountService: NPCMS_Net.Services.AccountService, private $location: ng.ILocationService) {
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
            });
        }
    }

    angular.module('NPCMS_Net').controller('AccountController', AccountController);


    export class LoginController {
        public loginUser;
        public validationMessages;

        public login() {
            this.accountService.login(this.loginUser).then(() => {
                this.$location.path('/');
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        constructor(private accountService: NPCMS_Net.Services.AccountService, private $location: ng.ILocationService) { }
    }


    export class RegisterController {
        public registerUser;
        public UserResource;
        public registredUsers;
        public validationMessages;

        public register() {
            this.accountService.register(this.registerUser).then(() => {
                this.clearForm(); //$location.path('/');
            }).catch((results) => {
                this.validationMessages = results;
            });
        }


        //Part of solution Issue #3 - NPCMS Project 10/03/2016
        public goAddUser() {

            this.$state.go('adduser');
        }

        public goEditUser(id: string) {
            this.$state.go('edituser', { userid: id });
        }

        public goDeleteUser(id: string) {

            //this.registerUser = null;
            this.accountService.getUserById(id).then((data) => {
                this.registerUser = data

                var modalEnvironment = this.$uibModal.open({
                    templateUrl: '/ngApp/views/User/modaldel.html',
                    controller: 'DeleteUserController', //See definition and details ahead (below)
                    controllerAs: 'modal',
                    resolve: {
                        userToDelete: () => this.registerUser

                    },

                })

                modalEnvironment.result.then((resultData) => {

                    if (resultData == "YES") {


                        this.accountService.deleteUser(this.registerUser).then(() => {
                            this.clearForm(); //$location.path('/');
                        }).catch((results) => {
                            this.validationMessages = results;
                        });
                    }
                });
            });
        }

        public clearForm() {

            this.registerUser = null;
            this.$state.go('users');
        }

        //Part of solution Issue #3 - NPCMS Project 10/03/2016
        public getAllUsers() {

            this.accountService.getAllUsers().then((result) => {
                this.registredUsers = result;
            }).catch((results) => {
                this.validationMessages = results;
            });

        }

        constructor(private $resource: angular.resource.IResourceService, private accountService: NPCMS_Net.Services.AccountService,
            private $state: ng.ui.IStateService, private $location: ng.ILocationService,
            private $uibModal: angular.ui.bootstrap.IModalService) {

            this.UserResource = $resource('/api/account/:id');
            this.getAllUsers();
        }


    }

    class DeleteUserController {

        public resultData;

        public user;

        public saidNo() {

            this.resultData = "NO";
            this.$uibModalInstance.close("NO");
        }

        public saidYes() {
            this.resultData = "YES";
            this.$uibModalInstance.close("YES");
        }

        constructor(private userToDelete: any, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) {
            this.resultData = "NO";
            this.user = userToDelete;
        }

    }

    angular.module('NPCMS_Net').controller('DeleteUserController', DeleteUserController);



   /* export class RegisterController {
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.register(this.registerUser).then(() => {
                this.$location.path('/');
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        constructor(private accountService: NPCMS_Net.Services.AccountService, private $location: ng.ILocationService) { }
    }
    */




    export class ExternalRegisterController {
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.registerExternal(this.registerUser.email)
                .then((result) => {
                    this.$location.path('/');
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }

        constructor(private accountService: NPCMS_Net.Services.AccountService, private $location: ng.ILocationService) {}

    }

    export class ConfirmEmailController {
        public validationMessages;

        constructor(
            private accountService: NPCMS_Net.Services.AccountService,
            private $http: ng.IHttpService,
            private $stateParams: ng.ui.IStateParamsService,
            private $location: ng.ILocationService
        ) {
            let userId = $stateParams['userId'];
            let code = $stateParams['code'];
            accountService.confirmEmail(userId, code)
                .then((result) => {
                    this.$location.path('/');
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }
    }

}
