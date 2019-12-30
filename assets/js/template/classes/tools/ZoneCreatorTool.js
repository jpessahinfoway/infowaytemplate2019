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
        this.error = true;

        this.currentZone = {
            instance : null,
            pos : {
                left : null,
                top:  null
            },
            size : {
                width : 0,
                height: 0
            },
        };
        this.$eventLocation.mousedown = $(document);
        this.$eventLocation.mousemove = $(document);
        this.$eventLocation.mouseup = $(document);
        this.firstClick = null;
        this.cursorPosition = {
            template : null,
            referent : null
        };
        this.addSubTools(
            new ZonePriceCreatorTool(this.interface,this),
            new ZoneTextCreatorTool(this.interface,this),
            new ZoneMediaCreatorTool(this.interface,this)
        );
        this.zoneCreationObservable = new Observable();
        this.referent = this.interface.currentTemplate
        this.currentZoneMaximumSize = {
            width :null,
            height : null
        }
    }


    setZoneType(zone){
        this.zoneType=zone
    }

    initZoneStartPosition(position){
        this.currentZone.pos=position
    }

    setUsingToolAuthorization(boolean){
        this.usingToolAuthorization=boolean
    }

    outOfParentZoneLimit(cursorPosition,$parent){

        let outOfParent=false;

        if(cursorPosition.x < 0 || cursorPosition.x > $parent.width())  outOfParent=true;
        if(cursorPosition.y < 0 || cursorPosition.y > $parent.height())  outOfParent=true;

        return outOfParent
    }

    resetCurrentZoneValues(){
        this.currentZone = {
            instance : null,
            pos : {
                left : null,
                top:  null
            },
            size : {
                width : 0,
                height: 0
            },
        };
    }

    setCursorPosition(cursorPosition,objectReference){
        console.log(cursorPosition)
        this.cursorPosition[objectReference] = cursorPosition;
    }
    activeTool(active) {
        super.activeTool(active);
        if (active) {
            this.$eventLocation.mousedown.on('mousedown.' + this.constructor.name, (e) => {


                this.setUsingToolAuthorization(true);

                // element en dessous du click
                let $target = $(e.target);

                // si on clique sur un element du menu on n'active pas l outil
                if ($target.hasClass('bloc-menu')) return;

                // correspond a la zone de travail. ici toute la fenetre du template
                let workZone = $('.container-zone');

                // position du curseur dans le template
                this.setCursorPosition(this.getCursorPositionInTemplate(e, workZone), 'template');
                this.setCursorPosition(this.getCursorPositionInTemplate(e, workZone), 'referent');
                this.firstClick = this.cursorPosition.template

                // notifie les observateurs des outils de creation de sous zones
                this.zoneCreationObservable.notify(false, e.target)

                // si on a cliqué en dehors de la zone du template on autorise pas l utilisation de l outil pour le moment
                if (this.outOfParentZoneLimit(this.cursorPosition.referent, this.referent.$container)) this.setUsingToolAuthorization(false);

                if (this.usingToolAuthorization && (this.currentZone.pos.left === null && this.currentZone.pos.top === null)) {
                    this.initZoneStartPosition({
                        left: this.cursorPosition.referent.x,
                        top: this.cursorPosition.referent.y
                    })
                }

                // Lorsqu'on bouge le curseur
                this.$eventLocation.mousemove.on('mousemove.' + this.constructor.name, (e) => {

                    this.setUsingToolAuthorization(true);

                    // On recupere la nouvelle position du curseur dans le template
                    this.setCursorPosition(this.getCursorPositionInTemplate(e, workZone), 'template');

                    // On recupere la position du complete par rapport au referant (son parent)
                    console.log(this.referent.$container)
                    this.setCursorPosition(this.getCursorPositionInTemplate(e, this.referent.$container), 'referent')

                    // notifie les observateurs des outils de creation de sous zones
                    this.zoneCreationObservable.notify(false, e.target);


                    if (this.outOfParentZoneLimit(this.cursorPosition.referent, this.referent.$container)) {
                        if (this.cursorPosition.referent.x < 0 || this.cursorPosition.referent.y < 0) this.setUsingToolAuthorization(false);
                    }

                    console.log(this.usingToolAuthorization)
                    if (this.usingToolAuthorization) {

                        if (this.usingToolAuthorization && (this.currentZone.pos.left === null && this.currentZone.pos.top === null)) {
                            let leftStartPosition = this.firstClick.x < this.referent.$container.position.left ? this.referent.$container.position.left : this.cursorPosition.template.x
                            let topStartPosition = this.firstClick.y < this.referent.$container.position.top ? this.referent.$container.position.top : this.cursorPosition.template.y;
                            this.initZoneStartPosition({left: leftStartPosition, top: topStartPosition})
                        }

                        if (this.currentZone.instance === null) {
                            this.currentZone.instance = this.interface.currentTemplate.createNewZone(this.currentZone.pos, this.currentZone.size, this.zoneType);
                        } else {
                            this.currentZone.size.width = this.cursorPosition.template.x - this.currentZone.pos.left;
                            this.currentZone.size.height = this.cursorPosition.template.y - this.currentZone.pos.top;
                            console.log(this.currentZone.size.height);
                            if (this.outOfParentZoneLimit(this.cursorPosition.referent, this.referent.$container)) {
                                console.log(this.referent.size)
                                if (this.cursorPosition.referent.x > this.referent.size.width) {
                                    this.currentZone.size.width = this.referent.size.width - (this.currentZone.pos.left - this.referent.position.left)
                                }
                                if (this.cursorPosition.referent.y > this.referent.size.height) {
                                    console.log(this.cursorPosition.referent.y);
                                    console.log(this.referent)
                                    this.currentZone.size.height = this.referent.size.height - (this.currentZone.pos.top - this.referent.position.top)
                                }
                            }

                            console.log(this.currentZone.instance)
                            this.currentZone.instance.size = {
                                width: this.currentZone.size.width,
                                height: this.currentZone.size.height
                            }
                        }
                        //debugger
                    }
                });
            });
            this.$eventLocation.mouseup.on('mouseup.' + this.constructor.name, (e) => {

                if (this.currentZone.instance !== null && (this.currentZone.instance.size.width < 5 || this.currentZone.instance.size.height < 5)) this.interface.currentTemplate.deleteZoneInTemplate(this.currentZone.instance.identificator);

                this.zoneCreationObservable.notify(true);
                this.resetCurrentZoneValues()
                this.usingToolAuthorization = false;
                //this.error=true;
                this.$eventLocation.mouseup.unbind('mousemove.' + this.constructor.name);
            })
        } else {
            this.$eventLocation.mouseup.unbind('mouseup.' + this.constructor.name);
            this.$eventLocation.mousedown.unbind('mousedown.' + this.constructor.name);
            this.$eventLocation.mousemove.unbind('mousemove.' + this.constructor.name);
        }

    }
}

export {ZoneCreatorTool}