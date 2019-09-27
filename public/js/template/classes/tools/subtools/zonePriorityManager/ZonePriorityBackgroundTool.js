import {TemplateSubTool} from "../parent/TemplateSubTool.js";
import {ZonePriorityManagerSubTool} from "./parent/ZonePriorityManagerSubTool.js";

class ZonePriorityBackgroundTool extends ZonePriorityManagerSubTool{
    constructor(template){
        super(template);
        this.description = 'Mettre en dernier plan';
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation)
    }

    onActivation(){
        let zonesOrderedByZindex = this.filterZonesByZindex(true);
        zonesOrderedByZindex.map(zone=>{zone.identificator===this.currentZone.identificator?zone.setZIndex(0):zone.setZIndex(zone.zIndex+1)});
    }
}
export {ZonePriorityBackgroundTool}