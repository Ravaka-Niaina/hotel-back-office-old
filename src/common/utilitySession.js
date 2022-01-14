class Session{
    #user_session;
    #getAllAccessRight;
    
    constructor(){
        const temp = localStorage.getItem("user_session")
        this.#user_session = JSON.parse(temp);
        this.#getAllAccessRight = () => {
            if(this.#user_session === null){
                return null;
            }else{
                let toReturn = {...{AR: this.#user_session.accessRight}}.AR;
                console.log(toReturn);
                return toReturn;
            }
        }
    }

    getId(){
        return this.#user_session === null
        ? null
        : this.#user_session.id;
    };

    isConnected(){
        return this.#user_session === null ? false : true;
    }

    getIsPartner(){
        return this.#user_session === null
        ? null
        : this.#user_session.isPartner;
    }

    hasOneOfTheseAccessRights(accessRight){
        if(accessRight === undefined){
            return false;
        }
        if(typeof(accessRight) === "object"){// array
            const ownedAR = this.#getAllAccessRight();
            console.log("ok 1");
            if(accessRight.length === 0){
                return true;
            }
            console.log("ok 2");
            if(ownedAR !== null){
                console.log("ok 2.1");
                for(let i = 0; i < accessRight.length; i++){
                    console.log("ok 2.2");
                    for(let u = 0; u < ownedAR.length; u++){
                        console.log("ok 2.3");
                        if(accessRight[i] === ownedAR[u].value){
                            console.log("ok 2.4 ");
                            return true;
                        }
                    }
                }
            }
            console.log("ok 3");
            return false;
        }else{
            console.log("ok 4");
            if(this.#user_session === null){
                return false;
            }else{
                for(let i = 0; i < this.#user_session.accessRight.length; i++){
                    if(this.#user_session.accessRight[i].value === accessRight){
                        return true;
                    }
                }
                return false;
            }
        }
    }

    update(stringUserSession){
        try{
            this.#user_session = JSON.parse(stringUserSession);
            localStorage.setItem("user_session", stringUserSession);
        }catch(err){
            this.#user_session = null;
            localStorage.setItem("user_session", null);
        }
    }
}

export const session = (function(){
    let instance = null;
    return{
        getInstance: function(){
            if(instance === null){
                instance = new Session();
            }
            return instance;
        }
    }
})();