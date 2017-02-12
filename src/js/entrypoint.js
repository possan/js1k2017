var all = document.all

// a = canvas;
// b = window.body;
// c = canvas context;
// d = document;

// SOD1KU

var temp
var nb
var n1
var n2
var n3
var i
var j
var grid
var grid2
var e
var v


rx = (m) => ~~(Math.random() * m)

H = '<div><h1>SOD1KU</h1>'
n1 = 0
for(i=0; i<9; i++) {
	for(j=0; j<9; j++) {
		H += '<input name=c' + n1 + ' onclick=select() onkeyup=C()>'
		if (j == 2 || j == 5) H += '<f></f>'
		n1 ++
	}
	if (i % 3 == 2) H += '<e></e>'
}

H += 'Level: <input type=range id=d onchange=R() /><style>'

+'body{background:#eee;'
+'display:flex;'
+'justify-content:center;'
+'align-items:center}'
+'body,input{font:25px serif;text-align:center}'
+'div{width:510px}'
+'input{display:inline-block;color:0;width:40px;height:40px}'
+'#d{width:150px;height:auto}'
// +'*:disabled{color:666}'
+'f{display:inline-block;width:40px}'
+'e{display:block;height:40px}'
+'.n{background:#f88}'
+'.y{background:#3f4}'
;

b.innerHTML = H

C = () => {
	n1 = 0 // empty
	n2 = 0 // wrong
	j=81;
	while(j--) {
		var e = ~~all['c' + j].value;
		if (e != grid[j]) n2 ++;
		if (e < 1) n1 ++;
	}
	j=81;
	while(j--) {
		e = all['c' + j]
		e.className = n1 ? ' ' : (n2 ? 'n' : 'y')
	}
}

S = (nd, nm) => {
	nb = rx(3) * 3;
	n1 = nm * (rx(3) + nb)
	n2 = nm * (rx(3) + nb)
	for(j=0; j<9; [ grid[n1], grid[n2] ] = [ grid[n2], grid[n1] ], j++, n1 += nd, n2 += nd);
}

R = () => {
	grid = []
	n1 = 0
	for(j=0; j<9; j++)
		for(i=0; i<9; i++, n1++)
			grid[n1] = ((i + (j * 3) + ~~(j / 3)) % 9) + 1;

	for(i=0; i<9+rx(99); i++) {
		S(9,1)
		S(1,9)
	}

	grid2 = grid.map(r => r)

	j = ~~all['d'].value + 2
	while(--j) grid2[rx(81)] = ''

	j=81;
	while(j--) {
		e = all['c' + j];
		v = grid2[j]
		e.value = v
		e.disabled = v != ''
	}

	C()
}

R()
