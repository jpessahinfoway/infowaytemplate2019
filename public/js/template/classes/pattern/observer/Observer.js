class Observer {
    constructor(){
        this.data=null
        this.functionToExecuteWhenTriggered=null
    }
    // Gets called by the Subject::notify method.
    update(data) {
        this.data = data
        this.functionToExecuteWhenTriggered(this)
    }

    observerFunction(functionToExecuteWhenTriggered){
        this.functionToExecuteWhenTriggered = functionToExecuteWhenTriggered
    }

}

export {Observer};