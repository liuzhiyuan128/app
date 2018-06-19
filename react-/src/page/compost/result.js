import {
    qs,
    Route,
    Component,
    React,
    ajax,
    SearchRanking,
    Tabs,
    TabPane,
    TableComponent,
    AlertDetails
} from "../../config/router.js";

let vm = null,
    checkuserId = "",
    pageNum = 1,
    searchData = null

const getSearchData = (data) => {
    searchData = data
    vm.setState({
        getListParameter: {
            condition: data.condition,
            pageSize: 10,
            pageNum: 1,
            startTime: data.startTime,
            endTime: data.endTime,
            villageId: data.villageId
        }
    }, () => {
        vm.getList()
    })
}

const callback = (key) => {}
const closeAlertDetails = () => {
    vm.setState({visible: false})
}

const rows = [
    {
        span: 24,
        cols: [
            {
                key: "堆肥房名称："
            }
        ]
    }, {
        span: 12,
        cols: [
            {
                key: "房长姓名："
            }, {
                key: "服务人口："
            }
        ]

    }, {
        span: 12,
        cols: [
            {
                key: "联系电话："
            }, {
                key: "服务模式："
            }
        ]
    }, {
        span: 8,
        color: "red",
        cols: [
            {
                key: "月总分："
            }, {
                key: "季总分："
            }, {
                key: "年总分："
            }
        ]
    }
]
var closVal = {
    compostingName: "",
    responsibleName: "",
    servicePopulation: '',
    responsiblePhone: '',
    compostingModel: '',
    totalMonth: "",
    totalQuarter: '',
    totalYear: ''
}
// 评分
var score = {
    dfqk: {
        name: "堆肥情况",
        choosenum: ""
    },
    ssgl: {
        name: "设施管理"
    },
    zbws: {
        name: "周边卫生",
        choosenum: ""
    },
    tyws: {
        name: "周边卫生",
        choosenum: ""
    }
}
//意见
const getALineData = (text, e) => {
    

    var i = 0;
    let closVals = JSON.parse(JSON.stringify(closVal))
    let data = {}
    ajax({
        url: "selectByPrimaryKey/" + text.id,
        asyny: false,
        success: (res) => {
            data = Object.assign(data, res.data)
        }
    })

    ajax({
        url: 'selectCompostingScore/' + text.id + '/' + text.checkCompostingId,
        success: (res) => {
            data = Object.assign(data, res.data)
        },
        asyny: false

    })
    ajax({
        url: 'selectCheckCompostingDetail/' + text.checkCompostingId,
        success: (res) => {
            data = Object.assign(data, res.data)
        },
        asyny: false

    })

    for (var item in closVals) {
        closVals[i] = data[item];
        i++
    }

    if (data.dfqk == 10) {
        score.dfqk.choosenum = 0
    } else if (data.dfqk == 0) {
        score.dfqk.choosenum = 1
    } else {
        score.dfqk.choosenum = 2
    }

    if (data.ssgl == 5) {
        score.ssgl.choosenum = 0
    } else if (data.ssgl == 0) {
        score.ssgl.choosenum = 1
    } else if (data.ssgl == -5) {
        score.ssgl.choosenum = 2
    }

    if (data.zbws == 5) {
        score.zbws.choosenum = 0
    } else if (data.zbws == 0) {

        score.zbws.choosenum = 1
    } else if (data.zbws == -5) {
        score.zbws.choosenum = 2
    }
    if (data.tyws == 5) {
        score.tyws.choosenum = 0
    } else if (data.tyws == 0) {
        score.tyws.choosenum = 1
    } else if (data.tyws == -5) {
        score.tyws.choosenum = 2
    }
    let fkyj = data.fkyj
    let zgyj = data.zgyj
    let image = null
    //图片问题
    if (data.image) {
        image = data
            .image
            .split("&");
        image.pop()

    }

    const roleId = sessionStorage.roleId;

    vm.setState({
        alertMsg: {
            closVal: closVals,
            score,
            zgyj,
            fkyj,
            image,
            cfsj: data.cfsj,
            weight: data.weight,
            cfqx: data.cfqx,
           
        }
    }, () => {

        vm.setState({
            visible: true
        }, () => {
            //icon变色
            setTimeout(() => {
                var iconDiv = document.querySelectorAll(".score");
                []
                    .some
                    .call(iconDiv, (item) => {
                        var chooseNum = item.getAttribute("choosenum")

                        if (chooseNum == null) 
                            return false;
                        
                        var choseIocns = item.querySelectorAll('i')

                        //变色
                        choseIocns[chooseNum].style.color = "#f15f2d"
                    })
            }, 0);
        })
    })

}
const pageOnChange = (current) => {
    pageNum = current

    vm.setState({
        getListParameter: {
            condition: null,
            pageSize: 10,
            pageNum: current,
            startTime: null,
            endTime: null,
            villageId: null
        }
    }, () => {
        vm.getList()
    })
}
const tableColumns = [
    {
        title: "堆肥房名称",
        dataIndex: "compostingName",
        key: "compostingName"
    }, {
        title: "房主姓名",
        dataIndex: "responsibleName",
        key: "responsibleName"
    }, {
        title: '评分',
        dataIndex: 'total',
        key: 'total'
    }, {
        title: "联系电话",
        dataIndex: 'responsiblePhone',
        key: "responsiblePhone"
    }, {
        title: "时间",
        dataIndex: "createTime",
        key: "createTime"
}, {
title: '状态',
render: (text) => {
    let sign = [
        {
            state: '合格',
            color: '#32da40'
        }, {
            state: '在办',
            color: '#2f8adf'
        }, {
            state: '正常完结',
            color: '#642fdf'
        }, {
            state: '强制终结',
            color: '#1d1b23'
        }, {
            state: '催办',
            color: '#c22c2c'
        }, {
            state: '重办',
            color: '#cde324'
        }
    ];
    // 5 催办 #c22c2c 6 重办 #cde324 1 合格 #32da40 2 在办 #2f8adf 3 正常完结 #642fdf 4 强制终结
    // #1d1b23

    let color = sign[text.sign - 1] && sign[text.sign - 1].color || "pink"
    let state = sign[text.sign - 1] && sign[text.sign - 1].state || " "
    return (
        <div
            style={{
            cursor: "default",
            color: color
        }}>{state}</div>
    )
}
}, {
        title: "操作",
        render: (text) => {
            return (
                <div
                    style={{
                    cursor: "pointer"
                }}
                    onClick={(e) => getALineData(text, e)}>查看详情</div>
            )
        }
    }
   
]

