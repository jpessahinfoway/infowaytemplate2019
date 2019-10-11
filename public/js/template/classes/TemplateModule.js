import {Template} from "./Template.js";
import {TemplateToolBox} from "./TemplateToolBox.js";
import {ZoneCreatorTool} from "./tools/ZoneCreatorTool.js";
import {ZoneDraggerTool} from "./tools/ZoneDraggerTool.js";
import {ZoneRemoverTool} from "./tools/ZoneRemoverTool.js";
import {ZoneResizerTool} from "./tools/ZoneResizerTool.js";
import {ZonePriorityManagerTool} from "./tools/ZonePriorityManagerTool.js";
import {ZoneMaskerTool} from "./tools/ZoneMaskerTool.js";
import {ZoneInfoDisplayerTool} from "./tools/ZoneInfoDisplayerTool.js";
import {ZoneZoomOnTool} from "./tools/ZoneZoomOnTool.js";

class TemplateModule{

    constructor(){
        this.currentTemplate    =   null;
        this.toolBox            =   null;
        this.initActions()
    }

    attachToolBox(){

        this.toolBox = new TemplateToolBox();
        this.toolBox.addTool(new ZoneCreatorTool(this));
        this.toolBox.addTool(new ZoneDraggerTool(this));
        this.toolBox.addTool(new ZoneRemoverTool(this));
        this.toolBox.addTool(new ZoneResizerTool(this));
        this.toolBox.addTool(new ZonePriorityManagerTool(this));
        this.toolBox.addTool(new ZoneMaskerTool(this));
        this.toolBox.addTool(new ZoneZoomOnTool(this));
        this.toolBox.addTool(new ZoneInfoDisplayerTool(this));
        this.toolBox.activeToolBoxEvents()
    }

    createTemplate(name,orientation){
        this.currentTemplate = new Template();
        this.currentTemplate.setOrientation(orientation);
        this.currentTemplate.setName(name);
        this.currentTemplate.show();
    }

    initActions(){
        this.saveOnClick()
    }

    saveOnClick(){
        $('.template-menu li.save').on('click',()=>{

            let templateDataToImport = {
                name : this.currentTemplate._name,
                attrs : this.currentTemplate._attr
            };
            console.log(templateDataToImport);
            $.ajax({
                type: "GET",
                url: '/template/stage1/register',
                data: {
                    zones : JSON.stringify(this.currentTemplate.getZones()),
                    template : JSON.stringify(templateDataToImport)
                },
                success: function(){
                    console.log('success')
                },
            });
        })
    }
}

export {TemplateModule}