import {TemplateTool} from './parent/TemplateTool.js'
import {ChoiceDiv} from "../utilities/ChoiceDiv.js";
class ZoneRemoverTool extends TemplateTool{
    constructor(templateInterface){
        super(templateInterface);
        this.$eventLocation.click = $('body');
        this.$eventLocation.mouseout = $('.body');
        this.$eventLocation.mouseover = $('.body');
        this.description = 'Supprimer une zone';
        this.removerIcon = {
            element : '<div class="remover-tool-space"><span class="remover-icon"><i class="fad fa-trash-alt"></i></span></div>',
            size : 80,
            position: {top:false,bottom:false,left:false,right:0},
            class:'zoneDeleter'
        }
        this.choiceDiv = null;

       
    }

    initOnZoneHoverFocusIcon(){
        $('.zone').on(`mouseover.${this.constructor.name}`,  (e)=> { $(e.currentTarget).find('.remover-icon i').addClass('active-icon')  });
        $('.zone').on(`mouseout.${this.constructor.name}`,   (e)=>     {    $(e.currentTarget).find('.remover-icon i').removeClass('active-icon')   })
    }


    appendCloseButton(){
            Object.keys(this.interface.currentTemplate.getZones()).forEach((zoneIndex,indexIter)=>{

                let currentZone              =   this.interface.currentTemplate.getZone(zoneIndex);
                let minSizeValue             =   Math.min(   ...Object.values(  currentZone.getSize()   ));
                let removerIcon              =   $(this.removerIcon.element);

                removerIcon.find('i').css('font-size',minSizeValue*0.3);

               // removerIcon.css('box-shadow','inset 0 0 0 1px');
                currentZone.$zone.append(removerIcon);
                if(indexIter === Object.keys(this.interface.currentTemplate.getZones()).length-1){

                }
            })
    }


    buildConfirmationDiv(){
        this.choiceDiv = new ChoiceDiv();
        this.choiceDiv.setLabel('Supression de zones');
        this.choiceDiv.onYes(()=>{
            this.interface.currentTemplate.deleteZoneInTemplate(this.currentZone.identificator)
        });
        this.choiceDiv.onNo(()=>{
            console.log('no')
        });
        this.displayConfirmationDivOnZoneClick()
    }
    displayConfirmationDivOnZoneClick(){
        console.log(this.$eventLocation.click);
        this.$eventLocation.click.on(`click.${this.constructor.name}`,'.remover-tool-space',(e)=>{

            console.log('dsffsfd')
            let zoneId = $(e.currentTarget).parents('.zone').data('zone');
            this.currentZone = this.interface.currentTemplate.getZone(zoneId)
            this.choiceDiv.setText(`Voulez vous vraiment supprimer la zone "${this.currentZone.name}" ?`);
            this.choiceDiv.show()
        })
    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            console.log('sfsdf')

            if(mode==='on'){
                this.initOnZoneHoverFocusIcon();
                this.buildConfirmationDiv();
                this.appendCloseButton();
            }else if(mode === 'off'){

                $('.remover-tool-space').remove();
                $('.zone').unbind(`mouseover.${this.constructor.name}`);
                $('.zone').unbind(`mouseout.${this.constructor.name}`);
                this.$eventLocation.click.unbind(`click.${this.constructor.name}`);
                if(this.choiceDiv!==null)this.choiceDiv.desactive()
            }

        })
    }
}

export {ZoneRemoverTool}