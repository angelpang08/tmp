
        var outer_dataset = [
            {name: 'IE', percent: 39.10},
            {name: 'Chrome', percent: 32.51},
            {name: 'Safari', percent: 13.68},
            {name: 'Firefox', percent: 8.71}
        ];
        var inner_dataset = [
            {name: 0, percent: 10},
            {name: 1, percent: 30},
            
        ];

        var pie = d3.layout.pie()
            .value(function (d) {
                return d.percent
            })
            .sort(null);
        //.padAngle(.03);

        var w = 300, h = 300;

        var outerRadius = w / 2;
        var innerRadius = 100;
        var color = d3.scale.category20b();
        var arc = d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        var svg_donut = d3.select("#donut-chart")
            .append("svg")
            .attr({
                preserveAspectRatio: "xMidYMid meet",
                viewBox: "0 0 800 800",
                class: 'shadow'
            }).append('g')
            .attr({
                transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
            });
        var path = svg_donut.selectAll('path.outer')
            .data(pie(outer_dataset ))
            .enter()
            .append('path')
            .attr('class', 'outer')
            .attr({
                d: arc,
                fill: function (d, i) {
                	
                    return color(d.data.name);
                }
            });

        var arc2 = d3.svg.arc()
            .outerRadius(100)
            .innerRadius(50);

        

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

            path.append("text")
			    .attr("transform",function(d){
			        return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor","middle")
			    .text(function(d){
                    console.log(d.data.name);
			        return d.data.name;
			    }).style("fill", "#fff");;

        

