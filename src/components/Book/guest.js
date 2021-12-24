
import React , {useState} from "react";

function Guest (){
    const [state , setState]= useState(
        {
          nbAdulte : 1,
          nbEnfant : 0
        }
    )
    return (
        <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button {...bindToggle(popupState)} id='toggle'>
            <span></span>
          </Button>
            <div className='client'>
                <div id='client' className='guests'>
                    <p>
                        <PersonIcon id='PersonIcon'/>
                        <span id='guests'>Guests</span><br/>
                        <span id='NbGuest'>{this.state.nbAdulte} Adult, {this.state.nbEnfant} children</span>
                    </p>
                </div>
            </div>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper id='modal1'>
                <span id="adultes">Adultes</span><div class='guest1' id='adulte1' onClick={this.DecrAdulte}><p id='moins'>-</p></div>
                          <div class='guest1'>
                          <input value={this.state.nbAdulte} onChange={(e) => this.changeGuests(e, "nbAdulte")} class='adulte' type=""/>
                          </div>
                    <div class='guest1' id='adulte11' onClick={this.IncrAdulte}><p id='add'>+</p></div>
                          <br/>
                          <span id="enfants">Enfants</span><div class='guest2' id='enfant1' onClick={this.DecrEnfant}><p id='moins'>-</p></div>
                          <div class='guest2'>
                          <input value={this.state.nbEnfant} onChange={(e) => this.changeGuests(e, "nbEnfant")} class='enfant' type=""/>
                          </div>
        <div class='guest2' id='enfant11' onClick={this.IncrEnfant}>
            <p id='add'>+</p>
        </div>
                {
                    this.state.showAge ?
                    <select value="" name="" class="age">
                    <option value="">0</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                    <option value="">6</option>
                    <option value="">7</option>
                    <option value="">8</option>
                    <option value="">9</option>
                    <option value="">10</option>
                    <option value="">11</option>
                    </select>
                    : null
                    }
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
    );
}
export default Guest;