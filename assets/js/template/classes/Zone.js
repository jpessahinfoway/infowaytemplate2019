import {Observable} from "./pattern/observer/Observable";
import {BackgroundContent} from "./zoneContents/BackgroundContent";
import {Incruste} from "./objects/incrustes/Incruste";


class Zone{

    constructor({size={width:0,height:0}, type='zone', position = {top:0,left:0}}={}){
        this._$container= null;
        this.$contentSpan = null
        this.$containerAddOnContainer = $('<div></div>')
        this.type = type;
        this._size = size;
        this._position = position ;
        this.zoneContent = null;
        this.zoneChildrens = {};
        this.zoneParent = null;
        this.associatedZone = {};
        this.backgroundColor = 'rgb(255, 119, 119)';
        this.identificator = null;
        this.location=null;
        this.parent=null;
        this.background = {}
        this.zonePropertiesChangeObservable = new Observable()
    }

    get size() {
        if(typeof this.$zone === 'undefined' || this.$zone === null || this.$zone.length <1)return
        return { width : this.$zone.width(), height : this.$zone.height() };
    }


    set size(size) {
        if(this.$zone === null  || this.$zone.length <1) return ;

        if (typeof size.width === 'number'){
            this.$zone.css('width',size.width);
            this.size.width = this.$zone.width();
        }
        if(typeof size.height === 'number'){
            this.$zone.css('height',size.height);
            this.size.height = this.$zone.height();
        }
    }
    get position() {
        let elementPositionable = (typeof this.$container !== 'undefined' && this.$container !== null && this.$container.length >1) ? this.$container : this.$zone ;

        if(typeof elementPositionable === 'undefined' || elementPositionable === null || elementPositionable <1)return
        const { left , top } = elementPositionable.position();
        return { left , top };
    }


    set position(position) {

        let elementPositionable = (typeof this.$container !== 'undefined' && this.$container !== null && this.$container.length >0) ? this.$container : this.$zone ;


        if(typeof elementPositionable === 'undefined' || elementPositionable === null  || elementPositionable.length <1) return ;

        if (typeof position.left === 'number'){
            elementPositionable.css('left',position.left);
            this.position.left = elementPositionable.position().left;
        }

        if (typeof position.top === 'number'){
            elementPositionable.css('top',position.top);
            this.position.top = elementPositionable.position().top;
        }
    }

    setParent(zone){
        this.zoneParent = zone;
        zone.addChildren(this)
    }

    addChildren(zone){
        this.zoneChildrens[zone.identificator]=zone
    }

    add$ElementInZone($element){
        this.$container.append($element)
    }

    setZoneBackground(background){

        if(typeof background !== 'object' && !(background instanceof BackgroundContent) ) return;

        this.background[background.type] = background;

        this.$container.css(background.property, background.propertyValue);
        console.log(background.propertyValue)
    }

    setZoneContent(content){
       if(typeof content === 'object' && content instanceof Incruste){
           this.content = content;
           this.zoneContent.html(this.content.buildHTML());
       }
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

    create({id=this.id,position=this._position,color=this.backgroundColor,size=this.size}={}){


        this.$zone =  $(`<div class="zone" data-type="${this.type}" ></div>`);


        this.$zoneInfosContainer=$('<span class="zone-infos-content"></span>');
        this.$zoneContentContainer=$('<div class="zone-content"></div>');
        this.$zone.append(this.$zoneInfosContainer).append(this.$zoneContentContainer);




        return this.$zone
    }

    isAssociatedTo(zone){
       return Object.values(this.associatedZone).includes(zone)
    }

    delete(){
        this.$container.remove();
    }

    setZIndex(zIndex){
    if (this.$container !== null && this.$container.length > 0) this.$container.css('z-index', zIndex);
    this.zIndex = zIndex;
    }

    attachToTemplate(template){
        template.addZone(this);
    }

    setIdentificator(id){

        this.identificator = id;

        this.name = "zone-"+id;

        this.$zone.data('zone',id);
        this.$zone.attr("id",this.name);

    }


    get $container() {
        return this._$container;
    }

    set $container($container){
        if ($container.length<1 ) return ;
        this._$container = $container;

        if(this.zIndex !== null) this._$container.css('zIndex',this.zIndex);

        this._$container.append(this.$zone)



    }

    appendZone(){
        if(typeof this.$container == null || this.$container.length <1)return
        this.$container.append(this.$container)
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
        this.$container.css({top:position.top,left:position.left});
        this.zonePropertiesChangeObservable.notify(this,{pos:position});
    }

    setSize(size = this.size) {
        if(typeof size.width ==='number'){
           
            this.$zone.width(size.width);
            this.size.width=size.width
        }
        if(typeof size.width ==='number'){
            this.$zone.height(size.height);
            this.size.height = size.height;
        }
        this.zonePropertiesChangeObservable.notify(this,{size:size});
    }

    setColor(color = this.backgroundColor){
        this.$container.css({'background-color':color, 'opacity' : 0.4});
    }
}

export {Zone}