import {TemplateTool} from './parent/TemplateTool'
import {ZoneContainerBackgroundEditorTool} from "./subtools/zoneContainerEditor/ZoneContainerBackgroundEditorTool";


class ZoneContainerEditorTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.description = 'Definir les propriétés des contenus de la zone';
        this.$eventLocation=$('body');
        this.addSubTools()
        // this.addSubTools(template);
    }


    addSubTools(){
        console.log('jadd ici le tool')
        this.addSubTool(new ZoneContainerBackgroundEditorTool(this.interface));
    }


    activeTool(boolean){
        super.activeToolDecorator(boolean,()=>{

        })
    }
}

export {ZoneContainerEditorTool}