import {Component, React, Table, Spin} from "../config/router"
/*

*/
class TableComponent extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (<div className="tableBox">
            <Spin spinning={this.props.pagination.loading}>
                <Table pagination={{
                    total: this.props.pagination.total,
                    pageSize: this.props.pageSize,
                 
                    current: this.props.pagination.current,
                    onChange:this.props.pagination.onChange
                }}   dataSource={this.props.tableData} columns={this.props.tableColumns} />
            </Spin>
        </div>)
    }
}
export default TableComponent