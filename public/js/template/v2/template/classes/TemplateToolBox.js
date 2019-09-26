class TemplateToolBox{
    constructor(){
        console.log('Hello Toolbox')

        this.$location = {
            ul : $('.tools ul:first'),
        };

        this.tools={};


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

    setToolIcon(tool,icon){
        tool.iconClass=icon
        tool.elements.icon=$(`<i class="${tool.iconClass}"></i>`);
    }

    setToolTitle(tool) {
        tool.attrs.title = tool.instance.description;
    }
    addTool(tool,icon){

        this.tools[tool.name]={};
        this.tools[tool.name].elements={};
        this.tools[tool.name].attrs={};
        this.tools[tool.name].instance=tool;
        this.setToolTitle(this.tools[tool.name]);
        this.tools[tool.name].elements.span = $(`<span>${this.tools[tool.name].attrs.title}</span>`);
        this.tools[tool.name].elements.li=$(`<li title="${this.tools[tool.name].attrs.title}"></li>`);
        this.setToolIcon(this.tools[tool.name],icon);

        this.$location.ul.append(
            this.tools[tool.name].elements.li
                .append(this.tools[tool.name].elements.span)
                .append(this.tools[tool.name].elements.icon)
        );

        /*let icon = $(`<i></i>`)
        let iconInToolBox =$('<li class="tools"></li>');
        iconInToolBox.append(tool.iconContainer);
        let subToolsContainer,subToolConainer=null;
        Object.keys(this.tools[tool.constructor.name].subTools).forEach((subToolName,index)=>{
            this.subTools[subToolName]=this.tools[tool.constructor.name].subTools[subToolName];
            if(index<1){  subToolsContainer=$('<ul class="subToolsContainer"></ul>')  };
            subToolConainer = $('<li class="subtools"></li>').append(this.tools[tool.constructor.name].subTools[subToolName].iconContainer);
            subToolsContainer.append(subToolConainer);
        });
        if(subToolsContainer !== null)iconInToolBox.append(subToolsContainer);
        this.setMenuCaseProperties(tool);
        this.showMenuCase(iconInToolBox,tool);*/
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

   /* disactiveAllTools(exception){
        let exceptionArray = exception;

     //   typeof exception === 'string'? exceptionArray.push(exception):exceptionArray = exception;
        let allowDisactivation;
        Object.keys(this.tools).forEach((tool)=>{
            allowDisactivation=true;
            if(!exceptionArray.includes(tool)){
                Object.keys(this.tools[tool].subTools).forEach(subTool=>{
                   
                    if(!exceptionArray.includes(subTool)){
                        this.tools[tool].subTools[subTool].iconContainer.first().parents('.subtools').removeClass('active-subTool');
                       
                        this.tools[tool].subTools[subTool].activeTool(false);
                    }else{
                        allowDisactivation=false
                    }
                })
                if(allowDisactivation){
                    this.tools[tool].iconContainer.first().parents('.tools').removeClass('active-tool');
                    this.tools[tool].activeTool(false);
                }
            }else{
               
            }
        })
    }*/


   /* activeToolBoxEvents(){
        //Au click sur un element de la toolBox
        this.$location.toolBox.find('.tools li').on('click',(e)=>{
            let active = {tool : false, subtool:false};
            let toolsToNotDisactivate = [];
           let tool = $(e.currentTarget).hasClass('tools')?$(e.currentTarget).find('span:first').data('tool'):$(e.currentTarget).parents('.tools li').find('span:first').data('tool');
           let subTool = $(e.currentTarget).find('span:first').data('subtool')?$(e.currentTarget).find('span:first').data('subtool'):false;
            if(!subTool){
                active.tool=this.tools[tool].state !=='enabled'
            }else{
                if(this.tools[tool].subTools[subTool].state !=='enabled'){
                    active.subtool=true
                    active.tool=true
                }else{
                    if(this.activatedTool.subTool!==null){
                       
                        if(Object.keys(this.tools[tool].subTools).includes(subTool)){
                            if(this.activatedTool.subTool.name !== subTool){
                                active.subtool=true;
                                active.tool=true;
                            }
                        }else{
                            active.tool=false;
                            active.subtool=true;
                        }
                    }else{
                        active.subTool=true;
                        active.tool = true;
                    }
                }
            }

            Object.keys(active).map(val=>toolsToNotDisactivate.push(val));

            this.disactiveAllTools(toolsToNotDisactivate);

           
            Object.keys(active).map(val=>{
                let toolsEntity = val==='tool'?tool:subTool;
               
               
                if(active[val])toolsEntity.state==='enabled'?this.activeToolInToolBox(toolsEntity,false):this.activeToolInToolBox(toolsEntity,true);
            });

            //this.disactiveSubTools(eventName);

            e.stopPropagation()
        })
    }
    */
   /* activeAllTools(){

       
        Object.keys(this.tools).forEach((tool)=>{
            this.tools[tool].active();
        })
    }*/
   /* activeToolInToolBox(toolName,active=true){
        let element = Object.keys(this.tools).includes(toolName)?'tool':'subTool';
console.log(this.activatedTool)
        let objectToActive = element==='tool'?this.tools[toolName]:this.subTools[toolName];

        let classToAdd = element==='tool'?'active-tool':'active-subTool';
        objectToActive.activeTool(active);
        if(active){
            this.activatedTool[element]=objectToActive;
            objectToActive.iconContainer.parent().addClass(classToAdd)
        }else{
            this.activatedTool[element]=null
            objectToActive.iconContainer.parent().removeClass(classToAdd)
        }

    }*/



}

export {TemplateToolBox}