import {ZoneCreatorSubTool} from "./parent/ZoneCreatorSubTool.js";

class ZoneMediaCreatorTool extends ZoneCreatorSubTool{
    constructor(){
        super();
        this.type='media';
    }
}

export {ZoneMediaCreatorTool}