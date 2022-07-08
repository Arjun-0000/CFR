/* Stores unit of the subject in the variables */
let vTopics = document.querySelectorAll(".topics>li>span>span"); // [0].innerHTML;
let vTopicsLength = vTopics.length;
let vUnits = [];
for (let i=0; i<vTopicsLength; i++) {
    vUnits.push(vTopics[i].innerHTML);
    i++;
}






