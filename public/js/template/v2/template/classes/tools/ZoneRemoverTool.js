import {TemplateTool} from './TemplateTool.js'
class ZoneRemoverTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.$eventLocation.click = $('.body');
        this.description = 'Supprimer une zone';
        this.removerIcon = {
            name : '<i class="fal fa-times"></i>',
            size : 10,
            position: {top:false,bottom:false,left:false,right:0},
            class:'zoneDeleter'
        }

       
    }

    appendCloseButton(){
            Object.keys(this.interface.currentTemplate.getZones()).forEach((zoneIndex,indexIter)=>{
                let currentZone = this.interface.currentTemplate.getZone(zoneIndex);
                let removerIcon = $(this.removerIcon.name);
                removerIcon.css('font-size',this.removerIcon.size+'px');
                removerIcon.css('position','absolute');

                removerIcon.css({'right':this.removerIcon.position.right});
                removerIcon.css('box-shadow','inset 0 0 0 1px');
                removerIcon.css('padding',5);
                removerIcon.addClass(this.removerIcon.class);
                currentZone.$zone.append(removerIcon);
                if(indexIter === Object.keys(this.interface.currentTemplate.getZones()).length-1){

                }
            })
    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            console.log('sfsdf')

            if(mode==='on'){
                this.appendCloseButton()
                $('body').on('click.'+this.constructor.name,'.zoneDeleter',(e)=>{
                    console.log($(e.currentTarget))
                    let zoneId=$(e.currentTarget).parents('.zone').data('zone');
                    this.interface.currentTemplate.deleteZoneInTemplate(zoneId)
                });
            }else if(mode === 'off'){
                $('.'+this.removerIcon.class).remove()
            }

        })
    }
}

export {ZoneRemoverTool}