import {ZoneContainerEditorSubTool} from "./parent/ZoneContainerEditorSubTool";
import {BackgroundContent} from "../../../zoneContents/BackgroundContent";
import {ZoneContainerBackgroundSelectorTool} from "./zoneContainerBackgroundEditor/ZoneContainerBackgroundSelectorTool";



class ZoneContainerBackgroundEditorTool extends ZoneContainerEditorSubTool{
    constructor(templateInterface,parentTool){
        super(templateInterface,parentTool);

        this.$location.container = $('')
        this.subTools = super.initSubTools(
            new ZoneContainerBackgroundSelectorTool(this.interface,this)
        );

        //this.functionToExecuteOnSelectedZone = this.setMediaToSelectedZone;
    }

    activeTool(boolean){
        super.activeTool(boolean,this.onActivation,this.onDisactivation)
    }

    onComfirmSetBackgroundtoZone(backgrounds){
        console.log(backgrounds)
        this.parentTool.subTools['TemplateMiniatorizerTool'].miniature.zonesSelected.forEach(zoneSelected => {
            if(backgrounds.color !== null) this.interface.currentTemplate.getZone(zoneSelected).setZoneBackground(backgrounds.color)
            if(backgrounds.image !== null) this.interface.currentTemplate.getZone(zoneSelected).setZoneBackground(backgrounds.image)
        })
    }

    setBackgroundToSelectedZone(zone){
        let background = this.backgroundSelected === null ? null : new BackgroundContent(this.backgroundSelected);
        console.log(background)
        if(background !== null)zone.setZoneBackground(background)

    }

    onDisactivation(){
        this.backgroundSelected = null;
    }
    onActivation(){
        this.parentTool.templateMiniature.resetMiniature().addZones();
    }
}

export {ZoneContainerBackgroundEditorTool}