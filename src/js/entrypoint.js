var a,b,c,d;
// a = canvas;
// b = window.body;
// c = canvas context;
// d = document;


// SOD1KU


var temp
var nb
var n1
var n2
var i
var j

var flo = (x) => Math.floor(x)
var rx = (m) => ~~(Math.random() * m)
var rx3 = () => rx3(3)

// var chars = '0123456789'
var grid = []
for(j=0; j<9; j++) {
	for(var i=0; i<9; i++) {
		grid.push(((i + j * 3 + flo(j / 3)) % 9) + 1);
	}
}

// var s1 = () => {

// 	// [ grid[n1], grid[n2] ] = [ grid[n2], grid[n1] ];

// 	// temp = grid[n1]
// 	// grid[n1] = grid[n2]
// 	// grid[n2] = temp
// }

// var s2 = () => {
// 	nb = rx(3) * 3
// 	n1 = rx(3) + nb
// 	n2 = rx(3) + nb
// }

for(i=0; i<9+rx(99); i++) {
	nb = rx(3) * 3;
	n1 = rx(3) + nb;
	n2 = rx(3) + nb;
	// [ n1, n2 ] = [ n2, n1 ]
	// n2 = rx(3) + nb;
	// for(j=0; j<9; g = grid[j], [ g[n1], g[n2] ] = [ g[n2], g[n1] ], j++);
}

// grid.map(r => console.log('row', JSON.stringify(r)));


// console.log(JSON.stringify(grid))

var g2 = grid.filter(r => true)

for(var k=0; k<2; k++) { // 0 + rx(200); k++) {
	n1 = rx(9)
	n2 = rx(9)
	g2[n1 * 9 + n2] = ' '
}

// console.log(JSON.stringify(g2))


CSS='c,d{display:block}'
+'c {background-color:#631;display:flex;justify-content:center;align-items:center;align-content:center;width:100%;height:100%;}'
+'d {width:500px;height:500px;}'
+'d input{display: inline-block;font-size: 30px;text-align: center;border: 0;margin: 1px;}'
+'input {color:#888;width:40px;height:40px;}'
+'input:disabled{color: #000;}'
+'.bu input {background-color:#f00;}'
+'.ok input {background-color:#0f0;}'
+'d i {display:inline-block;width:40px;height:40px;}'
+'d e {display:block;clear:both;width:40px;height:40px;}'
;



var ht = '<c><d>'
for(var j=0; j<81; j++) {
	ht += '<i><input name=c' + j + ' maxlength=1></i>'
	if (j % 3 == 2) ht += '<i></i>'
	if (j % 27 == 26) ht += '<e></e>'
}
ht += '</c></d><style>' + CSS

b.innerHTML = ht;

all = document.all

for(var j=0; j<81; j++) {
	var e = all['c' + j];
	var v = g2[j]
	e.value = v
	e.disabled = (v != ' ')
}

function evaluate() {
	var empty = 0
	var wrong = 0
	for(var j=0; j<81; j++) {
		var e = ~~all['c' + j].value;
		// console.log('comparing', e, grid[j])
		if (e != grid[j]) {
			wrong ++;
		}
		if (e == 0) {
			empty ++;
		}
		// g2[j][i] = e.value
	}
	// console.log('empty='+empty+', wrong='+wrong)
	if (empty === 0) {
		if (wrong > 0) {
			b.className = 'bu'
		} else {
			b.className = 'ok'
		}
	} else {
		b.className = ''
	}
}

evaluate()

b.addEventListener('keyup', evaluate)
b.addEventListener('blur', evaluate)

b.addEventListener('click', e => {
	// console.log('click', e)
	if (e.target.nodeName === 'INPUT') {
		e.target.select()
	}
})





