import {TemplateTool} from './parent/TemplateTool.js'
import {ZonePriorityForegroundTool} from "./subtools/zonePriorityManager/ZonePriorityForegroundTool.js";
import {ZonePriorityBackgroundTool} from "./subtools/zonePriorityManager/ZonePriorityBackgroundTool.js";
import {ZonePriorityAboveTool} from "./subtools/zonePriorityManager/ZonePriorityAboveTool.js";
import {ZonePriorityBellowTool} from "./subtools/zonePriorityManager/ZonePriorityBellowTool.js";
/*import {ZonePriorityForegroundTool} from './subTools/ZonePriorityForegroundTool.js'
import {ZonePriorityBackgroundTool} from "./subTools/ZonePriorityBackgroundTool.js";
import {ZonePriorityAboveTool} from "./subTools/ZonePriorityAboveTool.js";
import {ZonePriorityBellowTool} from "./subTools/ZonePriorityBellowTool.js";*/

class ZonePriorityManagerTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.description = 'Arranger une zone';
        this.$eventLocation=$('body');
        this.addSubTools()
       // this.addSubTools(template);
    }


    addSubTools(){
        this.addSubTool(new ZonePriorityForegroundTool(this.interface));
        this.addSubTool(new ZonePriorityBackgroundTool(this.interface));
        this.addSubTool(new ZonePriorityAboveTool(this.interface));
        this.addSubTool(new ZonePriorityBellowTool(this.interface));
    }


    activeTool(boolean){
        super.activeToolDecorator(boolean,()=>{

        })
    }
}

export {ZonePriorityManagerTool}