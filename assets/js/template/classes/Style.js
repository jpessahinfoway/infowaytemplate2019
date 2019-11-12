class Style{
    constructor(){
        this.color = null;
        this.fontSize = null;
        this.textAlign = null;
        this.fontFamily = null;
        this.fontWeight = null;
        this.fontStyle=null;
        this.background = null;
        this.textDecoration = null;
        this.transform = {};
    }

    hydrate(stylePropertiesList){
        console.log(stylePropertiesList)
        stylePropertiesList.forEach( styleProperty => {
           let propertyNameToCamelCase = styleProperty.name.replace(
                /([-_][a-z])/g,
                (group) => group.toUpperCase()
                    .replace('-', '')
                    .replace('_', '')
            )
            if(typeof this[propertyNameToCamelCase] !== 'undefined')this[propertyNameToCamelCase] = styleProperty
        })
        console.log(this)
    }

    setTarget(target){
        this.target = target
    };

    setColor(color){
        this.color = color
    }

    setSize(size){
        this.size = size
    }

    setTextAlign(textAlign){
        this.textAlign = textAlign
    }
    
    setFontFamily(fontFamily){
        this.fontFamily=fontFamily
    }

    setFontWeight(fontWeight){
        this.fontWeight = fontWeight
    }

    setFontStyle(fontStyle){
        this.fontStyle = fontStyle
    }

    setBackground(background){
        this.background = background
    }

    setTextDecoration(textDecoration){
        this.textDecoration = textDecoration
    }

    addTransformProperty(transformPropertyName, transformPropertyValue){
        this.transform[transformPropertyName] = transformPropertyValue;
    }
}
export {Style}