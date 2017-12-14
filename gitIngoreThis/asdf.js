function update(params){

    // retrieving params to avoid putting params.x everywhere
    var svg = params.canvas.svg,
        margin = params.canvas.margin,
        y = params.y,
        blockDataOrdered = params.blockDataOrdered,
        heights = params.heights,
        chosen = params.chosen,
        width = params.width,
        height = params.height,
        bar = params.bar,
        urbPerc = params.urbPerc,
        years = params.years,
        legend = params.legend,
        maxPerBin = params.maxPerBin,
        view = params.view;

    var transDuration = 1030;

    // re-scaling data if view is changed to percentage
    // and re-scaling back if normal view is selected
    var newView = d3.select("#myCheckbox").property("checked");

    if(newView){
        if(view !== newView){
            blockDataOrdered.forEach(function (d){
                d.y0 /= maxPerBin[d.x];
                d.y1 /= maxPerBin[d.x];
                d.height /= maxPerBin[d.x];
            });
            heights = setUpHeights(urbPerc, blockDataOrdered
            //update y-axis description
            d3.select(".descrAxisY")
                .text("Total urban population since 1976");
        }
    }
    else{
        if(view !== newView){
            blockDataOrdered.forEach(function (d){
                d.y0 *= maxPerBin[d.x];
                d.y1 *= maxPerBin[d.x];
                d.height *= maxPerBin[d.x];
            });
            heights = setUpHeights(urbPerc, blockDataOrdered}
    }
    params.view = newView;


    // update Y axis
    if(chosen.countries == null){
        y.domain([0, d3.max(blockDataOrdered, function(d) { return d.y1; })]);
    }
    else{
        y.domain([0, d3.max(heights[chosen.countries])]);
    }

    if(newView){
        y.domain([0, 1]);
    }

    var axisY = d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(function(d) { return d + "%"; });
    // .tickFormat(d3.format(".0%"));

    if(newView){
        axisY.tickFormat(d3.format(".0%"));
    }

    svg.selectAll('.axisY')
        .transition()
        .duration(transDuration)
        .call(axisY);




// update legend
    legend.selectAll('rect')
        .transition()
        .duration(transDuration)
        .attr('height', function(d) {return choice(chosen.countries, d, 50, 50, 0);})
        .attr('y', function(d) {
            var i = urbPerc.indexOf(d);
            if (i > urbPerc.indexOf(chosen.countries)){
                return choice(chosen.countries, d, (60 * (urbPerc.length - 1 - i)), 0, 0);
            }
            else {
                return choice(chosen.countries, d, (60 * (urbPerc.length - 1 - i)), 0,  50);
            }
        })
        .attr("transform", "translate(" + 0 + "," + 15 + ")");

    legend.selectAll('text')
        .transition()
        .duration(transDuration)
        .attr('height', "300px")
        .attr('width', "300px")
        .attr('y', function(d) {
            var i = urbPerc.indexOf(d);
            if (i > urbPerc.indexOf(chosen.countries)){
                return choice(chosen.countries, d, (70 * (urbPerc.length - 1 - i)), -1, 2);
            }
            else {
                return choice(chosen.countries, d, 100 * (urbPerc.length - 1 - i), -5,  1);
            }
        })
        .style('font-size' ,function(d, i) {return choice(chosen.countries, d, '30px', '30px', '0px');})
        // .style("transform",function(d, i) {return choice(chosen.countries, d, "translate(0px,0px)", "translate(0px,1000px)");})
        .attr('x', function(d) {return choice(chosen.countries, d,
            width + margin.right - 60,
            width + margin.right - 60,
            width + margin.right - this.getComputedTextLength()/2);});




    // update bars
    bar.selectAll('rect')
        .on('click', function(d){
            chosen.countries = chosen.countries === d.countries ? null : d.countries;
            update(params);
        })
        .transition()
        .duration(transDuration)
        .attr('y', function(d) {
            return choice(chosen.countries, d.countries,
                y(d.y1),
                y(d.height),
                myHeight(chosen, d, urbPerc, years, y, heights));})
        .attr('height', function(d) {
            return choice(chosen.countries, d.countries,
                height - y(d.height),
                height - y(d.height),
                0);});
} // end of second update