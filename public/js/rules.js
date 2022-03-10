var rulesCounter = 1;
var recd_dropdownvalues = []
var scene_recd_id = ""
var counter_recd = 0;
var newrulesid = ""
var newcompName = ""
var neweventName = ""
var newthenCompName = ""
var newactionName = ""
var singlebehaviour = [];

function loadSceneDetails() {
   console.log("entered scene rule", window.localStorage.getItem('scene'), JSON.parse(window.localStorage.getItem('sceneData')))
   recd_dropdownvalues = JSON.parse(window.localStorage.getItem('sceneData'));
   scene_recd_id = window.localStorage.getItem('scene');
   counter_recd = window.localStorage.getItem('counter');
}
function addDropdownValues() {
   rulesCounter = rulesCounter + 1
   var getdropdown = document.getElementById(newcompName)
   var getseconddropdown = document.getElementById(newthenCompName)
   console.log("checknow", getdropdown, recd_dropdownvalues)

   getdropdown.options.length = 0; // clear out existing items
   getseconddropdown.options.length = 0;
   getdropdown.options.add(new Option(scene_recd_id, scene_recd_id))
   //adding scene to then behaviour
   for (let j = 1; j <= counter; j++) {
      getseconddropdown.options.add(new Option("scene" + j, "scene" + j))
   }
   //adding component list to dropdown options
   for (var i = 0; i < recd_dropdownvalues.length; i++) {
      var d = recd_dropdownvalues[i].asset[1].asset_type;
      var value_recd = recd_dropdownvalues[i].asset[0].assetid;

      if (d == 'a-image') {
         getdropdown.options.add(new Option("image", value_recd))
         getseconddropdown.options.add(new Option("image", value_recd))
      } else
         if (d == 'a-box') {
            getdropdown.options.add(new Option("cube", value_recd))
            getseconddropdown.options.add(new Option("cube", value_recd))
         }
         else
            if (d == 'a-video') {
               getdropdown.options.add(new Option("video", value_recd))
               getseconddropdown.options.add(new Option("video", value_recd))
            }
            else
               if (d == 'a-torus') {
                  getdropdown.options.add(new Option("torus", value_recd))
                  getseconddropdown.options.add(new Option("torus", value_recd))
               }
               else
                  if (d == 'a-light') {
                     getdropdown.options.add(new Option("light", value_recd))
                     getseconddropdown.options.add(new Option("light", value_recd))
                  }
                  else
                     if (d == 'a-sound') {
                        getdropdown.options.add(new Option("sound", value_recd))
                        getseconddropdown.options.add(new Option("sound", value_recd))
                     }
                     else
                        if (d == 'a-entity') {
                           getdropdown.options.add(new Option("model", value_recd))
                           getseconddropdown.options.add(new Option("model", value_recd))
                        }
                        else
                           if (d == 'a-text') {
                              getdropdown.options.add(new Option("text", value_recd))
                              getseconddropdown.options.add(new Option("text", value_recd))
                           }


   }

   //when a component is selected in "when" behaviour
   $('#' + newcompName).on('change', function () {
      var newString = $('#' + newcompName).val().toString()
      console.log(newString.includes("image"));
      if (newString.includes("image")) {
         document.getElementById(neweventName).options.length = 0;
         $('#' + neweventName).append('<option value="is clicked">is clicked</option>');
         $('#' + neweventName).append('<option value="is hovered">is hovered</option>');


      } else
         if (newString.includes("video")) {
            document.getElementById(neweventName).options.length = 0;
            $('#' + neweventName).append('<option value="is clicked">is clicked</option>');
            $('#' + neweventName).append('<option value="is hovered">is hovered</option>');
            $('#' + neweventName).append('<option value="ends">ends</option>');

         }
         else
            if (newString.includes("text")) {
               document.getElementById(neweventName).options.length = 0;
               $('#' + neweventName).append('<option value="is clicked">is clicked</option>');
               $('#' + neweventName).append('<option value="is hovered">is hovered</option>');


            }
            else
               if (newString.includes("model")) {
                  document.getElementById(neweventName).options.length = 0;
                  $('#' + neweventName).append('<option value="is clicked">is clicked</option>');
                  $('#' + neweventName).append('<option value="is hovered">is hovered</option>');
               }
               else
                  if (newString.includes("cube")) {
                     document.getElementById(neweventName).options.length = 0;
                     $('#' + neweventName).append('<option value="is clicked">is clicked</option>');
                     $('#' + neweventName).append('<option value="is hovered">is hovered</option>');
                  }
                  else
                     if (newString.includes("sound")) {
                        document.getElementById(neweventName).options.length = 0;
                        $('#' + neweventName).append('<option value="ends">ends</option>');
                     }
                     else
                        if (newString.includes("torus")) {
                           document.getElementById(neweventName).options.length = 0;
                           $('#' + neweventName).append('<option value="is clicked">is clicked</option>');
                           $('#' + neweventName).append('<option value="is hovered">is hovered</option>');
                        }
                        else
                           if (newString.includes("light")) {
                              document.getElementById(neweventName).options.length = 0;
                              $('#' + neweventName).append('<option value="is clicked">is clicked</option>');
                              $('#' + neweventName).append('<option value="is hovered">is hovered</option>');
                           }
                           else {
                              document.getElementById(neweventName).options.length = 0;
                              $('#' + neweventName).append('<option value="loads">loads</option>');
                           }
   });

   //when component is selected in "then"
   $('#' + newthenCompName).on('change', function () {
      var newString = $('#' + newthenCompName).val().toString()
      console.log(newString.includes("image"));
      if (newString.includes("image")) {
         document.getElementById(newactionName).options.length = 0;
         $('#' + newactionName).append('<option value="appear">appear </option>');
         $('#' + newactionName).append('<option value="disappear">disappear</option>');
         $('#' + newactionName).append('<option value="toggle show/hide">toggle show/hide</option>');

      } else
         if (newString.includes("video")) {
            document.getElementById(newactionName).options.length = 0;
            $('#' + newactionName).append('<option value="appear">appear </option>');
            $('#' + newactionName).append('<option value="disappear">disappear</option>');
            $('#' + newactionName).append('<option value="toggle show/hide">toggle show/hide</option>');
            $('#' + newactionName).append('<option value="play/resume">play/resume</option>');
            $('#' + newactionName).append('<option value="pause">pause</option>');
            $('#' + newactionName).append('<option value="mute">mute</option>');
            $('#' + newactionName).append('<option value="unmute">unmute</option>');

         }
         else
            if (newString.includes("text")) {
               document.getElementById(newactionName).options.length = 0;
               $('#' + newactionName).append('<option value="appear">appear </option>');
               $('#' + newactionName).append('<option value="disappear">disappear</option>');
               $('#' + newactionName).append('<option value="toggle show/hide">toggle show/hide</option>');



            }
            else
               if (newString.includes("model")) {
                  document.getElementById(newactionName).options.length = 0;
                  $('#' + newactionName).append('<option value="appear">appear </option>');
                  $('#' + newactionName).append('<option value="disappear">disappear</option>');
                  $('#' + newactionName).append('<option value="toggle show/hide">toggle show/hide</option>');
                  // $('#' + newactionName).append('<option value="start animation ">start animation </option>');
                  // $('#' + newactionName).append('<option value="stop animation">stop animation</option>');



               }
               else
                  if (newString.includes("cube")) {
                     document.getElementById(newactionName).options.length = 0;
                     $('#' + newactionName).append('<option value="appear">appear </option>');
                     $('#' + newactionName).append('<option value="disappear">disappear</option>');
                     $('#' + newactionName).append('<option value="toggle show/hide">toggle show/hide</option>');
                  }
                  else
                     if (newString.includes("torus")) {
                        document.getElementById(newactionName).options.length = 0;
                        $('#' + newactionName).append('<option value="appear">appear </option>');
                        $('#' + newactionName).append('<option value="disappear">disappear</option>');
                        $('#' + newactionName).append('<option value="toggle show/hide">toggle show/hide</option>');
                     }
                     else
                        if (newString.includes("sound")) {
                           document.getElementById(newactionName).options.length = 0;
                           $('#' + newactionName).append('<option value="play/resume">play/resume</option>');
                           $('#' + newactionName).append('<option value="pause">pause</option>');
                           $('#' + newactionName).append('<option value="mute">mute</option>');
                           $('#' + newactionName).append('<option value="unmute">unmute</option>');
                        }
                        else
                           if (newString.includes("light")) {
                              document.getElementById(newactionName).options.length = 0;
                              $('#' + newactionName).append('<option value="appear">appear </option>');
                              $('#' + newactionName).append('<option value="disappear">disappear</option>');
                              $('#' + newactionName).append('<option value="toggle show/hide">toggle show/hide</option>');
                           }
                           else {
                              document.getElementById(newactionName).options.length = 0;
                              $('#' + newactionName).append('<option value="appear">appear </option>');
                           }
   });

}

