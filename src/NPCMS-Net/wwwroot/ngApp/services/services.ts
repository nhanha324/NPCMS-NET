namespace NPCMS_Net.Services {
    
    export class PagesService {

        public openModalDelete(data) {

            return this.$uibModal.open({
                        templateUrl: '/ngApp/views/modaldel.html',
                        controller: 'DeleteController', //See definition and details ahead (below)
                        controllerAs: 'modal',
                        resolve: {
                            dataToDelete: () => data
                        }
                    })
        }

        public flattenValidation(modelState) {
            let messages = [];
            for (let prop in modelState.data) {
                messages = messages.concat(modelState.data[prop]);
            }
            return messages;
        }

        constructor(private $resource: angular.resource.IResourceService, private $uibModal: angular.ui.bootstrap.IModalService) {
          
        }
    }
    angular.module('NPCMS_Net').service('pagesService', PagesService); 


    export class UsersService {

        public deleteUser(usernametodelete) {
            return this.$q((resolve, reject) => {
                this.$http.delete('/api/account/deleteuser/' + usernametodelete)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((result) => {
                        var messages = this.flattenValidation(result.data);
                        reject(messages);
                    });
            });
        }

        public updateUser(usernametoupdate) {
            return this.$q((resolve, reject) => {
                this.$http.post('/api/account/updateuser/', usernametoupdate)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((result) => {
                        var messages = this.flattenValidation(result.data);
                        reject(messages);
                    });
            });
        }

        public getAllUsers() {
            return this.$q((resolve, reject) => {
                this.$http.get('/api/account/getallusers', null)
                    .then((result) => {
                        resolve(result.data);
                    }).catch((result) => {
                        var messages = this.flattenValidation(result.data);
                        reject(messages);
                    });
            });
        }

        public getUserByName(userName: string) {

            return this.$q((resolve, reject) => {
                this.$http.get('/api/account/getUserByName/' + userName, null)
                    .then((result) => {
                        resolve(result.data);
                    }).catch((result) => {
                        var messages = this.flattenValidation(result.data);
                        reject(messages);
                    });
            });
        }

        private flattenValidation(modelState) {
            let messages = [];
            for (let prop in modelState) {
                messages = messages.concat(modelState[prop]);
            }
            return messages;
        }

        constructor
            (
            private $q: ng.IQService,
            private $http: ng.IHttpService,
            private $window: ng.IWindowService
            ) { }
    }

    angular.module('NPCMS_Net').service('usersService', UsersService);
    }