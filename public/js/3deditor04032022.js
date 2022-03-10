
var selected_object_id = '';
var selected_object = {};
var scene_id = "scene1"
var currentScene_View = "scene1";
var counter = 2;
var position_saved = {};
var scaling_saved = {};
var rotation_saved = {};
var source_saved = {};
var elements_id_saved = "";
var selected_Scene = "";
var scene_deleted = "";
var delete_scene_ul_id = ""
var experienceData = ""
var visible_scene_id=""
var cut_element=""
var rename_scene=""
var LongitudeSaved = 0;
 var LatitudeSaved = 0 ;
 var dropdownID = "";
 var hotspotCheck = false;
 var hotspotcounter = 0;
 var hotspotDictionary = [];
 var rules_dictionary = []
//ashwini kumar
 var component_id = []
var sceneid_g = []
var currId = ""

// function highlight(id) {
//     console.log("componentid getting",component_id,currId)
//     for (i = 0; i <= sceneid_g.length; i++) {
//         if (sceneid_g[i] == id) {
//             document.getElementById(sceneid_g[i]).style.backgroundColor = "red"
//         } else {
//             if(sceneid_g[i]){
//                 document.getElementById(sceneid_g[i]).style.backgroundColor = ""
//             }
            
//         }
//     }
    
// }

//ashwin's code
// function componentsHighlight(id) {
//     console.log("getting curent",id)
//     currId=id

//     for (i = 0; i <= component_id.length; i++) {
//         // document.getElementById(sceneid_g[i]).style.backgroundColor = ""
//         if (component_id[i] == id) {
//             document.getElementById(component_id[i]).style.backgroundColor = "orange"
//         } else {
//             if(component_id[i]){
//                 document.getElementById(component_id[i]).style.backgroundColor = ""
//             }
//         }

//     }
// }
//ashwins's code

function onPlaneclick() {
    var find = document.querySelector("a-plane")
    console.log(find, find.object3D)
}

//ashwins code

// var counthide = 0
// function hideshow(){
//     if(counthide == 0 || counthide % 2 ==0){
//         const shoing = document.getElementById(selected_object_id)
//         shoing.setAttribute('visible',false)
//         counthide++
//         console.log(counthide)
//     }else{
//         const hiding = document.getElementById(selected_object_id)
//         hiding.setAttribute('visible',true)
//         counthide++
//         console.log(counthide)
//     }
    
  
// }
var count_lock=0
function lockscene(id){
    console.log("working id",id)
    let lockid = id

    if(count_lock == 0 || count_lock % 2 == 0){
        const lockglobalid = document.getElementById(lockid)
        lockglobalid.style.opacity="0.1"
        lockglobalid.style.pointerEvents = 'none';
        count_lock++
        console.log(count_lock)
    }else{
        const lockglobal = document.getElementById(lockid)
        lockglobal.style.opacity="1"
        lockglobal.style.pointerEvents = 'auto';
        count_lock++
        console.log(count_lock)
    }
    
}
//ashwins code
var back_selected = ''
function delete_object() {
    if (selected_object_id !== '') {
        // console.log("to delete",selected_object,selected_object_id)
        // console.log("inside delete")
        
        var selected_id = "li-"+selected_object_id
        back_selected = selected_id
        var candidate = document.getElementById(selected_id);
        console.log("candidate", candidate)
        candidate.remove();
        var object_todelete = document.getElementById(selected_object_id);
        object_todelete.parentNode.removeChild(object_todelete);
        console.log("sidebar",document.getElementById("sidebar"))
        document.getElementById("sidebar").style.display = "none"
        
        document.getElementById('object_name').innerText = "Name";
        //remove element from structure list
       
        // // openStructure()
        

    }
}
function addScene() {
    console.log("counter", counter)
    if(counter == 0 || counter == 1)
    {
        var getmain = document.getElementById("mainScene")
        getmain.setAttribute('visible',true)
    }
    rec_id = "scene" + counter;
    console.log("sceneID", rec_id)
    // document.getElementById(currentScene_View).setAttribute('visible', false)
    var newscene = document.getElementById("mainScene");
    var latest = document.createElement("a-entity");

    latest.style.position = "fixed";
    latest.id = rec_id;
    currentScene_View = rec_id;


    newscene.appendChild(latest)
    /*
    //adding scene to list in structure
    var getdiv = document.getElementById("scenes_list");
    var sceneul = document.createElement('ul');
    sceneul.setAttribute('id', "myUL3");
    sceneul.style.color = "white"
    var sceneli = document.createElement('li');
    var newSpan = document.createElement('span');
    newSpan.className = "scene";
    newSpan.id="scene2"
    var newImage = document.createElement('img')
    newImage.src = "assets/images/metabild/Vector (9).png"

    newSpan.appendChild(newImage)
    newSpan.appendChild(document.createTextNode("Scene 2"));
    newSpan.onclick=function(event)
    {
        console.log("newspan",newSpan.id)
        showscene(newSpan.id)
    }
    var values = ["Model", "Video", "Image", "Cube"];
    var newdiv = document.createElement("div");
    newdiv.style = "display: flex;justify-content: space-between;padding-left: 40px;padding-top: 5px;padding-bottom: 3px;"
    var select = document.createElement("select");
    select.id = "scene2";
    select.onclick = function (event) {
        scene_id = latest.id
        console.log("onclick of dropdown value of scene_id", latest.id)
    }
    for (const val of values) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }
    select.addEventListener('change', (event) => {
        console.log(event.target.value, select.id);
        myFunction(event.target.value, select.id)
    })

    var sceneul2 = document.createElement('ul');
    sceneul2.setAttribute('id', select.id + "_elements");
    sceneul2.className = "nested"

    sceneli.appendChild(newSpan)
    newdiv.appendChild(select)
    sceneli.appendChild(newdiv)
    sceneul.appendChild(sceneli);
    sceneli.appendChild(sceneul2)
    getdiv.appendChild(sceneul)

    */
   
    var ul_id = "myUL" + counter
    var elements_tag = "s" + counter + "-" + rec_id + "_elements";
    var scence_tag_id = "s" + counter + "-" + rec_id ;    
    var select_id = "s" + counter + "-" + rec_id;
    var scene_present = document.getElementById('new_scenes_list').innerHTML;
    document.getElementById('new_scenes_list').innerHTML = scene_present + '<div style=" justify-content: centre;"><ul class="scrollers list-group" id=' + ul_id + ' onclick="get_scene(this.id)"  style="color: white;"> <li id="scroller"><div class="highlighting"id=' + scence_tag_id + ' style="display: flex;flex-direction: row; justify-content: space-between;padding-top: 10px;padding-bottom: 10px;" onclick=highlight_bg(this.id)><div><span id="scencedrop" onclick=scenceDropping(\'' + elements_tag + '\') > <img src="../../../app-assets//images/svg/Dropdown.svg" style="margin-right: 15px;height: 12px; width: 12px;"></span><span id=' + "li-" + rec_id + ' class="scene" onclick="shownewscene(' + "'" + rec_id + "', " + "'" + elements_tag + "'" + ')"><img src="../../../app-assets//images/svg/Vector (9).png" style="margin-right: 10px;">' + rec_id + '</span> </div><div> <img id=' + select_id + ' onclick="setid(this.id)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom2" aria-controls="offcanvasBottom2" src="../../../app-assets//images/svg/Vector(8).png" style="margin-right: 5px;height: 12px; width: 12px;"> <img onclick="lockscene(\'' +ul_id + '\')"src="../../../app-assets//images/svg/lock-alt.svg" alt="" height="20" width="20"><img  src="app-assets//images/svg/renamefolder.svg" data-bs-toggle="modal" data-bs-target="#exampleModalCenter"></div></div>  <div style="display: flex;justify-content: space-between;padding-left: 40px;padding-top: 5px;padding-bottom: 3px;"> </div><ul id=' + elements_tag + ' class="nested active"></ul></li></div><br /></ul>'
   
    counter = counter + 1
    // $("#scene2").addClass("scene");

}
function changeCamera(cam_name) {
    console.log(cam_name)
    if (cam_name == "orbital") {
        // $("#free_cam").empty();
        // var get=document.querySelector("#camera")
        // var newdiv=document.createElement("div")
        // newdiv.id="new_cam"
        // newdiv.innerHTML='<a-entity camera look-controls orbit-controls="target: 0 1.6 -0.5; minDistance: 0.5; maxDistance: 180; initialPosition: 0 1 5"></a-entity>'
        // get.appendChild(newdiv)
        var secondCameraEl = document.querySelector('#orbital');
        secondCameraEl.setAttribute('camera', 'active', true);
        // var secondCameraEl = document.querySelector('#free');
        // secondCameraEl.setAttribute('camera', 'active', false);
    }
    else if (cam_name == "free") {
        // $("#new_cam").empty();
        // document.getElementById("camera").innerHTML='<a-entity position="0 1 10"> <a-camera keyboard-controls="mode: fps" > </a-camera></a-entity> '
        // var secondCameraEl = document.querySelector('#free');
        // secondCameraEl.setAttribute('camera', 'active', true);
        var secondCameraEl = document.querySelector('#orbital');
        secondCameraEl.setAttribute('camera', 'active', false);


    }
    else if (cam_name == "reset") {
        // $("#new_cam").empty();
        // document.getElementById("camera").innerHTML='<a-entity position="0 1 10"> <a-camera keyboard-controls="mode: fps" > </a-camera></a-entity> '
        var secondCameraEl = document.querySelector('#orbital');
        secondCameraEl.setAttribute('camera', 'active', true);
        secondCameraEl.getObject3D('camera').position.set(0, 0, 5);




    }



}


var counthide = 0
function hideshow(){
    if(counthide == 0 || counthide % 2 ==0){
        const shoing = document.getElementById(selected_object_id)
        shoing.setAttribute('visible',false)
        counthide++
        console.log(counthide)
    }else{
        const hiding = document.getElementById(selected_object_id)
        hiding.setAttribute('visible',true)
        counthide++
        console.log(counthide)
    }
    
  
}


function add_images(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd, id_recd) {

    if (position_recd == "center") {
        console.log("position:", position_recd, rotation_recd, scaling_recd)
        // var sceneEl = document.querySelector('a-scene');
        console.log("received ", id, scene_id)
        var newcompoCounter = Math.floor((Math.random() * 1000) + 1);
        var sceneEl = document.getElementById(scene_id)
        console.log("main scene", sceneEl)
        var entity_img = document.createElement('a-image');
        entity_img.setAttribute('id', "image_added" + newcompoCounter)
        entity_img.setAttribute('src', "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/Image_place%20holder.png")
       
        // entity_img.setAttribute('scale', { x: 2, y: 2, z: 2 })
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Image Properties::", entity_img.object3D.position.x);

        //adding it to structure list
        var check = id + "_elements"
        var ul = document.getElementById(id + "_elements");
        
        console.log("reached here kiran", ul,check)
        var li = document.createElement("li");
        li.classList.add("list-group-item")
console.log("test loremli",ul.id)
        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });


        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"

        li.setAttribute('id', "li-" + entity_img.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Image"));
                //ashwins code
                let eyeicon = document.createElement('img')
                eyeicon.style.marginLeft="80px"
        
                eyeicon.setAttribute('onclick', 'hideshow()');
                eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
                li.appendChild(eyeicon)
                //ashwinscode
        li.addEventListener('click', function (e) {
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object_id = "image_added" + newcompoCounter
            cut_element = li.id;
            console.log("onlcick of", selected_object_id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
            //   //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()

        });
        ul.appendChild(li);
        //onchange
        entity_img.addEventListener('objectChange', (e) => {
            console.log("object moved")
        });
        //onclick of object
        entity_img.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = "image_added" + newcompoCounter
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
        //     const closeAddRt=`<div class="open-button hide" id="openbuttonrt" onclick="openNavrt()">
        //     <svg class="align-baseline " width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="
        //     margin: 18px 20px;">
        //                                         <path d="M12 1.71429L7.625 6L12 10.2857L11.125 12L5 6L11.125 -7.64949e-08L12 1.71429Z" fill="#F8F8F8"></path>
        //                                         <path d="M7 1.71429L2.625 6L7 10.2857L6.125 12L5.24537e-07 6L6.125 -7.64949e-08L7 1.71429Z" fill="#F8F8F8"></path>
        //                                         </svg>
        // </div>`
            const previewAdded =` <div class="tab-content">
            <div class="tab-pane active" id="home1Icon" aria-labelledby="home1Icon-tab"
                role="tabpanel">
                <div style="padding-bottom: -15px;" id="properties_value">
                    <div style="display: flex;flex-direction: row"></div>
                    <div class="open-buttonrt " id="close-buttonrt" onclick="closeNavrt()">
            <svg class="align-baseline " width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="
            margin: 18px 20px;">
                                                <path d="M12 1.71429L7.625 6L12 10.2857L11.125 12L5 6L11.125 -7.64949e-08L12 1.71429Z" fill="#F8F8F8"></path>
                                                <path d="M7 1.71429L2.625 6L7 10.2857L6.125 12L5.24537e-07 6L6.125 -7.64949e-08L7 1.71429Z" fill="#F8F8F8"></path>
                                                </svg>
        </div>
                    <p>component</p>

                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-8 "
                            style="background-color: #FFFFFF;display: flex;align-items: center;justify-content: center;height: 116px;width: 216px;">
                            <button onclick="onpropertiespreviewbutton()"
                                class="btn waves-effect waves-float waves-light"
                                style="border: 1px solid black; line-height: 15px;">Preview</button>
                        </div>

                        <div class="col-md-12">
                            <!-- <button class="btn btn-outline-primary" type="button"
                                data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom1"
                                aria-controls="offcanvasBottom1"> Assign Asset </button><br> -->
                            <!-- <button type="button" class="btn btn-outline-primary"
                                data-bs-toggle="modal" data-bs-target="#fullscreenModal">
                                Assign Asset
                            </button><br /><br /> -->

                            <!-- Bottom Offcanvas -->
                            <div class="offcanvas-bottom-example my-1 ms-2">
                                <button class="btn btn-outline-primary waves-effect "
                                    type="button" onclick="folderDetails()"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasBottom1"
                                    aria-controls="offcanvasBottom1">
                                    Assign Asset
                                </button>
                                
                            </div>
                            <!-- Bottom Offcanvas end-->

                            <div id="textValue " class =" text-center">
                            <button onclick="enablehotspot()">add hotspot</button>
                            </div>
                            <div id="hotspotInput"></div>
                        </div><br>
                    </div>

                    <br>
                </div>
            </div>

        </div>`
            document.getElementById("componentEntityHeader").insertAdjacentHTML('beforebegin', previewAdded );
            // document.getElementById("rightPanel").insertAdjacentHTML('beforebegin', closeAddRt );
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML
            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }
            console.log("sidebar:::::::::", getside)
            // document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML = '<div style="padding-bottom:50px" id="properties_value"><div style="display: flex;flex-direction: row"><button onclick="close_rightpanel()">x</button><p style="text-align:center;flex:auto">properties<p></div><p>' + "image_added" + scene_id + '</p><hr style="background-color: #5361AA;"><div class="row"><div class="col-md-2"></div><div class="col-md-8 mt-4 mb-4"  style="background-color: #FFFFFF;display: flex;align-items: center;justify-content: center;height: 180px;"><button onclick="onpropertiespreviewbutton()"class="btn" style="border: 1px solid black; line-height: 15px;">Preview</button></div><div class="col-md-12"><button>assign asset</button><br><input type="text" id="fname" name="fname" style="background-color: aliceblue;"></div> </div> <hr style="background-color: #5361AA;"><div class="row d-flex justify-content-center"></div><br /> </div>' + getside

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            // document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')
            // $("#sidebar").children(":not(#componentEntityHeader)").remove();

            console.log("Clicked")
            var scene_present = document.getElementById('sidebar').innerHTML;
            // document.getElementById('sidebar').innerHTML = scene_present + ' <div class="row"> <div class="col-md-1"></div><div class="col-md-9" style="background-color: #4D505C;display: flex;align-items: center;justify-content: center;height: 148px;"> <button class="btn" style=" line-height: 15px;">Preview</button> </div><div class="col-md-2"></div></div>' 
            var objects = $(".vec3");
            for (var obj of objects) {
                console.log(obj);
            }
            document.getElementById('addComponentContainer').style.visibility = "hidden"
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_img.object3D
            console.log("check on click", check, position_saved, rotation_saved, scaling_saved, source_saved)
            console.log("clicked image ./././././", entity_img.object3D)
            //change name in properties
            document.getElementById('object_name').innerText = entity_img.id;
            //assign global variable so that delete will be easier
            selected_object_id = entity_img.id
            console.log("selected", selected_object_id)
            ///assign position
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_img.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_img.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_img.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_img.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_img.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_img.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_img.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_img.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_img.object3D.scale.z)

        });
        sceneEl.appendChild(entity_img);

    } else {
        console.log("position in else CHECKPOINT:", rotation_recd.rotation._x, rotation_recd.rotation._y, rotation_recd.rotation._z)
        // var sceneEl = document.querySelector('a-scene');
        console.log("received ", id, scene_id)
        var sceneEl = document.getElementById(scene_id)
        var entity_img = document.createElement('a-image');
        entity_img.setAttribute('id', id_recd)
        entity_img.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });

        entity_img.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd.rotation._y), z: THREE.Math.radToDeg(rotation_recd.rotation._z) });

        entity_img.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });

        entity_img.setAttribute('src', source_recd.asset_src)
        entity_img.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });
        console.log("Image Properties::", entity_img.object3D.position.x);

        //adding it to structure list
        var check = id + "_elements"
        var ul = document.getElementById(id + "_elements");
        
        console.log("reached here", ul, check)
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_img.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Image"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            cut_element = li.id;
            selected_object_id = id_recd
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });
        ul.appendChild(li);
        //onchange
        entity_img.addEventListener('objectChange', (e) => {
            console.log("object moved")
        });
        //onclick of object
        entity_img.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = id_recd
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }

            console.log("sidebar:::::::::", getside)
            // document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML = '<div  id="properties_value"><div style="display: flex;flex-direction: row"><button onclick="close_rightpanel()">x</button><p style="text-align:center;flex:auto">properties<p></div><hr style="background-color: #5361AA;"><p>' + "image_added" + scene_id + '</p><hr style="background-color: #5361AA;margin-bottom:0px"><div class="row"><div class="col-md-2"></div><div class="col-md-8 mt-4 mb-4"  style="background-color: #262626;display: flex;align-items: center;justify-content: center;height: 180px;"><button onclick="onpropertiespreviewbutton()"class="btn" style="border: 1px solid black; line-height: 15px;">Preview</button></div><div class="col-md-12"><button style="background-color: transparent;color: white;">assign asset</button><br><br><div style="display:flex;flex-direction:row" class="col-md-12"><input type="text" placeholder="URL" id="fname" name="fname" style="background-color: #262626;width: inherit;"></div></div> </div> <hr style="background-color: #5361AA;"><div class="row d-flex justify-content-center"></div><br /> </div>' + getside


            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')
            // $("#sidebar").children(":not(#componentEntityHeader)").remove();
            for (let i = 1; i <= getsidebar.length; i++) {
                getsidebar[i].innerHTML = "";
            }
            console.log("Clicked")
            var scene_present = document.getElementById('sidebar').innerHTML;
            // document.getElementById('sidebar').innerHTML = scene_present + ' <div class="row"> <div class="col-md-1"></div><div class="col-md-9" style="background-color: #4D505C;display: flex;align-items: center;justify-content: center;height: 148px;"> <button class="btn" style=" line-height: 15px;">Preview</button> </div><div class="col-md-2"></div></div>' 
            var objects = $(".vec3");
            for (var obj of objects) {
                console.log(obj);
            }
            document.getElementById('addComponentContainer').style.visibility = "hidden"
            var nameid = "image_added" + scene_id
            // console.log("source of image :::", $('#' + nameid).attr('src'))
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            console.log("check on click", elements_id_saved, position_saved, rotation_saved, scaling_saved, scene_id, source_saved)
            selected_object = entity_img.object3D
            console.log("clicked image!!!", entity_img.object3D)
            //change name in properties
            document.getElementById('object_name').innerText = entity_img.id;
            //assign global variable so that delete will be easier
            selected_object_id = entity_img.id
            console.log("selected", selected_object_id)
            ///assign position
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_img.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_img.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_img.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_img.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_img.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_img.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_img.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_img.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_img.object3D.scale.z)
            // console.log(document.getElementsByClassName("map_value string")[0].defaultValue)

            // entity_img.setAttribute('src', document.getElementsByClassName("map_value string")[0].defaultValue)
            // console.log("to hide",document.getElementsByClassName("collapsible component collapsed")[0].defaultValue)
            // openProperties();


        });
        sceneEl.appendChild(entity_img);

    }
   
}
function close_rightpanel()
{
   document.getElementById('rightPanel').style.maxWidth = "0px"
}
function hotspot() {
    console.log("selected element", selected_object, selected_object_id)
    console.log("entity name", document.getElementsByClassName('entityPrint')[0], document.getElementsByClassName('entityPrint')[0].getElementsByClassName('entityName')[0].innerText, document.getElementsByClassName('entityPrint')[0].innerText)
    var newHotspotElement = document.getElementsByClassName('entityPrint')[0].getElementsByClassName('entityName')[0].innerText
    console.log("newhot", newHotspotElement)
    var findElement = document.getElementById(newHotspotElement.trim())
    console.log("found", findElement, findElement.object3D)
}
function onpropertiespreviewbutton() {
    console.log("check functioniomnality")
}
function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
}
function add_images1(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd,id_recd) {

    if (position_recd == "center") {
        console.log("position:", position_recd, rotation_recd, scaling_recd)
        // var sceneEl = document.querySelector('a-scene');
        console.log("received ", id)
        var sceneEl = document.getElementById(scene_id)
        var entity_img = document.createElement('a-image');
        entity_img.setAttribute('id', id_recd)
        entity_img.setAttribute('src', "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/Image_place%20holder.png")
        // entity_img.setAttribute('scale', { x: 2, y: 2, z: 2 })
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Image Properties::", entity_img.object3D.position.x);

        sceneEl.appendChild(entity_img);

    } else {
        console.log("position in else:", source_recd.asset_src, position_recd.position.x, rotation_recd, scaling_recd)
        // var sceneEl = document.querySelector('a-scene');
        console.log("received ", id, scene_id)
        var sceneEl = document.getElementById(scene_id)
        var entity_img = document.createElement('a-image');
        entity_img.setAttribute('id', id_recd)
        entity_img.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_img.setAttribute('rotation', { x: rotation_recd.rotation.x, y: rotation_recd.rotation.y, z: rotation_recd.rotation.z });
        entity_img.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });

        entity_img.setAttribute('src', source_recd.asset_src)
        entity_img.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });

        console.log("Image Properties::", entity_img.object3D.position.x);


        sceneEl.appendChild(entity_img);

    }

}
function add_imagesLoc(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {
    var newLoc = "latitude:"+LatitudeSaved+", longitude:"+ LongitudeSaved;
    if (position_recd == "center") {
        console.log("position:", position_recd, rotation_recd, scaling_recd)
        
        // var sceneEl = document.querySelector('a-scene');
        console.log("received ", id, scene_id)
        var sceneEl = document.getElementById(scene_id)
        var entity_img = document.createElement('a-image');
        entity_img.setAttribute('id', "image_added" + scene_id)
        entity_img.setAttribute('src', "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/Image_place%20holder.png")
        entity_img.setAttribute('gps-entity-place',newLoc)
        // entity_img.setAttribute('scale', { x: 2, y: 2, z: 2 })
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Image Properties::", entity_img.object3D.position.x);

        sceneEl.appendChild(entity_img);

    } else {
        console.log("position in else:", source_recd.asset_src, position_recd.position.x, rotation_recd, scaling_recd)
        // var sceneEl = document.querySelector('a-scene');
        console.log("received ", id, scene_id)
        var sceneEl = document.getElementById(scene_id)
        var entity_img = document.createElement('a-image');
        entity_img.setAttribute('id', "image_added" + scene_id)
        entity_img.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_img.setAttribute('rotation', { x: rotation_recd.rotation.x, y: rotation_recd.rotation.y, z: rotation_recd.rotation.z });
        entity_img.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });

        entity_img.setAttribute('src', source_recd.asset_src)
        entity_img.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });
        entity_img.setAttribute('gps-entity-place',newLoc)
        console.log("Image Properties::", entity_img.object3D.position.x);


        sceneEl.appendChild(entity_img);

    }

}
// function add_video(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {
//     if (position_recd == "center") {
//         // var sceneEl = document.querySelector('a-scene');
//         var sceneEl = document.getElementById(scene_id)
//         var entity_video = document.createElement('a-video');
//         entity_video.setAttribute('id', "video_added" + scene_id)
//         // entity_video.setAttribute('position', { x: 0, y: 1, z: -3 });
//         entity_video.setAttribute('src', "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/Video_place%20holder.png")
//         // entity_video.setAttribute('width', 8)
//         // entity_video.setAttribute('height', 5)
//         // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
//         console.log("VIdeo Properties::", entity_video);
//         //add it to structure
//         var ul = document.getElementById(id + "_elements");
//         document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
//         console.log("checking", ul, id)
//         var li = document.createElement("li");
//         var newImage = document.createElement('img')
//         newImage.src = "../../../app-assets//images/svg/Vector.png"
//         li.setAttribute('id', "li-" + entity_video.id);
//         li.appendChild(newImage)
//         li.appendChild(document.createTextNode("Video"));
//         li.addEventListener('click', function (e) {
//             elements_id_saved = id;
//             position_saved = position_recd
//             rotation_saved = rotation_recd
//             scaling_saved = scaling_recd
//             source_saved = source_recd
//             selected_object_id = "video_added" + scene_id
//             console.log("onlcick of", li.id)
//             var findobject = document.getElementById(selected_object_id)
//             console.log("found,", findobject.object3D)
//             selected_object = findobject.object3D
//             console.log("selected obj", selected_object)
//             // cloneasset()
//         });

