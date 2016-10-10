namespace NPCMS_Net.Controllers {

    export class HomeController {
        public message = 'Welcome to the Non-Profit Content Management System';
    }

    export class PageController {

        public PageResource;
        public npcmsPage;
        public npcmsPages;
        public validationErrors;
        public pageHeaderTitle;

        public getPages() {
            
            this.npcmsPages = this.PageResource.query();
            console.log(this.npcmsPages);
        }

        public goAddPage() {
            
            this.$state.go('addpage');
        }

        public goEditPage(id: number) {

            this.$state.go('editpage', { id: id });
        }

        public goDeletePage(id) {
            
            this.PageResource.get({ id: id }).$promise.then((data) => {
                debugger;
                this.npcmsPage = data

                var modalEnvironment = this.pagesService.openModalDelete("Page: " + data.title);

                modalEnvironment.result.then((resultData) => {

                    if (resultData == "YES") {

                        this.PageResource.remove({ id: id }).$promise.then(() => {
                            this.getPages();
                        }).catch((err) => {

                            this.validationErrors = this.pagesService.flattenValidation(err);                             

                            });

                         }
                });
            });
        }

        public save() {
         
            this.PageResource.save(this.npcmsPage).$promise.then(() => {
                this.clearForm();
            }).catch((err) => {

                this.validationErrors = this.pagesService.flattenValidation(err);

                });
        }

        public clearForm() {

            this.npcmsPage = null;
            this.$state.go('pages');
        }

        constructor(private $state: ng.ui.IStateService, private $resource: angular.resource.IResourceService,
            private $stateParams: ng.ui.IStateParamsService, private $uibModal: angular.ui.bootstrap.IModalService,
            private pagesService: NPCMS_Net.Services.PagesService) {

       
            this.PageResource = $resource('/api/npcms_pages/:id'); 
            this.getPages();
            this.pageHeaderTitle = $stateParams['pageTitle'];
            
        }

    }

    //Controller for Modal Delete Confirmation
    class DeleteController {
       
        public ToDelete;

        public saidNo() {

       
            this.$uibModalInstance.close("NO");
        }

        public saidYes() {
           
            this.$uibModalInstance.close("YES");
        }

        constructor(private dataToDelete: any, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) {
           
            this.ToDelete = dataToDelete;
        }

    }

    angular.module('NPCMS_Net').controller('DeleteController', DeleteController);


    export class EditPageController {

        public PageResource;
        public npcmsPage;
        public pageHeaderTitle;
        public validationErrors;

        public getPage(id) {
            this.npcmsPage = this.PageResource.get({id:id}) 
        }

        public save() {
            
            this.PageResource.save(this.npcmsPage).$promise.then(() => {
                this.clearForm();
            }).catch((err) => {

                this.validationErrors = this.pagesService.flattenValidation(err);  

            });
        }

        public clearForm() {

            this.npcmsPage = null;
            this.$state.go('pages');
        }

        constructor(private $state: ng.ui.IStateService, private $resource: angular.resource.IResourceService,
            private $stateParams: ng.ui.IStateParamsService, private pagesService: NPCMS_Net.Services.PagesService) {
            
            this.PageResource = $resource('/api/npcms_pages/:id');
            this.getPage($stateParams['id']);
            this.pageHeaderTitle = $stateParams['pageTitle'];

        }

    }


    export class LayoutController {
        public message = 'Layouts';
    }

    export class ThingController {
        public message = 'Things';
    }

    export class UserController {
        public message = 'Users';

    }

    export class RoleController {
        public message = 'Roles';
    }

    export class ExtensionController {
        public message = 'Extensions';
    }

    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
