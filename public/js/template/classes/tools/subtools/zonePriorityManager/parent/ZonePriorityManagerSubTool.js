import {TemplateSubTool} from "../../parent/TemplateSubTool.js";

class ZonePriorityManagerSubTool extends TemplateSubTool{
    constructor(template){
        super(template);
        this.$eventLocation.click=$('.zone');
    }

    activeTool(boolean,onActivationFunction){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                this.$eventLocation.click.on('click.'+this.constructor.name,(e)=>{
                    let idZone = $(e.currentTarget).data('zone');
                    this.currentZone = this.interface.currentTemplate.getZones(idZone)
                    onActivationFunction.bind(this)();
                    this.updateZoneZindex();
                })
            }else if(mode === 'off'){

            }
        })
    }

    filterZonesByZindex(croissant=true){
      return Object.keys(this.interface.currentTemplate.getZones()).sort((a,b)=>{return croissant ? this.interface.currentTemplate.getZones(a).zIndex - this.interface.currentTemplate.getZones(b).zIndex : this.interface.currentTemplate.getZones(b).zIndex - this.interface.currentTemplate.getZones(a).zIndex}).map(val=>this.interface.currentTemplate.getZones(val))
    }

    updateZoneZindex(){
        this.filterZonesByZindex().map((zone,index)=>{if(zone.zIndex!==index)zone.setZIndex(index)})
    }

}
export {ZonePriorityManagerSubTool}