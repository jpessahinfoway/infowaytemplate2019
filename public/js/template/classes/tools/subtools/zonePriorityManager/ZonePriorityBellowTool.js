import {TemplateSubTool} from "../parent/TemplateSubTool.js";

class ZonePriorityBellowTool extends TemplateSubTool{
    constructor(template){
        super(template);
       
        this.description = 'Reculer une zone';
        this.$eventLocation=$('body');
    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){

            }else if(mode === 'off'){

            }
        })
    }

}
export {ZonePriorityBellowTool}