import {TemplateTool} from './parent/TemplateTool.js'
import {ZonePriceCreatorTool} from "./subtools/zoneCreator/ZonePriceCreatorTool.js";
import {ZoneTextCreatorTool} from "./subtools/zoneCreator/ZoneTextCreatorTool.js";
import {ZoneMediaCreatorTool} from "./subtools/zoneCreator/ZoneMediaCreatorTool.js";
import {Observable} from "../pattern/observer/Observable.js";
class ZoneCreatorTool extends TemplateTool{

    constructor(templateInterface){
        super(templateInterface);
        this.description = 'Ajouter une zone';
        this.zoneType=this.setZoneType('zone');
        this.error = {};
        this.parentZone = null;
        this.$eventLocation.mousedown = $(document);
        this.$eventLocation.mousemove = $(document);
        this.$eventLocation.mouseup = $(document);
        this.zoneStartPosition = null;
        this.zoneLastSize = null;
        this.$zoneInWork = null;
        this.addSubTools();
        this.zoneCreationObservable = new Observable();
        this.referent = $('.container-zone')
    }

    //Ajout des sous-outils
    addSubTools(){
        this.addSubTool(new ZonePriceCreatorTool(this.interface));
        this.addSubTool(new ZoneTextCreatorTool(this.interface));
        this.addSubTool(new ZoneMediaCreatorTool(this.interface));
    }
    setZoneType(zone){
        this.zoneType=zone
    }

    displayErrorMessage(){
        console.log(this.error.message)
    }

    setError(value){
            this.error.status =value;
            this.error.message = value ? value : null
        console.log('set error : '+this.error.status)
    }


    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                this.$eventLocation.mousedown.on('mousedown.'+this.constructor.name,(e)=> {
                    let $target = $(e.target);

                    if($target.hasClass('zone')&& this.parentZone===null){
                        let zoneClicked = this.interface.currentTemplate.getZone($target.data('zone'));
                        this.parentZone = zoneClicked.type==='zone'?zoneClicked:zoneClicked.parent();
                        this.zoneCreationObservable.notify(this.parentZone);
                    }


                   if($(e.target).hasClass('bloc-menu'))return;

                    let workZone = $('.container-zone');

                    this.lastMousePosition = {x: e.pageX - workZone.offset().left, y: e.pageY - workZone.offset().top};

                    let cursorPositionInTemplate = this.getCursorPositionInTemplate(e,workZone);

                    this.activated = true;
                    this.zoneStartPosition = cursorPositionInTemplate;
                    this.zoneCreationObservable.notify(e.target)

                    
                    Object.keys(
                        this.zoneStartPosition).map(positionKey=>{
                            this.zoneStartPosition[positionKey]<0 ? this.activated=false:''}
                        );
                   
                    this.zoneLastSize = {width : 0, height:0};

                    this.$eventLocation.mousemove.on('mousemove.'+this.constructor.name, (e) => {

                        cursorPositionInTemplate = this.getCursorPositionInTemplate(e,workZone);
                        console.log(this.referent);
                        let referentPositionInTemplate = this.getCursorPositionInTemplate(e,this.referent);


                        this.zoneCreationObservable.notify(e.target);

                        console.log(this.activated)

                        console.log(this.referent.position())
                        let referentPosition = this.referent.position()

                        if(!this.activated && referentPositionInTemplate.top >= -1 && referentPositionInTemplate.left <= this.referent.width() && cursorPositionInTemplate.left >= -1){

                            Object.keys(this.zoneStartPosition).map(  positionKey  => this.zoneStartPosition[positionKey]=this.zoneStartPosition[positionKey]<referentPosition[positionKey]?referentPosition[positionKey]:this.zoneStartPosition[positionKey]);
                            this.activated=true;
                        }
                        if (this.activated ) {
                          /*  if(this.error.status){
                                this.displayErrorMessage()
                                return
                            }*/
                            console.log('ici')
                            this.zoneLastSize.width =  cursorPositionInTemplate.left>this.interface.currentTemplate.getSize().width?this.interface.currentTemplate.getSize().width- this.zoneStartPosition.left:cursorPositionInTemplate.left- this.zoneStartPosition.left;
                            this.zoneLastSize.height =  cursorPositionInTemplate.top>this.interface.currentTemplate.getSize().height? this.interface.currentTemplate.getSize().height-this.zoneStartPosition.top:cursorPositionInTemplate.top- this.zoneStartPosition.top ;



                            if (!this.$zoneInWork){

                                this.$zoneInWork = this.interface.currentTemplate.createNewZone(this.zoneStartPosition, this.zoneLastSize,this.zoneType);
                            }
                            else{
                                this.$zoneInWork.setSize({width:this.zoneLastSize.width,height: this.zoneLastSize.height})
                            }
                            //debugger
                        }
                    });
                })
                this.$eventLocation.mouseup.on('mouseup.'+this.constructor.name, (e) => {
                    this.$zoneInWork=null;
                    this.activated = false;
                    this.parentZone=null;
                    this.$eventLocation.mouseup.unbind('mousemove.'+this.constructor.name);
                })
            }else if(mode==='off'){
                this.$eventLocation.mouseup.unbind('mouseup.'+this.constructor.name);
                this.$eventLocation.mousedown.unbind('mousedown.'+this.constructor.name);
                this.$eventLocation.mousemove.unbind('mousemove.'+this.constructor.name);
            }
        })
    }

}

export {ZoneCreatorTool}