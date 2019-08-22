var docCookies = {
    getItem: function(sKey) {
        if (!sKey) {
            return null;
        }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function(sKey, sPath, sDomain) {
        if (!this.hasItem(sKey)) {
            return false;
        }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function(sKey) {
        if (!sKey) {
            return false;
        }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: function() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }
};


/*** road ******************/
var roads = [{
        start: {
            x: -200,
            y: -70
        },
        end: {
            x: 20,
            y: -60
        },
        speed: 3000,
    }, {
        start: {
            x: 20,
            y: -63
        },
        end: {
            x: -200,
            y: -73
        },
        speed: 19000,
    }, {
        start: {
            x: 20,
            y: -60
        },
        end: {
            x: 200,
            y: -40
        },
        speed: 4000,
    }, {
        start: {
            x: 200,
            y: -45
        },
        end: {
            x: 20,
            y: -63
        },
        speed: 5000,
    }, {
        start: {
            x: 12,
            y: -200
        },
        end: {
            x: 15,
            y: 0
        },
        speed: 10000,
    }, {
        start: {
            x: 15,
            y: 0
        },
        end: {
            x: 15,
            y: 140
        },
        speed: 3000,
    }, {
        start: {
            x: 15,
            y: 140
        },
        end: {
            x: 15,
            y: 200
        },
        speed: 5000,
    },

    {
        start: {
            x: 12,
            y: 0
        },
        end: {
            x: 9,
            y: -200
        },
        speed: 4000,
    }, {
        start: {
            x: 12,
            y: 200
        },
        end: {
            x: 12,
            y: 0
        },
        speed: 3000,
    },
    // 
    {
        start: {
            x: -140,
            y: 200
        },
        end: {
            x: -130,
            y: 0
        },
        speed: 2000,
    }, {
        start: {
            x: -130,
            y: 0
        },
        end: {
            x: -127,
            y: -70
        },
        speed: 2000,
    }, {
        start: {
            x: -125,
            y: -70
        },
        end: {
            x: -138,
            y: 200
        },
        speed: 20000,
    },
    //
    {
        start: {
            x: -200,
            y: -25
        },
        end: {
            x: 200,
            y: -25
        },
        speed: 20000,
    }, {
        start: {
            x: 200,
            y: -27
        },
        end: {
            x: -200,
            y: -27
        },
        speed: 40000,
    },
];

var width = 817 / 2
var height = 744 / 2


var main = document.getElementById('main');

var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);



var camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 1000000);
camera.position.x = 0;
camera.position.y = -203;
camera.position.z = 694;
camera.lookAt(new THREE.Vector3(0, 0, 0))
var controls = new THREE.TrackballControls(camera);

main.appendChild(renderer.domElement);


var plane = new THREE.PlaneGeometry(width * 2, height * 2, 20 * 2, 20 * 2);
var earth = THREE.SceneUtils.createMultiMaterialObject(plane, [
    //color
    new THREE.MeshPhongMaterial({
        color: 0xfefefe,
        transparent: true,
        opacity: 0.1,
        combine: THREE.MultiplyOperation,
        side: THREE.DoubleSide,
        name: 'earth1'
    }),
    //light
    new THREE.MeshBasicMaterial({
        color: 0x002A52,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        name: 'earth2'
    }),
    // wireframe
    new THREE.MeshBasicMaterial({
        color: 0xf0f0f0,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        wireframe: true,
        // side: THREE.FrontSide,
        side: THREE.DoubleSide,
        name: 'earth3'
    }),
]);
earth.name = 'earth';

var dxs = 13439254;
var dys = 3716124;

var fillColors = [
    [73, 174, 34],
    [202, 221, 10],
    [254, 182, 10],
    [253, 54, 32]
];
var zindex = 0;


/****************************/
var leftTop = [12960656.94, 4830466.42];
var zoom = 22;

var fillColors = [
    [73, 174, 34],
    [202, 221, 10],
    [254, 182, 10],
    [253, 54, 32]
];

function createBuliding(bindA) {
    var starPoints = [];
    for (var i = 0; i < bindA.length; i++) {
        var x = (bindA[i][0] - leftTop[0]) / zoom;
        var y = (bindA[i][1] - leftTop[1]) / zoom;
        starPoints.push(new THREE.Vector2(x - width / 2, y + height / 2));
    }

    var starShape = new THREE.Shape(starPoints);

    var extrusionSettings = {
        amount: 1,
        curveSegments: 1,
        bevelEnabled: false,
        material: 1,
        extrudeMaterial: 1
    };

    var starGeometry = new THREE.ExtrudeGeometry(starShape, extrusionSettings);

    var color = fillColors[Math.random() * 4 | 0]
    var materialFront = new THREE.MeshPhongMaterial({
        // color: 0x4A95AD,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        depthWrite: true,
    });

    var frame = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        // depthWrite: true,
    });

    var obj = new THREE.Object3D();
    var buliding = new THREE.Mesh(starGeometry, materialFront);
    var outline = new THREE.Mesh(starGeometry, frame);
    obj.add(buliding)
    obj.add(outline)
    obj.position.z = 1
    return {
        buliding: obj
    };

}


var buildings = [];
for (var i in guomao) {
    buildings.push(guomao[i].geo)
}

var heights = [];

for (var i in buildings) {
    var building = createBuliding(buildings[i]);
    var obj = building.buliding
        // console.log(building)
    heights.push({
        obj: obj,
        height: Math.random() * 50
    })
    obj.scale.z = 1 || Math.random() * 50
    obj.castShadow = true;
    // obj.receiveShadow = true;
    scene.add(obj);
}
/****************************/
scene.add(earth);



