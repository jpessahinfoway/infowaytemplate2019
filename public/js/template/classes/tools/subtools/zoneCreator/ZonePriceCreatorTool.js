import {ZoneCreatorSubTool} from "./parent/ZoneCreatorSubTool.js";

class ZonePriceCreator extends ZoneCreatorSubTool{
    constructor(){
        super();
        this.type='price';
    }
}

export {ZonePriceCreator}