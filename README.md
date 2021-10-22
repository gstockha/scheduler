https://gotad.io/scheduler/

![scheduler](https://user-images.githubusercontent.com/54012873/138373327-75e86138-d530-46d1-bcd3-b8ccc86d8278.png)


This assignment took me a while. The moment.js, time slot data structures, and color states were all pretty intuitive to form: 

Create an array of date block objects via a class with a constructor.

Get the moment() info, setting the header date and the retrieving the hour (military time) and setting an hour-checking interval to a minute.

The save/load functions were pretty simple; we're only saving the description of each date block.

What I was having trouble with, however, was calling and setting html elements and classes via JQuery. Retrieving target.id variables took me a while to remember how to do, and creating children on children elements seemed a bit clunky for my tastes. What was I doing wrong here? Do I really need to do this everytime?
>slot = $container.children('div')[j];
>$(slot).addClass('row time-block').append('<h4>').append('<textarea>').append('<button>');
>$(slot).children('h4').addClass('col-1 hour').append(timeList[j].hourText.toString());
>$(slot).children('textarea').addClass('col-9 description').append(timeList[j].desc.toString());
>$(slot).children('button').addClass('col-1 saveBtn oi oi-clipboard mr-2').attr("id",j);
