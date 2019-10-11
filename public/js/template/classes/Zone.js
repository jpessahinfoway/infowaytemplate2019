import {Observable} from "./pattern/observer/Observable.js";


class Zone{
    constructor({size={width:0,height:0}, type='zone', position = {top:0,left:0}}={}){
        this.$zone= null;
        this.$zoneAddOnContainer = $('<div></div>')
        this.type = type;
        this.size = size;
        this.position = position;
        this.backgroundColor = 'rgb(255, 119, 119)';
        this.identificator = null;
        this.location=null;
        this.parent=null;
        this.zonePropertiesChangeObservable = new Observable()
    }


    setType(type){
        this.type=type;
    }

    getSize(){
        return this.size
    }

    getPosition(){
        return this.position
    }

    create({id=this.id,position=this.position,color=this.backgroundColor,size=this.size}={}){
        this.$zone =  $('<div></div>');
        this.$zone.css("position","absolute");
        this.$zone.addClass("zone");
        if(this.type!=='zone')this.$zone.addClass(`${this.type}-zone`);
        this.setSize(size);
        //this.setColor(color);
        this.setPosition(position);
        console.log('ici')
        //this.setIdentificator(id);
    }

    delete(){
        this.$zone.remove();
    }

    setZIndex(zIndex){
        console.log(this)
        console.log(zIndex)
        this.zIndex = zIndex;
        this.$zone.css('z-index', zIndex);
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
        console.log(this.$zone)
        console.log(this.$zone.attr("id"))
    }

    appendIt(location = this.location){
        if(location !== null)this.location.append(this.$zone)
    }

    setLocation(location,append=false){
        if(typeof append !== 'boolean')return
        this.location = location;
        if(append)this.appendIt()
    }


    setPosition(position = this.position){
        if(position.left){
            this.position.left=position.left
        }
        if(position.top){
            this.position.top = position.top;
        }
        this.$zone.css({top:position.top,left:position.left});
        this.zonePropertiesChangeObservable.notify(this,{pos:position});
    }

    setSize(size = this.size) {
        if(size.width){
           
            this.$zone.width(size.width);
            this.size.width=size.width
        }
        if(size.height){
            this.$zone.height(size.height);
            this.size.height = size.height;
        }
        this.zonePropertiesChangeObservable.notify(this,{size:size});
    }

    setColor(color = this.backgroundColor){
        this.$zone.css({'background-color':color, 'opacity' : 0.4});
    }
}

export {Zone}