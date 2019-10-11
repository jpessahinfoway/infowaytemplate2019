import {ZoneCreatorSubTool} from "./parent/ZoneCreatorSubTool.js";

class ZoneTextCreatorTool extends ZoneCreatorSubTool{
    constructor(){
        super();
        this.type='text';
    }
}

export {ZoneTextCreatorTool}