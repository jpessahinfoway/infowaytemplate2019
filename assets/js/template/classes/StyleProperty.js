class StyleProperty{
    constructor({name = null, value=null, unity=null, before=null, after=null, cssValue=null, parentProperty=null} = {}){
        this.name = name;
        this.subProperties = {};
        this.value = value;
        this.unity = unity;
        this.before = before;
        this.after = after;
        this.setParentProperty(parentProperty);
        this.propertyWritting = this.buildPropertyWritting();
    }

    setParentProperty(parentProperty){
        if(parentProperty instanceof StyleProperty){
            this.parentProperty = parentProperty;
            parentProperty.addSubProperty(this);
            return parentProperty
        }else return null
    }

    isSubProperty(){
        return ( this.parentProperty instanceof StyleProperty && Object.values(this.parentProperty.subProperties).indexOf(this)> -1 )
    }

    addSubProperty(subPropertie){
        if(subPropertie instanceof StyleProperty){
            this.subProperties[subPropertie.name]=subPropertie
           // subPropertie.buildPropertyWritting();
          //  this.buildPropertyWritting();
        }
    }

    buildPropertyWritting(){
        this.propertyWritting = '';

        if(this.parentProperty !==null && typeof this.parentProperty !== 'undefined') {
            this.propertyWritting +=  this.name
        };

        let subPropertiesArray = Object.values(this.subProperties)
        console.log(subPropertiesArray)

        if(Array.isArray(subPropertiesArray) && subPropertiesArray.length > 0){
            console.log('gfgdf')
            subPropertiesArray.map((subProperty , index )=> {
                this.propertyWritting +=subProperty.propertyWritting;
                if(index !== subPropertiesArray.length -1)this.propertyWritting+=',';
            });
        }else{

            if(this.before !== null) this.propertyWritting += this.before;
            this.propertyWritting += this.value;
            if(this.unity !== null) this.propertyWritting += this.unity;
            if(this.after !== null) this.propertyWritting += this.after;
        }

        if(typeof this.parentProperty !== 'undefined')this.parentProperty.buildPropertyWritting()

        return this.propertyWritting
    }
}

export{StyleProperty}