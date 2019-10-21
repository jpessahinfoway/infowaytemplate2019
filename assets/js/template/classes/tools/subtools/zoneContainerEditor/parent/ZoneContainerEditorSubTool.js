import {TemplateSubTool} from "../../parent/TemplateSubTool.js";

class ZoneContainerEditorSubTool extends TemplateSubTool{
    constructor(){
        super();
    }



    activeTool(boolean,onActivationFunction){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                console.log('activateddd')
                onActivationFunction()
            }else if(mode === 'off'){
               // this.parentTool.zoneCreationObservable.removeObserver(this.zoneCreatorObserver)
            }
        })
    }
}

export {ZoneContainerEditorSubTool}