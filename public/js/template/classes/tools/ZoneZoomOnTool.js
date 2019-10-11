import {TemplateTool} from "./parent/TemplateTool.js";
import {ZoneZoomIncreaserTool} from "./subtools/zoneZoomOn/ZoneZoomIncreaserTool.js";

class ZoneZoomOnTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface)
        this.$eventLocation=$('body');
        console.log(this.interface)
        this.addSubTools()
    }

    addSubTools(){
        console.log(this.interface)
        this.addSubTool(new ZoneZoomIncreaserTool(this.interface));
    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,()=>{

        })
    }
}

export {ZoneZoomOnTool}