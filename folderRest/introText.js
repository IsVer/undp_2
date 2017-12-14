d3.select("#explanation")
    .style("visibility","visible")
    .style("top", 200 + "px")
    .style("left", 50 + "px")
    .style("width", 550 + "px")
    .html("<p>Societies are shifting from having a rural nature to a more and more urban nature. We face the opportunity to set the course of urbanization on a more sustainable and equitable path</p>" +
        "<p>This visualization is based on data on urbanization in East Asia between <span style='color: #858483;'>2000</span> and <span style='color: #DA6761;'>2010</span> collected by the World Bank using Satellite images and population models. It aims to provide you with a clear view on the magnitude of changes that can happen in only one decade and challenges you to think about the impact on the following years<p>")
    .transition().duration(1000)
    .style("opacity",1);