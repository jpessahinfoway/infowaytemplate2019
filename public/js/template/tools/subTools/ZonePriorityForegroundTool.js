import {ZonePriorityManagerSubTool} from "./ZonePriorityManagerSubTool.js";

class ZonePriorityForegroundTool extends ZonePriorityManagerSubTool{
    constructor(template){
        super(template);
        this.$eventLocation=".zone";
        this.setTitle('Mettre au premier plan');
        this.setIcon('fad fa-bring-forward')
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation)
    }

    onActivation(){
        let zonesOrderedByZindex = this.filterZonesByZindex(false);
        this.currentZone.setZIndex(zonesOrderedByZindex[0].zIndex+1);
    }

}
export {ZonePriorityForegroundTool}