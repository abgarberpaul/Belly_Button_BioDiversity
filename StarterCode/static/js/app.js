d3.json("samples.json").then((incomingData)=>{

console.log(incomingData)
inputSelect = d3.select("#selDataset")
incomingData.names.forEach((sample)=>{
    inputSelect.append("option").text(sample).property("value", sample)

})
DisplayPage(incomingData.names[0])
})

function DisplayPage(sampleID){
    console.log(sampleID)
    d3.json("samples.json").then((incomingData)=>{

          // INSERT BAR CHART<<<<<<<<<<<<<<<<<<<<
          // Use filter() to pass the function as its argument
          var filterBarChart = incomingData.samples.filter(sample => sample.id == sampleID)[0];
            console.log(filterBarChart)
        

           // NOTE TO SELF<< THIS NEEDS TO SORT FOR TOP TEN <<< NOTE TO SELF 
            var BarData = [{
                x: filterBarChart.otu_ids.slice(0,10),
                y: filterBarChart.sample_values.slice(0,10).map(val=>"OTU "+val),
                text: filterBarChart.otu_labels.slice(0,10),
                type: "bar",
                orientation: "h"
            }]
            
            var BarLayout= {
                title: "Belly Button Bar Chart"
            }
            
            Plotly.newPlot("bar", BarData, BarLayout)

            //INSERT BUBBLE CHART 
                
            var filterBubbleChart = incomingData.samples.filter(sample => sample.id == sampleID)[0];
            console.log(filterBubbleChart)

            //VAR BUBBLE DATA
            var BubbleData = [{
                mode: 'markers',
                x: filterBarChart.otu_ids,
                y: filterBarChart.sample_values,
                text: filterBarChart.otu_labels,
                
                marker: {
                    color: filterBarChart.sample_values,
                    colorscale: "Portland",
                    size: filterBarChart.sample_values
                }
            }];

            //VAR BUBBLE LAYOUT
            var BubbleLayout= {
                title: "Belly Button Bubble Chart",
                showlegend: false
            }
        
            //PLOTLY for BUBBLE
            Plotly.newPlot('bubble', BubbleData, BubbleLayout)


            //INSERT DEMOGRAPHIC INFO
            // .filter on incomingData.metadata.filter( ETC )
            // d3.select on #sample-metadata
            // loop through dictionary and append on h5 elements 
            // to refenece set to .text (printing key value)

            var metadata_panel = d3.select("#sample-metadata");
            metadata_panel.html("");
            Object.entries(metadata).forEach(([key, value]) => {
                metadata_panel.append("p").text(`${key}: ${value}`);
            });

            metadata_new = data["metadata"].filter(function(metadata) {

                return metadata.id == newValue;
          
            });

            // var filterInfoChart = incomingData.metadata.filter(sample => sample.id == sampleID)[0];
            // console.log(filterInfoChart)

            // function buildTable(url) {
            //     // clear out the elements of the table first
            //     var table = d3.select("#summary-table");
            //     var tbody = table.select("tbody");
            //     tbody.html("");
                
            //     var id_name 
            //     // call the API then fill in the elements of the table
            //     d3.json(url).then(function(data) {
            //       data.dataset.data.forEach(function(d) {
            //         trow = tbody.append("tr");
            //         trow.append("td").text(d[0]);
            //         trow.append("td").text(d[1]);
            //         trow.append("td").text(d[2]);
            //         trow.append("td").text(d[3]);
            //         trow.append("td").text(d[4]);
            //         trow.append("td").text(d[5]);
            //       });
            //     })
            //   }    
    })

}

function optionChanged(newValue){

DisplayPage(newValue)

}