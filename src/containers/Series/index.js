import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList';
import Intro from '../../components/Intro';

class Series extends Component {
  state = {
    series: [],
    seriesName: '',
    isFetching: false

  }
  

  onSeriesInputChange = e => {
    this.setState({ seriesName: e.target.value, isFetching: true });

    fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
        .then(response => response.json())
        
        .then(json => this.setState({ series: json, isfetching: false }));

  }

	render() {
    const { series, seriesName } = this.state;

		return (
			<div>
        <Intro message="Here you can find information on all of your favourite Series" />
        <div>
          <input
            value={seriesName}
            type="text" 
            onChange={this.onSeriesInputChange} />

        </div>
      { 
        series.length === 0 && seriesName.trim() === ''
        &&
        <p>Please enter series name into the input</p>
      }
      {
        series.length === 0 && seriesName.trim() !== ''
        &&
        <p> No series found with that name</p>
      }
      
      
       <SeriesList list={this.state.series} />  
         
       </div>
			)
	}
}

export default Series;