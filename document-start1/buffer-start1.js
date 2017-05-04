// 创建一个长度为10， 用0填充的buffer对象
const buffer1 = Buffer.alloc(10);
console.log(buffer1);
// 创建一个长度为10 ，用0x1填充的数组
const buffer2 = Buffer.alloc(10,1);
console.log(buffer2);
// 创建一个长度为10 ，且不安全的buffer,可能包含旧数据 ,需要使用fill或write来重写
const buffer3 = Buffer.allocUnsafe(10);
console.log(buffer3);
// 创建一个包含数组的buffer
const  buffer4 = Buffer.from([1,2,3]);
console.log(buffer4);
// 创建一个包含字节数组的buffer
const buffer5 = Buffer.from('test');
console.log(buffer5);
// 指定buffer的字符编码
const buffer_ascii = Buffer.from('hello world','ascii');
// 指定重新编码的格式 
console.log(buffer_ascii.toString('ascii'));
console.log(buffer_ascii.toString('base64'));
console.log(buffer_ascii.toString('hex'));

//Es6 中 buffer的迭代器
const buffer6 = Buffer.from([1,2,3,4]);
for(const b of buffer6){
	console.log(b);
} 


// Buffer.alloc(size) 
// Buffer.alloc(size,fill,encoding)
// 当不指定	fill(String,Buffer,integer)时，默认填充0,encoding为utf8编码
const buf1 =  Buffer.alloc(5,'a');//默认utf8编码
console.log(buf1);
// encoding 指的是需要填充的fill的编码格式
// 凡是指定了fill都会默认调用buffer.fill(fill)来填充buffer
const buf2= Buffer.alloc(11,'aGVsbG8gd29ybGQ=','base64');
console.log(buf2.toString('ascii'));

