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

    }