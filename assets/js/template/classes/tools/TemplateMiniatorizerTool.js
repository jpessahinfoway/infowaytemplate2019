import {TemplateTool} from './parent/TemplateTool'
import {TemplateMiniature} from "../TemplateMiniature";
import {PermanentTool} from "./parent/PermanentTool";

class TemplateMiniatorizerTool extends PermanentTool{
    constructor(templateInterface,$location){
        super(templateInterface);
        this.description = 'Creé la miniature du template avec les zones';
        this.$eventLocation=$('body');
        this.miniatures = {};
        this.$location = {
            miniature : $location
        }
        // this.addSubTools(template);
    }

    createMiniature($location,name,tag=null){
        console.log($location)
        let miniatureObject =
            { tag    : tag,
            instance : new TemplateMiniature(this.interface.currentTemplate,name,$location).createMiniature()
            };
        this.miniatures[name]=miniatureObject
        return miniatureObject.instance
    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{

            if(mode==='on'){
                this.onClickCloseAssociationWindow(true)
                Object.values(this.subTools).map(subtool=>{
                    console.log(subtool)
                    subtool.activeTool(true)
                });
                this.$location.associationWindow.removeClass('none');
            }else if(mode === 'off'){
                Object.values(this.subTools).map(subtool=>{
                    console.log(subtool)
                    subtool.activeTool(false)
                });
                this.$location.associationWindow.addClass('none');
            }

        })
    }

    onClickCloseAssociationWindow(active){
        if(active){
            this.$location.closeAssociationWindow.on('click.'+this.constructor.name, () => {
                this.$location.associationWindow.addClass('none')
                this.activeTool(false)
            })
        }else{
            this.$location.closeAssociationWindow.off('click.'+this.constructor.name)
        }
    }
}

export {TemplateMiniatorizerTool}