namespace NPCMS_Net.Controllers {

    export class ThingsListController {
        public things;
        public message;

        constructor(private thingsService: NPCMS_Net.Services.ThingsService) {
            this.things = thingsService.listThings();
            this.message = "Things";
        }
    }

    export class ThingsAddController {
        public thingToCreate;

        constructor(private thingsService: NPCMS_Net.Services.ThingsService, private $state: ng.ui.IStateService) {
          
        }

        addThing() {
            this.thingsService.save(this.thingToCreate).then(
                () => this.$state.go('things')
            );
        }
    }

    export class ThingsEditController {
        public thingToEdit;

        constructor(private thingsService: NPCMS_Net.Services.ThingsService, private $state: ng.ui.IStateService, $stateParams: ng.ui.IStateParamsService) {
            this.thingToEdit = thingsService.getThing($stateParams['id']);
            
            thingsService.getThing($stateParams['id']).then(
                (data) => {
                    this.thingToEdit = data
                }
            );
        }

        editThing() {
            this.thingsService.save(this.thingToEdit).then(
                () => {
                    this.$state.go('things')
                } 
            );
        }
    }

    export class ThingsDeleteController {
        public thingToDelete;

        constructor(private thingsService: NPCMS_Net.Services.ThingsService, private $state: ng.ui.IStateService, $stateParams: ng.ui.IStateParamsService) {
            this.thingToDelete = thingsService.getThing($stateParams['id']).then(
                (data) => this.thingToDelete = data
            );
        }

        deleteThing() {
            this.thingsService.deleteThing(this.thingToDelete.thingId).then(
                () => this.$state.go('things')
            );
        }
    }
}