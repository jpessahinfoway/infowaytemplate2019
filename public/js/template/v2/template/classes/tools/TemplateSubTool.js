import {TemplateTool} from "../TemplateTool.js";

class TemplateSubTool extends TemplateTool{
    constructor(template){
        super(template)
        this.iconContainer=$(`<span title="${this.title}" class="${this.name}" data-subtool="${this.constructor.name}"></span>`);
    }

}

export {TemplateSubTool}