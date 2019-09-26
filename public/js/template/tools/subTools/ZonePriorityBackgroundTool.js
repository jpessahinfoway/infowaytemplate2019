import {TemplateSubTool} from "../TemplateSubTool.js";
import {ZonePriorityManagerSubTool} from "./ZonePriorityManagerSubTool.js";

class ZonePriorityBackgroundTool extends ZonePriorityManagerSubTool{
    constructor(template){
        super(template);
       
        this.setTitle('Mettre au dernier plan');
        this.setIcon('fad fa-send-backward')
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