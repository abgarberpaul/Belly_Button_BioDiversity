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
                
                var panelData = incomingData.metadata.filter(sample => sample.id == sampleID)[0]
                console.log(panelData);

                //use d3 to select the panel to be updated
                updatePanel = d3.select("#sample-metadata");

                //clear any existing data using .html("")
                updatePanel.html("");
                
                Object.entries(panelData).forEach(([key, value])=>{
                    updatePanel.append("h6").text(key.toUpperCase()+": " + value);
                })

                //INSERT GAUGE (base code from instructions)
                // take wash frequency from panel data (panelData.washfreq)

                var gaugeData = [
                    {
                      domain: { x: [0, 1], y: [0, 1] },
                      value: panelData.wfreq,
                      title: { text: "Washing Frequency" },
                      type: "indicator",
                      mode: "gauge+number",
                      delta: { reference: 380 },
                      gauge: {
                        axis: { range: [null, 10] },
                        steps: [
                          { range: [0, 250], color: "lightgray" },
                          { range: [250, 400], color: "gray" }
                        ],
                        // threshold: {
                        //   line: { color: "red", width: 4 },
                        //   thickness: 0.75,
                        // //   value: panelData.wfrewq
                        // }
                      }
                    }
                  ];
                  
                  var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
                  Plotly.newPlot('gauge', gaugeData, gaugeLayout);
        })
    }

// Create OPTION CHANGE Function to listen & respond to user input (ID)

    function optionChanged(newValue){
    DisplayPage(newValue);
    }