function SaveRulesData() {
   var sct = '';
   for (let i = 1; i < rulesCounter; i++) {

      newcompName = "component_itemname" + i
      neweventName = "event_itemname" + i
      newthenCompName = "then_comp_itemname" + i
      newactionName = "action_itemname" + i
      var newComponent1 = $('#' + newcompName).val()
      var newEvent1 = $('#' + neweventName).val()
      var newComponent2 = $('#' + newthenCompName).val()
      var newEvent2 = $('#' + newactionName).val()

      if (newEvent1 == "is clicked") {
         if (newEvent2 == "appear") {

            console.log(newComponent2.includes("scene"));
            if (newComponent2.includes("scene")) {
               console.log("SCENEEEEEE", scene_recd_id)
               sct = sct + ' document.getElementById("' + newComponent1 + '").addEventListener("click", function() { console.log(' + scene_recd_id + '); document.getElementById("' + scene_recd_id + '").setAttribute("visible",false); document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';

            }
            else if (newComponent2.includes("video")) {

            }
            else {
               sct = sct + 'document.getElementById("' + newComponent2 + '").setAttribute("visible",false); document.getElementById("' + newComponent1 + '").addEventListener("click", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';


            }

         }
         else if (newEvent2 == "disappear") {
            sct = sct + 'document.getElementById("' + newComponent2 + '").setAttribute("visible",true); document.getElementById("' + newComponent1 + '").addEventListener("click", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",false) });';

         }
         else if (newEvent2 == "toggle show/hide") {
            sct = sct + ' document.getElementById("' + newComponent1 + '").addEventListener("click", function() { if(document.getElementById("' + newComponent2 + '").getAttribute("visible")){document.getElementById("' + newComponent2 + '").setAttribute("visible",false)}else{document.getElementById("' + newComponent2 + '").setAttribute("visible",true)} });';

         }
         else if (newEvent2 == "play/resume") {
            sct = sct + 'document.querySelector("#' + newComponent2 + '").currentTime = 0;document.querySelector("#' + newComponent2 + '").pause(); document.getElementById("' + newComponent1 + '").addEventListener("click", function() { document.querySelector("#' + newComponent2 + '").play() });';

         }
         else if (newEvent2 == "pause") {
            sct = sct + 'document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("click", function() { document.querySelector("#' + newComponent2 + '").pause() });';

         }
         else if (newEvent2 == "mute") {
            if (newComponent2.includes("sound")) {
               sct = sct + '  document.getElementById("' + newComponent1 + '").addEventListener("click", function() { var entity = document.querySelector("[sound]");entity.components.sound.stopSound(); });';

            }
            else {
               sct = sct + ' document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("click", function() {$("video").prop("muted", true);   });';

            }

         }
         else if (newEvent2 == "unmute") {
            if (newComponent2.includes("sound")) {
               sct = sct + 'var entity = document.querySelector("[sound]");entity.components.sound.pauseSound();  document.getElementById("' + newComponent1 + '").addEventListener("click", function() { var entity = document.querySelector("[sound]");entity.components.sound.playSound(); });';

            }
            else {
               sct = sct + '$("video").prop("muted", true); document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("click", function() { $("video").prop("muted", false);  });';

            }
         }

      }
      else if (newEvent1 == "is hovered") {
         if (newEvent2 == "appear") {
            if (newComponent2.includes("scene")) {
               console.log("SCENEEEEEE", scene_recd_id)
               sct = sct + ' document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { console.log(' + scene_recd_id + '); document.getElementById("' + scene_recd_id + '").setAttribute("visible",false); document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';

            }
            else {
               sct = sct + 'document.getElementById("' + newComponent2 + '").setAttribute("visible",false); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';

            }
         }
         else if (newEvent2 == "disappear") {
            sct = sct + 'document.getElementById("' + newComponent2 + '").setAttribute("visible",true); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",false) });';

         }
         else if (newEvent2 == "toggle show/hide") {
            sct = sct + ' document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { if(document.getElementById("' + newComponent2 + '").getAttribute("visible")){document.getElementById("' + newComponent2 + '").setAttribute("visible",false)}else{document.getElementById("' + newComponent2 + '").setAttribute("visible",true)} });';

         }
         else if (newEvent2 == "play/resume") {
            sct = sct + 'document.querySelector("#' + newComponent2 + '").currentTime = 0;document.querySelector("#' + newComponent2 + '").pause(); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { document.querySelector("#' + newComponent2 + '").play() });';

         }
         else if (newEvent2 == "pause") {
            sct = sct + 'document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { document.querySelector("#' + newComponent2 + '").pause() });';

         }
         else if (newEvent2 == "mute") {
            if (newComponent2.includes("sound")) {
               sct = sct + '  document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { var entity = document.querySelector("[sound]");entity.components.sound.stopSound(); });';

            }
            else {
               sct = sct + ' document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() {$("video").prop("muted", true);   });';

            }
         }
         else if (newEvent2 == "unmute") {
            if (newComponent2.includes("sound")) {
               sct = sct + 'var entity = document.querySelector("[sound]");entity.components.sound.pauseSound();  document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { var entity = document.querySelector("[sound]");entity.components.sound.playSound(); });';

            }
            else {
               sct = sct + '$("video").prop("muted", true); document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { $("video").prop("muted", false);  });';

            }
         }


      }
      else if (newEvent1 == "loads") {
         if (newEvent2 == "appear") {
            if (newComponent2.includes("scene")) {
               console.log("SCENEEEEEE", scene_recd_id)
               sct = sct + ' document.getElementById("' + newComponent1 + '").addEventListener("loaded", function() { console.log(' + scene_recd_id + '); document.getElementById("' + scene_recd_id + '").setAttribute("visible",false); document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';

            }
            else {
               sct = sct + 'document.getElementById("' + newComponent2 + '").setAttribute("visible",false); document.getElementById("' + newComponent1 + '").addEventListener("loaded", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';

            }
         }
         else if (newEvent2 == "disappear") {
            sct = sct + 'document.getElementById("' + newComponent2 + '").setAttribute("visible",true); document.getElementById("' + newComponent1 + '").addEventListener("load", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",false) });';

         }
         else if (newEvent2 == "toggle show/hide") {
            sct = sct + ' document.getElementById("' + newComponent1 + '").addEventListener("load", function() { if(document.getElementById("' + newComponent2 + '").getAttribute("visible")){document.getElementById("' + newComponent2 + '").setAttribute("visible",false)}else{document.getElementById("' + newComponent2 + '").setAttribute("visible",true)} });';

         }
         else if (newEvent2 == "play/resume") {
            sct = sct + 'document.querySelector("#' + newComponent2 + '").currentTime = 0;document.querySelector("#' + newComponent2 + '").pause(); document.getElementById("' + newComponent1 + '").addEventListener("loads", function() { document.querySelector("#' + newComponent2 + '").play() });';

         }
         else if (newEvent2 == "pause") {
            sct = sct + 'document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("loads", function() { document.querySelector("#' + newComponent2 + '").pause() });';

         }
         else if (newEvent2 == "mute") {
            if (newComponent2.includes("sound")) {
               sct = sct + '  document.getElementById("' + newComponent1 + '").addEventListener("loads", function() { var entity = document.querySelector("[sound]");entity.components.sound.stopSound(); });';

            }
            else {
               sct = sct + ' document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("loads", function() {$("video").prop("muted", true);   });';

            }
         }
         else if (newEvent2 == "unmute") {
            if (newComponent2.includes("sound")) {
               sct = sct + 'var entity = document.querySelector("[sound]");entity.components.sound.pauseSound();  document.getElementById("' + newComponent1 + '").addEventListener("loads", function() { var entity = document.querySelector("[sound]");entity.components.sound.playSound(); });';

            }
            else {
               sct = sct + '$("video").prop("muted", true); document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("loads", function() { $("video").prop("muted", false);  });';

            }
         }


      }
      else if (newEvent1 == "ends") {
         if (newEvent2 == "appear") {
            if (newComponent2.includes("scene")) {
               console.log("SCENEEEEEE", scene_recd_id)
               sct = sct + ' document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { console.log(' + scene_recd_id + '); document.getElementById("' + scene_recd_id + '").setAttribute("visible",false); document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';

            }
            else {
               sct = sct + 'document.getElementById("' + newComponent2 + '").setAttribute("visible",false); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';

            }
         }
         else if (newEvent2 == "disappear") {
            sct = sct + 'document.getElementById("' + newComponent2 + '").setAttribute("visible",true); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",false) });';

         }
         else if (newEvent2 == "toggle show/hide") {
            sct = sct + ' document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { if(document.getElementById("' + newComponent2 + '").getAttribute("visible")){document.getElementById("' + newComponent2 + '").setAttribute("visible",false)}else{document.getElementById("' + newComponent2 + '").setAttribute("visible",true)} });';

         }
         else if (newEvent2 == "play/resume") {
            sct = sct + 'document.querySelector("#' + newComponent2 + '").currentTime = 0;document.querySelector("#' + newComponent2 + '").pause(); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { document.querySelector("#' + newComponent2 + '").play() });';

         }
         else if (newEvent2 == "pause") {
            sct = sct + 'document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { document.querySelector("#' + newComponent2 + '").pause() });';

         }
         else if (newEvent2 == "mute") {
            if (newComponent2.includes("sound")) {
               sct = sct + '  document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { var entity = document.querySelector("[sound]");entity.components.sound.stopSound(); });';

            }
            else {
               sct = sct + ' document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() {$("video").prop("muted", true);   });';
               sessionStorage.setItem('sct', sct);
            }
         }
         else if (newEvent2 == "unmute") {
            if (newComponent2.includes("sound")) {
               sct = sct + 'var entity = document.querySelector("[sound]");entity.components.sound.pauseSound();  document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { var entity = document.querySelector("[sound]");entity.components.sound.playSound(); });';

            }
            else {
               sct = sct + '$("video").prop("muted", true); document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { $("video").prop("muted", false);  });';
               sessionStorage.setItem('sct', sct);
            }
         }


      }


   }
   sessionStorage.setItem('sct', sct);
   console.log("final scprit", sct)
}

