const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    arrowContainer:null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    sound: false
  },
  
   i: 0,
   d: 0,

  init(a){


    document.getElementsByClassName("use-keyboard-input")[0].addEventListener("keydown",(e)=>{

      if(e.key==="Control"){
      if(a===2||a===0)this.init(1);
      else this.init(0);
      this._triggerEvent("oninput");
      }
      else return;
    });

    document.addEventListener("keydown",(e)=>{

      if(e.key==="Shift"){ 
        this._toggleShift();
        document.getElementById("shift").classList.toggle("keyboard__key--active", this.properties.shift);
        document.getElementById("shift").classList.add("keyboard_keyActive");
        
        this._triggerEvent("oninput");
      }
    });

    document.addEventListener("keyup",(e)=>{

      if(e.key==="Shift")  document.getElementById("shift").classList.remove("keyboard_keyActive");
    });

    document.addEventListener("keydown",(e)=>{

      if(e.key==="CapsLock"){ 
        this._toggleCapsLock();
        document.getElementById("CapsLock").classList.toggle("keyboard__key--active", this.properties.capsLock);
        document.getElementById("CapsLock").classList.add("keyboard_keyActive");
        
        this._triggerEvent("oninput");
      }
    });

    document.addEventListener("keyup",(e)=>{

      if(e.key==="CapsLock")  document.getElementById("CapsLock").classList.remove("keyboard_keyActive");
    });

    

 
    let e=this._createKeys();
    let r=this._russianKeys();
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    this.elements.arrowContainer=document.createElement("div");

    // Setup main elements
    if(a===2){
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.arrowContainer.classList.add("keyboard__keys","arrowCont");
    this.elements.arrowContainer.appendChild(this._createArrows());
    this.elements.keysContainer.appendChild(e);
    this.elements.keysContainer.appendChild(this.elements.arrowContainer);
    }
    else if(a===0){
    document.body.removeChild(document.body.getElementsByTagName('div')[0]);
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.arrowContainer.classList.add("keyboard__keys","arrowCont");
    this.elements.arrowContainer.appendChild(this._createArrows());
    this.elements.keysContainer.appendChild(e);
    this.elements.keysContainer.appendChild(this.elements.arrowContainer);
  
    }
    else if(a===1){
      document.body.removeChild(document.body.getElementsByTagName('div')[0]);
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.arrowContainer.classList.add("keyboard__keys","arrowCont");
    this.elements.arrowContainer.appendChild(this._createArrows());
    this.elements.keysContainer.appendChild(r);
    this.elements.keysContainer.appendChild(this.elements.arrowContainer);
    
    }
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "done", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "sound","q", "w", "e", "r", "t", "y", "u", "i", "o", "p","en-ru",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?" ,
      "speechRec","space"
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };
  

  


    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "en-ru", "enter", "?"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
     
      keyElement.classList.add("keyboard__key");
      keyElement.addEventListener("click",()=>{
        if(this.properties.sound)document.getElementById("sound").play();


      })




      
      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");
          

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock")+"caps";
          keyElement.id="CapsLock";

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return")+"enter";

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            
            this._triggerEvent("onclose");
          });

          break;


          case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key","keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("north")+"shift";
          keyElement.id="shift";

          keyElement.addEventListener("click", () => {
            this._toggleShift();
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
            this._triggerEvent("oninput");
          });


    

          break;

          case "en-ru":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key");
            keyElement.innerHTML = "en-ru";
  
            keyElement.addEventListener("click", () => {
             this.init(1);
              this._triggerEvent("oninput");
            });

           
  
            break;

            case "sound":
              keyElement.classList.add("keyboard__key--wide", "keyboard__key");
              keyElement.innerHTML = "en-ru";
              keyElement.innerHTML = createIconHTML("volume_off")+"sound";
    
              keyElement.addEventListener("click", () => {
                this._sound(0);
                if(this.properties.sound)
                keyElement.innerHTML = createIconHTML("volume_up")+"sound";
                else keyElement.innerHTML = createIconHTML("volume_off")+"sound";
                this._triggerEvent("oninput");
              });
             
    
              
    
              break;

              case "speechRec":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key");
                keyElement.innerHTML = "en-ru";
                keyElement.innerHTML = "Speak";
      
                keyElement.addEventListener("click", () => {
                  this.speechRec();
                 
                  this._triggerEvent("oninput");
                });
               
      
                
      
                break;


        default:
          
          keyElement.textContent = key.toLowerCase();
      

          keyElement.addEventListener("click", () => {
            //get the textarea
           let ta=document.getElementsByClassName("use-keyboard-input")[0];
           
           //get the cursor
           let sel=ta.selectionStart;

            this.properties.value=document.getElementsByClassName("use-keyboard-input")[0].value;
           

            this.properties.value=this.properties.value.slice(0,ta.selectionStart) + (this.properties.capsLock ? key.toUpperCase() : key.toLowerCase())+this.properties.value.slice(ta.selectionStart,ta.value.length);
            this._triggerEvent("oninput");
            ta.focus();
            ta.selectionStart=sel+1;
            ta.selectionEnd=sel+1;
          });
          document.getElementsByClassName("use-keyboard-input")[0].addEventListener("keydown",(e)=>{
           

            if(e.key===keyElement.textContent) keyElement.classList.add( "keyboard__key","keyboard_keyActive");
          });

          document.getElementsByClassName("use-keyboard-input")[0].addEventListener("keyup",(e)=>{

            if(e.key===keyElement.textContent) keyElement.classList.remove("keyboard_keyActive");
          });
          

          break;
      }

      fragment.appendChild(keyElement);



      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },


