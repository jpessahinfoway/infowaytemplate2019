import {TemplateSubTool} from "../TemplateSubTool.js";

class ZonePriorityBellowTool extends TemplateSubTool{
    constructor(template){
        super(template);
       
        this.setTitle('Mettre juste au dessus');
        this.setIcon('fal fa-layer-plus');
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