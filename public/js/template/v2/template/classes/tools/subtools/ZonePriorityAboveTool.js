import {TemplateSubTool} from "../TemplateSubTool.js";

class ZonePriorityAboveTool extends TemplateSubTool{
    constructor(template){
        super(template);
        console.log(template)
        this.setTitle('Mettre en juste en dessous');
        this.setIcon('fal fa-layer-minus')
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