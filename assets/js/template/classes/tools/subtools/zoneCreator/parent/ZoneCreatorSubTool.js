import {TemplateSubTool} from "../../parent/TemplateSubTool.js";
import {Zone} from "../../../../Zone.js";
import {Observer} from "../../../../pattern/observer/Observer.js";

class ZoneCreatorSubTool extends TemplateSubTool{
    constructor(){
        super();
        this.type=null;
        this.zoneCreatorObserver=null;
        this.initZoneCreatorObserver();
        this.authorizationOfCreateSubZone=false;
    }



    initZoneCreatorObserver(){
        this.zoneCreatorObserver = new Observer()
        console.log('jog')
        this.zoneCreatorObserver.observerFunction((observer)=>{ this.sendAuthorization(observer.data[0], observer.data[1]) })
    }

    sendAuthorization(reset,target){
        if(reset)this.authorizationOfCreateSubZone=false;
        if(!this.authorizationOfCreateSubZone){

            this.parentTool.setUsingToolAuthorization(false);
            let $target = $(target);

            if($target.hasClass('zone')){
                let currentParent = this.parentTool.interface.currentTemplate.getZone($target.data('zone'));
                let referent = null;

                if      (currentParent.type==='zone') referent=currentParent;
                else if (currentParent.zoneParent!==null && currentParent.zoneParent instanceof Zone) referent=currentParent.zoneParent;
                else return;

                this.parentTool.initZoneStartPosition( {left:this.parentTool.cursorPosition.template.x, top:this.parentTool.cursorPosition.template.y } );
                if (this.parentTool.currentZone.instance === null){
                    console.log(this.type)
                    this.parentTool.currentZone.instance = this.parentTool.interface.currentTemplate.createNewZone(this.parentTool.currentZone.pos, this.parentTool.currentZone.size,this.type);
                }
                this.parentTool.referent = referent;
                this.parentTool.currentZone.instance.setParent(referent)

                this.parentTool.setUsingToolAuthorization(true)
                this.authorizationOfCreateSubZone=true;
            }
        }
    }

    resetAuthorization(){

    }

    changeZoneTypeInCreatorTool(){
        console.log(this.type)
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
                this.parentTool.zoneCreationObservable.removeObserver(this.zoneCreatorObserver)

            }
        })
    }
}

export {ZoneCreatorSubTool}