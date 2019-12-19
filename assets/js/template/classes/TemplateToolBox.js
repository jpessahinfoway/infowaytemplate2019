import {TemplateSubTool} from "./tools/subtools/parent/TemplateSubTool";
import {PermanentTool} from "./tools/parent/PermanentTool";
import {Observer} from "./pattern/observer/Observer";

class TemplateToolBox{
    constructor(){
        console.log('Hello Toolbox')

        this.$location = {
            ul : $('.tools > ul'),
        };

        this.activatedTool = {
            tool:null,
            subTool : null
        };

        this.tools={};

        this.toggleSubMenuOnMouseHover()

       /* this.iconsSize=null;
        this.casesProperties={size:null,background:'white'};
        //this.setToolBoxCaseSize({width:50,height:50});
        this.setIconSize(20);
        this.tools = {};
        this.subTools = {};
        this.activatedTool = {
            'tool' : null,
            'subTool' : null
        };
        this.lastActivatedToolBoxElements = {};
        this.initLastActivatedToolBoxElements();
        this.$location = {
            toolBox : $('#toolbar'),
            toolsContainer : $('.tools')
        };
        this.active()*/

    }


    disactiveAllTools(exception){
     let exceptionArray = exception;

     Object.keys(this.tools).forEach((tool)=>{
         if(!exceptionArray.includes(tool) && !(this.tools[tool].instance instanceof PermanentTool)){
             //this.activeToolInToolBox(this.tools[tool].name,false)
             this.activeToolInToolBox(tool,false);
             /*this.tools[tool].elements.li.removeClass('active-tool');
             this.tools[tool].instance.activeTool(false);*/
         }
         Object.keys(this.tools[tool].subTools).forEach(subTool=>{

             if(!exceptionArray.includes(subTool)){
                 this.activeToolInToolBox(subTool,false);
                 //this.activeToolInToolBox(this.tools[tool].subTools[subTool],false)
             }
         })
     })
 }

    toggleSubMenuOnMouseHover(){
        $('.toolbar')
            .on('mouseover','.tool' ,e=> {
                let current = $(e.currentTarget)
                console.log($(e.currentTarget))
                console.log($(current).children('ul.slider-menu'))
                $(current).children('ul.slider-menu').stop().slideDown('fast')
            })
            .on('mouseout','.tool', e => {
                let current = $(e.currentTarget)
                $(current).children('ul.slider-menu').stop().slideUp('fast')
            });
    }



    getParentTool(subToolName){
        let parentTool = null;
          Object.keys(this.tools).forEach((tool)=>{
              if(Object.keys(this.tools[tool].subTools).includes(subToolName))parentTool=tool
          });
        return parentTool
    }

     activeToolInToolBox(toolName,active=true){

     let element = Object.keys(this.tools).includes(toolName)?'tool':'subTool';

     console.log(toolName)
     console.log(element)
     let objectToActive = element==='tool'?this.tools[toolName]:this.tools[this.getParentTool(toolName)].subTools[toolName];

     let classToAdd = element==='tool'?'active-tool':'active-subTool';
     objectToActive.instance.activeTool(active);



     if(active){
         console.log(objectToActive)
         if(!(objectToActive.instance instanceof PermanentTool)){this.activatedTool[element]=objectToActive.instance};
         objectToActive.elements.li.addClass(classToAdd);
     }else{
         let currentToolsubTools = Object.values(objectToActive.instance.subTools);
         if(currentToolsubTools.length >0){
             currentToolsubTools.map(subTool=>{
                 if(!(subTool instanceof PermanentTool))this.activeToolInToolBox(subTool.name,false)
             });
         }
        if(this.activatedTool[element] !== null && this.activatedTool[element].name === toolName)this.activatedTool[element]=null;
         objectToActive.elements.li.removeClass(classToAdd);
     }

    }

    isElementClickedIsTool($element){
        return $element.hasClass('tool')
    }