//         ul.appendChild(li);
//         //onclick
//         entity_video.addEventListener('click', function (evt) {
//             document.getElementById('rightPanel').style.maxWidth = "286px"
//             console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
//             document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
//             document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
//             document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
//             document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
//             document.getElementById('componentEntityHeader').style.marginBottom = "50px"
//             console.log("console to check::::::",document.getElementById('sidebar').getElementsByClassName('components'));
//             document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
//             document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
//             var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

//             var findpropertiesdiv = document.getElementById('properties_value')
//             if (findpropertiesdiv) {
//                 console.log("found propernskjdfnkjdsn")
//             }
//             else{
//                 console.log(" NOT found propernskjdfnkjdsn")
//             }
            
//             console.log("sidebar:::::::::",getside)

//             var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
//             document.getElementById('addComponentContainer').remove()
//             var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')
           
//             for (let i = 1; i <= getsidebar.length; i++) {
//                 getsidebar[i].innerHTML = "";
//             }
//             elements_id_saved = id;
//             position_saved = position_recd
//             rotation_saved = rotation_recd
//             scaling_saved = scaling_recd
//             source_saved = source_recd
//             selected_object = entity_video.object3D
//             console.log("clicked image", entity_video)
//             document.getElementById('object_name').innerText = entity_video.id
//             selected_object_id = entity_video.id
//             var inputX = document.getElementById("translateX");
//             inputX.setAttribute('value', entity_video.object3D.position.x)
//             var inputY = document.getElementById("translateY");
//             inputY.setAttribute('value', entity_video.object3D.position.y)
//             var inputZ = document.getElementById("translateZ");
//             inputZ.setAttribute('value', entity_video.object3D.position.z)
//             var inputX = document.getElementById("rotateX");
//             inputX.setAttribute('value', entity_video.object3D.rotation.x)
//             var inputY = document.getElementById("rotateY");
//             inputY.setAttribute('value', entity_video.object3D.rotation.y)
//             var inputZ = document.getElementById("rotateZ");
//             inputZ.setAttribute('value', entity_video.object3D.rotation.z)
//             var inputX = document.getElementById("scaleX");
//             inputX.setAttribute('value', entity_video.object3D.scale.x)
//             var inputY = document.getElementById("scaleY");
//             inputY.setAttribute('value', entity_video.object3D.scale.y)
//             var inputZ = document.getElementById("scaleZ");
//             inputZ.setAttribute('value', entity_video.object3D.scale.z)
//             // openProperties();
//             // console.log(document.getElementsByClassName("map_value string")[0].defaultValue)

//             // entity_video.setAttribute('src', document.getElementsByClassName("map_value string")[0].defaultValue)
//         });
//         sceneEl.appendChild(entity_video);

//     } else {
//         console.log("in else", source_recd.asset_src)
//         // var sceneEl = document.querySelector('a-scene');
//         var sceneEl = document.getElementById(scene_id)
//         var entity_video = document.createElement('a-video');
//         entity_video.setAttribute('id', "video_added" + scene_id)
//         entity_video.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
//         entity_video.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });
//         entity_video.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd.rotation._y), z: THREE.Math.radToDeg(rotation_recd.rotation._z) });
//         entity_video.setAttribute('src', source_recd.asset_src)
//         // entity_video.setAttribute('width', 8)
//         // entity_video.setAttribute('height', 5)
//         // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
//         console.log("VIdeo Properties::", entity_video);
//         //add it to structure
//         var ul = document.getElementById(id + "_elements");
//         console.log("checking", ul, id)
//         var li = document.createElement("li");
//         var newImage = document.createElement('img')
//         newImage.src = "../../../app-assets//images/svg/Vector.png"
//         li.setAttribute('id', "li-" + entity_video.id);
//         li.appendChild(newImage)
//         li.appendChild(document.createTextNode("Video"));
//         li.addEventListener('click', function (e) {
//             elements_id_saved = id;
//             position_saved = position_recd
//             rotation_saved = rotation_recd
//             scaling_saved = scaling_recd
//             source_saved = source_recd
//             selected_object_id = "video_added" + scene_id
//             console.log("onlcick of", li.id)
//             var findobject = document.getElementById(selected_object_id)
//             console.log("found,", findobject.object3D)
//             selected_object = findobject.object3D
//             console.log("selected obj", selected_object)
//             // cloneasset()
//         });

//         ul.appendChild(li);
//         //onclick
//         entity_video.addEventListener('click', function (evt) {
//             document.getElementById('rightPanel').style.maxWidth = "286px"
//             console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
//             document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
//             document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
//             document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
//             document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
//             document.getElementById('componentEntityHeader').style.marginBottom = "50px"
//             console.log("console to check::::::",document.getElementById('sidebar').getElementsByClassName('components'));
//             document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
//             document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
//             var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

//             var findpropertiesdiv = document.getElementById('properties_value')
//             if (findpropertiesdiv) {
//                 console.log("found propernskjdfnkjdsn")
//             }
//             else{
//                 console.log(" NOT found propernskjdfnkjdsn")
//             }
            
//             console.log("sidebar:::::::::",getside)

//             var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
//             document.getElementById('addComponentContainer').remove()
//             var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')
           
//             for (let i = 1; i <= getsidebar.length; i++) {
//                 getsidebar[i].innerHTML = "";
//             }

//             console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
//             document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
//             // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
//             // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
//             console.log("console to check::::::",document.getElementById('sidebar').getElementsByClassName('components'));
//             var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML
            
//             console.log("sidebar:::::::::",getside)

             
//             var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            
            
         
//             document.getElementById('addComponentContainer').style.visibility = "hidden"
//             elements_id_saved = id;
//             position_saved = position_recd
//             rotation_saved = rotation_recd
//             scaling_saved = scaling_recd
//             source_saved = source_recd
//             selected_object = entity_video.object3D
//             console.log("clicked image", entity_video)
//             document.getElementById('object_name').innerText = entity_video.id
//             selected_object_id = entity_video.id
//             var inputX = document.getElementById("translateX");
//             inputX.setAttribute('value', entity_video.object3D.position.x)
//             var inputY = document.getElementById("translateY");
//             inputY.setAttribute('value', entity_video.object3D.position.y)
//             var inputZ = document.getElementById("translateZ");
//             inputZ.setAttribute('value', entity_video.object3D.position.z)
//             var inputX = document.getElementById("rotateX");
//             inputX.setAttribute('value', entity_video.object3D.rotation.x)
//             var inputY = document.getElementById("rotateY");
//             inputY.setAttribute('value', entity_video.object3D.rotation.y)
//             var inputZ = document.getElementById("rotateZ");
//             inputZ.setAttribute('value', entity_video.object3D.rotation.z)
//             var inputX = document.getElementById("scaleX");
//             inputX.setAttribute('value', entity_video.object3D.scale.x)
//             var inputY = document.getElementById("scaleY");
//             inputY.setAttribute('value', entity_video.object3D.scale.y)
//             var inputZ = document.getElementById("scaleZ");
//             inputZ.setAttribute('value', entity_video.object3D.scale.z)
//             // openProperties();
//             // console.log(document.getElementsByClassName("map_value string")[0].defaultValue)

//             // entity_video.setAttribute('src', document.getElementsByClassName("map_value string")[0].defaultValue)
//         });
//         sceneEl.appendChild(entity_video);

//     }


// }
function add_video(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd,id_recd) {
    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_video = document.createElement('a-video');
        var newcompoCounter = Math.floor((Math.random() * 1000) + 1);
        entity_video.setAttribute('id', "video_added" + newcompoCounter)
        // entity_video.setAttribute('position', { x: 0, y: 1, z: -3 });
        entity_video.setAttribute('src', "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/Video_place%20holder.png")
        // entity_video.setAttribute('src', "https://www.rhibhus.com/video/video.mp4")
      
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("VIdeo Properties::", entity_video);
        //add it to structure
        var ul = document.getElementById(id + "_elements");
        

        console.log("checking", ul, id)
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_video.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Video"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object_id = "video_added"  +newcompoCounter
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        ul.appendChild(li);
        //onclick
        entity_video.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = "video_added"  +newcompoCounter
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }

            console.log("sidebar:::::::::", getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

            for (let i = 1; i <= getsidebar.length; i++) {
                getsidebar[i].innerHTML = "";
            }
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_video.object3D
            console.log("clicked image", entity_video)
            document.getElementById('object_name').innerText = entity_video.id
            selected_object_id = entity_video.id
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_video.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_video.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_video.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_video.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_video.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_video.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_video.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_video.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_video.object3D.scale.z)
            // openProperties();
            // console.log(document.getElementsByClassName("map_value string")[0].defaultValue)

            // entity_video.setAttribute('src', document.getElementsByClassName("map_value string")[0].defaultValue)
        });
        sceneEl.appendChild(entity_video);

    } else {
        console.log("in else", source_recd.asset_src)
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_video = document.createElement('a-video');
        entity_video.setAttribute('id', id_recd)
        entity_video.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_video.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });
        entity_video.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd.rotation._y), z: THREE.Math.radToDeg(rotation_recd.rotation._z) });
        entity_video.setAttribute('src', source_recd.asset_src)
        
        // entity_video.setAttribute('width', 8)
        // entity_video.setAttribute('height', 5)
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("VIdeo Properties::", entity_video);
        //add it to structure
        var ul = document.getElementById(id + "_elements");
        
        console.log("checking", ul, id)
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_video.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Video"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object_id = id_recd
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        ul.appendChild(li);
        //onclick
        entity_video.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = id_recd
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }

            console.log("sidebar:::::::::", getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

            for (let i = 1; i <= getsidebar.length; i++) {
                getsidebar[i].innerHTML = "";
            }

            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            console.log("sidebar:::::::::", getside)


            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



            document.getElementById('addComponentContainer').style.visibility = "hidden"
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_video.object3D
            console.log("clicked image", entity_video)
            document.getElementById('object_name').innerText = entity_video.id
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_video.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_video.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_video.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_video.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_video.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_video.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_video.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_video.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_video.object3D.scale.z)
            // openProperties();
            // console.log(document.getElementsByClassName("map_value string")[0].defaultValue)

            // entity_video.setAttribute('src', document.getElementsByClassName("map_value string")[0].defaultValue)
        });
        sceneEl.appendChild(entity_video);

    }
    

}
function add_video1(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd,id_recd) {
    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_video = document.createElement('a-video');
        entity_video.setAttribute('id', id_recd)
        // entity_video.setAttribute('position', { x: 0, y: 1, z: -3 });
        entity_video.setAttribute('src', "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/Video_place%20holder.png")
        // entity_video.setAttribute('width', 8)
        // entity_video.setAttribute('height', 5)
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("VIdeo Properties::", entity_video);

        sceneEl.appendChild(entity_video);

    } else {
        console.log("in else", source_recd.asset_src)
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_video = document.createElement('video');
        entity_video.setAttribute('id', id_recd)
        entity_video.setAttribute('src', source_recd.asset_src)
        
        
        var entity_avideo = document.createElement('a-video');
        entity_avideo.setAttribute('id',id_recd+"a-video")
        entity_avideo.setAttribute('src', "#"+id_recd)
        entity_avideo.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_avideo.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });
        entity_avideo.setAttribute('rotation', { x: rotation_recd.rotation.x, y: rotation_recd.rotation.y, z: rotation_recd.rotation.z });
        
        // entity_video.setAttribute('width', 8)
        // entity_video.setAttribute('height', 5)
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("VIdeo Properties::", entity_video);
        entity_video.play()
        
        document.getElementById('a_assets').appendChild(entity_video);

        sceneEl.appendChild(entity_avideo);

    }


}
function add_videoLoc(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {
    var newLoc = "latitude:"+LatitudeSaved+", longitude:"+ LongitudeSaved;
    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_video = document.createElement('a-video');
        entity_video.setAttribute('id', "video_added" + scene_id)
        // entity_video.setAttribute('position', { x: 0, y: 1, z: -3 });
        entity_video.setAttribute('src', "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/Video_place%20holder.png")
        // entity_video.setAttribute('width', 8)
        // entity_video.setAttribute('height', 5)
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        entity_video.setAttribute('gps-entity-place',newLoc)
        console.log("VIdeo Properties::", entity_video);

        sceneEl.appendChild(entity_video);

    } else {
        console.log("in else", source_recd.asset_src)
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_video = document.createElement('a-video');
        entity_video.setAttribute('id', "video_added" + scene_id)
        entity_video.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_video.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });
        entity_video.setAttribute('rotation', { x: rotation_recd.rotation.x, y: rotation_recd.rotation.y, z: rotation_recd.rotation.z });
        entity_video.setAttribute('src', source_recd.asset_src)
        entity_video.setAttribute('gps-entity-place',newLoc)
        // entity_video.setAttribute('width', 8)
        // entity_video.setAttribute('height', 5)
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("VIdeo Properties::", entity_video);

        sceneEl.appendChild(entity_video);

    }


}
function changeTextValue(valuerecd)
{
    console.log("value",valuerecd,selected_object_id)
    var findtext = document.getElementById(selected_object_id)
    findtext.setAttribute('value',valuerecd)
}
function add_text(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd,id_recd) {
    
    var getdiv=document.getElementById("textValue")
    console.log("INNERHTML",getdiv,getdiv.innerHTML)
        if(getdiv.innerHTML=="")
        {
            getdiv.innerHTML = '<div><input type="text" id="myText" placeholder="enter text" value="" onchange="changeTextValue(this.value)"></div>'
        }
    
    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_text = document.createElement('a-text');
        var newcompoCounter = Math.floor((Math.random() * 1000) + 1);
        entity_text.setAttribute('id', "text" +newcompoCounter)
        entity_text.setAttribute('position', { x: 0, y: 0, z: -1 });
        entity_text.setAttribute('value', "new text" )
        entity_text.setAttribute('scale',{ x: 5, y: 5, z: 5 })
        //add it to structure
        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_text.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Text"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            console.log("onlcick of")
            
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            cut_element = li.id;
            selected_object_id = "text" +newcompoCounter
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        ul.appendChild(li);
        //onclick
        entity_text.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = "text" +newcompoCounter
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
           
            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::",document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else{
                console.log(" NOT found propernskjdfnkjdsn")
            }
            
            console.log("sidebar:::::::::",getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')
           
            for (let i = 1; i <= getsidebar.length; i++) {
                getsidebar[i].innerHTML = "";
            }

            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::",document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML
            
            console.log("sidebar:::::::::",getside)

             
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            
            
         
            document.getElementById('addComponentContainer').style.visibility = "hidden"

            elements_id_saved = id;

            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_text.object3D
            console.log("clicked image", entity_text.object3D)
            document.getElementById('object_name').innerText = data_arr[0]
           
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_text.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_text.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_text.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_text.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_text.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_text.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_text.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_text.object3D.scale.z)
            // openProperties();
        });
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Model Properties::", entity_text.object3D);

        sceneEl.appendChild(entity_text);

    } else {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_text = document.createElement('a-text');
        entity_text.setAttribute('id', id_recd)
        entity_text.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_text.setAttribute( 'value', source_recd )
        entity_text.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z })
        entity_text.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd.rotation._y), z: THREE.Math.radToDeg(rotation_recd.rotation._z) });
        //add it to structure
        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_text.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Text"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            console.log("onlcick of")
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            cut_element = li.id;
            selected_object_id = id_recd
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        ul.appendChild(li);
        //onclick
        entity_text.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = id_recd
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            
            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::",document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else{
                console.log(" NOT found propernskjdfnkjdsn")
            }
            
            console.log("sidebar:::::::::",getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')
           
            for (let i = 1; i <= getsidebar.length; i++) {
                getsidebar[i].innerHTML = "";
            }

            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::",document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML
            
            console.log("sidebar:::::::::",getside)

             
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            
            
         
            document.getElementById('addComponentContainer').style.visibility = "hidden"

            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_text.object3D
            console.log("clicked image", entity_text)
            document.getElementById('object_name').innerText = data_arr[0]
            
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_text.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_text.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_text.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_text.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_text.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_text.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_text.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_text.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_text.object3D.scale.z)
            // openProperties();
        });
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Model Properties::", entity_text.object3D);

        sceneEl.appendChild(entity_text);

    }

}
function add_text1(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd,id_recd) {


    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_text = document.createElement('a-text');
        entity_text.setAttribute('id', id_recd)
        entity_text.setAttribute('position', { x: 0, y: 0, z: -1 });
        entity_text.setAttribute('value', "new text")
        entity_text.setAttribute('scale', { x: 5, y: 5, z: 5 })
       
        ul.appendChild(li);
        //onclick
       
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Model Properties::", entity_text.object3D);

        sceneEl.appendChild(entity_text);

    } else {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_text = document.createElement('a-text');
        entity_text.setAttribute('id', id_recd)
        entity_text.setAttribute('value', "new text")
        entity_text.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_text.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z })
        entity_text.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd.rotation._y), z: THREE.Math.radToDeg(rotation_recd.rotation._z) });
       
       
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Model Properties::", entity_text.object3D);

        sceneEl.appendChild(entity_text);

    }

}

