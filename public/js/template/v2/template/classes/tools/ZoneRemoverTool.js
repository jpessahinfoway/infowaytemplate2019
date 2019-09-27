import {TemplateTool} from './TemplateTool.js'
class ZoneRemoverTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.$eventLocation.click = $('.body');
        this.description = 'Supprimer une zone';
        this.removerIcon = {
            name : '<i class="fad fa-trash-alt"></i>',
            size : 80,
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
                removerIcon.css({'opacity':'0.5'});
                removerIcon.css({'color':'white'});
                removerIcon.css({'top':'50%'});
                removerIcon.css({'left':'50%'});
                removerIcon.css({'transform':'translate(-50%,-50%'});
               // removerIcon.css('box-shadow','inset 0 0 0 1px');
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