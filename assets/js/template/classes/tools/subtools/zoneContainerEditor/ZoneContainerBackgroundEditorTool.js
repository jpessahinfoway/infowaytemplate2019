import {ZoneContainerEditorSubTool} from "./parent/ZoneContainerEditorSubTool";

class ZoneContainerBackgroundEditorTool extends ZoneContainerEditorSubTool{
    constructor(templateInterface){
        super(templateInterface);
        console.log('fdgdfgd')
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation)
    }

    onActivation(){
        console.log('tested')
    }
}

export {ZoneContainerBackgroundEditorTool}