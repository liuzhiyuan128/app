

function dataFilter(data) {
	if(!data || data.length == 0) return [];
	var data = JSON.parse(JSON.stringify(data))
	var treeData = []
	var key = 0
	for(let i = 0; i < data.length; i++) {
		key++
		var item = {
			label: data[i].name,
			value:`${data[i].id}`,
			key: `${key}`,
			pid: data[i].pid
		}
		treeData.push(item)
		for(let k = 0; k < data.length; k++) {
			key++
			if(data[i].id == data[k].pid) {

				if(!treeData[i].children) {
					treeData[i].children = [];
				}
				var childrenItem = {
					label: data[k].name,
					value: `${data[k].id}`,
					key: `${key}`,
					pid: data[k].pid
				}
				treeData[i].children.push(childrenItem)
				data.splice(k, 1);
				k--
			}
		}
	}
	//删除区 
	
	var data = treeData.splice(0, 1);


	//剩下的data为三级目录 与value 相等的 pid;
	
	for(let i = 0; i < data[0].children.length; i++) {
		
		for(let k = 0; k<treeData.length; k++){

			if(!data[0].children[i].children){
				data[0].children[i].children = [];
			}

			if(data[0].children[i].value == treeData[k].pid){
				data[0].children[i].children.push(treeData[k])
			}
		
		}
	}
	return data;
}
export {dataFilter}