// var a,b,c,d;
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
var grid
var grid2
var e
var v
var all

rx = (m) => ~~(Math.random() * m)


ht = '<div><h1>SOD1KU</h1>'
for(j=0; j<81; j++) {
	ht += '<input name=c' + j + ' onclick=this.select() onkeyup=C() maxlength=1>'
	if (j % 3 > 1) ht += '<f></f>'
	if (j % 27 > 25) ht += '<e></e>'
	// ht += (j % 3 > 1) ? '<f></f>' : ''
	// ht += (j % 27 > 25) ? '<e></e>' : ''
}

ht += 'Difficulty: <input type=range id=df onchange=R() /><style>'

+'body,input{font:25px arial;text-align:center}'
+'body{background:#631;color:#fff}'
+'body{display:flex;justify-content:center;align-items:center;align-content:center}'
+'div{width:490px;height:650px}'
+'input{display:inline-block;padding:0;border:0;color:#000;width:40px;height:40px;margin:0}'
+'input[type=range]{width:150px;height:auto}'
+'input:disabled{color:#666}'
+'.bu input{background:#f88}'
+'.ok input{background:#3f4}'
+'i,f{display:inline-block;width:40px}'
+'i{height:40px}'
+'e{display:block;width:40px;height:40px}'
;

// console.log(ht)

b.innerHTML = ht

C = () => {
	n1 = 0 // empty
	n2 = 0 // wrong
	j=81;
	while(j--) {
		var e = ~~all['c' + j].value;
		if (e != grid[j]) n2 ++;
		if (e < 1) n1 ++;
	}
	b.className = n1 ? '' : (n2 ? 'bu' : 'ok')
}

R = () => {
	all = document.all

	grid = []
	n1 = 0
	for(j=0; j<9; j++)
		for(var i=0; i<9; i++, n1 ++)
			grid[n1] = ((i + (j * 3) + ~~(j / 3)) % 9) + 1;

	for(i=0; i<9+rx(99); i++) {
		nb = rx(3) * 3;
		n1 = rx(3) + nb;
		n2 = rx(3) + nb;
		for(j=0; j<9; [ grid[n1], grid[n2] ] = [ grid[n2], grid[n1] ], j++, n1 += 9, n2 += 9);
		n1 = 9 * (rx(3) + nb)
		n2 = 9 * (rx(3) + nb)
		for(j=0; j<9; [ grid[n1], grid[n2] ] = [ grid[n2], grid[n1] ], j++, n1 ++, n2 ++);
	}

	grid2 = grid.filter(r => true)

	j = ~~all['df'].value + 2
	while(--j) grid2[rx(81)] = ' '

	j=81;
	while(j--) {
		e = all['c' + j];
		v = grid2[j]
		e.value = v
		e.disabled = (v != ' ')
	}

	C()
}

R()
