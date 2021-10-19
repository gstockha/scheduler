const $container = $(".container");
const $currentD = $("#currentDay");
const mTime = moment().format('dddd, MMMM Do');
let mHour = moment().hour();
let timeList = [];
let savedList = [];
let loaded = false;
const startTime = 9;
const endTime = 17; //military time

function loadList(){
    savedList = JSON.parse(localStorage.getItem('list'));
    console.log(savedList);
    if (savedList != null) loaded = true;
    else savedList = [];
};

function initApp(){
    loadList();
    $($currentD).append(mTime);
    let j = 0;
    let slot;
    for (let i = startTime; i < (endTime + 1); i++){
        timeList[j] = new timeSlot((j + startTime),"");
        if (loaded && (savedList[j] != null)) timeList[j].desc = savedList[j];
        //#region make html
        $container.append("<div>");
        slot = $container.children('div')[j];
        $(slot).addClass('row time-block').append('<h4>').append('<textarea>').append('<button>');
        $(slot).children('h4').addClass('col-1 hour').append(timeList[j].hourText.toString());
        $(slot).children('textarea').addClass('col-9 description').append(timeList[j].desc.toString());
        $(slot).children('button').addClass('col-1 saveBtn oi oi-clipboard mr-2').attr("id",j);
        //#endregion
        timeList[j].setStatus(mHour,slot);
        j++;
    }
    //$container.children('div').addClass("time-block");

};

class timeSlot{
    constructor(hour,desc){
        this.hour = hour;
        this.desc = desc;
        this.status = 'past'; //default
        let suffix = "AM";
        if (this.hour > 11) suffix = "PM";
        if (this.hour > 12){
            this.hourText = ((this.hour - 12).toString() + suffix);
        }
        else this.hourText = (this.hour.toString() + suffix);
    };
    setStatus(mHour,htmlTarget){
        if (this.hour < mHour){
            this.status = 'past';
        }
        else if (this.hour > mHour){
            this.status = 'future';
        }
        else{
            this.status = 'present';
        }
        $(htmlTarget).children("textarea").addClass(this.status);
    };
};

function saveList(event){
    let num = event.target.id;
    let slot = $container.children('div')[num];
    let text = $(slot).children('textarea').val();
    savedList[num] = text;
    console.log(text);
    localStorage.setItem("list",JSON.stringify(savedList));
}

setInterval(()=>{ //refresh hour
    mHour = moment().hour();
    for (let i = 0; i < timeList.length; i++){
        timeList[i].setStatus(mHour,$container.children('div')[i]);
    }
},60000);

initApp();

$($container).on("click", "button", saveList);