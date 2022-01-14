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
            return true;
        }
        if(typeof(accessRight) === "object"){// array
            const ownedAR = this.#getAllAccessRight();
            if(accessRight.length === 0){
                return true;
            }
            if(ownedAR !== null){
                for(let i = 0; i < accessRight.length; i++){
                    for(let u = 0; u < ownedAR.length; u++){
                        if(accessRight[i] === ownedAR[u].value){
                            return true;
                        }
                    }
                }
            }
            return false;
        }else{
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