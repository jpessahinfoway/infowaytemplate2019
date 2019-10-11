import {ZonePriorityManagerSubTool} from "./parent/ZonePriorityManagerSubTool.js";

class ZonePriorityAboveTool extends ZonePriorityManagerSubTool{
    constructor(template){
        super(template);
        this.$eventLocation.click=$('body');
        this.description = 'Avancer une zone';
        this.adaptableIconsInZone.element = '<span class="zone-priority-above-icon"><i class="fal fa-layer-plus"></i></span>';

    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation)
    }

    onActivation(){
        let zonesOrderedByZindex = this.filterZonesByZindex();
        let zoneAboveThisOneBeforeChange;
        let currentZonePositionInTemplate = zonesOrderedByZindex.indexOf(this.currentZone);

        if(currentZonePositionInTemplate<zonesOrderedByZindex.length){

            zoneAboveThisOneBeforeChange = zonesOrderedByZindex[currentZonePositionInTemplate+1];
            this.currentZone.setZIndex(zoneAboveThisOneBeforeChange.zIndex);
            zoneAboveThisOneBeforeChange.setZIndex(zoneAboveThisOneBeforeChange.zIndex-1);
        }

    }

}
export {ZonePriorityAboveTool}