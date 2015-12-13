function get_details(){
    var city_id=document.getElementById('city').value;
    var z=xml_str.getElementsByTagName("image");
    var a=xml_str.getElementsByTagName("description");
    str1='';
    for(i=0;i<x.length;i++){
        if(y[i].childNodes[0].nodeValue ==city_id){
            str1 += '<br />\n' +
                '<img src="' + z[i].childNodes[0].nodeValue + '">';
            str1 += '<br />\n<div>' + a[i].childNodes[0].nodeValue + '</div>';
        }
    }

    document.getElementById('disp').innerHTML=str1;
}


if(window.XMLHttpRequest)
    my_xml=new XMLHttpRequest();

my_xml.open("GET",'./cities.xml',false);
my_xml.send();
xml_str=my_xml.responseXML;

var x=xml_str.getElementsByTagName("name");
var y=xml_str.getElementsByTagName("id");
var str="<select id='city' onchange=get_details()>";
str += "<option value='0'>Wybierz miasto</option>";
for(i=0;i<x.length;i++){
    str +='<option value=' + y[i].childNodes[0].nodeValue + '>' + x[i].childNodes[0].nodeValue + '</option>';
}
str +='</select>';
document.write(str);
