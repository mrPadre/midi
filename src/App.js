import React, {Component} from 'react';


import * as JZZ from 'jzz';

const navigator = require('jzz');
const disp = document.createElement('div');
const body = document.getElementById('root');
body.appendChild(disp);
disp.className = 'App'
const hitAction = (color, strong, name ) => {
    body.style.backgroundColor = color;

    body.innerHTML += name
}

JZZ().or('Cannot start MIDI engine!')
    .openMidiOut().or('Cannot open MIDI Out port!')
    .wait(500).send([0x90,60,127]) // note on
    .wait(500).send([0x80,60,0]);  // note off
JZZ().openMidiIn().or('Cannot open MIDI In port!')
    .and(function() { console.log('MIDI-In: ', this.name()); })
    .connect(function(msg) {
        console.log(msg);
        if (msg.length === 3 && msg[2] !== 0){
            switch(msg[1]){
                case 4: return hitAction("Red", msg[2], 'Хай хет 1')
                case 21: return hitAction("Blue" , msg[2], 'Хай хет 2')
                case 36: return hitAction("Green", msg[2], 'Бочка')
                case 38: return hitAction("Yellow", msg[2], 'Рабочий')
                case 43: return hitAction("Pink", msg[2], 'Напольный том')
                case 44: return hitAction("Orange", msg[2], 'Хай хет 3')
                case 45: return hitAction("Purple", msg[2], 'Том 2')
                case 46: return hitAction("Gold", msg[2], 'Открытый Хай хет')
                case 48: return hitAction("Brown", msg[2], 'Том 1')
                case 49: return hitAction("Silver", msg[2], 'Креш')
                case 51: return hitAction("Indigo", msg[2], 'Райд')
                default: return
            }
        }
    })
    .wait(100).close();

if (navigator.requestMIDIAccess) {
    body.innerText += "Браузер поддерживает миди";
}

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess()
        .then(success, failure);
}

function success (midi) {
    console.log(midi.inputs);
    body.innerHTML += `<div> Удачно! ${midi.inputs.size} </div>`;
}

function failure () {
    body.innerHTML += "<div> Нихуя не вышло </div>";
}


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hit: ''
        }
    }
    render () {
        const {hit} = this.state;

        return (

            <div className="a" id = "app_box">

            </div>
        );
    }

}

export default App;
