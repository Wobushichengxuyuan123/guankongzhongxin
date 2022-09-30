
import React from "react";
import './css/histpry.scss'

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historyList: [],
        };
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    // 历史记录搜索
    getHistory(searchPath, loginName) {
        fetch("/nelda-smcc/pubUserSearchHistory/list", {
            method: "post",
            body: JSON.stringify({ loginName, searchPath }),
        })
            .then((r) => r.json())
            .then((b) => {
                let data = b.data
                data.map((item, index) => {
                    if (item.searchValue == '') {
                        delete data[index]
                    }
                })
                let list = data.slice(0, 5);
                this.setState({
                    historyList: list ? list : [],
                });
            });
    }
    render() {
        const { historyList } = this.state
      
        return (
            < >
               <div className="history">
                <div className="history_title">历史搜索:</div>
                <div className="history_list">
                    {historyList.map((item, i) => {
                        return (
                            <div className="history_list_div" key={"historyDiv" + i}
                                onClick={this.props.onHistory.bind(this, item.searchValue, item.id)}
                            >
                                {item.searchValue}
                            </div>
                        )
                    })}
                </div>
            </div>
            </>
        );
    }
}
export default History