    activeToolBoxEvents(){
        //Au click sur un element de la toolBox
        console.log($('.tools'))
        console.log(this.$location.ul)
        this.$location.ul.find('li').on('click',(e)=>{
            console.log('troi')
            e.stopPropagation();

            let elementClicked = $(e.currentTarget);

            let toolsToNotDisactivate = [];

            let subToolSelectioned = this.isElementClickedIsTool(elementClicked) ? null : $(e.currentTarget).data('subtool');
            let toolSelectioned = this.isElementClickedIsTool(elementClicked) ? $(e.currentTarget).data('tool') : $(e.currentTarget).parents('li.tool').data('tool');



            //Obligé de jamais desactiver l element en cour car si on le desactive lors du test pour savoir si il etait enablé il sera toujours a false et donc s activera a chaque fois meme en cas de click sur le meme icone (ou il devrait se desactiver)

            if(this.isElementClickedIsTool(elementClicked)){

                this.disactiveAllTools([toolSelectioned]);

                if(this.tools[toolSelectioned].instance.state !== 'enabled'){
                    this.activeToolInToolBox(this.tools[toolSelectioned].instance.name,true)
                }else{
                    this.activeToolInToolBox(this.tools[toolSelectioned].instance.name,false)
                }
            }else{

                if(this.activatedTool.subTool === null){

                    this.disactiveAllTools([]);
                    console.log(toolSelectioned)
                    this.activeToolInToolBox(this.tools[toolSelectioned].instance.name,true)
                    console.log(subToolSelectioned)
                    console.log(toolSelectioned)
                    this.activeToolInToolBox(this.tools[toolSelectioned].subTools[subToolSelectioned].instance.name,true)
                }else{
                    if(this.activatedTool.tool !== null && this.activatedTool.tool.name === toolSelectioned){

                        if(subToolSelectioned === this.activatedTool.subTool.name){
                            this.disactiveAllTools([])
                        }
                        else{
                            this.disactiveAllTools([toolSelectioned])
                            this.activeToolInToolBox(this.tools[toolSelectioned].subTools[subToolSelectioned].instance.name,true)
                        }
                    }else{

                        this.disactiveAllTools([])
                        console.log(this.tools[toolSelectioned].subTools[subToolSelectioned].instance.name);
                        this.activeToolInToolBox(this.tools[toolSelectioned].subTools[subToolSelectioned].instance.name,true)
                        this.activeToolInToolBox(this.tools[toolSelectioned].instance.name,true)
                    }
                }

            }

        })
    }



    addTool(tool){

        let currentTool;

        if(!(tool instanceof TemplateSubTool)){
            currentTool = this.tools[tool.name] ={};
            if(typeof currentTool.subTools === 'undefined')currentTool.subTools = {}
        }else{
            currentTool = this.tools[tool.parentTool.name].subTools[tool.name] = {};
        }

        currentTool.elements={};
        currentTool.attrs={};
        currentTool.instance=tool;

        currentTool.elements.span = $(`.${tool.name} span`);

        currentTool.elements.li    = $(`.${tool.name}`);

        currentTool.attrs.title = currentTool.instance.description;
        currentTool.attrs.icon = currentTool.elements.li.find('i').get(0);

        console.log(tool.subTools);
        Object.keys(tool.subTools).forEach(subTool=>{
            this.addTool(tool.subTools[subTool])
        })

    }

   /* initLastActivatedToolBoxElements(){
        this.lastActivatedToolBoxElements = {
            tool : {
                'li' : null,
                'i'  : null
            },
            subTool: {
                'li' : null,
                'i'  : "dfgdfg"
            }
        }
    }*/

   /* setLastActivatedToolBoxElements({tool = {li : false, i:false}, subTool = {li:false,i:false}} = {}){
        if(tool.li)this.lastActivatedToolBoxElements.tool.li=tool.li;
        if(tool.i)this.lastActivatedToolBoxElements.tool.i=tool.i;
        if(subTool.li)this.lastActivatedToolBoxElements.subTool.li=subTool.li;
        if(subTool.i) this.lastActivatedToolBoxElements.subTool.i = subTool.i
    }*/

    /*setToolBoxCaseSize(size){
        let access = true;

        if(typeof size.width === 'undefined' ||  !Number.isInteger(size.width)){
           
            access=false;
        }
        if(typeof size.height === 'undefined' ||  !Number.isInteger(size.width)){
           
            access=false;
        }

        if(!access)return;
        this.casesProperties.size=size;
    }*/
  /*  setIconSize(size){
        let access = true;

        if(typeof size === 'undefined' ||  !Number.isInteger(size)){
           
            access=false;
        }

        if(!access)return;
        this.iconsSize=size;
    }*/

  /*  setMenuCaseProperties(tool){
        let icon = tool.iconContainer;
        icon.css('font-size',this.iconsSize);
        this.$location.toolBox.find('ul').css('background-color',this.casesProperties.background)

    }*/
   /* showMenuCase(menuCase,tool){

        //menuCase.width(this.casesProperties.size.width);
        //menuCase.height(this.casesProperties.size.height);

        this.$location.toolBox.find('ul:first').append(menuCase);
    }*/



   /* activeAllTools(){

       
        Object.keys(this.tools).forEach((tool)=>{
            this.tools[tool].active();
        })
    }*/



}

export {TemplateToolBox}