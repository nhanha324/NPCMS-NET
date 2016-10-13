namespace NPCMS_Net.Controllers {

export class userController {

    public registerUser;
        public registredUsers;
        public validationMessages;

        public register() {
                this.accountService.register(this.registerUser).then(() => {
                        this.clearForm();
                    }).catch((results) => {
                        this.validationMessages = results;
                });
        }


        // Part of solution Issue #3 - NPCMS Project 10/03/2016
        // Fixed at 10/11/2016

        public goDeleteUser(userName: string) {

            this.usersService.getUserByName(userName).then((data) => {
                debugger;
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

                    this.usersService.deleteUser(userName).then(() => {
                        this.getAllUsers();
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
            
            this.usersService.getAllUsers().then((result) => {
                
                this.registredUsers = result;
            }).catch((results) => {
                this.validationMessages = results;
            });

        }

    constructor(private $resource: angular.resource.IResourceService, private usersService: NPCMS_Net.Services.UsersService,
                    private accountService: NPCMS_Net.Services.AccountService,
                    private $state: ng.ui.IStateService, private $location: ng.ILocationService,
                    private $uibModal: angular.ui.bootstrap.IModalService) {

            this.getAllUsers();
    }


 }

//Controller for Modal Delete Confirmation
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

export class UpdateUserController {
    public registerUser;
    public validationMessages;

    public updateUser() {
        
        this.usersService.updateUser(this.registerUser).then(() => {
            this.clearForm();
        }).catch((results) => {
            this.validationMessages = results;
        });
    }

    public getUser(userName: string) {

        this.usersService.getUserByName(userName).then((data) => {
            this.registerUser = data
        });

    }

    public clearForm() {

        this.registerUser = null;
        this.$state.go('users');
    }


    constructor(private usersService: NPCMS_Net.Services.UsersService, private $state: ng.ui.IStateService,
        private $location: ng.ILocationService, private $stateParams: ng.ui.IStateParamsService, ) {
        this.getUser($stateParams['userName']);
    }
}
}