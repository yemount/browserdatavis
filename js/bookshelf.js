
var container, stats;

var camera, controls, scene, renderer, hemiLight, dirLight, dirLight1, projector, raycaster;

var clock = THREE.Clock();

var cross;
var bookSideMat, groundMaterial, colormat, texmat;
var spineUVs, spineSUVs, coverUVs, spineUVs_f, spineSUVs_f, coverUVs_f;
var heightPerKB = 3.0 / 131 * 5.1;
var mouse = new THREE.Vector2();
var windowMouse = new THREE.Vector2();
var bookGroups = [];

$(window).ready(function(){
	initMat();
	init();
	animate();
});

function initMat(){
	bookSideTex = THREE.ImageUtils.loadTexture( 'images/booksidetex.jpg' );
	bookSideMat = new THREE.MeshLambertMaterial( { color: 0xffffff, map: bookSideTex});
	groundMaterial = new THREE.MeshPhongMaterial( { color: 0xeeddbb, specular: 0x111111 } );
	colormat = new THREE.MeshLambertMaterial( { color: 0x331111});

	spineUVs_p = [new THREE.Vector2(0, 0), new THREE.Vector2(0.28, 0), new THREE.Vector2(0.28, 1), new THREE.Vector2(0, 1)];
	spineSUVs_p = [new THREE.Vector2(0.28, 0), new THREE.Vector2(0.3, 0), new THREE.Vector2(0.3, 1), new THREE.Vector2(0.28, 1)];
	coverUVs_p = [new THREE.Vector2(0.3, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0.3, 1)];		
	spineUVs_f = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)];
	spineSUVs_f = [new THREE.Vector2(0, 0), new THREE.Vector2(0.05, 0), new THREE.Vector2(0.05, 1), new THREE.Vector2(0, 1)];
	coverUVs_f = [new THREE.Vector2(0.05, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0.05, 1)];				
}

function setupLights(){
	hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
	hemiLight.color.setHSL( 0.6, 1, 0.8 );
	hemiLight.intensity = 0.5;
	hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
	hemiLight.position.set( 0, 500, 0 );
	scene.add( hemiLight );

	dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.color.setHSL( 0.1, 1, 0.95 );
	dirLight.position.set( -1, 1.75, 0.75 );
	dirLight.position.multiplyScalar( 25 );
	dirLight.intensity = 0.8;
	scene.add( dirLight );

	dirLight.castShadow = true;

	dirLight.shadowMapWidth = 2048;
	dirLight.shadowMapHeight = 2048;

	var d = 50;
	dirLight.shadowCameraLeft = -d;
	dirLight.shadowCameraRight = d;
	dirLight.shadowCameraTop = d;
	dirLight.shadowCameraBottom = -d;

	dirLight.shadowCameraFar = 3500;
	dirLight.shadowBias = -0.0001;
	dirLight.shadowDarkness = 0.35;
}

function setupControl(){
	controls = new THREE.TrackballControls( camera );

	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	controls.keys = [ 65, 83, 68 ];

	controls.addEventListener( 'change', render );
}

