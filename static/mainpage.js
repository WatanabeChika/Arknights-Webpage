function getdata(d, par) {
    let data = new Array();
    let i = 0;
    while (d[i]) {
        var obj = {value: d[i][par], name: d[i]['代号']}
        data.push(obj);
        ++i;
    }
    return data;
}

function judge_value_toint(h) {
    let i = 0;
    while (h[i]) {
        let j = parseInt(h[i].value);
        if (j !== j) {
            h[i].value = 0;
        }
        else {
            h[i].value = j;
        }
        ++i;
    }
    return h;
}

function judge_value_todate(d) {
    let i = 0;
    while (d[i]) {
        var j = String(d[i].value);
        var year = j.indexOf('年') == -1 ? '2022' : j.indexOf('年');
        var month = j.indexOf('月') == -1 ? '0' : j.slice(j.indexOf('年')+1, j.indexOf('月'));
        var day = j.slice(j.indexOf('月')+1, j.indexOf('日'));
        d[i].value = month == '0' ? '未知' : year+'-'+month+'-'+day
        ++i;
    }
    var dataset = new Array();
    i = 0;
    while (d[i]) {
        var exist = false;
        for (let j = 0; j < dataset.length; ++j) {
            if (dataset[j][0] == d[i].value) {
                exist = true;
                break;
            }
        }
        if (!exist) {
            dataset.push([d[i].value, []]);
        }
        ++i;
    }
    i = 0;
    while (d[i]) {
        for (let j = 0; j < dataset.length; ++j) {
            if (dataset[j][0] == d[i].value) {
                var index = j;
                break;
            }
        }
        dataset[index][1].push(d[i].name);
        ++i;
    }
    return dataset;
}

// High to low
function data_sort(d) {
    let res = d.sort(function(a,b){
        return parseInt(b.value) - parseInt(a.value);
    })
    return res;
}

$.getJSON('/static/ArkOperators.json').done(function(data) {
    echarts.init(document.getElementById('height')).setOption({
        title: {
            x: 'left',
            y: 'center',
            text: '身高'
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: [{
            type: 'category',
            data: data_sort(judge_value_toint(getdata(data, '身高'))).map(item => item.name),
            axisLabel: {
                rotate: 30
            }
        }],
        yAxis: [{
            axisLabel: {
                formatter: x => x+'cm'
            }
        }],
        dataZoom: [{
            top: 'top',
            start: 0,
            end: 10
        }],
        series: [{
            colorBy: 'data',
            showBackground: true,
            large: true,
            type: 'bar',
            data: data_sort(judge_value_toint(getdata(data, '身高'))).map(item => item.value),
            label: {
                show: true,
                position: 'top',
                formatter: function(params) {
                    if (params.value == 0) return '未知';
                    else return params.value
                }
            }
        }]
    })
    echarts.init(document.getElementById('birth')).setOption({
        title: {
            x: 'center',
            y: 'top',
            text: '生日'
        },
        tooltip: {
            formatter: function(params) {
               var str = params.value[0].slice(5) + '\n\n';
               let i = 0;
               while (params.value[1][i]) {
                str = str + params.value[1][i] + '\n\n';
                ++i;
               }
               return str;
            }
        },
        calendar: [{
            left: 'center',
            top: 'middle',
            cellSize: ['auto', 30],
            dayLabel: { show: false },
            yearLabel: {
                position: 'top',
                
            },
            range: 2022,
            itemStyle: {
                color: 'rgba(166, 239, 244, 1)',
            }
        }],
        emphasis: {
            focus: 'self',
            label: {
                fontWeight: 'bolder',
                fontSize: 20,
                color: 'rgba(167, 15, 222, 1)'
            }
        },
        series: [{
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 0,
            label: {
                show: true,
                formatter: function (params) {
                    var d = echarts.number.parseDate(params.value[0]);
                    return d.getDate();
                },
                color: '#000'
            },
            data: judge_value_todate(getdata(data, '生日'))
        }]
    })
})