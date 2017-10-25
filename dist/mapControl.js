const mouseEnter = function(hoverD){
    d3.selectAll('.datamaps-subunit')
        .filter( (d) => d.id === hoverD.id )
        .style("fill", "#FFF4F4")
        .style("stroke-width", 1);
}

const mouseOut = function(hoverD){
    d3.selectAll('.datamaps-subunit')
        .filter( (d) => d.id === hoverD.id )
        .style("fill", "#ABDDA4")
        .style("stroke","white")
        .style("stroke-width", 1);
}

const makeTable = function(csv_data){

    let colNames = Object.keys(csv_data[0]);
    
    d3.select("#code_table")
        .append("table")
        .selectAll("tr")
        .data(csv_data)
        .enter()
        .append("tr")
        .selectAll("td")
        .data( (row) => {
            return  colNames.map( (c) => ({name: c, value: row[c]}) );
        })
        .enter()
        .append('td')
        .html(d => d.value);

    d3.selectAll("tr")
    .on("mouseover", mouseEnter)
    .on("mouseout", mouseOut);

}

const makeTable2 = function(csv_data){
    var tableSelect = d3.select("#code_table").append("table")
	    .attr("class", "display compact")
	    .attr("id", "country_table") 
	.style("visibility", "hidden");

    var table;
    
    const colNames = Object.keys(csv_data[0]);

    var headSelect = tableSelect.append("thead");

    headSelect.append("tr")
	.selectAll('td')
	.data(colNames).enter()
        .append('td')
	.html(function(d) { return d; });
    
    $(document).ready( () => {
        table = $('#country_table').DataTable({
        data: csv_data,
        columns: colNames.map( (c) => ({data: c})),
        "bLengthChange": false, // Disable page size change
	    "bDeferRender": true,
            "order": [5]
        });

        tableSelect.style("visibility", "visible");

        $('#country_table tbody')
            .on('mouseover', 'tr', function (){
                countryObj = table.row(this).data();
                d3.select(this).classed('highlight',true);
                console.log(countryObj.id);
                mouseEnter(countryObj);
            })
            .on('mouseleave', 'tr', function (){
                countryObj = table.row(this).data();
                d3.select(this).classed('highlight',false);
                mouseOut(countryObj);
            });
    })
}

d3.csv("countries.csv", makeTable2);



//---------------

var map = new Datamap({
    element: document.getElementById('container'),
    done: (datamap) => datamap.svg.selectAll('.datamaps-subunit').on('mouseenter', mouseEnter).on("mouseout", mouseOut)
});

map.labels({
    labelColor: 'blue',
    fontSize: 11
});