function genBook(len, pos, faviconid, bookInfo){
	var book = new THREE.Object3D();//create an empty container
	var texPath = faviconid < 0 ? 'images/bookcovers/lotr.gif' : 'favicons/'+faviconid+'.png';
	var texture = THREE.ImageUtils.loadTexture( texPath );
	var texmat = new THREE.MeshLambertMaterial( { color: 0xffffff, map: texture});
	var coverZ = Math.min(Math.max(len[1]/15, 0.05), 0.5);

	var pagesgeom = new THREE.BoxGeometry( len[0], len[1], len[2] );
	var pages = new THREE.Mesh( pagesgeom, bookSideMat);
	pages.position.x = 0;
	pages.position.y = len[1]/2+coverZ;
	pages.position.z = 0;
	pages.castShadow = true;
	pages.receiveShadow = true;

	var spinegeom = new THREE.CubeGeometry( coverZ*2, len[1]+coverZ*2, len[2]+coverZ);
	spinegeom.faceVertexUvs[0] = [];
	// spinegeom.faceVertexUvs[0][2] = [spineUVs[2], spineUVs[3], spineUVs[1]];
	// spinegeom.faceVertexUvs[0][3] = [spineUVs[3], spineUVs[0], spineUVs[1]];
	// spinegeom.faceVertexUvs[0][4] = [spineSUVs[3], spineSUVs[0], spineSUVs[2]];
	// spinegeom.faceVertexUvs[0][5] = [spineSUVs[0], spineSUVs[1], spineSUVs[2]];
	var spine = new THREE.Mesh( spinegeom, new THREE.MeshFaceMaterial([colormat, texmat, texmat, colormat, colormat, colormat] ));
	spine.position.x = - len[0]/2-coverZ;
	spine.position.y = len[1]/2+coverZ;
	spine.position.z = 0;
	spine.castShadow = true;
	spine.receiveShadow = true;

	var covergeom = new THREE.BoxGeometry( len[0]+coverZ*2, coverZ, len[2]+coverZ );
	covergeom.faceVertexUvs[0] = [];
	// for(var i = 0; i < 12; i++){
	// 	covergeom.faceVertexUvs[0][i] = [coverUVs[0], coverUVs[0], coverUVs[0]];
	// }
	// covergeom.faceVertexUvs[0][4] = [coverUVs[3], coverUVs[0], coverUVs[2]];
	// covergeom.faceVertexUvs[0][5] = [coverUVs[0], coverUVs[1], coverUVs[2]];
	var cover = new THREE.Mesh( covergeom, new THREE.MeshFaceMaterial([colormat, colormat, texmat, colormat, colormat, colormat] ));
	cover.position.x = coverZ/2;
	cover.position.y = len[1]+ coverZ*1.5;
	cover.position.z = 0;
	cover.castShadow = true;
	cover.receiveShadow = true;

	if(faviconid < 0){
		for(var i = 0; i < 12; i++){
			spinegeom.faceVertexUvs[0][i] = [spineUVs_p[0], spineUVs_p[0], spineUVs_p[0]];	
		}
		spinegeom.faceVertexUvs[0][2] = [spineUVs_p[2], spineUVs_p[3], spineUVs_p[1]];
		spinegeom.faceVertexUvs[0][3] = [spineUVs_p[3], spineUVs_p[0], spineUVs_p[1]];
		spinegeom.faceVertexUvs[0][4] = [spineSUVs_p[3], spineSUVs_p[0], spineSUVs_p[2]];
		spinegeom.faceVertexUvs[0][5] = [spineSUVs_p[0], spineSUVs_p[1], spineSUVs_p[2]];
		covergeom.faceVertexUvs[0][4] = [coverUVs_p[3], coverUVs_p[0], coverUVs_p[2]];
		covergeom.faceVertexUvs[0][5] = [coverUVs_p[0], coverUVs_p[1], coverUVs_p[2]];
	} 
	else{
		for(var i = 0; i < 12; i++){
			spinegeom.faceVertexUvs[0][i] = [spineUVs_f[0], spineUVs_f[0], spineUVs_f[0]];	
		}
		spinegeom.faceVertexUvs[0][2] = [spineUVs_f[2], spineUVs_f[3], spineUVs_f[1]];
		spinegeom.faceVertexUvs[0][3] = [spineUVs_f[3], spineUVs_f[0], spineUVs_f[1]];
		spinegeom.faceVertexUvs[0][4] = [spineSUVs_f[3], spineSUVs_f[0], spineSUVs_f[2]];
		spinegeom.faceVertexUvs[0][5] = [spineSUVs_f[0], spineSUVs_f[1], spineSUVs_f[2]];
		covergeom.faceVertexUvs[0][4] = [coverUVs_f[3], coverUVs_f[0], coverUVs_f[2]];
		covergeom.faceVertexUvs[0][5] = [coverUVs_f[0], coverUVs_f[1], coverUVs_f[2]];
	}

	var backgeom = new THREE.BoxGeometry( len[0]+coverZ*2, coverZ, len[2]+coverZ );
	var back = new THREE.Mesh( backgeom, colormat);
	back.position.x = coverZ/2;
	back.position.y = coverZ/2;
	back.position.z = 0;
	back.castShadow = true;
	back.receiveShadow = true;

	book.add(pages);
	book.add(spine);
	book.add(cover);
	book.add(back);

	book.rotation.x = 90 * 3.14 / 180;
	book.rotation.z = -90 * 3.14 / 180;
	book.position.x = pos[0];
	book.position.y = pos[1]+len[2]/2;
	book.position.z = pos[2];
	bookGroups.push([book, faviconid, bookInfo]);
	return book;
}

