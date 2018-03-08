import React, { Component } from 'react';
import Select from 'react-select';
import './react-select.css';


class SearchLocation extends Component {
	constructor(props){
			super(props);
			this.state = {value:{name: this.props.WUName}};
	}

	getInitialState () {
		return {
			backspaceRemoves: true,
			multi: true,
			creatable: false,
		};
	}

	onChange (value) {
		this.setState({
			value: value,
		});
		if(value !== null){
			this.props.updateDetails({wuname: value.name, wuid: value.zmw});
		}
	}

	getUsers (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		return fetch(`http://13.72.104.16/test2.php?url=http://autocomplete.wunderground.com/aq?query=${input}`)
		.then((response) => response.json())
		.then((json) => {
			return { options: json.RESULTS };
		});

	}

	toggleBackspaceRemoves () {
		this.setState({
			backspaceRemoves: !this.state.backspaceRemoves
		});
	}

	toggleCreatable () {
		this.setState({
			creatable: !this.state.creatable
		});
	}

	render () {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;

		return (
			<div>
				<AsyncComponent value={this.state.value} onChange={this.onChange.bind(this)} valueKey="id" labelKey="name" loadOptions={this.getUsers} backspaceRemoves={this.state.backspaceRemoves} />
			</div>
		);
	}

}

export default SearchLocation;