function add_cube(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd,id_recd) {
    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_cube = document.createElement('a-box');
        // entity_cube.className="draggable"
        var newcompoCounter = Math.floor((Math.random() * 1000) + 1);
        entity_cube.setAttribute('id', "cube" +newcompoCounter)
        entity_cube.setAttribute('position', { x: 0, y: 0, z: 0 });
        entity_cube.setAttribute('scale', { x: 1, y: 1, z: 1 })
        entity_cube.setAttribute('color', "red");
        // entity_cube.setAttribute('material', 'src', 'url(assets/images/author/author-2.jpg)')
        console.log("cube Properties::", entity_cube);

        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_cube.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Cube"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object_id = "cube" +newcompoCounter
           //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        ul.appendChild(li);
        //onclick
        entity_cube.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = "cube" +newcompoCounter
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }

            console.log("sidebar:::::::::", getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

            for (let i = 1; i <= getsidebar.length; i++) {
                getsidebar[i].innerHTML = "";
            }

            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            console.log("sidebar:::::::::", getside)


            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



            document.getElementById('addComponentContainer').style.visibility = "hidden"

            selected_object = entity_cube.object3D
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            console.log("clicked cube", entity_cube.object3D)
            console.log("color::", entity_cube.getAttribute('color'))
            console.log("texture::", entity_cube.getAttribute('texture'))
            document.getElementById('texture_display').innerText = entity_cube.getAttribute('texture')
            document.getElementById('object_name').innerText = entity_cube.id
            document.getElementById("obj_color").style.backgroundColor = entity_cube.getAttribute('color')
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_cube.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_cube.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_cube.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_cube.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_cube.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_cube.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_cube.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_cube.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_cube.object3D.scale.z)
            // openProperties();
            // console.log(document.getElementsByClassName("map_value string")[0].defaultValue)
            // source_saved = document.getElementsByClassName("map_value string")[0].defaultValue
            // entity_cube.setAttribute('material', 'src', document.getElementsByClassName("map_value string")[0].defaultValue)
            console.log("next line")
            console.log("find collapsible component", document.getElementsByClassName("collapsible-component"))
            document.getElementById('addComponentContainer').style.visibility = "hidden"
        });

        sceneEl.appendChild(entity_cube);


    } else {
        // var sceneEl = document.querySelector('a-scene');
        console.log("poSITION", position_recd)
        var sceneEl = document.getElementById(scene_id)
        var entity_cube = document.createElement('a-box');
        // entity_cube.className="draggable"
        entity_cube.setAttribute('id', id_recd)
        entity_cube.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_cube.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z })
        entity_cube.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd.rotation._y), z: THREE.Math.radToDeg(rotation_recd.rotation._z) });
        entity_cube.setAttribute('color', "red");
        // entity_cube.setAttribute('material', 'src', 'url(assets/images/author/author-2.jpg)')
        console.log("cube Properties::", entity_cube);

        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_cube.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Cube"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object_id = id_recd
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        ul.appendChild(li);
        //onclick
        entity_cube.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = id_recd
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }

            console.log("sidebar:::::::::", getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

            for (let i = 1; i <= getsidebar.length; i++) {
                getsidebar[i].innerHTML = "";
            }

            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            console.log("sidebar:::::::::", getside)


            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



            document.getElementById('addComponentContainer').style.visibility = "hidden"

            selected_object = entity_cube.object3D
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            console.log("next line")
            console.log("find collapsible component", document.getElementsByClassName("collapsible-component"))
            document.getElementById('addComponentContainer').style.visibility = "hidden"
            console.log("clicked cube", entity_cube.object3D)
            console.log("color::", entity_cube.getAttribute('color'))
            // console.log("texture::", entity_cube.getAttribute('texture'))
            document.getElementById('object_name').innerText = entity_cube.id
            document.getElementById("obj_color").style.backgroundColor = entity_cube.getAttribute('color')
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_cube.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_cube.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_cube.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_cube.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_cube.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_cube.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_cube.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_cube.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_cube.object3D.scale.z)
            // openProperties();
            // console.log(document.getElementsByClassName("map_value string")[0].defaultValue)
            // source_saved = document.getElementsByClassName("map_value string")[0].defaultValue
            // entity_cube.setAttribute('material', 'src', document.getElementsByClassName("map_value string")[0].defaultValue)

        });

        sceneEl.appendChild(entity_cube);


    }
    


}
function add_cube1(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd,id_recd) {
    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_cube = document.createElement('a-box');
        // entity_cube.className="draggable"
        entity_cube.setAttribute('id',id_recd)
        entity_cube.setAttribute('position', { x: 0, y: 1, z: -3 });
        entity_cube.setAttribute('scale', { x: 1, y: 1, z: 1 })
        entity_cube.setAttribute('color', "red");
        entity_cube.setAttribute('material', 'src', 'url(assets/images/author/author-2.jpg)')
        console.log("cube Properties::", entity_cube);


        sceneEl.appendChild(entity_cube);


    } else {
        // var sceneEl = document.querySelector('a-scene');
        console.log("poSITION", position_recd)
        var sceneEl = document.getElementById(scene_id)
        var entity_cube = document.createElement('a-box');
        // entity_cube.className="draggable"
        entity_cube.setAttribute('id', id_recd)
        entity_cube.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_cube.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z })
        entity_cube.setAttribute('rotation', { x: rotation_recd.rotation.x, y: rotation_recd.rotation.y, z: rotation_recd.rotation.z });
        entity_cube.setAttribute('color', "red");
        entity_cube.setAttribute('material', 'src', 'url(assets/images/author/author-2.jpg)')
        console.log("cube Properties::", entity_cube);


        sceneEl.appendChild(entity_cube);


    }



}
function add_cubeLoc(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {
    var newLoc = "latitude:"+LatitudeSaved+", longitude:"+ LongitudeSaved;
    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_cube = document.createElement('a-box');
        // entity_cube.className="draggable"
        entity_cube.setAttribute('id', "cube" + scene_id)
        entity_cube.setAttribute('position', { x: 0, y: 1, z: -3 });
        entity_cube.setAttribute('scale', { x: 1, y: 1, z: 1 })
        entity_cube.setAttribute('color', "red");
        entity_cube.setAttribute('material', 'src', 'url(assets/images/author/author-2.jpg)')
        entity_cube.setAttribute('gps-entity-place',newLoc)
        console.log("cube Properties::", entity_cube);


        sceneEl.appendChild(entity_cube);


    } else {
        // var sceneEl = document.querySelector('a-scene');
        console.log("poSITION", position_recd)
        var sceneEl = document.getElementById(scene_id)
        var entity_cube = document.createElement('a-box');
        // entity_cube.className="draggable"
        entity_cube.setAttribute('id', "cube" + scene_id)
        entity_cube.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_cube.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z })
        entity_cube.setAttribute('rotation', { x: rotation_recd.rotation.x, y: rotation_recd.rotation.y, z: rotation_recd.rotation.z });
        entity_cube.setAttribute('color', "red");
        entity_cube.setAttribute('material', 'src', 'url(assets/images/author/author-2.jpg)')
        entity_cube.setAttribute('gps-entity-place',newLoc)
        console.log("cube Properties::", entity_cube);


        sceneEl.appendChild(entity_cube);


    }



}

function foo() {
    console.log("onload")

    setTimeout(
        function () {
            window.postMessage('INJECT_AFRAME_INSPECTOR', '*');
            console.log("inside timeout")
        }, 3000);
    // document.getElementById("open_inspector").style.visibility = "hidden";
}

function close() {
    this.el.components.inspector.remove();
}

function changeModel(modellink, id, scene_id, position_recd, scaling_recd, rotation_recd, source_recd,id_recd) {

    console.log("inchange model", modellink)
    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_gltf = document.createElement('a-gltf-model');
        var data_arr = modellink.split('+&mbxr+');
        console.log(data_arr)
        var newcompoCounter = Math.floor((Math.random() * 1000) + 1);
        entity_gltf.setAttribute('id', "model"  + newcompoCounter)
        entity_gltf.setAttribute('position', { x: 0, y: 0, z: 0 });
        entity_gltf.setAttribute('src', "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/cube/scene.gltf")
        entity_gltf.setAttribute('scale', { x: 0.5, y: 0.5, z: 0.5 })
        //add it to structure
        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_gltf.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Model"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            console.log("onlcick of")
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = modellink
            cut_element = li.id;
            selected_object_id = "model" +newcompoCounter
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        ul.appendChild(li);
        //onclick
        entity_gltf.addEventListener('click', function (evt) {
            selected_object_id = "model" +newcompoCounter
            document.getElementById('rightPanel').style.maxWidth = "286px"
           var present= document.getElementById('componentEntityHeader').innerHTML
           var newsidebar= "<div>hi</div>"+present
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";

            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML
            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }

            console.log("sidebar:::::::::", getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            // document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

            // for (let i = 1; i <= getsidebar.length; i++) {
            //     getsidebar[i].innerHTML = "";
            // }
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            console.log("sidebar:::::::::", getside)


            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



            document.getElementById('addComponentContainer').style.visibility = "hidden"

            elements_id_saved = id;

            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_gltf.object3D
            console.log("clicked image got for focus", entity_gltf.object3D)
            // document.getElementById('object_name').innerText = data_arr[0]
            
            var inputX = document.getElementById("translateX");
            console.log('jiss',document.getElementById('jiss'))
            let jiss = document.getElementById("jiss")
            jiss.setAttribute('value',entity_gltf.object3D.position.x)
            inputX.setAttribute('value', entity_gltf.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_gltf.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_gltf.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_gltf.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_gltf.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_gltf.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_gltf.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_gltf.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_gltf.object3D.scale.z)
            // openProperties();
        });
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Model Properties::", entity_gltf.object3D);

        sceneEl.appendChild(entity_gltf);

    } else {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_gltf = document.createElement('a-gltf-model');
        var data_arr = modellink.split('+&mbxr+');
        console.log(data_arr)
        entity_gltf.setAttribute('id',id_recd)
        entity_gltf.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_gltf.setAttribute('src', source_recd.asset_src)
        entity_gltf.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z })
        entity_gltf.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd.rotation._y), z: THREE.Math.radToDeg(rotation_recd.rotation._z) });
        //add it to structure
        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_gltf.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Model"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            console.log("onlcick of")
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            cut_element = li.id;
            selected_object_id = id_recd
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        ul.appendChild(li);
        //onclick
        entity_gltf.addEventListener('click', function (evt) {
            selected_object_id = id_recd
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";

            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }

            console.log("sidebar:::::::::", getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

            for (let i = 1; i <= getsidebar.length; i++) {
                getsidebar[i].innerHTML = "";
            }

            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            console.log("sidebar:::::::::", getside)


            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



            document.getElementById('addComponentContainer').style.visibility = "hidden"

            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_gltf.object3D
            console.log("clicked image 2nd choice", entity_gltf)
            document.getElementById('object_name').innerText = data_arr[0]
            
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_gltf.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_gltf.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_gltf.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_gltf.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_gltf.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_gltf.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_gltf.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_gltf.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_gltf.object3D.scale.z)
            // openProperties();
        });
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Model Properties::", entity_gltf.object3D);

        sceneEl.appendChild(entity_gltf);

    }
    

}
function changeModel1(modellink, id, scene_id,position_recd, scaling_recd, rotation_recd, source_recd,id_recd) {
    console.log(modellink)
    // var sceneEl = document.querySelector('a-scene');
    var sceneEl = document.getElementById(scene_id)
    var entity_gltf = document.createElement('a-gltf-model');
    var data_arr = modellink.split('+&mbxr+');
    console.log(data_arr)
    
   
    entity_gltf.setAttribute('src', source_recd.asset_src)
    entity_gltf.setAttribute('id', id_recd)
    entity_gltf.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
    entity_gltf.setAttribute('rotation', { x: rotation_recd.rotation.x, y: rotation_recd.rotation.y, z: rotation_recd.rotation.z });
    entity_gltf.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });
    console.log("Model Properties::", entity_gltf.object3D);

    sceneEl.appendChild(entity_gltf);
}


function add_torus(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd,id_recd) {

    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_gltftorus = document.createElement('a-torus');
        var newcompoCounter = Math.floor((Math.random() * 1000) + 1);
        entity_gltftorus.setAttribute('id', "torus"+newcompoCounter)
        entity_gltftorus.setAttribute('position', { x: 0, y: 0, z: -1 });
        entity_gltftorus.setAttribute('radius', 2)
        entity_gltftorus.setAttribute('radiusTubular', 0.5)
        entity_gltftorus.setAttribute('arc', 180)

        //add it to structure
        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_gltftorus.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Torus"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            console.log("onlcick of")
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            cut_element = li.id;
            selected_object_id = "torus"  +newcompoCounter
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        ul.appendChild(li);
        //onclick
        entity_gltftorus.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = "torus"  +newcompoCounter
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";

            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }

            console.log("sidebar:::::::::", getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

            for (let i = 1; i <= getsidebar.length; i++) {
                getsidebar[i].innerHTML = "";
            }

            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            console.log("sidebar:::::::::", getside)


            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



            document.getElementById('addComponentContainer').style.visibility = "hidden"

            elements_id_saved = id;

            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_gltftorus.object3D
            console.log("clicked image 3rd choice", entity_gltftorus.object3D)
            document.getElementById('object_name').innerText = data_arr[0]
            
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_gltftorus.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_gltftorus.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_gltftorus.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_gltftorus.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_gltftorus.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_gltftorus.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.scale.z)
            // openProperties();
        });
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Model Properties::", entity_gltftorus.object3D);

        sceneEl.appendChild(entity_gltftorus);

    } else {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_gltftorus = document.createElement('a-torus');
        entity_gltftorus.setAttribute('id', id_recd)
        entity_gltftorus.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_gltftorus.setAttribute('radius', 2)
        entity_gltftorus.setAttribute('radiusTubular', 0.5)
        entity_gltftorus.setAttribute('arc', 180)
        entity_gltftorus.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z })
        entity_gltftorus.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd.rotation._y), z: THREE.Math.radToDeg(rotation_recd.rotation._z) });
        //add it to structure
        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_gltftorus.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Torus"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            console.log("onlcick of")
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            cut_element = li.id;
            selected_object_id =id_recd
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        ul.appendChild(li);
        //onclick
        entity_gltftorus.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id =id_recd
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";

            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }

            console.log("sidebar:::::::::", getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

            for (let i = 1; i <= getsidebar.length; i++) {
                getsidebar[i].innerHTML = "";
            }

            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            console.log("sidebar:::::::::", getside)


            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



            document.getElementById('addComponentContainer').style.visibility = "hidden"

            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_gltftorus.object3D
            console.log("clicked image getting 4th", entity_gltftorus)
            document.getElementById('object_name').innerText = data_arr[0]
            
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_gltftorus.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_gltftorus.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_gltftorus.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_gltftorus.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_gltftorus.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_gltftorus.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.scale.z)
            // openProperties();
        });
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Model Properties::", entity_gltftorus.object3D);

        sceneEl.appendChild(entity_gltftorus);

    }
   
}
function add_torus1(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd,id_recd) {

    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_gltftorus = document.createElement('a-torus');
        entity_gltftorus.setAttribute('id', id_recd)
        entity_gltftorus.setAttribute('position', { x: 0, y: 0, z: -1 });
        entity_gltftorus.setAttribute('radius', 2)
        entity_gltftorus.setAttribute('radiusTubular', 0.5)
        entity_gltftorus.setAttribute('arc', 180)

      
       
        //onclick
       
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Model Properties::", entity_gltftorus.object3D);

        sceneEl.appendChild(entity_gltftorus);

    } else {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_gltftorus = document.createElement('a-torus');
        entity_gltftorus.setAttribute('id',  id_recd)
        entity_gltftorus.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_gltftorus.setAttribute('radius', 2)
        entity_gltftorus.setAttribute('radiusTubular', 0.5)
        entity_gltftorus.setAttribute('arc', 180)
        entity_gltftorus.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z })
        entity_gltftorus.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd.rotation._y), z: THREE.Math.radToDeg(rotation_recd.rotation._z) });
       
        
       
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Model Properties::", entity_gltftorus.object3D);

        sceneEl.appendChild(entity_gltftorus);

    }

}

