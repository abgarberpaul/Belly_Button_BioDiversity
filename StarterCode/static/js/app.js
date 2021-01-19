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

        
          // Use filter() to pass the function as its argument
          var filterBarChart = incomingData.samples.filter(sample => sample.id == sampleID)[0];
            console.log(filterBarChart)
            var BarData = [{
                x: filterBarChart.otu_ids.slice(0,10),
                y: filterBarChart.sample_values.slice(0,10).map(val=>"OTU "+val),
                text: filterBarChart.otu_labels.slice(0,10),
                type: "bar",
                orientation: "h"
            }]
            var BarLayout= {
                title: "BellyButton Bar Chart"
            }
            Plotly.newPlot("bar", BarData, BarLayout)

            //INSERT BUBBLE CHART 
                //VAR DATA
                //VAR LAYOUT
                //PLOTLY for BUBBLE
                var filterBubbleChart = incomingData.samples.filter(sample => sample.id == sampleID)[0];
                console.log(filterBubbleChart)

                var BubbleData = [{
                    x: filterBubbleChart.otu_ids.slice(0,10),
                    y: filterBubbleChart.sample_values.slice(0,10),
                    //text: filterBubbleChart.otu_labels.slice(0,10),
                    mode: "markers",
                    markers: {
                        size:[40, 60, 80, 100]
                    }
                }]
                var BubbleLayout= {
                    title: "BellyButton Bubble Chart"
                }
                Plotly.newPlot("bubble", BubbleData, BubbleLayout)
            //INSERT DEMOGRAPHIC INFO
            // .filter on incomingData.metadata.filter( ETC )
            // d3.select on #sample-metadata
            // loop through dictionary and append on h5 elements 
            // to refenece set to .text (printing key value)
            
    })

}

function optionChanged(newValue){

DisplayPage(newValue)

}