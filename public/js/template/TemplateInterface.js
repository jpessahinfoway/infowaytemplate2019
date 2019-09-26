import {TemplateMenu} from "./TemplateMenu.js";
import {Template} from "./Template.js";
import {TemplateToolBox} from "./TemplateToolBox.js";
import {TemplateCreatorWindow} from "./accueil/TemplateCreatorWindow.js";
import {AccueilStation} from "./accueil/AccueilStation.js";
import {ZoneCreatorTool} from "./tools/ZoneCreatorTool.js";
import {ZoneDraggerTool} from "./tools/ZoneDraggerTool.js";
import {ZoneRemoverTool} from "./tools/ZoneRemoverTool.js";
import {ZonePriorityManagerTool} from "./tools/ZonePriorityManagerTool.js";
import {ZoneResizerTool} from "./tools/ZoneResizerTool.js";
import {ZoneInfoDisplayerTool} from "./tools/ZoneInfoDisplayerTool.js";

class TemplateInterface{
    constructor(){
        this.tools = {};
        this.initAccueil()
        this.buildTemplateEventZone()
    }

    initAccueil(){
        let accueil = new AccueilStation();
        accueil.init()
    }

    activeTools(template){
        let zoneInfosDisplayerTool = new ZoneInfoDisplayerTool(template)
        template.addTool(zoneInfosDisplayerTool)
        zoneInfosDisplayerTool.activeTool(true)
    }
    activeToolBox(template){
        this.toolBox = new TemplateToolBox();
        this.toolBox.addTools(new ZoneCreatorTool(template));
        this.toolBox.addTools(new ZoneDraggerTool(template));
        this.toolBox.addTools(new ZoneRemoverTool(template));
        this.toolBox.addTools(new ZonePriorityManagerTool(template));
        this.toolBox.addTools(new ZoneResizerTool(template));
        this.toolBox.activeToolBoxEvents();
    }

    buildTemplateEventZone(){
        /*let templateEventsZone = $('#templateEventsZone');
        let topMenu = $('nav');
        templateEventsZone.css({'position':'absolute', 'top':topMenu.height(), 'width':'100%','height':'100%'})*/
    }

}

export {TemplateInterface}