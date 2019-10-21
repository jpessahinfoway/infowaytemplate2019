import {Zone} from "./Zone";

class Template{
    constructor(){
        this.$location= $('.container-zone');
        this._name = null;
        this._attr = {
            _size           :   {},
            _orientation    :   null,
            _id             :   null,
            _scale          :   1
        };
        this._zones = {}

    }

    getSize(){
        console.log(this._attr._size)
        return this._attr._size;
    }

    setCurrentScale(scale){
        this._attr._scale = scale
        console.log(this._attr._scale)
    }

    getCurrentScale(){
        console.log(this._attr._scale)
        return this._attr._scale;
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
            this.$location.width(width)
        };
        if(height!==null){
            this._attr._size._height=height
            this.$location.height(height)
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
        this.$location.attr('id',id)
    }

    show(){
        console.log(this.$location)
        console.log('iciii')
        this.$location.fadeIn()
    }

    createNewZone(position={top:0,left:0},size={width:0,height:0},zoneType='zone'){
        let zoneId = null;
        let zIndex = Object.keys(this._zones).length;
        console.log(Object.keys(this._zones))
        for(let i=0; i<=Object.keys(this._zones).length+1;i++){
            if(!(i in this._zones)){
                zoneId=i;
                break;
            }else{
                console.log(this._zones)
            }
        }
        let zone = new Zone({position:position,size:size,type:zoneType});
        zone.create();
        zone.setZIndex(zIndex);
        zone.setIdentificator(zoneId);
        zone.setLocation(this.$location,true);
        zone.attachToTemplate(this);
        console.log(this._zones)
        return zone;
    }

}

export {Template}