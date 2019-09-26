class Template{
    constructor(){
        this.$template= $('.container-zone');
        this._name = null;
        this._attr = {
            _size           :   null,
            _orientation    :   null,
            _id             :   null,
        };

    }

    setSize({width=null,height=null}){
        if(width!==null)this._attr._size._width=width;
        if(height!==null)this._attr._size._height=height;
    }

    setOrientation(orientation=null){
        if(orientation !== null){
            if  (orientation !== 'H'   ||   orientation !== 'V')    return;

            this._attr._orientation  =  orientation;
            orientation  ===  'H' ?  this.setSize({width:'1500px',height:'1200px'})  :  this.setSize({width:'1200',height:'1500'})
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

}

export {Template}