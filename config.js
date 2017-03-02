import React, { Component } from 'react';

const values = [{
	"label": "Local",
	"value": "Local"
}, {
	"label": "Global",
	"value": "Global"
}];
const config = {

	credential_tweets: {
		url: "https://scalr.api.appbase.io",
		app: "Twitter",
		username: "0z092JD6X",
		password: "e559dc6b-8c12-40b8-b308-b2c4b6b7b972",
		type: "tweets"
	},
	credential_users: {
		url: "https://scalr.api.appbase.io",
		app: "Twitter",
		username: "0z092JD6X",
		password: "e559dc6b-8c12-40b8-b308-b2c4b6b7b972",
		type: "users"
	},
	DataController: {
			customQuery: {
				"query": {
					"match_all": {}
				}
			}
		},
	ReactiveList: {
			size: 25,
			from: 0
		},
		ToggleButton: {
			defaultSelected: [values[0].value],
			data: values
		},
}
var onDataUsers = function(response, err){
	let result = null;
			console.log(response)
			if (err){
				console.log(err)
			}
			else if(response) {
				let combineData = response.currentData;

				if(response.mode === 'historic') {
					combineData = response.currentData.concat(response.newData);
				}
				else if(response.mode === 'streaming') {
					console.log('got streaming')
					combineData.unshift(response.newData)
				}
				console.log(combineData)
				if (combineData) {
					result = combineData.map((markerData, index) => {
						let marker = markerData._source;
						return (<User name={marker.name});
					});
				}
				return result;
			}
}
var onDataTweets=function(response, err) {
			
			let result = null;
			console.log(response)
			if (err){
				console.log(err)
			}
			else if(response) {
				let combineData = response.currentData;

				if(response.mode === 'historic') {
					combineData = response.currentData.concat(response.newData);
				}
				else if(response.mode === 'streaming') {
					console.log('got streaming')
					combineData.unshift(response.newData)
				}
				console.log(combineData)
				if (combineData) {
					result = combineData.map((markerData, index) => {
						let marker = markerData._source;
						return (<Tweet msg={marker.msg} usr={marker.by} date={marker.createdAt}/>);
					});
				}
				return result;
			}
};

class Tweet extends Component{
	render(){
		var tweetStyle = {maxWidth: 550, margin: '10px auto 10px'};
		var unameStyle = {maxWidth: 550,margin: 'auto', color:'#0000aa'};
		return(
		<div style={tweetStyle}>
			<div style={unameStyle}>
			{this.props.usr}:
			</div>
			<div >
			{this.props.msg}
			</div>
		</div>
			)
	}
}

class User extends Component{
	render(){
		return(
		<label>{name}</label></br>
			)
	}
}


module.exports = {
	config: config,
	onDataTweets: onDataTweets,
	onDataUsers: onDataUsers 
};