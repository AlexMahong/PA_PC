import {
	baseURL,interceptor
} from './config.js';

/* option: {
 *   type: 请求类型(可选) String get(默认) | post
 *   responseType: 服务器端返回值类型(可选) String json(默认)||text
 *   contentType: 发送数据流的编码类型 String application/x-www-form-urlencoded | multipart/form-data(文件上传需要将contentType设置为false) | application/json(默认) | text/xml
 *   withCredentials: 是否携带跨域凭证 Boolean true(默认) | false
 * }
 * */
function ajax(url, data, option = {}) {
	// 请求拦截器
	let requestPayload = interceptor.requestHandle({url, data, option});
  var {url, data, option} = requestPayload;
	
	// 设置option默认值
	let type = (option.type || 'get').toUpperCase(),
	responseType = option.responseType || 'json',
	contentType = option.hasOwnProperty('contentType') ? option.contentType : 'application/json',
	withCredentials = option.hasOwnProperty('withCredentials') ? option.withCredentials : true;
	
	//get请求需要将参数拼接成字符串
	let dataArr = [];
	if (type === 'GET' && data) {
		Object.keys(data).forEach((key) => {
			dataArr.push(key + '=' + data[key]);
		})
	}
	if (dataArr.length) {
		url = url + '?' + dataArr.join('&');
	}
	return new Promise((resolve, reject) => {
		//1.获得xhr对象
		var xhr;
		if (XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		//2. 建立连接
		xhr.open(type, url.indexOf('http') !== -1 ? url : baseURL + url, true);
		//是否携带跨域信息
		xhr.withCredentials = withCredentials;
		//返回数据格式
		xhr.responseType = responseType;
		//3. 设置请求状态回调函数
		xhr.onreadystatechange = function() {
			//如果请求完成，且成功!
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					// 响应数据处理
					interceptor.responseHandle(xhr,resolve)
				} else {
					interceptor.responseErrorHandle(xhr,reject)
				}
			}
		};
		//4.只有type为post|put，且option中有contentType值，才需要设置请求头
		if (type.toLowerCase() === "post" || type.toLowerCase() === "put") {
			//文件上传时将传入的contentType置为false，ajax会默认设置为form-data格式
			if (contentType) {
				xhr.setRequestHeader("Content-Type", contentType);
			}
		}
		//5.只有type为post或put，才需要send时，传入参数
		//如果不是文件上传，需要将参数格式化
		xhr.send(['post','put'].includes(type.toLowerCase()) ? (!contentType ? data : JSON.stringify(data)) : null);
	}).catch(err => {
		interceptor.requestErrorHandle(err,requestPayload);
	})
}
const GET = (url,data={},options={}) => {
  return ajax(url,data,{type:'get',...options});
}

const POST = (url,data={},options={}) => {
  return ajax(url,data,{type:'get',...options})
}

export {ajax, GET, POST};
