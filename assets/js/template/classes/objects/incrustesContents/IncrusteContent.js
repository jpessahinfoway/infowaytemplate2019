class IncrusteContent{
    constructor(){
        this.name = null;
        this.type = null;
        this.style = null;
        this.content = null;
        this.html = null;
        this.subContents = {}
        this.incrustOrder = 0;
        this.className = null;
    }


    setContent(content){
        this.content = content
    }

    getOrder() {
        return this.incrustOrder;
    }

    setOrder(value) {
        this.incrustOrder = value;
    }
    setName(name){
        this.name = name;
    }
    setType(type){
        this.type(type)
    }

    setStyle(style){
        this.style = style;
    }

    addSubContents(...subContents) {
        subContents.forEach( subContent => {

            if( typeof subContent === 'object'   &&   typeof this.subContents[subContent.constructor.name.replace('Content','').toLowerCase()] !== undefined   &&   typeof this.subContents[subContent.type] !==  undefined ){
                this.subContents[subContent.type] = subContent
            }
        })
    }

}
export {IncrusteContent}