function add_light(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd,id_recd) {

    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_light = document.createElement('a-light');
        var newcompoCounter = Math.floor((Math.random() * 1000) + 1);
        entity_light.setAttribute('id', "light"+newcompoCounter)
        // entity_light.setAttribute('geometry',"primitive: cylinder");
        entity_light.setAttribute('gltf-model', "url(https://www.rhibhus.com/AR_Trial/metabild/editor/realistic_light_bulb__low_poly/scene.gltf)")
        entity_light.setAttribute('position', { x: 0, y: 1, z: 0 })
        entity_light.setAttribute('scale', { x: 0.2, y: 0.2, z: 0.2 })
        entity_light.setAttribute('type', "directional");
        entity_light.setAttribute('color', "green")
        // var entity_lightbox = document.createElement('a-box');
        // entity_lightbox.setAttribute('color', "pink")
        // entity_lightbox.setAttribute('scale', { x: 0.5, y: 0.5, z: 0.5 })
        // entity_light.appendChild(entity_lightbox)

        //add it to structure
        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_light.id);
        var searchid = "li-" + entity_light.id
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Light"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            console.log("onlcick of")
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            cut_element = li.id;
            selected_object_id = "light"+newcompoCounter
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        //onclcik
        entity_light.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = "light"+newcompoCounter
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";

            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            // document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }

            console.log("sidebar:::::::::", getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

            // for (let i = 1; i <= getsidebar.length; i++) {
            //     getsidebar[i].innerHTML = "";
            // }
            getsidebar[1].innerHTML = "";
            console.log("remove from", getsidebar[2].getElementsByClassName('propertyRow'))
            console.log("number", getsidebar[2].getElementsByClassName('propertyRow').length);
            var count = getsidebar[2].getElementsByClassName('propertyRow').length;
            var checkcount = 0;
            getsidebar[2].querySelectorAll('.propertyRow').forEach(function (a) {
                if (checkcount != 2) {
                    if (checkcount != 21) {
                        console.log("checkhere", a)
                        a.remove()
                    }
                }
                checkcount++;
            })
            //  for (let i = 1; i <= getsidebar[2].getElementsByClassName('propertyRow').length; i++) {
            //     console.log("check",getsidebar[2].getElementsByClassName('propertyRow')[i])
            //     if(i>=1 || i<=18)
            //     {
            //         console.log("removed")
            //         var elements = getsidebar[2].getElementsByClassName('propertyRow')[i]
            //         while(elements.length > 0){
            //             elements[0].parentNode.removeChild(elements[0]);
            //         }
            //     }
            // }


            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            console.log("sidebar:::::::::", getside)


            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



            document.getElementById('addComponentContainer').style.visibility = "hidden"

            elements_id_saved = id;

            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_gltftorus.object3D
            console.log("clicked image 5th", entity_gltftorus.object3D)
            document.getElementById('object_name').innerText = data_arr[0]
            
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_gltftorus.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_gltftorus.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_gltftorus.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_gltftorus.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_gltftorus.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_gltftorus.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.scale.z)
            // openProperties();
        });

        ul.appendChild(li);

        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("light Properties::", entity_light.object3D);

        sceneEl.appendChild(entity_light);

    } else {
        var entity_light = document.createElement('a-light');
        entity_light.setAttribute('id', id_recd)
        entity_light.setAttribute('gltf-model', "url(https://www.rhibhus.com/AR_Trial/metabild/editor/realistic_light_bulb__low_poly/scene.gltf)")
        entity_light.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_light.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });
        entity_light.setAttribute('type', "directional");
        entity_light.setAttribute('color', "green")


        //add it to structure
        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_light.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Light"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"
        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            console.log("onlcick of")
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            cut_element = li.id;
            selected_object_id = id_recd
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        //onclcik
        entity_light.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = id_recd
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";

            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            // document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }

            console.log("sidebar:::::::::", getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

            // for (let i = 1; i <= getsidebar.length; i++) {
            //     getsidebar[i].innerHTML = "";
            // }
            getsidebar[1].innerHTML = "";
            console.log("remove from", getsidebar[2].getElementsByClassName('propertyRow'))
            console.log("number", getsidebar[2].getElementsByClassName('propertyRow').length);
            var count = getsidebar[2].getElementsByClassName('propertyRow').length;
            var checkcount = 0;
            getsidebar[2].querySelectorAll('.propertyRow').forEach(function (a) {
                if (checkcount !== 2) {
                    if (checkcount !== 21) {
                        console.log("checkhere", a)
                        a.remove()
                    }
                }
                checkcount++;
            })
            //  for (let i = 1; i <= getsidebar[2].getElementsByClassName('propertyRow').length; i++) {
            //     console.log("check",getsidebar[2].getElementsByClassName('propertyRow')[i])
            //     if(i>=1 || i<=18)
            //     {
            //         console.log("removed")
            //         var elements = getsidebar[2].getElementsByClassName('propertyRow')[i]
            //         while(elements.length > 0){
            //             elements[0].parentNode.removeChild(elements[0]);
            //         }
            //     }
            // }


            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            console.log("sidebar:::::::::", getside)


            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



            document.getElementById('addComponentContainer').style.visibility = "hidden"

            elements_id_saved = id;

            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_gltftorus.object3D
            console.log("clicked image", entity_gltftorus.object3D)
            document.getElementById('object_name').innerText = data_arr[0]
            
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_gltftorus.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_gltftorus.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_gltftorus.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_gltftorus.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_gltftorus.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_gltftorus.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_gltftorus.object3D.scale.z)
            // openProperties();
        });

        ul.appendChild(li);

        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("light Properties::", entity_light.object3D);

        sceneEl.appendChild(entity_light);

    }
    



}

function add_light1(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd,id_recd) {

    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_light = document.createElement('a-light');
        entity_light.setAttribute('id',  id_recd)
        // entity_light.setAttribute('geometry',"primitive: cylinder");
        entity_light.setAttribute('gltf-model', "url(https://www.rhibhus.com/AR_Trial/metabild/editor/realistic_light_bulb__low_poly/scene.gltf)")
        entity_light.setAttribute('position', { x: 0, y: 1, z: 0 })
        entity_light.setAttribute('scale', { x: 0.2, y: 0.2, z: 0.2 })
        entity_light.setAttribute('type', "directional");
        entity_light.setAttribute('color', "green")
        
       

        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("light Properties::", entity_light.object3D);

        sceneEl.appendChild(entity_light);

    } else {
        var entity_light = document.createElement('a-light');
        entity_light.setAttribute('id', id_recd)
        entity_light.setAttribute('gltf-model', "url(https://www.rhibhus.com/AR_Trial/metabild/editor/realistic_light_bulb__low_poly/scene.gltf)")
        entity_light.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_light.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });
        entity_light.setAttribute('type', "directional");
        entity_light.setAttribute('color', "green")


      

        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("light Properties::", entity_light.object3D);

        sceneEl.appendChild(entity_light);

    }




}
function add_sound(id, scene_id,position_recd, rotation_recd, scaling_recd, source_recd,id_recd) {
    if (position_recd == "center") {
        var samplemp3 = "https://www.rhibhus.com/AR_Trial/sample-15s.mp3";
        var soundsrc = "src: url(" + samplemp3 + "); autoplay: true"
        var sceneEl = document.getElementById(scene_id)
        var entity_sound = document.createElement('a-sound');
        var newcompoCounter = Math.floor((Math.random() * 1000) + 1);
        entity_sound.setAttribute('id', "sound" +newcompoCounter)
        entity_sound.setAttribute('gltf-model', "url(https://www.rhibhus.com/AR_Trial/metabild/editor/mid_frequency_speaker/scene.gltf)")
        entity_sound.setAttribute('scale', { x: 0.002, y: 0.002, z: 0.002 })
        entity_sound.setAttribute('src', samplemp3)
        entity_sound.setAttribute('autoplay', true)
        entity_sound.setAttribute('position', { x: 0, y: 1, z: 0 })
        entity_sound.setAttribute('rotation', { x: 25, y: 1, z: 0 })
        //add it to structure
        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_sound.id);
        li.appendChild(newImage)
        var searchid = "sound" + scene_id +newcompoCounter
        li.appendChild(document.createTextNode("Sound"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"
    
        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            
            console.log("onlcick of")
            elements_id_saved = id;
    
            cut_element = li.id;
            selected_object_id = "sound"+newcompoCounter
    
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });
        entity_sound.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = "sound"+newcompoCounter
            console.log("check ur;", $('#' + searchid).attr('src'))
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
    
            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            // document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML
    
            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }
    
            console.log("sidebar:::::::::", getside)
    
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')
            getsidebar[1].innerHTML = "";
            // for (let i = 1; i <= getsidebar.length; i++) {
            //     getsidebar[i].innerHTML = "";
            // }
            console.log("remove from", getsidebar[2].getElementsByClassName('propertyRow'))
            console.log("number", getsidebar[2].getElementsByClassName('propertyRow').length);
            var count = getsidebar[2].getElementsByClassName('propertyRow').length;
            var checkcount = 0;
            getsidebar[2].querySelectorAll('.propertyRow').forEach(function (a) {
                if (checkcount !== 0) {
    
                    console.log("checkhere", a)
                    a.remove()
    
                }
                checkcount++;
            })
            //  for (let i = 1; i <= getsidebar[2].getElementsByClassName('propertyRow').length; i++) {
            //     console.log("check",getsidebar[2].getElementsByClassName('propertyRow')[i])
            //     if(i>=1 || i<=18)
            //     {
            //         console.log("removed")
            //         var elements = getsidebar[2].getElementsByClassName('propertyRow')[i]
            //         while(elements.length > 0){
            //             elements[0].parentNode.removeChild(elements[0]);
            //         }
            //     }
            // }
    
    
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML
    
            console.log("sidebar:::::::::", getside)
    
    
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
    
    
    
            document.getElementById('addComponentContainer').style.visibility = "hidden"
    
            elements_id_saved = id;
    
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_sound.object3D
        });
        ul.appendChild(li);
        sceneEl.appendChild(entity_sound);
       
    
    } else {
        var samplemp3 = source_recd;
        var soundsrc = "src: url(" + samplemp3 + "); autoplay: true"
        var sceneEl = document.getElementById(scene_id)
        var entity_sound = document.createElement('a-sound');
        
        entity_sound.setAttribute('id', id_recd)
        entity_sound.setAttribute('gltf-model', "url(https://www.rhibhus.com/AR_Trial/metabild/editor/mid_frequency_speaker/scene.gltf)")
        
        entity_sound.setAttribute('src', samplemp3)
        entity_sound.setAttribute('autoplay', true)
        entity_sound.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });

        entity_sound.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd.rotation._y), z: THREE.Math.radToDeg(rotation_recd.rotation._z) });

        entity_sound.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });

        //add it to structure
        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + id_recd);
        li.appendChild(newImage)
        var searchid = "sound" + scene_id +newcompoCounter
        li.appendChild(document.createTextNode("Sound"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"
    
        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            
            console.log("onlcick of")
            elements_id_saved = id;
    
            cut_element = li.id;
            selected_object_id = "sound"+newcompoCounter
    
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });
        entity_sound.addEventListener('click', function (evt) {
            document.getElementById("sidebar").style.display = "block"
            selected_object_id = "sound"+newcompoCounter
            console.log("check ur;", $('#' + searchid).attr('src'))
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
    
            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            // document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML
    
            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else {
                console.log(" NOT found propernskjdfnkjdsn")
            }
    
            console.log("sidebar:::::::::", getside)
    
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')
            getsidebar[1].innerHTML = "";
            // for (let i = 1; i <= getsidebar.length; i++) {
            //     getsidebar[i].innerHTML = "";
            // }
            console.log("remove from", getsidebar[2].getElementsByClassName('propertyRow'))
            console.log("number", getsidebar[2].getElementsByClassName('propertyRow').length);
            var count = getsidebar[2].getElementsByClassName('propertyRow').length;
            var checkcount = 0;
            getsidebar[2].querySelectorAll('.propertyRow').forEach(function (a) {
                if (checkcount !== 0) {
    
                    console.log("checkhere", a)
                    a.remove()
    
                }
                checkcount++;
            })
            //  for (let i = 1; i <= getsidebar[2].getElementsByClassName('propertyRow').length; i++) {
            //     console.log("check",getsidebar[2].getElementsByClassName('propertyRow')[i])
            //     if(i>=1 || i<=18)
            //     {
            //         console.log("removed")
            //         var elements = getsidebar[2].getElementsByClassName('propertyRow')[i]
            //         while(elements.length > 0){
            //             elements[0].parentNode.removeChild(elements[0]);
            //         }
            //     }
            // }
    
    
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML
    
            console.log("sidebar:::::::::", getside)
    
    
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
    
    
    
            document.getElementById('addComponentContainer').style.visibility = "hidden"
    
            elements_id_saved = id;
    
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_sound.object3D
        });
        ul.appendChild(li);
        sceneEl.appendChild(entity_sound);
       
    
    }

  
}
function add_sound1(id, scene_id,id_recd) {
    console.log("insound!!!!", id,scene_id,id_recd)
    var samplemp3 = "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/sample.mp3";
    var soundsrc = "src: url(" + samplemp3 + "); autoplay: true"
    var sceneEl = document.getElementById(scene_id)
    console.log("scene",sceneEl)
    // var entity_sound = document.createElement('a-sound');
    // var newcompoCounter = Math.floor((Math.random() * 1000) + 1);
    // entity_sound.setAttribute('id', id_recd)
    var entity_sound = document.createElement('audio');
    entity_sound.setAttribute('id', id_recd)
    entity_sound.setAttribute('src', samplemp3)
    // entity_sound.setAttribute('gltf-model', "url(https://www.rhibhus.com/AR_Trial/metabild/editor/mid_frequency_speaker/scene.gltf)")
    // entity_sound.setAttribute('scale', { x: 0.002, y: 0.002, z: 0.002 })
    // entity_sound.setAttribute('src', samplemp3)
    var entity_asound = document.createElement('a-entity');
    entity_asound.setAttribute('src', "#"+id_recd)
    entity_asound.setAttribute('position', { x: 0, y: 1, z: 0 })
    entity_asound.setAttribute('rotation', { x: 25, y: 1, z: 0 })
    entity_asound.setAttribute('sound',soundsrc)

    document.getElementById('a_assets').appendChild(entity_sound);
    sceneEl.appendChild(entity_asound);
   

}
function onClickOfObject(value) {
    console.log('clicked', value)
}
function onChange_xinput(value) {
    console.log("x::", value)
    var sceneEl = document.querySelector("#tree").object3D;
    console.log("sceneel", sceneEl)
    var groupObject3D = document.querySelector('a-entity').object3D;
    console.log("new", groupObject3D.parent);
    console.log(groupObject3D.children);


}
function dropdownFunction(value, id) {

    console.log("dropdown", value, id, scene_id)
    console.log("subsutring", id.split('-')[1])
    scene_id = id.split('-')[1];
    var send_position = "center";
    var send_rotation = "center";
    var send_scaling = "center";
    var send_source = "center";
    var asset="";
    if (value == "Image") {
        add_images(id, scene_id, send_position, send_rotation, send_scaling, send_source,asset);
    }
    else if (value == "Model") {
        // changeModel("https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/cube/scene.gltf+&mbxr+0+&mbxr+0+&mbxr+-2+&mbxr+1+&mbxr+1+&mbxr+1", id, scene_id, send_position, send_scaling, send_rotation, send_source,asset)
        changeModel("https://www.rhibhus.com/AR_Trial/metabild/editor/GLTFPLANE/scene.gltf+&mbxr+0+&mbxr+0+&mbxr+-2+&mbxr+0.005+&mbxr+0.005+&mbxr+0.005", id, scene_id, send_position, send_scaling, send_rotation, send_source,asset)
    } else if (value == "Video") {
        add_video(id, scene_id, send_position, send_rotation, send_scaling, send_source,asset);

    } else if (value == "Torus") {
        add_torus(id, scene_id, send_position, send_rotation, send_scaling, send_source,asset);
        add_light(id, scene_id, send_position, send_rotation, send_scaling, send_source,asset);
    }
    else if (value == "light") {
        console.log("hrerr")
        add_light(id, scene_id, send_position, send_rotation, send_scaling, send_source,asset);
    }
    else if (value == "Sound") {

        add_sound(id, scene_id,send_position, send_rotation, send_scaling, send_source,asset);
    }
    else if (value == "Text") {
        add_text(id, scene_id, send_position, send_rotation, send_scaling, send_source,asset);
    }


    else if (value == "Cube") {
        add_cube(id, scene_id, send_position, send_rotation, send_scaling, send_source,asset);
    }
}
function changeColor(value) {
    console.log("color changed", value)

    var findObject = document.getElementById(selected_object_id)
    console.log("found", findObject)
    findObject.setAttribute('color', value);
}
function changeopacity() {
    console.log("opacity", selected_object.children[0])
}
function deletescene() {
    console.log("in selected scene", selected_Scene.id)
    // var previous_id = selected_Scene.id
    if (counter == 0) {
      
        console.log("can't delete")
        
        alert("add new scene")
        
        counter = 1;
        

    } else {
        if (counter == 2) {
            counter = counter - 2;
        }
        else {
            counter = counter - 1

        }
        console.log("counter", counter)
        if(counter == 0)
        {
            var getmain = document.getElementById("mainScene")
            getmain.setAttribute('visible',false)
        }
        selected_Scene.setAttribute('visible', false)
        selected_Scene.remove()
        console.log("li id", scene_deleted, delete_scene_ul_id)
        document.getElementById(delete_scene_ul_id).remove()
        for (let i = 1; i < counter; i++) {
            console.log("counter", counter, "i", i)
            var findscene = "scene" + i
            if (findscene == selected_Scene.id) {
                for (let j = i + 1; j < counter; j++) {
                    changescene = "scene" + j
                    console.log("change scnes", changescene)
                }
            }
        }

    }



    // console.log("in selected scene",selected_Scene.id,selected_Scene)
    // // var previous_id = selected_Scene.id
    // console.log("counter",counter)
    // selected_Scene.setAttribute('visible',false)
    // console.log("selected:::",selected_Scene)
    // // var change_sceneID = selected_Scene
    // var change_sceneID = selected_Scene.cloneNode(true);
    // console.log("selected:::",selected_Scene)
    // console.log("new:::",change_sceneID)
    // change_sceneID.id = "scene"+counter
    // // selected_Scene.id = previous_id
    // console.log("after id change",change_sceneID,selected_Scene.id)
    // var get_scene = document.querySelector("a-scene").innerHTML
    // document.querySelector("a-scene").innerHTML = get_scene + change_sceneID.outerHTML
    // console.log("finally",document.querySelector("a-scene"))
    // change_sceneID.setAttribute('visible',true)

    // var ul_id = "myUL" + counter
    // var elements_tag = "s" + counter + "-" + change_sceneID.id + "_elements";
    // var select_id = "s" + counter + "-" + change_sceneID.id;
    // var scene_present = document.getElementById('new_scenes_list').innerHTML;
    // document.getElementById('new_scenes_list').innerHTML = scene_present + '<ul id=' + ul_id + ' style="color: white;"> <li><span id=' + change_sceneID.id + ' class="scene" onclick="shownewscene(' + "'" + change_sceneID.id + "', " + "'" + elements_tag + "'" + ')"><img src="assets/images/metabild/Vector (9).png" style="margin-right: 10px;">' + change_sceneID.id + '</span> <div style="display: flex;justify-content: space-between;padding-left: 40px;padding-top: 5px;padding-bottom: 3px;"><select name="cars" id=' + select_id + ' onchange="dropdownFunction(this.value,this.id)" style="background-color: #30419b;color: white;padding-right: 60px;"><option value="" disabled selected>Add Component</option><option value="Model">Model</option><option value="Video">Video</option><option value="Image">Image</option><option value="Cube">Cube</option> </select> </div><ul id=' + elements_tag + ' class="nested active"></ul></li></ul><br />'

    // counter = counter + 1




}
function get_scene(id) {
    console.log("get scene id:::", id)
    currId=id
    console.log("getting curent",currId)
    component_id.push(id)
    console.log(component_id)
    // componentsHighlight(id)
    var getscene = document.getElementById(id).getElementsByTagName('span')
    console.log("get scene span", getscene[0].innerText)
    visible_scene_id = getscene[0].innerText
    rename_scene = id
    localStorage.setItem( 'showScenePreview', visible_scene_id );
    scene_deleted = getscene[0].innerText
    delete_scene_ul_id = id;
   


}
if(currId){
    console.log("current id",currId)
}
function showscene(value) {
    // componentsHighlight("");
    var find = document.getElementById(value);
    console.log("find li of scene", find.outerHTML)

    selected_Scene = find
    console.log(value)
    console.log(currentScene_View)
    document.getElementById(currentScene_View).setAttribute('visible', false)
    document.getElementById(value).setAttribute('visible', true)
    visible_scene_id = value
    localStorage.setItem( 'showScenePreview', visible_scene_id );
    currentScene_View = value
    scene_id = value
    saveRulesData("s1-scene1_elements","scene1")

}

