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

// Buffer.poolSize 为内部实例Buffer的快速分配池，一般在使用 Buffer.allocUnsafe(size).fill(fill);
// 会使用这个分配池，而Buffer.alloc(size,fill);在size大于于poolSize/2 时才会使用这个快速分配池
console.log(Buffer.poolSize);
// 得到一个字符串，buffer,或是 ArrayBuffer等的长度（字节个数）
// Buffer.byteLength(string[, encoding])
const str = '\u00bd + \u00bc = \u00be';
console.log(str.length);
console.log(Buffer.byteLength(str,'utf8'));

// Buffer 比较大于返回1 下雨的返回-1 等于返回0
const buf_com1 = Buffer.from('123');
const buf_com2 = Buffer.from('1234');
console.log(buf_com1.compare(buf_com2));

// Buffer 合并 提前计算好长度会提高效率
const buf_contact1 = Buffer.alloc(5,'a');
const buf_contact2 = Buffer.from([1,2,3,4]);
const buf_contact3 = Buffer.alloc(10);
var bufArr = [buf_contact1,buf_contact2,buf_contact3];
var totalLength = buf_contact1.length + buf_contact2.length + buf_contact3.length;
const newBuf = Buffer.concat(bufArr,totalLength);
console.log(newBuf);
console.log(newBuf.length);

// Buffer.from(); 用于将Buffer,Array,String,等转换为buffer中
// Buffer.from('asdfasdf','utf8');当指定编码格式后，使用buffer.toString()得到的数据便是我们存储进去的数据（自定转回来） 
 // 复制一个buffer的数据 buffer1.from( buffer2);
 const bufferOrigin = Buffer.alloc(10,'b','utf8');
 const bufferCopy = Buffer.from(bufferOrigin);
 console.log(bufferCopy);
// Buffer.isBuffer(bufferOrigin) 用于判断有一个buffer是不能是一个buffer，返回true 否则false
console.log(Buffer.isBuffer(bufferOrigin));

// Buffer.isEncoding(Encoding); 检查Buffer是否支持该编码格式
console.log(Buffer.isEncoding('utf8'));