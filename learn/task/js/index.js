var num = 1;
var button = document.getElementById("screen");
var button_1 = document.getElementById("picture_1");
var button_2 = document.getElementById("picture_2");
var button_3 = document.getElementById("picture_3");
var button_4 = document.getElementById("picture_4");

button_1.className = 'slider_next active';
function change(num){
    switch(num){
        case 1 :
            button_1.className = 'slider_next active';
            button_2.className = 'slider_next ';
            button_3.className = 'slider_next ';
            button_4.className = 'slider_next ';
            break;
        case 2 :
            button_2.className = 'slider_next active';
            button_1.className = 'slider_next ';
            button_3.className = 'slider_next ';
            button_4.className = 'slider_next ';
            break;
        case 3 :
            button_3.className = 'slider_next active';
            button_1.className = 'slider_next ';
            button_2.className = 'slider_next ';
            button_4.className = 'slider_next ';
            break;
        case 4 :
            button_4.className = 'slider_next active';
            button_1.className = 'slider_next ';
            button_2.className = 'slider_next ';
            button_3.className = 'slider_next ';
            break;
        default:
            num = 1;
            button_1.className = 'slider_next active';
    }
}

function slider(num)
{
    button.src="imgs/" + num+ ".jpg";
    change(num);
}

setInterval(function(){
    ++num;
    if (num == 5) {
        num = 1;
    };
    change(num);
    button.src="imgs/" + num+ ".jpg";
 },2000)

var by_desc = document.getElementById("by_desc");
var by_spec = document.getElementById("by_spec");
var by_tour = document.getElementById("by_tour");

function active_by_desc(){
    by_desc.className = 'category_menu_active';
    by_spec.className = 'category_li_center';
    by_tour.className = '';
}
function active_by_spec(){
    by_desc.className = '';
    by_spec.className = 'category_li_center category_menu_active';
    by_tour.className = '';
}
function active_by_tour(){
    by_desc.className = '';
    by_spec.className = 'category_li_center';
    by_tour.className = 'category_menu_active';
}