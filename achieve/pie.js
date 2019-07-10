var width = 300;  //画布的宽度
var height = 300;   //画布的高度

var svg = d3.select("body")     //选择文档中的body元素
    .append("svg")          //添加一个svg元素
    .attr("width", width)       //设定宽度
    .attr("height", height);    //设定高度



var arcs = svg.selectAll("g")
    .data(piedata)
    .enter()
    .append("g")
    .attr("transform","translate("+ (width/2) +","+ (width/2) +")");
    
arcs.append("path")
    .attr("fill",function(d,i){
        return color(i);
    })
    .attr("d",function(d){
        return arc(d);   //调用弧生成器，得到路径值
    });
 var color = d3.scale.category10();
 arcs.append("text")
    .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor","middle")
    .text(function(d){
        return d.data;
    });
    
    
    
    
   //
   //