function genBooksByDate(date, pos){
	var totalByteCount = 0;
	var totalHeight = 0;
	var todayBooks = {};
	for(var i = 0; i < books[date]["urls"].length; i++){
		var url = books[date]["urls"][i];
		if(urls[url[0]]["faviconId"] in todayBooks){
			todayBooks[urls[url[0]]["faviconId"]][0] += urls[url[0]]["bytecount"];
			todayBooks[urls[url[0]]["faviconId"]][1].push([urls[url[0]]["urls"], urls[url[0]]["title"], urls[url[0]]["bytecount"]]);
		}
		else{
			todayBooks[urls[url[0]]["faviconId"]] = [];
			todayBooks[urls[url[0]]["faviconId"]].push(urls[url[0]]["bytecount"]);
			todayBooks[urls[url[0]]["faviconId"]].push([]);	// url info
			todayBooks[urls[url[0]]["faviconId"]][1].push([urls[url[0]]["url"], urls[url[0]]["title"], urls[url[0]]["bytecount"], urls[url[0]]["lastVisitTime"]]); // [url, title, bytecount, lastVisitTime]
		}
	}
	for(var favicon in todayBooks){
//		console.log(todayBooks[favicon] + " " + favicon + " " + date);
		var height = todayBooks[favicon][0]*1.0/500000;
		if(height < 0.1){
			continue;
		}
		var b = genBook([5, height, 10], [pos[0]+totalHeight, pos[1], pos[2]], favicon, todayBooks[favicon][1]);	
		scene.add(b);
		totalHeight += height+Math.min(Math.max(0.05, height/15)*2, 0.5);			
	}
	return totalHeight;
}