function addBehaviour() {
   var newComponent1 = $('#' + newcompName).val()
   var newEvent1 = $('#' + neweventName).val()
   var newComponent2 = $('#' + newthenCompName).val()
   var newEvent2 = $('#' + newactionName).val()

   if (newEvent1 == "is clicked") {
      if (newEvent2 == "appear") {
         if (newComponent2.includes("scene")) {
            if (sessionStorage.getItem('sct') !== undefined && sessionStorage.getItem('sct') !== 'undefined') {
               var sct = sessionStorage.getItem('sct') + 'document.getElementById("' + newComponent1 + '").addEventListener("click", function() { console.log(' + scene_recd_id + '); document.getElementById("' + scene_recd_id + '").setAttribute("visible",false); document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';
               sessionStorage.setItem('sct', sct);
               console.log(sct)
            }
            else {
               var sct = 'document.getElementById("' + newComponent1 + '").addEventListener("click", function() { console.log(' + scene_recd_id + '); document.getElementById("' + scene_recd_id + '").setAttribute("visible",false); document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';
               sessionStorage.setItem('sct', sct);
               console.log(sct)
            }

         }
         else if (newComponent2.includes("video")) {
            var searchcomp = newComponent2 + "a-video"
            var sct = 'document.getElementById("' + searchcomp + '").setAttribute("visible",false);document.querySelector("#' + newComponent2 + '").muted=true; document.getElementById("' + newComponent1 + '").addEventListener("click", function() { document.getElementById("' + searchcomp + '").setAttribute("visible",true);document.querySelector("#' + newComponent2 + '").muted=false; });';
            sessionStorage.setItem('sct', sct);
         }
         else {
            var sct = 'document.getElementById("' + newComponent2 + '").setAttribute("visible",false); document.getElementById("' + newComponent1 + '").addEventListener("click", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';
            sessionStorage.setItem('sct', sct);

         }

      }
      else if (newEvent2 == "disappear") {
         if (newComponent2.includes("video")) {
            var searchcomp = newComponent2 + "a-video"
            var sct = 'document.getElementById("' + searchcomp + '").setAttribute("visible",true); document.getElementById("' + newComponent1 + '").addEventListener("click", function() { document.getElementById("' + searchcomp + '").setAttribute("visible",false);document.querySelector("#' + newComponent2 + '").muted=true; });';
            sessionStorage.setItem('sct', sct);
         }
         else {
            var sct = 'document.getElementById("' + newComponent2 + '").setAttribute("visible",true); document.getElementById("' + newComponent1 + '").addEventListener("click", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",false) });';
            sessionStorage.setItem('sct', sct);

         }

      }
      else if (newEvent2 == "toggle show/hide") {
         var sct = ' document.getElementById("' + newComponent1 + '").addEventListener("click", function() { if(document.getElementById("' + newComponent2 + '").getAttribute("visible")){document.getElementById("' + newComponent2 + '").setAttribute("visible",false)}else{document.getElementById("' + newComponent2 + '").setAttribute("visible",true)} });';
         sessionStorage.setItem('sct', sct);
      }
      else if (newEvent2 == "play/resume") {
         var sct = 'document.querySelector("#' + newComponent2 + '").currentTime = 0;document.querySelector("#' + newComponent2 + '").pause(); document.getElementById("' + newComponent1 + '").addEventListener("click", function() { document.querySelector("#' + newComponent2 + '").play() });';
         sessionStorage.setItem('sct', sct);
      }
      else if (newEvent2 == "pause") {
         var sct = 'document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("click", function() { document.querySelector("#' + newComponent2 + '").pause() });';
         sessionStorage.setItem('sct', sct);
      }
      else if (newEvent2 == "mute") {
         if (newComponent2.includes("sound")) {
            var sct = 'document.getElementById("'+newComponent1+'").addEventListener("click", function() { var entity = document.querySelector("[sound]");entity.components.sound.stopSound(); });';
            sessionStorage.setItem('sct', sct);
            // var sct = '  document.getElementById("' + newComponent1 + '").addEventListener("click", function() { alert("sound check");document.querySelector("' + newComponent2 + '").components.sound.stopSound() });';
            // sessionStorage.setItem('sct', sct);



         }
         else {

            var sct = 'document.querySelector("#' + newComponent2 + '").muted=false; document.getElementById("' + newComponent1 + '").addEventListener("click", function() { document.querySelector("#' + newComponent2 + '").muted=true });';
            sessionStorage.setItem('sct', sct);
         }

      }
      else if (newEvent2 == "unmute") {
         if (newComponent2.includes("sound")) {
            var sct = 'var entity = document.querySelector("[sound]");entity.components.sound.pauseSound();  document.getElementById("' + newComponent1 + '").addEventListener("click", function() { entity.components.sound.playSound(); });';
            sessionStorage.setItem('sct', sct);
         }
         else {

            var sct = 'document.querySelector("#' + newComponent2 + '").muted=true; document.getElementById("' + newComponent1 + '").addEventListener("click", function() { document.querySelector("#' + newComponent2 + '").muted=false });';
            sessionStorage.setItem('sct', sct);
         }
      }

   }
   else if (newEvent1 == "is hovered") {
      if (newEvent2 == "appear") {
         if (newComponent2.includes("scene")) {
            console.log("SCENEEEEEE", scene_recd_id)
            var sct = ' document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { console.log(' + scene_recd_id + '); document.getElementById("' + scene_recd_id + '").setAttribute("visible",false); document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';
            sessionStorage.setItem('sct', sct);
            console.log(sct)
         }
         else if (newComponent2.includes("video")) {
            var searchcomp = newComponent2 + "a-video"
            var sct = 'document.getElementById("' + searchcomp + '").setAttribute("visible",false);document.querySelector("#' + newComponent2 + '").muted=true; document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { document.getElementById("' + searchcomp + '").setAttribute("visible",true);document.querySelector("#' + newComponent2 + '").muted=false; }); });';
            sessionStorage.setItem('sct', sct);
         }

         else {
            var sct = 'document.getElementById("' + newComponent2 + '").setAttribute("visible",false); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';
            sessionStorage.setItem('sct', sct);
         }
      }
      else if (newEvent2 == "disappear") {
         if (newComponent2.includes("video")) {
            var searchcomp = newComponent2 + "a-video"
            var sct = 'document.getElementById("' + searchcomp + '").setAttribute("visible",true); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { document.getElementById("' + searchcomp + '").setAttribute("visible",false) });';
            sessionStorage.setItem('sct', sct);
         }
         else {
            var sct = 'document.getElementById("' + newComponent2 + '").setAttribute("visible",true); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",false) });';
            sessionStorage.setItem('sct', sct);
         }
      }
      else if (newEvent2 == "toggle show/hide") {
         var sct = ' document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { if(document.getElementById("' + newComponent2 + '").getAttribute("visible")){document.getElementById("' + newComponent2 + '").setAttribute("visible",false)}else{document.getElementById("' + newComponent2 + '").setAttribute("visible",true)} });';
         sessionStorage.setItem('sct', sct);
      }
      else if (newEvent2 == "play/resume") {
         var sct = 'document.querySelector("#' + newComponent2 + '").currentTime = 0;document.querySelector("#' + newComponent2 + '").pause(); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { document.querySelector("#' + newComponent2 + '").play() });';
         sessionStorage.setItem('sct', sct);
      }
      else if (newEvent2 == "pause") {
         var sct = 'document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { document.querySelector("#' + newComponent2 + '").pause() });';
         sessionStorage.setItem('sct', sct);
      }
      else if (newEvent2 == "mute") {
         if (newComponent2.includes("sound")) {
            var sct = '  document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { var entity = document.querySelector("[sound]");entity.components.sound.stopSound(); });';
            sessionStorage.setItem('sct', sct);
         }
         else {
            var sct = ' document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() {document.querySelector("#' + newComponent2 + '").muted=true });';
            sessionStorage.setItem('sct', sct);
         }
      }
      else if (newEvent2 == "unmute") {
         if (newComponent2.includes("sound")) {
            var sct = 'var entity = document.querySelector("[sound]");entity.components.sound.pauseSound();  document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { var entity = document.querySelector("[sound]");entity.components.sound.playSound(); });';
            sessionStorage.setItem('sct', sct);
         }
         else {
            var sct = '$("video").prop("muted", true); document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("mouseenter", function() { $("video").prop("muted", false);  });';
            sessionStorage.setItem('sct', sct);
         }
      }


   }
   else if (newEvent1 == "loads") {
      if (newEvent2 == "appear") {
         if (newComponent2.includes("scene")) {
            console.log("SCENEEEEEE", scene_recd_id)
            var sct = ' document.getElementById("' + newComponent1 + '").addEventListener("loaded", function() { console.log(' + scene_recd_id + '); document.getElementById("' + scene_recd_id + '").setAttribute("visible",false); document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';
            sessionStorage.setItem('sct', sct);
            console.log(sct)
         }
         else if (newComponent2.includes("video")) {
            var searchcomp = newComponent2 + "a-video"
            var sct = 'document.getElementById("' + searchcomp + '").setAttribute("visible",false);document.querySelector("#' + newComponent2 + '").muted=true; document.getElementById("' + newComponent1 + '").addEventListener("loaded", function() { document.getElementById("' + searchcomp + '").setAttribute("visible",true);document.querySelector("#' + newComponent2 + '").muted=false; }); });';
            sessionStorage.setItem('sct', sct);
         }
         else {
            var sct = 'document.getElementById("' + newComponent2 + '").setAttribute("visible",false); document.getElementById("' + newComponent1 + '").addEventListener("ready", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';
            sessionStorage.setItem('sct', sct);
         }
      }
      else if (newEvent2 == "disappear") {
         if (newComponent2.includes("video")) {
            var searchcomp = newComponent2 + "a-video"
            var sct = 'document.getElementById("' + searchcomp + '").setAttribute("visible",true); document.getElementById("' + newComponent1 + '").addEventListener("loaded", function() { document.getElementById("' + searchcomp + '").setAttribute("visible",false) });';
            sessionStorage.setItem('sct', sct);
         } else {
            var sct = 'document.getElementById("' + newComponent2 + '").setAttribute("visible",true); document.getElementById("' + newComponent1 + '").addEventListener("loaded", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",false) });';
            sessionStorage.setItem('sct', sct);
         }
      }
      else if (newEvent2 == "toggle show/hide") {
         var sct = ' document.getElementById("' + newComponent1 + '").addEventListener("load", function() { if(document.getElementById("' + newComponent2 + '").getAttribute("visible")){document.getElementById("' + newComponent2 + '").setAttribute("visible",false)}else{document.getElementById("' + newComponent2 + '").setAttribute("visible",true)} });';
         sessionStorage.setItem('sct', sct);
      }
      else if (newEvent2 == "play/resume") {
         var sct = 'document.querySelector("#' + newComponent2 + '").currentTime = 0;document.querySelector("#' + newComponent2 + '").pause(); document.getElementById("' + newComponent1 + '").addEventListener("loads", function() { document.querySelector("#' + newComponent2 + '").play() });';
         sessionStorage.setItem('sct', sct);
      }
      else if (newEvent2 == "pause") {
         var sct = 'document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("loads", function() { document.querySelector("#' + newComponent2 + '").pause() });';
         sessionStorage.setItem('sct', sct);
      }
      else if (newEvent2 == "mute") {
         if (newComponent2.includes("sound")) {
            var sct = '  document.getElementById("' + newComponent1 + '").addEventListener("loads", function() { var entity = document.getElementById("' + newComponent2 + '");entity.components.sound.stopSound(); });';
            sessionStorage.setItem('sct', sct);
         }
         else {
            var sct = ' document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("loads", function() {document.querySelector("#' + newComponent2 + '").muted=true });';
            sessionStorage.setItem('sct', sct);
         }
      }
      else if (newEvent2 == "unmute") {
         if (newComponent2.includes("sound")) {
            var sct = 'var entity = document.querySelector("[sound]");entity.components.sound.pauseSound();  document.getElementById("' + newComponent1 + '").addEventListener("loads", function() { var entity = document.querySelector("[sound]");entity.components.sound.playSound(); });';
            sessionStorage.setItem('sct', sct);
         }
         else {
            var sct = '$("video").prop("muted", true); document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("loads", function() { $("video").prop("muted", false);  });';
            sessionStorage.setItem('sct', sct);
         }
      }


   }
   else if (newEvent1 == "ends") {
      if (newEvent2 == "appear") {
         if (newComponent2.includes("scene")) {
            console.log("SCENEEEEEE", scene_recd_id)
            var sct = ' document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { console.log(' + scene_recd_id + '); document.getElementById("' + scene_recd_id + '").setAttribute("visible",false); document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';
            sessionStorage.setItem('sct', sct);
            console.log(sct)
         } else if (newComponent2.includes("video")) {
            var searchcomp = newComponent2 + "a-video"
            var sct = 'document.getElementById("' + searchcomp + '").setAttribute("visible",false);document.querySelector("#' + newComponent2 + '").muted=true; document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { document.getElementById("' + searchcomp + '").setAttribute("visible",true);document.querySelector("#' + newComponent2 + '").muted=false; }); });';
            sessionStorage.setItem('sct', sct);
         }
         else {
            var sct = 'document.getElementById("' + newComponent2 + '").setAttribute("visible",false); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",true) });';
            sessionStorage.setItem('sct', sct);
         }
      }
      else if (newEvent2 == "disappear") {
         if (newComponent2.includes("video")) {
            var searchcomp = newComponent2 + "a-video"
            var sct = 'document.getElementById("' + searchcomp + '").setAttribute("visible",true); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { document.getElementById("' + searchcomp + '").setAttribute("visible",false) });';
            sessionStorage.setItem('sct', sct);
         } else {
            var sct = 'document.getElementById("' + newComponent2 + '").setAttribute("visible",true); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { document.getElementById("' + newComponent2 + '").setAttribute("visible",false) });';
            sessionStorage.setItem('sct', sct);
         }
      }
      else if (newEvent2 == "toggle show/hide") {
         var sct = ' document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { if(document.getElementById("' + newComponent2 + '").getAttribute("visible")){document.getElementById("' + newComponent2 + '").setAttribute("visible",false)}else{document.getElementById("' + newComponent2 + '").setAttribute("visible",true)} });';
         sessionStorage.setItem('sct', sct);
      }
      else if (newEvent2 == "play/resume") {
         var sct = 'document.querySelector("#' + newComponent2 + '").currentTime = 0;document.querySelector("#' + newComponent2 + '").pause(); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { document.querySelector("#' + newComponent2 + '").play() });';
         sessionStorage.setItem('sct', sct);
      }
      else if (newEvent2 == "pause") {
         var sct = 'document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { document.querySelector("#' + newComponent2 + '").pause() });';
         sessionStorage.setItem('sct', sct);
      }
      else if (newEvent2 == "mute") {
         if (newComponent2.includes("sound")) {
            var sct = '  document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { var entity = document.querySelector("[sound]");entity.components.sound.stopSound(); });';
            sessionStorage.setItem('sct', sct);
         }
         else {
            var sct = ' document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() {document.querySelector("#' + newComponent2 + '").muted=true });';
            sessionStorage.setItem('sct', sct);
         }
      }
      else if (newEvent2 == "unmute") {
         if (newComponent2.includes("sound")) {
            var sct = 'var entity = document.querySelector("[sound]");entity.components.sound.pauseSound();  document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { var entity = document.querySelector("[sound]");entity.components.sound.playSound(); });';
            sessionStorage.setItem('sct', sct);
         }
         else {
            var sct = '$("video").prop("muted", true); document.querySelector("#' + newComponent2 + '").play(); document.getElementById("' + newComponent1 + '").addEventListener("ended", function() { $("video").prop("muted", false);  });';
            sessionStorage.setItem('sct', sct);
         }
      }


   }


}

function getpreview() {
   window.location = sessionStorage.getItem('connection_url') + 'preview?session_id=' + sessionStorage.getItem('session_id')
}