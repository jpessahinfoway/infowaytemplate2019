import {Content} from "./Content";

class BackgroundContent extends Content{
    constructor(filename){
        super(filename)
        this.type = 'image';
        this.url = `/build/backgrounds/${filename}`;
    }
}
export {BackgroundContent}