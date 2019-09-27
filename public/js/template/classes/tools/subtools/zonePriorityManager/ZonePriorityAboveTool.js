import {TemplateSubTool} from "../parent/TemplateSubTool.js";

class ZonePriorityAboveTool extends TemplateSubTool{
    constructor(template){
        super(template);
        console.log(template)
        this.description = 'Avancer une zone';

    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){

            }else if(mode === 'off'){

            }
        })
    }

}
export {ZonePriorityAboveTool}