/* plane */
var texture = THREE.ImageUtils.loadTexture("map.png");
var geometry = new THREE.PlaneGeometry(width, height, 100);
var material = new THREE.MeshPhongMaterial({
    map: texture,
    // transparent: true,
    // opacity: 0.8
    // wireframe: true,
});
var plane = new THREE.Mesh(geometry, material);
plane.position.z = 0.5;
plane.receiveShadow = true;
scene.add(plane);

/* light */
var backgroundLight = new THREE.HemisphereLight('#fff', 0x000000, 1.2);
backgroundLight.position.x = 0;
backgroundLight.position.y = 0;
backgroundLight.position.z = 1000;
scene.add(backgroundLight);

if (docCookies.getItem('shadow') !== 'false') {
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 0, 1000);

    spotLight.castShadow = true;

    spotLight.shadowMapWidth = 10240;
    spotLight.shadowMapHeight = 10240;
    spotLight.shadowDarkness = 0.1;
    // spotLight.shadowCameraVisible = true;

    spotLight.shadowCameraNear = 5;
    spotLight.shadowCameraFar = 10000;
    spotLight.shadowCameraFov = 25;

    scene.add(spotLight);
}

/*****/
var mouse = new THREE.Vector3();
var raycaster = new THREE.Raycaster();

var hoverCountry = {};

var lastCountry;

renderer.shadowMapEnabled = true;

scene.rotateX(-30 * 2 * Math.PI / 360);

var isRotation = true;
if (docCookies.getItem('rotation') == 'false') {
    isRotation = false;
}

var isChangeBuildHeight = true;


/**/
function readen() {
    moveRoad();
    if (isChangeBuildHeight) {
        isChangeBuildHeight = false;
        for (var i in heights) {
            if (heights[i].obj.scale.z < heights[i].height) {
                isChangeBuildHeight = true;
                heights[i].obj.scale.z += 0.5;
            }
        }
    }

    renderer.clear();
    if (isRotation) {
        scene.rotation.z += 0.001
    }
    renderer.render(scene, camera);
    requestAnimationFrame(readen);
    controls.update();
}

requestAnimationFrame(readen);


var shadow = document.getElementById('shadow');
if (docCookies.getItem('shadow') == 'false') {
    shadow.checked = false;
}
shadow.addEventListener('click', function() {
    if (this.checked) {
        docCookies.setItem('shadow', true, Infinity);

    } else {
        docCookies.setItem('shadow', false, Infinity);
    }
    location.reload();
})

var rotation = document.getElementById('rotation');
if (docCookies.getItem('rotation') == 'false') {
    rotation.checked = false;
}
rotation.addEventListener('click', function() {
    if (this.checked) {
        docCookies.setItem('rotation', true, Infinity);
        isRotation = true;
    } else {
        docCookies.setItem('rotation', false, Infinity);
        isRotation = false;
    }
})




function moveRoad() {
    for (var i in self.roads) {
        var road = self.roads[i];
        road.particles = road.particles || [];
        for (var j in road.particles) {
            road.particles[j].position.x = road.particles[j].position.x + road._speed.x;
            road.particles[j].position.y = road.particles[j].position.y + road._speed.y;
            var xOver = false;
            var yOver = false;
            if (road._speed.x >= 0) {
                if (road.particles[j].position.x >= road.end.x) {
                    xOver = true;
                }
            } else {
                if (road.particles[j].position.x <= road.end.x) {
                    xOver = true;
                }
            }
            if (road._speed.y >= 0) {
                if (road.particles[j].position.y >= road.end.y) {
                    yOver = true;
                }
            } else {
                if (road.particles[j].position.y <= road.end.y) {
                    yOver = true;
                }
            }
            if (xOver && yOver) {
                road.particles[j].position.x = road.start.x;
                road.particles[j].position.y = road.start.y;
            }
        }
    }
}

for (var i in this.roads) {
    var road = this.roads[i];
    road.particles = road.particles || [];
    if (road.particles.length < 1) {

    } else {
        for (var j in road.particles) {
            this.scene.remove(road.particles[j])
        }

    }

    var start = road.start
    var end = road.end

    /* line */
    var material = new THREE.LineBasicMaterial({
        color: 'yellow',
        linewidth: 3,
        transparent: true,
        opacity: 0.3,
    });
    //
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(start.x, start.y, 8.0),
        new THREE.Vector3(end.x, end.y, 8.0)
    );

    var line = new THREE.Line(geometry, material);
    scene.add(line);
    //

    var d = road.distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2), 2);
    var dx = end.x - start.x;
    var dy = end.y - start.y;
    road._speed = {
            x: (end.x - start.x) / (road.speed / 16),
            y: (end.y - start.y) / (road.speed / 16),
        }
        //
    var material = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(generateSprite()),
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending
    });

    for (var i = 0; i < 10; i++) {
        var particle = new THREE.Sprite(material);
        particle.position.set(start.x + i * dx / 10, start.y + i * dy / 10, 10);
        particle.scale.x = 5;
        particle.scale.y = 5;
        particle.scale.z = 5
            // particle.scale.x = particle.scale.y = particle.scale.z = 5
            // particle.scale.x = particle.scale.y = particle.scale.z = 5
        this.scene.add(particle);
        road.particles.push(particle)
    }
}

function generateSprite() {

    var canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    var context = canvas.getContext('2d');
    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0.0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,0,1)');
    gradient.addColorStop(0.4, 'rgba(64,64,0,0.8)');
    gradient.addColorStop(0.6, 'rgba(64,64,0,0.4)');
    gradient.addColorStop(1.0, 'rgba(64,64,0,0.0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;

}
