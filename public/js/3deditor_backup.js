
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
var visible_scene_id = ""
var cut_element = ""
function onPlaneclick() {
    var find = document.querySelector("a-plane")
    console.log(find, find.object3D)
}
function delete_object() {
    if (selected_object_id !== '') {
        // console.log("to delete",selected_object,selected_object_id)
        // console.log("inside delete")
        var selected_id = "li-" + selected_object_id
        var candidate = document.getElementById(selected_id);
        console.log("candidate", candidate)
        candidate.remove();
        var object_todelete = document.getElementById(selected_object_id);
        object_todelete.parentNode.removeChild(object_todelete);
        document.getElementById('object_name').innerText = "Name";
        //remove element from structure list

        // // openStructure()

    }
}
function addScene() {
    console.log("counter", counter)
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
    var select_id = "s" + counter + "-" + rec_id;
    var scene_present = document.getElementById('new_scenes_list').innerHTML;
    document.getElementById('new_scenes_list').innerHTML = scene_present + '<ul class="scrollers" id=' + ul_id + ' onclick="get_scene(this.id)"  style="color: white;"> <li id="scroller"><div style="display: flex;flex-direction: row; justify-content: space-between;"><span id=' + "li-" + rec_id + ' class="scene" onclick="shownewscene(' + "'" + rec_id + "', " + "'" + elements_tag + "'" + ')"><img src="../../../app-assets//images/svg/Vector (9).png" style="margin-right: 10px;">' + rec_id + '</span> <img onclick="delete_object()" class="" src="../../../app-assets//images/svg/delete.svg" alt="" height="12" width="12"></div>  <div style="display: flex;justify-content: space-between;padding-left: 40px;padding-top: 5px;padding-bottom: 3px;"><select name="cars" id=' + select_id + ' onchange="dropdownFunction(this.value,this.id)" style="background-color: #30419b;color: white;padding-right: 60px;"><option value="" disabled selected>Add Component</option><option value="Model">Model</option><option value="Video">Video</option><option value="Image">Image</option><option value="Cube">Cube</option> </select> </div><ul id=' + elements_tag + ' class="nested active"></ul></li></ul><br />'

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
function add_images(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {

    if (position_recd == "center") {
        console.log("position:", position_recd, rotation_recd, scaling_recd)
        // var sceneEl = document.querySelector('a-scene');
        console.log("received ", id, scene_id)

        var sceneEl = document.getElementById(scene_id)
        console.log("main scene", sceneEl)
        var entity_img = document.createElement('a-image');
        entity_img.setAttribute('id', "image_added" + scene_id)
        entity_img.setAttribute('src', "https://www.rhibhus.com/AR_Trial/metabild/editor/Placeholders_3deditor/Image_place%20holder.png")
        // entity_img.setAttribute('scale', { x: 2, y: 2, z: 2 })
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("Image Properties::", entity_img.object3D.position.x);

        //adding it to structure list
        var check = id + "_elements"
        var ul = document.getElementById(id + "_elements");
        console.log("reached here", ul)
        var li = document.createElement("li");


        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"

        li.setAttribute('id', "li-" + entity_img.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Image"));
        li.addEventListener('click', function (e) {
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object_id = "image_added" + scene_id
            cut_element = li.id;
            console.log("onlcick of", selected_object_id)
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
            document.getElementById('rightPanel').style.maxWidth = "286px"
            console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
            document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
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
            console.log("clicked image", entity_img.object3D)
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

        console.log("position in else CHECKPOINT:", rotation_recd, rotation_recd.rotation._x, rotation_recd.rotation._y, rotation_recd.rotation._z)
        // var sceneEl = document.querySelector('a-scene');
        console.log("received ", id, scene_id)
        var sceneEl = document.getElementById(scene_id)
        var entity_img = document.createElement('a-image');
        entity_img.setAttribute('id', "image_added" + scene_id)
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
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_img.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Image"));
        li.addEventListener('click', function (e) {
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            cut_element = li.id;
            selected_object_id = "image_added" + scene_id
            console.log("onlcick of", li.id)
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
function close_rightpanel() {
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
function add_images1(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {

    if (position_recd == "center") {
        console.log("position:", position_recd, rotation_recd, scaling_recd)
        // var sceneEl = document.querySelector('a-scene');
        console.log("received ", id, scene_id)
        var sceneEl = document.getElementById(scene_id)
        var entity_img = document.createElement('a-image');
        entity_img.setAttribute('id', "image_added" + scene_id)
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
        entity_img.setAttribute('id', "image_added" + scene_id)
        entity_img.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_img.setAttribute('rotation', { x: rotation_recd.rotation.x, y: rotation_recd.rotation.y, z: rotation_recd.rotation.z });
        entity_img.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });

        entity_img.setAttribute('src', source_recd.asset_src)
        entity_img.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z });

        console.log("Image Properties::", entity_img.object3D.position.x);


        sceneEl.appendChild(entity_img);

    }

}
function add_video(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {
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
        console.log("VIdeo Properties::", entity_video);
        //add it to structure
        var ul = document.getElementById(id + "_elements");

        console.log("checking", ul, id)
        var li = document.createElement("li");
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_video.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Video"));
        li.addEventListener('click', function (e) {
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            cut_element = li.id;
            selected_object_id = "video_added" + scene_id
            console.log("onlcick of", li.id)
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
        entity_video.setAttribute('id', "video_added" + scene_id)
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
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_video.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Video"));
        li.addEventListener('click', function (e) {
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            cut_element = li.id;
            selected_object_id = "video_added" + scene_id
            console.log("onlcick of", li.id)
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

    }


}
function add_video1(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {
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
        // entity_video.setAttribute('width', 8)
        // entity_video.setAttribute('height', 5)
        // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
        console.log("VIdeo Properties::", entity_video);

        sceneEl.appendChild(entity_video);

    }


}
function add_text(id) {
    var sceneEl = document.querySelector('a-scene');
    var entity_text = document.createElement('a-text');
    entity_text.setAttribute('id', "text_added")
    entity_text.setAttribute('position', { x: 0, y: 1, z: -3 });
    entity_text.setAttribute('text', { value: "new text" })
    entity_text.setAttribute('scale', { x: 0, y: 1, z: -3 })
    entity_text.setAttribute('color', "red");
    // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
    console.log("text Properties::", entity_text);

    sceneEl.appendChild(entity_text);

}
function add_cube(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {
    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_cube = document.createElement('a-box');
        // entity_cube.className="draggable"
        entity_cube.setAttribute('id', "cube" + scene_id)
        entity_cube.setAttribute('position', { x: 0, y: 1, z: -3 });
        entity_cube.setAttribute('scale', { x: 1, y: 1, z: 1 })
        entity_cube.setAttribute('color', "red");
        // entity_cube.setAttribute('material', 'src', 'url(assets/images/author/author-2.jpg)')
        console.log("cube Properties::", entity_cube);

        var ul = document.getElementById(id + "_elements");
        var li = document.createElement("li");
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_cube.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Cube"));
        li.addEventListener('click', function (e) {
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            cut_element = li.id;
            selected_object_id = "cube" + scene_id
            console.log("onlcick of", li.id)
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
            cut_element = li.id;
            console.log("clicked cube", entity_cube.object3D)
            console.log("color::", entity_cube.getAttribute('color'))
            console.log("texture::", entity_cube.getAttribute('texture'))
            document.getElementById('texture_display').innerText = entity_cube.getAttribute('texture')
            document.getElementById('object_name').innerText = entity_cube.id
            selected_object_id = entity_cube.id


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
        entity_cube.setAttribute('id', "cube" + scene_id)
        entity_cube.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_cube.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z })
        entity_cube.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd.rotation._y), z: THREE.Math.radToDeg(rotation_recd.rotation._z) });
        entity_cube.setAttribute('color', "red");
        // entity_cube.setAttribute('material', 'src', 'url(assets/images/author/author-2.jpg)')
        console.log("cube Properties::", entity_cube);

        var ul = document.getElementById(id + "_elements");
        var li = document.createElement("li");
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_cube.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Cube"));
        li.addEventListener('click', function (e) {
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object_id = "cube" + scene_id
            console.log("onlcick of", li.id)
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



}
function add_cube1(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {
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

function changeModel(modellink, id, scene_id, position_recd, scaling_recd, rotation_recd, source_recd) {

    console.log("inchange model", modellink)
    if (position_recd == "center") {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_gltf = document.createElement('a-entity');
        var data_arr = modellink.split('+&mbxr+');
        console.log(data_arr)
        entity_gltf.setAttribute('id', "model" + scene_id)
        entity_gltf.setAttribute('position', { x: data_arr[1], y: data_arr[2], z: data_arr[3] });
        entity_gltf.setAttribute('gltf-model', data_arr[0])
        entity_gltf.setAttribute('scale', { x: data_arr[4], y: data_arr[5], z: data_arr[6] })
        //add it to structure
        var ul = document.getElementById(id + "_elements");
        var li = document.createElement("li");
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_gltf.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Model"));
        li.addEventListener('click', function (e) {
            console.log("onlcick of")
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = modellink
            selected_object_id = "model" + scene_id
            console.log("onlcick of", li.id)
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
            console.log("clicked image", entity_gltf.object3D)
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

    } else {
        // var sceneEl = document.querySelector('a-scene');
        var sceneEl = document.getElementById(scene_id)
        var entity_gltf = document.createElement('a-entity');
        var data_arr = modellink.split('+&mbxr+');
        console.log(data_arr)
        entity_gltf.setAttribute('id', "model" + scene_id)
        entity_gltf.setAttribute('position', { x: position_recd.position.x, y: position_recd.position.y, z: position_recd.position.z });
        entity_gltf.setAttribute('gltf-model', data_arr[0])
        entity_gltf.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z })
        entity_gltf.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd.rotation._y), z: THREE.Math.radToDeg(rotation_recd.rotation._z) });
        //add it to structure
        var ul = document.getElementById(id + "_elements");
        var li = document.createElement("li");
        var newImage = document.createElement('img')
        newImage.src = "../../../app-assets//images/svg/Vector.png"
        li.setAttribute('id', "li-" + entity_gltf.id);
        li.appendChild(newImage)
        li.appendChild(document.createTextNode("Model"));
        li.addEventListener('click', function (e) {
            console.log("onlcick of")
            elements_id_saved = id;
            position_saved = position_recd
            rotation_saved = rotation_recd
            scaling_saved = scaling_recd
            source_saved = source_recd
            selected_object_id = "model" + scene_id
            console.log("onlcick of", li.id)
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
            console.log("clicked image", entity_gltf)
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

}
function changeModel1(modellink, id, scene_id) {
    console.log(modellink)
    // var sceneEl = document.querySelector('a-scene');
    var sceneEl = document.getElementById(scene_id)
    var entity_gltf = document.createElement('a-entity');
    var data_arr = modellink.split('+&mbxr+');
    console.log(data_arr)
    entity_gltf.setAttribute('id', "model" + scene_id)
    entity_gltf.setAttribute('position', { x: data_arr[1], y: data_arr[2], z: data_arr[3] });
    entity_gltf.setAttribute('gltf-model', data_arr[0])
    entity_gltf.setAttribute('scale', { x: data_arr[4], y: data_arr[5], z: data_arr[6] })

    // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
    console.log("Model Properties::", entity_gltf.object3D);

    sceneEl.appendChild(entity_gltf);
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
    if (value == "Image") {
        add_images(id, scene_id, send_position, send_rotation, send_scaling, send_source);
    }
    else if (value == "Model") {
        changeModel("https://www.rhibhus.com/AR_Trial/forest_river_environment/scene.gltf+&mbxr+0+&mbxr+0+&mbxr+-2+&mbxr+0.05+&mbxr+0.05+&mbxr+0.05", id, scene_id, send_position, send_scaling, send_rotation, send_source)
    } else if (value == "Video") {
        add_video(id, scene_id, send_position, send_rotation, send_scaling, send_source);

    } else if (value == "Text") {
        add_text(id, scene_id);
    }
    else if (value == "Cube") {
        add_cube(id, scene_id, send_position, send_rotation, send_scaling, send_source);
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
        counter = 1;
        console.log("counter now:;", counter)

    } else {
        if (counter == 2) {
            counter = counter - 2;
        }
        else {
            counter = counter - 1

        }
        console.log("counter", counter)
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
    var getscene = document.getElementById(id).getElementsByTagName('span')
    console.log("get scene span", getscene[0].innerText)
    visible_scene_id = getscene[0].innerText
    localStorage.setItem('showScenePreview', visible_scene_id);
    scene_deleted = getscene[0].innerText
    delete_scene_ul_id = id;
}

function showscene(value) {
    var find = document.getElementById(value);
    console.log("find li of scene", find.outerHTML)

    selected_Scene = find
    console.log(value)
    console.log(currentScene_View)
    document.getElementById(currentScene_View).setAttribute('visible', false)
    document.getElementById(value).setAttribute('visible', true)
    visible_scene_id = value
    localStorage.setItem('showScenePreview', visible_scene_id);
    currentScene_View = value
    scene_id = value


}

function shownewscene(value, element_id) {
    var find = document.getElementById(value);
    console.log("find li of scene", find.outerHTML)
    selected_Scene = find
    console.log("in shownewscene", value, element_id, currentScene_View)
    visible_scene_id = value
    localStorage.setItem('showScenePreview', visible_scene_id);
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
                                model = "https://www.rhibhus.com/AR_Trial/forest_river_environment/scene.gltf+&mbxr+0+&mbxr+0+&mbxr+-2+&mbxr+0.05+&mbxr+0.05+&mbxr+0.05"
                                var pass_id = dropdownname + "-" + newscene_name
                                changeModel1(model, pass_id, newscene_name)
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
            console.log(" elements:::", total)
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
                        var newelement = document.getElementById(new_elementsid_splice)
                        console.log("new element", elements[i].id, elements[i].id.slice(elements[i].id.lastIndexOf('-') + 1), newelement, newelement.object3D)
                        console.log("inforloop ", newelement.object3D.rotation);
                        console.log("el property", newelement.object3D)
                        console.log("el property", newelement.object3D.el.toString().includes("<a-image"))
                        console.log("SOURCE", $('#' + new_elementsid_splice).outerHTML, $('#' + new_elementsid_splice).attr('src'))
                        console.log("tagname", newelement.tagName)
                        scenedict.push(
                            {
                                "assetid": elements[i].id
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

                        dict.push({
                            "asset": scenedict
                        })

                        i++;
                        SceneElements(i);
                    }
                    else {
                        // console.log("dict", dict)
                        finaldict.push({
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
            console.log("scene 1", finaldict[0])

            $.post('/save_experience_data', {
                session_id: sessionStorage.getItem('session_id'), user_id: sessionStorage.getItem('user_id'),
                experience_id: sessionStorage.getItem('experience_id'),
                experience_data: JSON.stringify(finaldict),
            }, function (data) {
                console.log(data);
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
        experience_id: sessionStorage.getItem('experience_id')
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
                        document.getElementById('new_scenes_list').innerHTML = scene_present + '<ul id=' + ul_id + '  onclick="get_scene(this.id)" style="color: white;"> <li><div style="display: flex;flex-direction: row; justify-content: space-between;"><span id=' + newscene_name + ' class="scene" onclick="shownewscene(' + "'" + newscene_name + "', " + "'" + elements_tag + "'" + ')"><img src="../../../app-assets//images/svg/Vector (9).png" style="margin-right: 10px;">' + newscene_name + '</span><img onclick="delete_object()" class="" src="../../../app-assets//images/svg/delete.svg" alt="" height="12" width="12"></div>  <div style="display: flex;justify-content: space-between;padding-left: 40px;padding-top: 5px;padding-bottom: 3px;"><select name="cars" id=' + select_id + ' onchange="dropdownFunction(this.value,this.id)" style="background-color: #30419b;color: white;padding-right: 60px;"><option value="" disabled selected>Add Component</option><option value="Model">Model</option><option value="Video">Video</option><option value="Image">Image</option><option value="Cube">Cube</option> </select> </div><ul id=' + elements_tag + ' class="nested active"></ul></li></ul><br />'

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

                            if (asset_type_recd == "a-image") {

                                var pass_id = dropdownname + "-" + newscene_name
                                var position = scenes[i].scene[j].asset[3];
                                var rotation = scenes[i].scene[j].asset[4];
                                var scaling = scenes[i].scene[j].asset[5];
                                var source = scenes[i].scene[j].asset[1];
                                add_images(pass_id, newscene_name, position, rotation, scaling, source)
                            }
                            else if (asset_type_recd == "a-video") {
                                var pass_id = dropdownname + "-" + newscene_name
                                var position = scenes[i].scene[j].asset[3];
                                var rotation = scenes[i].scene[j].asset[4];
                                var scaling = scenes[i].scene[j].asset[5];
                                var source = scenes[i].scene[j].asset[1];
                                add_video(pass_id, newscene_name, position, rotation, scaling, source)
                            }
                            else if (asset_type_recd == "a-box") {
                                var pass_id = dropdownname + "-" + newscene_name
                                var position = scenes[i].scene[j].asset[3];
                                var rotation = scenes[i].scene[j].asset[4];
                                var scaling = scenes[i].scene[j].asset[5];
                                var source = scenes[i].scene[j].asset[1];
                                add_cube(pass_id, newscene_name, position, rotation, scaling, source)
                            }
                            else if (asset_type_recd == "a-entity") {
                                model = "https://www.rhibhus.com/AR_Trial/forest_river_environment/scene.gltf+&mbxr+0+&mbxr+0+&mbxr+-2+&mbxr+0.05+&mbxr+0.05+&mbxr+0.05"
                                var pass_id = dropdownname + "-" + newscene_name;
                                var position = scenes[i].scene[j].asset[3];
                                var rotation = scenes[i].scene[j].asset[4];
                                var scaling = scenes[i].scene[j].asset[5];
                                var source = scenes[i].scene[j].asset[1];
                                changeModel(model, pass_id, newscene_name, position, scaling, rotation, source)
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

function getExperienceData() {
    var myData = localStorage['showScenePreview'];
    console.log("hi")
    console.log("localstogare item", myData)
    $.post('/get_experience_details', {
        user_id: sessionStorage.getItem('user_id'),
        session_id: sessionStorage.getItem('session_id'),
        experience_id: sessionStorage.getItem('experience_id')
    }, function (data) {
        console.log("experience data", data[0]);
        var myData = localStorage['showScenePreview'];
        console.log("hi")
        console.log("localstogare item", myData)
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


                    if (newscene_name == myData) {
                        var newscene = document.getElementById("mainScene");
                        var latest = document.createElement("a-entity");
                        latest.id = newscene_name;
                        console.log("cHECKK:::", newscene_name, myData)
                        latest.setAttribute('visible', true)
                        currentScene_View = myData
                        newscene.appendChild(latest)
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
                                    model = "https://www.rhibhus.com/AR_Trial/forest_river_environment/scene.gltf+&mbxr+0+&mbxr+0+&mbxr+-2+&mbxr+0.05+&mbxr+0.05+&mbxr+0.05"
                                    var pass_id = dropdownname + "-" + newscene_name;
                                    var position = scenes[i].scene[j].asset[3];
                                    var rotation = scenes[i].scene[j].asset[4];
                                    var scaling = scenes[i].scene[j].asset[5];
                                    var source = scenes[i].scene[j].asset[1];
                                    changeModel1(model, pass_id, newscene_name, position, scaling, rotation, source)
                                }
                                j++
                                assets_loop(j)
                            }
                            else {
                                console.log("bye")
                            }

                        }
                        assets_loop(0)
                    }


                    i++;
                    ScenesLoop(i)
                }


            }
            ScenesLoop(0)
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
            console.log("after one sec", document.getElementById(myData).object3D)
            document.getElementById(myData).object3D.visible = true;


        }, 2000);

}
function hideElements() {
    console.log("next")


    console.log("find collapsible component", document.getElementsByClassName("collapsible component"))
    document.getElementById('toolbar').style.visibility = "hidden"
    document.getElementById('scenegraph').remove();
    document.getElementById('viewportBar').style.flexGrow = 0
    document.getElementById('viewportBar').style.margin = "80px 275px 0px 500px";
    document.getElementById('viewportBar').style.flexDirection = "row-reverse"
    // document.getElementById('viewportBar').style.position = "fixed"
    document.getElementById('rightPanel').style.margin = "140px 0px 0px 0px";
    console.log("rightpanel", document.getElementById('rightPanel').innerHTML)
    document.getElementById('rightPanel').style.zIndex = "-1"
    console.log("toggle", document.getElementsByClassName('toggle-edit')[0])
    document.getElementsByClassName('toggle-edit')[0].style.visibility = "hidden"
    document.getElementById('viewportHud').remove()
    //   document.getElementById('viewportBar').style.marginTop = "70px";



}

function redirectfolder() {
    window.location = sessionStorage.getItem('connection_url') + 'display_folder?session_id=' + sessionStorage.getItem('session_id')
}
function redirectAnalytics() {
    window.location = sessionStorage.getItem('connection_url') + 'display_analytics?session_id=' + sessionStorage.getItem('session_id')
}
function redirectFolderPage() {
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

function ontoggleclick() {
    console.log("cehckpoint:;", document.getElementById('populate').style)
    document.getElementById('populate').innerHTML = '<div style="padding-bottom:50px" id="properties_value"><div style="display: flex;flex-direction: row"><button onclick="close_rightpanel()">x</button><p style="text-align:center;flex:auto">properties<p></div><p>' + "image_added" + scene_id + '</p><hr style="background-color: #5361AA;"><div class="row"><div class="col-md-2"></div><div class="col-md-8 mt-4 mb-4"  style="background-color: #FFFFFF;display: flex;align-items: center;justify-content: center;height: 180px;"><button onclick="onpropertiespreviewbutton()"class="btn" style="border: 1px solid black; line-height: 15px;">Preview</button></div><div class="col-md-12"><button>assign asset</button><br><input type="text" id="fname" name="fname" style="background-color: aliceblue;"></div> </div> <hr style="background-color: #5361AA;"><div class="row d-flex justify-content-center"></div><br /> </div>'
}
function cutelement() {
    console.log("cut elemnts", selected_object_id, cut_element)
}
function closetab() {
    // document.getElementById('rightuploadPanel').style.maxHeight = "0%"
}
function getfolderpage() {
    window.location = "http://127.0.0.1:3000/folderpage"
}
function getrulespage() {
    window.location = "http://127.0.0.1:3000/Rulespage"
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
    // else
    //     if (findcutelement.tagName.toLowerCase() == "a-video") {
    //         var position = findcutelement.object3D.position
    //         var rotation = findcutelement.object3D.rotation
    //         var scaling = findcutelement.object3D.scale
    //         var pass_id = idString
    //         console.log("id", pass_id, rotation, document.getElementById(selected_object_id))
    //         var source = $(findcutelement).attr('src')
    //         console.log("source", source)
    //         add_videocut(pass_id, currentScene_View, position, rotation, scaling, source)
    //     }
    //     else
    //         if (findcutelement.tagName.toLowerCase() == "a-cube") {
    //             var position = findcutelement.object3D.position
    //             var rotation = findcutelement.object3D.rotation
    //             var scaling = findcutelement.object3D.scale
    //             var pass_id = idString
    //             console.log("id", pass_id, rotation, document.getElementById(selected_object_id))
    //             var source = $(findcutelement).attr('src')
    //             console.log("source", source)
    //             add_cubecut(pass_id, currentScene_View, position, rotation, scaling, source)
    //         }
            


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
    var newImage = document.createElement('img')
    newImage.src = "../../../app-assets//images/svg/Vector.png"
    li.setAttribute('id', "li-" + entity_img.id);
    li.appendChild(newImage)
    li.appendChild(document.createTextNode("Image"));
    li.addEventListener('click', function (e) {
        elements_id_saved = id;
        position_saved = position_recd
        rotation_saved = rotation_recd
        scaling_saved = scaling_recd
        source_saved = source_recd
        cut_element = li.id;
        selected_object_id = "image_added" + scene_id
        console.log("onlcick of", li.id)
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
// function add_videocut(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {

//     console.log("in else", source_recd.asset_src)
//     // var sceneEl = document.querySelector('a-scene');
//     var sceneEl = document.getElementById(scene_id)
//     var entity_video = document.createElement('a-video');
//     entity_video.setAttribute('id', "video_added" + scene_id)
//     entity_video.setAttribute('position', { x: position_recd.x, y: position_recd.y, z: position_recd.z });
//     entity_video.setAttribute('scale', { x: scaling_recd.x, y: scaling_recd.y, z: scaling_recd.z });
//     entity_video.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd._x), y: THREE.Math.radToDeg(rotation_recd._y), z: THREE.Math.radToDeg(rotation_recd._z) });
//     entity_video.setAttribute('src', source_recd)
//     // entity_video.setAttribute('width', 8)
//     // entity_video.setAttribute('height', 5)
//     // entity_gltf.setAttribute('rotation',{x:180 , y:90 ,z:180})
//     console.log("VIdeo Properties::", entity_video);
//     //add it to structure
//     var ul = document.getElementById(id + "_elements");
//     console.log("checking", ul, id)
//     var li = document.createElement("li");
//     var newImage = document.createElement('img')
//     newImage.src = "../../../app-assets//images/svg/Vector.png"
//     li.setAttribute('id', "li-" + entity_video.id);
//     li.appendChild(newImage)
//     li.appendChild(document.createTextNode("Video"));
//     li.addEventListener('click', function (e) {
//         elements_id_saved = id;
//         position_saved = position_recd
//         rotation_saved = rotation_recd
//         scaling_saved = scaling_recd
//         source_saved = source_recd
//         cut_element = li.id;
//         selected_object_id = "video_added" + scene_id
//         console.log("onlcick of", li.id)
//         var findobject = document.getElementById(selected_object_id)
//         console.log("found,", findobject.object3D)
//         selected_object = findobject.object3D
//         console.log("selected obj", selected_object)
//         // cloneasset()
//     });

//     ul.appendChild(li);
//     //onclick
//     entity_video.addEventListener('click', function (evt) {
//         document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
//         selected_object_id = "video_added" + scene_id
//         document.getElementById('rightPanel').style.maxWidth = "286px"
//         console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
//         document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
//         document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
//         document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
//         document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
//         document.getElementById('componentEntityHeader').style.marginBottom = "50px"
//         console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
//         document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
//         document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
//         var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

//         var findpropertiesdiv = document.getElementById('properties_value')
//         if (findpropertiesdiv) {
//             console.log("found propernskjdfnkjdsn")
//         }
//         else {
//             console.log(" NOT found propernskjdfnkjdsn")
//         }

//         console.log("sidebar:::::::::", getside)

//         var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
//         document.getElementById('addComponentContainer').remove()
//         var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

//         for (let i = 1; i <= getsidebar.length; i++) {
//             getsidebar[i].innerHTML = "";
//         }

//         console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
//         document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
//         // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
//         // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
//         console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
//         var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

//         console.log("sidebar:::::::::", getside)


//         var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



//         document.getElementById('addComponentContainer').style.visibility = "hidden"
//         elements_id_saved = id;
//         position_saved = position_recd
//         rotation_saved = rotation_recd
//         scaling_saved = scaling_recd
//         source_saved = source_recd
//         selected_object = entity_video.object3D
//         console.log("clicked image", entity_video)
//         document.getElementById('object_name').innerText = entity_video.id
//         selected_object_id = entity_video.id
//         var inputX = document.getElementById("translateX");
//         inputX.setAttribute('value', entity_video.object3D.position.x)
//         var inputY = document.getElementById("translateY");
//         inputY.setAttribute('value', entity_video.object3D.position.y)
//         var inputZ = document.getElementById("translateZ");
//         inputZ.setAttribute('value', entity_video.object3D.position.z)
//         var inputX = document.getElementById("rotateX");
//         inputX.setAttribute('value', entity_video.object3D.rotation.x)
//         var inputY = document.getElementById("rotateY");
//         inputY.setAttribute('value', entity_video.object3D.rotation.y)
//         var inputZ = document.getElementById("rotateZ");
//         inputZ.setAttribute('value', entity_video.object3D.rotation.z)
//         var inputX = document.getElementById("scaleX");
//         inputX.setAttribute('value', entity_video.object3D.scale.x)
//         var inputY = document.getElementById("scaleY");
//         inputY.setAttribute('value', entity_video.object3D.scale.y)
//         var inputZ = document.getElementById("scaleZ");
//         inputZ.setAttribute('value', entity_video.object3D.scale.z)
//         // openProperties();
//         // console.log(document.getElementsByClassName("map_value string")[0].defaultValue)

//         // entity_video.setAttribute('src', document.getElementsByClassName("map_value string")[0].defaultValue)
//     });
//     sceneEl.appendChild(entity_video);




// }
// function add_cubecut(id, scene_id, position_recd, rotation_recd, scaling_recd, source_recd) {
//     // var sceneEl = document.querySelector('a-scene');
//     console.log("poSITION", position_recd)
//     var sceneEl = document.getElementById(scene_id)
//     var entity_cube = document.createElement('a-box');
//     // entity_cube.className="draggable"
//     entity_cube.setAttribute('id', "cube" + scene_id)
//     entity_cube.setAttribute('position', { x: position_recd.x, y: position_recd.y, z: position_recd.z });
//     entity_cube.setAttribute('scale', { x: scaling_recd.scale.x, y: scaling_recd.scale.y, z: scaling_recd.scale.z })
//     entity_cube.setAttribute('rotation', { x: THREE.Math.radToDeg(rotation_recd.rotation._x), y: THREE.Math.radToDeg(rotation_recd._y), z: THREE.Math.radToDeg(rotation_recd._z) });
//     entity_cube.setAttribute('color', "red");
//     // entity_cube.setAttribute('material', 'src', 'url(assets/images/author/author-2.jpg)')
//     console.log("cube Properties::", entity_cube);

//     var ul = document.getElementById(id + "_elements");
//     var li = document.createElement("li");
//     var newImage = document.createElement('img')
//     newImage.src = "../../../app-assets//images/svg/Vector.png"
//     li.setAttribute('id', "li-" + entity_cube.id);
//     li.appendChild(newImage)
//     li.appendChild(document.createTextNode("Cube"));
//     li.addEventListener('click', function (e) {
//         elements_id_saved = id;
//         position_saved = position_recd
//         rotation_saved = rotation_recd
//         scaling_saved = scaling_recd
//         source_saved = source_recd
//         selected_object_id = "cube" + scene_id
//         console.log("onlcick of", li.id)
//         var findobject = document.getElementById(selected_object_id)
//         console.log("found,", findobject.object3D)
//         selected_object = findobject.object3D
//         console.log("selected obj", selected_object)
//         // cloneasset()
//     });

//     ul.appendChild(li);
//     //onclick
//     entity_cube.addEventListener('click', function (evt) {
//         selected_object_id = "cube" + scene_id
//         document.getElementById('rightPanel').style.maxWidth = "286px"
//         console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
//         document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
//         document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
//         document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
//         document.getElementById('sidebar').getElementsByClassName('components')[0].style.backgroundColor = "#283046"
//         document.getElementById('componentEntityHeader').style.marginBottom = "50px"
//         console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
//         document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.backgroundColor = "#283046"
//         document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].style.borderBottom = "#283046"
//         var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

//         var findpropertiesdiv = document.getElementById('properties_value')
//         if (findpropertiesdiv) {
//             console.log("found propernskjdfnkjdsn")
//         }
//         else {
//             console.log(" NOT found propernskjdfnkjdsn")
//         }

//         console.log("sidebar:::::::::", getside)

//         var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"
//         document.getElementById('addComponentContainer').remove()
//         var getsidebar = document.getElementById('sidebar').getElementsByClassName('collapsible component')

//         for (let i = 1; i <= getsidebar.length; i++) {
//             getsidebar[i].innerHTML = "";
//         }

//         console.log("rightpanel", document.getElementById('rightPanel').getElementsByClassName('content'));
//         document.getElementById('rightPanel').getElementsByClassName('content')[0].style.margin = "0px";
//         // document.getElementById('rightPanel').getElementsByClassName('content')[1].style.margin = "0px";
//         // document.getElementById('rightPanel').getElementsByClassName('content')[2].style.margin = "0px";
//         console.log("console to check::::::", document.getElementById('sidebar').getElementsByClassName('components'));
//         var getside = document.getElementById('componentEntityHeader').getElementsByClassName('static')[0].innerHTML

//         console.log("sidebar:::::::::", getside)


//         var getside = document.getElementById('componentEntityHeader').getElementsByClassName('content')[0].style.marginTop = "10px"



//         document.getElementById('addComponentContainer').style.visibility = "hidden"

//         selected_object = entity_cube.object3D
//         elements_id_saved = id;
//         position_saved = position_recd
//         rotation_saved = rotation_recd
//         scaling_saved = scaling_recd
//         source_saved = source_recd
//         console.log("next line")
//         console.log("find collapsible component", document.getElementsByClassName("collapsible-component"))
//         document.getElementById('addComponentContainer').style.visibility = "hidden"
//         console.log("clicked cube", entity_cube.object3D)
//         console.log("color::", entity_cube.getAttribute('color'))
//         // console.log("texture::", entity_cube.getAttribute('texture'))
//         document.getElementById('object_name').innerText = entity_cube.id
//         selected_object_id = entity_cube.id
//         // document.getElementById('texture_display').innerText = entity_cube.getAttribute('texture')

//         document.getElementById("obj_color").style.backgroundColor = entity_cube.getAttribute('color')
//         var inputX = document.getElementById("translateX");
//         inputX.setAttribute('value', entity_cube.object3D.position.x)
//         var inputY = document.getElementById("translateY");
//         inputY.setAttribute('value', entity_cube.object3D.position.y)
//         var inputZ = document.getElementById("translateZ");
//         inputZ.setAttribute('value', entity_cube.object3D.position.z)
//         var inputX = document.getElementById("rotateX");
//         inputX.setAttribute('value', entity_cube.object3D.rotation.x)
//         var inputY = document.getElementById("rotateY");
//         inputY.setAttribute('value', entity_cube.object3D.rotation.y)
//         var inputZ = document.getElementById("rotateZ");
//         inputZ.setAttribute('value', entity_cube.object3D.rotation.z)
//         var inputX = document.getElementById("scaleX");
//         inputX.setAttribute('value', entity_cube.object3D.scale.x)
//         var inputY = document.getElementById("scaleY");
//         inputY.setAttribute('value', entity_cube.object3D.scale.y)
//         var inputZ = document.getElementById("scaleZ");
//         inputZ.setAttribute('value', entity_cube.object3D.scale.z)
//         // openProperties();
//         // console.log(document.getElementsByClassName("map_value string")[0].defaultValue)
//         // source_saved = document.getElementsByClassName("map_value string")[0].defaultValue
//         // entity_cube.setAttribute('material', 'src', document.getElementsByClassName("map_value string")[0].defaultValue)

//     });

//     sceneEl.appendChild(entity_cube);






// }





