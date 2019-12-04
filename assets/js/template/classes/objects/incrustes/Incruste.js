
class Incruste{
    constructor(){
        this.name = null;
        this.contents = {};
        this.type = null;
    }

    setName(name){
        this.name = name;
    }
    addContent(content){
        this.contents[content.subType]=content;
        return this;
    }

    setType(type){
        this.type = type;
    }

}
export {Incruste}