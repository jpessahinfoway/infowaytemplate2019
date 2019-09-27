import {TemplateTool} from './parent/TemplateTool.js'
import {ZonePriorityForegroundTool} from "./subtools/zonePriorityManager/ZonePriorityForegroundTool.js";
/*import {ZonePriorityForegroundTool} from './subTools/ZonePriorityForegroundTool.js'
import {ZonePriorityBackgroundTool} from "./subTools/ZonePriorityBackgroundTool.js";
import {ZonePriorityAboveTool} from "./subTools/ZonePriorityAboveTool.js";
import {ZonePriorityBellowTool} from "./subTools/ZonePriorityBellowTool.js";*/

class ZonePriorityManagerTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.description = 'Arranger une zone';
        this.$eventLocation=$('body');
        this.addSubTools()
       // this.addSubTools(template);
    }

    addSubTool(subTool){
        this.subTools[subTool.name]=subTool
    }


    addSubTools(){
        this.addSubTool(new ZonePriorityForegroundTool(this.interface));
      /*  this.addSubTool(new ZonePriorityBackgroundTool(this.interface));
        this.addSubTool(new ZonePriorityAboveTool(this.interface));
        this.addSubTool(new ZonePriorityBellowTool(this.interface));*/
    }


   /* addSubFunctionalityIconsProperties(label,icon,title,className){
        this.subMenuIcons[label]={
            icon,
            title,
            className
        };
       
    }*/

   /*setIcon(iconClass){
        super.setIcon(iconClass)

        //this.displaySubsIcons()
    }*/

    /*createSubIconsContainer(){
        this.subIconsContainer = $('<ul>test</ul>');
       
       
        debugger;
    }*/


   /* displaySubsIcons(){
        let ul = $('<ul></ul>')
        let lastIcon,lastIconContainer;
        Object.keys(this.subMenuIcons).forEach(subMenuIcon=>{
            lastIcon = $(`<i data-subtool=${subMenuIcon}></i>`)
            lastIcon.addClass(this.subMenuIcons[subMenuIcon].icon);
            lastIconContainer = $(`<li class="subTool" id="${this.subMenuIcons[subMenuIcon].className}"><span title="${this.subMenuIcons[subMenuIcon].title}"></span></li>`).append(lastIcon);

            ul.append(lastIconContainer)
        });

        this.iconContainer = $(this.iconContainer.get(0).outerHTML + ul.get(0).outerHTML)
    }*/

    activeTool(boolean){
        super.activeToolDecorator(boolean,()=>{

        })
    }
}

export {ZonePriorityManagerTool}