function shownewscene(value, element_id) {
    // componentsHighlight("");
    var find = document.getElementById(value);
    console.log("find li of scene", find.outerHTML)
    selected_Scene = find
    console.log("in shownewscene", value, element_id, currentScene_View)
    visible_scene_id = value
    localStorage.setItem( 'showScenePreview', visible_scene_id );
    // document.getElementById(currentScene_View).style.visibility = "hidden"
    // console.log(currentScene_View)
    // document.getElementById(value).style.visibility = "visible"

    document.getElementById(currentScene_View).setAttribute('visible', false)
    document.getElementById(value).setAttribute('visible', true)

    currentScene_View = value
    scene_id = value

    if ($("#" + value).hasClass("scene-down")) {
        $("#" + value).removeClass("scene-down")
        $("#" + element_id).removeClass("active")
    }
    else {
        $("#" + value).addClass("scene-down")
        $("#" + element_id).addClass("active")
    }

    saveRulesData(element_id,value)


}

function modify(type, value) {
    console.log("to edit", type, value, selected_object, selected_object_id)
    if (type == "translateX") {
        var findobject = document.getElementById(selected_object_id)
        console.log(findobject.object3D, findobject)
        findobject.object3D.position.x = value;
    }
    else if (type == "translateY") {
        var findobject = document.getElementById(selected_object_id)
        console.log(findobject.object3D)
        findobject.object3D.position.y = value;
    }
    else if (type == "translateZ") {
        var findobject = document.getElementById(selected_object_id)
        console.log(findobject.object3D)
        findobject.object3D.position.z = value;
    }
    else if (type == "rotateX") {
        var findobject = document.getElementById(selected_object_id)
        console.log(findobject.object3D)
        findobject.object3D.rotation.x = value;
    }
    else if (type == "rotateY") {
        var findobject = document.getElementById(selected_object_id)
        console.log(findobject.object3D)
        findobject.object3D.rotation.y = value;
    }
    else if (type == "rotateZ") {
        var findobject = document.getElementById(selected_object_id)
        console.log(findobject.object3D)
        findobject.object3D.rotation.z = value;
    }
    else if (type == "scaleX") {
        var findobject = document.getElementById(selected_object_id)
        console.log(findobject.object3D)
        findobject.object3D.scale.x = value;
    }
    else if (type == "scaleY") {
        var findobject = document.getElementById(selected_object_id)
        console.log(findobject.object3D)
        findobject.object3D.scale.y = value;
    }
    else if (type == "scaleZ") {
        var findobject = document.getElementById(selected_object_id)
        console.log(findobject.object3D)
        findobject.object3D.scale.z = value;
    }


}

//ALREADRYYYY
function getExperienceData1() {
    console.log("onload in getexperince")
   

    $.post('/get_experience_details', {
        user_id: sessionStorage.getItem('user_id'),
        session_id: sessionStorage.getItem('session_id'),
        experience_id: sessionStorage.getItem('experience_id')
    }, function (data) {
        console.log("experience data", data[0]);
        // var experience_data = data;

        // var scene_data = JSON.parse(experience_data[0].experience_data);
        // console.log("number of scenes",scene_data.length);
        // console.log("number of assets",scene_data[0].scene.length)

        if (data[0].experience_data == "") {
            console.log("empty scene")
            var getdiv = document.getElementById("myEmbeddedScene")
            getdiv.innerHTML = '<a-scene  id="scene1" style="height: 650px; width: 820px;position: fixed;" embedded cursor="rayOrigin: mouse"> <select name="s1" onchange="changeCamera(this.value)" style="background-color: #30419b;color: white;z-index: 1; position: fixed;margin-top: 80px;"><option value="" disabled selected>select camera</option><option value="orbital">orbital</option><option value="free">free</option><option value="reset">reset</option></select><div id="camera"></div><a-entity id="orbital" camera look-controls orbit-controls="target: 0 1.6 -0.5; minDistance: 0.5; maxDistance: 180; initialPosition: 0 5 5"> </a-entity> <a-entity id="free" position="0 1 5.8"><a-camera keyboard-controls="mode: fps" wasd-controls-enable="true"></a-camera></a-entity><a-sky background-color="white"></a-sky>  </a-scene>'
        }
        else {
            console.log("it has elements", JSON.parse(data[0].experience_data));
            scenes = JSON.parse(data[0].experience_data);
            total_num_of_scenes = JSON.parse(data[0].experience_data).length
            console.log("total number of scnes", total_num_of_scenes);
            function Scenes_Loop(i) {
                if (i < total_num_of_scenes) {
                    console.log("number of assets", i, scenes[i].scene.length)
                    var newscene_name = "scene" + (i + 1)
                    var dropdownname = "s" + (i + 1);
                    // var scene_present = document.getElementById("myEmbeddedScene").innerHTML;
                    // document.getElementById(newscene_name).style.visibility = "hidden";
                    var newscene = document.getElementById("myEmbeddedScene");
                    var latest = document.createElement("a-scene");
                    // latest.style.width = "820px";
                    // latest.style.height = "650px";
                    latest.style.position = "fixed";
                    latest.id = newscene_name;
                    currentScene_View = newscene_name;
                    latest.setAttribute('embedded', '')

                    latest.setAttribute('cursor', "rayOrigin: mouse;");
                    var entity_camera = document.createElement('a-camera');
                    entity_camera.setAttribute('id', "cam")
                    entity_camera.setAttribute('position', { x: 0, y: 1, z: 5.8 });
                    latest.appendChild(entity_camera)
                    newscene.appendChild(latest)


                    // document.getElementById("myEmbeddedScene").innerHTML = scene_present + '<a-scene gridhelper id=' + newscene_name + ' style="height: 650px; width: 820px;position: fixed;" embedded cursor="rayOrigin: mouse"> <select name=' + dropdownname + ' onchange="changeCamera(this.value)" style="background-color: #30419b;color: white;z-index: 1; position: fixed;margin-top: 80px;"><option value="" disabled selected>select camera</option><option value="orbital">orbital</option><option value="free">free</option><option value="reset">reset</option></select><div id="camera"></div><a-entity id="orbital" camera look-controls orbit-controls="target: 0 1.6 -0.5; minDistance: 0.5; maxDistance: 180; initialPosition: 0 5 5"> </a-entity> <a-entity id="free" position="0 1 5.8"><a-camera keyboard-controls="mode: fps" wasd-controls-enable="true"></a-camera></a-entity></a-scene>'
                    if (newscene_name !== "scene1") {

                        currentScene_View = "scene1"
                        //hide the scene
                        document.getElementById(newscene_name).style.visibility = "hidden";
                        //add it to stuctures tab
                        var ul_id = "myUL" + (i + 1)
                        var elements_tag = "s" + (i + 1) + "-" + newscene_name + "_elements";
                        var select_id = "s" + (i + 1) + "-" + newscene_name;
                        var scene_present = document.getElementById('new_scenes_list').innerHTML;
                        document.getElementById('new_scenes_list').innerHTML = scene_present + '<ul id=' + ul_id + ' style="color: white;"> <li><span id=' + newscene_name + ' class="scene" onclick="shownewscene(' + "'" + newscene_name + "', " + "'" + elements_tag + "'" + ')"><img src="assets/images/metabild/Vector (9).png" style="margin-right: 10px;">' + newscene_name + '</span> <div style="display: flex;justify-content: space-between;padding-left: 40px;padding-top: 5px;padding-bottom: 3px;"><select name="cars" id=' + select_id + ' onchange="dropdownFunction(this.value,this.id)" style="background-color: #30419b;color: white;padding-right: 60px;"><option value="" disabled selected>Add Component</option><option value="Model">Model</option><option value="Video">Video</option><option value="Image">Image</option><option value="Cube">Cube</option> </select> </div><ul id=' + elements_tag + ' class="nested active"></ul></li></ul><br />'

                        counter = counter + 1
                        console.log("counter on load", counter)
                    }
                    function assets_loop(j) {
                        if (j < scenes[i].scene.length) {
                            console.log("asset", j, scenes[i].scene[j].asset)
                            var asset_type_recd = scenes[i].scene[j].asset[2].asset_type;

                            if (asset_type_recd == "a-image") {

                                var pass_id = dropdownname + "-" + newscene_name
                                var position = scenes[i].scene[j].asset[3];
                                var rotation = scenes[i].scene[j].asset[4];
                                var scaling = scenes[i].scene[j].asset[5];
                                var source = scenes[i].scene[j].asset[1];
                                add_images1(pass_id, newscene_name, position, rotation, scaling, source)
                            }
                            else if (asset_type_recd == "a-video") {
                                var pass_id = dropdownname + "-" + newscene_name
                                var position = scenes[i].scene[j].asset[3];
                                var rotation = scenes[i].scene[j].asset[4];
                                var scaling = scenes[i].scene[j].asset[5];
                                var source = scenes[i].scene[j].asset[1];
                                add_video1(pass_id, newscene_name, position, rotation, scaling, source)
                            }
                            else if (asset_type_recd == "a-box") {
                                var pass_id = dropdownname + "-" + newscene_name
                                var position = scenes[i].scene[j].asset[3];
                                var rotation = scenes[i].scene[j].asset[4];
                                var scaling = scenes[i].scene[j].asset[5];
                                var source = scenes[i].scene[j].asset[1];
                                add_cube1(pass_id, newscene_name, position, rotation, scaling, source)
                            }
                            else if (asset_type_recd == "a-entity") {
                                model = "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/cube/scene.gltf+&mbxr+0+&mbxr+0+&mbxr+-2+&mbxr+1+&mbxr+1+&mbxr+1"
                                var pass_id = dropdownname + "-" + newscene_name
                                changeModel1(model, pass_id, newscene_name,position, rotation, scaling, source)
                            }
                            j++
                            assets_loop(j)
                        }
                        else {
                            console.log("bye")
                        }

                    }
                    assets_loop(0)
                    i++;
                    Scenes_Loop(i)
                }
                else {
                    console.log("bye")
                }

            }
            Scenes_Loop(0)
        }
        document.getElementById(currentScene_View).style.visibility = "hidden"

          document.getElementById(visible_scene_id).style.visibility = "visible"
        //document.getElementById('experience_card').innerHTML = blocks;

    })
        .fail(function (xhr) {
            switch (xhr.status) {
                case 500:
                    alert('your session is invalid');
                    break;
                case 501:
                    alert('session db error!');
                    break;
                case 502:
                    alert('DB Session Error!');
                    break;
                default:
                    alert('Default Error!');
                    break;
            }
        })

}
function cloneasset() {
    console.log("present", selected_object)
    //  selected_object.el.tagName.toLowerCase())
    cloneobj = selected_object.el.tagName.toLowerCase()
    console.log("values", elements_id_saved, scene_id, position_saved, rotation_saved, scaling_saved, source_saved)
    if (cloneobj == "a-image") {

        add_images(elements_id_saved, scene_id, position_saved, rotation_saved, scaling_saved, source_saved)
        // openStructure()
    } else if (cloneobj == "a-video") {
        add_video(elements_id_saved, scene_id, position_saved, rotation_saved, scaling_saved, source_saved)
        // openStructure()

    }
    else if (cloneobj == "a-box") {
        add_cube(elements_id_saved, scene_id, position_saved, rotation_saved, scaling_saved, source_saved)
        // openStructure()
    }
    else if (cloneobj == "a-entity") {
        console.log("clone asset model ", source_saved, elements_id_saved, scene_id, position_saved, scaling_saved, rotation_saved, source_saved)
        changeModel(source_saved, elements_id_saved, scene_id, position_saved, scaling_saved, rotation_saved, source_saved)
        // openStructure()
    }
}
function SaveData() {
    console.log("number of scenes", counter - 1)

    var finaldict = []
    //for (let j = 1; j <= (counter - 1); j++) {
    function ScenesLoop(j) {
        if (j <= (counter - 1)) {
            list_id = "s" + j + "-scene" + j + "_elements";
            console.log("scene", list_id)
            var dict = [];
            var total = document.getElementById(list_id).getElementsByTagName("li").length
            console.log(" elements:::", total,document.getElementById(list_id).getElementsByTagName("li"))
            if (total == 0) {
                console.log("no elements")

            } else {
                var elements = document.getElementById(list_id).getElementsByTagName("li")
                console.log("number of items=", total, "elements", elements)
                //for (let i = 0; i < total; i++) {
                function SceneElements(i) {
                    console.log("i", i, "tottal", total)
                    if (i < total) {
                        var scenedict = []
                        var new_elementsid_splice = elements[i].id.slice(elements[i].id.lastIndexOf('-') + 1)
                        console.log()
                        var newelement = document.getElementById(new_elementsid_splice)
                        console.log("new element", elements[i].id, elements[i].id.slice(elements[i].id.lastIndexOf('-') + 1), newelement, newelement.object3D)
                        console.log("inforloop ", newelement.object3D.rotation);
                        console.log("el property", newelement.object3D)
                        console.log("el property", newelement.object3D.el.toString().includes("<a-image"))
                       
                        console.log("SOURCE", $('#' + elements[i].id).outerHTML, $('#' + elements[i].id).attr('src'))
                        console.log("tagname", newelement.tagName)
                       
                        scenedict.push(
                            {
                                "assetid": new_elementsid_splice
                            },
                            {
                                "asset_src": $('#' + new_elementsid_splice).attr('src')
                            },
                            {
                                "asset_type": newelement.tagName.toLowerCase()
                            },
                            {
                                "position": newelement.object3D.position,
                            },
                            {
                                "rotation": newelement.object3D.rotation,
                            },
                            {
                                "scale": newelement.object3D.scale
                            }
                        );
                        if (newelement.tagName.toLowerCase()=="a-text") {
                            scenedict.push(
                                {
                                    "assetvalue": $('#' + new_elementsid_splice).attr('value')
                                });
                        }

                        dict.push({
                            "asset": scenedict
                        })

                        i++;
                        SceneElements(i);
                    }
                    else {
                        console.log("HEREHBDJHBDJHDB",j)
                        var ulid = "myUL"+j
                        var find_ul = document.getElementById(ulid)
                        console.log("getlement",find_ul.getElementsByTagName("span")[0].textContent)
                        var finalscenename = find_ul.getElementsByTagName("span")[0].textContent
                        finaldict.push(
                           {
                             "sceneName":finalscenename,
                            "scene": dict
                        })

                        j++;

                        ScenesLoop(j);
                    }
                }

                SceneElements(0);
            }
        }
        else {
            console.log("scene dictionary", finaldict)
            console.log("hotspot", hotspotDictionary)

            $.post('/save_experience_data', {
                session_id: sessionStorage.getItem('session_id'), user_id: sessionStorage.getItem('user_id'),
                experience_id: sessionStorage.getItem('experience_id'),
                experience_data: JSON.stringify(finaldict),
                hotspot_data: JSON.stringify(hotspotDictionary),
            }, function (data) {
                console.log("SAVED!!!!",data);
                alert("Experience created !");
                window.location = sessionStorage.getItem('connection_url') + 'display_editor?session_id=' + sessionStorage.getItem('session_id');
            })
                .fail(function (xhr) {
                    switch (xhr.status) {
                        case 500:
                            alert('your session is invalid');
                            break;
                        case 501:
                            alert('session db error!');
                            break;
                        case 502:
                            alert('DB Session Error!');
                            break;
                        default:
                            alert('Default Error!');
                            break;
                    }
                })
        }
    }

    ScenesLoop(1);

}

