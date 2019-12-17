
class Incruste{
    constructor(){
        this.name = null;
        this.contents = {};
        this.type = null;
        this._id = null;
        this.html = ''
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    setName(name){
        this.name = name;
    }
    addContent(content){
        this.contents[content.type]=content;
        return this;
    }

    buildHTML(){
        this.html='';
        Object.values(this.contents).map(content => this.html += content.buildHTML())
        return this.html
    }

    setType(type){
        this.type = type;
    }

}
export {Incruste}