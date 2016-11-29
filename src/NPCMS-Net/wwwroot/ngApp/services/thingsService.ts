namespace NPCMS_Net.Services {
    export class ThingsService {
        private ThingsResource;
        public updateAction;

        constructor(private $resource: ng.resource.IResourceService) {
            // Define your custom actions here as IActionDescriptor

            this.ThingsResource = $resource('/api/things/:id');
        }

        public listThings() {
            ();
            return this.ThingsResource.query();
        }

        public save(thing) {
            return this.ThingsResource.save(thing).$promise;
        }

        public getThing(id) {
            return this.ThingsResource.get({ id: id }).$promise;
        }

        public deleteThing(id: number) {
            return this.ThingsResource.delete({ id: id }).$promise;
        }
    }

    angular.module('NPCMS_Net').service('thingsService', ThingsService);
}