class CompostResult extends Component {
    constructor(props) {
        super(props);
        vm = this
        this.state = {
            tableColumns,
            tableData: [],
            pagination: {
                total: 50,
                current: 1,
                loading: true,
                onChange: pageOnChange
            },
            visible: false, //控制是否弹出查看详情
            closVal: [],
            alertMsg: {
                closVal: [],
                score
            },
            getListParameter: {
                condition: null,
                pageSize: 10,
                pageNum: 1,
                startTime: null,
                endTime: null,
                villageId: null
            }
        }
    }
    componentWillMount() {
        this.getList();

    }
    getList() {
        ajax({
            url: 'selectCheckCompostingResult',
            data: qs.stringify(this.state.getListParameter),
            type: "post",
            success: (res) => {
               res = res.data
                res
                    .list
                    .some((item, index, arr) => {
                        arr[index].key = index
                    })
                this.setState({
                    tableData: res.list,
                    pagination: {
                        total: res.total,
                        current: res.pageNum,
                        loading: false,
                        onChange: pageOnChange
                    }
                })
            }
        })
    }

    render() {
        return (
            <div>
                <SearchRanking onlyAreaTown={true} isTree={true} getSearchData={getSearchData}/>
                <TableComponent
                    pagination={this.state.pagination}
                    tableData={this.state.tableData}
                    tableColumns={this.state.tableColumns}/>
                <AlertDetails
                    alertMsg={this.state.alertMsg}
                    rows={rows}
                    closeAlertDetails={closeAlertDetails}
                    visible={this.state.visible}/>
            </div>
        )
    }
}
const comostResult = () => {
    return <CompostResult/>
}
export default comostResult