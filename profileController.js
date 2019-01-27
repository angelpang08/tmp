
        var outer_dataset = [
            {name: 'IE', percent: 10},
            {name: 'Chrome', percent: 32.51},
            {name: 'Safari', percent: 13.68},
            {name: 'Firefox', percent: 8.71}
        ];
        var inner_dataset = [
            {name: "kk", percent: 30},
            {name:"gg", percent: 30},
            
        ];

        var pie = d3.layout.pie()
            .value(function (d) {
                return d.percent
            })
            .sort(null)
            ;
        //.padAngle(.03);

        var w = 800, h = 600;
        var Radius= Math.min(w,h)*0.8;
        var outerRadius = Radius/2;
        var innerRadius = Radius/3;

        var color = d3.scale.category20b();
        var arc = d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        var arcOver = d3.svg.arc().outerRadius(outerRadius + 20).innerRadius(innerRadius +20);

         var arc2 = d3.svg.arc()
                .outerRadius(Radius/3)
                .innerRadius(Radius/8)
                // .startAngle(function(d) { return d.startAngle + Math.PI/3; })
                // .endAngle(function(d) { return d.endAngle + Math.PI/3; });

        var svg_donut = d3.select("#donut-chart")
            .append("svg")
            .attr({
                //width: w,
                //height: h,
                 preserveAspectRatio: "xMidYMid meet",
                viewBox: ("0 0 "+ w +" " +h),
                class: 'shadow'
            })
            .append('g')
            .attr({
                transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
            });

        var g_arc_out=svg_donut.selectAll('.arc_out')
            .data(pie(outer_dataset ))
            .enter()
            .append("g")
            .attr('class','arc_out')
            .on("mouseenter", function (d) {
                d3.select(this).select("path")
                    .attr("stroke", "white")
                    .transition()
                    .duration(200)
                    .attr("d", arcOver);
                    
            })
            .on("mouseleave", function (d) {
                 d3.select(this).select("path")
                     .transition()
                     .duration(200)
                     .attr("d", arc);
             })
            .on('click',function(d){
                alert(d.data.name);
            })
            ;

        g_arc_out.append('path')
            .attr('class', 'outer')
            .attr("stroke", "#fff")
            .attr({
                d: arc,
                fill: function (d, i) {
                	
                    return color(d.data.name);
                }
            })
            ;

                
        g_arc_out.append("text").attr("class","out")
                .attr("transform", function(d) { 
                        var midAngle = d.startAngle/2 + d.endAngle/2 <= Math.PI ? d.startAngle/2 + d.endAngle/2 : d.startAngle/2  + d.endAngle/2 + Math.PI ;
                        return "translate(" + arc.centroid(d)[0] + "," + arc.centroid(d)[1] + ") rotate(-90) rotate(" + (midAngle * 180/Math.PI) + ")";
                 })
                .attr("dy", ".35em")
                .attr("text-anchor","middle")
                .text(function(d){
                    //console.log(d.data.name);
                    return d.data.name+d.data.percent;
                }).style("fill", "black").style('opacity', 1);

       

        

        var path2 = svg_donut.selectAll('path.inner')
            .data(pie(inner_dataset ))
            .enter()
            .append('path')
            .attr('class', 'inner')
            .attr({
                d: arc2,
                fill: function (d, i) {
                    return color(d.data.name);
                }
            })
        ;

        function midAngle(d){
            return d.startAngle-(d.endAngle-d.startAngle)/2;
        }

       var outerArc=d3.svg.arc().outerRadius(w/2*1.5).innerRadius(w/2*1.1);




        var text_in=svg_donut.selectAll("text.in")
                .data(pie(inner_dataset)).enter()
                .append("text").attr("class","in")
                .attr("transform", function(d) { 
                        var midAngle = d.startAngle/2 + d.endAngle/2  <= Math.PI ? d.startAngle/2 + d.endAngle/2 : d.startAngle/2  + d.endAngle/2 + Math.PI ;
                        return "translate(" + arc2.centroid(d)[0] + "," + arc2.centroid(d)[1] + ") rotate(-90) rotate(" + (midAngle * 180/Math.PI) + ")";
                 })
                .attr("dy", ".35em")
                .attr("text-anchor","middle")
                .text(function(d){
                    return d.data.name;
                }).style("fill", "black").style('opacity', 1);

              //  var radius=w/2;

        // text_out.transition().attrTween("transform",function(d){
        //         this._current = this._current || d;
        //         var interpolate = d3.interpolate(this._current, d);
        //         this._current = interpolate(0);
                
        //         return function (t) {
        //             var d2 = interpolate(t);
        //             //获取文本内容在外圆的中心位置坐标
        //             var pos = outerArc.centroid(d2);
        //             //然后将文本内容进行左右平移，移动到固定的radius长度，方向由饼图中心角度是否大于180度决定。
        //             pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
        //             return "translate(" + pos + ")";
        //         };
        //     }).styleTween("text-anchor", function (d) {
        //             this._current = this._current || d;
        //             var interpolate = d3.interpolate(this._current, d);
        //             this._current = interpolate(0);
        //             return function (t) {
        //                 var d2 = interpolate(t);
        //                 //判断文本的锚点位置
        //                 return midAngle(d2) < Math.PI ? "start" : "end";
        //             };
        //        });


            /* ------- 添加引导线 -------*/
/*
            var polyline = svg.select(".lines").selectAll("polyline")
                .data(pie(data), key);

            polyline.enter()
                .append("polyline");

            polyline.transition().duration(1000)
                .attrTween("points", function (d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function (t) {
                        var d2 = interpolate(t);
                        var pos = outerArc.centroid(d2);
                        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                        //折线从饼图文本中心位置开始，到饼图外圆文本的中心位置，再到文本的显示位置
                        return [arc.centroid(d2), outerArc.centroid(d2), pos];
                    };
                });

*/