function getExperienceDataScene() {
    // openStructure()
    $.post('/get_experience_details', {
        user_id: sessionStorage.getItem('user_id'),
        session_id: sessionStorage.getItem('session_id'),
        experience_id: sessionStorage.getItem('experience_id'),
        hotspot_data: sessionStorage.getItem('hotspot_data'),
    }, function (data) {
        console.log("experience data", data[0]);
        experienceData = data[0].experience_data
        if (data[0].experience_data) {
            console.log("it has elements", JSON.parse(data[0].experience_data));
            scenes = JSON.parse(data[0].experience_data);
            total_num_of_scenes = JSON.parse(data[0].experience_data).length
            console.log("total number of scnes", total_num_of_scenes);
            function ScenesLoop(i) {
                if (i < total_num_of_scenes) {
                   
                    console.log("number of assets", i, scenes[i].scene.length)
                    console.log("scenename",scenes[i].sceneName)
                    var recd_sceneName = scenes[i].sceneName
                    if((i+1)==1)
                    {
                        var find_ul = document.getElementById("myUL1")
                        console.log("getlement",find_ul.getElementsByTagName("span")[0].textContent)
                         find_ul.getElementsByTagName("span")[0].textContent = recd_sceneName
                    }
                    var newscene_name = "scene" + (i + 1)
                    var dropdownname = "s" + (i + 1);
                    var newscene = document.getElementById("mainScene");
                    var latest = document.createElement("a-entity");
                    latest.id = newscene_name;
                    currentScene_View = "scene1"
                    latest.setAttribute('visible', true)
                    if (newscene_name !== "scene1") {
                        latest.setAttribute('visible', false)
                        currentScene_View = "scene1"
                        //add it to stuctures tab
                        var ul_id = "myUL" + (i + 1)
                        var elements_tag = "s" + (i + 1) + "-" + newscene_name + "_elements";
                        
                        var select_id = "s" + (i + 1) + "-" + newscene_name;
                        var scene_present = document.getElementById('new_scenes_list').innerHTML;
                        document.getElementById('new_scenes_list').innerHTML = scene_present + '<div style="display: flex;flex-direction: row; justify-content: centre;"><ul id=' + ul_id + '  onclick="get_scene(this.id)" style="color: white;"> <li><div style="display: flex;flex-direction: row; justify-content: space-between;"><span id=' + newscene_name + ' class="scene" onclick="shownewscene(' + "'" + newscene_name + "', " + "'" + elements_tag + "'" + ')"><img src="../../../app-assets//images/svg/Vector (9).png" style="margin-right: 10px;">' + recd_sceneName + '</span> <div> <img id=' + select_id + ' onclick="setid(this.id)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom2" aria-controls="offcanvasBottom2" src="../../../app-assets//images/svg/Vector(8).png" style="margin-right: 5px;height: 12px; width: 12px;"></div></div>  <div style="display: flex;justify-content: space-between;padding-left: 40px;padding-top: 5px;padding-bottom: 3px;"> </div><ul id=' + elements_tag + ' class="nested active"></ul></li></ul><img onclick="lockscene(\'' + ul_id + '\')"  src="../../../app-assets//images/svg/lock-alt.svg" alt="" height="20" width="20"><img  src="app-assets//images/svg/renamefolder.svg" data-bs-toggle="modal" data-bs-target="#exampleModalCenter"></div><br />'

                        counter = counter + 1
                        console.log("counter on load", counter)
                    }
                    // currentScene_View = newscene_name;
                    newscene.appendChild(latest)
                    console.log("number of assets", i, scenes[i].scene.length)
                    function assets_loop(j) {
                        if (j < scenes[i].scene.length) {
                            console.log("asset", j, scenes[i].scene[j].asset)
                            var asset_type_recd = scenes[i].scene[j].asset[2].asset_type;
                            var asset_id_recd = scenes[i].scene[j].asset[0].assetid;
                            
                            if (asset_type_recd == "a-image") {

                                var pass_id = dropdownname + "-" + newscene_name
                                var position = scenes[i].scene[j].asset[3];
                                var rotation = scenes[i].scene[j].asset[4];
                                var scaling = scenes[i].scene[j].asset[5];
                                var source = scenes[i].scene[j].asset[1];
                                add_images(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                            }
                            else if (asset_type_recd == "a-video") {
                                var pass_id = dropdownname + "-" + newscene_name
                                var position = scenes[i].scene[j].asset[3];
                                var rotation = scenes[i].scene[j].asset[4];
                                var scaling = scenes[i].scene[j].asset[5];
                                var source = scenes[i].scene[j].asset[1];
                                add_video(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                            }
                            else if (asset_type_recd == "a-box") {
                                var pass_id = dropdownname + "-" + newscene_name
                                var position = scenes[i].scene[j].asset[3];
                                var rotation = scenes[i].scene[j].asset[4];
                                var scaling = scenes[i].scene[j].asset[5];
                                var source = scenes[i].scene[j].asset[1];
                                add_cube(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                            }
                            else
                                if (asset_type_recd == "a-torus") {
                                    var pass_id = dropdownname + "-" + newscene_name
                                    var position = scenes[i].scene[j].asset[3];
                                    var rotation = scenes[i].scene[j].asset[4];
                                    var scaling = scenes[i].scene[j].asset[5];
                                    var source = scenes[i].scene[j].asset[1];
                                    add_torus(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                                } else
                                    if (asset_type_recd == "a-text") {
                                        var pass_id = dropdownname + "-" + newscene_name
                                        var position = scenes[i].scene[j].asset[3];
                                        var rotation = scenes[i].scene[j].asset[4];
                                        var scaling = scenes[i].scene[j].asset[5];
                                        var source = scenes[i].scene[j].asset[6].assetvalue;

                                        add_text(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                                    }
                                    else
                                        if (asset_type_recd == "a-sound") {
                                            var pass_id = dropdownname + "-" + newscene_name
                                            var position = scenes[i].scene[j].asset[3];
                                            var rotation = scenes[i].scene[j].asset[4];
                                            var scaling = scenes[i].scene[j].asset[5];
                                            var source = scenes[i].scene[j].asset[1].asset_src;
                                            add_sound(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                                        }
                                        else
                                            if (asset_type_recd == "a-light") {
                                                var pass_id = dropdownname + "-" + newscene_name
                                                var position = scenes[i].scene[j].asset[3];
                                                var rotation = scenes[i].scene[j].asset[4];
                                                var scaling = scenes[i].scene[j].asset[5];
                                                var source = scenes[i].scene[j].asset[1];
                                                add_light(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                                            }
                            else if (asset_type_recd == "a-gltf-model") {
                                model = "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/cube/scene.gltf+&mbxr+0+&mbxr+0+&mbxr+-2+&mbxr+1+&mbxr+1+&mbxr+1"
                                var pass_id = dropdownname + "-" + newscene_name;
                                var position = scenes[i].scene[j].asset[3];
                                var rotation = scenes[i].scene[j].asset[4];
                                var scaling = scenes[i].scene[j].asset[5];
                                var source = scenes[i].scene[j].asset[1];
                                changeModel(model, pass_id, newscene_name, position, scaling, rotation, source,asset_id_recd)
                            }
                            j++
                            assets_loop(j)
                        }
                        else {
                            console.log("bye")
                        }

                    }
                    assets_loop(0)
                    i++;
                    ScenesLoop(i)
                }


            }
            ScenesLoop(0)
            if (data[0].hotspot_data) {

                total_hotspots = JSON.parse(data[0].hotspot_data);
                console.log("hotspot data in loop", total_hotspots)
                for (let i = 0; i < total_hotspots.length; i++) {
                    console.log(total_hotspots[i])
                    var findobject = document.getElementById(total_hotspots[i].assetid)
                    console.log(findobject)
                    getonloadPositionXY(total_hotspots[i].assetid, total_hotspots[i].label, total_hotspots[i].positionx, total_hotspots[i].positiony, total_hotspots[i].positionz)

                }
            }
        }
        else {
            console.log("empty")
            var newscene = document.getElementById("mainScene");
            var latest = document.createElement("a-entity");
            latest.id = "scene1";
            currentScene_View = "scene1";
            newscene.appendChild(latest)
          

        }
    })
        .fail(function (xhr) {
            switch (xhr.status) {
                case 500:
                    alert('your session is invalid');
                    break;
                case 501:
                    alert('session db error!');
                    break;
                case 502:
                    alert('DB Session Error!');
                    break;
                default:
                    alert('Default Error!');
                    break;
            }
        })
    setTimeout(
        function () {

            window.postMessage('INJECT_AFRAME_INSPECTOR', '*');
            console.log("inside timeout")


        }, 1000);
    setTimeout(
        function () {


            hideElements();

        }, 5000);
}
// function getExperienceData() {
//     var myData = localStorage['showScenePreview'];
//     console.log("hi")
//     console.log("localstogare item",myData)
//     $.post('/get_experience_details', {
//         user_id: sessionStorage.getItem('user_id'),
//         session_id: sessionStorage.getItem('session_id'),
//         experience_id: sessionStorage.getItem('experience_id'),
//         hotspot_data: sessionStorage.getItem('hotspot_data'),
//     }, function (data) {
//         console.log("experience data", data[0]);
//         var myData = localStorage['showScenePreview'];
//     console.log("hi")
//     console.log("localstogare item",myData)
//         experienceData = data[0].experience_data
//         if (data[0].experience_data) {
//             console.log("it has elements", JSON.parse(data[0].experience_data));
//             scenes = JSON.parse(data[0].experience_data);
//             total_num_of_scenes = JSON.parse(data[0].experience_data).length
//             console.log("total number of scnes", total_num_of_scenes);
//             function ScenesLoop(i) {
//                 if (i < total_num_of_scenes) {
//                     console.log("number of assets", i, scenes[i].scene.length)
//                     var newscene_name = "scene" + (i + 1)
//                     var dropdownname = "s" + (i + 1);
                   
                  
//                     if (newscene_name == myData) {
//                         var newscene = document.getElementById("mainScene");
//                         var latest = document.createElement("a-entity");
//                         latest.id = newscene_name;
//                         console.log("cHECKK:::",newscene_name,myData)
//                         latest.setAttribute('visible', true)
//                         currentScene_View = myData
//                         newscene.appendChild(latest)
//                         function assets_loop(j) {
//                             if (j < scenes[i].scene.length) {
//                                 console.log("asset", j, scenes[i].scene[j].asset)
//                                 var asset_type_recd = scenes[i].scene[j].asset[2].asset_type;
//                                 var asset_id_recd = scenes[i].scene[j].asset[0].assetid;
//                                 if (asset_type_recd == "a-image") {
    
//                                     var pass_id = dropdownname + "-" + newscene_name
//                                     var position = scenes[i].scene[j].asset[3];
//                                     var rotation = scenes[i].scene[j].asset[4];
//                                     var scaling = scenes[i].scene[j].asset[5];
//                                     var source = scenes[i].scene[j].asset[1];
//                                     add_images1(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
//                                 }
//                                 else if (asset_type_recd == "a-video") {
//                                     var pass_id = dropdownname + "-" + newscene_name
//                                     var position = scenes[i].scene[j].asset[3];
//                                     var rotation = scenes[i].scene[j].asset[4];
//                                     var scaling = scenes[i].scene[j].asset[5];
//                                     var source = scenes[i].scene[j].asset[1];
//                                     add_video1(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
//                                 }
//                                 else if (asset_type_recd == "a-box") {
//                                     var pass_id = dropdownname + "-" + newscene_name
//                                     var position = scenes[i].scene[j].asset[3];
//                                     var rotation = scenes[i].scene[j].asset[4];
//                                     var scaling = scenes[i].scene[j].asset[5];
//                                     var source = scenes[i].scene[j].asset[1];
//                                     add_cube1(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
//                                 }
//                                 else
//                                 if (asset_type_recd == "a-torus") {
//                                     var pass_id = dropdownname + "-" + newscene_name
//                                     var position = scenes[i].scene[j].asset[3];
//                                     var rotation = scenes[i].scene[j].asset[4];
//                                     var scaling = scenes[i].scene[j].asset[5];
//                                     var source = scenes[i].scene[j].asset[1];
//                                     add_torus1(pass_id, asset_is_recd, position, rotation, scaling, source,asset_id_recd)
//                                 } else
//                                     if (asset_type_recd == "a-text") {
//                                         var pass_id = dropdownname + "-" + newscene_name
//                                         var position = scenes[i].scene[j].asset[3];
//                                         var rotation = scenes[i].scene[j].asset[4];
//                                         var scaling = scenes[i].scene[j].asset[5];
//                                         var source = scenes[i].scene[j].asset[1];
//                                         add_text1(pass_id, asset_is_recd, position, rotation, scaling, source,asset_id_recd)
//                                     }
//                                     else
//                                         if (asset_type_recd == "a-sound") {
//                                             var pass_id = dropdownname + "-" + newscene_name
//                                             var position = scenes[i].scene[j].asset[3];
//                                             var rotation = scenes[i].scene[j].asset[4];
//                                             var scaling = scenes[i].scene[j].asset[5];
//                                             var source = scenes[i].scene[j].asset[1];
//                                             add_sound1(pass_id, asset_is_recd, position, rotation, scaling, source,asset_id_recd)
//                                         }
//                                         else
//                                             if (asset_type_recd == "a-light") {
//                                                 var pass_id = dropdownname + "-" + newscene_name
//                                                 var position = scenes[i].scene[j].asset[3];
//                                                 var rotation = scenes[i].scene[j].asset[4];
//                                                 var scaling = scenes[i].scene[j].asset[5];
//                                                 var source = scenes[i].scene[j].asset[1];
//                                                 add_light1(pass_id, asset_is_recd, position, rotation, scaling, source,asset_id_recd)
//                                             }
//                                 else if (asset_type_recd == "a-entity") {
//                                     model = "https://www.rhibhus.com/AR_Trial/metabild/assets/NgvSzrcjNKGDek7U9zNP/2CylinderEngine.gltf+&mbxr+0+&mbxr+0+&mbxr+-2+&mbxr+0.002+&mbxr+0.002+&mbxr+0.002"
//                                     var pass_id = dropdownname + "-" + newscene_name;
//                                     var position = scenes[i].scene[j].asset[3];
//                                     var rotation = scenes[i].scene[j].asset[4];
//                                     var scaling = scenes[i].scene[j].asset[5];
//                                     var source = scenes[i].scene[j].asset[1];
//                                     changeModel1(model, pass_id, newscene_name, position, scaling, rotation, source,asset_id_recd)
//                                 }
//                                 j++
//                                 assets_loop(j)
//                             }
//                             else {
//                                 console.log("bye")
//                             }
    
//                         }
//                         assets_loop(0)
//                     }
                   
                  
//                     i++;
//                     ScenesLoop(i)
//                 }


//             }
//             ScenesLoop(0)
//             if (data[0].hotspot_data) {

//                 total_hotspots = JSON.parse(data[0].hotspot_data);
//                 console.log("hotspot data in loop", total_hotspots)
//                 for (let i = 0; i < total_hotspots.length; i++) {
//                     console.log(total_hotspots[i].assetid)
//                     var findobject = document.getElementById(total_hotspots[i].assetid)
//                     console.log(findobject)
//                     getonloadPositionXY(total_hotspots[i].assetid, total_hotspots[i].label, total_hotspots[i].positionx, total_hotspots[i].positiony, total_hotspots[i].positionz)

//                 }
//             }
//             // console.log("current and get",currentScene_View,visible_scene_id)
//             // document.getElementById(currentScene_View).setAttribute('visible', false)
//             // document.getElementById(myData).setAttribute('visible',true)
//         }
//         else {
//             console.log("empty")
//             var newscene = document.getElementById("mainScene");
//             var latest = document.createElement("a-entity");
//             latest.id = "scene1";
//             currentScene_View = "scene1";
//             newscene.appendChild(latest)


//         }
//         setTimeout(
//             function () {
//             //    console.log("after one sec",document.getElementById(myData).object3D)
//             //    document.getElementById(myData).object3D.visible = true;
//             finalexecution();
    
//             }, 2000);

//     })
//         .fail(function (xhr) {
//             switch (xhr.status) {
//                 case 500:
//                     alert('your session is invalid');
//                     break;
//                 case 501:
//                     alert('session db error!');
//                     break;
//                 case 502:
//                     alert('DB Session Error!');
//                     break;
//                 default:
//                     alert('Default Error!');
//                     break;
//             }
//         })

        
            
// }


function getExperienceData() {
    var myData = localStorage['showScenePreview'];
    console.log("hi")
    console.log("localstogare item",myData)
    $.post('/get_experience_details', {
        user_id: sessionStorage.getItem('user_id'),
        session_id: sessionStorage.getItem('session_id'),
        experience_id: sessionStorage.getItem('experience_id'),
        hotspot_data: sessionStorage.getItem('hotspot_data'),
    }, function (data) {
        console.log("experience data", data[0]);
        var myData = localStorage['showScenePreview'];
    console.log("hi")
    console.log("localstogare item",myData)
        experienceData = data[0].experience_data
        if (data[0].experience_data) {
            console.log("it has elements", JSON.parse(data[0].experience_data));
            scenes = JSON.parse(data[0].experience_data);
            total_num_of_scenes = JSON.parse(data[0].experience_data).length
            console.log("total number of scnes", total_num_of_scenes);
            function ScenesLoop(i) {
                if (i < total_num_of_scenes) {
                    console.log("number of assets", i, scenes[i].scene.length)
                    var newscene_name = "scene" + (i + 1)
                    var dropdownname = "s" + (i + 1);
                   
                        var newscene = document.getElementById("mainScene");
                        var latest = document.createElement("a-entity");
                        latest.id = newscene_name;
                        console.log("cHECKK:::",newscene_name,myData)
                        latest.setAttribute('visible', false)
                        currentScene_View = myData
                        newscene.appendChild(latest)
                        function assets_loop(j) {
                            if (j < scenes[i].scene.length) {
                                console.log("asset", j, scenes[i].scene[j].asset)
                                var asset_type_recd = scenes[i].scene[j].asset[2].asset_type;
                                var asset_id_recd = scenes[i].scene[j].asset[0].assetid;
                                if (asset_type_recd == "a-image") {
    
                                    var pass_id = dropdownname + "-" + newscene_name
                                    var position = scenes[i].scene[j].asset[3];
                                    var rotation = scenes[i].scene[j].asset[4];
                                    var scaling = scenes[i].scene[j].asset[5];
                                    var source = scenes[i].scene[j].asset[1];
                                    add_images1(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                                }
                                else if (asset_type_recd == "a-video") {
                                    var pass_id = dropdownname + "-" + newscene_name
                                    var position = scenes[i].scene[j].asset[3];
                                    var rotation = scenes[i].scene[j].asset[4];
                                    var scaling = scenes[i].scene[j].asset[5];
                                    var source = scenes[i].scene[j].asset[1];
                                    add_video1(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                                }
                                else if (asset_type_recd == "a-box") {
                                    var pass_id = dropdownname + "-" + newscene_name
                                    var position = scenes[i].scene[j].asset[3];
                                    var rotation = scenes[i].scene[j].asset[4];
                                    var scaling = scenes[i].scene[j].asset[5];
                                    var source = scenes[i].scene[j].asset[1];
                                    add_cube1(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                                }
                                else
                                if (asset_type_recd == "a-torus") {
                                    var pass_id = dropdownname + "-" + newscene_name
                                    var position = scenes[i].scene[j].asset[3];
                                    var rotation = scenes[i].scene[j].asset[4];
                                    var scaling = scenes[i].scene[j].asset[5];
                                    var source = scenes[i].scene[j].asset[1];
                                    add_torus1(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                                } else
                                    if (asset_type_recd == "a-text") {
                                        var pass_id = dropdownname + "-" + newscene_name
                                        var position = scenes[i].scene[j].asset[3];
                                        var rotation = scenes[i].scene[j].asset[4];
                                        var scaling = scenes[i].scene[j].asset[5];
                                        var source = scenes[i].scene[j].asset[1];
                                        add_text1(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                                    }
                                    else
                                        if (asset_type_recd == "a-sound") {
                                            var pass_id = dropdownname + "-" + newscene_name
                                            var position = scenes[i].scene[j].asset[3];
                                            var rotation = scenes[i].scene[j].asset[4];
                                            var scaling = scenes[i].scene[j].asset[5];
                                            var source = scenes[i].scene[j].asset[1];
                                            add_sound1(pass_id, newscene_name, asset_id_recd)
                                        }
                                        else
                                            if (asset_type_recd == "a-light") {
                                                var pass_id = dropdownname + "-" + newscene_name
                                                var position = scenes[i].scene[j].asset[3];
                                                var rotation = scenes[i].scene[j].asset[4];
                                                var scaling = scenes[i].scene[j].asset[5];
                                                var source = scenes[i].scene[j].asset[1];
                                                add_light1(pass_id, newscene_name, position, rotation, scaling, source,asset_id_recd)
                                            }
                                else if (asset_type_recd == "a-gltf-model") {
                                    model = "https://www.rhibhus.com/AR_Trial/metabild/assets/NgvSzrcjNKGDek7U9zNP/2CylinderEngine.gltf+&mbxr+0+&mbxr+0+&mbxr+-2+&mbxr+0.002+&mbxr+0.002+&mbxr+0.002"
                                    var pass_id = dropdownname + "-" + newscene_name;
                                    var position = scenes[i].scene[j].asset[3];
                                    var rotation = scenes[i].scene[j].asset[4];
                                    var scaling = scenes[i].scene[j].asset[5];
                                    var source = scenes[i].scene[j].asset[1];
                                    changeModel1(model, pass_id, newscene_name, position, scaling, rotation, source,asset_id_recd)
                                }
                                j++
                                assets_loop(j)
                            }
                            else {
                                console.log("bye")
                            }
    
                        }
                        assets_loop(0)
                    
                   
                  
                    i++;
                    ScenesLoop(i)
                }


            }
            ScenesLoop(0)
            
               document.getElementById(myData).setAttribute('visible', true)
           
            if (data[0].hotspot_data) {

                total_hotspots = JSON.parse(data[0].hotspot_data);
                console.log("hotspot data in loop", total_hotspots)
                for (let i = 0; i < total_hotspots.length; i++) {
                    console.log(total_hotspots[i].assetid)
                    var findobject = document.getElementById(total_hotspots[i].assetid)
                    console.log(findobject)
                    getonloadPositionXY(total_hotspots[i].assetid, total_hotspots[i].label, total_hotspots[i].positionx, total_hotspots[i].positiony, total_hotspots[i].positionz)

                }
            }
            // console.log("current and get",currentScene_View,visible_scene_id)
            // document.getElementById(currentScene_View).setAttribute('visible', false)
            // document.getElementById(myData).setAttribute('visible',true)
        }
        else {
            console.log("empty")
            var newscene = document.getElementById("mainScene");
            var latest = document.createElement("a-entity");
            latest.id = "scene1";
            currentScene_View = "scene1";
            newscene.appendChild(latest)


        }
        finalexecution();
        // setTimeout(
        //     function () {
        //     //    console.log("after one sec",document.getElementById(myData).object3D)
        //     //    document.getElementById(myData).object3D.visible = true;
        //     finalexecution();
    
        //     }, 2000);

    })
        .fail(function (xhr) {
            switch (xhr.status) {
                case 500:
                    alert('your session is invalid');
                    break;
                case 501:
                    alert('session db error!');
                    break;
                case 502:
                    alert('DB Session Error!');
                    break;
                default:
                    alert('Default Error!');
                    break;
            }
        })

        
            
}



function hideElements() {
    console.log("next")


    console.log("find collapsible component", document.getElementsByClassName("collapsible component"))
    document.getElementById('toolbar').style.visibility = "hidden"
    document.getElementById('scenegraph').remove();
    document.getElementById('viewportBar').style.flexGrow = 0
    document.getElementById('viewportBar').style.margin = "80px 275px 0px 500px";
    document.getElementById('viewportBar').style.flexDirection="row-reverse"
    // document.getElementById('viewportBar').style.position = "fixed"
    document.getElementById('rightPanel').style.margin = "140px 0px 0px 0px";
    console.log("rightpanel",document.getElementById('rightPanel').innerHTML)
    document.getElementById('rightPanel').style.zIndex = "-1"
    console.log("toggle", document.getElementsByClassName('toggle-edit')[0])
    document.getElementsByClassName('toggle-edit')[0].style.visibility = "hidden"
    document.getElementById('viewportHud').remove()
    //   document.getElementById('viewportBar').style.marginTop = "70px";



}

function redirectfolder() {
    window.location = sessionStorage.getItem('connection_url') + 'display_folder?session_id=' + sessionStorage.getItem('session_id')
}
function redirectSettings()
{
    window.location = sessionStorage.getItem('connection_url') + 'display_settings?session_id=' + sessionStorage.getItem('session_id')
}
function redirectAnalytics(){
    window.location = sessionStorage.getItem('connection_url') + 'display_analytics?session_id=' + sessionStorage.getItem('session_id')
}
function redirectFolderPage()
{
    window.location = sessionStorage.getItem('connection_url') + 'display_folderPage?session_id=' + sessionStorage.getItem('session_id')
}
function redirectPlay() {

    window.location = sessionStorage.getItem('connection_url') + 'display_preview?session_id=' + sessionStorage.getItem('session_id')
}
function hideProp() {
    // console.log("find",document.getElementById('structure_value').style)
    document.getElementById('structure_value').style.position = "relative"

    // if (document.getElementById('rightPanel').style.visibility = "inherit") {
    //     document.getElementById('rightPanel').style.visibility = "hidden"
    // } else {
    //     document.getElementById('rightPanel').style.visibility = "inherit"
    // }
}
function showProp() {
    // console.log("found",document.getElementById('rightPanel'))
    document.getElementById('rightPanel').style.visibility = "inherit"
}
function resetCamera() {
    // var find_camera = document.
}

function handleProperties() {
    console.log("get properties", document.getElementById('rightPanel'))
    document.getElementById('rightPanel').style.maxWidth = "0%"
    console.log("get properties", document.getElementById('rightPanel'))

}
function handleShowProperties() {
    document.getElementById('rightPanel').style.maxWidth = "100%"
}
function marginset() {
    console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
    document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
    document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
    document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
}

function ontoggleclick()
{
    console.log("cehckpoint:;",document.getElementById('populate').style)
    document.getElementById('populate').innerHTML = '<div style="padding-bottom:50px" id="properties_value"><div style="display: flex;flex-direction: row"><button onclick="close_rightpanel()">x</button><p style="text-align:center;flex:auto">properties<p></div><p>' + "image_added" + scene_id + '</p><hr style="background-color: #5361AA;"><div class="row"><div class="col-md-2"></div><div class="col-md-8 mt-4 mb-4"  style="background-color: #FFFFFF;display: flex;align-items: center;justify-content: center;height: 180px;"><button onclick="onpropertiespreviewbutton()"class="btn" style="border: 1px solid black; line-height: 15px;">Preview</button></div><div class="col-md-12"><button>assign asset</button><br><input type="text" id="fname" name="fname" style="background-color: aliceblue;"></div> </div> <hr style="background-color: #5361AA;"><div class="row d-flex justify-content-center"></div><br /> </div>'
}
function cutelement()
{
   console.log("cut elemnts",  selected_object_id,cut_element)
}
function closetab()
{
    document.getElementById('home1Icon').style.display = "none"
}
function opentab()
{
    document.getElementById('home1Icon').style.display = "block"
}
function getfolderpage()
{
    window.location = "http://127.0.0.1:3000/folderpage"
}

function pasteelement() {
    console.log("paste into scene", currentScene_View, "cut", selected_object_id, cut_element)

    var findlicut = document.getElementById(cut_element)
    console.log(findlicut)
    findlicut.remove()
    var findcutelement = document.getElementById(selected_object_id)
    console.log(findcutelement, findcutelement.object3D, findcutelement.tagName.toLowerCase());
    var findpastescene = document.getElementById(currentScene_View)
    //  var findulid =  document.getElementById(currentScene_View).find("ul")
    console.log("scene", findpastescene)
    var str = currentScene_View;
    var matches = str.match(/(\d+)/);

    console.log("extr", matches[0])
    var idString = "s" + matches[0] + "-scene" + matches[0]
    console.log("id", idString)
    if (findcutelement.tagName.toLowerCase() == "a-image") {
        var position = findcutelement.object3D.position
        var rotation = findcutelement.object3D.rotation
        var scaling = findcutelement.object3D.scale
        var pass_id = idString
        console.log("id", pass_id, rotation, document.getElementById(selected_object_id))
        var source = $(findcutelement).attr('src')
        console.log("source", source)
        add_imagescut(pass_id, currentScene_View, position, rotation, scaling, source)
    }
    else
        if (findcutelement.tagName.toLowerCase() == "a-video") {
            var position = findcutelement.object3D.position
            var rotation = findcutelement.object3D.rotation
            var scaling = findcutelement.object3D.scale
            var pass_id = idString
            console.log("id", pass_id, rotation, document.getElementById(selected_object_id))
            var source = $(findcutelement).attr('src')
            console.log("source", source)
            add_videocut(pass_id, currentScene_View, position, rotation, scaling, source)
        }
        else
            if (findcutelement.tagName.toLowerCase() == "a-cube") {
                var position = findcutelement.object3D.position
                var rotation = findcutelement.object3D.rotation
                var scaling = findcutelement.object3D.scale
                var pass_id = idString
                console.log("id", pass_id, rotation, document.getElementById(selected_object_id))
                var source = $(findcutelement).attr('src')
                console.log("source", source)
                add_cubecut(pass_id, currentScene_View, position, rotation, scaling, source)
            }
            else
            if (findcutelement.tagName.toLowerCase() == "a-entity") {
                model = "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/cube/scene.gltf+&mbxr+0+&mbxr+0+&mbxr+-2+&mbxr+1+&mbxr+1+&mbxr+1"
                var pass_id = idString
                var position = findcutelement.object3D.position
                var rotation = findcutelement.object3D.rotation
                var scaling = findcutelement.object3D.scale
                var source= "";
                changeModelcut(model, pass_id, currentScene_View, position, scaling, rotation, source)
            }
            


}
function add_imagescut(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {


    console.log("source in cut::", source_recd)
    // var sceneEl = document.querySelector('a-scene');
    console.log("received ", id, scene_id)
    var sceneEl = document.getElementById(scene_id)
    var entity_img = document.createElement('a-image');
    entity_img.setAttribute('id', "image_added" + scene_id)
    entity_img.setAttribute('position', { x: position_recd.x, y: position_recd.y, z: position_recd.z });

    entity_img.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd._x), y: THREE.Math.radToDeg(rotation_recd._y), z: THREE.Math.radToDeg(rotation_recd._z) });

    entity_img.setAttribute('scale', { x: scaling_recd.x, y: scaling_recd.y, z: scaling_recd.z });

    entity_img.setAttribute('src', source_recd)

    console.log("Image Properties::", entity_img.object3D.position.x);

    //adding it to structure list
    var check = id + "_elements"
    var ul = document.getElementById(id + "_elements");
    
    console.log("reached here", ul, check)
    var li = document.createElement("li");
    li.classList.add("list-group-item")
    console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
    var newImage = document.createElement('img')
    newImage.src = "../../../app-assets//images/svg/Vector.png"
    li.setAttribute('id', "li-" + entity_img.id);
    li.appendChild(newImage)
    li.appendChild(document.createTextNode("Image"));
    //ashwins code
    let eyeicon = document.createElement('img')
    eyeicon.style.marginLeft="80px"

    eyeicon.setAttribute('onclick', 'hideshow()');
    eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
    li.appendChild(eyeicon)
    //ashwinscode
    li.addEventListener('click', function (e) {
        elements_id_saved = id;
        position_saved = position_recd
        rotation_saved = rotation_recd
        scaling_saved = scaling_recd
        source_saved = source_recd
        cut_element = li.id;
        selected_object_id = "image_added" + scene_id
        console.log("onlcick of", li.id)
          //ashwin's code
          component_id.push(li.id)
          console.log(component_id)
          //componentsHighlight(li.id)
          //ashwin's code
        var findobject = document.getElementById(selected_object_id)
        console.log("found,", findobject)
        selected_object = findobject.object3D
        console.log("selected obj", selected_object)
        // cloneasset()
    });
    ul.appendChild(li);
    //onchange
    entity_img.addEventListener('objectChange', (e) => {
        console.log("object moved")
    });
    //onclick of object
    entity_img.addEventListener('click', function (evt) {
        document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
        selected_object_id = "image_added" + scene_id
        var findobject = document.getElementById(selected_object_id)
        console.log("found,", findobject.object3D)
        selected_object = findobject.object3D
        console.log("selected obj", selected_object)
        document.getElementById('rightPanel').style.maxWidth = "286px"
        console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
        document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
        document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
        document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
        document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
        document.getElementById('componentEntityHeader').style.marginBottom = "50px"
        console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
        document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
        document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
        var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

        var findpropertiesdiv = document.getElementById('properties_value')
        if (findpropertiesdiv) {
            console.log("found propernskjdfnkjdsn")
        }
        else {
            console.log(" NOT found propernskjdfnkjdsn")
        }

        console.log("sidebar:::::::::", getside)


        var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
        document.getElementById('addComponentContainer').remove()
        var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')
        // $("#sidebar").children(":not(#componentEntityHeader)").remove();
        for (let i = 1; i <= getsidebar.length; i++) {
            getsidebar[i].innerHTML = "";
        }
        console.log("Clicked")
        var scene_present = document.getElementById('sidebar').innerHTML;
        // document.getElementById('sidebar').innerHTML = scene_present + ' <div class="row"> <div class="col-md-1"></div><div class="col-md-9" style="background-color: #4D505C;display: flex;align-items: center;justify-content: center;height: 148px;"> <button class="btn" style=" line-height: 15px;">Preview</button> </div><div class="col-md-2"></div></div>' 
        var objects = $(".vec3");
        for (var obj of objects) {
            console.log(obj);
        }
        document.getElementById('addComponentContainer').style.visibility = "hidden"
        var nameid = "image_added" + scene_id
        // console.log("source of image :::", $('#' + nameid).attr('src'))
        elements_id_saved = id;
        position_saved = position_recd
        rotation_saved = rotation_recd
        scaling_saved = scaling_recd
        source_saved = source_recd
        console.log("check on click", elements_id_saved, position_saved, rotation_saved, scaling_saved, scene_id, source_saved)
        selected_object = entity_img.object3D
        console.log("clicked image!!!", entity_img.object3D)
        //change name in properties
        document.getElementById('object_name').innerText = entity_img.id;
        //assign global variable so that delete will be easier
        selected_object_id = entity_img.id
        console.log("selected", selected_object_id)
        ///assign position
        var inputX = document.getElementById("translateX");
        inputX.setAttribute('value', entity_img.object3D.position.x)
        var inputY = document.getElementById("translateY");
        inputY.setAttribute('value', entity_img.object3D.position.y)
        var inputZ = document.getElementById("translateZ");
        inputZ.setAttribute('value', entity_img.object3D.position.z)
        var inputX = document.getElementById("rotateX");
        inputX.setAttribute('value', entity_img.object3D.rotation.x)
        var inputY = document.getElementById("rotateY");
        inputY.setAttribute('value', entity_img.object3D.rotation.y)
        var inputZ = document.getElementById("rotateZ");
        inputZ.setAttribute('value', entity_img.object3D.rotation.z)
        var inputX = document.getElementById("scaleX");
        inputX.setAttribute('value', entity_img.object3D.scale.x)
        var inputY = document.getElementById("scaleY");
        inputY.setAttribute('value', entity_img.object3D.scale.y)
        var inputZ = document.getElementById("scaleZ");
        inputZ.setAttribute('value', entity_img.object3D.scale.z)

    });
    sceneEl.appendChild(entity_img);

}

function add_videocut(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {

    console.log("in else", source_recd.asset_src)
    // var sceneEl = document.querySelector('a-scene');
    var sceneEl = document.getElementById(scene_id)
    var entity_video = document.createElement('a-video');
    entity_video.setAttribute('id', "video_added" + scene_id)
    entity_video.setAttribute('position', { x: position_recd.x, y: position_recd.y, z: position_recd.z });
    entity_video.setAttribute('scale', { x: scaling_recd.x, y: scaling_recd.y, z: scaling_recd.z });
    entity_video.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd._x), y: THREE.Math.radToDeg(rotation_recd._y), z: THREE.Math.radToDeg(rotation_recd._z) });
    entity_video.setAttribute('src', source_recd)
    // entity_video.setAttribute('width', 8)
    // entity_video.setAttribute('height', 5)
    // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
    console.log("VIdeo Properties::", entity_video);
    //add it to structure
    var ul = document.getElementById(id + "_elements");
    
    console.log("checking", ul, id)
    var li = document.createElement("li");
    li.classList.add("list-group-item")
    console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
    var newImage = document.createElement('img')
    newImage.src = "../../../app-assets//images/svg/Vector.png"
    li.setAttribute('id', "li-" + entity_video.id);
    li.appendChild(newImage)
    li.appendChild(document.createTextNode("Video"));
    //ashwins code
    let eyeicon = document.createElement('img')
    eyeicon.style.marginLeft="80px"

    eyeicon.setAttribute('onclick', 'hideshow()');
    eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
    li.appendChild(eyeicon)
    //ashwinscode
    li.addEventListener('click', function (e) {
        elements_id_saved = id;
        position_saved = position_recd
        rotation_saved = rotation_recd
        scaling_saved = scaling_recd
        source_saved = source_recd
        cut_element = li.id;
        selected_object_id = "video_added" + scene_id
        console.log("onlcick of", li.id)
          //ashwin's code
          component_id.push(li.id)
          console.log(component_id)
          //componentsHighlight(li.id)
          //ashwin's code
        var findobject = document.getElementById(selected_object_id)
        console.log("found,", findobject.object3D)
        selected_object = findobject.object3D
        console.log("selected obj", selected_object)
        // cloneasset()
    });

    ul.appendChild(li);
    //onclick
    entity_video.addEventListener('click', function (evt) {
        document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
        selected_object_id = "video_added" + scene_id
        document.getElementById('rightPanel').style.maxWidth = "286px"
        console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
        document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
        document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
        document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
        document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
        document.getElementById('componentEntityHeader').style.marginBottom = "50px"
        console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
        document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
        document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
        var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

        var findpropertiesdiv = document.getElementById('properties_value')
        if (findpropertiesdiv) {
            console.log("found propernskjdfnkjdsn")
        }
        else {
            console.log(" NOT found propernskjdfnkjdsn")
        }

        console.log("sidebar:::::::::", getside)

        var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
        document.getElementById('addComponentContainer').remove()
        var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

        for (let i = 1; i <= getsidebar.length; i++) {
            getsidebar[i].innerHTML = "";
        }

        console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
        document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
        // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
        // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
        console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
        var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

        console.log("sidebar:::::::::", getside)


        var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



        document.getElementById('addComponentContainer').style.visibility = "hidden"
        elements_id_saved = id;
        position_saved = position_recd
        rotation_saved = rotation_recd
        scaling_saved = scaling_recd
        source_saved = source_recd
        selected_object = entity_video.object3D
        console.log("clicked image ..........", entity_video)
        document.getElementById('object_name').innerText = entity_video.id
        selected_object_id = entity_video.id
        var inputX = document.getElementById("translateX");
        inputX.setAttribute('value', entity_video.object3D.position.x)
        var inputY = document.getElementById("translateY");
        inputY.setAttribute('value', entity_video.object3D.position.y)
        var inputZ = document.getElementById("translateZ");
        inputZ.setAttribute('value', entity_video.object3D.position.z)
        var inputX = document.getElementById("rotateX");
        inputX.setAttribute('value', entity_video.object3D.rotation.x)
        var inputY = document.getElementById("rotateY");
        inputY.setAttribute('value', entity_video.object3D.rotation.y)
        var inputZ = document.getElementById("rotateZ");
        inputZ.setAttribute('value', entity_video.object3D.rotation.z)
        var inputX = document.getElementById("scaleX");
        inputX.setAttribute('value', entity_video.object3D.scale.x)
        var inputY = document.getElementById("scaleY");
        inputY.setAttribute('value', entity_video.object3D.scale.y)
        var inputZ = document.getElementById("scaleZ");
        inputZ.setAttribute('value', entity_video.object3D.scale.z)
        // openProperties();
        // console.log(document.getElementsByClassName("map_value string")[0].defaultValue)

        // entity_video.setAttribute('src', document.getElementsByClassName("map_value string")[0].defaultValue)
    });
    sceneEl.appendChild(entity_video);




}
function add_cubecut(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {
    // var sceneEl = document.querySelector('a-scene');
    console.log("poSITION", position_recd)
    var sceneEl = document.getElementById(scene_id)
    var entity_cube = document.createElement('a-box');
    // entity_cube.className="draggable"
    entity_cube.setAttribute('id', "cube" + scene_id)
    entity_cube.setAttribute('position', { x: position_recd.x, y: position_recd.y, z: position_recd.z });
    entity_cube.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z })
    entity_cube.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd._y), z: THREE.Math.radToDeg(rotation_recd._z) });
    entity_cube.setAttribute('color', "red");
    // entity_cube.setAttribute('material', 'src', 'url(assets/images/author/author-2.jpg)')
    console.log("cube Properties::", entity_cube);

    var ul = document.getElementById(id + "_elements");
    
    var li = document.createElement("li");
    li.classList.add("list-group-item")
    console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
    var newImage = document.createElement('img')
    newImage.src = "../../../app-assets//images/svg/Vector.png"
    li.setAttribute('id', "li-" + entity_cube.id);
    li.appendChild(newImage)
    li.appendChild(document.createTextNode("Cube"));
    //ashwins code
    let eyeicon = document.createElement('img')
    eyeicon.style.marginLeft="80px"

    eyeicon.setAttribute('onclick', 'hideshow()');
    eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
    li.appendChild(eyeicon)
    //ashwinscode
    li.addEventListener('click', function (e) {
        elements_id_saved = id;
        position_saved = position_recd
        rotation_saved = rotation_recd
        scaling_saved = scaling_recd
        source_saved = source_recd
        selected_object_id = "cube" + scene_id
        console.log("onlcick of", li.id)
          //ashwin's code
          component_id.push(li.id)
          console.log(component_id)
          //componentsHighlight(li.id)
          //ashwin's code
        var findobject = document.getElementById(selected_object_id)
        console.log("found,", findobject.object3D)
        selected_object = findobject.object3D
        console.log("selected obj", selected_object)
        // cloneasset()
    });

    ul.appendChild(li);
    //onclick
    entity_cube.addEventListener('click', function (evt) {
        selected_object_id = "cube" + scene_id
        document.getElementById('rightPanel').style.maxWidth = "286px"
        console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
        document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
        document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
        document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
        document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
        document.getElementById('componentEntityHeader').style.marginBottom = "50px"
        console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
        document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
        document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
        var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

        var findpropertiesdiv = document.getElementById('properties_value')
        if (findpropertiesdiv) {
            console.log("found propernskjdfnkjdsn")
        }
        else {
            console.log(" NOT found propernskjdfnkjdsn")
        }

        console.log("sidebar:::::::::", getside)

        var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
        document.getElementById('addComponentContainer').remove()
        var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

        for (let i = 1; i <= getsidebar.length; i++) {
            getsidebar[i].innerHTML = "";
        }

        console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
        document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
        // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
        // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
        console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
        var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

        console.log("sidebar:::::::::", getside)


        var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



        document.getElementById('addComponentContainer').style.visibility = "hidden"

        selected_object = entity_cube.object3D
        elements_id_saved = id;
        position_saved = position_recd
        rotation_saved = rotation_recd
        scaling_saved = scaling_recd
        source_saved = source_recd
        console.log("next line")
        console.log("find collapsible component", document.getElementsByClassName("collapsible-component"))
        document.getElementById('addComponentContainer').style.visibility = "hidden"
        console.log("clicked cube", entity_cube.object3D)
        console.log("color::", entity_cube.getAttribute('color'))
        // console.log("texture::", entity_cube.getAttribute('texture'))
        document.getElementById('object_name').innerText = entity_cube.id
        selected_object_id = entity_cube.id
        // document.getElementById('texture_display').innerText = entity_cube.getAttribute('texture')

        document.getElementById("obj_color").style.backgroundColor = entity_cube.getAttribute('color')
        var inputX = document.getElementById("translateX");
        inputX.setAttribute('value', entity_cube.object3D.position.x)
        var inputY = document.getElementById("translateY");
        inputY.setAttribute('value', entity_cube.object3D.position.y)
        var inputZ = document.getElementById("translateZ");
        inputZ.setAttribute('value', entity_cube.object3D.position.z)
        var inputX = document.getElementById("rotateX");
        inputX.setAttribute('value', entity_cube.object3D.rotation.x)
        var inputY = document.getElementById("rotateY");
        inputY.setAttribute('value', entity_cube.object3D.rotation.y)
        var inputZ = document.getElementById("rotateZ");
        inputZ.setAttribute('value', entity_cube.object3D.rotation.z)
        var inputX = document.getElementById("scaleX");
        inputX.setAttribute('value', entity_cube.object3D.scale.x)
        var inputY = document.getElementById("scaleY");
        inputY.setAttribute('value', entity_cube.object3D.scale.y)
        var inputZ = document.getElementById("scaleZ");
        inputZ.setAttribute('value', entity_cube.object3D.scale.z)
        // openProperties();
        // console.log(document.getElementsByClassName("map_value string")[0].defaultValue)
        // source_saved = document.getElementsByClassName("map_value string")[0].defaultValue
        // entity_cube.setAttribute('material', 'src', document.getElementsByClassName("map_value string")[0].defaultValue)

    });

    sceneEl.appendChild(entity_cube);






}

function changeModelcut(modellink, id, scene_id, position_recd, scaling_recd, rotation_recd, source_recd) {

    
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_gltf = document.createElement('a-entity');
        var data_arr = modellink.split('+&mbxr+');
        console.log(data_arr)
        entity_gltf.setAttribute('id', "model" + scene_id)
        entity_gltf.setAttribute('position', { x: position_recd.x, y: position_recd.y, z: position_recd.z });
        entity_gltf.setAttribute('gltf-model', data_arr[0])
        entity_gltf.setAttribute('scale', { x: scaling_recd.x, y: scaling_recd.y, z: scaling_recd.z })
        entity_gltf.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd._x), y: THREE.Math.radToDeg(rotation_recd._y), z: THREE.Math.radToDeg(rotation_recd._z) });
        //add it to structure
        var ul = document.getElementById(id + "_elements");
        
        var li = document.createElement("li");
        li.classList.add("list-group-item")
        console.log("test loremli",ul.id)

        Sortable.create(ul, { animation: 100,  draggable: '.list-group-item', handle: '.list-group-item', sort: true, filter: '.sortable-disabled', chosenClass: 'active' });
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_gltf.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Model"));
        //ashwins code
        let eyeicon = document.createElement('img')
        eyeicon.style.marginLeft="80px"

        eyeicon.setAttribute('onclick', 'hideshow()');
        eyeicon.src = "../../../app-assets//images/svg/eyeicon.svg"
        li.appendChild(eyeicon)
        //ashwinscode
        li.addEventListener('click', function (e) {
            console.log("onlcick of")
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object_id = "model" + scene_id
            console.log("onlcick of", li.id)
              //ashwin's code
              component_id.push(li.id)
              console.log(component_id)
              //componentsHighlight(li.id)
              //ashwin's code
            var findobject = document.getElementById(selected_object_id)
            console.log("found,", findobject.object3D)
            selected_object = findobject.object3D
            console.log("selected obj", selected_object)
            // cloneasset()
        });

        ul.appendChild(li);
        //onclick
        entity_gltf.addEventListener('click', function (evt) {
            document.getElementById('rightPanel').style.maxWidth = "325px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').style.marginBottom = "50px"
            console.log("console to check::::::",document.getElementById('sidebar').getElementsByClassName('components'));
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
            document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

            var findpropertiesdiv = document.getElementById('properties_value')
            if (findpropertiesdiv) {
                console.log("found propernskjdfnkjdsn")
            }
            else{
                console.log(" NOT found propernskjdfnkjdsn")
            }
            
            console.log("sidebar:::::::::",getside)

            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            document.getElementById('addComponentContainer').remove()
            var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')
           
            for (let i = 1; i <= getsidebar.length; i++) {
                getsidebar[i].innerHTML = "";
            }

            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
            // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
            console.log("console to check::::::",document.getElementById('sidebar').getElementsByClassName('components'));
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML
            
            console.log("sidebar:::::::::",getside)

             
            var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
            
            
         
            document.getElementById('addComponentContainer').style.visibility = "hidden"

            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object = entity_gltf.object3D
            console.log("clicked image .........", entity_gltf)
            document.getElementById('object_name').innerText = data_arr[0]
            selected_object_id = data_arr[0]
            var inputX = document.getElementById("translateX");
            inputX.setAttribute('value', entity_gltf.object3D.position.x)
            var inputY = document.getElementById("translateY");
            inputY.setAttribute('value', entity_gltf.object3D.position.y)
            var inputZ = document.getElementById("translateZ");
            inputZ.setAttribute('value', entity_gltf.object3D.position.z)
            var inputX = document.getElementById("rotateX");
            inputX.setAttribute('value', entity_gltf.object3D.rotation.x)
            var inputY = document.getElementById("rotateY");
            inputY.setAttribute('value', entity_gltf.object3D.rotation.y)
            var inputZ = document.getElementById("rotateZ");
            inputZ.setAttribute('value', entity_gltf.object3D.rotation.z)
            var inputX = document.getElementById("scaleX");
            inputX.setAttribute('value', entity_gltf.object3D.scale.x)
            var inputY = document.getElementById("scaleY");
            inputY.setAttribute('value', entity_gltf.object3D.scale.y)
            var inputZ = document.getElementById("scaleZ");
            inputZ.setAttribute('value', entity_gltf.object3D.scale.z)
            // openProperties();
        });
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Model Properties::", entity_gltf.object3D);

        sceneEl.appendChild(entity_gltf);

    

}

function renameScene()
{
    console.log("scene to be renamed" , rename_scene)
    var scene = document.getElementById("scene_rename").value;
   console.log("value",scene)
    var getscene = document.getElementById(rename_scene).getElementsByTagName('span')
    getscene[0].innerText = scene
    console.log("value to change",getscene)
}
function onclickofcursor()
{
    document.getElementById('clickPosition').getWorldPosition();
}

// function getPositionXY() {
//     var findobject = document.getElementById('boxing')
//     findobject.addEventListener("click", e => {
//         console.log("hi",e.detail.intersection.point.x)
//         var b = document.createElement("a-sphere");
//         b.setAttribute("position", {
//           "x" : e.detail.intersection.point.x,
//           "y" : e.detail.intersection.point.y,
//           "z" : e.detail.intersection.point.z
//       });
//       b.setAttribute("radius","0.07");
//       b.setAttribute("color","#fff");
  
//       findobject.appendChild(b);
      
//       })
      
      
// }
// function redirectPlayLocation()
// {
//     console.log("latlong",LatitudeSaved,LongitudeSaved)
// }

// function setid(id)
// {
//     dropdownID = id
//    console.log("dropdownID",dropdownID)
// }
// function calldropdownfunction(received)
// {
//     console.log("onclick", received.textContent)
//     dropdownFunction(received.textContent,dropdownID)
// }
// function getrulespage() {
//     window.location = "http://127.0.0.1:3000/Rulespage"
// }

function getPositionXY(id, inputValue) {

    var findobject = document.getElementById(id)
    findobject.addEventListener("click", e => {
        if (hotspotCheck == true) {
            hotspotCheck = false;
            console.log("hi", e.detail.intersection.point.x)
            var b = document.createElement("a-sphere");
            b.setAttribute("position", {
                "x": e.detail.intersection.point.x,
                "y": e.detail.intersection.point.y,
                "z": e.detail.intersection.point.z
            });
            b.setAttribute("radius", "0.07");
            b.setAttribute("color", "#fff");
            var text = document.createElement("a-text")
            text.setAttribute('value', document.getElementById(inputValue).value)
            text.setAttribute("position", {
                "x": e.detail.intersection.point.x + 0.2,
                "y": e.detail.intersection.point.y,
                "z": e.detail.intersection.point.z
            });
            findobject.appendChild(text);
            findobject.appendChild(b);

            hotspotDictionary.push(
                {
                    "assetid": id,
                    "positionx": e.detail.intersection.point.x,
                    "positiony": e.detail.intersection.point.y,
                    "positionz": e.detail.intersection.point.z,
                    "label": document.getElementById(inputValue).value
                },


            );
            console.log("hotspotdictionary", hotspotDictionary)
        }


    })




}
function getonloadPositionXY(id, inputValue, posX, posY, posZ) {

    var findobject = document.getElementById(id)
    var b = document.createElement("a-sphere");
    b.setAttribute("position", {
        "x": posX,
        "y": posY,
        "z": posZ
    });
    b.setAttribute("radius", "0.07");
    b.setAttribute("color", "#fff");
    var text = document.createElement("a-text")
    text.setAttribute('value', inputValue)
    text.setAttribute("position", {
        "x": posX + 0.2,
        "y": posY,
        "z": posZ
    });
    findobject.appendChild(text);
    findobject.appendChild(b);

    hotspotDictionary.push(
        {
            "assetid": id,
            "positionx": posX,
            "positiony": posY,
            "positionz": posZ,
            "label": inputValue
        },


    );
    console.log("hotspotdictionary", hotspotDictionary)








}
function redirectPlayLocation() {
    console.log("latlong", LatitudeSaved, LongitudeSaved)
}

function setid(id) {
    dropdownID = id
    console.log("dropdownID", dropdownID)
}
function calldropdownfunction(received) {
    console.log("onclick", received.textContent)
    dropdownFunction(received.textContent, dropdownID)
}
function getrulespage() {
    window.location = "http://127.0.0.1:3000/Rulespage"
}

function enablehotspot() {
    console.log("selected object for hotsopt", selected_object, selected_object_id, hotspotCheck)

    var findDiv = document.getElementById('hotspotInput')
    var present = findDiv.innerHTML
    findDiv.innerHTML = present + '<input type="text" placeholder="' + hotspotcounter + '" id="label' + hotspotcounter + '" style="background-color: aliceblue;">'
    var inputid = "label" + hotspotcounter
    hotspotcounter = hotspotcounter + 1;
    hotspotCheck = true;

    getPositionXY(selected_object_id, inputid)

}


function saveRulesData(list_id,sceneName)
{
    
    var total = document.getElementById(list_id).getElementsByTagName("li").length
    console.log("total",total,document.getElementById(list_id).getElementsByTagName("li"))
    if (total == 0) {
        console.log("no elements")
        var rules_dictionary = []


    } else {
        var rules_dictionary = []
        var elements = document.getElementById(list_id).getElementsByTagName("li")
        console.log("number of items=", total, "elements", elements)
        //for (let i = 0; i < total; i++) {
        function SceneElements(i) {
            console.log("i", i, "tottal", total)
            if (i < total) {
                var scenedictrules = []
                var new_elementsid_splice = elements[i].id.slice(elements[i].id.lastIndexOf('-') + 1)
                console.log()
                var newelement = document.getElementById(new_elementsid_splice)
                console.log("new element", elements[i].id, elements[i].id.slice(elements[i].id.lastIndexOf('-') + 1), newelement, newelement.object3D)
                console.log("inforloop ", newelement.object3D.rotation);
                console.log("el property", newelement.object3D)
                console.log("el property", newelement.object3D.el.toString().includes("<a-image"))
                console.log("SOURCE", $('#' + elements[i].id).outerHTML, $('#' + elements[i].id).attr('src'))
                console.log("tagname", newelement.tagName)
                scenedictrules.push(
                    {
                        "assetid": new_elementsid_splice
                    },
                    
                    {
                        "asset_type": newelement.tagName.toLowerCase()
                    }
                   
                );

                rules_dictionary.push({
                    "asset": scenedictrules
                })

                i++;
                SceneElements(i);
            }
            else {
                console.log("done with element")
               
            }
        }

        SceneElements(0);
        
    }
    console.log("finally in rules",sceneName,rules_dictionary)
    window.localStorage.setItem("scene",sceneName);
    window.localStorage.setItem( 'showScenePreview', sceneName );
    window.localStorage.setItem("sceneData",JSON.stringify(rules_dictionary));
    console.log("counter in rules:",counter-1)
    window.localStorage.setItem("counter",counter-1);
    
    
}


// Kiran's code

// sidenav left starts here
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    // document.getElementById("main-content-section").style.marginLeft = "300px";
    // document.getElementById("main-content-section").style.setProperty('width', 'calc(100% - 300px)');
    document.getElementById("openbutton").classList.add("hide");
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main-content-section").style.marginLeft= "0";
    document.getElementById("openbutton").classList.remove("hide");
  }
