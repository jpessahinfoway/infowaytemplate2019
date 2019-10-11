import {TemplateSubTool} from "../../parent/TemplateSubTool.js";

class ZonePriorityManagerSubTool extends TemplateSubTool{
    constructor(template){
        super(template);
        this.$eventLocation.click=$('body');
    }

    activeTool(boolean,onActivationFunction){
        super.activeToolDecorator(boolean,(mode)=>{
            console.log(mode)
            console.log(this.constructor.name)
            if(mode==='on'){
                this.appendIconInZones()
                console.log($('.icon-action-div'))
                this.$eventLocation.click.on('click.'+this.constructor.name,'.icon-action-div',(e)=>{
                    console.log('clické ')
                    let idZone = $(e.currentTarget).parent('.zone').data('zone');
                    this.currentZone = this.interface.currentTemplate.getZone(idZone)
                    console.log(this.currentZone)
                    onActivationFunction.bind(this)();
                    this.updateZoneZindex();
                })
            }else if(mode === 'off'){
                console.log('jetesttça')

            }
        })
    }

    filterZonesByZindex(croissant=true){
       return Object.keys(this.interface.currentTemplate.getZones())
           .sort(   (a,b)=>{
              return croissant ? this.interface.currentTemplate.getZone(a).zIndex - this.interface.currentTemplate.getZone(b).zIndex : this.interface.currentTemplate.getZone(b).zIndex - this.interface.currentTemplate.getZone(a).zIndex}).map( val=>{    return this.interface.currentTemplate.getZone(val)  })
    }

    updateZoneZindex(){
        this.filterZonesByZindex().map((zone,index)=>{if(zone.zIndex!==index)zone.setZIndex(index)})
        console.log(this.filterZonesByZindex())
    }

}
export {ZonePriorityManagerSubTool}