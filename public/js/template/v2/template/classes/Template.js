import {Zone} from "./Zone.js";

class Template{
    constructor(){
        this.$template= $('.container-zone');
        this._name = null;
        this._attr = {
            _size           :   {},
            _orientation    :   null,
            _id             :   null,
        };
        this._zones = {}

    }

    getSize(){
        console.log(this._attr._size)
        return this._attr._size;
    }

    getZone(id){
        return this._zones[id]
    }

    deleteZoneInTemplate(id){
        this.getZone(id).delete();
        delete this._zones[id];
    }

    getZones(){
        return this._zones;
    }

    addZone(zone){
        this._zones[zone.identificator]=zone
    }
    setSize({width=null,height=null}){
        if(width!==null){
            this._attr._size._width=width
            this.$template.width(width)
        };
        if(height!==null){
            this._attr._size._height=height
            this.$template.height(height)
        };
    }

    setOrientation(orientation=null){
        if(orientation !== null){
            if  (orientation !== 'H'   &&   orientation !== 'V')    return;

            this._attr._orientation  =  orientation;

            orientation  ===  'H' ?  this.setSize({width:'1280',height:'720'})  :  this.setSize({width:'720',height:'1280'})
        }
    }

    setName(name=null){
        if(name!==null){
            this._name=name;
            this.setId(name)
        }

    }


    setId(id=null){
        if(name!==null)this._attr._id='#'+id;
        this.$template.attr('id',id)
    }

    show(){
        this.$template.fadeIn()
    }

    createNewZone(position={top:0,left:0},size={width:0,height:0}){
        let zoneId = null;
        let zIndex = Object.keys(this._zones).length;
        for(let i=0; i<=Object.keys(this._zones).length+1;i++){
            if(!(i in this._zones)){
                zoneId=i;
                break;
            }
        }
        let zone = new Zone({position:position,size:size});
        zone.create();
        zone.setZIndex(zIndex);
        zone.setIdentificator(zoneId);
        zone.setLocation(this.$template,true);
        zone.attachToTemplate(this);
        return zone;
    }

}

export {Template}