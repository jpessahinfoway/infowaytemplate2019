import {Observable} from "./pattern/observer/Observable";


class Zone{
    constructor({size={width:0,height:0}, type='zone', position = {top:0,left:0}}={}){
        this.$location= null;
        this.$contentSpan = null
        this.$locationAddOnContainer = $('<div></div>')
        this.type = type;
        this.size = size;
        this.zoneChildrens = {};
        this.zoneParent = null;
        this.associatedZone = {};
        this.position = position;
        this.backgroundColor = 'rgb(255, 119, 119)';
        this.identificator = null;
        this.location=null;
        this.parent=null;
        this.zonePropertiesChangeObservable = new Observable()
    }

    setParent(zone){
        this.zoneParent = zone;
        zone.addChildren(this)
    }

    addChildren(zone){
        this.zoneChildrens[zone.identificator]=zone
    }

    putTextInZone(text){
        this.$contentSpan.text(text)
    }
    setType(type){
        this.type=type;
    }

    associateZone(zoneToAssociate){
        this.associatedZone[zoneToAssociate.identificator]=zoneToAssociate;
        zoneToAssociate.associatedZone[this.identificator]=this;

        console.log(this.associatedZone)
        console.log(zoneToAssociate.associatedZone)
    }

    unAssociateZone(zoneToUnAssociate){
        delete this.associatedZone[zoneToUnAssociate.identificator];
        delete zoneToUnAssociate.associatedZone[this.identificator];
        console.log(this.associatedZone)
        console.log(zoneToUnAssociate.associatedZone)
    }

    getSize(){
        return this.size
    }

    getPosition(){
        return this.position
    }

    create({id=this.id,position=this.position,color=this.backgroundColor,size=this.size}={}){
        this.$location =  $(`<div data-type="${this.type}"></div>`);
        this.$contentSpan=$('<span class="zone-infos-content"></span>')
        this.$location.append(this.$contentSpan);
        this.$location.css("position","absolute");
        this.$location.addClass("zone");
        if(this.type!=='zone')this.$location.addClass(`${this.type}-zone`);
        this.setSize(size);
        this.setPosition(position);
    }

    isAssociatedTo(zone){
       return Object.values(this.associatedZone).includes(zone)
    }

    delete(){
        this.$location.remove();
    }

    setZIndex(zIndex){
        console.log(this)
        console.log(zIndex)
        this.zIndex = zIndex;
        this.$location.css('z-index', zIndex);
    }

    attachToTemplate(template){
        template.addZone(this);
    }

    setIdentificator(id){
        console.log('ici')

        this.identificator = id;

        this.name = "zone-"+id;

        this.$location.data('zone',id);
        this.$location.attr("id",this.name);
        console.log(this.$location)
        console.log(this.$location.attr("id"))
    }

    appendIt(location = this.location){
        if(location !== null)this.location.append(this.$location)
    }

    setLocation(location,append=false){
        if(typeof append !== 'boolean')return
        this.location = location;
        if(append)this.appendIt()
    }


    setPosition(position = {top:null, left:null}){
        console.log(position)
        if(position.left!==null){
            this.position.left=position.left
        }
        if(position.top!==null){
            this.position.top = position.top;
            console.log(this.position.top)
        }
        this.$location.css({top:position.top,left:position.left});
        this.zonePropertiesChangeObservable.notify(this,{pos:position});
    }

    setSize(size = this.size) {
        if(size.width){
           
            this.$location.width(size.width);
            this.size.width=size.width
        }
        if(size.height){
            this.$location.height(size.height);
            this.size.height = size.height;
        }
        this.zonePropertiesChangeObservable.notify(this,{size:size});
    }

    setColor(color = this.backgroundColor){
        this.$location.css({'background-color':color, 'opacity' : 0.4});
    }
}

export {Zone}