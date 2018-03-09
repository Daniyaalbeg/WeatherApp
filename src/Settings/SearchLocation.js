import React, { Component } from 'react';
import {Async} from 'react-select';
import './react-select.css';


class SearchLocation extends Component {
	constructor(props){
			super(props);
			this.state = {value:{name: this.props.WUName}};
	}

	onChange (value) {
		this.setState({
			value: value,
		});
		if(value !== null){
			this.props.updateDetails({wuname: value.name, wuid: value.zmw});
		}
	}

	getCities (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		return fetch(`http://13.72.104.16/apicache.php?url=http://autocomplete.wunderground.com/aq?query=${input}`)
		.then((response) => response.json())
		.then((json) => {
			return { options: json.RESULTS };
		});

	}


	render () {
		// Filtering Countries and Places wunderground api does not support
		return (
			<div>
				<Async filterOptions = {(options, filter, currentValues) => { let newOptions = []; for (let i = 0; i < options.length; i++) {if(options[i].ll !== '-9999.000000 -9999.000000'){ newOptions.push(options[i]); }} return newOptions; }} value={this.state.value} onChange={this.onChange.bind(this)} valueKey="id" labelKey="name" loadOptions={this.getCities} backspaceRemoves={true} />
			</div>
		);
	}

}

export default SearchLocation;
