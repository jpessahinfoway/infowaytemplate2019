import {TemplateTool} from './parent/TemplateTool'
import {ZonePriorityForegroundTool} from "./subtools/zonePriorityManager/ZonePriorityForegroundTool";
import {ZonePriorityBackgroundTool} from "./subtools/zonePriorityManager/ZonePriorityBackgroundTool";
import {ZonePriorityAboveTool} from "./subtools/zonePriorityManager/ZonePriorityAboveTool";
import {ZonePriorityBellowTool} from "./subtools/zonePriorityManager/ZonePriorityBellowTool";
/*import {ZonePriorityForegroundTool} from './subTools/ZonePriorityForegroundTool'
import {ZonePriorityBackgroundTool} from "./subTools/ZonePriorityBackgroundTool";
import {ZonePriorityAboveTool} from "./subTools/ZonePriorityAboveTool";
import {ZonePriorityBellowTool} from "./subTools/ZonePriorityBellowTool";*/

class ZonePriorityManagerTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.description = 'Arranger une zone';
        this.$eventLocation=$('body');
        this.addSubTools()
       // this.addSubTools(template);
    }


    addSubTools(){
        this.addSubTool(new ZonePriorityForegroundTool(this.interface,this));
        this.addSubTool(new ZonePriorityBackgroundTool(this.interface,this));
        this.addSubTool(new ZonePriorityAboveTool(this.interface,this));
        this.addSubTool(new ZonePriorityBellowTool(this.interface,this));
    }


    activeTool(boolean){
        super.activeToolDecorator(boolean,()=>{

        })
    }
}

export {ZonePriorityManagerTool}