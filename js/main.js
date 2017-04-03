window.addEventListener('load', function load(event) {
  addButtonFunctionalityBehavior();
});

function addButtonFunctionalityBehavior() {
  var draggable = new Draggable();
  var draggableExtended = new DraggableExtended();

  document.querySelector('.draggable-button').addEventListener('click', function(e) {
    draggable.createAndAppendNode();
  });

  document.querySelector('.draggable-extended-button').addEventListener('click', function(e) {
    draggableExtended.createAndAppendNode();
    draggableExtended.applyExtendedBehavior();
  });

}

function Draggable() {}

Draggable.prototype.createAndAppendNode = function() {
  this.node = document.createElement('div');
  this.node.classList.add('draggable', 'item');
  document.querySelector('.content-container').appendChild(this.node);

  this.applyDraggableBehaviour();

  this.closeButton = this.createButton('close-button');
  this.closeButtonBehavior();
};

Draggable.prototype.closeButtonBehavior = function() {
  var node = this.node;
  this.closeButton.addEventListener('click', function() {
    node.remove();
  });
};

Draggable.prototype.createButton = function(customClass) {
  var button = document.createElement('button');
  button.classList.add('control-button', customClass);
  this.node.appendChild(button);
  return button;
};

Draggable.prototype.applyDraggableBehaviour = function() {
  var node = this.node;
  var mouseCoordinates;
  var delta;

  var drag = function(e) {
    delta = {
      x: e.pageX - mouseCoordinates.x,
      y: e.pageY - mouseCoordinates.y
    };

    node.style.left = (node.offsetLeft + delta.x) + 'px';
    node.style.top = (node.offsetTop + delta.y) + 'px';

    mouseCoordinates.x = e.pageX;
    mouseCoordinates.y = e.pageY;
  };

  node.addEventListener('mousedown', function(e) {
    e.preventDefault();
    mouseCoordinates = {
      x: e.pageX,
      y: e.pageY
    };

    document.addEventListener('mousemove', drag);

    document.addEventListener('mouseup', function(e) {
      document.removeEventListener('mousemove', drag);
    });
  });
};

function inherit(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

inherit(DraggableExtended, Draggable);

function DraggableExtended() {

  this.applyExtendedBehavior = function() {
    this.node.classList.add('draggable-extended');
    this.extendButton = this.createButton('extend-button');
    this.extendButtonBehavior();
  };

  this.extendButtonBehavior = function() {
    var node = this.node;
    var button = this.extendButton;
    var extended = false;
    var nodeLastPositon;

    var extend = function() {
      if (!extended) {
        nodeLastPositon = {
          top: node.style.top,
          left: node.style.left
        };
      }

      node.style.width = !extended ? (window.innerWidth - 2 + 'px') : '';
      node.style.height = !extended ? (window.innerHeight - 2 + 'px') : '';
      !extended ? node.classList.add('extended') : node.classList.remove('extended');
      extended = !extended;
    };

    button.addEventListener('click', extend);
  };
}
