import {TemplateSubTool} from "../../parent/TemplateSubTool.js";
import {Zone} from "../../../../Zone.js";
import {Observer} from "../../../../pattern/observer/Observer.js";

class ZoneCreatorSubTool extends TemplateSubTool{
    constructor(){
        super();
        this.type=null;
        this.zoneCreatorObserver=null;
        this.initZoneCreatorObserver();
    }



    initZoneCreatorObserver(){
        this.zoneCreatorObserver = new Observer()
        console.log('jog')
        this.zoneCreatorObserver.observerFunction((observer)=>{ this.sendAuthorization(observer.data[0]) })
    }

    sendAuthorization(target){
        this.parentTool.activated = false;
      //  this.parentTool.setError('La sous zone doit être placée dans une zone principale');

        let $target = $(target);
        if($target.hasClass('zone')){
            let currentZone = this.parentTool.interface.currentTemplate.getZone($target.data('zone'));
            let referent = null;

            if      (currentZone.type==='zone') referent=currentZone.$zone;
            else if (currentZone.parent!==null && currentZone.parent instanceof Zone) referent=currentZone.$zone;
            else return;

            this.parentTool.referent = referent;
            this.parentTool.zoneCreationObservable.removeObserver(this.zoneCreatorObserver)
        }
    }

    changeZoneTypeInCreatorTool(){
        this.parentTool.setZoneType(this.type)
    }

    displayErrorIfNotParent(){

    /*    console.log(this.parentTool)
        if(!(this.parentTool.parentZone instanceof Zone) && (this.parentTool !== null && this.parentTool.parentZone.type !== 'zone')){
            console.log('Ici je rentre dans erreur')
            this.parentTool.error.message='La sous zone doit être dans une zone principale';
            this.parentTool.error.status = true
        }*/
    }

    activeTool(boolean,onActivationFunction){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                this.changeZoneTypeInCreatorTool()
                this.displayErrorIfNotParent()
                this.parentTool.zoneCreationObservable.addObserver(this.zoneCreatorObserver)
            }else if(mode === 'off'){
                console.log('jetesttça')

            }
        })
    }
}

export {ZoneCreatorSubTool}