function setupBooks(height, dates){

	var x = -20;
	var lotrBook = genBook([5, 1.4, 10], [x, height+0.5, 0], -1);
	x += 3;
	scene.add(lotrBook);
	var count = 0;
	for(var i = 0; i < dates.length; i++){
		var totalHeight = genBooksByDate(dates[i], [x, height+0.5, 0]);
		x += totalHeight;
		count++;
		if(count > 10){
			break;
		}
	}

	// ground

	var mesh = new THREE.Mesh( new THREE.BoxGeometry( 500, 1, 10 ), groundMaterial );
	mesh.position.x = 800/2 - 400;
	mesh.position.y = height;
	mesh.receiveShadow = true;
	scene.add( mesh );

	// text
	var text_s = new THREE.TextGeometry( dates[0] + " - ", {
		size: 2,
		height: 0.2,
		curveSegments: 2,
		font: "helvetiker"
	});
	text_s.computeBoundingBox();
	var centerOffset = -0.5 * ( text_s.boundingBox.max.x - text_s.boundingBox.min.x );

	var text_s_mat = new THREE.MeshLambertMaterial( { color: 0, overdraw: true } );
	var text_smesh = new THREE.Mesh( text_s, text_s_mat );

	text_smesh.position.x = centerOffset - 30;
	text_smesh.position.y = 7 + height;
	text_smesh.position.z = 0;

	text_smesh.rotation.y = Math.PI * 2;
	scene.add(text_smesh);

	var text_e = new THREE.TextGeometry( dates[dates.length-1], {
		size: 2,
		height: 0.2,
		curveSegments: 1,
		font: "helvetiker"
	});
	text_e.computeBoundingBox();
	var centerOffset = -0.5 * ( text_e.boundingBox.max.x - text_e.boundingBox.min.x );

	var text_e_mat = new THREE.MeshBasicMaterial( { color: 0, overdraw: true } );
	var text_emesh = new THREE.Mesh( text_e, text_e_mat );

	text_emesh.position.x = centerOffset - 30;
	text_emesh.position.y = 2 + height;
	text_emesh.position.z = 0;

	text_emesh.rotation.y = Math.PI * 2;
	scene.add(text_emesh);
}

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// world + camera
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 20;
	camera.position.y = 8;
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xeeeeee, 0.005 );

	// renderer

	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setClearColor( scene.fog.color, 1 );
	renderer.shadowMapEnabled = true;
	renderer.shadowMapCullFace = THREE.CullFaceBack;
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );	

	// control
	setupControl(camera);

	// books
	setupBooks(-5, ["2013-11-29", "2013-11-30"]);
	setupBooks(10, ["2013-12-01", "2013-12-02", "2013-12-03", "2013-12-04", "2013-12-05", "2013-12-06", "2013-12-07"]);
	setupBooks(25, ["2013-12-08", "2013-12-09", "2013-12-10", "2013-12-11", "2013-12-12", "2013-12-13", "2013-12-14"]);
	setupBooks(40, ["2013-12-15", "2013-12-16", "2013-12-17", "2013-12-18", "2013-12-19", "2013-12-20", "2013-12-21"]);
	setupBooks(55, ["2013-12-22"]);
	setupBooks(70, ["2013-12-29", "2013-12-30", "2014-01-02"]);
	setupBooks(85, ["2014-01-11"]);
	setupBooks(100, ["2014-01-12", "2014-01-13", "2014-01-14", "2014-01-15", "2014-01-16", "2014-01-17", "2014-01-18"]);
	setupBooks(115, ["2014-01-19", "2014-01-20", "2014-01-21", "2014-01-22", "2014-01-23", "2014-01-24", "2014-01-25"]);
	setupBooks(130, ["2014-01-26", "2014-01-27", "2014-01-28", "2014-01-29", "2014-01-30", "2014-01-31", "2014-02-01"]);
	setupBooks(145, ["2014-02-02", "2014-02-03", "2014-02-04", "2014-02-05", "2014-02-06", "2014-02-07", "2014-02-08"]);
	setupBooks(160, ["2014-02-09", "2014-02-10", "2014-02-11", "2014-02-12", "2014-02-13", "2014-02-14", "2014-02-15"]);
	setupBooks(175, ["2014-02-16", "2014-02-17", "2014-02-18", "2014-02-19", "2014-02-20", "2014-02-21", "2014-02-22"]);
	setupBooks(190, ["2014-02-23", "2014-02-24", "2014-02-25", "2014-02-26", "2014-02-27"]);

	// lights
	setupLights(scene);
	projector = new THREE.Projector();
	raycaster = new THREE.Raycaster();

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	controls.handleResize();

	render();

}

function animate() {

	requestAnimationFrame( animate );
	controls.update();
	stats.update();
	// find intersections

	/*var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	projector.unprojectVector( vector, camera );

	raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

	var intersected = false;
	for(var i = 0; i < bookGroups.length; i++){
		var intersects = raycaster.intersectObjects( bookGroups[i][0].children );	
		if ( intersects.length > 0 ) {
			var infodiv = $("#info");
			infodiv.css("top", windowMouse.y);
			infodiv.css("left", windowMouse.x);
			infodiv.show();
			for(var j = 0; j < bookGroups[i][2].length; j++){
				infodiv.append($('<p style="font-weight: bold">' + bookGroups[i][2][j][1] + '</p>'));
				infodiv.append($('<p> bytecount: ' + bookGroups[i][2][j][2] + '</p>'));
				infodiv.append($('<p> visited on: ' + bookGroups[i][2][j][3] + '</p>'));
			}
			intersected = true;
			break;
		}
	}

	if(! intersected){
		$("#info").hide();
	}*/
}

function render() {

	renderer.render( scene, camera );

}

function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	windowMouse.x = event.clientX;
	windowMouse.y = event.clientY;

}