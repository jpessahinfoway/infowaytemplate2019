import {ZoneCreatorSubTool} from "./parent/ZoneCreatorSubTool.js";

class ZonePriceCreatorTool extends ZoneCreatorSubTool{
    constructor(){
        super();
        this.type='price';
    }

}

export {ZonePriceCreatorTool}