//creating arrows
  _createArrows() {
    
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "arrUp",
      "arrLeft","arrDown","arrRight"
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["arrUp"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("arrows");

      switch (key) {
        case "arrUp":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_up");

          keyElement.addEventListener("click", () => {
           document.getElementsByClassName("use-keyboard-input")[0].focus();
           keyElement.innerHTML = createIconHTML("keyboard_arrow_up")+document.getElementsByClassName("use-keyboard-input")[0].wrap;
            this._triggerEvent("oninput");
          });

          break;

          case "arrLeft":
            
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

          keyElement.addEventListener("click", () => {
            if(this.i>=document.getElementsByClassName("use-keyboard-input")[0].value.length)this.i=0;
            else this.i+=1;
            document.getElementsByClassName("use-keyboard-input")[0].focus();
            document.getElementsByClassName("use-keyboard-input")[0].selectionStart=document.getElementsByClassName("use-keyboard-input")[0].value.length-this.i;

            document.getElementsByClassName("use-keyboard-input")[0].selectionEnd=document.getElementsByClassName("use-keyboard-input")[0].value.length-this.i;
            this._triggerEvent("oninput");
          });

          break;

          case "arrDown":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_down");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

          case "arrRight":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

          keyElement.addEventListener("click", () => {
            if(this.i<=0)this.i=document.getElementsByClassName("use-keyboard-input")[0].value.length;
            else this.i-=1;

            document.getElementsByClassName("use-keyboard-input")[0].focus();
            document.getElementsByClassName("use-keyboard-input")[0].selectionStart=document.getElementsByClassName("use-keyboard-input")[0].value.length-this.i;

            document.getElementsByClassName("use-keyboard-input")[0].selectionEnd=document.getElementsByClassName("use-keyboard-input")[0].value.length-this.i;
            this._triggerEvent("oninput");
          });

          break;


      
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },







  _russianKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "done","ё","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "звук","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х","ъ","en-ru",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж","э", "enter",
      "shift" ,"я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?", 
      "speechRec","space"
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    


    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "en-ru", "enter", "?"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      keyElement.addEventListener("click",()=>{
        if(this.properties.sound)document.getElementById("sound1").play();


      })

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock")+"caps";
          keyElement.id="CapsLock";

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return")+"enter";

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            
            this._triggerEvent("onclose");
          });

          break;


          case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key","keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("north")+"shift";
          keyElement.id="shift";

          keyElement.addEventListener("click", () => {
            this._toggleShift();
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
            this._triggerEvent("oninput");
          });

        
          break;

          case "en-ru":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key");
            keyElement.innerHTML = "en-ru";
  
            keyElement.addEventListener("click", () => {
              this.init(0);
              this._triggerEvent("oninput");
            });
           
  
            
  
            break;

            case "звук":
              keyElement.classList.add("keyboard__key--wide", "keyboard__key");
              keyElement.innerHTML = "en-ru";
              keyElement.innerHTML = createIconHTML("volume_off")+"звук";
    
              keyElement.addEventListener("click", () => {
                this._sound(1);
                if(this.properties.sound)
                keyElement.innerHTML = createIconHTML("volume_up")+"звук";
                else keyElement.innerHTML = createIconHTML("volume_off")+"звук";
                this._triggerEvent("oninput");
              });
             
    
              
    
              break;


              case "speechRec":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key");
                keyElement.innerHTML = "en-ru";
                keyElement.innerHTML = createIconHTML("volume_off")+"speechRec";
      
                keyElement.addEventListener("click", () => {
                  this._sound(1);
                  if(this.properties.sound)
                  keyElement.innerHTML = createIconHTML("volume_up")+"звук";
                  else keyElement.innerHTML = createIconHTML("volume_off")+"звук";
                  this._triggerEvent("oninput");
                });
               
      
                
      
                break;
  



        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
           
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          document.getElementsByClassName("use-keyboard-input")[0].addEventListener("keydown",(e)=>{
         

            if(e.key===keyElement.textContent) keyElement.classList.add( "keyboard__key","keyboard_keyActive");
          });

          document.getElementsByClassName("use-keyboard-input")[0].addEventListener("keyup",(e)=>{

            if(e.key===keyElement.textContent) keyElement.classList.remove("keyboard_keyActive");
          });
          

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },




  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  _sound(s) {
    this.properties.sound = !this.properties.sound;
  
      },

  _toggleShift() {
    this.properties.shift = !this.properties.shift;
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        switch(key.textContent){
          case "1": key.textContent="!";
          break;
          case "2": key.textContent="@";
          break;
          case "3": key.textContent="#";
          break;
          case "4": key.textContent="$";
          break;
          case "5": key.textContent="%";
          break;
          case "6": key.textContent="^";
          break;
          case "7": key.textContent="&";
          break;
          case "8": key.textContent="*";
          break;
          case "9": key.textContent="(";
          break;
          case "0": key.textContent=")";
          break;
          case "!": key.textContent="1";
          break;
          case "@": key.textContent="2";
          break;
          case "#": key.textContent="3";
          break;
          case "$": key.textContent="4";
          break;
          case "%": key.textContent="5";
          break;
          case "^": key.textContent="6";
          break;
          case "&": key.textContent="7";
          break;
          case "*": key.textContent="8";
          break;
          case "(": key.textContent="9";
          break;
          case ")": key.textContent="0";
          break;

          case ",": key.textContent="<";
          break;
          case ".": key.textContent=">";
          break;
          case "?": key.textContent="/";
          break;
          case "<": key.textContent=",";
          break;
          case ">": key.textContent=".";
          break;
          case "/": key.textContent="?";
          break;

        }
      }
    }
  },
speechRec(){
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

      const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
      p.textContent = poopScript;

      if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
      }
  });

  recognition.addEventListener('end', recognition.start);

  recognition.start();

},
  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init(2);
});
