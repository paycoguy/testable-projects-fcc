import $ from 'jquery';
import { getToolTipStatus, getRandomIndex } from '../assets/globalD3Tests';

const SORT_ORDER = {
  ASCENDING:1,
  DESCENDING:2
}

/**
Returns the sort order of an array of values.  
Returns -1 if the array of values aren't sorted.
**/
function getSortOrder(values){
  if(values.length < 2){
    //must have at least 2 values to determine sort order
    return -1;
  }
  //get the prelim sort order from the first 2 values
  var sortOrder;
  if(values[0]<values[1]){
    sortOrder = SORT_ORDER.ASCENDING;
  }else{
    sortOrder = SORT_ORDER.DESCENDING;    
  }
  //verify all values conform to the sort order
  for(var i=2; i < values.length; i++){
    if(sortOrder == SORT_ORDER.ASCENDING && values[i-1]>values[i]){
        return -1;
    }else if(sortOrder == SORT_ORDER.DESCENDING && values[i-1]<values[i]){
        return -1;
    }
  }
  //all values conform to sort order
  return sortOrder;
}

export default function createScatterPlotTests() {

    describe('#ScatterPlotTests', function() {
        const MIN_YEAR = 1990;
        const MAX_YEAR = 2020;
        const MIN_MINUTES = 36;
        const MAX_MINUTES = 40;

        describe('#Content', function() {
            it('1. I can see a title element that has a corresponding id="title".', function() {
                FCC_Global.assert.isNotNull(document.getElementById('title'), 'Could not find element with id="title" ');
            });

            it('2. I can see an x-axis that has a corresponding id="x-axis".', function() {
                FCC_Global.assert.isNotNull(document.getElementById('x-axis'), 'There should be an element with id="x-axis" ');
                FCC_Global.assert.isAbove(document.querySelectorAll('#x-axis g').length, 0, 'x-axis should be a <g> SVG element ');
            });

            it('3. I can see a y-axis that has a corresponding id="y-axis".', function() {
                FCC_Global.assert.isNotNull(document.getElementById('y-axis'), 'There should be an element with id="y-axis" ');
                FCC_Global.assert.isAbove(document.querySelectorAll('g#y-axis').length, 0, 'y-axis should be a <g> SVG element');
            });

            it('4. I can see dots, that each have a class of "dot", which represent the data being plotted.', function() {
                FCC_Global.assert.isAbove(document.querySelectorAll('.dot').length, 0, 'Could not find any circles with class="dot" ');
            });

            it('5. Each dot should have the properties "data-xvalue" and "data-yvalue" containing their corresponding x and y values.', function() {
                const dots = document.getElementsByClassName('dot');
                FCC_Global.assert.isAbove(dots.length, 0, 'there are no elements with the class of "dot" ');
                for (var i = 0; i < dots.length; i++) {
                    var dot = dots[i];
                    FCC_Global.assert.isNotNull(dot.getAttribute("data-xvalue"), 'Could not find property "data-xvalue" in dot ');
                    FCC_Global.assert.isNotNull(dot.getAttribute("data-yvalue"), 'Could not find property "data-yvalue" in dot ');
                }
            });

            it('6. The data-xvalue and data-yvalue of each dot should be within the range of the actual data.', function() {
                const MIN_X_VALUE = MIN_YEAR;
                const MAX_X_VALUE = MAX_YEAR;

                const dotsCollection = document.getElementsByClassName('dot');
                //convert to array
                const dots = [].slice.call(dotsCollection);
                FCC_Global.assert.isAbove(dots.length, 0, 'there are no elements with the class of "dot" ');
                dots.forEach(dot => {

                    FCC_Global.assert.isAtLeast(dot.getAttribute("data-xvalue"), MIN_X_VALUE, "The data-xvalue of a dot is below the range of the actual data ");
                    FCC_Global.assert.isAtMost(dot.getAttribute("data-xvalue"), MAX_X_VALUE, "The data-xvalue of a dot is above the range of the actual data ");

                    //compare just the minutes for a good approximation
                    var yDate = new Date(dot.getAttribute("data-yvalue"));
                    FCC_Global.assert.isAtLeast(yDate.getMinutes(), MIN_MINUTES, "The minutes data-yvalue of a dot is below the range of the actual minutes data ");
                    FCC_Global.assert.isAtMost(yDate.getMinutes(), MAX_MINUTES, "The minutes data-yvalue of a dot is above the range of the actual minutes data ");
                })
            })

            it('7. The data-xvalue and its corresponding dot should align with the corresponding point/value on the x-axis.', function() {
                const dotsCollection = document.getElementsByClassName('dot');
                //convert to array
                const dots = [].slice.call(dotsCollection);
                FCC_Global.assert.isAbove(dots.length, 0, 'there are no elements with the class of "dot" ');
                //sort the dots based on xvalue in ascending order
                const sortedDots = dots.sort(function(a, b) {
                    return a.getAttribute("data-xvalue") - b.getAttribute("data-xvalue")
                });

                //check to see if the x locations of the new sorted array are in ascending order
                for (var i = 0; i < sortedDots.length - 1; ++i) {
                    FCC_Global.assert.isAtMost(+sortedDots[i].cx.baseVal.value, +sortedDots[i + 1].cx.baseVal.value, "x values don't line up with x locations ");
                }
            });

            it('8. The data-yvalue and its corresponding dot should align with the corresponding point/value on the y-axis.', function() {
                //first try didn't work
                //sort y axis values by y locations in ascending order
                //sort dots by y locations in ascending order
                //get sort order of y axis values
                ///get sort order of dot y  values
                //check if they are the same
                
                
                
  
                
                //get axis order for y axis
                const yAxisTickLabels = document.querySelectorAll("#y-axis .tick");
                var yAxisValues = [];
                //extract y axis values into array
                for(var i=0; i < yAxisTickLabels.length; i++){
                  yAxisValues.push(yAxisTickLabels[i].textContent)
                }
                console.log("yAxisValues", yAxisValues);
                const yAxisOrder = getSortOrder(yAxisValues);
                console.log("yAxisOrder", yAxisOrder)
                FCC_Global.assert.notStrictEqual(yAxisOrder, -1, 'Y axis labels are not sorted');
                
                const dotsCollection = document.getElementsByClassName('dot');
                //convert to array
                const dots = [].slice.call(dotsCollection);
                FCC_Global.assert.isAbove(dots.length, 0, 'There are no elements with the class of "dot" ');

                //sort the dots based on yvalue according to the y axis order
                var sortedDots = dots.sort(function(a, b) {
                    if(yAxisOrder == SORT_ORDER.ASCENDING){
                      return new Date(a.getAttribute("data-yvalue")) - new Date(b.getAttribute("data-yvalue"));
                    }else{
                      return new Date(b.getAttribute("data-yvalue")) - new Date(a.getAttribute("data-yvalue"));
                    }
                });
                console.log("sortedDots",sortedDots);
                
                //check to see if the y location of the new sorted array are in the same y axis order
                for (var i = 0; i < sortedDots.length - 1; ++i) {
                  console.log(sortedDots[i].cy.baseVal.value);
                  console.log(sortedDots[i+1].cy.baseVal.value);
                  if(yAxisOrder == SORT_ORDER.ASCENDING){
                    FCC_Global.assert.isAtMost(+sortedDots[i+1].cy.baseVal.value, +sortedDots[i].cy.baseVal.value, "Y values don't line up with y locations ");
                  }else{
                    FCC_Global.assert.isAtMost(+sortedDots[i].cy.baseVal.value, +sortedDots[i+1].cy.baseVal.value, "Y values don't line up with y locations ");
                  }
                }
                
                // const dotsCollection = document.getElementsByClassName('dot');
                // //convert to array
                // const dots = [].slice.call(dotsCollection);
                // FCC_Global.assert.isAbove(dots.length, 0, 'there are no elements with the class of "dot" ');
                // //sort the dots based on yvalue in ascending order
                // const sortedDots = dots.sort(function(a, b) {
                //     return new Date(a.getAttribute("data-yvalue")) - new Date(b.getAttribute("data-yvalue"));
                // });
                // 
                // //check to see if the y locations of the new sorted array are in ascending order
                // for (var i = 0; i < sortedDots.length - 1; ++i) {
                //     FCC_Global.assert.isAtMost(+sortedDots[i].cy.baseVal.value, +sortedDots[i + 1].cy.baseVal.value, "y values don't line up with y locations ");
                // }
            });

            it('9. I can see multiple tick labels on the y-axis with "%M:%S" time  format.', function() {
                const yAxisTickLabels = document.querySelectorAll("#y-axis .tick");
                FCC_Global.assert.isAbove(yAxisTickLabels.length, 0, "Could not find tick labels on the y axis ");
                yAxisTickLabels.forEach(label => {
                    //match "%M:%S" d3 time format
                    FCC_Global.assert.match(label.textContent, /[0-5][0-9]:[0-5][0-9]/, 'Y-axis tick labels aren\'t in the "%M:%S" d3 time format ');
                });
            });


            it('10. I can see multiple tick labels on the x-axis that show the year.', function() {
                const xAxisTickLabels = document.querySelectorAll("#x-axis .tick");
                FCC_Global.assert.isAbove(xAxisTickLabels.length, 0, "Could not find tick labels on the x axis ")
                xAxisTickLabels.forEach(label => {
                    //match check if this is a year
                    FCC_Global.assert.match(label.textContent, /[1-2][0-9][0-9][0-9]/, 'X-axis tick labels do not show the year ');
                });
            });

            it('11. I can see that the range of the x-axis labels are within the range of the actual x-axis data.', function() {
                const xAxisTickLabels = document.querySelectorAll("#x-axis .tick");
                const MIN_YEAR = 1994;
                const MAX_YEAR = 2016;
                FCC_Global.assert.isAbove(xAxisTickLabels.length, 0, "Could not find tick labels on the x axis ")
                xAxisTickLabels.forEach(label => {
                    FCC_Global.assert.isAtLeast(label.textContent, MIN_YEAR, "x axis labels are below the range of the actual data ");
                    FCC_Global.assert.isAtMost(label.textContent, MAX_YEAR, "x axis labels are above the range of the actual data ");
                });
            });

            it('12. I can see that the range of the y-axis labels are within the range of the actual y-axis data.', function() {
                const yAxisTickLabels = document.querySelectorAll("#y-axis .tick");
                const MIN_TIME = new Date(0, 0, 0, 0, MIN_MINUTES, 0, 0);
                const MAX_TIME = new Date(0, 0, 0, 0, MAX_MINUTES, 0, 0);
                FCC_Global.assert.isAbove(yAxisTickLabels.length, 0, "Could not find tick labels on the y axis ");
                yAxisTickLabels.forEach(label => {
                    var timeArr = label.textContent.split(":");
                    var mins = timeArr[0];
                    var secs = timeArr[1];
                    var date = new Date(0, 0, 0, 0, mins, secs, 0);
                    FCC_Global.assert.isAtLeast(date, MIN_TIME, "y axis labels are below the range of the actual data ");
                    FCC_Global.assert.isAtMost(date, MAX_TIME, "y axis labels are above the range of the actual data ");
                });
            });

            it('13. I can see a legend that has id="legend".', function() {
                FCC_Global.assert.isNotNull(document.getElementById('legend'), 'There should be an element with id="legend" ');
            });

            it('14. I can mouse over any dot and see a tooltip with corresponding id="tooltip" which displays more information about the data.', function() {
                const firstRequestTimeout = 100;
                const secondRequestTimeout = 2000;
                this.timeout(firstRequestTimeout + secondRequestTimeout + 1000);
                FCC_Global.assert.isNotNull(document.getElementById('tooltip'), 'There should be an element with id="tooltip" ');

                const tooltip = document.getElementById('tooltip');
                const dots = $('.dot');

                // place mouse on random bar and check if tooltip is visible
                const randomIndex = getRandomIndex(dots.length);
                var randomDot = dots[randomIndex];
                randomDot.dispatchEvent(new MouseEvent('mouseover'));

                // promise is used to prevent test from ending prematurely
                return new Promise((resolve, reject) => {
                    // timeout is used to accommodate tooltip transitions
                    setTimeout(_ => {
                        if (getToolTipStatus(tooltip) !== 'visible') {
                            reject(new Error('Tooltip should be visible when mouse is on a dot '));
                        }

                        // remove mouse from cell and check if tooltip is hidden again
                        randomDot.dispatchEvent(new MouseEvent('mouseout'));
                        setTimeout(_ => {
                            if (getToolTipStatus(tooltip) !== 'hidden') {
                                reject(new Error('Tooltip should be hidden when mouse is not on a dot '));
                            } else {
                                resolve()
                            }
                        }, secondRequestTimeout)
                    }, firstRequestTimeout)
                });
            });

            it('15. My tooltip should have a "data-year" property that corresponds to the given year of the active dot.', function() {
                const tooltip = document.getElementById('tooltip');
                FCC_Global.assert.isNotNull(tooltip.getAttribute("data-year"), 'Could not find property "data-year" in tooltip ');
                const dots = $('.dot');
                const randomIndex = getRandomIndex(dots.length);

                var randomDot = dots[randomIndex];

                randomDot.dispatchEvent(new MouseEvent('mouseover'));
                FCC_Global.assert.equal(tooltip.getAttribute('data-year'), randomDot.getAttribute('data-xvalue'), 'Tooltip\'s \"data-year\" property should be equal to the active dot\'s \"data-xvalue\" property');
            })
        });

    });
}
