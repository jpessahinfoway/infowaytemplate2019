import {Observable} from "./pattern/observer/Observable";


class Zone{
    constructor({size={width:0,height:0}, type='zone', position = {top:0,left:0}}={}){
        this.$location= null;
        this.$contentSpan = null
        this.$locationAddOnContainer = $('<div></div>')
        this.type = type;
        this.size = size;
        this.zoneContent = null;
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

    add$ElementInZone($element){
        this.$location.append($element)
    }

    setZoneBackground(background){
        this.background = background;
        console.log(background.url)
        this.$zone.css("background-image", "url(" + background.url + ")");
    }

    setZoneContent(content){
        this.content = content;
        this.zoneContent.html(this.content.html)
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

    }

    unAssociateZone(zoneToUnAssociate){
        delete this.associatedZone[zoneToUnAssociate.identificator];
        delete zoneToUnAssociate.associatedZone[this.identificator];
    }

    getSize(){
        return this.size
    }

    getPosition(){
        return this.position
    }

    create({id=this.id,position=this.position,color=this.backgroundColor,size=this.size}={}){
        this.$zone =  $(`<div data-type="${this.type}"></div>`);

        this.$location = $(`<div class="${this.type}type-wrapper"></div>`)
        this.$contentSpan=$('<span class="zone-infos-content"></span>')

        this.zoneContent=$('<div class="zone-content"></div>')
        this.$zone.append(this.$contentSpan).append(this.zoneContent)
        this.$location.append(this.$zone)
        this.$zone.addClass("zone");
        if(this.type!=='zone')this.$zone.addClass(`${this.type}-zone`);
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

        this.$zone.data('zone',id);
        this.$zone.attr("id",this.name);

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