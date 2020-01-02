import {TemplateTool} from './parent/TemplateTool'
import {TemplateMiniature} from "../TemplateMiniature";
import {PermanentTool} from "./parent/PermanentTool";

class TemplateMiniatorizerTool extends PermanentTool{
    constructor(templateInterface,$location){
        super(templateInterface);
        this.description = 'Creé la miniature du template avec les zones';
        this.$eventLocation=$('body');
        this.miniature = null;
        this.$location.container = $('.modal.background-editor').find('.miniature');
        this.$location.miniature = this.$location.container.find('.container');
        // this.addSubTools(template);
    }

    createMiniature($location){
        this.miniature= new TemplateMiniature(this.interface.currentTemplate,this.$location.miniature).createMiniature()

        return this.miniature
    }


    onClickCloseAssociationWindow(active){
        if(active){
            this.$location.closeAssociationWindow.on('click.'+this.constructor.name, () => {
                this.$location.associationWindow.addClass('none')
                this.activeTool(true)
            })
        }else{
            this.$location.closeAssociationWindow.off('click.'+this.constructor.name)
        }
    }
    activeTool(active){
        super.activeTool(active)
        if(active){
            console.log(this.$location.container)
           this.$location.container.removeClass('none');
        }else{
            this.$location.container.addClass('none');
        }
        return this
    }
}

export {TemplateMiniatorizerTool}