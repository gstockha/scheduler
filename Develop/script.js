const $container = $(".container");
const mTime = moment().format('MMMM Do YYYY');
let mHour = moment().hour();
let timeList = [];
// const startTime = 9;
// const endTime = 17; //military time
const startTime = 17;
const endTime = 24; //military time

function initApp(){
    let j = 0;
    let slot;
    for (let i = startTime; i < (endTime + 1); i++){
        timeList[j] = new timeSlot((j + startTime),"");
        //#region make html
        $container.append("<div>");
        slot = $container.children('div')[j];
        $(slot).addClass('time-block').addClass("row").append('<h4>').append('<p>').append('<button>');
        $(slot).children('h4').addClass('hour').append(timeList[j].hourText.toString());
        $(slot).children('p').attr("id",j).append(timeList[j].desc.toString());
        $(slot).children('button').addClass('saveBtn');
        //#endregion
        timeList[j].setStatus(mHour,slot,'p');
        j++;
    }
    //$container.children('div').addClass("time-block");

};

class timeSlot{
    constructor(hour,desc,status){
        this.hour = hour;
        this.desc = desc;
        this.desc = "Excepteur do consectetur enim qui incididunt nisi deserunt adipisicing voluptate. In laborum aliqua qui dolore."
        this.status = 'past'; //default
        if (this.hour > 12){
            this.hourText = (this.hour - 12).toString();
            this.hourText += "PM";
        }
        else this.hourText = (this.hour.toString() + "PM");
    };
    setStatus(mHour,htmlTarget,element){
        if (this.hour < mHour){
            this.status = 'past';
        }
        else if (this.hour > mHour){
            this.status = 'future';
        }
        else{
            this.status = 'present';
        }
        $(htmlTarget).children(element).addClass(this.status);
    };
};

function editText(event){
    let num = event.target.id;
    num = $container.children('div')[num];
    var text = $(num).children('p').val();
    $(num).children('p').text("").append('<textarea>');
    $(num).children('textarea').text(text);
}

setInterval(()=>{ //refresh hour
    mHour = moment().hour();
    for (let i = 0; i < timeList.length; i++){
        timeList[i].setStatus(mHour,$container.children('div')[i]);
    }
},60000);

initApp();

$($container).on("click", "p", editText);