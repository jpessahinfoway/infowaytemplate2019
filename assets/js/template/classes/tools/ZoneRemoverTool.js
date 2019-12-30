import {TemplateTool} from './parent/TemplateTool'
import {ChoiceDiv} from "../utilities/ChoiceDiv";
class ZoneRemoverTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.$eventLocation.click = $('body');
        this.$eventLocation.mouseout = $('.body');
        this.$eventLocation.mouseover = $('.body');
        this.description = 'Supprimer une zone';
        this.adaptableIconsInZone.element = '<span class="remover-icon"><i class="fad fa-trash-alt"></i></span>';
        this.choiceDiv = null;

       
    }

    initOnZoneHoverFocusIcon(){
        $('.zone').on(`mouseover.${this.constructor.name}`,  (e)=> {
            console.log('icii')
            $(e.currentTarget).find('.remover-icon i').addClass('active-icon')

        });
        $('.zone').on(`mouseout.${this.constructor.name}`,   (e)=>     {    $(e.currentTarget).find('.remover-icon i').removeClass('active-icon')   })
    }



    buildConfirmationDiv(){
        this.choiceDiv = new ChoiceDiv();
        this.choiceDiv.setLabel('Supression de zones');
        this.choiceDiv.onYes(()=>{
            this.interface.currentTemplate.deleteZoneInTemplate(this.currentZone.identificator)
        });
        this.choiceDiv.onNo(()=>{
        });
        this.displayConfirmationDivOnZoneClick()
    }

    displayConfirmationDivOnZoneClick(){
        this.$eventLocation.click.on(`click.${this.constructor.name}`,'.icon-action-div',(e)=>{

            let zoneId = $(e.currentTarget).parents('.zone').data('zone');
            this.currentZone = this.interface.currentTemplate.getZone(zoneId)
            this.choiceDiv.addText(`Voulez vous vraiment supprimer la zone "${this.currentZone.name}" ?`);
            this.choiceDiv.show()
        })
    }

    activeTool(active){
        super.activeTool(active)
            if(active){
                this.initOnZoneHoverFocusIcon();
                this.buildConfirmationDiv();
                this.appendIconInZones();
            }else{

                $('.icon-action-div').remove();
                $('.zone').unbind(`mouseover.${this.constructor.name}`);
                $('.zone').unbind(`mouseout.${this.constructor.name}`);
                this.$eventLocation.click.unbind(`click.${this.constructor.name}`);
                if(this.choiceDiv!==null)this.choiceDiv.desactive()
            }

    }
}

export {ZoneRemoverTool}