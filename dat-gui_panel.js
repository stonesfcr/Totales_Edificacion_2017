Q3D.gui = {

  type: "dat-gui",

  parameters: {
    lyr: [],
    cp: {
      c: "#ffffff",
      d: 0,
      o: 1,
      l: false
    },
    cmd: {         // commands for touch screen devices
      rot: false,  // auto rotation
      wf: false    // wireframe mode
    },
    i: Q3D.application.showInfo
  },

  // initialize gui
  // - setupDefaultItems: default is true
  init: function (setupDefaultItems) {
    this.gui = new dat.GUI();
    this.gui.domElement.parentElement.style.zIndex = 1000;   // display the panel on the front of labels
    if (setupDefaultItems === undefined || setupDefaultItems == true) {
      this.addLayersFolder();
      if (Q3D.isTouchDevice) this.addCommandsFolder();
      this.addHelpButton();
    }
  },

  addLayersFolder: function () {
    var mapLayers = Q3D.application.scene.mapLayers;
    var parameters = this.parameters;
    var visibleChanged = function (value) { mapLayers[this.object.i].setVisible(value); };
    var opacityChanged = function (value) { mapLayers[this.object.i].setOpacity(value); };

    var layer, layersFolder = this.gui.addFolder('Capas');
    for (var layerId in mapLayers) {
      layer = mapLayers[layerId];
      parameters.lyr[layerId] = {i: layerId, v: layer.visible, o: layer.opacity};
      var folder = layersFolder.addFolder(layer.properties.name);
      folder.add(parameters.lyr[layerId], 'v').name('Visible').onChange(visibleChanged);
      folder.add(parameters.lyr[layerId], 'o').min(0).max(1).name('Opacidad').onChange(opacityChanged);
    }
  },

 

  // add commands folder for touch screen devices
  addCommandsFolder: function () {
    var folder = this.gui.addFolder('Commands');
    if (Q3D.Controls.type == "OrbitControls") {
      folder.add(this.parameters.cmd, 'rot').name('Rotar Animacion').onChange(Q3D.application.setWireframeMode);
    }
    folder.add(this.parameters.cmd, 'wf').name('Modo Wireframe').onChange(Q3D.application.setWireframeMode);
  },

  addHelpButton: function () {
    this.gui.add(this.parameters, 'i').name('Ayuda');
  }
};
