import {Template} from "./Template";
import {TemplateToolBox} from "./TemplateToolBox";
import {ZoneCreatorTool} from "./tools/ZoneCreatorTool";
import {ZoneDraggerTool} from "./tools/ZoneDraggerTool";
import {ZoneRemoverTool} from "./tools/ZoneRemoverTool";
import {ZoneResizerTool} from "./tools/ZoneResizerTool";
import {ZonePriorityManagerTool} from "./tools/ZonePriorityManagerTool";
import {ZoneMaskerTool} from "./tools/ZoneMaskerTool";
import {ZoneInfoDisplayerTool} from "./tools/ZoneInfoDisplayerTool";
import {ZoneZoomOnTool} from "./tools/ZoneZoomOnTool";
import {ZoneAssociationTool} from "./tools/ZoneAssociationTool";
import {ZoneDuplicatorTool} from "./tools/ZoneDuplicatorTool";
import {ZoneContainerEditorTool} from "./tools/ZoneContainerEditorTool";
import {TemplateMiniatorizerTool} from "./tools/TemplateMiniatorizerTool";

class TemplateModule{

    constructor(){
        this.currentTemplate    =   null;
        this.toolBox            =   null;
        this.initActions()
    }

    attachToolBox(){

        this.toolBox = new TemplateToolBox();
        this.toolBox.addTool(new TemplateMiniatorizerTool(this));
        this.toolBox.addTool(new ZoneCreatorTool(this));
        this.toolBox.addTool(new ZoneDraggerTool(this));
        this.toolBox.addTool(new ZoneRemoverTool(this));
        this.toolBox.addTool(new ZoneResizerTool(this));
        this.toolBox.addTool(new ZonePriorityManagerTool(this));
        this.toolBox.addTool(new ZoneMaskerTool(this));
        this.toolBox.addTool(new ZoneZoomOnTool(this));
        this.toolBox.addTool(new ZoneInfoDisplayerTool(this));
        this.toolBox.addTool(new ZoneAssociationTool(this));
        this.toolBox.addTool(new ZoneDuplicatorTool(this));
        this.toolBox.addTool(new ZoneContainerEditorTool(this));
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