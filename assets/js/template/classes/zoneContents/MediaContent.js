import {Content} from "./Content";

class MediaContent extends Content{
    constructor(filename){
        super(filename)
        this.type = 'media';
        this.url = `/build/medias/${filename}`;
        this.html = `<img src="${this.url}">`
    }
}
export {MediaContent}