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

function judge_value(h) {
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
            data: data_sort(judge_value(getdata(data, '身高'))).map(item => item.name),
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
            data: data_sort(judge_value(getdata(data, '身高'))).map(item => item.value),
            label: {
                show: true,
                position: 'top',
                formatter: function(prams) {
                    if (prams.value == 0) return '未知';
                    else return prams.value
                }
            }
        }]
    })
    // echarts.init(document.getElementById('hair')).setOption({

    // })
})