// sidenav left ends here

// side nav right starts here
function openNavrt() {
    document.getElementById("rightPanel").style.width = "300px";
    // document.getElementById("main-content-section").style.marginLeft = "300px";
    // document.getElementById("main-content-section").style.setProperty('width', 'calc(100% - 300px)');
    document.getElementById("openbuttonrt").classList.add("hide");
  }
  
  function closeNavrt() {
    document.getElementById("rightPanel").style.width = "0";
    // document.getElementById("main-content-section").style.marginLeft= "0";
    document.getElementById("openbuttonrt").classList.remove("hide");
  }
// side nav right ends here

// left screen scene dropdown starts here

// var count_lock=0
// function lockscene(id){
//     console.log("working id",id)
//     let lockid = id

//     if(count_lock == 0 || count_lock % 2 == 0){
//         const lockglobalid = document.getElementById(lockid)
//         lockglobalid.style.opacity="0.1"
//         lockglobalid.style.pointerEvents = 'none';
//         count_lock++
//         console.log(count_lock)
//     }else{
//         const lockglobal = document.getElementById(lockid)
//         lockglobal.style.opacity="1"
//         lockglobal.style.pointerEvents = 'auto';
//         count_lock++
//         console.log(count_lock)
//     }
    
// }

var countScence = 0;
function scenceDropping(id) {
    let sceneid = id

    if(countScence == 0 || countScence % 2 == 0){
        const lockglobalid = document.getElementById(sceneid)
        lockglobalid.classList.add("hide");
        // lockglobalid.style.pointerEvents = 'none';
        countScence++
        console.log(countScence)
    }else{
        const lockglobal = document.getElementById(sceneid)
        lockglobal.classList.remove("hide");
        // lockglobal.style.pointerEvents = 'auto';
        countScence++
        console.log(countScence)
    }
}
// left screen scene dropdown endss here

function highlight_bg(id){
       
    new_scene_id = id; 
    
    {
        var delete_class = document.querySelectorAll(".highlighting");
        for (i=0; i<delete_class.length;i++){
      
            delete_class[i].classList.remove("bg-highlight");
        }
    }

    document.getElementById(new_scene_id).classList.add("bg-highlight");

    var selected_li = "li-"+selected_object_id
    console.log("selected list",selected_li)
      
}
// Kiran's code