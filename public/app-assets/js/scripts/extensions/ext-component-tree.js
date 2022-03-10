/*=========================================================================================
	File Name: ext-component-tree.js
	Description: Tree
	----------------------------------------------------------------------------------------
	Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
  'use strict';
  setTimeout(
    function () {
      console.log("experiencedata:::",experienceData)
    }, 10000);
    if (!experienceData) {
    }
    else{
      scenes = JSON.parse(experienceData);
            total_num_of_scenes = JSON.parse(experienceData).length
            console.log("total number of scnes", total_num_of_scenes);
            function ScenesLoop(i) {
              if (i < total_num_of_scenes)
             {
              console.log("number of assets", i, scenes[i].scene.length)
              var newscene_name = "scene" + (i + 1)
              var dropdownname = "s" + (i + 1);
              if (newscene_name !== "scene1")
             {
               console.log("newscene to populate",newscene_name)
              i++;
              }
              }
            }
            ScenesLoop(1)
    }
  
  var basicTree = $('#jstree-basic'),
    customIconsTree = $('#jstree-custom-icons'),
    contextMenu = $('#jstree-context-menu'),
    dragDrop = $('#jstree-drag-drop'),
    checkboxTree = $('#jstree-checkbox'),
    ajaxTree = $('#jstree-ajax');

  var assetPath = '../../../app-assets/';
  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // Basic
  if (basicTree.length) {
    basicTree.jstree();
  }

  // Custom Icons
  if (customIconsTree.length) {
    customIconsTree.jstree({
      core: {
        data: [
          {
            text: 'css',
            children: [
              {
                text: 'app.css',
                type: 'css'
              },
              {
                text: 'sheetal.css',
                type: 'css'
              }
            ]
          },
          {
            text: 'img',
            state: {
              opened: true
            },
            children: [
              {
                text: 'bg.jpg',
                type: 'img'
              },
              {
                text: 'logo.png',
                type: 'img'
              },
              {
                text: 'avatar.png',
                type: 'img'
              }
            ]
          },
          {
            text: 'js',
            state: {
              opened: true
            },
            children: [
              {
                text: 'jquery.js',
                type: 'js'
              },
              {
                text: 'app.js',
                type: 'js'
              }
            ]
          },
          {
            text: 'index.html',
            type: 'html'
          },
          {
            text: 'page-one.html',
            type: 'html'
          },
          {
            text: 'page-two.html',
            type: 'html'
          }
        ]
      },
      plugins: ['types'],
      types: {
        default: {
          icon: 'far fa-folder'
        },
        html: {
          icon: 'fab fa-html5 text-danger'
        },
        css: {
          icon: 'fab fa-css3-alt text-info'
        },
        img: {
          icon: 'far fa-file-image text-success'
        },
        js: {
          icon: 'fab fa-node-js text-warning'
        }
      }
    });
  }

  // Context Menu
  if (contextMenu.length) {
    
    contextMenu.jstree({
      core: {
        check_callback: true,
        data: [
          {
            text: 'css',
            children: [
              {
                text: 'app.css',
                type: 'css'
              },
              {
                text: 'style.css',
                type: 'css'
              }
            ]
          },
          {
            text: 'img',
            state: {
              opened: true
            },
            children: [
              {
                text: 'bg.jpg',
                type: 'img'
              },
              {
                text: 'logo.png',
                type: 'img'
              },
              {
                text: 'avatar.png',
                type: 'img'
              }
            ]
          },
          {
            text: 'js',
            state: {
              opened: true
            },
            children: [
              {
                text: 'jquery.js',
                type: 'js'
              },
              {
                text: 'app.js',
                type: 'js'
              }
            ]
          },
          {
            text: 'index.html',
            type: 'html'
          },
          {
            text: 'page-one.html',
            type: 'html'
          },
          {
            text: 'page-two.html',
            type: 'html'
          }
        ]
      },
      plugins: ['types', 'contextmenu'],
      types: {
        default: {
          icon: 'far fa-folder'
        },
        html: {
          icon: 'fab fa-html5 text-danger'
        },
        css: {
          icon: 'fab fa-css3-alt text-info'
        },
        img: {
          icon: 'far fa-file-image text-success'
        },
        js: {
          icon: 'fab fa-node-js text-warning'
        }
      }
    });
  }

  // Drag Drop\
  var array_1 = [
    {
      text: 'Image one',
      type: 'img'
    },
    {
      text: 'Model two',
      type: 'img'
    },
    {
      text: 'Cube three',
      type: 'img'
    }
  ];
  var dataarray = [
    {
      text: 'Scene1',
      state: {
        opened: true
      },
      children: array_1
    },
    {
      text: 'Scene2',
      state: {
        opened: true
      },
      children: array_1
    }
   
  ]
  
  
  if (dragDrop.length) {
   
    dragDrop.jstree({
      core: {
        check_callback: true,
        data:dataarray
      },
      plugins: ['types', 'dnd'],
      types: {
        default: {
          icon: 'far fa-folder'
        },
        html: {
          icon: 'fab fa-html5 text-danger'
        },
        css: {
          icon: 'fab fa-css3-alt text-info'
        },
        img: {
          icon: 'far fa-file-image text-success'
        },
        js: {
          icon: 'fab fa-node-js text-warning'
        }
      }
    });

    
    console.log("check!!!!!!!!!!",dragDrop);
  }

  // Checkbox
  if (checkboxTree.length) {
    checkboxTree.jstree({
      core: {
        data: [
          {
            text: 'css',
            children: [
              {
                text: 'app.css',
                type: 'css'
              },
              {
                text: 'style.css',
                type: 'css'
              }
            ]
          },
          {
            text: 'img',
            state: {
              opened: true
            },
            children: [
              {
                text: 'bg.jpg',
                type: 'img'
              },
              {
                text: 'logo.png',
                type: 'img'
              },
              {
                text: 'avatar.png',
                type: 'img'
              }
            ]
          },
          {
            text: 'js',
            state: {
              opened: true
            },
            children: [
              {
                text: 'jquery.js',
                type: 'js'
              },
              {
                text: 'app.js',
                type: 'js'
              }
            ]
          },
          {
            text: 'index.html',
            type: 'html'
          },
          {
            text: 'page-one.html',
            type: 'html'
          },
          {
            text: 'page-two.html',
            type: 'html'
          }
        ]
      },
      plugins: ['types', 'checkbox', 'wholerow'],
      types: {
        default: {
          icon: 'far fa-folder'
        },
        html: {
          icon: 'fab fa-html5 text-danger'
        },
        css: {
          icon: 'fab fa-css3-alt text-info'
        },
        img: {
          icon: 'far fa-file-image text-success'
        },
        js: {
          icon: 'fab fa-node-js text-warning'
        }
      }
    });
  }

  // Ajax Example
  if (ajaxTree.length) {
    ajaxTree.jstree({
      core: {
        data: {
          url: assetPath + 'data/jstree-data.json',
          dataType: 'json',
          data: function (node) {
            return {
              id: node.id
            };
          }
        }
      },
      plugins: ['types', 'state'],
      types: {
        default: {
          icon: 'far fa-folder'
        },
        html: {
          icon: 'fab fa-html5 text-danger'
        },
        css: {
          icon: 'fab fa-css3-alt text-info'
        },
        img: {
          icon: 'far fa-file-image text-success'
        },
        js: {
          icon: 'fab fa-node-js text-warning'
        }
      }
    });
  }
});
